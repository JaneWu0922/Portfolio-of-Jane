export const PERSONAL_INFO = {
  name: "Sin Tung Jane WU",
  title: "AI Strategy & People Operations",
  location: "Paris, France 🇫🇷",
  email: "wusintung@gmail.com",
  linkedin: "linkedin.com/in/jane-wu0922",
  github: "github.com/JaneWu0922/Portfolio/tree/main",
  profile: "I bridge the gap between technical rigor and human-centric strategy. With an engineering background from EPITA and experience at L’Oréal, I specialize in Digital Transformation across HR and Digital Learning ecosystems.\n\nFrom architecting GenAI companions to automating global Data pipelines, I turn complex information into scalable growth. I focus on building data-driven solutions that empower people and optimize performance.",
  languages: [
    { name: "Chinese", level: "Native" },
    { name: "English", level: "Native" },
    { name: "Cantonese", level: "Native" },
    { name: "French", level: "Fluent" }
  ],
  skills: {
    hard: [
      "Python", "Power BI", "SQL", "SAP SuccessFactors LMS", 
      "Microsoft Power Platform", "Azure AI Foundry", "Visual Studio Code", 
      "Dataiku DSS", "Microsoft Office Pack", "Google Analytics", 
      "Articulate 360", "Midjourney"
    ],
    soft: [
      "Autonomy", "Curious", "Team Player", "Time Management",
      "Quick Learner", "Optimistic", "Problem Solving", "[More to be discovered...]"
    ]
  }
};

export const PROJECTS = [
  {
    id: "loreal-ai",
    title: "Creative AI Strategy: L'Oréal 'Fantastic Learning'",
    category: "AI Generated Visual Asset",
    objective: "Boost global employee engagement for digital learning events.",
    solution: "Engineered a consistent 3D character universe using Midjourney and Nano Banana 2.",
    impact: "Achieved a 10% increase in participation rates.",
    skills: ["Midjourney", "Prompt Engineering", "Creative Operations"],
    github: "https://github.com/JaneWu0922/Portfolio/tree/main/AI%20Generated%20Visual%20Asset",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "amazon-recommender",
    title: "Recommender System: Amazon Personalization",
    category: "Recommender System",
    description: "Built a custom recommendation engine using the Amazon Dataset. Implementing collaborative filtering and content-based algorithms.",
    skills: ["Collaborative Filtering", "Python", "Data Science"],
    github: "https://github.com/JaneWu0922/Portfolio/blob/main/Recommender%20System/Recommender_system_Jane-2.ipynb",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "spotify-predictor",
    title: "Spotify Popularity Predictor",
    category: "Data Science",
    description: "Analyzed song features (tempo, energy, danceability) to predict track popularity using Machine Learning.",
    skills: ["Machine Learning", "Data Analysis", "Python"],
    github: "https://github.com/JaneWu0922/Portfolio/tree/main/Data_Science",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "spam-detection",
    title: "Deep Learning: Spam Detection",
    category: "Deep Learning",
    description: "Developed an end-to-end Deep Learning model to classify spam emails with a functional Streamlit UI.",
    skills: ["Deep Learning", "Streamlit", "NLP"],
    github: "https://github.com/JaneWu0922/Portfolio/tree/main/Deep%20Learning",
    image: "https://github.com/JaneWu0922/Portfolio/blob/main/AI%20Generated%20Visual%20Asset/Gemini_Generated_Image_a0omx3a0omx3a0om.png?raw=true"
  },
  {
    id: "nlp-sentiment",
    title: "NLP: Sentiment Analysis",
    category: "NLP",
    description: "Multi-class classification of tweets into emotions (Joy, Sadness, Fear, Anger).",
    skills: ["NLP", "Sentiment Analysis", "Python"],
    github: "https://github.com/JaneWu0922/Portfolio/tree/main/NLP",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "computer-vision",
    title: "Computer Vision Projects",
    category: "Computer Vision",
    description: "Advanced image processing and object detection implementations.",
    skills: ["OpenCV", "PyTorch", "Computer Vision"],
    github: "https://github.com/JaneWu0922/Portfolio/tree/main/Computer%20vision",
    image: "https://images.presentationgo.com/2025/05/vr-holographic-interface-student.jpg"
  }
];

export const EXPERIENCE = [
  {
    company: "L’Oréal",
    role: "Global Digital Learning Intern",
    period: "September 2025 — February 2026",
    location: "Clichy",
    highlights: [
      "Designed personalized AI learning journeys to help employees identify relevant learning paths.",
      "Analyzed engagement data from 1M+ platform connections using Python automation.",
      "Integrated AI features like personalized content recommendations into the internal platform."
    ]
  },
  {
    company: "Qonto",
    role: "Workplace Assistant",
    period: "January 2024 – July 2024",
    location: "Paris",
    highlights: [
      "Developed budget forecasts and tracked KPIs, optimizing resource allocation for 80% occupancy.",
      "Participated in testing Dust, Qonto's in-house Gen-AI tool for HR.",
      "Led 10 onboarding sessions with a 4.7/5 satisfaction rate."
    ]
  }
];

export const EDUCATION = [
  {
    school: "EPITA",
    degree: "MSc in AI for Marketing Strategy",
    period: "September 2024 — March 2026",
    location: "Le Kremlin-Bicêtre",
    details: "Python, Data Science, Machine Learning, Project Management, Deep Learning, Data Privacy, Computer Vision, Operational and Digital Marketing, SEO"
  },
  {
    school: "ESSCA",
    degree: "Bachelor of International Management",
    period: "September 2021 — August 2024",
    location: "Boulogne-Billancourt",
    details: "Major de la promotion. Marketing Project, Multimedia Communication, Finance, Digital Marketing, Cross-Cultural Management, International Trade"
  }
];
