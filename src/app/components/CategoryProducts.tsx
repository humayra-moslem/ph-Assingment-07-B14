
"use client";


import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "../types";

const CategoryProducts = ({
  products,
}: {
  products: IProduct[];
}) => {
  const [sortBy, setSortBy] = useState<string>("default");

  const sortedProducts = [...products];

  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div>
      {/* Sort Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          মোট{" "}
          <span className="font-bold text-slate-900">
            {products.length.toLocaleString("bn-BD")}টি
          </span>{" "}
          পণ্যের তালিকা
        </p>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600">
            <ArrowUpDown size={14} className="text-emerald-600" />
            <span>সাজান:</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম (কম থেকে বেশি)</option>
            <option value="price-desc">দাম (বেশি থেকে কম)</option>
          </select>
        </div>
      </div>

      {/* Products */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center mt-4">
          <p className="text-slate-500 font-medium">
            এই ক্যাটাগরিতে কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
