"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Tv2, BookmarkCheck, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shows", label: "Series" },
    { href: "/movies", label: "Films" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/95 backdrop-blur shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Tv2 className="text-red-600" size={28} />
            <span className="text-xl font-bold tracking-tight text-white">
              Stream<span className="text-red-600">Now</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + watchlist */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Zoek titels..."
                  className="bg-white/10 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-600 w-48 focus:w-64 transition-all"
                />
              </div>
            </form>
            <Link
              href="/watchlist"
              className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Mijn Watchlist"
            >
              <BookmarkCheck size={20} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[#1f1f2e] mt-2 pt-4 space-y-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Zoek titels..."
                  className="w-full bg-white/10 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-red-600 text-white text-sm rounded-full">
                Zoek
              </button>
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-gray-300 hover:text-white py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/watchlist"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white py-1"
            >
              <BookmarkCheck size={16} />
              Watchlist
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
