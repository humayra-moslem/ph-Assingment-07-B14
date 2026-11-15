export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Hero Skeleton */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10">
          <div className="space-y-4">
            <div className="skeleton h-8 w-48" />
            <div className="skeleton h-5 w-72 max-w-full" />
            <div className="skeleton h-11 w-36 rounded-xl" />
          </div>
        </section>

        {/* Price Sections */}
        {[1, 2].map((section) => (
          <section key={section} className="space-y-5">
            {/* Section Heading */}
            <div className="space-y-3">
              <div className="skeleton h-6 w-32 rounded-full" />
              <div className="skeleton h-8 w-56" />
              <div className="skeleton h-4 w-72 max-w-full" />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="skeleton w-14 h-14 shrink-0 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton h-4 w-28" />
                      <div className="skeleton h-3 w-20" />
                    </div>
                  </div>

                  <div className="skeleton h-3 w-24" />
                  <div className="skeleton h-7 w-32" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
