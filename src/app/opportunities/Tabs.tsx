// Tabs.tsx
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { tabData, Tab, Position } from "./tab-data";

export default function JobListings() {
  const [now, setNow] = useState(() => new Date());
  const [openJob, setOpenJob] = useState<string | null>(null);

  // Tick every minute to refresh deadline checks
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-[20%] sm:px-[8%] mx-auto p-6 text-white">
      <Tabs defaultValue={tabData[1].id} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-1">
          {tabData.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabData.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.positions.map((position, index) => {
              const deadline = new Date(position.deadlineIso);
              const isClosed = now > deadline;

              return (
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
                          <button className="flex items-center p-0 hover:bg-transparent hover:text-zinc-400">
                            <h2 className="text-lg font-semibold text-left sm:h-14 sm:overflow-y-auto sm:text-sm">
                              {position.title}
                            </h2>
                            {openJob === `${tab.id}-${index}` ? (
                              <ChevronUp className="ml-2 h-4 w-4 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                            )}
                          </button>
                        </CollapsibleTrigger>
                      </div>
                      <p className="text-zinc-400 text-sm pt-8">
                        Designation: {position.designation}
                      </p>
                      <p className="text-zinc-400 text-sm">
                        Deadline:{" "}
                        {deadline.toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      <CollapsibleContent>
                        <div className="mt-14 mb-4">
                          <h3 className="font-semibold mb-2">
                            Job Description:
                          </h3>
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

                  <div className="mt-4 ">
                    {isClosed ? (
                      <Button disabled className="cursor-not-allowed">
                        Closed
                      </Button>
                    ) : (
                      <Button asChild>
                        <a
                          href={position.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply Now
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
