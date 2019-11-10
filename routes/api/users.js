const express = require("express");
const router = express.Router();

// @route          Get api/users/test
// @description    Test users route
// @access         Puplic
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;
