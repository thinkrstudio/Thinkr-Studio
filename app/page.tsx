import Hero from "@/components/sections/Hero";
import TypeDrop3D from "@/components/sections/TypeDrop3D";
import FeaturedClients from "@/components/sections/FeaturedClients";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
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
      <FeaturedWork />
      <TypeDrop3D />
      <FeaturedClients />
      <Services />
      <TechStack />
      <Process />
      <WhyUs />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
