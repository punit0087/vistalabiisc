export interface Tab {
  id: string;
  title: string;
  positions: {
    title: string;
    designation: string;
    deadline: string;
    applyLink: string;
    content: {
      type: string;
      items: string[];
    };
  }[];
}

export const tabData: Tab[] = [
  {
    id: "tab-1",
    title: "Postdoc Research / Research Scientist",
    positions: [
      {
        title: `Design and Development of Instrumented Vehicle for Urban Sensing --Development of IoT Sensor System / Embedded system interfacing (Instrumented-Vehicle-SensorSystem)`,
        designation: "Research Associate / Senior Software Engineer",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Master's degree with 2+ years of experience or PhD (ideally, with 1+ years of experience),  in academia, research, or large-scale interdisciplinary projects.",
            "Demonstrated experience to oversee the planning, execution, and delivery of the project.",
            "Proven ability to facilitate interdisciplinary research efforts in intelligent transportation systems, sustainable urban mobility, and related AI applications.",
            "Familiarity with managing government-funded projects or working in a consortium model is an advantage.",
            "Proven ability to engage with diverse stakeholders, including government, academia, and industry is a plus.",
            "Potential job roles:",
            "Act as the interface between IISc researchers and consortium partners, and industry stakeholders.",
            "Coordinate with faculty, researchers, and technical teams to ensure resource optimization and adherence to project goals and timelines.",
            "Manage procurement, funding utilization, and reporting as per project guidelines.",
            "Maintain project documentation, including progress reports, compliance records, and financial summaries, in line with Ministry of Education requirements.",
            "Monitor risks, address challenges, and ensure project continuity and success.",
          ],
        },},
      {
        title: `Graph Machine Learning for Anti Money Laundering in FinTech (Graph-FinTech)`
        designation: "Project Scientist/Research Associate/Postdoctoral Fellow",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "B.Tech/MTech/PhD in CS/AI/ECE or related fields with a strong background in machine/deep learning and graph neural networks (GNNs).",
            "Proficiency in coding and hands-on experience in PyTorch.",
            "Proficiency in Python programming and familiarity with graph analytics libraries/tools (e.g., Pytorch, Geometric, DGL etc.) are highly desirable.",
            "Highly motivated and self-driven with the ability to quickly learn on the fly.",
          ],
        },},
    ],
  },

  {
    id: "tab-2",
    title: "Research Project Associate",
    positions: [
      {
        title:
          "Design and Development of Instrumented Vehicle for Urban Sensing --Development of IoT Sensor System / Embedded system interfacing (Instrumented-Vehicle-SensorSystem)",
        designation: "Project Assistant / Associate Software Engineer",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Experience with IoT platforms (e.g., Arduino, Raspberry Pi, ESP32) for real-time sensor data acquisition.",
            "Familiarity with interfacing a range of sensors with microcontrollers and IoT boards is required.",
            "Proficiency in languages such as Python, C/C++, and JavaScript for sensor data processing and hardware control. ",
            "Knowledge of protocols like MQTT, HTTP, or LoRaWAN for IoT data transfer and communication is a plus.",
          ],
        },
      },
      {
        title:
          "Design and Development of Instrumented Vehicle for Urban Sensing --Signal Processing (Instrumented-Vehicle-SignalProcessing)",
        designation: "Project Associate / Software Engineer",
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
        title:
          "Scalable Graph Neural Networks for Traffic Flow Forecasting (Graph-NN)",
        designation: "Project Assistant / Associate Software Engineer",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Basic understanding of GNNs and graph-based models for structured data.",
            "Proficiency in Python and familiarity with relevant machine learning libraries such as PyTorch, TensorFlow, or DGL (Deep Graph Library).",
            "Ability to preprocess and analyze time-series and spatial data.",
            "Knowledge of graph theory, linear algebra, and probability/statistics",
            "Basic understanding of traffic flow dynamics is a plus.",
          ],
        },
      },
      {
        title:
          "Scalable Video Analytics for Traffic Flow Prediction and Vehicle Re-identification (ReID) from Traffic Surveillance Cameras (Vehicle-ReID)",
        designation: "Project Assistant / Associate Software Engineer",
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
          "Visual AI for Emission Estimation from DashCams and Traffic Surveillance Cameras (Visual-AI)",
        designation: "Project Assistant / Associate Software Engineer",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Familiarity with computer vision techniques for object detection, tracking, and classification",
            "Proficiency in deep learning frameworks (e.g., PyTorch, TensorFlow, Keras) is must.",
            "Fundamental knowledge of image processing, linear algebra, statistics, and probability is desirable.",
            "Basic understanding of basic environmental concepts related to emissions, pollution metrics, or air quality measurement is a plus.",
          ],
        },
      },
      {
        title:
          "Low-Cost Sensing and Embedded System for Potholes detection and Characterization in low-visible conditions (Pothole-Detection)",
        designation: "Project Assistant / Associate Software Engineer",
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
          "Large Language Models for Network Packet Inspection and Anomaly Detection",
        designation: "Project Assistant / Associate Software Engineer",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/xGAtJqFgS1cbgBTj9",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline.",
            "Demonstrated experience of using Large Language Models (LLMs) and natural language processing techniques is required.",
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
    id: "tab-3",
    title: "Research Internships / Assistants",
    positions: [
      {
        title: "Generative Adversarial Networks (GAN) based Data Augmentation",
        designation: "Intern",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/DR61GnxqB7GY5GW66",
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
        designation: "Intern",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/DR61GnxqB7GY5GW66",
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
        designation: "Intern",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/DR61GnxqB7GY5GW66",
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
      {
        title:
          "Large Language Models for Network Packet Inspection and Anomaly Detection",
        designation: "Intern",
        deadline: "31st December 2024",
        applyLink: "https://forms.gle/DR61GnxqB7GY5GW66",
        content: {
          type: "list",
          items: [
            "Candidate must be pursuing Bachelor’s Degree in Science/Engineering/Technology",
            "Demonstrated experience of using Large Language Models (LLMs) and natural language processing techniques is required.",
            "Proficiency in machine learning frameworks (e.g., TensorFlow, PyTorch) is a must.",
            "Knowledge of networking fundamentals, including protocols (e.g., TCP/IP, HTTP, DNS) and packet inspection concepts.",
            "Proficiency in Python, with experience in libraries such as Scikit-learn, Numpy, and Pandas.",
            "Familiarity with tools for network traffic analysis (e.g., Wireshark, tcpdump) and packet data handling is a plus.",
          ],
        },
      },
    ],
  },
];
