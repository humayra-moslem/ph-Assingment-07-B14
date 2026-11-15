

"use client";

import React, { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { TrendingDown } from "lucide-react";

import { IProduct } from "../types";
import ProductCard from "./ProductCard";

export default function PriceFallers() {
  const [topDecreasedProducts, setTopDecreasedProducts] =
    useState<IProduct[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: IProduct[] = await res.json();

        const filteredAndSorted = data
          .filter((item) => item.change.dir === "down")
          .sort((a, b) => a.change.pct - b.change.pct)
          .slice(0, 6);

        setTopDecreasedProducts(filteredAndSorted);
      } catch (error) {
        console.error("Error loading price decrease data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full py-12 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-7">

          <div className="flex flex-col items-start gap-2">

            {/* Top Badge */}
            <Chip
              size="sm"
              className="px-3 py-1 h-auto rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center gap-1.5"
            >
              <TrendingDown size={14} className="shrink-0" />
              <span>সাশ্রয়ী সুযোগ</span>
            </Chip>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>আজ যেসব পণ্যের দাম কমেছে</span>
              <span className="text-emerald-500 text-xl sm:text-2xl">
                ▼
              </span>
            </h2>

            {/* Subtitle */}
            {/* <p className="text-xs sm:text-sm text-slate-500 font-medium">
              আজ যেসব পণ্যের দাম কমেছে — সাশ্রয়ী দামে বাজার করুন
              (শীর্ষ ৬টি পণ্য)
            </p> */}

          </div>

          {/* Sort Info */}
          {/* <span className="text-xs text-slate-400 font-medium">
            সর্বোচ্চ হ্রাস অনুযায়ী সাজানো
          </span> */}

        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 rounded-3xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : topDecreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topDecreasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-slate-500">
            বর্তমানে দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}

      </div>
    </section>
  );
}
