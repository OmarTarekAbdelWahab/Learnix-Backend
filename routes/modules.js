const router = require("express").Router();
const auth = require("../middleware/auth");
const ModuleProgress = require("../models/ModuleProgress");
const QuizAnswer = require("../models/QuizAnswer");
const restrictTeacher = require("../middleware/restrictTeacher");
const User = require("../models/User");


router.get("/quiz-answers", auth, restrictTeacher, async (req, res) => {
  const data = await QuizAnswer.find()
    .populate("userId", "name email");

  const returnData = data.map(d => { return {
    user: {
      name: d.userId.name,
      email: d.userId.email
    },
    moduleId: d.moduleId,
    quizIndex: d.quizIndex,
    selectedChoice: d.selectedChoice,
    isCorrect: d.isCorrect,
    contentType: d.contentType,
  }});
  res.json(returnData);
});



router.post("/quiz-answer", auth, async (req, res) => {
  const { moduleId, quizIndex, selectedChoice, isCorrect, contentType } = req.body;

  const user = await User.findById(req.user.id);

  const answer = await QuizAnswer.findOneAndUpdate(
    {
      userId: req.user.id,
      moduleId,
      quizIndex
    },
    {
      selectedChoice,
      isCorrect,
      contentType
    },
    {
      new: true,
      upsert: true
    }
  );

  res.json(answer);
});




/// GET ALL PROGRESS
router.get("/progress", auth, async (req, res) => {
  const progress = await ModuleProgress.find({
    userId: req.user.id
  });

  res.json(progress);
});


/// UPDATE PROGRESS (UPSERT)
router.post("/progress", auth, async (req, res) => {
  const { moduleId, currentPart } = req.body;

  const progress = await ModuleProgress.findOneAndUpdate(
    { userId: req.user.id, moduleId },
    {
      currentPart,
      status: "in-progress"
    },
    { new: true, upsert: true }
  );

  res.json(progress);
});


router.post("/complete", auth, async (req, res) => {
  const { moduleId } = req.body;

  const progress = await ModuleProgress.findOneAndUpdate(
    { userId: req.user.id, moduleId },
    { status: "finished" },
    { new: true }
  );

  res.json(progress);
});



module.exports = router;


