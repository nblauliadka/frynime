import { 
  getHome, getTop, getPopular, getUpcoming, getMovies,
  getAction, getRomance, getComedy, getAdventure, getSciFi, getFantasy,
  getDetail
} from '@/lib/scraper';
import { AnimeCard } from '@/components/AnimeCard';
import { Pagination } from '@/components/Pagination';
import { HorizontalScroller } from '@/components/HorizontalScroller';
import Link from 'next/link';
import { Play, Star } from 'lucide-react';

export default async function HomePage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  
  // We stagger the fetches slightly or group them to improve reliability with Jikan API rate limits (3 requests / second)
  let homeData = { items: [], currentPage: 1, hasNext: false };
  let extraSections: { title: string, href: string, items: any[] }[] = [];
  let heroAnime: any = null;

  if (page === 1) {
    // Group 1
    const [resHome, resTop, resPopular] = await Promise.all([
      getHome(page), getTop(1), getPopular(1)
    ]);
    
    // Fetch details for the first trending anime for the hero banner
    if (resTop.items && resTop.items.length > 0) {
      try {
        heroAnime = await getDetail(resTop.items[0].slug);
      } catch (error) {
        console.error("Failed to fetch hero anime details:", error);
      }
    }

    // Group 2
    await new Promise(r => setTimeout(r, 600)); // wait 600ms
    const [resUpcoming, resMovies, resAction] = await Promise.all([
      getUpcoming(1), getMovies(1), getAction(1)
    ]);
    // Group 3
    await new Promise(r => setTimeout(r, 600)); // wait 600ms
    const [resRomance, resComedy, resAdventure] = await Promise.all([
      getRomance(1), getComedy(1), getAdventure(1)
    ]);
    // Group 4
    await new Promise(r => setTimeout(r, 600));
    const [resSciFi, resFantasy] = await Promise.all([
      getSciFi(1), getFantasy(1)
    ]);

    homeData = resHome as any;
    extraSections = [
      { title: "Trending Animes", href: "/top", items: resTop.items },
      { title: "Now Playing", href: "/", items: resHome.items },
      { title: "Most Popular", href: "/popular", items: resPopular.items },
      { title: "Upcoming Seasons", href: "/upcoming", items: resUpcoming.items },
      { title: "Top Movies", href: "/movies", items: resMovies.items },
      { title: "Action", href: "/genre/1", items: resAction.items },
      { title: "Romance", href: "/genre/22", items: resRomance.items },
      { title: "Comedy", href: "/genre/4", items: resComedy.items },
      { title: "Adventure", href: "/genre/2", items: resAdventure.items },
      { title: "Sci-Fi", href: "/genre/24", items: resSciFi.items },
      { title: "Fantasy", href: "/genre/10", items: resFantasy.items },
    ];
  } else {
    homeData = await getHome(page) as any;
  }

  // Set up Hero Banner details with fallbacks
  const heroTitle = heroAnime?.title || (extraSections[0]?.items?.[0]?.title) || "Frynime Stream";
  const heroPoster = heroAnime?.poster || (extraSections[0]?.items?.[0]?.poster) || "";
  const heroSynopsis = heroAnime?.synopsis 
    ? (heroAnime.synopsis.length > 250 ? heroAnime.synopsis.slice(0, 250) + "..." : heroAnime.synopsis) 
    : "Explore the best and latest anime series streaming now on Frynime.";
  const heroSlug = heroAnime?.slug || (extraSections[0]?.items?.[0]?.slug) || "";
  const heroRating = heroAnime?.rating || null;
  const heroGenres = heroAnime?.genres || [];

  return (
    <div className="flex flex-col gap-10 overflow-hidden w-full">
      {page === 1 ? (
        <>
          {/* Cinematic Hero Banner */}
          {heroSlug && (
            <div className="relative w-full h-[55vh] md:h-[65vh] min-h-[380px] max-h-[600px] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/40 group shadow-2xl mb-2 flex items-end">
              {heroPoster && (
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={heroPoster} 
                    alt={heroTitle}
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[10000ms] ease-out opacity-35 md:opacity-45"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
                </div>
              )}

              {/* Banner Info Content */}
              <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-3xl flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(34,211,238,0.2)]">
                    Trending #1
                  </span>
                  {heroRating && (
                    <span className="flex items-center gap-1 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800 text-zinc-200">
                      <Star className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> {heroRating}
                    </span>
                  )}
                  {heroAnime?.type && (
                    <span className="bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
                      {heroAnime.type}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase drop-shadow-md line-clamp-2">
                  {heroTitle}
                </h1>

                <p className="text-sm md:text-base text-zinc-400 line-clamp-3 leading-relaxed max-w-2xl font-medium">
                  {heroSynopsis}
                </p>

                {heroGenres.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {heroGenres.slice(0, 3).map((g: any) => (
                      <span key={g.slug} className="text-zinc-500 font-semibold px-2.5 py-0.5 rounded bg-zinc-900/60 border border-zinc-800/80">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-2">
                  <Link 
                    href={`/anime/${heroSlug}`} 
                    className="inline-flex items-center gap-2.5 px-6 py-3 md:px-7 md:py-3.5 bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] text-zinc-950 font-black rounded-xl text-sm transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Scroller Sections */}
          {extraSections.map((section, idx) => {
            if (!section.items || section.items.length === 0) return null;
            return (
              <section key={idx}>
                <HorizontalScroller title={section.title} viewAllHref={section.href}>
                  {section.items.slice(0, 15).map((anime, i) => (
                    <div key={`${section.title}-${i}`} className="snap-start min-w-[145px] w-[145px] md:min-w-[195px] md:w-[195px] shrink-0">
                      <AnimeCard anime={anime} />
                    </div>
                  ))}
                </HorizontalScroller>
              </section>
            );
          })}
        </>
      ) : (
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[1.1rem] md:text-xl font-bold text-[#e0e0e0] flex items-center">
              Now Playing (Page {page})
            </h2>
          </div>
          
          {homeData.items.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
              {homeData.items.map((anime: any, i: number) => (
                <AnimeCard key={`home-${anime.slug}-${i}`} anime={anime} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/40">
              No anime found.
            </div>
          )}
        </section>
      )}

      <div className="mt-8">
        <Pagination currentPage={homeData.currentPage} hasNext={homeData.hasNext} basePath="/" />
      </div>
    </div>
  );
}
