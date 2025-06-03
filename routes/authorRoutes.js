const express = require("express");
const router = express.Router();
const authorControllers = require("../controllers/authorControllers");

router.get("/", authorControllers.getAuthors);
router.put("/:id", authorControllers.updateAuthor);

module.exports = router;
