"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface GraphProps {
  data: { year: number; citations: number }[];
  width: number;
  height: number;
}

const Graph: React.FC<GraphProps> = ({ data, width, height }) => {
  const graphRef = useRef<SVGSVGElement | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    year: number;
    citations: number;
  } | null>(null);

  useEffect(() => {
    if (!graphRef.current) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(graphRef.current)
      .attr("width", svgWidth + margin.left + margin.right)
      .attr("height", svgHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([2018, 2024]).range([0, svgWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.citations)!])
      .nice()
      .range([svgHeight, 0]);

    // Append gray line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line<any>()
          .x((d) => x(d.year))
          .y((d) => y(d.citations))
      );

    // Append circles with tooltips
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.citations))
      .attr("r", 4)
      .attr("fill", "gray")
      .attr("stroke", "gray")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
        setTooltipVisible(true);
        setTooltipData(d);
      })
      .on("mouseout", () => {
        setTooltipVisible(false);
        setTooltipData(null);
      });

    // Append x-axis (gray color)
    svg
      .append("g")
      .attr("transform", `translate(0,${svgHeight})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
      .attr("color", "gray");
  }, [data, width, height]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={graphRef}></svg>
      {tooltipVisible && tooltipData && (
        <div
          style={{
            fontSize: "12px",
            color: "#dee0e2",
            position: "absolute",
            top: 25, // Adjust position based on your needs (tooltipData.cy + 20)
            padding: "4px",
            backgroundColor: "#2d3032",
            borderRadius: "4px",
          }}
        >
          Citations: {tooltipData.citations}
        </div>
      )}
    </div>
  );
};

export default Graph;
