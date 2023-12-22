BEGIN;


DROP TABLE IF EXISTS "film", "user";

CREATE TABLE "film" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "original_title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "director" TEXT NOT NULL,
  "image_src" TEXT NOT NULL,
  "banner_src" TEXT NOT NULL,
  "release_date" INT NOT NULL,
  "duration" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" VARCHAR(32) NOT NULL,
  "lastname" VARCHAR(32) NOT NULL,
  "email" VARCHAR(64) NOT NULL,
  "password" VARCHAR(64) NOT NULL,
  "favorite_film_id" INT REFERENCES "film"("id") DEFAULT 1,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;