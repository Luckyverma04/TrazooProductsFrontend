import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFFDF9] px-6">
      <div className="text-center max-w-lg">
        <p className="text-7xl font-bold text-[#C6530A]">404</p>

        <h1 className="mt-4 text-3xl font-bold text-[#222222]">
          Page Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center mt-6 rounded-full bg-[#C6530A] px-7 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}