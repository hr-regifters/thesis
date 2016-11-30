DROP TABLE IF EXISTS concoctions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id            BIGSERIAL   PRIMARY KEY,
  username      VARCHAR(20) NOT NULL UNIQUE,
  email         VARCHAR(64) NOT NULL,
  password      VARCHAR(64) NOT NULL,
  instagramId   VARCHAR(15),
  fitbitId      VARCHAR(10),
  slackId       VARCHAR(10),
  stravaId      VARCHAR(10),
  evernoteToken VARCHAR(100),
  fitbitId      VARCHAR(10),
  instagramId   VARCHAR(15),
  stravaId      VARCHAR(10),
  slackToken    VARCHAR(80),
  evernoteToken VARCHAR(100),
  githubToken   VARCHAR(100),
  instagramToken VARCHAR(100),
  slackToken    VARCHAR(80),
  stravaToken   VARCHAR(80),
  createdat TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE concoctions (
  id            BIGSERIAL   PRIMARY KEY,
  userId        BIGSERIAL   references users(id),
  triggerApi    VARCHAR(20),
  triggerEvent  VARCHAR(32),
  triggerParams VARCHAR(128),
  triggerUserId VARCHAR(20),
  triggerToken  VARCHAR(300),
  actionApi     VARCHAR(20),
  actionEvent   VARCHAR(32),
  actionUserId  VARCHAR(20),
  actionToken   VARCHAR(128),
  actionParams  VARCHAR(128),
  enable        BOOLEAN,
  description   VARCHAR(128),
  createdat TIMESTAMPTZ NOT NULL DEFAULT now()
);



