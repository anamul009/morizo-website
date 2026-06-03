import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Handle transparent header on scroll.
  // The page scrolls inside this container (overflow-y-auto), not the window,
  // so listen on the container — window.scrollY stays 0 here.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setIsScrolled(el.scrollTop > 50);
    };
    el.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prefix links with the deploy base so they work under the Pages sub-path.
  const base = import.meta.env.BASE_URL; // '/morizo-co-ltd/' in prod, '/' in dev
  const menuItems = [
    { title: 'ホーム', href: base },
    { title: 'ニュース', href: `${base}#news` },
    { title: '会社概要', href: `${base}company` },
    { title: 'お問い合わせ', href: `${base}#contact` },
  ];

  // Header is solid if we've scrolled down, or if we're not on the homepage (so it's visible on normal pages)
  const headerSolid = isScrolled || !isHomePage;

  return (
    <div ref={scrollRef} className="size-full bg-[#f7f4e7] font-sans text-gray-900 scroll-smooth flex flex-col min-h-screen overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        headerSolid 
          ? 'bg-[#f7f4e7]/95 backdrop-blur-md border-b border-black/5 text-black py-4' 
          : 'bg-transparent text-white py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href={base} className="text-2xl font-semibold tracking-tight">株式会社 森蔵</a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 items-center">
            {menuItems.map(item => (
              <a 
                key={item.title} 
                href={item.href} 
                className="text-sm font-medium tracking-widest hover:opacity-60 transition-opacity"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-lg transition-colors md:hidden ${
              headerSolid ? 'hover:bg-black/5 text-black' : 'hover:bg-white/20 text-white'
            }`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#f7f4e7] z-40 pt-28 px-6 md:hidden">
          <nav className="flex flex-col space-y-8">
            {menuItems.map(item => (
              <a
                key={item.title}
                href={item.href}
                className="text-3xl font-light tracking-tight text-black hover:text-gray-500 transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-black/5 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-semibold tracking-tight">株式会社 森蔵</div>
          <div className="flex flex-wrap justify-center gap-8 text-sm tracking-widest uppercase">
            <a href="#" className="hover:text-gray-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-gray-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gray-500 transition-colors">プライバシーポリシー</a>
          </div>
          <div className="text-gray-400 text-sm">
            © 2026 株式会社 森蔵 All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
