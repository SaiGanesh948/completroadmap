const express = require('express');
const router = express.Router();
const { getRoadmaps, getRoadmapById, createRoadmap } = require('../controllers/roadmapController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/').get(getRoadmaps).post(protect, teacher, createRoadmap);
router.route('/:id').get(getRoadmapById);

module.exports = router;
