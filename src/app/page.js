import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

import MyUser from "@/context/userContext";




export default function Home() {
  return (
    <>
          <MyUser>
          <Navbar />
          <Hero />
        </MyUser>
      
    </>


  );
}
