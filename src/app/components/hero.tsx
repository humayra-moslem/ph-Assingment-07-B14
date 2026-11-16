
"use client";


import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
  ArrowRight,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const HeroSection = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="px-4 pt-5 pb-3">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-green-100 bg-[#f8fbf8] px-6 py-8 md:px-12 md:py-10">

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">

            {/* Left Content */}
            <div className="space-y-5">

              {/* Date Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <CalendarDays size={14} />
                {date}
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  আজকের বাজারের দাম{" "}
                  <span className="text-green-700">
                    এক নজরে
                  </span>
                </h1>

                <p className="max-w-lg text-sm md:text-base leading-7 text-gray-500">
                  চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                  বাজারদরভিত্তিক বিস্তারিত, দ্রুত, সর্বশেষ-সর্বাধিক
                  হালনাগাদ বাজারের পরিবর্তন এক জায়গায়।
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href={"/#all-products"}>
                  <Button className="bg-green-700 text-white font-semibold px-6 shadow-md hover:bg-green-800">
                    <span className="flex items-center gap-2">
                      <span>সব পণ্য দেখুন</span>
                      <ArrowRight size={17} />
                    </span>
                  </Button>
                </Link>

                <div className="hidden sm:flex items-center gap-2 text-sm text-green-700">
                  <TrendingUp size={18} />
                  <span>প্রতিদিন আপডেট</span>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center md:justify-end">
              <Image src ="/bazar-hero.png" width ={300} height = {150} alt ='bazar logo'
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
