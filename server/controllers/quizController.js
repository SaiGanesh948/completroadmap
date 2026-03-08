const Quiz = require('../models/Quiz');

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (Teacher)
const createQuiz = async (req, res) => {
    const { title, roadmapId, questions } = req.body;

    try {
        const quiz = new Quiz({
            title,
            roadmapId,
            questions,
            createdBy: req.user._id
        });

        const createdQuiz = await quiz.save();
        res.status(201).json(createdQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get quizzes for a roadmap
// @route   GET /api/quizzes/:roadmapId
// @access  Public/Private
const getQuizzesByRoadmap = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ roadmapId: req.params.roadmapId });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createQuiz, getQuizzesByRoadmap };
