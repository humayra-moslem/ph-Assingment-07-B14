import Link from "next/link";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

import { Product } from "../types";

const Marquee = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products?category=chal")
    const data = await res.json() 
    const product:Product[] = data
    return (
        <div className="bg-red-700 text-white">

            <div className="flex max-w-7xl mx-auto">
                

            <MarqueeText className="py-1" direction="right" duration={10}>
            
            {product.map(h => <Link className="hover:underline" href={`${h.id}`} key={h.id}>
                <span>{h.nameBn}</span>
                <span className="mx-5">•</span>
            </Link>)}

            </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;