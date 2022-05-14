FROM mysql:5.7

ENV MYSQL_DATABASE=blog \
    MYSQL_ROOT_PASSWORD=test

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306