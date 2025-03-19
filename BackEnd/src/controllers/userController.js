// GET userInfo

const userInfo = async (req, res) => {
  // Lấy thông tin user từ middleware
  const user = req.user;
  // Trả về thông tin user
  res.status(200).json({
    statusCode: 200,
    user,
  });
};
