const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres:@localhost:5432/social"
);

module.exports.registerUser = (first, last, email, password) => {
    console.log("hello");
    const q = `
    INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.isUser = (email) => {
    const q = `SELECT password, id FROM users WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
};
