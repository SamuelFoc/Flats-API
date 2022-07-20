# API

This api allows you to access the information from the PSQL flats database.

- **StartUp**

  - Open terminal in this folder
  - Run docker build and up commands

          > docker-compose build
          > docker-compose up

  - Open terminal in **node_db** image inside **flats-app** container
  - Run commands bellow to import CSV export_file from **app/data** to **PSQL DB**

          > psql -U flats flats_db
          > COPY flats FROM '/var/lib/postgresql/database/pgdata/pandas_flat_id.csv' CSV HEADER;
