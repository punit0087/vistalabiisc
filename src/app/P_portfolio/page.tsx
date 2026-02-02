import type { Metadata } from "next";
import Content from "@/app/P_portfolio/components/content";

export const metadata: Metadata = {
  title: "Punit Rathore | VISTA Lab, IISc",
  description: "Portfolio - Punit Rathore",
  keywords: [
    "Punit Rathore",
    "VISTA Lab",
    "IISc",
    "Portfolio",
    "Research",
    "Projects",
    "Publications",
    "Simulations",
  ],
  alternates: {
    canonical: "/P_portfolio",
  },
  openGraph: {
    title: "Punit Rathore | VISTA Lab, IISc",
    description: "Portfolio - Punit Rathore",
    url: "/P_portfolio",
    siteName: "VISTA Lab @ IISc",
    images: [
      {
        url: "/data/ProjectsCoverIMG/TreeVisualization.png",
        width: 1200,
        height: 630,
        alt: "VISTA Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punit Rathore | VISTA Lab, IISc",
    description: "Portfolio - Punit Rathore",
    images: ["/data/ProjectsCoverIMG/TreeVisualization.png"],
  },
};

export default function portfolio() {
  return (
    <>
      <Content />
    </>
  );
}
