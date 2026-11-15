
export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-12" />
          <div className="skeleton h-4 w-4" />
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-4 w-4" />
          <div className="skeleton h-4 w-28" />
        </div>

        {/* Product Summary */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
            <div className="skeleton w-20 h-20 shrink-0 rounded-2xl" />

            <div className="flex-1 space-y-3">
              <div className="skeleton h-7 w-48" />
              <div className="skeleton h-4 w-36" />
              <div className="flex gap-2">
                <div className="skeleton h-6 w-20 rounded-full" />
                <div className="skeleton h-6 w-20 rounded-full" />
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-7 w-32" />
            </div>
          </div>
        </section>

        {/* Price Statistics */}
        <section className="space-y-4">
          <div className="skeleton h-7 w-48" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4"
              >
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-7 w-32" />
              </div>
            ))}
          </div>
        </section>

        {/* Market Table */}
        <section className="space-y-4">
          <div className="skeleton h-7 w-52" />

          {[1, 2].map((division) => (
            <div
              key={division}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                <div className="skeleton h-5 w-36" />
              </div>

              <div className="p-4 space-y-5">
                {[1, 2, 3].map((market) => (
                  <div
                    key={market}
                    className="flex justify-between gap-4"
                  >
                    <div className="skeleton h-4 w-28" />
                    <div className="skeleton h-4 w-20" />
                    <div className="skeleton h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Historical Comparison */}
        <section className="space-y-4">
          <div className="skeleton h-7 w-52" />

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex justify-between gap-4">
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-4 w-28" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
