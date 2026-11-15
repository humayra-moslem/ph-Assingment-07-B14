
import Link from "next/link";
import { notFound } from "next/navigation";
;
import {
  ArrowDown,
  ArrowUp,
  Minus,
  TrendingUp,
  TrendingDown,
  MapPin,
  CalendarDays,
  Package,
} from "lucide-react";
import { IProduct } from "@/app/types";



// Format price
const formatPrice = (price: number) => {
  return `${price.toLocaleString("bn-BD")} টাকা`;
};

// Fetch product by slug
async function getProduct(slug: string): Promise<IProduct | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  const products: IProduct[] = Array.isArray(result)
    ? result
    : result.data ?? [];

  return products.find((product) => product.slug === slug) || null;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Group markets by division
  const marketsByDivision = (product.markets ?? []).reduce(
    (acc, market) => {
      if (!acc[market.division]) {
        acc[market.division] = [];
      }

      acc[market.division].push(market);

      return acc;
    },
    {} as Record<string, typeof product.markets>
  );

  // Calculate price statistics
  const markets = product.markets ?? [];

  const allMins = markets.map((market) => market.min);
  const allMaxs = markets.map((market) => market.max);

  const minPrice =
    allMins.length > 0 ? Math.min(...allMins) : 0;

  const maxPrice =
    allMaxs.length > 0 ? Math.max(...allMaxs) : 0;

  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (sum, market) => sum + (market.min + market.max) / 2,
            0
          ) / markets.length
        )
      : 0;

  // Price change badge
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeStyle = isUp
    ? "badge-error"
    : isDown
      ? "badge-success"
      : "badge-ghost";

  const ChangeIcon = isUp
    ? ArrowUp
    : isDown
      ? ArrowDown
      : Minus;

  return (
    <main className="min-h-screen bg-[#f0f5f0] py-8 sm:py-10">
      <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6">

        {/* 1. Breadcrumb */}
        <div className="breadcrumbs text-sm text-slate-500">
          <ul>
            <li>
              <Link href="/" className="hover:text-emerald-600">
                হোম
              </Link>
            </li>

            <li>
              <Link
                href={`/category/${product.category}`}
                className="hover:text-emerald-600"
              >
                {product.categoryNameBn}
              </Link>
            </li>

            <li className="font-semibold text-slate-900">
              {product.nameBn}
            </li>
          </ul>
        </div>

        {/* 2. Product Summary Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* Product Icon */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f1f5f1] text-5xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            {/* Product Information */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <span className={`badge ${changeStyle} gap-1 font-bold`}>
                  <ChangeIcon size={13} />
                  {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {product.categoryNameBn} · প্রতি {product.unit}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge badge-outline badge-success">
                  {product.categoryNameBn}
                </span>

                <span className="badge badge-outline">
                  প্রতি {product.unit}
                </span>

                <span className={`badge ${changeStyle}`}>
                  {isUp
                    ? "দাম বেড়েছে"
                    : isDown
                      ? "দাম কমেছে"
                      : "দাম অপরিবর্তিত"}
                </span>
              </div>
            </div>

            {/* Today's Price */}
            <div className="rounded-xl bg-[#f0fdf4] p-4 sm:min-w-44">
              <p className="text-sm font-medium text-slate-500">
                আজকের দাম
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-emerald-700">
                {formatPrice(product.today)}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                প্রতি {product.unit}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Price Statistics */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              মূল্য পরিসংখ্যান
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              বিভিন্ন বাজারের দামের সারসংক্ষেপ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Minimum Price */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  সর্বনিম্ন দাম
                </p>
                <ArrowDown className="text-emerald-600" size={20} />
              </div>

              <h3 className="mt-3 text-2xl font-extrabold text-emerald-600">
                {formatPrice(minPrice)}
              </h3>
            </div>

            {/* Maximum Price */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  সর্বোচ্চ দাম
                </p>
                <ArrowUp className="text-red-500" size={20} />
              </div>

              <h3 className="mt-3 text-2xl font-extrabold text-red-500">
                {formatPrice(maxPrice)}
              </h3>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  গড় দাম
                </p>
                <TrendingUp className="text-blue-600" size={20} />
              </div>

              <h3 className="mt-3 text-2xl font-extrabold text-blue-600">
                {formatPrice(avgPrice)}
              </h3>
            </div>

            {/* Today's Price */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  আজকের দাম
                </p>
                <Package className="text-violet-600" size={20} />
              </div>

              <h3 className="mt-3 text-2xl font-extrabold text-violet-600">
                {formatPrice(product.today)}
              </h3>
            </div>
          </div>
        </section>

        {/* 4. Market-wise Prices */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              বাজারভিত্তিক মূল্য
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              বিভাগ অনুযায়ী বিভিন্ন বাজারের দামের তালিকা
            </p>
          </div>

          {Object.keys(marketsByDivision).length > 0 ? (
            Object.entries(marketsByDivision).map(
              ([division, divisionMarkets]) => (
                <div
                  key={division}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  {/* Division Header */}
                  <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-4">
                    <MapPin size={18} className="text-emerald-600" />

                    <h3 className="font-bold text-slate-800">
                      {division}
                    </h3>

                    <span className="badge badge-sm badge-ghost">
                      {divisionMarkets.length.toLocaleString("bn-BD")}টি বাজার
                    </span>
                  </div>

                  {/* Market Table */}
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr className="text-slate-500">
                          <th>বাজারের নাম</th>
                          <th>সর্বনিম্ন দাম</th>
                          <th>সর্বোচ্চ দাম</th>
                        </tr>
                      </thead>

                      <tbody>
                        {divisionMarkets.map((market, index) => (
                          <tr key={`${market.market}-${index}`}>
                            <td className="font-semibold text-slate-800">
                              {market.market}
                            </td>

                            <td className="font-bold text-emerald-600">
                              {formatPrice(market.min)}
                            </td>

                            <td className="font-bold text-red-500">
                              {formatPrice(market.max)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500">
              বাজারের কোনো তথ্য পাওয়া যায়নি।
            </div>
          )}
        </section>

        {/* 5. Historical Comparison */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              ঐতিহাসিক মূল্য তুলনা
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              বিভিন্ন সময়ের পণ্যের দামের তুলনা
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-slate-500">
                    <th>
                      <CalendarDays size={16} className="inline mr-1" />
                      সময়
                    </th>
                    <th>দাম</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="font-semibold">আজকের দাম</td>
                    <td className="font-bold text-emerald-600">
                      {formatPrice(product.today)}
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold">গতকালের দাম</td>
                    <td className="font-bold">
                      {formatPrice(product.yesterday)}
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold">গত সপ্তাহের দাম</td>
                    <td className="font-bold">
                      {formatPrice(product.lastWeek)}
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold">গত মাসের দাম</td>
                    <td className="font-bold">
                      {formatPrice(product.lastMonth)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
