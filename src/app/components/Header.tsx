// "use client";
// import Image from "next/image";

// // const Header = () => {
// //   const date = new Date().toLocaleDateString("bn-BD", {
// //     dateStyle: "full",
// //   });

// import NavLinks from "./NavLinks";

// const Header = () => {
//     const date = new Date().toLocaleDateString("bn-BD", {
//     dateStyle: "full",
//   });

//   return (
//     <header className="flex flex-col items-center gap-2">
//       <div className="flex justify-center gap-2">
//         <div>
//           <Image
//             className="w-10 h-10"
//             src={"/logo-icon.png"}
//             width={30}
//             height={40}
//             alt="logo"
//           />
//         </div>

//         <div>
//           <div className="font-bold">বাজার দর </div>
//           <div>
//             <span>{date}</span>
//           </div>
//         </div>
//       </div>
//       <NavLinks />
//     </header>
//   );
// };

// export default Header;

// import Image from "next/image";
// import NavLinks from "./NavLinks";

// const Header = () => {
//   const now = new Date();
//   const date = new Intl.DateTimeFormat("bn-BD", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(now);

//   return (
//     <header className="relative mx-auto max-w-7xl px-4 py-4">
//       <div className="flex flex-col items-center justify-start gap-1 sm:flex-row sm:gap-2">
//         <Image
//           src="/logo-icon.png"
//           alt="Bazar dor"
//           width={40}
//           height={40}
//           priority
//         />
//         <div className="flex flex-col items-center sm:items-start">
//           <span className="text-2xl font-bold text-red-700">বাজার দর</span>
//           <span className="text-[11px] text-slate-500 font-mediu">{date}</span>
//         </div>
//       </div>

//       <NavLinks />
//     </header>
//   );
// };

// export default Header;

import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

const Header = () => {
  const now = new Date();

  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return (
    <header className="w-full bg-[#fbfcfa] border-b border-gray-100">
      {/* Main Header */}
      <div className="max-w-5xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo and Website Name */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor"
              width={32}
              height={32}
              priority
            />

            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800 leading-tight">
                বাজার দর
              </span>

              <span className="text-[10px] text-gray-500 font-medium">
                {date}
              </span>
            </div>
          </Link>

          {/* Authentication Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-700 hover:text-green-700 transition"
            >
              সাইন ইন
            </Link>

            <Link
              href="/sign-up"
              className="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded-md shadow-sm transition"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <NavLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
