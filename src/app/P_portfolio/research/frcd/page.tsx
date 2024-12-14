import Image from "next/image";
import BackButton from "@/components/ui/backBtn";

import fake_review from "@/app/P_portfolio/assets/Fake_review.png";

import "@/app/P_portfolio/components/style.css";

export default function Fake_r() {
  return (
    <div className="bodyy flex justify-center mt-[8%] sm:mt-[50%]">
      <BackButton />
      <div className="w-[80%] flex flex-col shadow-box p-[60px] sm:p-10">
        <p className="text-2xl font-bold mb-10 text-zinc-300">
          Fake Reviewer Groups Detection from Digital Market
        </p>
        <p className="text-sm text-justify p-4">
          Online product reviews have become increasingly important in digital
          consumer markets where they play a crucial role in making purchasing
          decisions by most consumers. Unfortunately, spammers often take
          advantage of online reviews by writing fake reviews to promote/demote
          certain products. Most of the previous studies have focused on
          detecting fake reviews and individual fake reviewer-ids. However, to
          target a particular product, fake reviewers work collaboratively in
          groups and/or create multiple fake ids to write reviews and control
          the sentiments of the product. This work addresses the problem of
          detecting such fake reviewer groups.
        </p>
        <p className="text-sm text-justify p-4">
          We proposed a top-down framework for candidate fake reviewer groups’
          detection based on the DeepWalk approach on reviewers’ graph data and
          a (modified) semisupervised clustering method, which can incorporate
          partial background knowledge. Our experimental results demonstrated
          that the proposed approach is able to identify the candidate spammer
          groups with reasonable accuracy. This approach can also be extended to
          detect groups of opinion spammers in social media (e.g. fake comments
          or fake postings) with temporal affinity, semantic characteristics,
          and sentiment analysis.
        </p>
        <div className="flex mt-14 sm:flex-col">
          <Image src={fake_review} alt="" className="rounded-[10px] mr-6 w-[60%] sm:w-full sm:mb-8" />
          <ul className="list-disc leading-5 font-semibold text-justify ml-20 w-[30%] sm:w-full sm:ml-0">
            Research Outcome:
            <li className="text-xs">
              Rathore, P., Soni, J., Prabakar, N., Palaniswami, M., Santi. P.
              (2021). Identifying Groups of Fake Reviewers Using a
              Semi-supervised Approach. IEEE Transactions on Computational
              Social Systems. (Early Access)
            </li>
          </ul>
        </div>
      </div>{" "}
    </div>
  );
}
