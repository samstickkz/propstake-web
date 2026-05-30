// Detail-page skeleton — fires while the property fetch is in flight (#1).

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="h-72 animate-pulse rounded-2xl bg-gray-200 sm:col-span-2" />
        <div className="h-40 animate-pulse rounded-xl bg-gray-200" />
        <div className="h-40 animate-pulse rounded-xl bg-gray-200" />
      </div>
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 space-y-3">
          <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-3">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="w-full shrink-0 space-y-3 rounded-2xl border border-gray-200 p-5 lg:w-80">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-2 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
