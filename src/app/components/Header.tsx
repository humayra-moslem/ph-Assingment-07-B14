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

import Image from "next/image";
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
    <header className="relative mx-auto max-w-7xl px-4 py-4">
      <div className="flex flex-col items-center justify-start gap-1 sm:flex-row sm:gap-2">
        <Image
          src="/logo-icon.png"
          alt="Bazar dor"
          width={40}
          height={40}
          priority
        />
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-2xl font-bold text-red-700">বাজার দর</span>
          <span className="text-[11px] text-slate-500 font-mediu">{date}</span>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
