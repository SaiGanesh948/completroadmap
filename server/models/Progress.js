const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roadmap',
        required: true
    },
    completedModules: [{
        type: Number // Index of the module in the roadmap's modules array
    }],
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
