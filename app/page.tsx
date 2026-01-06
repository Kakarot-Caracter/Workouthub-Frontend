import Hero from "./components/Hero";
import KeyFeatures from "./components/KeyFeatures";

import UsersTestimonials from "./components/UsersTestimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import { Header } from "./components/Header";

export default async function Home() {
  return (
    <>
      <Header />
      <main className="w-full">
        <Hero />
        <KeyFeatures />
        <UsersTestimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
