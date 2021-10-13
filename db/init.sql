CREATE DATABASE tiny_url;
use tiny_url;

CREATE TABLE url_map (
  original_url VARCHAR(200) PRIMARY KEY,
  short_url VARCHAR(200),
  hit_counter int,
  created_datetime datetime
);