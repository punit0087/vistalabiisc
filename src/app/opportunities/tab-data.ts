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
        title: "GPU Rack Server Administrator ",
        designation: "1 Project Associate",
        deadlineIso: "2025-11-05T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSfECW05DQoXzLUj_eX9Gi8zeK_5kFj6JL48riBq2rueAVuaBA/viewform",
        content: {
          type: "list",
          items: [
            "Bachelor’s Degree (B.E., B.Tech., BCA, MCA, M.Tech or equivalent) in a relevant Engineering or Computing discipline.",
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
