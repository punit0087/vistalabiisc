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
    title: "Research Intern / Assistant",
    positions: [
      {
        title: `Data preparation for CV/ML model training`,
        designation: "Research Intern / Assistant",
        deadline: "May 27, 2025, 11:59 PM IST",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSeFD5LQXqCVZTNrAUlApqCN8gmn4rrSkAXkREnSTNDtw-AciQ/viewform",
        content: {
          type: "list",
          items: [
            "Currently enrolled in a program in Computer Science, Data Science, Engineering, or a related field.",
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
        title:
          "Prediction Analysis of Cyclonic Events in Satellite Observations (Cyclonic Observations)",
        designation: "1 Project Associate / Software Engineer",
        deadline: "25th May 2025, 11:59 PM IST",
        applyLink:
          "",
        content: {
          type: "list",
          items: [
            "Bachelor’s/Master’s degree in a relevant engineering discipline with 1+ years of research experience.",
            "Familiarity in understanding of basics of Image processing.",
            "Solid theoretical understanding and practical experience in applying machine learning and deep learning techniques to image processing datasets.",
            "Proficiency in object detection models and class of LSTM models.",
            "Proficiency in languages such as Python, C/C++, and frameworks like PyTorch.",
          ],
        },
      },
      {
        title:
          "Development of LLM based Network Traffic Analysis and Cyber Attack Detection (LLM Packet Inspection)",
        designation: "1 Project Associate / Research Associate",
        deadline: "25th May 2025, 11:59 PM IST",
        applyLink:
          "",
        content: {
          type: "list",
          items: [
            "B.Tech/MTech/PhD in CS/AI/ECE or related fields with a strong background in machine/deep learning.",
            "Demonstrated experience of using Large Language Models (LLMs) and natural language processing techniques is required.",
            "Proficiency in machine learning frameworks (e.g., TensorFlow, PyTorch) is a must.",
            "Knowledge of networking fundamentals, including protocols (e.g., TCP/IP, HTTP, DNS) and packet inspection concepts.",
            "Proficiency in Python, with experience in libraries such as Scikit-learn, Numpy, and Pandas.",
            "Familiarity with tools for network traffic analysis (e.g., Wireshark, tcpdump) and packet data handling is a plus.",
          ],
        },
      },
      {
        title:
          "AI/ML and Statistical Analysis for Driving-related Multi-modal Data. (Driving Behaviour Analysis)",
        designation:
          "1 Project Associate / Project Scientist / Research Associate",
        deadline: "25th May 2025, 11:59 PM IST",
        applyLink:
          "",
        content: {
          type: "list",
          items: [
            "B.Tech/MTech/PhD in CS/AI/ECE or related fields with a strong background in machine/deep learning.",
            "Strong Foundation in AI/ML and Statistical methods.",
            "Proven ability to work with and integrate diverse data types such as sensor data,video/image data.",
            "Expertise in Python (with libraries like Pandas, NumPy, scikit-learn)  for data manipulation, statistical analysis, and AI/ML model development.",
            "Domain Knowledge or interest in Driving data analysis.",
            "Proficiency in machine learning frameworks (e.g., TensorFlow, PyTorch) is a must.",
          ],
        },
      },
      {
        title:
          "Road Infrastructure Assessment using ML/Computer Vision Models on Crowd-Sensing Data Collection through Instrumented Vehicle (Road Computer Vision)",
        designation: "1 Project Scientist / Software Engineer",
        deadline: "25th May 2025, 11:59 PM IST",
        applyLink:
          "",
        content: {
          type: "list",
          items: [
            "Proficiency in Python with demonstrated experience in ML and computer vision libraries (e.g., PyTorch, TensorFlow, OpenCV).",
            "Experience in working with deep learning models for object detection or segmentation (e.g., YOLO, U-Net, Faster R-CNN).",
            "Familiarity with camera and sensor data integration, including GPS, IMU, and video/image synchronisation.",
            "Experience in handling real-world data, including pre-processing, cleaning, and annotation.",
            "Familiarity with deploying models on edge devices (e.g., Jetson Nano/Xavier or Raspberry Pi).",
            "Understanding of key evaluation metrics (IoU, mAP, precision/recall) and performance bench marking.",
            "Proficiency in building APIs is a must.",
            "Proficiency in machine learning frameworks (e.g., TensorFlow, PyTorch) is a must.",
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
          "AI/ML and Statistical Analysis for Driving-related Multi-modal Data. (Driving Behaviour Analysis)",
        designation:
          "1 Project Associate / Project Scientist / Research Associate",
        deadline: "25th May 2025, 11:59 PM IST",
        applyLink:
          "",
        content: {
          type: "list",
          items: [
            "B.Tech/MTech/PhD in CS/AI/ECE or related fields with a strong background in machine/deep learning.",
            "Strong Foundation in AI/ML and Statistical methods.",
            "Proven ability to work with and integrate diverse data types such as sensor data,video/image data.",
            "Expertise in Python (with libraries like Pandas, NumPy, scikit-learn)  for data manipulation, statistical analysis, and AI/ML model development.",
            "Domain Knowledge or interest in Driving data analysis.",
            "Proficiency in machine learning frameworks (e.g., TensorFlow, PyTorch) is a must.",
          ],
        },
      },
    ],
  },
];
