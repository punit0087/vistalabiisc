// tab-data.ts
export interface Position {
  title: string;
  designation: string;
  deadlineIso: string;
  applyLink: string;
  content: {
    type: string;
    items: string[];
  };
}

export interface Tab {
  id: string;
  title: string;
  positions: Position[];
}

export const tabData: Tab[] = [
  {
    id: "tab-1",
    title: "Research Intern / Assistant",
    positions: [
      {
        title: "Annotation Intern",
        designation: "Research Intern",
        deadlineIso: "2026-05-15T23:59:00+05:30",
        applyLink: "https://forms.gle/EKNZGMan6MEEHwnr8",
        content: {
          type: "list",
          items: [
            "Currently enrolled in a program in Computer Science, Data Science, Engineering, or a related field. ",
            "Familiarity with image annotation tools and a basic understanding of computer vision concepts. ",
            "Attention to detail and a commitment to producing high-quality work. ",
            "Prior experience with annotation projects is a plus, but not mandatory.",
          ],
        },
      },
    ],
  },

  {
    id: "tab-2",
    title: "Project / Senior Project Associate",
    positions: [
      {
        title:
          "Road Infrastructure Assessment using ML/Computer Vision Models on Crowd-Sensing Data Collection through Instrumented Vehicle (Road computer vision)",
        designation: "1 Project Associate/Senior Project Associate",
        deadlineIso: "2026-05-10T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSc6u_TfQR9ABsulmgigdzxrTZIao0egUdn36K6V1mFflTGpPw/viewform",
        content: {
          type: "list",
          items: [
            "Proficiency in Python with demonstrated experience in ML and DL libraries (e.g., PyTorch, TensorFlow).",
            "Strong expertise in developing scalable APIs and building high-performance backend systems is required.",
            "Proficiency in SQL/NoSQL databases and high-volume data handling.",
            "Familiarity with OLAP systems for analytical queries and insights.",
            "Experience in ETL pipelines and streaming tools (Kafka).",
            "Knowledge of geospatial data (GPS, mapping, spatial indexing).",
            "Understanding of real-time analytics and dashboarding.",
            "Experience with cloud platforms (AWS) and microservices architecture.",
            "Strong fundamentals in signal processing (IMU data, filtering, noise reduction) is a plus.",
          ],
        },
      },
    ],
  },
  {
    id: "tab-3",
    title: "Project / Research Scientist",
    positions: [],
  },
];
