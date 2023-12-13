require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const corsOptions = require("./config/corsOptions");

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Set up the server to listen on port 3000
const PORT = process.env.PORT || 3500;

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));

// 404 page
app.use("*", require("./routes/page404"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
