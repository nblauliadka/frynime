'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Compass, Calendar, Heart, Search, Bell, X, MonitorPlay } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Genres', href: '/genres', icon: Compass },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Favorites', href: '/favorites', icon: Heart },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* ----------------- MOBILE TOP BAR ----------------- */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-4 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/50">
        <Link href="/" className="text-xl font-black tracking-tight text-white flex items-center gap-2">
          <MonitorPlay className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Frynime</span>
        </Link>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)} 
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
          
          <Link href="/schedule" className="relative p-2 text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full border-2 border-zinc-950 shadow shadow-cyan-500/50"></span>
          </Link>
        </div>

        {/* Expandable Slide-down Mobile Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 right-0 p-3 bg-zinc-950/95 border-b border-zinc-800/80 backdrop-blur-xl animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
              <input 
                type="text" 
                placeholder="Search anime..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-xl bg-zinc-900 border border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-sm text-[#e0e0e0] placeholder:text-zinc-500 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                autoFocus
              />
              <Search className="w-4 h-4 absolute left-3.5 text-zinc-500" />
            </form>
          </div>
        )}
      </header>

      {/* ----------------- MOBILE BOTTOM TAB BAR ----------------- */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm rounded-full bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/60 shadow-2xl z-50 flex justify-between items-center h-16 px-6">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`flex flex-col items-center justify-center relative transition-all active:scale-90 duration-150 ${
                isActive ? 'text-cyan-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : ''}`} />
              <span className="text-[10px] mt-1 font-semibold tracking-wide">{link.name}</span>
              {isActive && (
                <span className="absolute -bottom-1.5 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.8)]"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ----------------- DESKTOP LEFT SIDEBAR ----------------- */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-64 z-50 bg-zinc-950/70 backdrop-blur-xl border-r border-zinc-800/50 p-6 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-3 mb-8 group">
          <MonitorPlay className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-300" />
          <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:text-cyan-400 transition-colors duration-300">Frynime</span>
        </Link>

        {/* Search Form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search anime..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full rounded-xl bg-zinc-900/60 border border-zinc-800/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-sm text-[#e0e0e0] placeholder:text-zinc-500 transition-all hover:bg-zinc-900/80 hover:border-zinc-700/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
            />
            <Search className="w-4 h-4 absolute left-3.5 text-zinc-500 pointer-events-none" />
          </form>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col gap-1.5">
          <div className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-2 px-3">Discover</div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`group flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-semibold tracking-wide relative overflow-hidden transition-all duration-200 ${
                  isActive 
                    ? 'text-cyan-400 bg-cyan-500/10' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-r shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                )}
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-105 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-zinc-800/40 flex flex-col gap-4">
          <Link href="/schedule" className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800/40 hover:border-zinc-800 transition-colors">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-zinc-300 font-medium">Notifications</span>
            </div>
            <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.8)]"></span>
          </Link>
          <div className="text-[10px] text-zinc-600 font-medium text-center">
            &copy; {new Date().getFullYear()} Frynime
          </div>
        </div>
      </aside>
    </>
  );
}
