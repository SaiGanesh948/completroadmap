const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Roadmap = require('./models/Roadmap');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/roadmap-tracker';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');

        await Roadmap.deleteMany({});

        const sampleRoadmap = new Roadmap({
            title: 'Full Stack Web Development',
            description: 'Master the MERN stack with this comprehensive path.',
            role: 'Full Stack Developer',
            mermaidChart: `
graph TD
    A[Start] --> B(HTML/CSS)
    B --> C(JavaScript)
    C --> D{Frameworks}
    D -->|Frontend| E[React]
    D -->|Backend| F[Node.js]
    E --> G[Full Stack Project]
    F --> G
    G --> H[Deployment]
            `,
            modules: [
                { title: 'HTML & CSS Basics', description: 'Learn the structure and styling of web pages.', duration: '1 week' },
                { title: 'JavaScript Fundamentals', description: 'Master logic, variables, loops and functions.', duration: '2 weeks' },
                { title: 'React.js', description: 'Build interactive UIs with components and hooks.', duration: '3 weeks' },
                { title: 'Node.js & Express', description: 'Create server-side applications and APIs.', duration: '2 weeks' }
            ]
        });

        await sampleRoadmap.save();
        console.log('Sample Data Seeded');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
