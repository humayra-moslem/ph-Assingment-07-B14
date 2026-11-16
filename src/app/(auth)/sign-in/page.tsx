
"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      console.error(error);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
      }
    } catch (error) {
      toast.error("সামাজিক মাধ্যমে সাইন ইন করা যায়নি");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-[420px]">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign In Card */}
        <Card className="w-full rounded-2xl border border-slate-200/80 bg-white/80 p-5 sm:p-6 shadow-sm">
          <Card.Content className="flex flex-col gap-4">
            {/* Sign In Form */}
            <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <TextField
                name="email"
                type="email"
                isRequired
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-sm font-medium text-slate-700">
                  ইমেইল
                </Label>

                <Input
                  placeholder="you@example.com"
                  className="w-full h-10 px-3 rounded-lg bg-transparent border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-emerald-400 focus:border-emerald-600 focus:outline-none transition-colors"
                />

                <FieldError className="text-xs text-red-500" />
              </TextField>

              {/* Password */}
              <TextField
                name="password"
                type={isVisible ? "text" : "password"}
                isRequired
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-sm font-medium text-slate-700">
                  পাসওয়ার্ড
                </Label>

                <div className="relative w-full">
                  <Input
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    className="w-full h-10 px-3 pr-10 rounded-lg bg-transparent border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-emerald-400 focus:border-emerald-600 focus:outline-none transition-colors"
                  />

                  <button
                    type="button"
                    onClick={() => setIsVisible((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <FieldError className="text-xs text-red-500" />
              </TextField>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 mt-1 rounded-lg bg-[#078b40] hover:bg-[#067535] text-white font-semibold text-sm shadow-md transition-colors"
              >
                সাইন ইন
              </Button>
            </Form>

            {/* Separator */}
            <div className="flex items-center gap-3 py-1">
              <Separator className="flex-1 bg-slate-200" />

              <span className="text-xs text-slate-500">অথবা</span>

              <Separator className="flex-1 bg-slate-200" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-2">
              {/* Google */}
              <Button
                type="button"
                onClick={() => handleSocialSignIn("google")}
                variant="outline"
                className="h-10 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google দিয়ে চালিয়ে যান
              </Button>

              {/* GitHub */}
              {/* <Button
                type="button"
                onClick={() => handleSocialSignIn("github")}
                variant="outline"
                className="h-10 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                >
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
                GitHub দিয়ে চালিয়ে যান
              </Button> */}
            </div>

            {/* Sign Up */}
            <p className="text-center text-xs sm:text-sm text-slate-500 pt-1">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#078b40] hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </Card.Content>
        </Card>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={15} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
