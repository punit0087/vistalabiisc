"use client";
import React, { useState, ChangeEvent } from "react";
import { BackgroundGradient } from "../../components/ui/card";
import Image from "next/image";
import punith from "@/assets/profile/potrait/punit_rathore.jpg";
import viswajeet from "@/assets/profile/potrait/viswajeet.jpg";
import mayesh from "@/assets/profile/mayesh.jpg";
import alok from "@/assets/profile/potrait/AlokenduMazumder.jpg";
import paritosh from "@/assets/profile/potrait/ParitoshTiwari.jpg";
import tirthajit from "@/assets/profile/potrait/TirthajitBaruah.jpg";
import srs from "@/assets/profile/potrait/SouravRanjan.jpg";
import adityaA from "@/assets/profile/potrait/AdityaArvind.jpg";
import parikshit from "@/assets/profile/potrait/ParikshitSinghRathore.jpg";
import rankit from "@/assets/profile/potrait/Rankit.jpg";
import anushtha from "@/assets/profile/potrait/AnushthaTamrakar.jpg";
import pruthvish from "@/assets/profile/potrait/pruthvish.jpg";
import rishab from "@/assets/profile/potrait/RishabRajeshSharma.jpg";
import kunal from "@/assets/profile/Kunal.jpg";
import Romit from "@/assets/profile/Romit Bhaumik.jpg";
import jyotish from "@/assets/profile/potrait/Jyotish.jpg";
import ram from "@/assets/profile/potrait/Ram Samarth B B.jpg";
import rishabsabharwal from "@/assets/profile/potrait/RishabhSabharwal.jpg";
import shaurya from "@/assets/profile/potrait/Shaurya.jpg";
import sidhant from "@/assets/profile/potrait/SidhantSharma.jpg";
import syedlateef from "@/assets/profile/potrait/SyedLateef.jpg";
import Areddy from "@/assets/profile/potrait/reddy.jpg";
import Dprofile from "@/assets/profile/default-profile.svg";

import Bdebnath from "@/assets/profile/potrait/BiswadeepDebnath.png";
import ilana from "@/assets/profile/potrait/IlaAnanta.jpg";
import ritwik from "@/assets/profile/potrait/RithwikPradeep.jpg";
import Arnab from "@/assets/profile/potrait/ArnabRoy.jpg";
import Srikar from "@/assets/profile/potrait/VedantamSrikar.jpg";

interface Person {
  image: string;
  name: string;
  designation: string;
  designationLabel: string;
  email: string;
  research: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  portfolio?: string;
}

const data: Person[] = [
  {
    image: punith.src,
    name: "Dr. Punit Rathore",
    designation: "Assistant Professor",
    designationLabel: "Lab Convener",
    email: "prathore@iisc.ac.in",
    research:
      "Big data analytics, Un/Semi/Self-supervised learning, Visual Analytics.",
    linkedin: "https://www.linkedin.com/in/punit0000/",
    github: "https://github.com/punit0087",
    scholar: "https://scholar.google.com/citations?user=2clQgooAAAAJ&hl=en",
    portfolio: "/P_portfolio/",
  },
  {
    image: viswajeet.src,
    name: "Dr. Vishwajeet Pattanaik",
    designation: "Specialist Scientist",
    designationLabel: "Research Staff",
    email: "vishwajeetp@iisc.ac.in",
    research:
      "Machine Learning, Image Processing, Ubiquitous Computing, Collective Intelligence, Human-Computer Interaction",
    linkedin: "https://www.linkedin.com/in/vishwajeet-pattanaik/",
    github: "https://github.com/vpattanaik",
    scholar:
      "https://scholar.google.com/citations?user=J5OFv5EAAAAJ&hl=en&oi=ao",
    portfolio: "",
  },
  {
    image: pruthvish.src,
    name: "Dr. Pruthvish Singh Rajput",
    designation: "Post-Doctoral Fellow",
    designationLabel: "Research Staff",
    email: "pruthvishr@iisc.ac.in",
    research:
      "Intelligent Transportation Systems, Machine Learning, Internet of Things, Embedded Systems.",
    linkedin:
      "https://www.linkedin.com/in/pruthvish-rajput-435636187/?originalSubdomain=in",
    github: "",
    scholar: "https://scholar.google.co.in/citations?user=zYOX7yYAAAAJ&hl=en",
    portfolio: "",
  },
  {
    image: Areddy.src,
    name: "Dr. Aravind Reddy",
    designation: "Post-Doctoral Fellow",
    designationLabel: "Research Staff",
    email: "aravindapn@iisc.ac.in",
    research:
      "Intelligent Transportation Systems, Machine Learning, Internet of Things, Embedded Systems.",
    linkedin: "https://www.linkedin.com/in/aravind-reddy-p-n-ab758315a/",
    github: "https://github.com/Aravinda27",
    scholar: "https://scholar.google.com/citations?user=R6r5Pb4AAAAJ&hl=en",
    portfolio: "",
  },

  // {
  //   image: Dprofile.src,
  //   name: "Dr. Nidhi Ahlawat",
  //   designation: "Post-Doctoral Fellow",
  //   designationLabel: "Research Staff",
  //   email: "aravindapn@iisc.ac.in",
  //   research: "Unsupervised Learning, Clustering, Anomaly Detection",
  //   linkedin:
  //     "https://www.linkedin.com/in/nidhi-ahlawat-4b6629249/?originalSubdomain=in",
  //   github: "",
  //   scholar: "https://scholar.google.com/citations?user=kit17koAAAAJ&hl=en",
  //   portfolio: "",
  // },

  {
    image: adityaA.src,
    name: "Aditya Arvind",
    designation: "Project Scientist",
    designationLabel: "Research Staff",
    email: "adityaarvind@iisc.ac.in",
    research: "Big Data Analytics, Predictive Maintenance, Computer Vision",
    linkedin: "https://www.linkedin.com/in/adityaarvind5696",
    github: "https://github.com/aarvind14",
    scholar: "",
    portfolio: "",
  },

  {
    image: mayesh.src,
    name: "Mayesh Mohapatra",
    designation: "Project Associate",
    designationLabel: "Research Staff",
    email: "mayeshm@iisc.ac.in",
    research: "Computer Vision, 3D-Object Detection and Tracking, GANs.",
    linkedin: "https://www.linkedin.com/in/mayesh-mohapatra/",
    github: "https://github.com/MayeshMohapatra",
    scholar: "https://scholar.google.com/citations?user=2IRfuAcAAAAJ&hl=en",
    portfolio: "",
  },

  {
    image: parikshit.src,
    name: "Parikshit Singh Rathore",
    designation: "Junior Research Fellow",
    designationLabel: "Research Staff",
    email: "parikshits@iisc.ac.in",
    research: "Self-Supervised Learning, AI for Good, Edge AI, Computer Vision",
    linkedin: "https://www.linkedin.com/in/parikshit-singh-rathore/",
    github: "https://github.com/parikshit14",
    scholar:
      "https://scholar.google.com/citations?user=Lw_B56oAAAAJ&hl=en&oi=ao",
    portfolio: "https://sites.google.com/view/parikshit-singh-rathore",
  },
  {
    image: anushtha.src,
    name: "Anushtha Tamrakar",
    designation: "Project Associate",
    designationLabel: "Research Staff",
    email: "anushtha@fsid-iisc.in",
    research:
      " Machine Learning, Data Science, Deep Learning, Computer Vision.",
    linkedin: "https://www.linkedin.com/in/anushtha-tamrakar-86b17319a/",
    github: "https://github.com/Anushtha18",
    scholar: "",
    portfolio: "",
  },

  // {
  //   image: shaurya.src,
  //   name: "Shaurya Pratap Singh",
  //   designation: "Project Associate",
  //   designationLabel: "Research Staff",
  //   email: "shauryaprat1@iisc.ac.in",
  //   research:
  //     "Computer Vision, Advanced Driver Assistance Systems (ADAS), Sensor Fusion, ML For Constrained Devices",
  //   linkedin: "https://in.linkedin.com/in/shaurya374",
  //   github: "https://github.com/asfriendlyascarbon",
  //   scholar: "",
  //   portfolio: "",
  // },

  // {
  //   image: rishab.src,
  //   name: "Rishab Rajesh Sharma",
  //   designation: "Project Associate (Kotak AI-ML Pre-Doctoral Fellow)",
  //   designationLabel: "Research Staff",
  //   email: "rishabrajes1@iisc.ac.in",
  //   research: "Computer Vision",
  //   linkedin: "https://www.linkedin.com/in/rish01/",
  //   github: "https://github.com/Rish-01",
  //   scholar: "https://scholar.google.com/citations?user=G_2yPOkAAAAJ&hl=en",
  //   portfolio: "https://rish-01.github.io/",
  // },

  {
    image: rishabsabharwal.src,
    name: "Rishabh Sabharwal",
    designation: "Project Associate (Kotak AI-ML Pre-Doctoral Fellow)",
    designationLabel: "Research Staff",
    email: "rishabs@iisc.ac.in",
    research: "Computer Vision, Graph Neural Networks, Optimization Theory",
    linkedin: "https://www.linkedin.com/in/rishabh-sabharwal-a129b41ba/",
    github: "https://github.com/iN8mare",
    scholar: "https://scholar.google.com/citations?hl=en&user=x-uH2B8AAAAJ",
    portfolio: "",
  },

  {
    image: Dprofile.src,
    name: "Siddhant Saxena",
    designation: "Project staff",
    designationLabel: "Research Staff",
    email: "mrsiddy.py@gmail.com",
    research:
      "Geometric Deep Learning, Neural Algorithmic Reasoning, LLMs, Computer Vision, Combinatorial Optimizations",
    linkedin: "",
    github: "https://github.com/mr-siddy",
    scholar: "",
    portfolio: "https://sites.google.com/view/siddhant-saxena/",
  },

  {
    image: alok.src,
    name: "Alokendu Mazumder",
    designation: "PMRF-PhD Scholar (Started 2021)",
    designationLabel: "Research Scholar",
    email: "alokendum@iisc.ac.in",
    research: "Computer Vision, 3D-Object Detection and Tracking, GANs.",
    github: "https://github.com/alokendumazumder",
    scholar: "https://scholar.google.com/citations?user=N_kcD4cAAAAJ&hl=en",
    portfolio: "https://alokendumazumder.github.io",
  },
  {
    image: paritosh.src,
    name: "Paritosh Tiwari",
    designation: "PhD Scholar (Started 2022)",
    designationLabel: "Research Scholar",
    email: "paritosht@iisc.ac.in",
    research: "Clustering, Unsupervised Learning and Data Analytics",
    linkedin: "https://www.linkedin.com/in/paritosh-tiwari-101/",
    github: "https://github.com/paritosh-101",
    scholar: "https://scholar.google.com/citations?user=HlDP3CcAAAAJ&hl=en",
  },

  {
    image: tirthajit.src,
    name: "Tirthajit Baruah",
    designation: "PhD Scholar (Started 2023)",
    designationLabel: "Research Scholar",
    email: "tirthajitb@iisc.ac.in",
    research:
      "AI for healthcare, Medical image processing, Computer vision, Representation learning.",
    linkedin: "linkedin.com/in/tirthajit-baruah",
    github: "https://github.com/tirthajit",
    scholar:
      "https://scholar.google.com/citations?hl=en&authuser=1&user=gDr0VrYAAAAJ",
  },
  {
    image: srs.src,
    name: "Sourav Ranjan Saraf",
    designation: "PhD Scholar (Started 2023)",
    designationLabel: "Research Scholar",
    email: "souravr@iisc.ac.in",
    research: "Deep Learning",
    linkedin: "",
    github: "",
    scholar: "",
    portfolio: "",
  },
  {
    image: rankit.src,
    name: "Rankit Kachroo",
    designation: "PhD Scholar (Started 2024)",
    designationLabel: "Research Scholar",
    email: "rankitk@iisc.ac.in",
    research:
      "Human-Computer Interaction, Computational Sensorimotor Learning, Representation Learning, Unsupervised Learning",
    linkedin: "https://in.linkedin.com/in/rankit-kachroo-156956178",
    github: "",
    scholar: "",
    portfolio: "",
  },

  {
    image: Dprofile.src,
    name: "Shailja Sharma",
    designation: "M.Tech Research (Started 2024)",
    designationLabel: "Research Scholar",
    email: "",
    research: "Unsupervised Learning, Computer Vision, Cyber-Security",
    linkedin: "https://in.linkedin.com/in/rankit-kachroo-156956178",
    github: "",
    scholar: "",
    portfolio: "",
  },

  {
    image: Romit.src,
    name: "Romit Bhaumik",
    designation: "M.Tech in Robotics and Autonomous Systems (Started 2023)",
    designationLabel: "M.Tech",
    email: "romitbhaumik@iisc.ac.in",
    research: "Deep Learning, Image Processing, Multimodal Models",
    linkedin: "https://www.linkedin.com/in/romit-bhaumik-24a039217",
    github: "https://github.com/RomitBhaumikGit",
    scholar: "",
    portfolio: "",
  },
  {
    image: kunal.src,
    name: "Kunal Wasnik",
    designation: "M.Tech in Robotics and Autonomous Systems (Started 2023)",
    designationLabel: "M.Tech",
    email: "kunalajay@iisc.ac.in",
    research: "Unsupervised Machine Learning, Cyber Security, Edge AI",
    linkedin: "www.linkedin.com/in/kunal-wasnik",
    github: "www.github.com/kunalwasnik",
    scholar: "",
    portfolio: "",
  },

  // {
  //   image: akhilsharma.src,
  //   name: "Akhil",
  //   designation: "Started Jun 2024",
  //   designationLabel: "PhD Scholar",
  //   email: "akhilsharma.off@gmail.com",
  //   research:
  //     "Mixed Reality, Human Computer Vision, Reinforcement Learning, Augmented Reality",
  //   linkedin: "https://www.linkedin.com/in/akhil-sharma-35a880202",
  //   github: "https://github.com/Akhil-Sharma30",
  //   scholar: "",
  //   portfolio: "https://akhil-sharma30.github.io/",
  // },

  // {
  //   image: sudarshan.src,
  //   name: "Sudarshan",
  //   designation: "Started Aug 2022",
  //   designationLabel: "PhD Scholar",
  //   email: "sudb97@gmail.com",
  //   research: "Unsupervised Learning, Edge AI",
  //   linkedin: "https://www.linkedin.com/in/sudarshan-bandyopadhyay-11628a13a/",
  //   github: "",
  //   scholar: "",
  //   portfolio: "",
  // },

  // {
  //   image: akash.src,
  //   name: "Akash",
  //   designation: "Started Aug 2023",
  //   designationLabel: "PhD Scholar",
  //   email: "akaagr10@gmail.com",
  //   research: "Computer Vision, Edge AI, Deep Learning, Explainable AI",
  //   linkedin: "https://www.linkedin.com/in/akash-agrawal-059307143/",
  //   github: "https://github.com/akash1003",
  //   scholar: "",
  //   portfolio: "",
  // },
  {
    image: jyotish.src,
    name: "Jyotish Ranjan",
    designation: "M.Tech in Artificial Intelligence (Started 2023)",
    designationLabel: "M.Tech",
    email: "jyotishr@iisc.ac.in",
    research: "Computer Vision, NLP, ML",
    linkedin: "https://in.linkedin.com/in/jyotish-ranjan-110a22211",
    github: "",
    scholar: "",
    portfolio: "",
  },

  {
    image: Dprofile.src,
    name: "Ashhar Zaman",
    designation: "M.Tech in Mobility Engineering (Started 2023)",
    designationLabel: "M.Tech",
    email: "ashharzaman@iisc.ac.in",
    research: "Cyber-Security, ML, Mobility, Transportation",
    linkedin: "https://in.linkedin.com/in/ashharzaman/",
    github: "",
    scholar: "",
    portfolio: "",
  },

  // {
  //   image: piyush.src,
  //   name: "Piyush Kumar",
  //   designation: "Started Jan 2023",
  //   designationLabel: "PhD Scholar",
  //   email: "piyushkumar17101999@gmail.com",
  //   research:
  //     "Machine Learning, Deep Learning, Computer Vision, Reinforcement Learning ",
  //   linkedin: "https://in.linkedin.com/in/piyush-kumar-singh-998819153",
  //   github: "",
  //   scholar: "",
  //   portfolio: "",
  // },
  // {
  //   image: naveen.src,
  //   name: "I Navin Kumar",
  //   designation: "Started Aug 2022",
  //   designationLabel: "PhD Scholar",
  //   email: "navink@iisc.ac.in",
  //   research: "Facial Emotion Recognition using Non-Frontal Images",
  //   linkedin:
  //     "https://www.linkedin.com/in/i-navin-kumar-5bb775167/?originalSubdomain=in",
  //   github: "",
  //   scholar: "",
  //   portfolio: "",
  // },
  // {
  //   image: srinath.src,
  //   name: "B Srinath Achary",
  //   designation: "Started Aug 2022",
  //   designationLabel: "Mtech Student",
  //   email: "srinatha@iisc.ac.in",
  //   research: "Explainability in VAT/iVAT methods.",
  //   linkedin:
  //     "https://www.linkedin.com/in/b-srinath-achary-652654193/?originalSubdomain=in",
  //   github: "",
  //   scholar: "",
  //   portfolio: "",
  // },
  // {
  //   image: alice.src,
  //   name: "Alice Laguri",
  //   designation: "Started Aug 2022",
  //   designationLabel: "Mtech Student",
  //   email: "alicelaguri@iisc.ac.in",
  //   research: "iVAT with Isolation Kernel on various embeddings.",
  //   linkedin:
  //     "https://www.linkedin.com/in/alice-laguri/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=in",
  //   github: "",
  //   scholar: "",
  //   portfolio: "",
  // },

  // {
  //   image: abhinav.src,
  //   name: "Abhinav Raja",
  //   designation: "Research Associate-I",
  //   designationLabel: "Research Staff",
  //   email: "abhinav.vt4@gmail.com",
  //   research:
  //     "Data Science, Machine Learning, Computer Vision, Object Detection",
  //   linkedin: "https://www.linkedin.com/in/abhinav-raja-2300471ab",
  //   github: "https://github.com/Abhinav-974",
  //   scholar: "",
  //   portfolio: "",
  // },

  {
    image: sidhant.src,
    name: "Sidhant Sharma",
    designation: "M.Tech in Artificial Intelligence (Started 2023)",
    designationLabel: "M.Tech",
    email: "ssidhant@iisc.ac.in",
    research: "Machine Learning,  Representation Learning, Deep Learning.",
    linkedin: "https://www.linkedin.com/in/sidhant-sharma-415806210/",
    github: "https://github.com/sidhantjsr98",
    scholar: "",
    portfolio: "",
  },
  {
    image: syedlateef.src,
    name: "Syed Lateef",
    designation: "M.Tech in Artificial Intelligence (Started 2023)",
    designationLabel: "M.Tech",
    email: "syedlateef@iisc.ac.in",
    research:
      "Computer Vision, Natural Language Processing, Optimisation, Deep Learning and pattern recognition",
    linkedin: "https://www.linkedin.com/in/syed-lateef-47676539/",
    github: "https://github.com/Syed-Lateef",
    scholar: "",
    portfolio: "",
  },

  {
    image: Bdebnath.src,
    name: "Biswadeep Debnath",
    designation: "M.Tech in Robotics and Autonomous Systems (Started 2024)",
    designationLabel: "M.Tech",
    email: "biswadeepd@iisc.ac.in",
    research: "Machine Learning, Computer Vision, Edge AI",
    linkedin: "https://www.linkedin.com/in/biswadeep-debnath-03634b202",
    github: "https://www.github.com/biswa2001github",
    scholar: "",
    portfolio: "",
  },

  {
    image: ilana.src,
    name: "Ila Ananta",
    designation: "M.Tech in Robotics and Autonomous Systems (Started 2024)",
    designationLabel: "M.Tech",
    email: "ilaananta@iisc.ac.in",
    research:
      "Reinforcement Learning, ML, AI, Deep Learning, Statistical Modeling, Data Science, Decision-Making Systems",
    linkedin: "https://www.linkedin.com/in/ila-ananta-padha-98a687137/",
    github: "",
    scholar: "https://scholar.google.com/citations?user=wZnOtJ0AAAAJ&hl=en",
    portfolio: "",
  },
  {
    image: ritwik.src,
    name: "Rithwik Pradeep",
    designation: "M.Tech in Robotics and Autonomous Systems (Started 2024)",
    designationLabel: "M.Tech",
    email: "rithwikp@iisc.ac.in",
    research: "Computer Vision, Edge AI",
    linkedin: "https://www.linkedin.com/in/rithwik-pradeep/",
    github: "",
    scholar: "",
    portfolio: "",
  },
  {
    image: Arnab.src,
    name: "Arnab Roy",
    designation: "M.Tech in Artificial Intelligence (Started 2024)",
    designationLabel: "M.Tech",
    email: "arnabroy@iisc.ac.in",
    research: "",
    linkedin: "",
    github: "",
    scholar: "",
    portfolio: "",
  },
  {
    image: Srikar.src,
    name: "Srikar Vedantam",
    designation: "M.Tech in Artificial Intelligence (Started 2024)",
    designationLabel: "M.Tech",
    email: "srikarv@iisc.ac.in",
    research: "Graph Machine Learning",
    linkedin: "https://www.linkedin.com/in/rithwik-pradeep/",
    github: "",
    scholar: "",
    portfolio: "",
  },
  {
    image: ram.src,
    name: "Ram Samarth B B",
    designation: "Visiting Student (Kotak AI-ML Intern, 2024-25)",
    designationLabel: "Research Staff",
    email: "ramsamarthbb@iisc.ac.in",
    research:
      "Graph Neural Network, Geometric Deep Learning, Parameterised Differential Equations, Federated Learning",
    linkedin: "https://www.linkedin.com/in/ram-samarth-b-b-340731243/",
    github: "https://github.com/achiverram28/",
    scholar: "",
    portfolio: "",
  },

  // {
  //   image: kunalsohoo.src,
  //   name: "Kunal Kumar Sahoo",
  //   designation: "Started Jan 2024",
  //   designationLabel: "Research Staff",
  //   email: "kunal.sahoo2003@gmail.com",
  //   research:
  //     "Deep Learning, Deep Reinforcement Learning, Computer Vision, Edge AI",
  //   linkedin: "https://www.linkedin.com/in/kunal-kumar-sahoo/",
  //   github: "https://github.com/Kunal-Kumar-Sahoo",
  //   scholar: "https://scholar.google.com/citations?user=3hFtAF0AAAAJ&hl=en",
  //   portfolio: "https://kunal-kumar-sahoo.github.io/",
  // },
];

const filterData = (label: string, searchTerm: string) => {
  return data.filter((person) => {
    const matchesLabel = !label || person.designationLabel === label;
    const matchesSearchTerm =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.research.toLowerCase().includes(searchTerm.toLowerCase());
    person.designationLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLabel && matchesSearchTerm && person;
  });
};

export default function CardP() {
  const [filteredData, setFilteredData] = useState<Person[]>(data);
  const [filter, setFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const label = e.target.value;
    setFilter(label);
    setFilteredData(filterData(label, searchTerm));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredData(filterData(filter, term));
  };

  return (
    <div className="max-w-[90%] m-auto">
      <div className="flex justify-between sm:flex-col sm:w-full">
        <div className="mb-4">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, designation, or interest"
            className="p-4 border rounded-md w-[20vw] bg-zinc-900 border-none text-sm text-white outline-none sm:w-full"
          />
        </div>
        <div className="mb-4">
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="p-4 text-sm border-none bg-zinc-900 text-white outline-none rounded-md mr-4 select-none sm:w-full"
          >
            <option value="">All</option>
            <option value="Lab Head">Lab Convener</option>
            <option value="Research Staff">Research Staff</option>
            <option value="Research Scholar">Research Scholar</option>
            <option value="M.Tech">M.Tech</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
        {filteredData.map((person, index) => (
          <div key={index} className="p-8 sm:p-0 sm:mb-8">
            <BackgroundGradient className="rounded-lg h-fit max-w-md p-4 bg-zinc-900">
              <Image
                src={person.image}
                alt={person.name}
                height="400"
                width="400"
                className="w-[35vw] h-[33vh] object-cover rounded-lg sm:w-full sm:h-[35vh]"
              />
              <button className="rounded-lg w-full justify-center p-4 text-white flex items-center space-x-1 mb-4 text-xs font-bold bg-zinc-800">
                <span>{person.designationLabel}</span>
              </button>
              <p className="text-xl font-semibold sm:text-xl mt-4 text-neutral-200">
                {person.name}
              </p>
              <div className="text-sm text-neutral-400 leading-6">
                <div className="font-bold">
                  {person.designation} <br />
                </div>
                <div className="pt-3 mb-20">
                  <b>Email: </b>
                  <a href={`mailto:${person.email}`}>
                    {person.email.replace(/@/g, "[at]").replace(/\./g, "[dot]")}
                  </a>
                  <br />
                  <b>Research Interests:</b>
                  <p className="h-[7vh] sm:h-[6vh]"> {person.research}</p>
                </div>
                <div id="links" className="m-4 ml-0 flex absolute bottom-0">
                  {person.linkedin && (
                    <a
                      className="w-[40px]"
                      target="_blank"
                      href={person.linkedin}
                    >
                      <svg
                        fill="#fff"
                        height=""
                        width=""
                        version="1.1"
                        id="Layer_1"
                        viewBox="-143 145 512 512"
                      >
                        <path
                          d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z
     M41.4,508.1H-8.5V348.4h49.9V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7
    c18.4,0,29.7,11.9,30.1,27.7C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4
    c-14.9,0-23.2,10-27,19.6c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6
    c35.5,0,63.3,23,63.3,72.4V508.1z"
                        />
                      </svg>
                    </a>
                  )}
                  {person.github && (
                    <a
                      className="w-[40px] ml-4"
                      target="_blank"
                      href={person.github}
                    >
                      <svg aria-label="GitHub" role="img" viewBox="0 0 512 512">
                        <rect width="512" height="512" rx="15%" fill="#fff" />
                        <path
                          fill="#000"
                          d="M335 499c14 0 12 17 12 17H165s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"
                        />
                      </svg>
                    </a>
                  )}
                  {person.scholar && (
                    <a
                      className="w-[40px] ml-4"
                      target="_blank"
                      href={person.scholar}
                    >
                      <svg
                        aria-label="Google Scholar"
                        role="img"
                        viewBox="0 0 512 512"
                      >
                        <rect width="512" height="512" rx="15%" fill="#fff" />
                        <path
                          fill="#000"
                          d="M213 111l-107 94h69c5 45 41 64 78 67-7 18-4 27 7 39-43 1-103 26-103 67 4 45 63 54 92 54 38 1 81-19 90-54 4-35-10-54-31-71-23-18-28-28-21-40 15-17 35-27 39-51 2-17-2-28-6-43l45-38-1 16c-3 2-5 6-5 9v103c2 13 22 11 23 0V160c0-3-2-7-5-8v-25l16-16zm58 141c-61 10-87-87-38-99 56-11 83 86 38 99zm-5 73c60 13 61 63 10 78-44 9-82-4-81-30 0-25 35-48 71-48z"
                        />
                      </svg>
                    </a>
                  )}
                  {person.portfolio && (
                    <a
                      className="w-[40px] ml-4"
                      target="_blank"
                      href={person.portfolio}
                    >
                      <svg
                        fill="#fff"
                        width=""
                        height=""
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3,20V10H8V21H4A1,1,0,0,1,3,20ZM21,4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4V8H21ZM20,21a1,1,0,0,0,1-1V10H10V21Z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </BackgroundGradient>
          </div>
        ))}
      </div>
    </div>
  );
}
