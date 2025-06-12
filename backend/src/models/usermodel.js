const db = require("../config/db");

// Simpan user baru
const createUser = (user) => {
  const sql = "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [user.name, user.email, user.username, user.password], (err, result) => {
      if (err) {
        console.error("❌ Error saat createUser:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Cari user berdasarkan username
const findUserByUsername = (username) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [username], (err, result) => {
      if (err) {
        console.error("❌ Error saat findUserByUsername:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

// ✅ Tambahan: Cari user berdasarkan email
const findUserByEmail = (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("❌ Error saat findUserByEmail:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail, // <- ekspor tambahan ini
};
