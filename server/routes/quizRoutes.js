const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzesByRoadmap } = require('../controllers/quizController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/').post(protect, teacher, createQuiz);
router.route('/:roadmapId').get(getQuizzesByRoadmap);

module.exports = router;
