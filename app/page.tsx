import Hero from "./components/Hero";
import KeyFeatures from "./components/KeyFeatures";

import UsersTestimonials from "./components/UsersTestimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();
  console.log("User:", user);
  return (
    <>
      <Header />
      <main className="w-full">
        <Hero />
        <p>
          Welcome to WorkoutHub!{" "}
          {user ? `Hello, ${user.name}!` : "Welcome, Guest!"}
        </p>
        <KeyFeatures />
        <UsersTestimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
