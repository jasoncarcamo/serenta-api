require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://jason:carcamo@localhost/serenta-api-test",
    JWT_SECRET: process.env.JWT_SECRET || "testing123"
};