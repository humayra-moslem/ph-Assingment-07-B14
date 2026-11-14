// import { IProduct } from "../types";
// import ProductCard from "./ProductCard";

// export default function AllProducts({ products }: { products: IProduct[] });
// const [products, setProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState(true);
// useEffect(() => {
//   const fetchAllProducts = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_APP_URL}/api/products`,
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch products");
//       }

//       const data: IProduct[] = await res.json();

//       setProducts(data);
//     } catch (error) {
//       console.error("Error loading products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchAllProducts();
// }, []);
// {
//   return (
//     <section id="সব-পণ্য" className="py-12 scroll-mt-24">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold">🛒 সকল পণ্য</h2>

//         <p className="text-sm text-base-content/60 mt-1">
//           বাজারের সকল পণ্যের বর্তমান দাম দেখুন
//         </p>
//       </div>

//       {products.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center py-10 text-base-content/50">
//           কোনো পণ্য পাওয়া যায়নি।
//         </p>
//       )}
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { IProduct } from "../types";
import ProductCard from "./ProductCard";

export default function AllProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/products`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: IProduct[] = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <section id ="all-products" className="py-12 scroll-mt-24">
       <div className="max-w-5xl mx-auto px-4 sm:px-6"> 
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          🛒 সকল পণ্য
        </h2>

        <p className="text-sm text-base-content/60 mt-1">
          বাজারের সকল পণ্যের বর্তমান দাম দেখুন
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-52 rounded-2xl bg-base-300 animate-pulse"
            />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-base-content/50">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
      </div>
    </section>
  );
}
