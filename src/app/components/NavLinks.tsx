


import Link from "next/link";
import { ICategory } from "../types";
import ProductTicker from "./ProductTicker";


const NavLinks = async () => {
  const res = await fetch(
    
    `${process.env.NEXT_PUBLIC_APP_URL}/categories`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: ICategory[] = await res.json();

  return (
    
    <div className="border-t border-gray-100">
    <div className="max-w-5xl mx-auto px-4">
    <nav className="  flex items-center justify-start gap-6 py-3 overflow-x-auto whitespace-nowrap scrollbar-auto">

      {navs.map((n) => (
        <Link
          key={n.id}
          href={`/category/${n.id}`}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-700  duration-200 shrink-0 px-3 py-2 rounded-md hover:bg-green-100 hover:text-green-700 transition"
        >
          <span>{n.icon}</span>

          <span>{n.nameBn}</span>
        </Link>
      ))}

    </nav>
    </div>
    </div>
    
  );
};

export default NavLinks;
