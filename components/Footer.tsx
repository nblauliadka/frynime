import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 relative w-full border-t border-zinc-800/50 bg-zinc-950/20 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Brand Logo & Disclaimer */}
          <div className="lg:col-span-6 space-y-4">
            <Link 
              href="/" 
              className="inline-block text-3xl font-black tracking-tight" 
              style={{
                background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Frynime
            </Link>
            <p className="text-sm text-zinc-500 max-w-xl leading-relaxed font-medium">
              Welcome to Frynime, your ultimate destination for unlimited anime streaming with zero registration required. We pride ourselves on delivering a massive library and a seamless, high-quality viewing experience. Disclaimer: Frynime operates strictly as an index directory. We do not host or store any media files on our servers; all video content is linked and provided by independent, non-affiliated third-party platforms.
            </p>
          </div>

          {/* Right Column: Neat Link Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">Legal</span>
              <Link href="/terms" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Terms of Service</Link>
              <Link href="/policy" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Policy</Link>
              <Link href="/faq" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">FAQs</Link>
              <Link href="/contact" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Contact</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">Browse</span>
              <Link href="/movies" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Movies</Link>
              <Link href="/tv-shows" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Tv shows</Link>
              <Link href="/ongoing" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Animes</Link>
              <Link href="/favorites" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Favorites</Link>
            </div>

            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">Socials</span>
              <a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Discord</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Telegram</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Bar */}
        <div className="border-t border-zinc-800/30 mt-8 pt-6 text-center text-xs text-zinc-500 font-medium">
          Powered by dezreacher. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
