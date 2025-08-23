import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div>
      <nav className="w-full shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Name */}
            <div className="flex items-center space-x-2">
              {/* Logo placeholder */}
              <div>
                <img src="/main-icon.png" alt="logo" className='w-12' />
              </div>
              <span className="text-lg sm:text-xl font-semibold text-gray-800">
                Tech Trade
              </span>
            </div>

            {/* Right: Back Button */}
            <Link
              href="/"
              className="btn btn-primary"
            >
              
              <span className="hidden sm:inline text-sm font-medium">Back</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="pt-12">
        {children}
      </div>
    </div>
  );
}