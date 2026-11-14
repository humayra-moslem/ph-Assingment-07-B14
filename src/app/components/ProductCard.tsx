
"use client";

import Link from "next/link";


import { IProduct } from "../types";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({
  product,
}: {
  product: IProduct;
}) {
  const changeBadge =
    product.change.dir === "up"
      ? {
          className: "badge-error",
          icon: "▲",
        }
      : product.change.dir === "down"
        ? {
            className: "badge-success",
            icon: "▼",
          }
        : {
            className: "badge-ghost",
            icon: "—",
          };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block h-full group"
    >
      <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 h-full">

        <div className="card-body p-5">

          {/* Header */}
          <div className="flex items-start justify-between gap-3">

            <div className="flex items-center gap-3">

              {/* Emoji */}
              <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-2xl shrink-0">
                {product.image}
              </div>

              {/* Product Name */}
              <div>
                <h3 className="font-bold text-base-content text-lg group-hover:text-primary transition-colors">
                  {product.nameBn}
                </h3>

                <p className="text-sm text-base-content/60">
                  {product.unit}
                </p>
              </div>

            </div>

            {/* Change Badge */}
            <span
              className={`badge ${changeBadge.className} badge-sm font-bold`}
            >
              {changeBadge.icon}{" "}
              {Math.abs(product.change.pct).toFixed(1)}%
            </span>

          </div>

          {/* Divider */}
          <div className="divider my-1"></div>

          {/* Today's Price */}
          <div>
            <p className="text-sm text-base-content/60 mb-1">
              আজকের দাম
            </p>

            <p className="text-2xl font-extrabold text-base-content">
              {formatPrice(product.today)}
              <span className="text-sm font-medium text-base-content/60 ml-1">
                / {product.unit}
              </span>
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
}
