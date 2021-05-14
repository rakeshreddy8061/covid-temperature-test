CREATE DATABASE temperature_test;

--\c into temperature_test

CREATE TABLE test(
  test_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  temp NUMERIC
);