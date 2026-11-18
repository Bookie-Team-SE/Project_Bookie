const router = require("express").Router();
const c = require("../controllers/borrowingController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, c.list);
router.post("/", auth, c.create);
router.put("/:id/return", auth, c.returnBook);

module.exports = router;