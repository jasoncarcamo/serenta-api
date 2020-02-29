CREATE TABLE living_space (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    space_type TEXT NOT NULL,
    room_amount TEXT NOT NULL,
    bathroom_amount TEXT NOT NULL,
    pets TEXT NOT NULL,
    price TEXT NOT NULL,
    lat DECIMAL NOT NULL,
    lng DECIMAL NOT NULL,
    includes TEXT,
    special_comments TEXT,
    date_created TIMESTAMP DEFAULT NOW() NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);