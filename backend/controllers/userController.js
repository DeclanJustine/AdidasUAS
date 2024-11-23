const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

const createUser = async (req, res) => {
  const { username, email, password, confirmPassword, firstName, lastName, BOD, gender } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        message: "Password and Confirm Password don't match." 
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        message: "Email has already been used." 
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ 
        message: "Password must be at least 8 characters long." 
      });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      BOD,
      gender
    });

    res.status(201).json({ 
      message: "User successfully created.", 
      user: { 
        id: newUser.id, 
        username: newUser.username, 
        email: newUser.email, 
        firstName: newUser.firstName, 
        lastName: newUser.lastName, 
        BOD: newUser.BOD, 
        gender: newUser.gender, 
        createdAt: newUser.createdAt 
      } 
    });
  } catch (error) {
    console.error("Error creating user data:", error);
    res.status(500).json({ 
      message: "An error occurred while creating user data.", 
      error: error.message 
    });
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

      req.session.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          sessionStartTime: sessionStartTime.toLocaleString(),
          sessionEndTime: sessionEndTime.toLocaleString(),
      };

      console.log('Session started:', req.session.user); 

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
      firstName: user.firstName,
      lastName: user.lastName,
      BOD: user.BOD,
      gender: user.gender
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ error: "An error occurred while retrieving the user profile." });
  }
};

const changePassword = async (req, res) => {
  const { recentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    if (!recentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "New password and confirm password don't match." });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: "Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol." });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isRecentPasswordValid = await bcrypt.compare(recentPassword, user.password);
    if (!isRecentPasswordValid) {
      return res.status(400).json({ message: "Recent password is incorrect." });
    }

    user.password = newPassword; 
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "An error occurred while changing the password.", error: error.message });
  }
};


module.exports = { createUser, getAllUsers, loginUser, getUserProfile, logoutUser, checkSession, changePassword};
