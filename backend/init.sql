CREATE TABLE category (
    category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(128) NOT NULL,
    color       VARCHAR(7) NOT NULL
);

CREATE TABLE event (
    event_id             INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name                 VARCHAR(256) NOT NULL,
    fullday              CHAR(1) NOT NULL,
    date_start           DATE NOT NULL,
    time_start           TIME,
    date_end             DATE NOT NULL,
    time_end             TIME,
    category_id          INT NOT NULL
);

ALTER TABLE event
    ADD CONSTRAINT event_category_fk FOREIGN KEY ( category_id )
        REFERENCES category ( category_id );

INSERT INTO category (name, color)
VALUES ('Default', '#808080');
