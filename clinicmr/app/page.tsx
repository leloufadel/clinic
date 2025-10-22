"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
import About from "@/components/about";
import Services from "@/components/services";
import Team from "@/components/team";
import Reason from "@/components/reason";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
export default function Home() {

  return (
    <div className="min-h-screen bg-white">
    <Header />

      {/* Hero Section */}
    <Hero />

      {/* Quick Features */}
    <Feature />

      {/* About Section */}
      <About />

      {/* Services Section */}
    <Services />

      {/* Medical Team Section */}
    <Team />

      {/* Why Choose Us Section */}
    <Reason />

      {/* Contact Section */}
    <Contact />

      {/* Footer */}
    <Footer />

      {/* Floating WhatsApp Button */}
      <a 
        href="#contact"
        className="fixed bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition-transform z-40"
        aria-label="Contact us"
      >
        💬
      </a>
    </div>
  );
}
