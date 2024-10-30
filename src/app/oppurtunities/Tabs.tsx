"use client";
import { useEffect, useState } from "react";

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

  const tab1Content = [
    {
      title: "Project Associate in Graph Neural Networks/Computer Vision",
      content: "",
    },
  ];

  const tab2Content = [
    {
      title: "No specific position available at the moment",
      content: "",
    },
  ]; // Example content, you can modify as needed
  const tab3Content = [
    {
      title: "Multiple Internship Positions Available",
      content: [
        'Candidates currently pursuing their undergraduate degree in engineering (Computer Science/Electrical/Electronics Engineering) or Applied Mathematics are encouraged to apply. Please send me an email with the subject title "Application for <position>, <duration>" e.g., Application for Internship, April-August 2022, with your CV (that includes GPA, past/current projects, programming knowledge) with 1-2 paragraphs mentioning your research interests and how you can contribute to our lab.',
        "I highly recommend you to apply for INSA Summer Research Fellowship, Focus Area Science Technology Summer Fellowship (FAST-SF) programs. Applications for both the programs are normally issued in October-November every year.",
        "You may also explore research opportunities at RBCCPS and CiSTUP website. [Every year in summer and winter]",
      ],
    },
  ]; // Example content, you can modify as needed

  return (
    <div className="p-32 pt-0 w-[90%] mx-auto sm:p-4">
      <div className="text-zinc-300 text-justify mx-auto mb-10 text-sm font-semibold">
        We are always looking for highly motivated and dynamic people interested
        in exploring challenging areas of big data analytics, unsupervised
        learning, deep-learning, Spatio-temporal data mining, Internet of
        Things (IoT), and Intelligent Transportation, including novel and cutting-edge
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
        className="bg-white text-black w-4/5 p-4 rounded-md animate-blink"
      >
        <button>Apply Now</button>
      </a>
      <div id="tabs" className="sm:mt-[35%] sm:p-5 h-[60vh] mt-[30vh]">
        <span id="tab-1" className="tab-switch fixed"></span>
        <a
          href="#tab-1"
          className="text-md font-bold text-zinc-300 tab-link inline-block p-4 mr-4 sm:mx-0 mb-4 no-underline hover:text-zinc-600"
        >
          Research Project Associate
        </a>
        <div className="tab-content box-border float-right hidden w-full border border-zinc-800 text-white rounded-[6px] p-8 text-sm">
          {tab1Content.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center cursor-pointer my-4"
                onClick={() => toggleDropdown(`tab1-${index}`)}
              >
                <p className="text-lg font-bold text-zinc-300">
                  {item.title} <br />
                  <span className="text-sm text-zinc-400 font-normal">
                    Deadline <b>5th September 2024</b>
                  </span>
                </p>
                <a
                  href="https://forms.gle/fDrJNPfX1AWWf3ot5"
                  target="_blank"
                  className="border border-zinc-800 text-white rounded-[6px] p-4 text-sm hover:bg-zinc-300 hover:text-black"
                >
                  Apply Now
                </a>
              </div>
              {openTab === `tab1-${index}` && (
                <p className="text-md text-zinc-400 w-[70%] mb-12">
                  <ul className="list-disc ml-10">
                    <li>
                      Demonstrated proficiency in working with Graph Neural
                      Networks algorithms is a must.
                    </li>
                    <li>
                      Demonstrated proficiency in developing vision-based
                      solutions.
                    </li>
                    <li>
                      Knowledge and experience in working with/developing
                      lightweight deep learning-based object detection/tracking
                      models is a plus.
                    </li>
                    <li>
                      Knowledge of state-of-the-art image processing techniques
                      is a plus.
                    </li>
                    <li>Prior experience with edge analytics is preferred.</li>
                  </ul>
                </p>
              )}
            </div>
          ))}
        </div>

        <span id="tab-2" className="tab-switch fixed"></span>
        <a
          href="#tab-2"
          className="text-md font-bold text-zinc-300 tab-link inline-block p-4 mx-4 sm:mx-0 mb-4 no-underline hover:text-zinc-600"
        >
          Postdoctoral Research
        </a>
        <div className="tab-content box-border float-right hidden w-full border border-zinc-800 text-white rounded-[6px] p-8 text-sm">
          {tab2Content.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center cursor-pointer my-4"
                onClick={() => toggleDropdown(`tab2-${index}`)}
              >
                <p className="text-lg font-semibold text-zinc-300">
                  {item.title} <br />
                  {/* <span className="text-sm text-zinc-400 font-normal">
                    Deadline <b>5th September 2024</b>
                  </span> */}
                </p>

                {/* <a
                  href=""
                  className="border border-zinc-800 text-white rounded-[6px] p-4 text-sm hover:bg-zinc-300 hover:text-black"
                >
                  Apply Now
                </a> */}
              </div>
              {openTab === `tab2-${index}` && (
                <p className="text-md text-zinc-400 w-[70%] mt-6 mb-12">
                  However, you are encouraged to apply to our lab through the
                  external fellowships. Please check Postdoctoral Research
                  section above for more details.
                </p>
              )}
            </div>
          ))}
        </div>

        <span id="tab-3" className="tab-switch fixed"></span>
        <a
          href="#tab-3"
          className="text-md font-bold text-zinc-300 tab-link inline-block p-4 mx-4 sm:mx-0 mb-4 no-underline hover:text-zinc-600"
        >
          Research Internships/Assistantships
        </a>
        <div className="tab-content box-border float-right hidden w-full border border-zinc-800 text-white rounded-[6px] p-8 text-sm">
          {tab3Content.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-center cursor-pointer my-4"
                onClick={() => toggleDropdown(`tab3-${index}`)}
              >
                <p className="text-lg font-semibold text-zinc-300">
                  {item.title} <br />
                  <span className="text-sm text-zinc-400 font-normal">
                    Deadline <b>5th September 2024</b>
                  </span>
                </p>

                <a
                  href="https://forms.gle/fDrJNPfX1AWWf3ot5"
                  target="_blank"
                  className="border border-zinc-800 text-white rounded-[6px] p-4 text-sm hover:bg-zinc-300 hover:text-black"
                >
                  Apply Now
                </a>
              </div>
              {openTab === `tab3-${index}` && (
                <p className="text-xs text-zinc-400 w-[70%] mt-6 mb-12">
                  Multiple internship positions are available on the following
                  topics:
                  <ul className="list-disc ml-10">
                    <li>
                      Generative Adversarial Networks (GANs) based Data
                      Augmentation
                    </li>
                    <li>Graph Machine Learning (e.g., GNN, Temporal Graphs)</li>
                    <li>
                      Exploration and Development of Probabilistic Model based
                      Outlier Detection
                    </li>
                    <li>
                      Development of Online Machine Learning Algorithm for
                      Real-Time Adaptability
                    </li>
                  </ul>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
