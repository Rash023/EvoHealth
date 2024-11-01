import React from "react";
import { Navbar } from "@/components/Home/Navbar";
import { Hero } from "@/components/Home/Hero";
import Footer from "@/components/Home/Footer";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const Landing: React.FC = () => {
  return (
    <>
      <div className="rounded-md md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden w-full dark:bg-zinc-900 bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.5] items-center justify-center bg-fixed">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_bottom,transparent_40%,black)]"></div>
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <div
          id="top"
          className="p-4 max-w-7xl mx-auto relative z-20 w-full pt-20 md:pt-0 flex flex-col items-center md:mt-24 mt-14"
        >
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block mb-8 md:mt-10">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full dark:bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 bg-white text-zinc-800 dark:text-white">
              <span>Connect | Collaborate | Create</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
          <h1 className="text-4xl md:text-8xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            EvoHealth
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-xl text-center mx-auto bg-clip-text text-transparent dark:bg-white bg-black from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Where Evolution Meets Health ! Your ultimate wellness companion, offering personalized insights, nutrition tips, and support for every step of your health journey. Dive into our blog for fresh wellness tips and start your path to a healthier, happier you with EvoHealth!
          </p>
          <div className="mt-8">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              <span>Continue</span>
            </HoverBorderGradient>
          </div>
        </div>
        <div className="mt-10 p-10" id="features">
          <Hero />
        </div>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 p-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white mb-10">
          Bridge Healthcare Gaps <br /> at EvoHealth
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
