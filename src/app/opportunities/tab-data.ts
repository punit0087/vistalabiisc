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
    positions: [],
  },

  {
    id: "tab-2",
    title: "Project / Research Associate",
    positions: [
      {
        title:
          "Machine Learning-based Automotive Cybersecurity (Automotive-ML)",
        designation: "1 Project Associate / Junior Research Fellow",
        deadlineIso: "2025-09-10T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSeXEp6RxUvljrToXdm3Rg7erZU2nvZHpTVcKFxHnrcC-70a3w/viewform",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in Computer Science, Electronics, Electrical, or Automotive Engineering, with coursework in machine learning, networking, or cybersecurity. ",
            "Ability to process and analyze large datasets, perform explorative data analysis and feature extraction from time-series or network data, and evaluate models. ",
            "Proficiency in Python, with experience in ML/DL frameworks like Scikit-learn, PyTorch, or TensorFlow for building and testing detection models.",
            "Basic understanding of intrusion detection systems (IDS), threat modeling, or common attack patterns in networks.",
            "Familiarity with CAN bus protocols, Automotive Ethernet, or network packet structures and experience with tools such as Wireshark, CAN-utils, or Scapy is a plus.",
          ],
        },
      },
      {
        title:
          "Anomaly Detection on Large-Scale Data  for Anti Money Laundering in FinTech",
        designation:
          "1 Project Associate / Software Engineer / Research Associate",
        deadlineIso: "2025-09-10T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSeXEp6RxUvljrToXdm3Rg7erZU2nvZHpTVcKFxHnrcC-70a3w/viewform",
        content: {
          type: "list",
          items: [
            "B.Tech/MTech/PhD in CS/AI/ECE or related fields with a strong background in machine/deep learning and graph neural networks (GNNs).",
            "Solid understanding of machine learning concepts (e.g., bias-variance trade-off, overfitting, regularization) and practical experience implementing models using real-world datasets.",
            "Proficiency in Python programming and familiarity with graph analytics libraries/tools (e.g., Pytorch, Geometric, DGL etc.) and data visualization libraries (matplotlib, seaborn) are highly desirable.",
            "Prior work experience with large-scale data processing is a plus.",
            "Highly motivated and self-driven with the ability to quickly learn on the fly.",
          ],
        },
      },
    ],
  },
  {
    id: "tab-3",
    title: "Project / Research Scientist",
    positions: [
      {
        title:
          "Anomaly Detection on Large-Scale Data  for Anti Money Laundering in FinTech",
        designation: "1 Project Scientist / Postdoctoral Fellow",
        deadlineIso: "2025-09-10T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSeXEp6RxUvljrToXdm3Rg7erZU2nvZHpTVcKFxHnrcC-70a3w/viewform",
        content: {
          type: "list",
          items: [
            "B.Tech/MTech/PhD in CS/AI/ECE or related fields with a strong background in machine/deep learning and graph neural networks (GNNs).",
            "Solid understanding of machine learning concepts (e.g., bias-variance trade-off, overfitting, regularization) and practical experience implementing models using real-world datasets.",
            "Proficiency in Python programming and familiarity with graph analytics libraries/tools (e.g., Pytorch, Geometric, DGL etc.) and data visualization libraries (matplotlib, seaborn) are highly desirable.",
            "Prior work experience with large-scale data processing is a plus.",
            "Highly motivated and self-driven with the ability to quickly learn on the fly.",
          ],
        },
      },
    ],
  },
];
