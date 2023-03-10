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
    SELECT id, first, last, profile_pic, bio FROM users WHERE id = $1
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
module.exports.showUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 30`);
};

module.exports.findUser = (first) => {
    const q = `SELECT id, first, last, profile_pic FROM users WHERE first ILIKE $1 OR last ILIKE $1 ORDER BY last ASC;`;
    const params = [`${first}%`];
    return db.query(q, params);
};

module.exports.isFriend = (myId, otherUserId) => {
    const q = `
    SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1);
    `;

    const params = [myId, otherUserId];

    return db.query(q, params);
};

module.exports.sendFriendshipRequest = (myId, otherUserId) => {
    const q = `
    INSERT INTO friendships (sender_id, recipient_id)
    VALUES ($1, $2)
    RETURNING *
    ;`;
    const params = [myId, otherUserId];
    return db.query(q, params);
};

module.exports.deleteFriend = (myId, otherUserId) => {
    const q = `
    DELETE FROM friendships 
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (recipient_id = $1 AND sender_id = $2)
    RETURNING *
    ;`;
    const params = [myId || null, otherUserId || null];
    return db.query(q, params);
};

module.exports.acceptFriend = (myId, otherUserId) => {
    const q = `UPDATE friendships SET accepted = true WHERE (sender_id = $1 AND recipient_id = $2)
        OR (recipient_id = $1 AND sender_id = $2) RETURNING *;`;
    const params = [myId || null, otherUserId || null];
    return db.query(q, params);
};

module.exports.getFriendsAndRequests = (userId) => {
    const q = `
      SELECT users.id, first, last, profile_pic, accepted
      FROM friendships
      JOIN users
      ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
      OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
      OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
  ;`;
    const params = [userId || null];
    return db.query(q, params);
};

// module.exports.getLastChatMessages = (userId) => {
//     const q = `
//       SELECT users.id, first, last, profile_pic, message
//       FROM chat
//       JOIN users
//       ON (sender_id = $1)
//       LIMIT 10
//   ;`;
//     const params = [userId || null];
//     return db.query(q, params);
// };

module.exports.getLastChatMessages = () => {
    return db.query(`
      SELECT users.id, first, last, profile_pic, chat.message, chat.created_at
      FROM users
      JOIN chat
      ON (sender_id = users.id)
      ORDER BY chat.id DESC
      LIMIT 10
  ;`);
};

module.exports.insertChatMessage = (userId, message) => {
    const q = `
     INSERT INTO chat(sender_id, message)
     VALUES ($1, $2)
     RETURNING *
  ;`;
    const params = [userId || null, message || null];
    return db.query(q, params);
};

module.exports.insertWallPost = (userId, otherId, wallpost) => {
    const q = `
     INSERT INTO wallpost(sender_id, recipient_id, wallpost)
     VALUES ($1, $2, $3)
     RETURNING *
  ;`;
    const params = [userId || null, otherId || null, wallpost || null];
    return db.query(q, params);
};

module.exports.getLastWallPosts = (userId) => {
    const q = `
      SELECT users.id, first, last, profile_pic, wallpost, wallpost.created_at
      FROM users
      JOIN wallpost
      ON (sender_id = users.id)
      WHERE recipient_id = $1
      ORDER BY wallpost.id DESC
      LIMIT 10
  ;`;
    const params = [userId];
    return db.query(q, params);
};
