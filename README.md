# GiftDrawer

[![CI](https://github.com/DominikNoga/gift-drawer/actions/workflows/ci.yml/badge.svg)](https://github.com/DominikNoga/gift-drawer/actions/workflows/ci.yml)

A Secret Santa organizer: create an event, invite participants with join codes, set exclusion rules and draw names.

**Live demo:** [gift-drawer-frontend.onrender.com](https://gift-drawer-frontend.onrender.com/)

> Hosted on a free tier, so the first load may take up to a minute while the server wakes up.

## Screenshots

|                                                           Home page                                                            |                                                             Event page (organizer view)                                                              |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="docs/screenshots/main-page-view.png" alt="Home page with create and join cards and a list of my events" width="420"> | <img src="docs/screenshots/event-page-organizer-view.png" alt="Event page with event details and participants with copyable join codes" width="420"> |
|                                              **Create event: basic information**                                               |                                                            **Create event: participants**                                                            |
|              <img src="docs/screenshots/create-event.png" alt="First step of the create event form" width="420">               |                           <img src="docs/screenshots/adding-participants.png" alt="Adding participant names" width="420">                            |
|                                                  **Create event: exclusions**                                                  |                                                          **Your assignment after the draw**                                                          |
|       <img src="docs/screenshots/adding-exclusions.png" alt="Setting exclusion rules between participants" width="420">        |                    <img src="docs/screenshots/viewing-your-assignment.png" alt="Assigned person and their wishlist" width="420">                     |

## Features

- **Create events** with a multi-step form: basic details (name, description, location, budget, date), participants and exclusions, followed by a preview. Form progress is kept in local storage.
- **Join with a code**: every participant gets a personal join code. The organizer can see and share all codes.
- **Wishlists**: participants add and remove wishlist items (with optional links). After the draw, everyone sees the wishlist of the person they are buying for.
- **Exclusion rules**: prevent specific people from drawing each other (e.g. partners), one-way or both ways. The server rejects an event whose exclusions make a draw impossible and explains why.
- **The draw**: the organizer draws the names, then each participant sees only their own assignment.

## Tech stack

| Area     | Technologies                                                        |
| -------- | ------------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite, SCSS, React Router, Axios, Lucide icons |
| Backend  | Node.js, Express, Knex, Zod                                         |
| Database | PostgreSQL (production), SQLite (local fallback)                    |
| Tooling  | pnpm workspaces, Turborepo, ESLint, Prettier                        |
| Testing  | Jest + ts-jest (server), Vitest + React Testing Library (frontend)  |
| CI       | GitHub Actions                                                      |

## Project structure

```
apps/
  frontend/              React SPA (Vite)
    src/pages/           HomePage, CreateEventPage, EventPage, ErrorPage
    src/shared/          Reusable components, services (API + local storage), utils
    src/styles/          Global SCSS variables and mixins
  server/                Express REST API
    src/routes/          events, participants, exclusions, wishes, healthcheck
    src/utils/           Draw algorithm and helpers
    src/db/              Knex config and migrations
packages/
  types/                 Zod schemas and TypeScript types shared by frontend and server
  eslint-config/         Shared ESLint configuration
  typescript-config/     Shared tsconfig presets
```

## How the draw works

The draw lives in [`apps/server/src/utils/drawing-logic.utils.ts`](apps/server/src/utils/drawing-logic.utils.ts). It is modelled as a **bipartite matching** problem: givers on one side, receivers on the other, with an edge wherever a giver is allowed to draw a receiver.

1. **Validation.** At least 3 participants are required, otherwise an error is thrown.
2. **Build the allowed receivers.** For every giver, the candidates are all other participants minus the ones they excluded. Exclusions are directed: "A must not draw B" does not block B from drawing A. Exclusions that reference unknown participants are ignored.
3. **Randomize.** Each candidate list and the order of givers are shuffled with the **Fisher–Yates** algorithm, so the same event can produce different results.
4. **Fail fast.** If any giver has no candidates left, the draw fails immediately and lists those participants.
5. **Match with augmenting paths (Kuhn's algorithm).** Each giver tries their candidates in turn. A free receiver is taken straight away. If the receiver is already taken, the algorithm tries to move that receiver's current giver to another of _their_ candidates, recursively. Every successful search grows the matching by one.
6. **Result.** This finds a _maximum_ matching. If it covers everyone, the result is a valid draw: everyone gives and receives exactly once, nobody draws themselves and all exclusions hold. If it doesn't, no valid draw exists for these exclusions (for example, two people who can only draw the same third person). The result is then `ok: false`, with human-readable reasons naming the participants who could not be matched.

The same check runs when an event is created, so an organizer finds out about impossible exclusions before anyone joins.

Notes: a valid draw may contain mutual pairs (A → B and B → A) or several separate cycles. The shuffling varies the outcome between runs, but it does not guarantee a perfectly uniform distribution over all valid draws.

## Getting started

### Requirements

- Node.js 22+
- pnpm 9 (`corepack enable` picks up the version from `package.json`)
- Optional: PostgreSQL. Without it, the server uses a local SQLite file, so no database setup is needed.

### Environment variables

| Variable       | Used by  | Description                                                                                                                |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `POSTGRES_URL` | server   | PostgreSQL connection string. If unset, the server falls back to a local SQLite file (`apps/server/src/db/gd.db.sqlite3`). |
| `VITE_API_URL` | frontend | Base URL of the API, e.g. `http://localhost:5000/api`.                                                                     |

The server reads `POSTGRES_URL` from the shell environment. For the frontend, copy `apps/frontend/.env.example` to `apps/frontend/.env.local`.

To use PostgreSQL locally, for example via Docker:

```sh
docker run -d --name gift-drawer-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=giftdrawer -p 5432:5432 postgres:16-alpine
export POSTGRES_URL=postgres://postgres:postgres@localhost:5432/giftdrawer
```

### Install, migrate and run

```sh
pnpm install

cp apps/frontend/.env.example apps/frontend/.env.local

# Create the database (SQLite by default; set POSTGRES_URL to use PostgreSQL)
pnpm --filter @gd/server migrate

# Start the frontend (http://localhost:5173) and the API (http://localhost:5000)
pnpm dev
```

Other useful commands:

| Command                                          | Description                       |
| ------------------------------------------------ | --------------------------------- |
| `pnpm build`                                     | Build all apps                    |
| `pnpm lint`                                      | Lint all packages                 |
| `pnpm check-types`                               | Type-check all packages           |
| `pnpm test`                                      | Run all tests                     |
| `pnpm format`                                    | Format the codebase with Prettier |
| `pnpm --filter @gd/server create-migration name` | Create a new Knex migration       |

## Testing and CI

- **Server:** Jest tests for the draw algorithm (`apps/server/src/utils/drawing-logic.utils.test.ts`). They cover valid draws, exclusions, impossible configurations, input validation, randomness and a 50-person group.
- **Frontend:** Vitest + React Testing Library tests for the create event form.

Every push and pull request to `master` runs lint, type-check, build and tests in [GitHub Actions](.github/workflows/ci.yml).
