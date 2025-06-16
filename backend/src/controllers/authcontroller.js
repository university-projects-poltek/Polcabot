const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Import dari models/index.js

// REGISTER
exports.register = async (req, res) => {
  const { name, email, username, password, confirmPassword } = req.body;

  if (!name || !email || !username || !password || !confirmPassword) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Konfirmasi password tidak cocok" });
  }

  try {
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, username, password: hashedPassword });

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    console.error("❌ Error saat registrasi:", err);
    res.status(500).json({ message: "Gagal mendaftar, coba lagi" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi" });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("❌ Error saat login:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
};
