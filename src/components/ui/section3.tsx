"use client";

import DynamicDropdown from "./dynamic-list";
import lArrow from "@/assets/left-arrow.svg";
import Image from "next/image";
import GraphData from "@/components/ui/graphMain";
import art from "@/assets/brand/artpark.png";
import bosch from "@/assets/brand/bosch.svg";
import tata from "@/assets/brand/TATAELXSI.NS.svg";
import volvo from "@/assets/brand/volvo.svg";
import dst from "@/assets/brand/DST(h).png";
import isro from "@/assets/brand/isro.png";
import serb from "@/assets/brand/SERB.png";
import be from "@/assets/brand/bharatelectronics.png";
import mit from "@/assets/brand/mit-logo.svg";
import deakin from "@/assets/brand/deakin-university.svg";
import melbourn from "@/assets/brand/Melbourne.svg";

import scholarData from "@/pages/scholar.json";

import { useState } from "react";

import Newss from "@/app/P_portfolio/news/page";
import Link from "next/link";

import React, { useEffect } from "react";

type ScholarResult = {
  title: string;
  link: string;
  authors: string;
  publicationDate: string;
  journal: string;
  citationCount: string;
};
type ScholarResponse = {
  results?: ScholarResult[];
  error?: string;
};

const itemsCurrentONE = [
  {
    id: 1,
    url: "https://www.linkedin.com/in/punit0000/",
    name: "Dr. Punit Rathore - Assistant Professor",
  },
];

const itemsCurrentTWO = [
  {
    id: 1,
    url: "https://www.linkedin.com/in/vishwajeet-pattanaik/",
    name: "Vishwajeet Pattanaik - Specialist Scientist",
  },
  {
    id: 2,
    url: "https://www.linkedin.com/in/pruthvish-rajput-435636187/",
    name: "Pruthvish Rajput - Research Associate",
  },
  { id: 3, url: "", name: "Aravinda Reddy - Research Associate" },
  // {
  //   id: 4,
  //   url: "https://www.linkedin.com/in/nidhi-ahlawat-4b6629249/",
  //   name: "Nidhi Ahlawat - Research Associate",
  // },
];

const itemsCurrentTHREE = [
  {
    id: 1,
    url: "https://www.linkedin.com/in/paritosh-tiwari-101/",
    name: "Paritosh Tiwari",
  },
  {
    id: 2,
    url: "https://www.linkedin.com/in/alok-mazumder-778723192/",
    name: "Alokendu Mazumder",
  },
  {
    id: 3,
    url: "https://www.linkedin.com/in/tirthajit-baruah/",
    name: "Tirthajit Baruah",
  },
  { id: 4, url: "", name: "Sourav Ranjan Saraf" },
  {
    id: 4,
    url: "https://www.linkedin.com/in/rankit-kachroo-156956178/",
    name: "Rankit Kachroo",
  },
  { id: 6, url: "", name: "Shailja Sharma" },
];

const itemsCurrentFOUR = [
  // {
  //   id: 2,
  //   url: "https://www.linkedin.com/in/shaurya374/",
  //   name: "Shaurya Pratap Singh",
  // },
  { id: 3, url: "", name: "Chinmay Mhatre" },

  {
    id: 5,
    url: "https://www.linkedin.com/in/parikshit-singh-rathore/",
    name: "Parikshit Singh Rathore",
  },
  {
    id: 6,
    url: "https://www.linkedin.com/in/rishabh-sabharwal-a129b41ba/",
    name: "Rishabh Sabharwal",
  },
  {
    id: 7,
    url: "https://www.linkedin.com/in/anushtha-tamrakar/",
    name: "Anushtha Tamrakar",
  },
  {
    id: 7,
    url: "https://www.linkedin.com/in/anushtha-tamrakar/",
    name: "Siddhant Saxena",
  },
];

const itemsCurrentFIVE = [
  {
    id: 7,
    url: "https://www.linkedin.com/in/biswadeep-debnath-03634b202",
    name: "Biswadeep Debnath",
  },
  {
    id: 8,
    url: "https://www.linkedin.com/in/ila-ananta-padha-98a687137/",
    name: "Ila Ananta",
  },
  {
    id: 9,
    url: "https://www.linkedin.com/in/rithwik-pradeep/",
    name: "Rithwik Pradeep",
  },
  {
    id: 9,
    url: "https://www.linkedin.com/in/arnab-roy-9b0930220/",
    name: "Arnab Roy",
  },
  {
    id: 9,
    url: "",
    name: "V Srimugdha",
  },
  {
    id: 9,
    url: "https://www.linkedin.com/in/b-srinath-achary-652654193/?originalSubdomain=in",
    name: "B Srinath Achary",
  },
  {
    id: 9,
    url: "https://www.linkedin.com/in/srikar-vedantam/",
    name: "Vedantam Srikar",
  },
  {
    id: 9,
    url: "https://www.linkedin.com/in/raju-bhookya-641abb338/",
    name: "Bhookya Raju",
  },
];

const itemsCurrentSIX = [
  {
    id: 1,
    url: "https://www.linkedin.com/in/snehilseenu/",
    name: "Snehil Seenu",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/mohithkumarss/",
    name: "Mohith Kumar S.S.",
  },
  {
    id: 2,
    url: "https://www.linkedin.com/in/ram-samarth-b-b-340731243/",
    name: "Ram Samarth B.B.",
  },

  {
    id: 4,
    url: "https://www.linkedin.com/in/snehilseenu/",
    name: "Snehil Seenu",
  },
];

const itemsCurrentSEVEN = [
  {
    id: 3,
    url: "https://www.linkedin.com/in/adityaarvind5696/",
    name: "Aditya Arvind",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/syed-lateef-47676539/",
    name: "Syed Lateef",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/sidhant-sharma-415806210/",
    name: "Sidhant Sharma",
  },
  {
    id: 1,
    url: "https://in.linkedin.com/in/ashharzaman/",
    name: "Ashhar Zaman",
  },
  {
    id: 1,
    url: "https://in.linkedin.com/in/jyotish-ranjan-110a22211",
    name: "Jyotish Ranjan",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/kunal-wasnik",
    name: "Kunal Wasnik",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/romit-bhaumik-24a039217",
    name: "Romit Bhaumik",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/mayesh-mohapatra/",
    name: "Mayesh Mohapatra",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/jyotish-ranjan-110a22211/",
    name: "Jyotish Ranjan",
  },
  {
    id: 2,
    url: "https://www.linkedin.com/in/sidhant-sharma-415806210/",
    name: "Sidhant Sharma",
  },
  {
    id: 3,
    url: "https://www.linkedin.com/in/ashharzaman/",
    name: "Ashhar Zaman",
  },
  {
    id: 4,
    url: "https://www.linkedin.com/in/syed-lateef-47676539/",
    name: "Syed Lateef",
  },
  {
    id: 5,
    url: "https://www.linkedin.com/in/romit-bhaumik-24a039217/",
    name: "Romit Bhaumik",
  },
  { id: 6, url: "", name: "Kunal Ajay Wasnik" },
  {
    id: 1,
    url: "https://www.linkedin.com/in/rish01/",
    name: "Rishab Rajesh Sharma",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/nidhi-ahlawat-4b6629249/",
    name: "Dr. Nidhi Ahlawat",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/shaurya374/",
    name: "Shaurya Pratap Singh",
  },
  {
    id: 1,
    url: "https://www.linkedin.com/in/crishna0401/?originalSubdomain=in",
    name: " Pagadala Murthy Krishna",
  },
  {
    id: 2,
    url: "https://www.linkedin.com/in/pranay-pandey-085176141/",
    name: "Pranay Pandey",
  },
  {
    id: 3,
    url: "https://www.linkedin.com/in/i-navin-kumar-5bb775167/?originalSubdomain=in",
    name: " I Navin Kumar",
  },
  {
    id: 4,
    url: "https://www.linkedin.com/in/akash-agrawal-059307143/?originalSubdomain=in",
    name: "Akash Agrawal",
  },
  {
    id: 5,
    url: "https://www.linkedin.com/in/sudarshan-bandyopadhyay-11628a13a/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=in",
    name: " Sudarshan Bandhyopadhyay",
  },
  {
    id: 6,
    url: "https://www.linkedin.com/in/b-srinath-achary-652654193/?originalSubdomain=in",
    name: " B. Srinath Achary",
  },
  {
    id: 7,
    url: "https://www.linkedin.com/in/piyush-kumar-singh-998819153/?originalSubdomain=in",
    name: " Piyush Kumar",
  },
  {
    id: 8,
    url: "https://www.linkedin.com/in/alice-laguri/?originalSubdomain=in",
    name: " Alice Laguri",
  },
  { id: 9, url: "", name: " Deepak Yadav" },
  {
    id: 10,
    url: "https://www.linkedin.com/in/anishghule/?originalSubdomain=in",
    name: " Anish Ghule",
  },
  {
    id: 11,
    url: "https://www.linkedin.com/in/ishan-tiwari-2357361a3/?originalSubdomain=in",
    name: " Ishaan Tiwari",
  },
  {
    id: 12,
    url: "https://www.linkedin.com/in/aditya-uppal/",
    name: " Aditya Uppal",
  },
  {
    id: 14,
    url: "https://www.linkedin.com/in/abhay-kumar-singh-474731201/?trk=public_profile_browsemap&originalSubdomain=in",
    name: "Abhay Kumar Singh",
  },
  {
    id: 15,
    url: "https://www.linkedin.com/in/singhchan/?originalSubdomain=in",
    name: " Akash Kumar Singh",
  },
  {
    id: 16,
    url: "https://www.linkedin.com/in/abhinav-raja-2300471ab/?originalSubdomain=in",
    name: " Abhinav Raja",
  },
  {
    id: 17,
    url: "https://www.linkedin.com/in/uday-kasturi-552867195/?originalSubdomain=in",
    name: " Uday Kasturi",
  },
  {
    id: 19,
    url: "https://www.linkedin.com/in/sreekar-praneeth-marri-aab40b203/?originalSubdomain=in",
    name: " Sreekar Praneeth",
  },
  {
    id: 20,
    url: "https://www.linkedin.com/in/singhchan/?originalSubdomain=in",
    name: " Akash Kumar Singh",
  },
  {
    id: 21,
    url: "https://www.linkedin.com/in/bhavyaasharma/?originalSubdomain=in",
    name: " Bhavyaa Sharma",
  },
  { id: 22, url: "https://akhil-sharma30.github.io/", name: " Akhil Sharma" },
  {
    id: 24,
    url: "https://www.linkedin.com/in/agamdeep-iiser/?originalSubdomain=in",
    name: " Agamdeep Singh",
  },
  {
    id: 25,
    url: "https://www.linkedin.com/in/chirag-garg-23488625a/",
    name: "Chirag Garg",
  },
  {
    id: 26,
    url: "https://www.linkedin.com/in/kunal-kumar-sahoo/",
    name: "Kunal Kunar Sahoo",
  },
  {
    id: 27,
    url: "",
    name: "Gokul Adethya T",
  },
];

export default function Section3() {
  const [publications, setPublications] = useState<ScholarResult[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      // Simulate a loading state
      setLoading(true);

      // Directly use imported JSON data
      const result: ScholarResponse = scholarData;

      // Set publications
      setPublications(result.results || []);
    } catch (error) {
      setError("Failed to load publications");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div id="parent" className="mt-[6rem] p-8 text-white flex sm:flex-col">
      <div id="child1" className="p-6 w-[24%] sm:w-full md:w-full">
        <b className="flex leading-10 text-base">Collaborations</b>
        <div className="mb-4">
          <div className="text-gray-400 text-sm font-semibold mt-4">
            Academic
          </div>
          <div className="flex mt-4 justify-between">
            <div className="w-24 flex p-4 bg-zinc-900 mr-2">
              <Image src={mit} alt="MIT" />
            </div>
            <div className="w-24 flex p-4 bg-zinc-900 mr-2">
              <Image src={melbourn} alt="melbourn" />
            </div>
            <div className="w-24 flex p-4 bg-zinc-900">
              <Image src={deakin} alt="Deakin" />
            </div>
          </div>
          <Link href="/collaborators" className="text-xs ml-[75%]">
            See more...
          </Link>
        </div>
        <div className="mb-4">
          <div className="text-gray-400 text-sm font-semibold mt-4">
            Industry
          </div>
          <div className="flex mt-4 justify-between">
            <div className="w-24 flex p-4 bg-zinc-900 mr-2">
              <Image src={tata} alt="Tata" />
            </div>
            <div className="w-24 flex p-1 bg-zinc-900 mr-2">
              <Image src={volvo} alt="Volvo" />
            </div>
            <div className="w-24 flex p-4 bg-zinc-900">
              <Image src={bosch} alt="Bosch" />
            </div>
          </div>
          <Link href="/collaborators" className="text-xs ml-[75%]">
            See more...
          </Link>
        </div>
        <div className="mb-4">
          <div className="text-gray-400 text-sm font-semibold ">
            Government and PSU
          </div>
          {/* <div className="flex mt-4 justify-between">
            <div className="w-full flex justify-center items-center p-4 bg-zinc-900">
              <Image src={dst} alt="DST" />
            </div>
          </div> */}
          <div className="flex mt-4 justify-between">
            <div className="w-24 flex justify-center items-center p-3 bg-zinc-900">
              <Image src={isro} alt="ISRO" />
            </div>
            <div className="w-24 flex justify-center items-center p-3 bg-zinc-900">
              <Image src={serb} alt="SERB" />
            </div>
            <div className="w-24 flex justify-center items-center p-2 bg-zinc-900">
              <Image src={be} alt="BE" />
            </div>
          </div>
          <Link href="/collaborators" className="text-xs ml-[75%]">
            See more...
          </Link>
        </div>
      </div>
      <div id="child4" className="p-6 w-[18%] sm:w-full">
        <b className="leading-10 text-base">Researchers</b>
        <ul className="text-gray-400">
          <li className="mb-4">
            <a href="/P_portfolio" className="hover:text-white text-sm">
              <b>Dr. Punit Rathore</b>
              <br />
            </a>
            <i className="text-xs ml-2 t-0">
              Lab Convener, Assistant Professor, RBCCPS & CiSTUP
            </i>
          </li>
          {/* <li className="mt-2">
            <a href="" className="hover:text-white text-sm">
              <b>Dr. Vishwajeet Pattanaik</b>
              <br />
            </a>
            <i className="text-xs ml-2 t-0">
              Specialist Scientist, Research Staff
            </i>
          </li>
          <li className="mt-2">
            <a href="" className="hover:text-white text-sm">
              <b>Mayesh Mohapatra</b>
              <br />
            </a>
            <i className="text-xs ml-2 t-0">
              Project Associate, Research Staff
            </i>
          </li> */}
        </ul>
        {/* <p className="text-gray-400 text-sm font-semibold mt-6 mb-2">Members</p> */}
        <div className="ml-2">
          {/* <div className="mb-2">
            <DynamicDropdown title="Lab Head" items={itemsCurrentONE} />
          </div> */}
          <div className="mb-2">
            <DynamicDropdown
              title="Senior Research Staff"
              items={itemsCurrentTWO}
            />
          </div>
          <div className="mb-2">
            <DynamicDropdown
              title="Research Students"
              items={itemsCurrentTHREE}
            />
          </div>
          <div className="mb-2">
            <DynamicDropdown title="Research Staff" items={itemsCurrentFOUR} />
          </div>
          <div className="mb-2">
            <DynamicDropdown title="M.Tech Students" items={itemsCurrentFIVE} />
          </div>
          <div className="mb-2">
            <DynamicDropdown title="Interns" items={itemsCurrentSIX} />
          </div>
          <div className="mb-2">
            <DynamicDropdown
              title="Previous Members"
              items={itemsCurrentSEVEN}
            />
          </div>
        </div>
      </div>
      <div id="child2" className="p-6 w-[22%] sm:w-full">
        {" "}
        <b className="leading-10 text-base">Publications</b>
        <p className="text-xs font-semibold text-zinc-300"> (Recent 20)</p>
        <div className="h-[50vh] scrollbar-custom overflow-y-auto">
          {loading && <p className="text-xs">Loading...</p>}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <ul className="text-gray-400">
            {publications.map((publication, index) => (
              <li key={index} className="mb-2">
                <a
                  href={publication.link}
                  target="_blank"
                  className="text-sm hover:text-white"
                >
                  <b>{publication.title}</b>
                </a>
                <p className="text-xs font-thin">{publication.authors}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="child5" className="p-6 w-[20%] sm:w-full">
        <b className="leading-10 text-base">Positions</b>
        <Link
          href="/oppurtunities"
          target="_blank"
          className="flex text-sm text-gray-400 mb-4 font-bold hover:text-white"
        >
          {" "}
          Apply Here
          <Image src={lArrow} alt="right-arrow" className="w-4 ml-4" />
        </Link>
        <p className="font-serif text-sm leading-5 text-gray-400 mb-10">
          We always seek outstanding candidates from a variety of backgrounds
          besides our specific position openings.
        </p>
        <GraphData />

        <div id="icons">
          {/* <p className="text-sm font-semibold mt-20">Follow us on</p>
          <div id="social-icons" className="flex hover:fill-white">
            <a
              target="_blank"
              href="https://in.linkedin.com/company/center-for-infrastructure-sustainable-transportation-and-urban-planning"
              className="w-10  m-2"
            >
              <Image src={linkedin} alt="linkedin" className="m-2" />
            </a>
            <a
              target="_blank"
              href="https://twitter.com/CiSTUP"
              className="w-10  m-2"
            >
              <Image src={x} alt="x" className="m-2" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/cistup.iisc/"
              className="w-10  m-2"
            >
              <Image src={facebook} alt="facebook" className="m-2" />
            </a>
          </div> */}
        </div>
      </div>
      <div id="child3" className="p-6 w-[20%] sm:w-full">
        <b className="leading-10 text-base">News & Updates</b>
        <div className="h-[50vh] scrollbar-custom overflow-y-auto scrollbar-custom text-gray-400">
          <Newss />
        </div>
      </div>
    </div>
  );
}
