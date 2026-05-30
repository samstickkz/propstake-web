// Auto-rendered by Next while /properties is fetching — replaces the bare
// page with shimmer skeletons so it feels instantaneous (#1).

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      <div className="mt-3 h-8 w-40 animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />

      <div className="mt-6 inline-flex gap-2 rounded-xl bg-gray-100 p-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-20 animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-7 w-20 animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            <div className="h-48 w-full animate-pulse bg-gray-200" />
            <div className="space-y-3 p-4">
              <div className="flex gap-3">
                <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
