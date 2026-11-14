
import { IProduct } from "../types";
import ProductCard from "./ProductCard";

export default function PriceFallers({
  products,
}: {
  products: IProduct[];
}) {
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          🔻 যেসব পণ্যের দাম কমেছে
        </h2>
        <p className="text-sm text-base-content/60 mt-1">
          সবচেয়ে বেশি দাম কমেছে এমন ৬টি পণ্য
        </p>
      </div>

      {fallers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fallers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-base-content/50">
          দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}