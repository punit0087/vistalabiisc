"use client";
import { useEffect, useState } from "react";

// Define types for the tabData structure
type ListContent = {
  type: "list";
  items: string[];
};

type ParagraphContent = {
  type: "paragraph";
  text: string;
};

type PositionWithDeadline = {
  title: string;
  deadline: string;
  applyLink: string;
  content: ListContent;
};

type PositionWithoutDeadline = {
  title: string;
  content: ParagraphContent;
};

type Position = PositionWithDeadline | PositionWithoutDeadline;

type Tab = {
  id: string;
  title: string;
  positions: Position[];
};

// Example tab data
const tabData: Tab[] = [
  {
    id: "tab-1",
    title: "Project Staff",
    positions: [
      {
        title:
          "Design and Development of Instrumented Vehicle for Urban Sensing (Development of IoT Sensor System)",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline (for Project Assistant / Associate Software Engineer) ; PhD with 1+ years of experience, preferably in academia, research, or large-scale interdisciplinary projects (for Research Associate / Senior Software Engineer).",
            "Knowledge of/prior experience in working with sensors/sensing system; signal processing, and embedded platforms; mmWave Radar systems",
            "Strong system design; debugging; prototyping skills. ",
            "Demonstrated capacity to work independently, and as a part of a team. ",
            "Strong communication and presentation skills.",
          ],
        },
      },
      {
        title:
          "Design and Development of Instrumented Vehicle for Urban Sensing (Signal Processing)",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline with 1+ years of research experience, preferably in academia, research, or large-scale interdisciplinary projects.",
            "Knowledge of LIDAR and RADAR sensors, data acquisition, and preprocessing methods for 3D environment sensing.",
            "Proficiency in point cloud processing, segmentation, and 3D mapping techniques, with experience using software such as PCL (Point Cloud Library) or Open3D.",
            "Strong programming skills in Python, C++, and experience with libraries for sensor data processing ",
            "Experience with data filtering techniques to refine point cloud data and reduce noise in LIDAR/RADAR outputs is a plus.",
            "Familiarity with SLAM (Simultaneous Localization and Mapping) techniques, including experience with LIDAR SLAM, Visual SLAM, or multi-sensor fusion methods is desirable.",
          ],
        },
      },
      {
        title: "Scalable Graph Neural Networks for Traffic Flow Forecasting",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Basic understanding of GNNs and graph-based models for structured data.",
            "Proficiency in Python and familiarity with relevant machine learning libraries such as PyTorch, TensorFlow, or DGL (Deep Graph Library).",
            "Ability to preprocess and analyze time-series and spatial data",
            "Knowledge of graph theory, linear algebra, and probability/statistics",
            "Basic understanding of traffic flow dynamics is a plus",
          ],
        },
      },
      {
        title:
          "Scalable Video Analytics for Traffic Flow Prediction and Vehicle Re-identification (ReID) from Traffic Surveillance Cameras",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Familiarity with fundamental computer vision concepts, such as object detection, tracking, and image processing techniques.",
            "Proficiency in deep learning for image and video analytics, especially using frameworks like PyTorch, TensorFlow, or Keras.",
            "Understanding of video processing techniques, including background subtraction, frame sampling, and temporal analysis.",
            "Proficiency in Python and experience with relevant libraries -- e.g., OpenCV, NumPy, SciPy.",
            "Basic knowledge of ReID techniques (e.g., feature extraction, similarity metrics) and model architectures, or a strong interest in learning ReID methods for vehicle tracking is a plus.",
          ],
        },
      },
      {
        title:
          "Visual AI for Emission Estimation from DashCams and Traffic Surveillance Cameras",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Familiarity with computer vision techniques for object detection, tracking, and classification",
            "Proficiency in deep learning frameworks (e.g., PyTorch, TensorFlow, Keras) is must.",
            "Fundamental knowledge of image processing, linear algebra, statistics, and probability is desirable",
            "Basic understanding of basic environmental concepts related to emissions, pollution metrics, or air quality measurement is a plus",
          ],
        },
      },
      {
        title:
          "Low-Cost Sensing and Embedded System for Potholes detection and Characterization in low-visible conditions",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Familiarity with embedded development platforms e.g., Arduino, Raspberry Pi, ESP32",
            "Hands-on experience in interfacing sensors with microcontrollers",
            "Proficiency in C/C++ and Python for hardware control and data processing is must",
            "Basic understanding of signal processing techniques, particularly for noise reduction and feature extraction in low-light or low-visibility conditions is a plus.",
          ],
        },
      },
      {
        title:
          "Large Language Models for Networks Packets Inspections and Anomaly Detection",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Fundamental understanding of Large Language Models (LLMs) and natural language processing techniques.",
            "Proficiency in machine learning frameworks (e.g., TensorFlow, PyTorch) is a must.",
            "Knowledge of networking fundamentals, including protocols (e.g., TCP/IP, HTTP, DNS) and packet inspection concepts.",
            "Proficiency in Python, with experience in libraries such as Scikit-learn, Numpy, and Pandas.",
            "Familiarity with tools for network traffic analysis (e.g., Wireshark, tcpdump) and packet data handling is a plus.",
          ],
        },
      },
    ],
  },
  {
    id: "tab-2",
    title: "Intern Positions",
    positions: [
      {
        title: "Generative Adversarial Networks (GAN) based Data Augmentation",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Candidate must be pursuing Bachelor’s Degree in Science/Engineering/Technology",
            "Possess basic knowledge of working of GANs.",
            "Proficiency in working with libraries such as TensorFlow, PyTorch, and Keras.",
            "Familiarity with implementing neural networks, especially GANs.",
            "Knowledge of data preprocessing related to data augmentation techniques is a plus.",
            "Prior experience with edge analytics is preferred.",
          ],
        },
      },
      {
        title:
          "Development of Online Machine Learning Algorithm for Real-Time Adaptability",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Candidate must be pursuing Bachelor’s Degree in Science/Engineering/Technology",
            "Proficiency in Python and familiarity with machine learning libraries such as TensorFlow, PyTorch, and Scikit-learn.",
            "Understanding of online (incremental) learning algorithms and their applications in real-time systems.",
            "Familiarity with concepts like concept drift, model updating, and adaptive learning in dynamic environments.",
          ],
        },
      },
      {
        title:
          "Exploration and Development of Probabilistic Model based Outlier Detection",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Candidate must be pursuing Bachelor’s Degree in Science/Engineering/Technology",
            "Understanding of probabilistic models (e.g., Gaussian Mixture Models, Bayesian Networks, Markov Process) and statistical techniques for anomaly detection.",
            "Familiarity with concepts such as likelihood estimation, Bayesian inference, Density estimation, Transition Probability Modeling.",
            "Proficiency in Python with experience in statistical and data analysis libraries such as NumPy, SciPy, Scikit-learn, and TensorFlow.",
          ],
        },
      },
    ],
  },
  {
    id: "tab-3",
    title: "Research Staff",
    positions: [
      {
        title:
          "Design and Development of Instrumented Vehicle for Urban Sensing (Development of IoT Sensor System)",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline (for Project Assistant / Associate Software Engineer) ; PhD with 1+ years of experience, preferably in academia, research, or large-scale interdisciplinary projects (for Research Associate / Senior Software Engineer).",
            "Knowledge of/prior experience in working with sensors/sensing system; signal processing, and embedded platforms; mmWave Radar systems",
            "Strong system design; debugging; prototyping skills. ",
            "Demonstrated capacity to work independently, and as a part of a team. ",
            "Strong communication and presentation skills.",
          ],
        },
      },
    ],
  },
];

// Type guard for PositionWithDeadline
const isPositionWithDeadline = (
  position: Position
): position is PositionWithDeadline =>
  "deadline" in position && "applyLink" in position;

// Type guard for ListContent
const isListContent = (
  content: ListContent | ParagraphContent
): content is ListContent => content.type === "list";

const Tabs = () => {
  useEffect(() => {
    if (!window.location.hash) {
      const link =
        document.querySelector<HTMLAnchorElement>("#tabs > .tab-link");
      if (link) link.click();
    }
  }, []);

  const [openTab, setOpenTab] = useState<string | null>(null);

  const toggleDropdown = (tabId: string) => {
    setOpenTab((prevTab) => (prevTab === tabId ? null : tabId));
  };

  return (
    <div className="p-32 pt-0 w-[90%] mx-auto sm:p-4">
      <div className="text-zinc-300 text-justify mx-auto mb-10 text-sm font-semibold">
        We are always looking for highly motivated and dynamic people interested
        in exploring challenging areas of big data analytics, unsupervised
        learning, deep-learning, Spatio-temporal data mining, Internet of Things
        (IoT), and Intelligent Transportation, including novel and cutting-edge
        ML/DL techniques across various real-world applications such as
        transportation, autonomous systems, and healthcare. <br />
        <br /> If you are interested, you may find the following opportunities
        at different levels. The successful candidates for any of the following
        positions may have an opportunity to work and collaborate with the
        leading researchers from MIT Cambridge, University of Melbourne,
        University of Sydney, Deakin University, Griffith University, Australia
        etc. <br />
        <br /> NOTE: I often get several emails for the following positions. If
        you have sent your application (through email) for any of the following
        positions and if I did not respond to you within a week, I request you
        to send a reminder email. If you don't hear from me within a week after
        the reminder email, this means I have seen your application carefully
        but did not find it suitable for the advertised positions. <br /> <br />
        <p className="text-xl font-bold text-zinc-200">
          Graduate Research (M.Tech (Research) / PhD)
        </p>
        <p>
          Students who wish to work with me should apply to Robert Bosch Centre
          for Cyberphysical Systems (RBCCPS) (each applicant can apply to three
          departments/centres). Applications are submitted through{" "}
          <a href="https://admissions.iisc.ac.in">admissions.iisc.ac.in</a>{" "}
          during March-April and September-October of every year. Admission
          announcements are made at{" "}
          <a href="https://iisc.ac.in/admissions/">iisc.ac.in/admissions/</a>.
        </p>
        <p>
          <br />
          Prospective candidates interested to join my group can contact me with
          the following information in your email:
        </p>
        <ul className="list-disc ml-[20px]">
          <li>
            One or two sentences on your background and introducing you (please
            keep it as academic and professional only)
          </li>
          <li>
            Why you are writing me? Which particular research work/study/project
            of our lab interests you?
          </li>
          <li>
            What skills and background do you have that you think will be
            helpful?
          </li>
          <li>
            Include your CV. Make sure it reflects your academic performance,
            preferably throughout your career
          </li>
        </ul>
        <br />
        <br />
        <h2 className="text-xl font-bold text-zinc-200">
          Postdoctoral Research
        </h2>
        <p>
          I am always looking for exceptional postdoctoral candidates. Ph.D.
          holders (including those who have submitted the thesis) and Postdocs
          with prior experience and high quality publications in the field of
          unsupervised learning, representation learning, computer vision, deep
          learning, graph analytics, ML for intelligent transportation/smart
          cities are highly encouraged to apply. They are encouraged to email me
          with their CV a brief statement of research interests. Apart from the
          specific project positions, I am also open to consider candidates
          through through the IISc Institute of Eminence (IoE) Post-doctoral
          fellowship/IISc C.V Raman Postdoctoral Fellowship/National
          Postdoctoral Fellowship (N-PDF)/CSIR-NPDF/Pratikha Trust Postdoctoral
          Fellowship/UGC DS Kothari Fellowship/WISE-PDF.
        </p>
        <br />
        <br />
        <h2 className="text-xl font-bold text-zinc-200">
          Research Internships/Assistantships
        </h2>
        <p>
          Candidates currently pursuing their undergraduate degree in
          engineering (Computer Science/Electrical/Electronics Engineering) or
          Applied Mathematics are encouraged to apply. Please send me an email
          with the subject title "Application for &lt;position&gt;,
          &lt;duration&gt;" e.g., Application for Internship, April-August 2024,
          with your CV (that includes GPA, past/current projects, programming
          knowledge) with 1-2 paragraphs mentioning your research interests and
          how you can contribute to our lab.
        </p>
        <p>
          <br />I highly recommend you to apply for INSA Summer Research
          Fellowship, Focus Area Science Technology Summer Fellowship (FAST-SF)
          programs. Applications for both the programs are normally issued in
          October-November every year.
        </p>
        <p>
          You may also explore research opportunities at RBCCPS and CiSTUP
          website and on my Linkedin [Every year in summer and winter].
        </p>
      </div>
      <a
        href="#tabs"
        className="bg-white text-black w-4/5 rounded-md animate-blink p-5"
      >
        <button>Apply Now</button>
      </a>
      <div id="tabs" className="sm:mt-[35%] sm:p-5 h-[60vh] mt-[30vh]">
        {tabData.map((tab) => (
          <div key={tab.id}>
            <span id={tab.id} className="tab-switch fixed"></span>
            <a
              href={`#${tab.id}`}
              className="flex text-md font-bold text-zinc-300 tab-link p-4 sm:mx-0 mb-4 no-underline hover:text-zinc-600"
            >
              {tab.title}
            </a>
            <div className="tab-content box-border float-right hidden w-full border border-zinc-800 text-white rounded-[6px] p-8 text-sm">
              {tab.positions.map((position, index) => (
                <div key={index}>
                  <div
                    className="flex justify-between items-center cursor-pointer my-4 mb-10"
                    onClick={() => toggleDropdown(`${tab.id}-${index}`)}
                  >
                    <p className="text-lg font-bold text-zinc-300">
                      {position.title} <br />
                      {isPositionWithDeadline(position) && (
                        <span className="text-sm text-zinc-400 font-normal">
                          Deadline <b>{position.deadline}</b>
                        </span>
                      )}
                    </p>
                    {isPositionWithDeadline(position) && position.applyLink && (
                      <a
                        href={position.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-zinc-800 text-white rounded-[6px] p-4 text-sm hover:bg-zinc-300 hover:text-black"
                      >
                        Apply Now
                      </a>
                    )}
                  </div>
                  {openTab === `${tab.id}-${index}` && (
                    <div className="text-md text-zinc-400 w-[70%] mb-12">
                      {isListContent(position.content) ? (
                        <ul className="list-disc ml-10">
                          {position.content.items.map(
                            (item: string, idx: number) => (
                              <li key={idx}>{item}</li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>{position.content.text}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
