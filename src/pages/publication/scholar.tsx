"use client";
import { useState, useEffect, useCallback } from "react";

type ScholarResult = {
  title: string;
  link: string;
  authors: string;
  publicationDate: string;
  journal: string;
  citationCount: string;
};

type ScholarMetrics = {
  citationsAll: string;
  citationsSince2019: string;
  hIndexAll: string;
  hIndexSince2019: string;
  i10IndexAll: string;
  i10IndexSince2019: string;
};

type GraphData = {
  year: string;
  citations: string;
};

type ScholarResponse = {
  results?: ScholarResult[];
  metrics?: ScholarMetrics;
  graphData?: GraphData[];
  error?: string;
};

export default function Scholar() {
  const [results, setResults] = useState<ScholarResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<ScholarResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [metrics, setMetrics] = useState<ScholarMetrics | undefined>(undefined);
  const [graphData, setGraphData] = useState<GraphData[] | undefined>(
    undefined
  );

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/scholar.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch scholar data");
        const data: ScholarResponse = await res.json();
        setResults(data.results || []);
        setMetrics(data.metrics);
        setGraphData(data.graphData);
        setFilteredResults(data.results || []);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filterAndSortResults = useCallback(() => {
    let filtered = results.filter((result) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const authors = result.authors.toLowerCase();
      const year = parseInt(result.publicationDate.split("-")[0], 10);
      return (
        (result.title.toLowerCase().includes(lowerCaseQuery) ||
          authors.includes(lowerCaseQuery) ||
          result.publicationDate.includes(lowerCaseQuery)) &&
        (selectedYear ? year === selectedYear : true)
      );
    });

    setFilteredResults(filtered);
  }, [results, searchQuery, selectedYear]);

  useEffect(() => {
    filterAndSortResults();
  }, [searchQuery, selectedYear, filterAndSortResults]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (year: number) => {
    setSelectedYear(year);
  };

  const uniqueYears = Array.from(
    new Set(
      results.map((result) =>
        parseInt(result.publicationDate.split("-")[0], 10)
      )
    )
  );

  return (
    <div className="mx-auto pt-32 w-[80%] p-4 text-white sm:w-[90vw]">
      <h1 className="text-2xl font-bold mb-8">Publications</h1>
      <div className="flex justify-between mb-4 sm:flex-col">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-4 border rounded-md w-[20vw] bg-zinc-900 border-none text-sm text-white outline-none sm:w-full sm:mb-4"
          placeholder="Search by title, year, or author"
        />
        <select
          onChange={(e) => handleFilter(Number(e.target.value))}
          className="p-4 text-sm border-none bg-zinc-900 text-white outline-none rounded-md mr-4 sm:w-full sm:mb-4"
        >
          <option value="">Filter by Year</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {/* {metrics && (
        <div className="mb-8">
          <p>Citations All: {metrics.citationsAll}</p>
          <p>Citations Since 2019: {metrics.citationsSince2019}</p>
          <p>H-Index All: {metrics.hIndexAll}</p>
          <p>H-Index Since 2019: {metrics.hIndexSince2019}</p>
          <p>i10 Index All: {metrics.i10IndexAll}</p>
          <p>i10 Index Since 2019: {metrics.i10IndexSince2019}</p>
        </div>
      )}
      {graphData && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Citations Over Years</h2>
          <ul>
            {graphData.map((data, index) => (
              <li key={index}>
                {data.year}: {data.citations} citations
              </li>
            ))}
          </ul>
        </div>
      )} */}
      <ul>
        {filteredResults.map((result, index) => (
          <li key={index} className="mb-4 p-4 bg-zinc-900 rounded">
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="space-y-1 flex sm:flex-col"
            >
              <div className="w-[60%] sm:w-full">
                <h2 className="max-w-[70%] font-bold mb-8 sm:max-w-[90%]">
                  {result.title}
                </h2>
              </div>
              <div className="flex w-[20%] flex-col justify-between pr-4 sm:w-full">
                <p className="text-xs mb-2">
                  <b className="text-sm">Authors:</b> <br /> {result.authors}
                </p>
              </div>
              <div className="flex w-[20%] flex-col justify-between pr-4 sm:w-full">
                <p className="text-xs mb-2">
                  <b className="text-sm sm:w-full"> Article:</b>
                  <br /> {result.journal}
                </p>
                <p className="text-xs mb-2 sm:w-full">
                  <b className="text-sm"> Publication Date:</b>
                  <br /> {result.publicationDate}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
