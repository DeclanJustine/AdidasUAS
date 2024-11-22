const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

const createUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password doesn't match" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email has already been used." });
    }

    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: "User successfully created.", user: newUser });
  } catch (error) {
    console.error("Error creating user data:", error);
    res.status(500).json({ message: "An error occured while creating user data." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving user data." });
  }
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username, email },
    });

    if (!user) {
      return res.status(400).json({ error: "Username or email not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Wrong Password." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const sessionStartTime = new Date(); 
    const sessionEndTime = new Date(sessionStartTime.getTime() + 60 * 60 * 1000);

    const sessionStartTimeFormatted = sessionStartTime.toLocaleString(); 
    const sessionEndTimeFormatted = sessionEndTime.toLocaleString();     

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      sessionStartTime: sessionStartTimeFormatted,  
      sessionEndTime: sessionEndTimeFormatted,  
    };

    res.status(200).json({
      message: "Login Success!",
      id: user.id,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error("Error while login:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};



const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ error: "Failed to log out." });
    }
    res.clearCookie("connect.sid"); 
    res.status(200).json({ message: "Logout successful." });
  });
};

const checkSession = (req, res) => {
  if (req.session && req.session.user) {
    const { sessionStartTime, sessionEndTime } = req.session.user;

    const sessionEnd = new Date(sessionEndTime);
    const currentTime = new Date();

    if (currentTime > sessionEnd) {
      return res.status(401).json({ message: "Session has expired." });
    }

    return res.status(200).json({
      message: "Session is active.",
      user: req.session.user,
    });
  }

  res.status(401).json({ message: "Session is inactive or expired." });
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);  

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ error: "An error occurred while retrieving the user profile." });
  }
};

module.exports = { createUser, getAllUsers, loginUser, getUserProfile, logoutUser, checkSession };
