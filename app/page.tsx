import React from "react";
import Hero from "@/app/components/hero";
import Dashboard from "@/app/components/dashbord";
import Header from "@/app/components/Header";

const page = () => {
  return (
    <div className="w-[90%] max-w-7xl mx-auto p-8">
      <Header />
      <Hero />
      <Dashboard />
    </div>
  );
};

export default page;
