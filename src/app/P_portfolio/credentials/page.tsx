import Image from "next/image";
import headshot from "@/app/P_portfolio/assets/headshot.png";
import "@/app/P_portfolio/components/style.css";
import "@/app/P_portfolio/components/iconoir.css";

import "@/app/P_portfolio/components/style.css";

export default function BioPage() {
  return (
    <div className="text-[#9f9f9f] mt-[8%]">
      <div className="flex justify-center">
        <div className="w-[80%] flex justify-between sm:flex-col sm:w-full">
          <div className="shadow-box p-[30px] w-fit">
            <Image
              src={headshot}
              alt=""
              className="w-[20vw] relative overflow-hidden bg-gradient-to-b bg-color1 from-blue-300 to-pink-100 border border-white rounded-br-[60px] rounded-tl-[60px] flex-none"
            ></Image>
          </div>
          <div className="shadow-box w-[68%] p-[40px]">
            <h2 className="text-zinc-200 text-3xl font-semibold">
              Dr. Punit Rathore
            </h2>{" "}
            <hr className="mt-4 mb-4" />
            <p className="text-zinc-400 leading-5 text-justify p-2 pb-0 text-xs pt-2">
              I am an Assistant Professor at{" "}
              <a
                target="_blank"
                href="https://iisc.ac.in"
                className="hover:text-zinc-300 no-underline"
              >
                Indian Institute of Science (IISc.),
              </a>
              Bengaluru in{" "}
              <a
                target="_blank"
                href="https://cps.iisc.ac.in"
                className="hover:text-zinc-300 no-underline"
              >
                Robert Bosch Centre for Cyberphysical Systems (RBCCPS){" "}
              </a>
              jointly with{" "}
              <a
                target="_blank"
                href="https://cistup.iisc.ac.in"
                className="hover:text-zinc-300 no-underline"
              >
                Centre for Infrastructure, Sustainable Transportation, and Urban
                Planning (CiSTUP).
              </a>{" "}
              Previously I worked as a Postdoctoral Researcher at{" "}
              <a
                target="_blank"
                href="https://senseable.mit.edu"
                className="hover:text-zinc-300 no-underline"
              >
                Senseable City Lab
              </a>{" "}
              at
              <a
                target="_blank"
                href="https://www.mit.edu"
                className="hover:text-zinc-300 no-underline"
              >
                Massachusetts Institute of Technology, Cambridge, USA
              </a>{" "}
              for two years and at Grab-NUS AI Lab,{" "}
              <a
                target="_blank"
                href="https://ids.nus.edu.sg"
                className="hover:text-zinc-300 no-underline"
              >
                Institute of Data Science, National University of Singapore
                (NUS)
              </a>{" "}
              for nine months. I received my Ph.D. degree from the{" "}
              <a
                target="_blank"
                href="https://electrical.eng.unimelb.edu.au"
                className="hover:text-zinc-300 no-underline"
              >
                Department of Electrical and Electronics Engineering, University
                of Melbourne, Australia
              </a>{" "}
              in 2019. From July 2011 to November 2014, I was a Researcher in
              <a
                target="_blank"
                href="http://www.automationtatasteel.com/html/about.html"
                className="hover:text-zinc-300 no-underline"
              >
                {" "}
                Automation Division, TATA Steel Limited, India
              </a>{" "}
              where I developed several image processing and machine
              vision-based real-time systems for manufacturing industries.{" "}
              <br />
              <br /> My research interests are:- Big data analytics,
              Un/Semi/Self-supervised learning, Visual Analytics using Deep
              Learning, Explainable AI/ML, Data-Driven Analytics for Autonomous
              Systems and Transportation, Spatio-temporal Data Mining, and
              Streaming data analytics. I am also interested in ML and AI
              applications to solve complex real-world problems in areas such as
              transportation, agriculture, healthcare, infrastructure, robotics,
              and vision.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[2%]">
        <div className="w-[80%] flex justify-between sm:flex-col sm:w-full">
          <div className="shadow-box p-[40px] w-[49%]">
            <h5>Previous Research Experience</h5>
            <hr className="mt-4 mb-4" />
            <ul className="list-disc leading-5 text-xs text-justify">
              <li className="mb-2">
                Postdoctoral Research Fellow, Senseable City Lab, Massachusetts
                Institute of Technology, Cambridge, USA , Nov 2019 - Present,
                Advisor: Prof. Carlo Ratti and Dr. Paolo Santi
              </li>
              <li className="mb-2">
                Postdoctoral Research Fellow, Grab-NUS AI Lab, Institute of Data
                Science, National University of Singapore, March 2019 - Oct
                2019, Advisor: Prof. Tan Kian Lee
              </li>
              <li className="mb-2">
                Research Assistant, School of Information Technology, Deakin
                University, Burwood, Australia, Aug 2018 - Nov 2018
              </li>
              <li className="mb-2">
                Researcher, Automation Division, Tata Steel Ltd, Jamshedpur,
                India, July 2011 - Feb 2019
              </li>
            </ul>
          </div>
          <div className="shadow-box p-[40px] w-[49%]">
            <h5>Education</h5>
            <hr className="mt-4 mb-4" />
            <ul className="list-disc leading-5 text-xs text-justify">
              <li className="mb-2">
                Ph.D. 2019, ISSNIP Lab, The University of Melbourne, Australia,
                "Big Data Cluster Analysis and its Applications", Supervisors:
                <a
                  href="https://people.eng.unimelb.edu.au/palani/"
                  className="hover:text-zinc-300 no-underline"
                >
                  {" "}
                  Prof. Marimuthu Palaniswami
                </a>{" "}
                and{" "}
                <a
                  href="https://scholar.google.com/citations?user=kXy4LAMAAAAJ&hl=en"
                  className="hover:text-zinc-300 no-underline"
                >
                  Prof. (Emeritus) James C. Bezdek
                </a>
              </li>
              <li className="mb-2">
                M.Tech. 2011,
                <a
                  href="https://www.iitkgp.ac.in"
                  className="hover:text-zinc-300 no-underline"
                >
                  Indian Institute of Technology (IIT), Kharagpur, India.
                </a>{" "}
                Supervisors:{" "}
                <a
                  href="https://www.iitkgp.ac.in/department/MM/faculty/mm-sou"
                  className="hover:text-zinc-300 no-underline"
                >
                  Prof. Soumen Das
                </a>{" "}
                and
                <a
                  href="https://scholar.google.co.in/citations?user=ITHOUJEAAAAJ&hl=en"
                  className="hover:text-zinc-300 no-underline"
                >
                  {" "}
                  Prof. Alok Barua
                </a>
              </li>
              <li className="mb-2">
                B.Engg. 2009,
                <a
                  href="https://www.sgsits.ac.in"
                  className="hover:text-zinc-300 no-underline"
                >
                  {" "}
                  Shri Govindram Seksaria Institute of Technology and Science
                  (SGSITS), Indore, India.
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[2%]">
        <div className="w-[80%] flex justify-between sm:flex-col sm:w-full">
          <div className="shadow-box p-[40px] w-[65%] h-fit">
            <h5>Honors and Awards</h5> <hr className="mt-4 mb-4" />
            <ul className="list-disc leading-5 text-xs text-justify">
              <li className="mb-2">
                Recipient of Best Paper Award at EAI International Conference on
                Intelligent Transportation Systems (EAI-INTSYS), Dec 2021
              </li>
              <li className="mb-2">
                Nominated for Chancellor's Prize for Excellence in the Ph.D.
                Thesis 2020, at the University of Melbourne., May 2020
              </li>
              <li className="mb-2">
                Recipient of the Outstanding Ph.D. Thesis Work Grant in
                Cybernetics from IEEE System, Man, and Cybernetics Society, Nov
                2019
              </li>
              <li className="mb-2">
                Recipient of Best Student Paper Award Finalist at IEEE System,
                Man, and Cybernetics (SMC) Conference at Miyazaki, Japan, Oct
                2018
              </li>
              <li className="mb-2">
                Recipient of Student Travel Grant to attend IEEE System, Man,
                and Cybernetics (SMC) Conference, Oct 2018
              </li>
              <li className="mb-2">
                Recipient of Best Paper Award at IEEE World Forum on Internet of
                Things (WF-IoT) at Singapore, Feb 2018
              </li>
              <li className="mb-2">
                Recipient of Melbourne International Fee Remission Scholarship
                (MIFRS) and Melbourne International Research Scholarship (MIRS),
                Nov'2014 - Aug'2018
              </li>
              <li className="mb-2">
                Recipient of Postgraduate Scholarship from Ministry of Human
                Resource and Development, India, July'2009 - June'2011
              </li>
              <li className="mb-2">
                Secured All India Rank 62 (98.83%ile) in Graduate Aptitude Test
                in Engineering (GATE) in Instrumentation Engineering, March 2009
              </li>
            </ul>
          </div>
          <div className="shadow-box p-[40px] w-[33%] h-fit">
            <h5>Services</h5>
            <hr className="mt-4 mb-4" />
            <ul className="list-disc leading-5 text-xs text-justify">
              <li className="mb-2">TPC Member, EAI Broadnets 2021</li>
              <li className="mb-2">Reviewer [Publon]</li>
              <ul className="list-disc leading-5 text-xs text-justify">
                <li className="mb-2">
                  IEEE Transactions on Knowledge and Data Engineering
                </li>
                <li className="mb-2">
                  IEEE Transactions on Intelligent Transportation Systems
                </li>
                <li className="mb-2">IEEE Transactions on Big Data</li>
                <li className="mb-2">IEEE Transactions on Fuzzy Systems</li>
                <li className="mb-2">IEEE Transactions on Cybernetics</li>
                <li className="mb-2">IEEE Internet of Things Journal</li>
                <li className="mb-2">
                  IEEE Open Journal of Intelligent Transportation Systems
                </li>
                <li className="mb-2">Pattern Recognition Journal - Elsevier</li>
                <li className="mb-2">
                  Complex & Intelligent System - Springer
                </li>
                <li className="mb-2">
                  International Journal on Distributed Sensor Networks
                </li>
                <li className="mb-2">
                  IEEE Conference on Fuzzy Systems (FUZZ-IEEE), 2020
                </li>
                <li className="mb-2">
                  IEEE World Forum on Internet of Things (WF-IoT), 2021
                </li>
                <li className="mb-2">IEEE PowerTech Conference 2021</li>
              </ul>

              <li className="mb-2">
                Board of Studies Member in SAGE University, Indore, India,
                May'19-Present
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center -mt-[10%]">
        <div className="w-[80%] flex justify-between sm:flex-col sm:w-full">
          <div className="shadow-box p-[40px] w-[65%] h-fit">
            <h5>Invited Talks/Webinars/Workshops</h5>
            <hr className="mt-4 mb-4" />
            <ul className="list-disc leading-5 text-xs text-justify">
              <li className="mb-2">
                Invited Talk on "Data-driven Driving Behaviour Analytics –
                Making the roads safer for all of us!" at "IEEE ITSS:
                Two-Wheeler Safety and Mobility Technologies", Ahmedabad
                University, November 2023
              </li>
              <li className="mb-2">
                Invited Talk on "Unlocking the Value of Vehicular Data: A
                Simple, Unsupervised Approach for On-board Driver Behavior
                Classification" at "AIMLSys 2023: Sustainable AI for Edge
                workshop", Bangalore, October 2023
              </li>
              <li className="mb-2">
                Invited Talk on "Data-driven Driving Behaviour Analytics –
                Making the roads safer for all of us!" at Faculty of Industrial
                Design and Engineering, TU Delft, Netherlands, October 2023
              </li>
              <li className="mb-2">
                Invited Talk on "Data-Driven Driving Behaviour Analytics" at
                Inter-Disciplinary Research Platform (IDRP) IoT Workshop", IIT
                Jodhpur, August 2023
              </li>
              <li className="mb-2">
                Invited Panelist on "AI/ML for Public Service Delivery" at
                International Conclave, Kaushalya The Skill University,
                Ahmadabad, August 2023
              </li>
              <li className="mb-2">
                Invited Webinar ("Tatsujin Speak") on "Transportation Revolution
                through AI: Advance Data Science Approaches to Mobility" at
                Mizuho India Japan Study Centre (MIJSC), IIM Bangalore, October
                2022
              </li>
              <li className="mb-2">
                Invited Panelist for theme "Social Factors in AI for Mobility",
                i-Hub Mobility Summit, IIIT Hyderabad, India, September 2022
              </li>
              <li className="mb-2">
                Guest Talk on "Cluster Structure Assessment for Streaming Data
                and its applications for IoT and Transportation" at Centre for
                Networked Intelligence (CNI), IISc Bangalore, India, March 2022
              </li>
              <li className="mb-2">
                Guest Lecture on "Data-Driven Analytics for Autonomous Systems"
                at M.S. Ramaiah Institute of Technology (MSRIT), Bangalore,
                India, March 2022
              </li>
              <li className="mb-2">
                Guest Talk on "Big Data Analytics and its Applications" at
                National Institute of Technology (NIT), Rourkela, India, Feb
                2022
              </li>
              <li className="mb-2">
                Virtual Workshop on "Regression and its Applications in
                Manufacturing Industries" at Steel Authority India Limited
                (SAIL), Bokaro, India, July 2021
              </li>
              <li className="mb-2">
                Guest talk on Big Data Clustering and Urban Analytics in IEEE
                Symposium on Data Analytics and Internet of Things (ISDAIOT),
                Melbourne, Nov 2020
              </li>
              <li className="mb-2">
                Keynote talk on Driving Behaviour Classification from
                Naturalistic driving data at 1st International Conference on
                Recent Innovations in Science Engineering and Technology
                (ICRISET), Sep 2020
              </li>
              <li className="mb-2">
                Driving Style Recognition of Professional Drivers, MIT DUSP,
                June 2020
              </li>
              <li className="mb-2">
                Keynote talk on Urban Intelligence at National Conference
                Interdisciplinary Research and Innovative Technologies at SAGE
                University, India, June 2020
              </li>
              <li className="mb-2">
                Big Data Analysis and Urban Intelligence, MIT DUSP, June 2019
              </li>
              <li className="mb-2">
                Invited Talk on "Cluster Assessment on Streaming Data
                Clustering" at CSIRO, Melbourne, October 2017
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
