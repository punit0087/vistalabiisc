"use client";

import { useEffect, useMemo, useState } from "react";
import "@/app/P_portfolio/components/style.css";
import BackButton from "@/components/ui/backBtn";
import { fetchPublicJson } from "@/lib/publicData";

type Project = {
  id: number;
  name: string;
  description?: string;
  researchers?: string[];
  tech?: string[];
  data?: string[];
  fundedBy?: string[];
  url: string;
  image?: string;
};

type ProjectsPayload = {
  projects: Project[];
};

type ProjectDetailProps = {
  slug: string;
};

export default function ProjectDetail({ slug }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedSlug = useMemo(() => slug.toLowerCase(), [slug]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchPublicJson<ProjectsPayload>(
          "/data/projects.json"
        );
        if (cancelled) return;
        const match = (data.projects || []).find((p) => {
          const urlSlug = (p.url || "")
            .split("/")
            .filter(Boolean)
            .pop();
          return String(urlSlug || "").toLowerCase() === normalizedSlug;
        });
        setProject(match || null);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || "Failed to load project");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [normalizedSlug]);

  const researchers = project?.researchers || [];
  const tech = project?.tech || [];
  const data = project?.data || [];
  const fundedBy = project?.fundedBy || [];

  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {loading && !project ? (
          <p className="text-zinc-400 text-sm">Loading project...</p>
        ) : project ? (
          <>
            <p className="text-2xl font-bold mb-10 text-zinc-300">
              {project.name}
            </p>
            <p className="text-sm mt-4 text-justify mb-5">
              {project.description || ""}
            </p>
            {researchers.length > 0 && (
              <div className="mt-2">
                <span className="text-zinc-300 font-semibold">
                  Researchers: 
                </span>
                <p className="text-zinc-400 text-sm mt-1">
                  {researchers.join(", ")}
                </p>
              </div>
            )}
            {tech.length > 0 && (
              <div className="mt-4">
                <span className="text-zinc-300 font-semibold">
                  Technologies: 
                </span>
                <p className="text-zinc-400 text-sm mt-1">
                  {tech.join(", ")}
                </p>
              </div>
            )}
            {data.length > 0 && (
              <div className="mt-4">
                <span className="text-zinc-300 font-semibold">Data: </span>
                <p className="text-zinc-400 text-sm mt-1">
                  {data.join(", ")}
                </p>
              </div>
            )}
            {fundedBy.length > 0 && (
              <div className="mt-4">
                <span className="text-zinc-300 font-semibold">Funded By: </span>
                <p className="text-zinc-400 text-sm mt-1">
                  {fundedBy.join(", ")}
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-zinc-400 text-sm">Project not found.</p>
        )}
      </div>
    </div>
  );
}
