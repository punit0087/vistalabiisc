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
        title: "Artificial Intelligence or Machine Learning (AI/ML)",
        designation: "Research Intern / Assistant",
        deadlineIso: "2025-07-15T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSdleO536d2gHCc5VgYiXVt1bR6RHHcXVoWEEgXkO7wAGCTxxA/viewform",
        content: {
          type: "list",
          items: [
            "Candidate must be pursuing Bachelor’s Degree in Science/Engineering/Technology  with relevant coursework in artificial intelligence or machine learning.",
            "Proficiency in Python and ML libraries (e.g., NumPy, Pandas, Scikit-learn, TensorFlow or PyTorch).",
            "Good understanding of supervised/unsupervised learning algorithms and model evaluation techniques.",
            "Basic knowledge of linear algebra, probability, statistics, and optimization techniques used in ML.",
            "Experience with data preprocessing, feature engineering, and visualizing results using tools like Matplotlib or Seaborn is desirable.",
            "Prior hands-on experience in ML projects is a plus.",
          ],
        },
      },
      {
        title: "Computer Vision (CV)",
        designation: "Research Intern / Assistant",
        deadlineIso: "2025-07-15T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSdleO536d2gHCc5VgYiXVt1bR6RHHcXVoWEEgXkO7wAGCTxxA/viewform",
        content: {
          type: "list",
          items: [
            "Candidate must be pursuing Bachelor’s Degree in Science/Engineering/Technology  with relevant coursework in computer vision, image processing, or machine learning.",
            "Proficiency in Python and libraries such as OpenCV, NumPy, Matplotlib, and deep learning frameworks like PyTorch or TensorFlow.",
            "Understanding of key concepts such as image classification, object detection, segmentation, feature extraction, and image transformations.",
            "Hands-on experience in computer vision projects involving tasks like object tracking, facial recognition, or image/video analysis is preferable.",
            "Familiarity with pre-trained models, annotation tools, and deployment techniques is a plus.",
          ],
        },
      },
      {
        title: "Large Language Models (LLMs)",
        designation: "Research Intern / Assistant",
        deadlineIso: "2025-07-15T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSdleO536d2gHCc5VgYiXVt1bR6RHHcXVoWEEgXkO7wAGCTxxA/viewform",
        content: {
          type: "list",
          items: [
            "Candidate must be pursuing Bachelor’s Degree in Science/Engineering/Technology with a coursework in natural language processing (NLP) or deep learning.",
            "Proficiency in Python and experience with NLP/ML libraries, PyTorch, or TensorFlow.",
            "Familiarity with foundational concepts of transformers, attention mechanisms, pretraining/fine-tuning, and prompt engineering.",
            "Demonstrated experience of using Large Language Models (LLMs) and natural language processing techniques is a plus.",
          ],
        },
      },
      {
        title: "Statistical Modeling (Model)",
        designation: "Research Intern / Assistant",
        deadlineIso: "2025-07-15T23:59:00+05:30",
        applyLink:
          "https://docs.google.com/forms/d/e/1FAIpQLSdleO536d2gHCc5VgYiXVt1bR6RHHcXVoWEEgXkO7wAGCTxxA/viewform",
        content: {
          type: "list",
          items: [
            "Candidate must be pursuing Bachelor’s Degree in Science/Engineering/Technology with coursework in statistical inference, probability, and data analysis.",
            "Proficiency in Python with experience using libraries like statsmodels, SciPy, NumPy, and Pandas.",
            "Understanding of techniques such as linear and logistic regression, time series analysis, Bayesian modeling, hypothesis testing, and confidence intervals.",
            "Experience with data preprocessing, exploratory data analysis (EDA), and visualizing statistical relationships using tools like Matplotlib, Seaborn, or ggplot2 is a plus.",
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
        deadlineIso: "2025-05-25T23:59:00+05:30",
        applyLink: "",
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
        deadlineIso: "2025-05-25T23:59:00+05:30",
        applyLink: "",
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
        deadlineIso: "2025-05-25T23:59:00+05:30",
        applyLink: "",
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
        deadlineIso: "2025-05-25T23:59:00+05:30",
        applyLink: "",
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
        deadlineIso: "2025-05-25T23:59:00+05:30",
        applyLink: "",
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
