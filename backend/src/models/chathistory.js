module.exports = (sequelize, DataTypes) => {
  const ChatHistory = sequelize.define("ChatHistory", {
    userId: DataTypes.INTEGER,
    role: DataTypes.STRING, // 'user' atau 'bot'
    message: DataTypes.TEXT,
  });

  return ChatHistory;
};
