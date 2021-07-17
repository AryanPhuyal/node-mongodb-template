const express = require("express");
const { login, register } = require("../../controllers/auth/auth");

const router = express.Router();

// login
router.post("/login", login);

// register
router.post("/register", register);

// export router
module.exports = router;
