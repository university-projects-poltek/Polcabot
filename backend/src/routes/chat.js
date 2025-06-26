const express = require("express");
const router = express.Router();
const { ChatHistory } = require("../models"); // pastikan path-nya sesuai

// Simpan chat
router.post("/", async (req, res) => {
  const { userId, role, message } = req.body;
  try {
    const chat = await ChatHistory.create({ userId, role, message });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Gagal simpan chat", detail: err.message });
  }
});

// Ambil riwayat chat
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await ChatHistory.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Gagal ambil riwayat", detail: err.message });
  }
});

module.exports = router;
