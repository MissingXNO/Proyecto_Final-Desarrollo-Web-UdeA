CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    transmission VARCHAR(20) NOT NULL CHECK (transmission IN ('Manual', 'Automática')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('Hatchback', 'Sedan', 'SUV', 'Pickup', 'Coupe', 'Wagon')),
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    price_per_day NUMERIC(10, 2) NOT NULL CHECK (price_per_day >= 0),
    description TEXT NOT NULL,
    image_url TEXT
);