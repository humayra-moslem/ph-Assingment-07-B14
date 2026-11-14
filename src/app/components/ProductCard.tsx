
import Link from "next/link";
import { IProduct } from "../types";
import { formatPrice } from "@/lib/utils";



export default function ProductCard({
  product,
}: {
  product: IProduct;
}) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const badgeStyle = isUp
    ? "badge-error"
    : isDown
      ? "badge-success"
      : "badge-ghost";

  const badgeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block h-full group"
    >
      <div className="card h-full bg-base-100 border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">

        <div className="card-body p-5">

          {/* Header */}
          <div className="flex items-start justify-between gap-3">

            <div className="flex items-center gap-3">

              {/* Product Emoji */}
              <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-3xl shrink-0">
                {product.image || "🛒"}
              </div>

              {/* Product Name & Unit */}
              <div className="min-w-0">
                <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors">
                  {product.nameBn}
                </h3>

                <p className="text-sm text-base-content/60 mt-1">
                  {product.unit}
                </p>
              </div>

            </div>

            {/* Price Change Badge */}
            <span
              className={`badge ${badgeStyle} badge-sm font-bold shrink-0`}
            >
              {badgeIcon}{" "}
              {Math.abs(product.change.pct).toFixed(1)}%
            </span>

          </div>

          <div className="divider my-1"></div>

          {/* Today's Price */}
          <div className="flex items-end justify-between">

            <div>
              <p className="text-sm text-base-content/60 mb-1">
                আজকের দাম
              </p>

              <p className="text-2xl font-extrabold text-base-content">
                {formatPrice(product.today)}
              </p>

              <p className="text-xs text-base-content/50 mt-1">
                প্রতি {product.today}
              </p>
            </div>

            {/* View Details */}
            <div className="btn btn-circle btn-ghost btn-sm group-hover:btn-primary transition-colors">
              →
            </div>

          </div>

        </div>
      </div>
    </Link>
  );
}
