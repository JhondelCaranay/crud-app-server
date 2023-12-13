const jwt = require("jsonwebtoken");

const getAccessToken = (email, role) => {
  return jwt.sign(
    {
      UserInfo: {
        email,
        role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
};

const getRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  getAccessToken,
  getRefreshToken,
};
