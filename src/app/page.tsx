import Section1 from "@/components/ui/section1";
import Section2 from "@/components/ui/section2";
import Section3 from "@/components/ui/section3";
import Footer from "@/components/ui/footer";
import ScrollButton from "@/components/ui/ScrollButton";

export default function Home() {
  return (
    <main>
      {/* <Loading />  */}
      <ScrollButton />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </main>
  );
}
