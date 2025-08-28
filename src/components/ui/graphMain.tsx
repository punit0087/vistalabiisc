import React, { useEffect, useState } from "react";
import Graph from "@/components/ui/graph";

const GraphData = () => {
  const [data, setData] = useState<{ year: number; citations: number }[]>([]);
  const [metrics, setMetrics] = useState<{
    citationsAll: string;
    citationsSince2019: string;
    hIndexAll: string;
    hIndexSince2019: string;
    i10IndexAll: string;
    i10IndexSince2019: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/scholar.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch scholar data");
        const result = await res.json();

        setMetrics({
          citationsAll: result.metrics?.citationsAll || "0",
          citationsSince2019: result.metrics?.citationsSince2019 || "0",
          hIndexAll: result.metrics?.hIndexAll || "0",
          hIndexSince2019: result.metrics?.hIndexSince2019 || "0",
          i10IndexAll: result.metrics?.i10IndexAll || "0",
          i10IndexSince2019: result.metrics?.i10IndexSince2019 || "0",
        });

        const transformedData = (result.graphData || []).map((item: any) => ({
          year: parseInt(item.year, 10),
          citations: parseInt(item.citations, 10),
        }));
        setData(transformedData);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="table_area mb-4">
        <table className="text-sm w-full text-gray-400">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="pr-[12px] text-left">Indices</th>
              <th className="text-right">All</th>
              <th className="text-right">Since 2019</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-600">
              <td>Citations</td>
              <td className="text-right">{metrics?.citationsAll}</td>
              <td className="text-right">{metrics?.citationsSince2019}</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td>h-index</td>
              <td className="text-right">{metrics?.hIndexAll}</td>
              <td className="text-right">{metrics?.hIndexSince2019}</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td>i10-index</td>
              <td className="text-right">{metrics?.i10IndexAll}</td>
              <td className="text-right">{metrics?.i10IndexSince2019}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Graph data={data} width={280} height={210} />
    </>
  );
};

export default GraphData;
