import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

// Define the interfaces
interface PublicationResult {
  title: string;
  link: string;
  authors: string;
  publicationDate: string;
  journal: string;
  citationCount: string;
}

interface ScholarResponse {
  results: PublicationResult[];
  metrics: {
    citationsAll: string;
    citationsSince2019: string;
    hIndexAll: string;
    hIndexSince2019: string;
    i10IndexAll: string;
    i10IndexSince2019: string;
  };
  graphData: {
    year: string;
    citations: string;
  }[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      "https://scholar.google.com.au/citations?hl=en&user=2clQgooAAAAJ&view_op=list_works&sortby=pubdate",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
        },
      }
    );

    const html = response.data;
    const $ = cheerio.load(html);

    const results: PublicationResult[] = [];
    const graphData: { year: string; citations: string }[] = [];

    // Scrape the list of publications
    $(".gsc_a_tr").each((_, el) => {
      const titleElement = $(el).find(".gsc_a_at");
      const title = titleElement.text().trim();
      const link = "https://scholar.google.com" + titleElement.attr("href");

      const authors = $(el).find(".gs_gray").first().text().trim();
      const publicationDate = $(el).find(".gsc_a_y").text().trim();
      const journal = $(el).find(".gs_gray").last().text().trim();
      const citationCount = $(el).find(".gsc_a_c a").text().trim() || "0";

      results.push({
        title,
        link,
        authors,
        publicationDate,
        journal,
        citationCount,
      });
    });

    // Scrape the scholar metrics
    const metrics = {
      citationsAll: $("#gsc_rsb_st .gsc_rsb_std").eq(0).text().trim(),
      citationsSince2019: $("#gsc_rsb_st .gsc_rsb_std").eq(1).text().trim(),
      hIndexAll: $("#gsc_rsb_st .gsc_rsb_std").eq(2).text().trim(),
      hIndexSince2019: $("#gsc_rsb_st .gsc_rsb_std").eq(3).text().trim(),
      i10IndexAll: $("#gsc_rsb_st .gsc_rsb_std").eq(4).text().trim(),
      i10IndexSince2019: $("#gsc_rsb_st .gsc_rsb_std").eq(5).text().trim(),
    };

    // Extract the graph data
    const years = $(".gsc_md_hist_b .gsc_g_t")
      .map((_, el) => $(el).text().trim())
      .get();
    const citations = $(".gsc_md_hist_b .gsc_g_a .gsc_g_al")
      .map((_, el) => $(el).text().trim())
      .get();

    years.forEach((year, i) => {
      if (year && citations[i]) {
        graphData.push({ year, citations: citations[i] });
      }
    });

    res.status(200).json({
      results,
      metrics,
      graphData,
    });
  } catch (error: unknown) {
    // Use a type guard to check if error is an instance of Error
    if (axios.isAxiosError(error)) {
      // Axios error
      console.error("Axios Error:", error.message);
      res.status(500).json({
        error: "Failed to scrape data. Please try again later.",
        details: error.message,
      });
    } else if (error instanceof Error) {
      // General error
      console.error("Error:", error.message);
      res.status(500).json({
        error: "Failed to scrape data. Please try again later.",
        details: error.message,
      });
    } else {
      // Fallback for unknown errors
      console.error("Unknown error:", error);
      res.status(500).json({
        error: "Failed to scrape data. Please try again later.",
        details: "An unknown error occurred.",
      });
    }
  }
};

export default handler;
