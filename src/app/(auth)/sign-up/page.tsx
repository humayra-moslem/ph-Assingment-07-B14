// "use client";

// import React, { useState } from "react";
// import {
//   Button,
//   Card,
//   FieldError,
//   Form,
//   Input,
//   Label,
//   Separator,
//   TextField,
// } from "@heroui/react";
// import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
// import Link from "next/link";
// // import { signIn, signUp } from "@/lib/auth-client";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { signIn, signUp } from "@/lib/auth-client";

// export default function SignUpPage() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setPasswordError("");

//     const formData = new FormData(e.currentTarget);
//     const data = Object.fromEntries(formData.entries());

//     if (data.password !== data.confirmPassword) {
//       setPasswordError("পাসওয়ার্ড দুটি মিলছে না!");
//       return;
//     }

//     // console.log("Sign Up Data:", data);
//     const { data: resData, error } = await signUp.email({
//       email: data.email as string, // user email address
//       password: data.password as string, // user password -> min 8 characters by default
//       name: data.name as string, // user display name
//     });
//     console.log(resData, error);
//     if (resData?.user.name) {
//       toast.success("Account Created Successfully, Login to continue");
//       router.push("/sign-in");
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const data = await signIn.social({
//       provider: "google",
//     });
//     console.log(data);
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] p-4">
//       <Card className="w-full max-w-[440px] p-5 sm:p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 bg-white">
//         {/* Header Section */}
//         <Card.Header className="flex flex-col items-center text-center gap-1.5 pb-2">
//           <span className="text-4xl mb-1" role="img" aria-label="bus">
//             🚌
//           </span>
//           <Card.Title className="text-2xl sm:text-3xl font-bold text-slate-900">
//             অ্যাকাউন্ট তৈরি করুন
//           </Card.Title>
//           <Card.Description className="text-xs sm:text-sm text-slate-500">
//             TripFare BD-এর সঙ্গে আপনার ভ্রমণের ভাড়া তুলনা শুরু করুন।
//           </Card.Description>
//         </Card.Header>

//         {/* Form & Social Section */}
//         <Card.Content className="flex flex-col gap-5 pt-2">
//           <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             {/* Full Name Field */}
//             <TextField
//               name="name"
//               type="text"
//               isRequired
//               className="flex flex-col gap-1.5 w-full"
//             >
//               <Label className="text-xs sm:text-sm font-medium text-slate-700">
//                 আপনার পূর্ণ নাম
//               </Label>
//               <div className="relative flex items-center">
//                 <User
//                   size={18}
//                   className="pointer-events-none absolute left-3.5 text-slate-400"
//                 />
//                 <Input
//                   placeholder="যেমন: তানভীর আহমেদ"
//                   className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0d6efd] focus:bg-white focus:outline-none transition-colors"
//                 />
//               </div>
//               <FieldError className="text-xs text-red-500" />
//             </TextField>

//             {/* Email Field */}
//             <TextField
//               name="email"
//               type="email"
//               isRequired
//               className="flex flex-col gap-1.5 w-full"
//             >
//               <Label className="text-xs sm:text-sm font-medium text-slate-700">
//                 ইমেইল অ্যাড্রেস
//               </Label>
//               <div className="relative flex items-center">
//                 <Mail
//                   size={18}
//                   className="pointer-events-none absolute left-3.5 text-slate-400"
//                 />
//                 <Input
//                   placeholder="example@mail.com"
//                   className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0d6efd] focus:bg-white focus:outline-none transition-colors"
//                 />
//               </div>
//               <FieldError className="text-xs text-red-500" />
//             </TextField>

//             {/* Password Field */}
//             <TextField
//               name="password"
//               type={isVisible ? "text" : "password"}
//               minLength={6}
//               isRequired
//               className="flex flex-col gap-1.5 w-full"
//             >
//               <Label className="text-xs sm:text-sm font-medium text-slate-700">
//                 পাসওয়ার্ড
//               </Label>
//               <div className="relative flex items-center">
//                 <Lock
//                   size={18}
//                   className="pointer-events-none absolute left-3.5 text-slate-400"
//                 />
//                 <Input
//                   placeholder="কমপক্ষে ৬টি অক্ষর"
//                   className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0d6efd] focus:bg-white focus:outline-none transition-colors"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setIsVisible((prev) => !prev)}
//                   className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
//                   aria-label="Toggle password visibility"
//                 >
//                   {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               <FieldError className="text-xs text-red-500" />
//             </TextField>

//             {/* Confirm Password Field */}
//             <TextField
//               name="confirmPassword"
//               type={isVisible ? "text" : "password"}
//               isRequired
//               isInvalid={!!passwordError}
//               className="flex flex-col gap-1.5 w-full"
//             >
//               <Label className="text-xs sm:text-sm font-medium text-slate-700">
//                 কনফার্ম পাসওয়ার্ড
//               </Label>
//               <div className="relative flex items-center">
//                 <Lock
//                   size={18}
//                   className="pointer-events-none absolute left-3.5 text-slate-400"
//                 />
//                 <Input
//                   placeholder="পুনরায় পাসওয়ার্ড লিখুন"
//                   className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0d6efd] focus:bg-white focus:outline-none transition-colors"
//                 />
//               </div>
//               {passwordError ? (
//                 <span className="text-xs text-red-500">{passwordError}</span>
//               ) : (
//                 <FieldError className="text-xs text-red-500" />
//               )}
//             </TextField>

//             {/* Register Submit Button */}
//             <Button
//               type="submit"
//               variant="primary"
//               className="w-full h-11 mt-1 rounded-xl bg-[#0d6efd] hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors"
//             >
//               রেজিস্টার করুন
//             </Button>
//           </Form>

//           {/* Separator with "অথবা" */}
//           <div className="w-full flex items-center gap-3">
//             <Separator className="flex-1 bg-slate-100" />
//             <span className="text-xs text-slate-400 font-medium">অথবা</span>
//           </div>

//           {/* Google Sign Up Button */}
//           <Button
//             type="button"
//             onClick={handleGoogleSignIn}
//             variant="outline"
//             className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-none transition-colors"
//           >
//             <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             <span>Google দিয়ে সাইন আপ করুন</span>
//           </Button>
//         </Card.Content>

//         <Separator className="w-full bg-slate-100 my-4" />

//         {/* Footer Section */}
//         <Card.Footer className="flex flex-col items-center gap-2.5 pt-0 text-xs sm:text-sm">
//           <p className="text-slate-500">
//             ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
//             <Link
//               href="/sign-in"
//               className="text-[#0d6efd] font-semibold hover:underline"
//             >
//               সাইন ইন করুন
//             </Link>
//           </p>

//           <Link
//             href="/"
//             className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors text-xs"
//           >
//             <ArrowLeft size={14} />
//             <span>হোম পেজে ফিরে যান</span>
//           </Link>
//         </Card.Footer>
//       </Card>
//     </div>
//   );
// }

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

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [passwordError, setPasswordError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // Email registration
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setPasswordError("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    try {
      setIsPending(true);

      const { data, error } = await signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }

      if (data?.user) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/sign-in");
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন!");
    } finally {
      setIsPending(false);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
      });

      if (error) {
        toast.error(error.message ?? "Google দিয়ে সাইন আপ করা যায়নি!");
      }
    } catch {
      toast.error("Google দিয়ে সাইন আপ করা যায়নি!");
    }
  };

  // GitHub Login
  const handleGithubSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
      });

      if (error) {
        toast.error(error.message ?? "GitHub দিয়ে সাইন আপ করা যায়নি!");
      }
    } catch {
      toast.error("GitHub দিয়ে সাইন আপ করা যায়নি!");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f5f0] px-4 py-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1c2921]">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="text-sm text-[#7a877e] mt-2">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Signup Card */}
      <Card className="w-full max-w-[404px] p-5 sm:p-6 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] shadow-none">
        <Card.Content className="p-0 flex flex-col gap-5">
          {/* Signup Form */}
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Name */}
            <TextField
              name="name"
              type="text"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-sm font-medium text-[#26332a]">নাম</Label>

              <Input
                placeholder="যেমন: রহিম উদ্দিন"
                className="w-full h-10 px-3 rounded-lg border border-[#dce6dc] bg-transparent text-sm text-[#26332a] placeholder:text-[#879188] focus:border-[#07883e] focus:outline-none"
              />

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-sm font-medium text-[#26332a]">
                ইমেইল
              </Label>

              <Input
                placeholder="you@example.com"
                className="w-full h-10 px-3 rounded-lg border border-[#dce6dc] bg-transparent text-sm text-[#26332a] placeholder:text-[#879188] focus:border-[#07883e] focus:outline-none"
              />

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type="password"
              minLength={8}
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-sm font-medium text-[#26332a]">
                পাসওয়ার্ড
              </Label>

              <Input
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full h-10 px-3 rounded-lg border border-[#dce6dc] bg-transparent text-sm text-[#26332a] placeholder:text-[#879188] focus:border-[#07883e] focus:outline-none"
              />

              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Confirm Password */}
            <TextField
              name="confirmPassword"
              type="password"
              isRequired
              isInvalid={!!passwordError}
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-sm font-medium text-[#26332a]">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                placeholder="আবার লিখুন"
                className="w-full h-10 px-3 rounded-lg border border-[#dce6dc] bg-transparent text-sm text-[#26332a] placeholder:text-[#879188] focus:border-[#07883e] focus:outline-none"
              />

              {passwordError ? (
                <span className="text-xs text-red-500">{passwordError}</span>
              ) : (
                <FieldError className="text-xs text-red-500" />
              )}
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              isDisabled={isPending}
              className="w-full h-10 mt-1 rounded-lg bg-[#078b42] hover:bg-[#067536] text-white font-semibold text-sm shadow-[0_3px_4px_rgba(0,0,0,0.2)] transition-colors"
            >
              {isPending ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="w-full flex items-center gap-3">
            <Separator className="flex-1 bg-[#e0e7e0]" />

            <span className="text-xs text-[#778278]">অথবা</span>

            <Separator className="flex-1 bg-[#e0e7e0]" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {/* Google */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              className="h-10 rounded-lg border border-[#dce6dc] bg-transparent hover:bg-[#f0f5f0] text-[#26332a] text-xs sm:text-sm font-semibold"
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

              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>

            {/* GitHub */}
            {/* <Button
              type="button"
              onClick={handleGithubSignIn}
              variant="outline"
              className="h-10 rounded-lg border border-[#dce6dc] bg-transparent hover:bg-[#f0f5f0] text-[#26332a] text-xs sm:text-sm font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.95.6.1.8-.25.8-.55v-2.1c-3.2.7-3.9-1.35-3.9-1.35-.55-1.35-1.3-1.7-1.3-1.7-1.05-.7.1-.7.1-.7 1.15.1 1.75 1.2 1.75 1.2 1.05 1.75 2.75 1.25 3.4.95.1-.75.4-1.25.7-1.55-2.55-.3-5.25-1.3-5.25-5.7 0-1.25.45-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.05 0 0 1-.3 3.2 1.2a11.2 11.2 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.55.2 2.75.1 3.05.75.8 1.2 1.85 1.2 3.1 0 4.4-2.7 5.4-5.25 5.7.4.35.75 1 .75 2.05v3.05c0 .3.2.65.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>

              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button> */}
          </div>
        </Card.Content>

        {/* Footer */}
        <Card.Footer className="p-0 pt-4 flex justify-center">
          <p className="text-xs sm:text-sm text-[#68756b]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="text-[#078b42] font-semibold hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </Card.Footer>
      </Card>

      {/* Back Home */}
      <Link
        href="/"
        className="flex items-center gap-1.5 mt-6 text-sm text-[#89958b] hover:text-[#078b42] transition-colors"
      >
        <ArrowLeft size={15} />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  )
}
