const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email must be in a valid format.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          msg: "Passwords must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.",
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty.",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name cannot be empty.",
        },
      },
    },
    BOD: { 
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Date of Birth must be a valid date.",
        },
      },
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["male", "female", "other"]],
          msg: "Gender must be 'male', 'female', or 'other'.",
        },
      },
    },
  });

  User.addHook("beforeCreate", async (user) => {
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};
