const Progress = require('../models/Progress');

// @desc    Get progress for a roadmap
// @route   GET /api/progress/:roadmapId
// @access  Private
const getProgress = async (req, res) => {
    try {
        const progress = await Progress.findOne({
            user: req.user._id,
            roadmap: req.params.roadmapId
        });

        if (progress) {
            res.json(progress);
        } else {
            // Return empty progress object
            res.json({ completedModules: [], completed: false });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update progress (toggle module completion)
// @route   POST /api/progress/:roadmapId
// @access  Private
const updateProgress = async (req, res) => {
    const { moduleIndex } = req.body; // Index of module to toggle

    try {
        let progress = await Progress.findOne({
            user: req.user._id,
            roadmap: req.params.roadmapId
        });

        if (!progress) {
            progress = new Progress({
                user: req.user._id,
                roadmap: req.params.roadmapId,
                completedModules: []
            });
        }

        const index = progress.completedModules.indexOf(moduleIndex);
        if (index > -1) {
            // Remove if already completed (toggle off)
            progress.completedModules.splice(index, 1);
        } else {
            // Add if not completed
            progress.completedModules.push(moduleIndex);
        }

        await progress.save();
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get all students progress for a roadmap (Teacher/Admin)
// @route   GET /api/progress/analytics/:roadmapId
// @access  Private (Teacher/Admin)
const getRoadmapAnalytics = async (req, res) => {
    try {
        const progressList = await Progress.find({ roadmap: req.params.roadmapId })
            .populate('user', 'name email')
            .populate('roadmap', 'title modules');

        res.json(progressList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProgress, updateProgress, getRoadmapAnalytics };
