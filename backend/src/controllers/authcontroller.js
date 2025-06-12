const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

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
    const existingUsername = await User.findUserByUsername(username);
    if (existingUsername.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const existingEmail = await User.findUserByEmail(email);
    if (existingEmail.length > 0) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, username, password: hashedPassword };

    await User.createUser(newUser);

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
    const result = await User.findUserByUsername(username);
    if (result.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const user = result[0];

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
