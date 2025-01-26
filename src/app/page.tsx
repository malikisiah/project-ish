import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="flex items-center justify-center gap-12 text-center">
            <Link
              href="/music"
              className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
            >
              MUSIC
            </Link>
            <Link
              href="/media"
              className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
            >
              MEDIA
            </Link>
            <Link
              href="/merch"
              className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
            >
              MERCH
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
