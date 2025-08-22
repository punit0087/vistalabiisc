"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";
import tata from "@/assets/brand/TATAELXSI.NS.svg";
import volvo from "@/assets/brand/volvo.svg";
import bosch from "@/assets/brand/bosch.svg";
import art from "@/assets/brand/artpark(v).png";
import dst from "@/assets/brand/DST.png";
import isro from "@/assets/brand/isro.png";
import serb from "@/assets/brand/SERB.png";
import be from "@/assets/brand/bharatelectronics.png";
import power from "@/assets/brand/powergrid.png";

import mit from "@/assets/brand/mit-logo.svg";
import uof from "@/assets/brand/uoflorida.svg";
import uom from "@/assets/brand/Melbourne.svg";
import deakin from "@/assets/brand/deakin-university.svg";

import griffith from "@/assets/brand/griffith-university.svg";
import uonsw from "@/assets/brand/unsw.svg";
import nus from "@/assets/brand/nus.svg";
import ntua from "@/assets/brand/ntua.svg";

import imt from "@/assets/brand/Institut Mines Telecom.svg";
import iitD from "@/assets/brand/IIt_delhi.svg";
import iitK from "@/assets/brand/iit_kanpur.svg";
import iitH from "@/assets/brand/iit hyderabad.svg";
import iitR from "@/assets/brand/iit_roorkee.svg";

import ericsson from "@/assets/brand/Ericsson.svg";
import toyota from "@/assets/brand/Toyota.svg";
import npci from "@/assets/brand/npci.svg";

import { BackgroundCellAnimation } from "@/components/ui/BackgroundRippleEffect";

import academic from "@/assets/collaborators/academic(collaborators).svg";
import industry from "@/assets/collaborators/industry.svg";
import government from "@/assets/collaborators/government.svg";

export default function Collaborators() {
  return (
    <>
      <BackgroundCellAnimation />
      <div className="flex sm:flex-col">
        <div className="flex mt-8 sm:rotate-90 sm:mt-32" id="left">
          <Image
            src={academic}
            className="w-48 h-fit ml-8 -mr-4 sm:w-12 "
            alt=""
          />
        </div>
        <div className="w-fit ml-16 sm:ml-10 sm:-mt-40" id="right">
          <div className="mb-6 flex items-center justify-center sm:flex-col">
            <PinContainer title="Massachusetts Institute of Technology (MIT), Cambridge, USA">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem]">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center items-center mb-4">
                  <Image
                    src={mit}
                    alt="MIT"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="University of Florida">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={uof}
                    alt="uof"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="Deakin University, Australia">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={deakin}
                    alt="Deakin"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="The University of Melbourne, Australia">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={uom}
                    alt="University of Melbourne"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
          <div className="mb-6 flex items-center justify-center sm:flex-col">
            <PinContainer title="Griffith University, Brisbane">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={griffith}
                    alt="Griffith University"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="University of New South Wales, Sydney">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={uonsw}
                    alt="University of New South Wales, Sydney"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="National University of Singapore">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={nus}
                    alt="National University of Singapore"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="National Technical University of Athens">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex w-full h-full rounded-lg justify-center items-center">
                  <Image
                    src={ntua}
                    alt="National Technical University of Athens"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
          <div className="mb-6 flex items-center justify-center sm:flex-col">
            <PinContainer title="INSTITUT MINES-TELECOM">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={imt}
                    alt="INSTITUT MINES-TELECOM"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="IIT Delhi">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={iitD}
                    alt="IIT Delhi"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="IIT Kanpur">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={iitK}
                    alt="IIT Kanpur"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="IIT Hyderabad">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={iitH}
                    alt="IIT Hyderabad"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
          <div className="mb-20">
            <PinContainer title="IIT Roorkee">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={iitR}
                    alt="IIT Roorkee"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col">
        <div className="flex mt-8 sm:rotate-90 sm:mt-32" id="left">
          <Image
            src={industry}
            className="w-48 h-fit ml-8 -mr-4 sm:w-12 "
            alt=""
          />
        </div>
        <div className="w-fit ml-16 sm:ml-10 sm:-mt-40" id="right">
          <div className="mb-6 flex items-center justify-center sm:flex-col">
            <PinContainer title="Bosch">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem]">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={bosch}
                    alt="bosch"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="Volvo">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={volvo}
                    alt="volvo"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="Tata ELXSI">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={tata}
                    alt="tata"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="ArtPark">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={art}
                    alt="ArtPark"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
          <div className="mb-6 flex items-center justify-center ">
            <PinContainer title="Ericsson">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={ericsson}
                    alt="Ericsson"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            {/* <PinContainer title="Toyota Kirloskar">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={toyota}
                    alt="Toyota Kirloskar"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer> */}
          </div>
        </div>
      </div>
      <div className="flex mt-20 sm:flex-col">
        <div className="flex mt-8 sm:rotate-90 sm:mt-32" id="left">
          <Image
            src={government}
            className="w-48 h-fit ml-8 -mr-4 sm:w-12 "
            alt=""
          />
        </div>
        <div className="w-fit ml-16 sm:ml-10 sm:-mt-40" id="right">
          <div className="mb-6 flex items-center justify-center sm:flex-col">
            <PinContainer title="NPCI">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex w-full h-full rounded-lg justify-center text-center">
                  <Image
                    src={npci}
                    alt="NPCI"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="PowerGrid">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex w-full h-full rounded-lg justify-center text-center mb-4">
                  <Image
                    src={power}
                    alt="PowerGrid"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="Bharath Electronics">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex w-full h-full rounded-lg justify-center text-center">
                  <Image
                    src={be}
                    alt="Bharath Electronics"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>

            <PinContainer title="ISRO">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={isro}
                    alt="isro"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
          <div className="mb-6 flex items-center justify-center sm:flex-col">
            <PinContainer title="SERB India">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center">
                  <Image
                    src={serb}
                    alt="serb"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
            <PinContainer title="Department of Science and Technology">
              <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem]">
                <div className="flex flex-1 w-full h-full rounded-lg justify-center mb-4">
                  <Image
                    src={dst}
                    alt="dst"
                    className="object-contain object-center w-[10rem]"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
        </div>
      </div>
    </>
  );
}
