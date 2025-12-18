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
        title: "Network Packet Inspection and Anomaly Detection",
        designation: "1 Project Associate/Research Associate",
        deadlineIso: "2025-12-28T23:59:00+05:30",
        applyLink:
          "https://forms.gle/PziVyA1hjQvHfPw16",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Knowledge of networking fundamentals, including protocols (e.g., TCP/IP, HTTP, DNS) and packet inspection concepts.",
            "Demonstrated experience in using Large Language Models (LLMs) and natural language processing techniques is required.",
            "Familiarity with tools for network traffic analysis (e.g., Wireshark, TCPDump) and packet data handling is a plus.",
            "Proficiency in machine learning frameworks (e.g., TensorFlow, PyTorch) is a must.",
            "Proficiency in Python, with experience in libraries such as Scikit-Learn, Numpy, and Pandas.",
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
