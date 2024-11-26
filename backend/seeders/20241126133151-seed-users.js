"use strict";

const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);

    const admin = {
      username: "admin",
      email: "admin@gmail.com",
      password: await bcrypt.hash("adminadmin", salt),
      firstName: "Admin",
      lastName: "Admin",
      BOD: "2000-01-01",
      gender: "male",
      address: "123 Admin Street",
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const users = [];
    for (let i = 1; i <= 20; i++) {
      const gender = faker.helpers.arrayElement(["male", "female"]);
      const firstName = faker.name.firstName(gender === "male" ? "male" : "female");
      const lastName = faker.name.lastName();

      users.push({
        username: faker.internet.userName(firstName, lastName),
        email: faker.internet.email(firstName, lastName),
        password: await bcrypt.hash("Password123!", salt),
        firstName: firstName,
        lastName: lastName,
        BOD: faker.date.birthdate({ min: 17, max: 60, mode: "age" }).toISOString().split("T")[0], 
        gender: gender,
        address: faker.address.streetAddress(),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Users", [admin, ...users], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
