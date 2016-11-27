DROP TABLE IF EXISTS concoctions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id            BIGSERIAL   PRIMARY KEY,
  username      VARCHAR(20) NOT NULL UNIQUE,
  email         VARCHAR(64) NOT NULL,
  password      VARCHAR(64) NOT NULL,
  slackId       VARCHAR(10),
  slackToken    VARCHAR(80),
  evernoteToken VARCHAR(100),
  fitbitToken   VARCHAR(100),
  createdat TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE concoctions (
  id            BIGSERIAL   PRIMARY KEY,
  userId        BIGSERIAL   references users(id),
  triggerApi    VARCHAR(20),
  triggerEvent  VARCHAR(32),
  triggerParams VARCHAR(128),
  actionApi     VARCHAR(20),
  actionEvent   VARCHAR(32),
  actionUserId  VARCHAR(20),
  actionToken   VARCHAR(128),
  actionParams  VARCHAR(128),
  enable        BOOLEAN,
  description   VARCHAR(128),
  createdat TIMESTAMPTZ NOT NULL DEFAULT now()
);



