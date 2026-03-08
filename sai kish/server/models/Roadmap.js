const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    role: { // e.g., 'Frontend Developer', 'Data Scientist'
        type: String,
        required: true
    },
    mermaidChart: { // The Mermaid.js syntax string
        type: String,
        required: true
    },
    modules: [{
        title: String,
        description: String,
        duration: String, // e.g., "2 weeks"
        resources: [String], // URLs
        videos: [{
            title: String,
            url: String,
            thumbnail: String
        }]
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

module.exports = Roadmap;
