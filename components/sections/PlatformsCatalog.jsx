'use client'

import { useEffect, useState } from 'react'
import CarrosselContinuo from '@/components/ui/CarrosselContinuo'
import PlatformShowcaseCard from '@/components/ui/PlatformShowcaseCard'

// Catálogo das plataformas no mesmo coverflow contínuo da home: um card em
// tamanho cheio no centro, os vizinhos girados para dentro em 3D. Substituiu
// o card com diagrama de formatos e o modo lista, para a leitura do catálogo
// ser a mesma nas duas páginas.
//
// `inicial` chega em 0 (igual à home) e só muda se a página abrir numa âncora
// de plataforma (`/plataformas#mub`, vinda de qualquer link externo): o
// hash só existe no navegador, então a centralização acontece depois da
// montagem, sem quebrar a hidratação.
export default function PlatformsCatalog({ plataformas }) {
  const [inicial, setInicial] = useState(0)

  useEffect(() => {
    const daHash = () => {
      const hash = window.location.hash.slice(1)
      const i = plataformas.findIndex((p) => p.slug === hash)
      if (i >= 0) setInicial(i)
    }
    daHash()
    window.addEventListener('hashchange', daHash)
    return () => window.removeEventListener('hashchange', daHash)
  }, [plataformas])

  return (
    <>
      <p className="reveal mb-[26px] max-w-[52ch] text-[14.5px] leading-relaxed text-ink-soft">
        Arraste para os dois lados, use o trackpad ou as setas do teclado para percorrer as{' '}
        {plataformas.length} plataformas.
      </p>
      <div className="reveal">
        <CarrosselContinuo
          alturaClasse="h-[calc(var(--cw)*0.5625)] max-mob:h-[calc(var(--cw)*1.25)]"
          gap={26}
          inicial={inicial}
          label="Catálogo de plataformas Outdoormídia"
          velocidade={0.055}
          width="min(820px,74vw)"
        >
          {plataformas.map((p) => (
            <PlatformShowcaseCard key={p.slug} p={p} />
          ))}
        </CarrosselContinuo>
      </div>
    </>
  )
}
