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

import Link from "next/link";

import { Category } from "../types";

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data = await res.json();
  const navs: Category[] = data;

  return (
    <div className="flex gap-2 justify-start mt-5">
      {navs.map((n, i) => (
        <Link key={i} href={`${n.id}`}>
          <span>{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
