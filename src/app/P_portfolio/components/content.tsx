import "./style.css";
import "./iconoir.css";

import star_r from "@/app/P_portfolio/assets/star.svg";
import research_ from "@/app/P_portfolio/assets/research-word.png";

import Image from "next/image";
import headshot from "@/app/P_portfolio/assets/headshot.png";
import hat1 from "@/app/P_portfolio/assets/hat-1.svg";
import hat2 from "@/app/P_portfolio/assets/hat-2.svg";
import gscholor from "@/app/P_portfolio/assets/google-scholar.svg";
import linkedin from "@/app/P_portfolio/assets/linkedin.svg";
import ieee from "@/app/P_portfolio/assets/ieee.svg";

import stack from "@/app/P_portfolio/assets/stack.svg";

import Link from "next/link";

import bg1 from "@/app/P_portfolio/assets/bg1.png";
import sign from "@/assets/sign.png";

export default function Content() {
  return (
    <section className="about-area bodyy mt-[3%] sm:mt-[10%]">
      <div className="container">
        <div className="">
          <section>
            <div className="flex sm:flex-col">
              <div className="about-me-box shadow-box m-2 sm:h-[74vh]">
                <a className="overlay-link" href="/P_portfolio/profile"></a>
                <div className="img-box">
                  <Image
                    decoding="async"
                    src={headshot}
                    alt="Headshot"
                    className="sm:w-[100vw]"
                  />
                </div>
                <div className="infos">
                  <h5>PROFESSOR</h5>
                  <h1>Punit Rathore</h1>
                  <p className="font-medium text-xs leading-5 mt-2">
                    I am an Assistant Professor at Indian Institute of Science
                    (IISc.),Bengaluru in Robert Bosch Centre for Cyberphysical
                    Systems (RBCCPS) jointly with Centre for Infrastructure,
                    Sustainable Transportation, and Urban Planning (CiSTUP).
                  </p>
                  <a href="#" className="about-btn">
                    <Image decoding="async" src={star_r} alt="Star" />
                  </a>
                </div>
              </div>
              <section className="flex">
                <div className="info-box shadow-box m-2 h-72 w-72 sm:w-full sm:h-fit">
                  <Link
                    className="overlay-link"
                    href="/P_portfolio/research"
                  ></Link>
                  <Image
                    decoding="async"
                    src={bg1}
                    alt="BG"
                    className="bg-img"
                  />
                  <Image
                    decoding="async"
                    src={research_}
                    alt="Research"
                    className="w-[11.5vw] p-2"
                  />
                  <div className="flex right-0 absolute justify-between items-center">
                    <div className="infos mt-4">
                      <h5>SPECIALIZATIONS</h5>
                      <h2>Research</h2>
                    </div>
                    <a
                      href=""
                      className="about-btn"
                      style={{ position: "absolute", right: 0 }}
                    >
                      <Image decoding="async" src={star_r} alt="Star" />
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <section>
            <div className="flex sm:flex-col">
              <div className="info-box shadow-box m-2 h-60 w-72 sm:w-full sm:h-fit">
                <a href="/P_portfolio/teaching" className="overlay-link"></a>

                <Image decoding="async" src={bg1} alt="BG" className="bg-img" />

                <Image
                  decoding="async"
                  src={hat1}
                  alt=""
                  className="w-[7.5vw] p-4 sm:w-[10vw]"
                />
                <div className="flex items-center justify-between">
                  <div className="infos">
                    <h5>SESSIONS</h5>
                    <h2>Teachings</h2>
                  </div>

                  <a
                    href=""
                    className="about-btn"
                    style={{ position: "absolute", right: 0 }}
                  >
                    <Image decoding="async" src={star_r} alt="Star" />
                  </a>
                </div>
              </div>

              <div className="about-services-box info-box shadow-box m-2 h-60 w-[60%] sm:w-full sm:h-fit">
                <Link href="/publication" className="overlay-link"></Link>

                <Image decoding="async" src={bg1} alt="BG" className="bg-img" />

                <div className="icon-boxes sm:flex-col">
                  <Image
                    src={stack}
                    alt=""
                    className="w-[3.3vw] sm:w-[20vw]"
                  ></Image>
                </div>
                <div className="flex items-center justify-between">
                  <div className="infos">
                    <h5>PAPERS</h5>
                    <h2>Publications</h2>
                  </div>
                  <Link
                    href=""
                    className="about-btn"
                    style={{ position: "absolute", right: 0 }}
                  >
                    <Image decoding="async" src={star_r} alt="Star" />
                  </Link>
                </div>
              </div>

              <div className="about-profile-box info-box shadow-box m-2 h-60 w-[30%] sm:w-full sm:h-fit">
                <Image decoding="async" src={bg1} alt="BG" className="bg-img" />

                <div className="inner-profile-icons shadow-box hover sm:flex-col">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/punit0000/"
                  >
                    <Image src={linkedin} alt="" className="w-10" />
                  </a>
                  <a
                    target="_blank"
                    href="https://scholar.google.com/citations?user=2clQgooAAAAJ&hl=en"
                  >
                    <Image src={gscholor} alt="" className="w-8" />
                  </a>
                  <a
                    target="_blank"
                    href="https://ieeexplore.ieee.org/author/37086362315"
                  >
                    <Image src={ieee} alt="" className="w-16" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <div className="infos">
                    <h5>CONNECT</h5>
                    <h2>Profiles</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <iframe
          src="https://outlook.office365.com/owa/calendar/3935d87d93fe4ae5a9840fe95e9949dc@iisc.ac.in/895a87dc32c343328210b57ceabe684f18126768672935896712/calendar.html"
          className="w-full h-[80vh] rounded-[25px] mt-8"
        ></iframe>
      </div>
    </section>
  );
}
