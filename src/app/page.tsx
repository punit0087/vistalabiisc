import Section1 from "@/components/ui/section1";
import { EvervaultCards } from "@/components/routes/EvervaultCard";
import Loading from "@/components/loader/loader";
import Section3 from "@/components/ui/section3";
import Footer from "@/components/ui/footer";
import ScrollButton from "@/components/ui/ScrollButton";

export default function Home() {
  return (
    <main>
      {/* <Loading />  */}
      <ScrollButton />
      <Section1 />
      <EvervaultCards />
      <Section3 />
      <Footer />
    </main>
  );
}






