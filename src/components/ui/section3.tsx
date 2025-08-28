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

// Publications come from a single source of truth in public/data

import { useMemo, useState } from "react";

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

type TeamMember = {
  name: string;
  designation: string;
  designationLabel: string; // e.g., Lab Head, Research Staff, Research Scholar, M.Tech
  status: "current" | "previous";
  email?: string;
  research?: string;
  links?: { linkedin?: string; portfolio?: string; scholar?: string; github?: string };
};

// Derived dropdowns from team.json
const useTeamDropdowns = (members: TeamMember[]) => {
  const current = members.filter((m) => m.status === "current");
  const previous = members.filter((m) => m.status === "previous");
  const byLabel = (label: string) =>
    current.filter((m) => m.designationLabel === label);
  const mapToItems = (arr: TeamMember[]) =>
    arr.map((m, i) => ({
      id: i + 1,
      url:
        m.links?.linkedin ||
        m.links?.portfolio ||
        m.links?.scholar ||
        m.links?.github ||
        "#",
      name:
        labelPrefix(m.designationLabel) +
        (m.designationLabel === "Lab Head"
          ? ` ${m.name} - ${m.designation}`
          : ` ${m.name}`),
    }));
  const labelPrefix = (label: string) => {
    switch (label) {
      case "Lab Head":
        return "";
      case "Research Staff":
        return "";
      case "Research Scholar":
        return "";
      case "M.Tech":
        return "";
      default:
        return "";
    }
  };
  return {
    labHead: mapToItems(byLabel("Lab Head")),
    researchStaff: mapToItems(byLabel("Research Staff")),
    researchScholars: mapToItems(byLabel("Research Scholar")),
    mtech: mapToItems(byLabel("M.Tech")),
    interns: [] as { id: number; url: string; name: string }[],
    previous: mapToItems(previous),
  };
};

export default function Section3() {
  const [publications, setPublications] = useState<ScholarResult[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/scholar.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch scholar data");
        const result: ScholarResponse = await res.json();
        setPublications(result.results || []);
        // Load team members
        const teamRes = await fetch("/data/team.json", { cache: "no-store" });
        if (teamRes.ok) {
          const teamJson = await teamRes.json();
          setMembers(teamJson.members || []);
        }
      } catch (error) {
        setError("Failed to load publications");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const dropdowns = useTeamDropdowns(members);

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
          {/* <div className="mb-2"> */}
          {/*   <DynamicDropdown title="Lab Head" items={dropdowns.labHead} /> */}
          {/* </div> */}
          <div className="mb-2">
            <DynamicDropdown
              title="Research Staff"
              items={dropdowns.researchStaff}
            />
          </div>
          <div className="mb-2">
            <DynamicDropdown
              title="Research Students"
              items={dropdowns.researchScholars}
            />
          </div>
          <div className="mb-2">
            <DynamicDropdown title="M.Tech Students" items={dropdowns.mtech} />
          </div>
          {/* Interns kept empty for now; add label in team.json if needed */}
          <div className="mb-2">
            <DynamicDropdown
              title="Previous Members"
              items={dropdowns.previous}
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
