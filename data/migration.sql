-- DROP DATABASE IF EXISTS mvp;

-- CREATE DATABASE mvp;

-- \c mvp
CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  F_name varChar(255),
  L_name varChar(255),
  email varChar(255),
  user_password varChar(15)
);

ALTER TABLE users 
ADD FK_Friends INTEGER REFERENCES users(user_id) ON DELETE CASCADE;

CREATE TABLE posts (
  post_id BIGSERIAL PRIMARY KEY,
  Post_textContent TEXT,
  Post_Date TIMESTAMP WITH TIME ZONE
);

ALTER TABLE posts
ADD FK_Post_Owner INTEGER REFERENCES users(user_id) ON DELETE CASCADE;

CREATE TABLE inbox (
  inbox_id BIGSERIAL PRIMARY KEY
);

ALTER TABLE inbox
ADD fk_user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE;

CREATE TABLE message_threads (
  thread_id BIGSERIAL PRIMARY KEY
);

CREATE TABLE joined_thread(
  FK_thread_id INTEGER REFERENCES message_threads(thread_id)
);

CREATE TABLE messages_from(
  message_from_id BIGSERIAL PRIMARY KEY,
  msg_textContent TEXT,
  msg_from_DateTime TIMESTAMP WITH TIME ZONE,
  FK_sent_from INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE messages_to(
  message_to_id BIGSERIAL PRIMARY KEY,
  msg_textContent TEXT,
  msg_from_sent TIMESTAMP WITH TIME ZONE,
  FK_sent_to INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);

ALTER TABLE joined_thread
ADD FK_from_id INTEGER REFERENCES messages_from(message_from_id) ON DELETE CASCADE;

ALTER TABLE joined_thread
ADD FK_sent_id INTEGER REFERENCES messages_to(message_to_id) ON DELETE CASCADE;
\i seed.sql
