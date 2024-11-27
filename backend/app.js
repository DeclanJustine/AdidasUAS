const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const session = require("express-session");
const path = require("path");

dotenv.config();  

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(cors()); 
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true, 
    maxAge: 60 * 60 * 1000 // 1 jam
  }
}));

app.use((req, res, next) => {
  if (req.session) {
    req.session.touch(); 
  }
  next();
});

app.use("/api", userRoutes); 
app.use("/api", productRoutes);
app.use("/assets", express.static(path.join(__dirname, "../frontend/assets")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

sequelize.sync() 
  .then(() => {
    console.log('Database connected and model synchronized!');
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL :', err);
  });

const PORT = process.env.PORT || 5000;
const baseUrl = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server run in port ${PORT}`);
  console.log(`Access here: ${baseUrl}`);
});
