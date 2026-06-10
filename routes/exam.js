const router = require("express").Router();
const auth = require("../middleware/auth");
const Exam = require("../models/Exam");
const restrictTeacher = require("../middleware/restrictTeacher");


/// POST SCORE (create or update)
router.post("/", auth, async (req, res) => {
  try {
    const { score } = req.body;

    if (score === undefined) {
      return res.status(400).json({ msg: "Score is required" });
    }

    const exam = await Exam.findOneAndUpdate(
      { userId: req.user.id },
      { score },
      { new: true, upsert: true }
    );

    res.json(exam);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/// GET MY SCORE
router.get("/", auth, async (req, res) => {
  try {
    const exam = await Exam.findOne({ userId: req.user.id });

    if (!exam) {
      return res.json({ score: null });
    }

    res.json({ score: exam.score });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/// GET ALL SCORES (teacher only)
router.get("/all", auth, restrictTeacher, async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("userId", "name email contentType");

    res.json(exams);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
