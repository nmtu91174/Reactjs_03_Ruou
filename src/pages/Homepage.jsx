import HeroSection from "../components/HeroSection";
import SectionFour from "../components/SectionFour";
import SectionThree from "../components/SectionThree";
import SectionTwo from "../components/SectionTwo";

export default function Homepage() {
  return (
    <>
      <section>
        <HeroSection />
      </section>

      <section>
        <SectionTwo />
      </section>

      <section>
        <SectionThree />
      </section>

      <section>
        <SectionFour />
      </section>
    </>
  );
}

