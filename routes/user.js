const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");


/// GET PROFILE
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json({
    hasTakenTest: user.hasTakenTest,
    contentType: user.contentType
  });
});

/// SUBMIT LEARNING TEST
router.post("/learning-test", auth, async (req, res) => {
  const { contentType } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      hasTakenTest: true,
      contentType
    },
    { new: true }
  );

  res.json(user);
});


module.exports = router;
