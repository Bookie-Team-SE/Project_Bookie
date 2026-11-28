const router = require("express").Router();
const c = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");

router.get("/book/:bookId", c.list);
router.post("/", auth, c.create);

module.exports = router;