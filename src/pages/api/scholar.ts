import { NextApiRequest, NextApiResponse } from "next";
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
    const response = await fetch(
      "https://scholar.google.com.au/citations?hl=en&user=2clQgooAAAAJ&view_op=list_works&sortby=pubdate"
    );
    const html = await response.text();
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

    // Extract the graph data by pairing years with citation counts
    const years = $(".gsc_md_hist_b .gsc_g_t")
      .map((_, el) => $(el).text().trim())
      .get();
    const citations = $(".gsc_md_hist_b .gsc_g_a .gsc_g_al")
      .map((_, el) => $(el).text().trim())
      .get();

    // Combine years and citations into the graphData array
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
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Failed to scrape data. Verify Google Scholar layout or IDs.",
    });
  }
};

export default handler;
