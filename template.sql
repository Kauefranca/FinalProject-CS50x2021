CREATE TABLE locations (
    id INTEGER NOT NULL,
    url TEXT NOT NULL,
    lat NUMERIC NOT NULL,
    long NUMERIC NOT NULL,

    PRIMARY KEY (id)
);

INSERT INTO locations (url, lat, long) VALUES ('/static/images/locations/15.png', '1.7539689093023103', '-67.06238899372373');
