const router = require("express").Router();
const c = require("../controllers/bookController");
const auth = require("../middleware/authMiddleware");

router.get("/", c.list);
router.post("/", auth, c.create);
router.put("/:id", auth, c.update);
router.delete("/:id", auth, c.remove);

module.exports = router;