const express = require("express");
const { addNewUserType } = require("../controllers/siteSetup");

const router = express.Router();
// create new usertype
router.post("/users/type", addNewUserType);

// export router
module.exports = router;
