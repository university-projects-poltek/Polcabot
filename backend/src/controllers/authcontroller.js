const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Op } = require("sequelize");

// Validasi input yang ketat
const validateRegisterInput = (data) => {
  const { name, email, username, password, confirmPassword } = data;
  const errors = {};

  // Fullname wajib diisi (bisa tambahkan regex jika hanya ingin huruf)
  if (!name) {
    errors.name = "Nama wajib diisi";
  }

  // Email wajib dan hanya dari domain tertentu
  if (!email) {
    errors.email = "Email wajib diisi";
  } else if (!/^[^\s@]+@(gmail\.com|yahoo\.com|student\.polibatam\.ac\.id)$/i.test(email)) {
    errors.email = "Email tidak valid";
  }

  if (!username) {
    errors.username = "Username wajib diisi";
  } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
    errors.username = "Username hanya boleh mengandung huruf dan angka";
  }

  if (!password) errors.password = "Password wajib diisi";
  if (!confirmPassword) errors.confirmPassword = "Konfirmasi password wajib diisi";

  if (password && password.length < 6) {
    errors.password = "Password minimal 6 karakter";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Password tidak cocok";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// REGISTER
exports.register = async (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const { name, email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });

    if (existingUser) {
      const duplicateErrors = {};
      if (existingUser.username === username) duplicateErrors.username = "Username sudah digunakan";
      if (existingUser.email === email) duplicateErrors.email = "Email sudah digunakan";

      return res.status(400).json({ success: false, errors: duplicateErrors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      role: "user", // default
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("❌ Error saat registrasi:", err.message);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server saat registrasi",
      error: err.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      errors: {
        username: !username ? "Username wajib diisi" : undefined,
        password: !password ? "Password wajib diisi" : undefined,
      },
    });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      redirect: user.role === "admin" ? "/admin/dashboard" : "/user/home",
    });
  } catch (err) {
    console.error("❌ Error saat login:", err.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server saat login",
      error: err.message,
    });
  }
};

// Middleware token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Akses ditolak, token tidak tersedia",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Token tidak valid",
      error: err.message,
    });
  }
};

// Middleware admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Akses ditolak, hanya admin yang diizinkan",
    });
  }
  next();
};
