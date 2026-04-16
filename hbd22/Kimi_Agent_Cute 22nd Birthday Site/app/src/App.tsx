import { useState, useEffect, useCallback } from 'react'
import { Heart, Sparkles, Gift, Star, Music, Cake, Balloon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import './App.css'

// Confetti component
interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
}

function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (active) {
      const colors = ['#ff9eb5', '#c8b4ff', '#ffe4a1', '#a8e6cf', '#ffd3e1']
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
      }))
      setPieces(newPieces)
      setTimeout(() => setPieces([]), 6000)
    }
  }, [active])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm animate-confetti"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Floating Balloon component
interface BalloonData {
  id: number
  x: number
  color: string
  delay: number
  size: number
}

function FloatingBalloons({ active }: { active: boolean }) {
  const [balloons, setBalloons] = useState<BalloonData[]>([])

  useEffect(() => {
    if (active) {
      const colors = ['#ff9eb5', '#c8b4ff', '#ffe4a1', '#a8e6cf']
      const newBalloons = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        size: 30 + Math.random() * 40,
      }))
      setBalloons(newBalloons)
      setTimeout(() => setBalloons([]), 11000)
    }
  }, [active])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute animate-balloon"
          style={{
            left: `${balloon.x}%`,
            animationDelay: `${balloon.delay}s`,
          }}
        >
          <Balloon
            size={balloon.size}
            style={{ color: balloon.color }}
            fill={balloon.color}
          />
        </div>
      ))}
    </div>
  )
}

// Heart rain component
function HeartRain({ active }: { active: boolean }) {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([])

  useEffect(() => {
    if (active) {
      const newHearts = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
      }))
      setHearts(newHearts)
      setTimeout(() => setHearts([]), 8000)
    }
  }, [active])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-balloon"
          style={{
            left: `${heart.x}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: '6s',
          }}
        >
          <Heart className="text-pink-400 fill-pink-300" size={24} />
        </div>
      ))}
    </div>
  )
}

// Things I love data
const thingsILove = [
  'Your beautiful smile',
  'The way you laugh',
  'How you always make me feel special',
  'Your kind heart',
  'Your amazing hugs',
  'The way you look at me',
  'Your sense of humor',
  'How you support my dreams',
  'Your cute sleepy face',
  'The way you say my name',
  'Your intelligence',
  'How you make every day brighter',
  'Your gentle touch',
  'The way you care about others',
  'Your adorable quirks',
  'How you remember little things',
  'Your voice',
  'The way you hold my hand',
  'Your passion for life',
  'How you make me laugh',
  'Your warm presence',
  'Just... YOU!',
]

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const [revealedCards, setRevealedCards] = useState<number[]>([])
  const [currentSection, setCurrentSection] = useState(0)

  const revealCard = useCallback((index: number) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards((prev) => [...prev, index])
    }
  }, [revealedCards])

  const triggerCelebration = useCallback(() => {
    setShowConfetti(true)
    setShowBalloons(true)
    setShowHearts(true)
    setTimeout(() => {
      setShowConfetti(false)
      setShowBalloons(false)
      setShowHearts(false)
    }, 10000)
  }, [])

  useEffect(() => {
    // Initial celebration
    setTimeout(triggerCelebration, 1000)
  }, [triggerCelebration])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const newSection = Math.floor(scrollY / (windowHeight * 0.5))
      if (newSection !== currentSection) {
        setCurrentSection(newSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentSection])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100 overflow-x-hidden">
      <Confetti active={showConfetti} />
      <FloatingBalloons active={showBalloons} />
      <HeartRain active={showHearts} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 animate-float">
            <Sparkles className="text-yellow-400" size={32} />
          </div>
          <div className="absolute top-20 right-20 animate-float-delayed">
            <Star className="text-purple-400 fill-purple-300" size={28} />
          </div>
          <div className="absolute bottom-40 left-20 animate-float-delayed">
            <Heart className="text-pink-400 fill-pink-300" size={36} />
          </div>
          <div className="absolute top-40 right-10 animate-float">
            <Music className="text-blue-400" size={28} />
          </div>
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto">
          <div className="animate-bounce-in">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full text-white font-semibold mb-6 shadow-lg">
              <Sparkles className="inline-block mr-2" size={18} />
              Special Day
              <Sparkles className="inline-block ml-2" size={18} />
            </span>
          </div>

          <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4 animate-slide-up drop-shadow-sm">
            Happy 22nd Birthday!
          </h1>

          <p className="text-xl md:text-2xl text-pink-600 font-semibold mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            To the most amazing boyfriend in the world
          </p>

          <div className="relative mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <img
              src="/hero-cake.jpg"
              alt="Birthday Cake"
              className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl glow-pink"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Cake className="text-pink-500" size={24} />
                <span className="text-pink-600 font-bold">Make a wish!</span>
                <Cake className="text-pink-500" size={24} />
              </div>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={triggerCelebration}
              className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white text-lg px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105"
            >
              <Gift className="mr-2" size={24} />
              Click for a Surprise!
              <Gift className="ml-2" size={24} />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-pink-400 text-sm font-semibold">Scroll down for more love</div>
        </div>
      </section>

      {/* 22 Things I Love About You Section */}
      <section className="min-h-screen py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-script text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
              22 Things I Love About You
            </h2>
            <p className="text-pink-600 text-lg">Click each card to reveal a reason why I love you</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {thingsILove.map((thing, index) => (
              <div
                key={index}
                onClick={() => revealCard(index)}
                className={`
                  relative aspect-square rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105
                  ${revealedCards.includes(index)
                    ? 'bg-gradient-to-br from-pink-300 to-purple-300 shadow-lg glow-pink'
                    : 'bg-gradient-to-br from-pink-100 to-purple-100 shadow-md hover:shadow-xl'
                  }
                `}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                  {revealedCards.includes(index) ? (
                    <>
                      <Heart className="text-white mb-2 animate-heartbeat" size={24} fill="white" />
                      <p className="text-white text-xs md:text-sm font-semibold leading-tight">
                        {thing}
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl md:text-4xl font-bold text-pink-400">{index + 1}</span>
                      <Heart className="text-pink-300 mt-2" size={20} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-pink-500 text-lg font-semibold">
              {revealedCards.length === thingsILove.length
                ? 'You are absolutely perfect to me!'
                : `Revealed ${revealedCards.length} of ${thingsILove.length} reasons`}
            </p>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="min-h-screen py-20 px-4 relative bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-4 right-4 animate-float">
              <Heart className="text-pink-300" size={40} fill="#ffb6c1" />
            </div>
            <div className="absolute bottom-4 left-4 animate-float-delayed">
              <Star className="text-purple-300" size={35} fill="#d8c4ff" />
            </div>

            <div className="text-center mb-8">
              <img
                src="/couple-silhouette.jpg"
                alt="Couple"
                className="w-48 h-64 mx-auto rounded-2xl shadow-lg object-cover mb-6"
              />
              <h2 className="font-script text-3xl md:text-5xl text-pink-500 mb-2">My Dearest Love</h2>
            </div>

            <div className="space-y-4 text-pink-700 text-lg leading-relaxed">
              <p>
                Happy 22nd birthday to the person who makes my heart skip a beat every single day. 
                From the moment I met you, I knew my life would never be the same—and I'm so grateful 
                for every moment we've shared together.
              </p>
              <p>
                You bring so much joy, laughter, and love into my life. Your smile brightens even 
                my darkest days, and your hugs feel like home. I cherish every memory we've created 
                and look forward to making countless more with you.
              </p>
              <p>
                On this special day, I want you to know how incredibly loved and appreciated you are. 
                You deserve all the happiness in the world, and I promise to do my best to make sure 
                you feel that love every single day.
              </p>
              <p className="font-script text-2xl text-pink-500 text-center mt-8">
                Forever and always, with all my love
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Heart className="text-pink-400 animate-heartbeat" size={32} fill="#ff9eb5" />
              <Heart className="text-purple-400 animate-heartbeat" size={32} fill="#c8b4ff" style={{ animationDelay: '0.2s' }} />
              <Heart className="text-pink-400 animate-heartbeat" size={32} fill="#ff9eb5" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Memories Section */}
      <section className="min-h-screen py-20 px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-script text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
            Our Sweet Memories
          </h2>

          <div className="relative mb-12">
            <img
              src="/memory-frame.jpg"
              alt="Memory Frame"
              className="w-full max-w-3xl mx-auto rounded-3xl shadow-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Heart, text: 'First Date', color: 'text-pink-500' },
              { icon: Star, text: 'First Kiss', color: 'text-purple-500' },
              { icon: Sparkles, text: 'Adventures', color: 'text-yellow-500' },
            ].map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 transform transition hover:scale-105"
              >
                <item.icon className={`${item.color} mx-auto mb-3`} size={40} />
                <p className="text-pink-700 font-semibold text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gifts Section */}
      <section className="min-h-screen py-20 px-4 relative bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-script text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
            Birthday Wishes
          </h2>

          <div className="relative mb-12">
            <img
              src="/gifts.jpg"
              alt="Gifts"
              className="w-64 h-64 mx-auto rounded-3xl shadow-xl glow-purple"
            />
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6">
              My Wishes for You
            </h3>

            <div className="space-y-4">
              {[
                'May all your dreams come true',
                'May you always be surrounded by love',
                'May success follow you everywhere',
                'May you stay healthy and happy',
                'May our love grow stronger each day',
              ].map((wish, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 text-pink-700 text-lg"
                >
                  <Gift className="text-pink-400 flex-shrink-0" size={20} />
                  <span>{wish}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-pink-200">
              <p className="font-script text-3xl text-pink-500">
                Happy Birthday, My Love!
              </p>
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: 22 }).map((_, i) => (
                  <Heart
                    key={i}
                    className="text-pink-400"
                    size={16}
                    fill="#ff9eb5"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={triggerCelebration}
            className="mt-12 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white text-lg px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            <Sparkles className="mr-2" size={24} />
            Celebrate Again!
            <Sparkles className="ml-2" size={24} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center bg-gradient-to-t from-pink-100 to-purple-50">
        <div className="max-w-2xl mx-auto">
          <Heart className="text-pink-400 mx-auto mb-4 animate-heartbeat" size={48} fill="#ff9eb5" />
          <p className="font-script text-2xl text-pink-500 mb-2">
            Made with love for you
          </p>
          <p className="text-pink-400">
            Happy 22nd Birthday!
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
