const express = require('express');
const router = express.Router();
const { getProgress, updateProgress, getRoadmapAnalytics } = require('../controllers/progressController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/:roadmapId').get(protect, getProgress).post(protect, updateProgress);
router.get('/analytics/:roadmapId', protect, teacher, getRoadmapAnalytics);

module.exports = router;
