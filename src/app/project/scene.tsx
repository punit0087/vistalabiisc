"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import ForceGraph3D from "react-force-graph-3d";
import ReactDOM from "react-dom";

// Define the Node and Link interfaces
interface Node {
  id: number;
  val: number;
  project: string;
}

interface Link {
  source: number;
  target: number;
}

// Define the Project and Researcher interfaces
interface Project {
  id: number;
  name: string;
  description: string;
  researchers: string[];
  tech: string[];
  data: string[];
  fundedBy: string[];
  url: string;
}

interface Researcher {
  id: number;
  name: string;
}

const fetchData = async () => {
  const [projectsResponse, researchersResponse] = await Promise.all([
    fetch("/data/projects.json", { cache: "no-store" }),
    fetch("/data/researchers.json", { cache: "no-store" }),
  ]);
  if (!projectsResponse.ok || !researchersResponse.ok) {
    throw new Error("Failed to fetch projects or researchers data");
  }
  const { projects } = await projectsResponse.json();
  const { researchers } = await researchersResponse.json();
  return { projects, researchers };
};

const generateNodes = (projects: Project[]): Node[] =>
  projects.map((project, i) => ({
    id: i,
    val: Math.random() * 1.5 + 1,
    project: project.name,
  }));

const generateLinks = (nodes: Node[]): Link[] => {
  let links: Link[] = [];
  nodes.forEach((node) => {
    let numNodeLinks = Math.round(Math.random() * 2) + 1;
    for (let i = 0; i < numNodeLinks; i++) {
      links.push({
        source: node.id,
        target: Math.round(
          Math.random() * (node.id > 0 ? node.id - 1 : node.id)
        ),
      });
    }
  });
  return links;
};

const CombinedPage: React.FC = React.memo(() => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [hoveredResearcher, setHoveredResearcher] = useState<Researcher | null>(
    null
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGraphVisible, setIsGraphVisible] = useState<boolean>(true);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const graphElemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const { projects, researchers } = await fetchData();
      setProjects(projects);
      setResearchers(researchers);
      const nodes = generateNodes(projects);
      const links = generateLinks(nodes);
      setNodes(nodes);
      setLinks(links);
    };

    fetchDataAndSetState();
  }, []);

  const handleMouseEnter = useCallback((project: Project) => {
    setHoveredProject(project);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredProject(null);
  }, []);

  const handleResearcherMouseEnter = useCallback((researcher: Researcher) => {
    setHoveredResearcher(researcher);
    setSelectedProject(null); // Clear the selected project
  }, []);

  const handleNodeClick = useCallback(
    (node: Node) => {
      const project = projects.find((project) => project.name === node.project);
      setSelectedProject(project || null);
    },
    [projects]
  );

  useEffect(() => {
    if (hoveredProject || hoveredResearcher) {
      setIsGraphVisible(true);
    }
  }, [hoveredProject, hoveredResearcher]);

  useEffect(() => {
    if (typeof window !== "undefined" && isGraphVisible) {
      const graphElem = graphElemRef.current!;
      const particleSpeed = 0.0075;

      const GraphComponent = (
        <ForceGraph3D
          graphData={{ nodes, links }}
          nodeThreeObject={(node: Node) => {
            const group = new THREE.Group();
            let color = "white";

            if (hoveredProject) {
              color = hoveredProject.name === node.project ? "#fff" : "#222222";
            } else if (hoveredResearcher) {
              const researcherProjects = projects.filter((project) =>
                project.researchers.includes(hoveredResearcher.name)
              );
              const researcherProjectNames = researcherProjects.map(
                (project) => project.name
              );
              color = researcherProjectNames.includes(node.project)
                ? "#fff"
                : "#222222";
            }

            const material = new THREE.MeshBasicMaterial({
              color,
              transparent: true,
              opacity: 1,
              blending: THREE.AdditiveBlending,
            });
            const sphere = new THREE.Mesh(
              new THREE.SphereGeometry(3),
              material
            );
            group.add(sphere);

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d")!;
            const fontSize = 40;
            const padding = 10;
            const verticalPadding = 60;
            const text = node.project;
            context.font = `${fontSize}px Arial`;
            const textMetrics = context.measureText(text);

            const textWidth = textMetrics.width;
            const textHeight = fontSize * 1.2;
            const canvasWidth = textWidth + padding * 2;
            const canvasHeight = textHeight + verticalPadding * 2;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = `${fontSize}px Arial`;
            context.textAlign = "end";
            context.textBaseline = "middle";
            context.fillStyle = "#ffffff";
            context.fillText(text, textWidth + padding, fontSize + padding);

            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;
            const spriteMaterial = new THREE.SpriteMaterial({
              map: texture,
              transparent: true,
            });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(canvasWidth / 10, canvasHeight / 10, 1);
            sprite.position.set(0, 4, 0);
            group.add(sprite);

            return group;
          }}
          linkColor={(link: Link) => {
            const linkSourceNode = nodes.find(
              (node) => node.id === link.source
            );
            const linkTargetNode = nodes.find(
              (node) => node.id === link.target
            );
            if (linkSourceNode && linkTargetNode) {
              if (hoveredResearcher) {
                const researcherProjects = projects.filter((project) =>
                  project.researchers.includes(hoveredResearcher.name)
                );
                const researcherProjectNames = researcherProjects.map(
                  (project) => project.name
                );
                const isLinkBetweenHighlightedNodes =
                  researcherProjectNames.includes(linkSourceNode.project) &&
                  researcherProjectNames.includes(linkTargetNode.project);
                return isLinkBetweenHighlightedNodes ? "#ffffff" : "#222222";
              }
              return "#ffffff"; // Default color
            }
            return "#222222"; // Default color for invalid links
          }}
          linkOpacity={0.5}
          linkWidth={0.2}
          // linkDirectionalParticles={5} // Commented out
          // linkDirectionalParticleWidth={1} // Commented out
          // linkDirectionalParticleSpeed={particleSpeed} // Commented out
          // linkDirectionalParticleColor={(link: Link) => { // Commented out
          //   const linkSourceNode = nodes.find(
          //     (node) => node.id === link.source
          //   );
          //   const linkTargetNode = nodes.find(
          //     (node) => node.id === link.target
          //   );
          //   if (linkSourceNode && linkTargetNode) {
          //     if (hoveredResearcher) {
          //       const researcherProjects = projects.filter((project) =>
          //         project.researchers.includes(hoveredResearcher.name)
          //       );
          //       const researcherProjectNames = researcherProjects.map(
          //         (project) => project.name
          //       );
          //       const isLinkBetweenHighlightedNodes =
          //         researcherProjectNames.includes(linkSourceNode.project) &&
          //         researcherProjectNames.includes(linkTargetNode.project);
          //       return isLinkBetweenHighlightedNodes ? "#ffffff" : "#222222";
          //     }
          //     return "#ffffff"; // Default color
          //   }
          //   return "#222222"; // Default color for invalid links
          // }}
          onNodeClick={handleNodeClick}
        />
      );

      ReactDOM.render(GraphComponent, graphElem);
    }
  }, [
    hoveredProject,
    hoveredResearcher,
    isGraphVisible,
    nodes,
    links,
    handleNodeClick,
  ]);

  return (
    <div className="z-10">
      <div className="absolute top-[10%] z-10 flex flex-col sm:hidden">
        <div className="text-white p-10">
          <span className="text-md font-semibold text-zinc-400">
            Researchers
          </span>
          <ul className="text-zinc-400 text-xs h-[70vh] overflow-y-auto scrollbar-custom">
            {researchers.map((researcher) => (
              <li
                key={researcher.id}
                className={`p-2 ${
                  (hoveredResearcher &&
                    hoveredResearcher.name === researcher.name) ||
                  (hoveredProject &&
                    hoveredProject.researchers.includes(researcher.name))
                    ? "text-zinc-600 transition-all"
                    : ""
                } cursor-pointer`}
                onMouseEnter={() => handleResearcherMouseEnter(researcher)}
                onMouseLeave={handleMouseLeave}
              >
                {researcher.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isGraphVisible && <div ref={graphElemRef}></div>}
      //right-content below
      <div className="fixed right-10 top-[12%] w-[25%] text-white p-4 transition-all sm:w-[86%] sm:top-[76vh] sm:absolute sm:bg-black">
        <h2 className="font-bold text-sm">VISTA LAB PROJECTS</h2>
        <h3 className="text-xs text-zinc-500 mb-14">Visual Intelligence</h3>
        {selectedProject && (
          <div className="mt-4">
            <h4 className="text-xl mb-4 font-semibold">
              {selectedProject.name}
            </h4>
            <p className="text-zinc-400 h-[30vh] overflow-y-auto text-xs text-justify">
              {selectedProject.description}
            </p>
            <div className="mt-2 text-sm">
              <span className="text-zinc-300">Researchers: </span>
              <p className="text-zinc-400 text-xs mt-1">
                {selectedProject.researchers.join(", ")}
              </p>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-zinc-300">Technologies: </span>
              <p className="text-zinc-400 text-xs mt-1">
                {selectedProject.tech.join(", ")}
              </p>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-zinc-300">Data: </span>
              <p className="text-zinc-400 text-xs mt-1">
                {selectedProject.data.join(", ")}
              </p>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-zinc-300">Funded By: </span>
              <p className="text-zinc-400 text-xs mt-1">
                {selectedProject.fundedBy.join(", ")}
              </p>
            </div>
            <a
              href={selectedProject.url}
              className="text-blue-400 text-xs mt-4 inline-block"
            >
              Learn more
            </a>
          </div>
        )}
      </div>
      <p className=" absolute text-zinc-200 top-[96vh] left-[30%] z-40 font-semibold text-sm bg-black p-8 pt-0 sm:hidden">
        This is an interactive page. Hover over the projects/researchers and
        click to know more about them{" "}
      </p>
    </div>
  );
});

export default CombinedPage;
