import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, Bookmark, Star } from 'lucide-react';
import type { AnimeItem } from '@/lib/scraper';

export function AnimeCard({ anime }: { anime: AnimeItem }) {
  return (
    <Link 
      href={`/anime/${anime.slug}`} 
      className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:scale-[1.03] hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 ease-out h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 border-b border-zinc-800/40">
        {anime.poster ? (
          <Image
            src={anime.poster.startsWith('http') ? anime.poster : `https:${anime.poster}`}
            alt={anime.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover object-center transition-all duration-500 brightness-75 group-hover:brightness-[1.1] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500 font-medium">
            No Image
          </div>
        )}
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center pointer-events-none z-10">
          <PlayCircle className="w-11 h-11 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] scale-75 group-hover:scale-100 transition-transform duration-300" />
        </div>

        {/* Top left Bookmark */}
        <div className="absolute top-2 left-2 flex items-center justify-center w-7 h-7 bg-zinc-950/80 backdrop-blur-md rounded-lg border border-zinc-800/80 hover:border-cyan-500/50 transition-colors z-20">
          <Bookmark className="w-3.5 h-3.5 text-zinc-300" />
        </div>

        {/* Top right Badge */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end z-20">
          {(anime.episode || anime.status) && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-zinc-950/80 backdrop-blur-md text-[10px] text-zinc-200 font-bold rounded-lg border border-zinc-800/80">
              <Star className="w-3 h-3 text-cyan-400 fill-cyan-400" /> 
              {anime.episode || anime.status}
            </span>
          )}
        </div>
        
        {/* Type / Subtitle overlay inside image */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none z-10">
          <div className="flex justify-between items-center text-[10px] w-full text-zinc-300 font-medium">
            <span className="truncate">{anime.type || 'Anime'}</span>
            {anime.sub && <span className="text-cyan-400 font-semibold ml-2 shrink-0">{anime.sub}</span>}
          </div>
        </div>
      </div>

      {/* Card Details Block */}
      <div className="p-3.5 flex flex-col gap-1.5 flex-grow justify-between bg-zinc-900/20">
        <h3 className="line-clamp-1 text-sm font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors leading-tight">
          {anime.title}
        </h3>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span className="text-xs text-zinc-500 font-medium truncate">
            {anime.type || "Anime"}
          </span>
          {anime.status && (
            <span className="text-[9px] bg-zinc-800/80 text-zinc-400 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider border border-zinc-700/30">
              {anime.status}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
