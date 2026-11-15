
"use client";

import { useEffect, useState } from "react";
import { IProduct } from "../types";
import { formatPrice } from "@/lib/utils";



const ProductTicker = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/products`);
        

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();

        // API response array অথবা { data: [] } — দুটোই support করবে
        const data: IProduct[] = Array.isArray(result)
          ? result
          : result.data ?? [];

        setProducts(data);
      } catch (error) {
        console.error("Error fetching ticker products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-10 bg-white border-y border-slate-200 flex items-center px-4">
        <div className="skeleton h-4 w-40" />
      </div>
    );
  }

  if (products.length === 0) return null;

  // Infinite scroll: Repeat products twice
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full overflow-hidden bg-white border-y border-slate-200">

      <div className="flex items-center">

        
        

        {/* Scrolling Ticker */}
        <div className="flex-1 overflow-hidden">

          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">

            {tickerItems.map((product, index) => {
              const isUp = product.change.dir === "up";
              const isDown = product.change.dir === "down";

              const color = isUp
                ? "text-red-600"
                : isDown
                  ? "text-green-600"
                  : "text-slate-500";

              const icon = isUp ? "▲" : isDown ? "▼" : "—";

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 border-r border-slate-100 shrink-0"
                >
                  {/* Product Name */}
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    {product.nameBn}
                  </span>

                  {/* Price */}
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {formatPrice(product.today)}
                  </span>

                  {/* Price Change */}
                  <span className={`text-xs font-bold ${color}`}>
                    {icon} {Math.abs(product.change.pct).toFixed(1)}%
                  </span>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTicker;
