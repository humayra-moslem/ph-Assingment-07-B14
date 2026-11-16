


// "use client";

// import Image from "next/image";
// import Link from "next/link";

// import { signOut, useSession } from "@/lib/auth-client";

// const Header = () => {
//   const now = new Date();

//   const date = new Intl.DateTimeFormat("bn-BD", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(now);

//   const { data, isPending } = useSession();

//   const handleSignOut = async () => {
//     await signOut();
//   };

//   return (
//     <header className="w-full bg-[#fbfcfa] border-b border-gray-100">
//       {/* Main Header */}
//       <div className="max-w-5xl mx-auto px-4 py-2">
//         <div className="flex items-center justify-between">

//           {/* Logo and Website Name */}
//           <Link href="/" className="flex items-center gap-2">
//             <Image
//               src="/logo-icon.png"
//               alt="Bazar Dor"
//               width={32}
//               height={32}
//               priority
//             />

//             <div className="flex flex-col">
//               <span className="text-lg font-bold text-gray-800 leading-tight">
//                 বাজার দর
//               </span>

//               <span className="text-[10px] text-gray-500 font-medium">
//                 {date}
//               </span>
//             </div>
//           </Link>

//           {/* Authentication Section */}
//           <div className="flex items-center gap-3">

//             {isPending ? (
//               <span className="text-sm text-gray-500">
//                 Loading...
//               </span>
//             ) : data?.user ? (
//               <div className="relative group">
//                 <button
//                   className="flex items-center gap-2 rounded-full border border-gray-200 p-1 hover:bg-gray-100"
//                   type="button"
//                 >
//                   <Image
//                     src={
//                       data.user.image ||
//                       "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
//                     }
//                     alt={data.user.name || "User"}
//                     width={32}
//                     height={32}
//                     className="rounded-full"
//                   />

//                   <span className="text-sm font-medium text-gray-700 pr-2">
//                     {data.user.name}
//                   </span>
//                 </button>

//                 {/* Dropdown Menu */}
//                 <div className="absolute right-0 top-full z-50 hidden w-48 rounded-md border border-gray-200 bg-white py-2 shadow-lg group-hover:block">

//                   <Link
//                     href="/profile"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     প্রোফাইল
//                   </Link>

//                   <Link
//                     href="/profile/update-profile"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     আপডেট প্রোফাইল
//                   </Link>

//                   <button
//                     onClick={handleSignOut}
//                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
//                   >
//                     সাইন আউট
//                   </button>

//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <Link
//                   href="/sign-in"
//                   className="text-sm font-medium text-gray-700 hover:text-green-700 transition"
//                 >
//                   সাইন ইন
//                 </Link>

//                 <Link
//                   href="/sign-up"
//                   className="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded-md shadow-sm transition"
//                 >
//                   সাইন আপ
//                 </Link>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>

      
//     </header>
//   );
// };

// export default Header;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  ProgressCircle,
  Separator,
} from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { signOut, useSession } from "@/lib/auth-client";
import { ICategory } from "../types";





export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });



  // Feature 1: Categories fetch
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json = await res.json();
        // API সরাসরি array অথবা { data: [...] } দুটোই handle করা হয়েছে
        setCategories(Array.isArray(json) ? json : json?.data ?? []);
      } catch (error) {
        console.error(error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Feature 3: Auth state
  const { data: session, isPending } = useSession();

  // Feature 4: Sign out
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল!");
          router.push("/");
        },
      },
    });
  };

  const handleMenuAction = (key: React.Key) => {
    if (key === "profile") router.push("/profile");
    else if (key === "update-profile") router.push("/profile/update-profile");
    else if (key === "sign-out") handleSignOut();
  };

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Row: Brand & Auth */}
        <div className="flex items-center justify-between py-3.5">
          <div className="flex flex-col gap-1">
            
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
                {formattedDate}
              </span>
            </div>
          </Link>


            
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <ProgressCircle aria-label="Loading" isIndeterminate size="sm">
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
            ) : session?.user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm font-semibold text-slate-700">
                  {session.user.name}
                </span>
                <Dropdown>
                  <Button isIconOnly aria-label="Menu" variant="secondary">
                    <Avatar>
                      <Avatar.Image
                        alt={session.user.name}
                        src={
                          session.user.image ||
                          "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                        }
                      />
                      <Avatar.Fallback>
                        {session.user.name?.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                  </Button>
                  <Dropdown.Popover>
                    <Dropdown.Menu onAction={handleMenuAction}>
                      <Dropdown.Item id="profile" textValue="প্রোফাইল">
                        প্রোফাইল
                      </Dropdown.Item>
                      <Dropdown.Item
                        id="update-profile"
                        textValue="আপডেট প্রোফাইল"
                      >
                        আপডেট প্রোফাইল
                      </Dropdown.Item>
                      <Dropdown.Item id="sign-out" textValue="সাইন আউট">
                        সাইন আউট
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            ) : (
              <div className="flex items-center gap-2">
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
            )}
          </div>
        </div>

        <Separator className="w-full bg-slate-100" />

        {/* Feature 1 + 2: Categories with active highlight */}
        <nav
          aria-label="Category Navigation"
          className="flex items-center gap-5 sm:gap-8 py-2.5 overflow-x-auto no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                title={cat.slug}
                className={`flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap py-1 border-b-2 transition-colors ${
                  isActive
                    ? "text-[#0d6efd] font-semibold border-[#0d6efd]"
                    : "text-slate-700 font-medium border-transparent hover:text-[#0d6efd]"
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
