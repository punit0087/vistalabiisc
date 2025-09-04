"use client";
import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import { BackgroundGradient } from "../../components/ui/card";
import Image from "next/image";
import punith from "@/assets/profile/potrait/punit_rathore.jpg";
import viswajeet from "@/assets/profile/potrait/viswajeet.jpg";
import alok from "@/assets/profile/potrait/AlokenduMazumder.jpg";
import paritosh from "@/assets/profile/potrait/ParitoshTiwari.jpg";
import tirthajit from "@/assets/profile/potrait/TirthajitBaruah.jpg";
import srs from "@/assets/profile/potrait/SouravRanjan.jpg";
import parikshit from "@/assets/profile/potrait/ParikshitSinghRathore.jpg";
import rankit from "@/assets/profile/potrait/Rankit.jpg";
import anushtha from "@/assets/profile/potrait/AnushthaTamrakar.jpg";
import pruthvish from "@/assets/profile/potrait/pruthvish.jpg";
import ram from "@/assets/profile/potrait/Ram Samarth B B.jpg";
import Areddy from "@/assets/profile/potrait/reddy.jpg";
import Dprofile from "@/assets/profile/default-profile.svg";

import Bdebnath from "@/assets/profile/potrait/BiswadeepDebnath.png";
import ilana from "@/assets/profile/potrait/IlaAnanta.jpg";
import ritwik from "@/assets/profile/potrait/RithwikPradeep.jpg";
import Arnab from "@/assets/profile/potrait/ArnabRoy.jpg";
import Srikar from "@/assets/profile/potrait/VedantamSrikar.jpg";
import ojaswee from "@/assets/profile/potrait/ojaswee.jpg";
import debashis from "@/assets/profile/potrait/Debashis.jpg";
import yash from "@/assets/profile/potrait/yashsoni.jpg";
import adarsh from "@/assets/profile/potrait/AdharshNarayana.jpg";
import Mohith from "@/assets/profile/potrait/MohithKumar.png";
import chinmay from "@/assets/profile/potrait/chinmay.jpeg";
import arindam from "@/assets/profile/potrait/Arindam.jpg";
import shalini from "@/assets/profile/potrait/shalinisharma.jpeg";
import srimugdha from "@/assets/profile/potrait/SrimugdhaMahalakshmi.jpeg";
import { fetchPublicJson } from "@/lib/publicData";

type Person = {
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
};

// Map known names to local images; fall back to default avatar
const imageByName: Record<string, string> = {
  "Dr. Punit Rathore": punith.src,
  "Dr. Vishwajeet Pattanaik": viswajeet.src,
  "Dr. Pruthvish Rajput": pruthvish.src,
  "Dr. Aravinda Reddy": Areddy.src,
  "Parikshit Singh Rathore": parikshit.src,
  "Anushtha Tamrakar": anushtha.src,
  "Siddhant Saxena": Dprofile.src,
  "Alokendu Mazumder": alok.src,
  "Paritosh Tiwari": paritosh.src,
  "Ram Samarth B B": ram.src,
  "Tirthajit Baruah": tirthajit.src,
  "Sourav Ranjan Saraf": srs.src,
  "Rankit Kachroo": rankit.src,
  "Biswadeep Debnath": Bdebnath.src,
  "Ila Ananta": ilana.src,
  "Rithwik Pradeep": ritwik.src,
  "Arnab Roy": Arnab.src,
  "Srikar Vedantam": Srikar.src,
  "Vedantam Srikar": Srikar.src,
  "V Srimugdha Mahalakshmi Vabhiram": srimugdha.src,
  "Raju Bhookya": Dprofile.src,
  Ojaswee: ojaswee.src,
  "Dr. Debashis Ray Sarkar": debashis.src,
  "Yash Soni": yash.src,
  "Adharsh Narayana": adarsh.src,
  "Mohith Kumar S S": Mohith.src,
  "Chinmay P Mhatre": chinmay.src,
  "Arindam Chakraborty": arindam.src,
  "Shailja Sharma": shalini.src,
};

export default function CardP() {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [filteredData, setFilteredData] = useState<Person[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const json = await fetchPublicJson<{ members: any[] }>(
          "/data/team.json"
        );
        const currentMembers = (json.members || []).filter(
          (m: any) => m.status === "current"
        );
        const mapped: Person[] = currentMembers.map((m: any) => ({
          image: imageByName[m.name] || Dprofile.src,
          name: m.name || "",
          designation: m.designation || "",
          designationLabel: m.designationLabel || "",
          email: m.email || "",
          research: m.research || "",
          linkedin: m.links?.linkedin,
          github: m.links?.github,
          scholar: m.links?.scholar,
          portfolio: m.links?.portfolio,
        }));
        if (!isMounted) return;
        setAllPeople(mapped);
        setFilteredData(mapped);
      } catch (e) {
        console.error(e);
        setError("Failed to load team data");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const filterData = useMemo(
    () => (label: string, term: string) => {
      const t = term.toLowerCase();
      return allPeople.filter((person) => {
        const matchesLabel = !label || person.designationLabel === label;
        const matchesSearchTerm =
          person.name.toLowerCase().includes(t) ||
          person.designation.toLowerCase().includes(t) ||
          person.research.toLowerCase().includes(t) ||
          person.designationLabel.toLowerCase().includes(t);
        return matchesLabel && matchesSearchTerm;
      });
    },
    [allPeople]
  );

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
      {error && (
        <div className="mb-4 rounded bg-red-500/10 text-red-300 p-3 text-sm">
          {error}
        </div>
      )}
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
