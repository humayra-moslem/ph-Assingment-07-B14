import CategoryProducts from "@/app/components/CategoryProducts";
import { ICategory, IProduct } from "@/app/types";
// import { notFound } from "next/navigation";



const CategoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Fetch category products
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/products?category=${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // API directly returns an array
  const products: IProduct[] = await res.json();

  // Fetch category details
  let category: ICategory | null = null;

  try {
    const resCat = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/categories/${slug}`, {
      cache: "no-store",
    });

    if (resCat.ok) {
      const categoryData = await resCat.json();
      category = categoryData.data ?? categoryData;
    }
  } catch (error) {
    console.error("Category details fetch error:", error);
  }

  // Category not found
  // if (products.length === 0 && !category) {
  //   notFound();
  // }

  // Fallback values from product data
  const categoryName = category?.nameBn || products[0]?.categoryNameBn || slug;

  const categoryIcon = category?.icon || products[0]?.categoryIcon || "🛒";

  const categoryDescription =
    category?.id || "এই ক্যাটাগরির সকল পণ্যের আজকের দাম ও পরিবর্তন";

  return (
    <main className="min-h-screen w-full py-8 sm:py-10 bg-[#f0f5f0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Category Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 flex items-center gap-4 sm:gap-6">
          {/* Category Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f1f5f1] border border-slate-200/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {categoryIcon}
          </div>

          {/* Category Information */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {categoryName}
              </h1>

              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
                মোট পণ্য: {products.length.toLocaleString("bn-BD")}টি
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {categoryDescription}
            </p>
          </div>
        </div>

        {/* Category Products */}
        <CategoryProducts products={products} />
      </div>
    </main>
  );
};

export default CategoryDetailsPage;
