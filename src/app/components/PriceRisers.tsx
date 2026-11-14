"use client";


import { Chip } from "@heroui/react";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { IProduct } from "../types";
import ProductCard from "./ProductCard";

const PriceRiserSection = () => {
  const [topIncreasedProducts, setTopIncreasedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: IProduct[] = await res.json();

        const filteredData = data
          .filter((item) => item.change.dir === "up")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);

        setTopIncreasedProducts(filteredData);
      } catch (error) {
        console.error("Error fetching increased products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full py-12 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-7">
          <div className="flex flex-col items-start gap-2">
            <Chip
              size="sm"
              className="px-3 py-1 h-auto rounded-full bg-[#ffe4e6] text-[#e11d48] font-bold text-xs flex items-center gap-1.5"
            >
              <TrendingUp size={14} className="shrink-0" />
              <span>মূল্য বৃদ্ধি</span>
            </Chip>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>আজ যেসব পণ্যের দাম বেড়েছে</span>
              <span className="text-[#ef4444] text-xl sm:text-2xl">▲</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              আজ যেসব পণ্যের দাম সর্বোচ্চ বৃদ্ধি পেয়েছে (শীর্ষ ৬টি পণ্য)
            </p>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            সর্বোচ্চ থেকে ক্রমানুসারে সাজানো
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 rounded-3xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : topIncreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topIncreasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-slate-500">
            বর্তমানে দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
};

export default PriceRiserSection;