/*jshint esversion: 6*/

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

var salt = bcrypt.genSaltSync(bcryptSalt);
const password = "1234";
var encryptedPass = bcrypt.hashSync(password, salt);

module.exports = [
  {
    name: "Sergio",
    username: "Sergi",
    email: "sergio@gmail.com",
    password: encryptedPass,
    location: "Madrid",
    isProducer: true
  },
  {
    name: "Paula",
    username: "Paulis",
    email: "paula@gmail.com",
    password: encryptedPass,
    location: "Ávila",
    isProducer: true
  },
  {
    name: "Carlos Martin",
    username: "Charlie",
    email: "carlos@gmail.com",
    password: encryptedPass,
    location: "Barcelona",
    isProducer: false
  },
  {
    name: "Pepito Pérez",
    username: "ppp",
    email: "pepe@gmail.com",
    password: encryptedPass,
    location: "Huelva",
    isProducer: false
  },
  {
    name: "Jose Jacinto Jimenez",
    username: "JJ",
    email: "jj@gmail.com",
    password: encryptedPass,
    location: "Burgos",
    isProducer: false
  }
];
