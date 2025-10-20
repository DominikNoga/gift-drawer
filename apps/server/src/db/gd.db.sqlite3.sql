BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_knex_temp_alter992" (
	"id"	varchar(255),
	"name"	varchar(50) NOT NULL,
	"description"	varchar(250) NOT NULL,
	"organizer_name"	varchar(255) NOT NULL,
	"gift_budget"	float,
	"location"	varchar(255),
	"exchange_date"	datetime,
	"is_ready"	boolean NOT NULL,
	"join_code"	varchar(8) NOT NULL,
	"created_at"	datetime NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "events" (
	"id"	varchar(255),
	"name"	varchar(50) NOT NULL,
	"description"	varchar(250) NOT NULL,
	"organizer_name"	varchar(255) NOT NULL,
	"gift_budget"	float,
	"location"	varchar(255),
	"exchange_date"	datetime,
	"is_ready"	boolean NOT NULL,
	"created_at"	datetime NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "exclusions" (
	"id"	varchar(255),
	"event_id"	varchar(255) NOT NULL,
	"participant_id"	varchar(255) NOT NULL,
	"excluded_participant_id"	varchar(255) NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("event_id") REFERENCES "events"("id") ON DELETE CASCADE,
	FOREIGN KEY("excluded_participant_id") REFERENCES "participants"("id") ON DELETE CASCADE,
	FOREIGN KEY("participant_id") REFERENCES "participants"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "knex_migrations" (
	"id"	integer NOT NULL,
	"name"	varchar(255),
	"batch"	integer,
	"migration_time"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "knex_migrations_lock" (
	"index"	integer NOT NULL,
	"is_locked"	integer,
	PRIMARY KEY("index" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "participants" (
	"id"	varchar(255),
	"name"	varchar(255) NOT NULL,
	"event_id"	varchar(255) NOT NULL,
	"join_code"	varchar(255),
	"drawn_participant_id"	char(36),
	PRIMARY KEY("id"),
	FOREIGN KEY("drawn_participant_id") REFERENCES "participants"("id") ON DELETE SET NULL,
	FOREIGN KEY("event_id") REFERENCES "events"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "wishes" (
	"id"	varchar(255),
	"participant_id"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"link"	varchar(255),
	PRIMARY KEY("id"),
	FOREIGN KEY("participant_id") REFERENCES "participants"("id") on delete CASCADE
);
INSERT INTO "events" VALUES ('c713a97f-8ecc-4677-ab14-7e9c76be46ac','X-mas 2025','Awesome x-mas, yo!!','Dominik',60.0,'Gdańsk, Piecewska 29','2025-12-29T20:00',0,'2025-10-04T15:54:33.035Z');
INSERT INTO "events" VALUES ('da510506-f0d2-4031-ae94-c528537234a5','Wigilia firmowa 2025','Cześć zapraszamy na wigilię firmową!

Gdzie? - nasze biuro
Kiedy? - 17:00 do 22:00

Postanowiliśmy w tym roku zorganizować losowanie prezentów. Zobaczcie kogo macie i zróbcie mu jakąś przyjemność :)
Aby pomóc swoim mikołajom, możecie dodawać listy życzeń.

Do zobaczenia !','Alicja',100.0,'Aleja Zwycięstwa 96/98, Gdynia','2025-12-19T17:00',0,'2025-10-13T14:08:57.512Z');
INSERT INTO "events" VALUES ('9bacb0ba-a534-464b-b1f8-512467e21e97','zuzkoparty','wielkie joł','Zuzka',60.0,'Gdańsk','2025-12-29T13:00',0,'2025-10-15T11:01:43.417Z');
INSERT INTO "events" VALUES ('7daba155-ce92-4efa-948d-546903279295','test event','test','test',NULL,'Gdańsk','2025-10-29T11:07',0,'2025-10-20T11:32:19.111Z');
INSERT INTO "exclusions" VALUES ('054e13fc-e4c8-470d-9ec3-ba376100bce5','c713a97f-8ecc-4677-ab14-7e9c76be46ac','c5939a73-abbf-4392-ae7e-1fa94abb1352','20294c3d-8c88-4887-bb5d-994ca0f1c237');
INSERT INTO "exclusions" VALUES ('a4471bcf-676c-405f-80de-41b72200ca65','c713a97f-8ecc-4677-ab14-7e9c76be46ac','20294c3d-8c88-4887-bb5d-994ca0f1c237','c5939a73-abbf-4392-ae7e-1fa94abb1352');
INSERT INTO "exclusions" VALUES ('05102166-5aa9-4350-93a5-0353feeb5a0e','9bacb0ba-a534-464b-b1f8-512467e21e97','2dd6c6c1-c641-4074-be2e-a62e1c4ba774','9a6e874c-2345-47fc-89c9-82a1e3dd2e42');
INSERT INTO "exclusions" VALUES ('7c90eb10-a409-4305-990f-4afcc125a617','7daba155-ce92-4efa-948d-546903279295','12b73168-f33a-41eb-88e9-40558cfca50b','90c31bc4-b397-406d-995f-e4f7786417a3');
INSERT INTO "exclusions" VALUES ('78bad059-a71c-47eb-9dd6-80ed3c7b69d5','7daba155-ce92-4efa-948d-546903279295','12b73168-f33a-41eb-88e9-40558cfca50b','804373e3-1f8f-48c4-aa67-21a392dd535b');
INSERT INTO "knex_migrations" VALUES (1,'20250619153044_init.js',1,1750348731728);
INSERT INTO "knex_migrations" VALUES (2,'20250621131554_editparticipant.js',2,1750512219195);
INSERT INTO "knex_migrations" VALUES (3,'20250621135011_create_events_table.js',3,1750515232598);
INSERT INTO "knex_migrations" VALUES (4,'20250621141243_create_exclusions_table.js',3,1750515232600);
INSERT INTO "knex_migrations" VALUES (5,'20250621141250_create_ep_table.js',3,1750515232600);
INSERT INTO "knex_migrations" VALUES (6,'20250622092911_remove_event_participants_table.js',4,1750584559938);
INSERT INTO "knex_migrations" VALUES (7,'20250622093046_update_participant_and_exclusions.js',5,1750584734315);
INSERT INTO "knex_migrations" VALUES (9,'20250622104728_update_participant.js',7,1750589440604);
INSERT INTO "knex_migrations" VALUES (10,'20251004135828_update-participant-join-code.js',8,1759589800814);
INSERT INTO "knex_migrations" VALUES (11,'20251004145825_update-names-to-snake-case.js',9,1759589995572);
INSERT INTO "knex_migrations" VALUES (12,'20251005113428_add-drawn-participant-to-table.js',10,1759664632414);
INSERT INTO "knex_migrations" VALUES (13,'20251006162346_add-wishlist.js',11,1759769971638);
INSERT INTO "knex_migrations_lock" VALUES (1,0);
INSERT INTO "participants" VALUES ('c5939a73-abbf-4392-ae7e-1fa94abb1352','Dominik','c713a97f-8ecc-4677-ab14-7e9c76be46ac','neC1cY4H1-WYCocLuv_tUQ','7c3119a0-58ef-463f-98ba-d446b9c1afbd');
INSERT INTO "participants" VALUES ('20294c3d-8c88-4887-bb5d-994ca0f1c237','Zuzka','c713a97f-8ecc-4677-ab14-7e9c76be46ac','jxgZXaEFr9dWUImLQN-RJQ','93465a59-e2ea-46e5-9887-cc1c3ed4bf86');
INSERT INTO "participants" VALUES ('7c3119a0-58ef-463f-98ba-d446b9c1afbd','Kamil','c713a97f-8ecc-4677-ab14-7e9c76be46ac','GP98nw3GRYFo2H7hgARHXw','7da51a49-518f-4e50-9f17-ebb739cbeca4');
INSERT INTO "participants" VALUES ('7da51a49-518f-4e50-9f17-ebb739cbeca4','Kinga','c713a97f-8ecc-4677-ab14-7e9c76be46ac','ewn4lff126EJsd8k8Sguuw','c5939a73-abbf-4392-ae7e-1fa94abb1352');
INSERT INTO "participants" VALUES ('93465a59-e2ea-46e5-9887-cc1c3ed4bf86','Patryk','c713a97f-8ecc-4677-ab14-7e9c76be46ac','SXMCFBkzVTPzWdibBGs7HQ','20294c3d-8c88-4887-bb5d-994ca0f1c237');
INSERT INTO "participants" VALUES ('184902db-54ed-4d34-a559-6bec2e53df8b','Alicja','da510506-f0d2-4031-ae94-c528537234a5','0OK62UGxLBDHiXTGVSIRIA','f716de92-680d-453c-9f03-f09d9c67783b');
INSERT INTO "participants" VALUES ('5fe7094e-183a-4f0b-9ee8-e76b3c64120c','Tomek','da510506-f0d2-4031-ae94-c528537234a5','paxyYVoYjrtcIlBA_0qsHw','1be02c43-b095-4fc3-8fe1-63bc16be6c91');
INSERT INTO "participants" VALUES ('1be02c43-b095-4fc3-8fe1-63bc16be6c91','Dominik','da510506-f0d2-4031-ae94-c528537234a5','ATBvE-VZFNzNDoN6YMH7_Q','33cfc36f-45a4-4613-ac7d-0c8383185f86');
INSERT INTO "participants" VALUES ('a33110c1-5358-405b-8f7b-b41754a17319','Damian','da510506-f0d2-4031-ae94-c528537234a5','VlKL3MYyybmmOUHh2Rj0AA','abbb216e-96de-4b9d-84e3-779c92ac2e56');
INSERT INTO "participants" VALUES ('f716de92-680d-453c-9f03-f09d9c67783b','Krzysiek','da510506-f0d2-4031-ae94-c528537234a5','PGw4k4TH8TIhGqIGG1utYA','184902db-54ed-4d34-a559-6bec2e53df8b');
INSERT INTO "participants" VALUES ('d094387b-8973-4639-af0e-0cd8b3c15765','Adam','da510506-f0d2-4031-ae94-c528537234a5','TNHb4kBFIsXZe7g9Ot0hJA','5fe7094e-183a-4f0b-9ee8-e76b3c64120c');
INSERT INTO "participants" VALUES ('33cfc36f-45a4-4613-ac7d-0c8383185f86','Piotr','da510506-f0d2-4031-ae94-c528537234a5','dPErPLc2BOoxE3SMVfMGTQ','d094387b-8973-4639-af0e-0cd8b3c15765');
INSERT INTO "participants" VALUES ('abbb216e-96de-4b9d-84e3-779c92ac2e56','Wojtek','da510506-f0d2-4031-ae94-c528537234a5','XM1YJr68oZspFV_QoGPeWw','e346a645-7753-4fe1-8879-abf885bd6dad');
INSERT INTO "participants" VALUES ('e346a645-7753-4fe1-8879-abf885bd6dad','Marta','da510506-f0d2-4031-ae94-c528537234a5','g0K5BWeZVKDU9MQfD58aWw','a33110c1-5358-405b-8f7b-b41754a17319');
INSERT INTO "participants" VALUES ('3a8eb941-7a11-48c0-8e44-8c5c443749d0','Zuzka','9bacb0ba-a534-464b-b1f8-512467e21e97','8MsdmiR1p3bzigBQ_Lpgog','2dd6c6c1-c641-4074-be2e-a62e1c4ba774');
INSERT INTO "participants" VALUES ('ba347ff9-90d9-48e5-b30b-ebe63352a830','Dominges','9bacb0ba-a534-464b-b1f8-512467e21e97','uXFvvVzs5kvwCuqf4E9iVQ','9a6e874c-2345-47fc-89c9-82a1e3dd2e42');
INSERT INTO "participants" VALUES ('2dd6c6c1-c641-4074-be2e-a62e1c4ba774','Larysa','9bacb0ba-a534-464b-b1f8-512467e21e97','8PfPtD1rKT-ljKTX6yBJQA','3a8eb941-7a11-48c0-8e44-8c5c443749d0');
INSERT INTO "participants" VALUES ('9a6e874c-2345-47fc-89c9-82a1e3dd2e42','Chaton','9bacb0ba-a534-464b-b1f8-512467e21e97','XKZX7SPfdi0o7SUR1807BQ','ba347ff9-90d9-48e5-b30b-ebe63352a830');
INSERT INTO "participants" VALUES ('adbb2e36-e288-4fda-b6bc-d9d9b28d364a','test','7daba155-ce92-4efa-948d-546903279295','feQ70IxN_ZH5XN5Y9BfaeA','804373e3-1f8f-48c4-aa67-21a392dd535b');
INSERT INTO "participants" VALUES ('12b73168-f33a-41eb-88e9-40558cfca50b','tadek','7daba155-ce92-4efa-948d-546903279295','VCuJj-shR52UN-ej-TOSnQ','11886475-171f-4ff0-8bee-d2b7ad2f7faf');
INSERT INTO "participants" VALUES ('11886475-171f-4ff0-8bee-d2b7ad2f7faf','radek','7daba155-ce92-4efa-948d-546903279295','veqbLg9o7vZnG-die2R61Q','adbb2e36-e288-4fda-b6bc-d9d9b28d364a');
INSERT INTO "participants" VALUES ('90c31bc4-b397-406d-995f-e4f7786417a3','edek','7daba155-ce92-4efa-948d-546903279295','yALZZkVCH-hCXITGRh3bNw','12b73168-f33a-41eb-88e9-40558cfca50b');
INSERT INTO "participants" VALUES ('804373e3-1f8f-48c4-aa67-21a392dd535b','tomek','7daba155-ce92-4efa-948d-546903279295','Kf_DbwDyCfu0vbAOG8FuPw','90c31bc4-b397-406d-995f-e4f7786417a3');
INSERT INTO "wishes" VALUES ('389f1907-cc9c-4791-9e7c-3dcf0ba34eb6','20294c3d-8c88-4887-bb5d-994ca0f1c237','lebron james biography','https://www.taniaksiazka.pl/lebron-james-biografia-jeff-benedict-p-1909049.html?gap=1&utm_source=google&utm_medium=cpc&gad_source=1&gad_campaignid=21765430698&gbraid=0AAAAAD9tTHV8QI8p63tPJGET--jTgImmI&gclid=Cj0KCQjwl5jHBhDHARIsAB0Yqjw1QTJLNUv4CLsoPmpIDhfm1DsCtcaBeIRQLkoYiiVe_Eer-w10L8oaAnEeEALw_wcB');
INSERT INTO "wishes" VALUES ('cc6b5e71-c716-4f0f-9763-3a19fb3b8454','c5939a73-abbf-4392-ae7e-1fa94abb1352','Gra planszowa tajniacy','https://www.empik.com/rebel-gra-szpiegowska-tajniacy-rebel,p1118782576,zabawki-p');
INSERT INTO "wishes" VALUES ('f2dd3bbf-5e50-4c45-bd6e-ded232ad9538','c5939a73-abbf-4392-ae7e-1fa94abb1352','Zdrapki',NULL);
INSERT INTO "wishes" VALUES ('990bdb27-b75e-45e1-a4db-42d590d3a83f','c5939a73-abbf-4392-ae7e-1fa94abb1352','Słodycze np. Reases, Kinder',NULL);
INSERT INTO "wishes" VALUES ('edef1a12-61e7-44b3-8c65-c1be5da60ef2','adbb2e36-e288-4fda-b6bc-d9d9b28d364a','test',NULL);
CREATE INDEX IF NOT EXISTS "participants_drawn_participant_id_index" ON "participants" (
	"drawn_participant_id"
);
COMMIT;
