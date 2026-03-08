const Roadmap = require('../models/Roadmap');

// @desc    Get all roadmaps
// @route   GET /api/roadmaps
// @access  Public (or Private)
const getRoadmaps = async (req, res) => {
    try {
        const roadmaps = await Roadmap.find({});
        res.json(roadmaps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single roadmap
// @route   GET /api/roadmaps/:id
// @access  Public
const getRoadmapById = async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.params.id);
        if (roadmap) {
            res.json(roadmap);
        } else {
            res.status(404).json({ message: 'Roadmap not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a roadmap
// @route   POST /api/roadmaps
// @access  Private (Teacher/Admin)
const createRoadmap = async (req, res) => {
    const { title, description, role, mermaidChart, modules } = req.body;

    try {
        const roadmap = new Roadmap({
            title,
            description,
            role,
            mermaidChart,
            modules,
            createdBy: req.user._id
        });

        const createdRoadmap = await roadmap.save();
        res.status(201).json(createdRoadmap);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getRoadmaps, getRoadmapById, createRoadmap };
