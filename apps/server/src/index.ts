import { createApp } from './createApp';

const app = createApp();

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
