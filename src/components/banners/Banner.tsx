'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from 'react'
import { Button } from '@/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Banner = {
  id: string
  title: string
  subtitle: string
  image: string
  link: string
}

type BannerProps = {
  banners: Banner[]
}

export function Banner({ banners }: BannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative flex-[0_0_100%] min-w-0"
            >
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={banner.image ? { backgroundImage: `url(${banner.image})` } : { backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {!banner.image && (
                    <span className="text-4xl text-gray-500">Image Placeholder</span>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <h2 className="max-w-xl text-4xl font-bold text-white">
                      {banner.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-lg text-white/90">
                      {banner.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </Button>
    </div>
  )
}
