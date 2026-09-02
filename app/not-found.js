import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-7xl text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl text-text">Page not found</h1>
      <p className="mt-2 text-sm text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#14110f] transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
