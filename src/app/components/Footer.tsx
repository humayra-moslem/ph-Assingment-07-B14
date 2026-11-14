
const Footer = () => {
  return (
    <footer className="w-full bg-[#f8faf9] mt-10 border-y border-gray-200">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600">

          {/* Left Side */}
          <p className="text-center">
            বাজার দর – প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Right Side */}
          <p className="text-center">
            সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
