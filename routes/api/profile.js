const express = require("express");
const router = express.Router();

// @route          Get api/profile/test
// @description    Test profile route
// @access         Puplic
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

module.exports = router;
