


"use client";

import Image from "next/image";
import Link from "next/link";

import { signOut, useSession } from "@/lib/auth-client";

const Header = () => {
  const now = new Date();

  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const { data, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

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

          {/* Authentication Section */}
          <div className="flex items-center gap-3">

            {isPending ? (
              <span className="text-sm text-gray-500">
                Loading...
              </span>
            ) : data?.user ? (
              <div className="relative group">
                <button
                  className="flex items-center gap-2 rounded-full border border-gray-200 p-1 hover:bg-gray-100"
                  type="button"
                >
                  <Image
                    src={
                      data.user.image ||
                      "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                    }
                    alt={data.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />

                  <span className="text-sm font-medium text-gray-700 pr-2">
                    {data.user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full z-50 hidden w-48 rounded-md border border-gray-200 bg-white py-2 shadow-lg group-hover:block">

                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    প্রোফাইল
                  </Link>

                  <Link
                    href="/profile/update-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    আপডেট প্রোফাইল
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  >
                    সাইন আউট
                  </button>

                </div>
              </div>
            ) : (
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
            )}

          </div>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
