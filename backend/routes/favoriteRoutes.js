const router = require("express").Router();
const c = require("../controllers/favoriteController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, c.list);
router.post("/", auth, c.add);
router.delete("/:bookId", auth, c.remove);

module.exports = router;