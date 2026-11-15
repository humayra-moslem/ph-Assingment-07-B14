export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Category Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 flex items-center gap-4">
          <div className="skeleton w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl" />

          <div className="flex-1 space-y-3">
            <div className="skeleton h-7 w-40" />
            <div className="skeleton h-4 w-64 max-w-full" />
          </div>
        </div>

        {/* Sorting Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 px-5 py-4 flex justify-between items-center">
          <div className="skeleton h-4 w-40" />
          <div className="skeleton h-9 w-32 rounded-xl" />
        </div>

        {/* Product Count */}
        <div className="skeleton h-4 w-44" />

        {/* Product Grid */}
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
              <div className="skeleton h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
