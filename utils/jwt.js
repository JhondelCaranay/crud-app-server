const jwt = require("jsonwebtoken");

const getAccessToken = (email, roles) => {
  return jwt.sign(
    {
      UserInfo: {
        email,
        roles,
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
