import Hero from "@/components/sections/Hero";
import TypeDrop3D from "@/components/sections/TypeDrop3D";
import SocialProof from "@/components/sections/SocialProof";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <TypeDrop3D />
      <SocialProof />
      <Services />
      <FeaturedWork />
      <Process />
      <WhyUs />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
