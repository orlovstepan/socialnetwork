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

module.exports.resetCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email,code) values($1, $2) RETURNING *`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getResetCode = (email, code) => {
    const q = `
    SELECT * FROM
    (SELECT * FROM reset_codes WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes') as code 
    WHERE email = $1 AND code = $2
    `;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.updatePassword = (email, password) => {
    const q = `
    UPDATE users 
    SET password = $2 WHERE email = $1
    RETURNING *
    `;
    const params = [email, password];
    return db.query(q, params);
};

module.exports.updateProfilePic = (userId, imgUrl) => {
    const q = `
    UPDATE users
    SET profile_pic = $2 WHERE id = $1
    RETURNING *
    `;
    const params = [userId, imgUrl];
    return db.query(q, params);
};

module.exports.getUserData = (userId) => {
    const q = `
    SELECT first, last, profile_pic, bio FROM users WHERE id = $1
    `;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getBio = (userId) => {
    const q = `
    SELECT bio FROM users WHERE id = $1
    `;
    const params = [userId];
    return db.query(q, params);
};

module.exports.updateBio = (userId, bio) => {
    const q = `
    UPDATE users
    SET bio = $2 WHERE id = $1
    RETURNING *
    `;
    const params = [userId, bio];
    return db.query(q, params);
};
module.exports.findPeople = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};
