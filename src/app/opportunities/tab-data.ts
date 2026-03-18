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
        deadlineIso: "2026-02-13T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSeFD5LQXqCVZTNrAUlApqCN8gmn4rrSkAXkREnSTNDtw-AciQ/viewform",
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
    title: "Project / Research Associate",
    positions: [
      {
        title: "GPU Rack Server Administrator",
        designation: "1 Project Associate/Research Associate",
        deadlineIso: "2026-03-31T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/1fwz7tl103NJuBOHT471b6EK_aDjovUEJrPppH7gg3vs",
        content: {
          type: "list",
          items: [
            "Bachelor's Degree (B.E., B.Tech., BCA, MCA, M.Tech or equivalent) in a relevant Engineering or Computing discipline.",
            "1+ years of hands-on experience in System Administration, DevOps, or HPC/Cluster management.",
            "Demonstrated proficiency in Python and Bash scripting for system automation, monitoring, and infrastructure management is essential.",
            "Solid theoretical understanding and practical experience in setting up and maintaining high-performance computing (HPC) environments, including GPU cluster management and SLURM scheduling or similar resource managers.",
            "Strong programming, debugging, and advanced system troubleshooting skills across complex distributed computing systems are a significant advantage.",
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
