'use client'

import { useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Vídeo institucional nasce mudo (autoplay exige isso); o botão libera o áudio
// sob gesto do usuário, sobreposto ao canto do próprio vídeo.
export default function VideoComSom({ src, className = '' }) {
  const t = useTranslations('Widgets')
  const videoRef = useRef(null)
  const [comSom, setComSom] = useState(false)

  const alternar = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = comSom
    setComSom(!comSom)
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className={className}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={alternar}
        aria-label={comSom ? t('desativarSom') : t('ativarSom')}
        aria-pressed={comSom}
        className="radial-reveal absolute right-4 bottom-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-ink/60 text-white [--rr-fill:var(--color-orange)]"
      >
        {comSom ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  )
}
