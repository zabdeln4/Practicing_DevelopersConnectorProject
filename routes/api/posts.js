const express = require("express");
const router = express.Router();

// @route          Get api/posts/test
// @description    Test post route
// @access         Puplic
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

module.exports = router;
