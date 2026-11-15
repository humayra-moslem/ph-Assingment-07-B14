import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";


export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-lg text-center">
        {/* Emoji */}
        <div className="text-8xl sm:text-9xl mb-6">🔍</div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
          পেজটি পাওয়া যায়নি!
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। পেজটি সরানো হতে পারে
          অথবা লিংকটি ভুল হতে পারে।
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[#078b40] hover:bg-[#067535] text-white font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5"
        >
          <Home size={18} />
          হোম পেজে ফিরে যান
        </Link>

        {/* Back */}
        <div className="mt-5">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={15} />
            আগের পেজে ফিরে যান
          </button>
        </div>
      </div>
    </main>
  );
}
