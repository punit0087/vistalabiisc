"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { tabData, Tab } from "./tab-data";

interface Job {
  id: string;
  title: string;
  designation: string;
  deadline: string;
  description: string[];
}

const jobs = tabData;

export default function JobListings() {
  const [openJob, setOpenJob] = useState<string | null>(null);

  return (
    <div className="w-full px-[20%] sm:px-[8%] mx-auto p-6 text-white">
      <div className="mb-40">
        <h2 className="text-2xl font-semibold text-zinc-300 mb-4">
          Recruitment Timeline
        </h2>
        <div className="rounded-lg border border-zinc-600">
          <table className="table-auto w-full border-collapse p-8 rounded-lg border border-zinc-600">
            <thead className="bg-zinc-300">
              <tr>
                <th className="p-8 border border-zinc-600 px-4 py-2 text-left text-zinc-800 font-medium">
                  Step
                </th>
                <th className="p-8 border border-zinc-600 px-4 py-2 text-left text-zinc-800  font-medium">
                  Date(s)
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-zinc-300">
              <tr className="">
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  Oppurtunity Announcement
                </td>
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  18th December 2024
                </td>
              </tr>
              <tr className="">
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  Submission Deadline
                </td>
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  31st December 2024
                </td>
              </tr>
              <tr className="">
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  First Stage of Screening Results
                </td>
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  7th January 2025
                </td>
              </tr>
              <tr className="">
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  Interview
                </td>
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  8th to 12th January 2025
                </td>
              </tr>
              <tr className="">
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  Final Results
                </td>
                <td className="p-8 rounded-lg border border-zinc-600 px-4 py-2">
                  15th January 2025
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Tabs defaultValue={jobs[0].id} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-1">
          {jobs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {jobs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.positions.map((position, index) => (
              <div
                key={index}
                className="p-8 rounded-lg mb-4 border border-zinc-600"
              >
                <Collapsible
                  open={openJob === `${tab.id}-${index}`}
                  onOpenChange={() =>
                    setOpenJob(
                      openJob === `${tab.id}-${index}`
                        ? null
                        : `${tab.id}-${index}`
                    )
                  }
                >
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="p-0 hover:bg-transperant hover:text-zinc-400"
                        >
                          <h2 className="text-lg font-semibold text-left sm:h-14 sm:overflow-y-auto sm:text-sm">
                            {position.title}
                          </h2>
                          {openJob === `${tab.id}-${index}` ? (
                            <ChevronUp className="ml-2 h-4 w-4 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <p className="text-zinc-400 text-sm pt-8">
                      Designation: {position.designation}
                    </p>
                    <p className="text-zinc-400 text-sm">
                      Deadline: {position.deadline}
                    </p>
                    <CollapsibleContent>
                      <div className="mt-14 mb-4">
                        <h3 className="font-semibold mb-2">Job Description:</h3>
                        <ul className="list-disc pl-5 text-sm">
                          {position.content.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-zinc-300">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
                <Button className="mt-4 items-center" asChild>
                  <a
                    href={position.applyLink}
                    // target="_blank"
                    rel="noopener noreferrer"
                  >
                    Closed
                  </a>
                </Button>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-zinc-300 text-justify mx-auto mt-20 text-sm font-semibold">
        We are always looking for highly motivated and dynamic people interested
        in exploring challenging areas of big data analytics, unsupervised
        learning, deep-learning, Spatio-temporal data mining, Internet of Things
        (IoT), and Intelligent Transportation, including novel and cutting-edge
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
    </div>
  );
}
