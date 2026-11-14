// import Link from "next/link";
// import MarqueeText from "react-marquee-text"
// import "react-marquee-text/dist/styles.css"

// import { Product } from "../types";

// const Marquee = async () => {
//     const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products?category=chal")
//     const data = await res.json() 
//     const product:Product[] = data
//     return (
//         <div className="bg-red-700 text-white">

//             <div className="flex max-w-7xl mx-auto">
                

//             <MarqueeText className="py-1" direction="right" duration={10}>
            
//             {product.map(h => <Link className="hover:underline" href={`${h.id}`} key={h.id}>
//                 <span>{h.nameBn}</span>
//                 <span className="font-bold text-white">{item.price}</span>
//                 <span
//                   className={`font-black text-[10px] px-1.5 py-0.5 rounded ${
//                     h.change.dir
//                       ? 'bg-teal-950/80 text-teal-400 border border-teal-800/60'
//                       : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
//                   }`}
//                 >
//                   {h. ? '▲' : '▼'} {item.change}
//                 </span>
//                 <span className="mx-5">•</span>
//             </Link>)}

//             </MarqueeText>
//             </div>
//         </div>
//     );
// };

// export default Marquee;



import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { IProduct } from "../types";



const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products?category=chal"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: IProduct[] = await res.json();

  return (
    <div className="bg-white border-y border-gray-100 text-gray-700">
      <div className="max-w-auto   flex items-center">

        <MarqueeText
          className="py-2"
          direction="right"
          duration={20}
        >
          {products.map((h) => (
            <Link
              key={h.id}
              href={`/product/${h.slug}`}
              className="inline-flex items-center gap-2 mx-5 whitespace-nowrap hover:underline"
            >
              {/* Product emoji */}
              <span>{h.image}</span>

              {/* Product name */}
              <span className="font-medium text-sm">
                {h.nameBn}
              </span>

              {/* Today's price */}
              <span className="text-sm font-semibold">
                {h.today.toLocaleString("bn-BD")} টাকা/কেজি
              </span>

              {/* Price change */}
              <span
                className={`font-bold text-xs ${
                  h.change.dir === "up"
                    ? "text-red-500"
                    : h.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {h.change.dir === "up"
                  ? "▲"
                  : h.change.dir === "down"
                  ? "▼"
                  : "—"}

                {" "}
                {Math.abs(h.change.pct).toLocaleString("bn-BD", {
                  maximumFractionDigits: 1,
                })}%
              </span>

              <span className="text-gray-300 mx-2">|</span>
            </Link>
          ))}
        </MarqueeText>

      </div>
    </div>
  );
};

export default Marquee;
