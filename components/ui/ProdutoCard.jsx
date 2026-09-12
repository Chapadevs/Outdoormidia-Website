import CoverMedia from '@/components/ui/CoverMedia'

// Componente C7 do handoff: a anatomia fixa do produto (kicker em caixa alta,
// nome, copy, linha de specs). O seletor de tecnologia (C4) saiu do card em
// 12/09/2026, a pedido do cliente: a foto real de cada tecnologia substitui o
// par de pílulas ESTÁTICO/DIGITAL, que ficava sem sentido enquanto
// `specsPor.estatico` seguir vazio (pendência 2 do handoff). `imagemPor` é o
// mapa tecnologia → foto de `lib/produtos.js`; onde só uma tecnologia tem foto
// (Poster Sight, Billboard), sobe uma imagem só, sem legenda de tecnologia.
const ROTULOS = { estatico: 'Estático', digital: 'Digital' }

export default function ProdutoCard({ produto }) {
  const { name, kicker, text, specs, specsPor, pontos, selo, imagemPor, image, imageAlt, imageRatio } =
    produto

  const ficha = specsPor?.digital ?? specs
  const rotulo = kicker
  const comEndereco = pontos?.filter((p) => p.endereco) ?? []
  const fotos = imagemPor ? Object.entries(imagemPor) : null

  return (
    <article className="ticks reveal flex flex-col rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
      {image && (
        <CoverMedia
          alt={imageAlt}
          className="mb-5"
          label={name}
          ratio={imageRatio || '16/9'}
          sizes="(max-width: 980px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={image}
        />
      )}

      {fotos && (
        <div className={`mb-5 grid gap-3 ${fotos.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {fotos.map(([opcao, foto]) => (
            <div key={opcao}>
              <CoverMedia
                alt={foto.alt}
                label={name}
                ratio="4/3"
                sizes="(max-width: 980px) 50vw, (max-width: 1280px) 25vw, 16vw"
                src={foto.src}
              />
              {fotos.length > 1 && (
                <p className="eyebrow m-0 mt-2 text-ink-soft/70">{ROTULOS[opcao]}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow m-0 text-orange">{rotulo}</p>
        {selo && (
          <span className="shrink-0 rounded-full border border-orange px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-orange">
            {selo}
          </span>
        )}
      </div>

      <h3 className="m-0 mt-3.5 text-[24px] font-extrabold leading-tight tracking-[-0.01em] text-ink max-mob:text-[21px]">
        {name}
      </h3>

      <p className="m-0 mt-4 text-[15.5px] leading-relaxed text-ink-soft">{text}</p>

      {ficha && <p className="m-0 mt-5 text-[13px] leading-relaxed text-ink-soft/85">{ficha}</p>}

      {comEndereco.length > 0 && (
        <ul className="m-0 mt-5 list-none border-t border-line p-0 pt-4">
          {comEndereco.map((ponto) => (
            <li className="mt-2 text-[13px] leading-snug text-ink-soft first:mt-0" key={ponto.name}>
              <span className="font-bold uppercase tracking-[0.06em] text-ink">{ponto.name}</span>{' '}
              {ponto.endereco}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
