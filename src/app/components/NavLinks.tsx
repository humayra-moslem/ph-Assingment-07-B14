// const NavLinks = async () => {
//   const res = await fetch(
//     "https://openapi.programming-hero.com/api/bazardor/categories"
//   );
//   const data = await res.json();
//   const navs = data.data;
//   console.log(navs);
//   return <div>

//   </div>;
// };

// export default NavLinks;

// import Link from "next/link";

// import { Category } from "../types";

// const NavLinks = async () => {
//   const res = await fetch(
//     "https://openapi.programming-hero.com/api/bazardor/categories",
//   );
//   const data = await res.json();
//   const navs: Category[] = data;

//   return (
//     <div className="flex gap-2 justify-start mt-5">
//       {navs.map((n, i) => (
//         <Link key={i} href={`${n.id}`}>
//           <span>{n.icon}</span>
//           <span>{n.nameBn}</span>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default NavLinks;


import Link from "next/link";
import { Category } from "../types";

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: Category[] = await res.json();

  return (
    <nav className="flex items-center justify-start gap-6 py-3 overflow-x-auto whitespace-nowrap scrollbar-auto">

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
  );
};

export default NavLinks;
