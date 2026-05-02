import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeartCanvas from './components/HeartCanvas';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  "The way your hug makes everything feel okay",
  "Your patience when I take forever to explain things",
  "How you always save the last piece of dessert for me",
  "The sound of your laugh echoing through the house",
  "Your secret recipes that no one else can replicate",
  "The way you remember every little detail about my life",
  "Your courage to tell me the truth, even when it hurts",
  "How you make ordinary days feel like celebrations",
  "Your ability to find joy in the smallest moments",
  "The way you defend me even when I'm wrong",
  "Your morning voice when you first wake up",
  "How you pretend to be surprised at gifts you've already figured out",
  "Your dance moves that only come out at family parties",
  "The way you still call to make sure I ate today",
  "Your stories about when I was little that I've heard a hundred times",
  "How you make the best out of broken plans",
  "Your fierce love that I feel even from miles away",
  "The way you listen without trying to fix everything",
  "How you taught me to be kind before teaching me to be tough",
  "Your belief in me when I stopped believing in myself",
  "The way you make guests feel like family",
  "How you cry at every single commercial with a puppy",
  "Your texts that are paragraphs of love disguised as questions",
  "The way you make coming home feel like a vacation",
  "How you never let me leave without one more hug",
  "Your wisdom that only comes from years of loving deeply",
  "The way you celebrate my wins like they're your own",
  "How you make the house feel alive just by being in it",
  "Your strength that you never brag about",
  "The way you know what I need before I say it",
  "How you make leftovers taste better than the first meal",
  "Your playlists that are perfectly chaotic",
  "The way you make every holiday magical, no matter what",
  "How you taught me that love is shown, not just spoken",
  "Your eyes that still light up when you talk about Dad",
  "The way you make friends with literally everyone",
  "How you handle chaos with grace I can only dream of",
  "Your bedtime stories that I still remember word for word",
  "The way you make me feel like I'm still your little kid",
  "How you give the best advice without giving advice at all",
  "Your prayers that I know you say even when I'm not around",
  "The way you make family the most important word",
  "How you still get excited about my silly achievements",
  "Your hands that have held, healed, and helped so much",
  "The way you forgive before I even finish apologizing",
  "How you make love look effortless when I know it's hard work",
  "Your smile that makes strangers smile back",
  "The way you are the first person I want to tell everything",
  "How you make me want to be someone worth your pride",
  "You are simply the best mom in the entire universe",
];

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const salutationRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page load fade in
    const timer = setTimeout(() => setPageLoaded(true), 100);

    // Hero animations
    const heroCtx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out',
      });
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 1,
        ease: 'power3.out',
      });
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out',
      });
    }, heroRef);

    // Salutation scroll animations
    const salCtx = gsap.context(() => {
      gsap.from('.salutation-title', {
        scrollTrigger: {
          trigger: salutationRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.salutation-body', {
        scrollTrigger: {
          trigger: salutationRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
      });
      gsap.from('.salutation-image', {
        scrollTrigger: {
          trigger: salutationRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      });
    }, salutationRef);

    // Reasons grid stagger animation
    const reasonsCtx = gsap.context(() => {
      gsap.from('.reasons-header', {
        scrollTrigger: {
          trigger: reasonsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.reason-card', {
        scrollTrigger: {
          trigger: reasonsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, reasonsRef);

    // Gallery animations
    const galleryCtx = gsap.context(() => {
      gsap.from('.gallery-header', {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.gallery-item', {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, galleryRef);

    // Closing animations
    const closingCtx = gsap.context(() => {
      gsap.from('.closing-text', {
        scrollTrigger: {
          trigger: closingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.closing-signature', {
        scrollTrigger: {
          trigger: closingRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    }, closingRef);

    return () => {
      clearTimeout(timer);
      heroCtx.revert();
      salCtx.revert();
      reasonsCtx.revert();
      galleryCtx.revert();
      closingCtx.revert();
    };
  }, []);

  const scrollToLetter = () => {
    salutationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      >
        <HeartCanvas />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="hero-title font-display text-[#3E2723] text-5xl md:text-7xl lg:text-8xl font-medium mb-4 tracking-tight">
            Happy Mother's Day
          </h1>
          <p className="hero-subtitle font-body text-[#C8A492] text-lg md:text-2xl mb-10 tracking-wide">
            A love letter from Ayka
          </p>
          <button
            onClick={scrollToLetter}
            className="hero-cta group relative px-8 py-3 border border-[#3E2723] text-[#3E2723] font-body text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:bg-[#3E2723] hover:text-[#F8F4F0] hover:shadow-lg"
          >
            <span className="relative z-10">Unfold the Letter</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A492" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="w-full flex items-center justify-center py-12">
        <div className="w-px h-24 bg-[#C8A492] opacity-40" />
      </div>

      {/* Salutation Section */}
      <section
        ref={salutationRef}
        className="relative w-full py-20 md:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="salutation-title font-display text-[#3E2723] text-4xl md:text-5xl lg:text-6xl mb-8">
              Dearest Mom,
            </h2>
            <div className="salutation-body space-y-6">
              <p className="font-body text-[#3E2723] text-lg md:text-xl leading-relaxed">
                Words often fail to capture the depth of what I feel for you. But today, on this day dedicated entirely to the love you've given me, I want to try.
              </p>
              <p className="font-body text-[#3E2723] text-lg md:text-xl leading-relaxed opacity-80">
                I spent hours thinking about what makes you so special. I realized it isn't just one thing — it's a thousand little things that add up to something extraordinary. So I wrote them down. Fifty reasons why you are the heart of my world.
              </p>
              <p className="font-body text-[#C8A492] text-lg md:text-xl italic">
                This is for you.
              </p>
            </div>
          </div>
          <div className="salutation-image order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <img
                src="/assets/love-letter.jpg"
                alt="A love letter with flowers"
                className="w-full max-w-md rounded-2xl shadow-xl sepia-[0.08]"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#C8A492] rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-[#E8A0BF] rounded-full -z-10 opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="w-full flex items-center justify-center py-8">
        <div className="w-32 h-px bg-[#C8A492] opacity-30" />
      </div>

      {/* 50 Reasons Section */}
      <section
        ref={reasonsRef}
        className="relative w-full py-20 md:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="reasons-header text-center mb-16 md:mb-24">
            <span className="font-body text-[#C8A492] text-sm tracking-[0.3em] uppercase mb-4 block">
              50 Reasons
            </span>
            <h2 className="font-display text-[#3E2723] text-3xl md:text-5xl lg:text-6xl">
              Why I Love You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="reason-card group relative p-6 md:p-8 bg-white/40 backdrop-blur-sm border border-[#C8A492]/30 rounded-2xl transition-all duration-500 hover:bg-white/70 hover:border-[#C8A492]/60 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="font-body text-[#C8A492] text-xs tracking-widest uppercase mb-3 block">
                  Reason {String(index + 1).padStart(2, '0')}
                </span>
                <p className="font-body text-[#3E2723] text-base leading-relaxed">
                  {reason}
                </p>
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#E8A0BF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="w-full flex items-center justify-center py-8">
        <div className="w-32 h-px bg-[#C8A492] opacity-30" />
      </div>

      {/* Gallery Section */}
      <section
        ref={galleryRef}
        className="relative w-full py-20 md:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="gallery-header text-center mb-16 md:mb-24">
            <span className="font-body text-[#C8A492] text-sm tracking-[0.3em] uppercase mb-4 block">
              Memories
            </span>
            <h2 className="font-display text-[#3E2723] text-3xl md:text-5xl lg:text-6xl">
              Moments With You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="gallery-item row-span-2">
              <img
                src="/assets/mom-flowers.jpg"
                alt="Pink peonies bouquet"
                className="w-full h-full object-cover rounded-2xl sepia-[0.05] hover:sepia-0 transition-all duration-700"
              />
            </div>
            <div className="gallery-item">
              <img
                src="/assets/blossom.jpg"
                alt="Cherry blossom branch"
                className="w-full h-full object-cover rounded-2xl sepia-[0.05] hover:sepia-0 transition-all duration-700"
              />
            </div>
            <div className="gallery-item row-span-2">
              <div className="w-full h-full bg-[#FADADD]/30 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-[#C8A492]/20">
                <span className="font-display text-[#3E2723] text-2xl md:text-3xl mb-4">
                  "A mother's love is the first and last thing we know."
                </span>
                <span className="font-body text-[#C8A492] text-sm tracking-widest uppercase">
                  — Unknown
                </span>
              </div>
            </div>
            <div className="gallery-item col-span-1 md:col-span-2 lg:col-span-2">
              <img
                src="/assets/mom-daughter.jpg"
                alt="Mother and daughter in garden"
                className="w-full h-full object-cover rounded-2xl sepia-[0.05] hover:sepia-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="w-full flex items-center justify-center py-8">
        <div className="w-32 h-px bg-[#C8A492] opacity-30" />
      </div>

      {/* Closing Section */}
      <section
        ref={closingRef}
        className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 md:py-32"
      >
        {/* Background subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#3E2723" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="closing-text space-y-8">
            <p className="font-body text-[#3E2723] text-lg md:text-xl leading-relaxed opacity-80">
              I could write a thousand more reasons, and it still wouldn't be enough. You are my home, my safe place, my first love, and my forever friend.
            </p>
            <p className="font-body text-[#3E2723] text-lg md:text-xl leading-relaxed">
              Thank you for being the extraordinary woman you are. Thank you for every sacrifice, every hug, every lesson, every laugh. I am who I am because of you.
            </p>
            <div className="pt-8">
              <span className="font-body text-[#C8A492] text-lg tracking-wide block mb-6">
                With all my love,
              </span>
            </div>
          </div>

          <div className="closing-signature mt-4">
            <span className="font-script text-[#C8A492] text-7xl md:text-8xl lg:text-9xl">
              Ayka
            </span>
          </div>

          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-[#C8A492] opacity-40" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#E8A0BF">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="w-12 h-px bg-[#C8A492] opacity-40" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center">
        <p className="font-body text-[#C8A492] text-xs tracking-[0.2em] uppercase opacity-60">
          Made with love for the best mom
        </p>
      </footer>
    </div>
  );
}

export default App;
