import Link from 'next/link'
import CoverMedia from '@/components/ui/CoverMedia'

// Componente C7 do handoff: a anatomia fixa do card de ativo. Kicker em caixa
// alta, nome, copy e linha de specs, sempre nessa ordem.
//
// Três campos são opcionais e somem quando não existem, em vez de virar espaço
// vazio ou aviso de dado faltando:
//
// - `specs`  — a linha técnica ou o endereço, quando o ativo tem um só
// - `pontos` — os endereços do ativo que existe em mais de um lugar (Cascata
//              Square tem quatro, Jardim Vertical tem dois). Cada ponto traz a
//              própria foto; ponto sem `endereco` mostra só a imagem, que é o
//              caso do segundo Jardim Vertical enquanto o dado não vem
// - `verEm`  — o link para a outra rota onde o mesmo ativo aparece. É o par
//              visível da regra C8: o texto é único, o leitor é que circula
const CARD_SIZES = '(max-width: 560px) 100vw, (max-width: 980px) 50vw, 560px'
const PONTO_SIZES = '(max-width: 560px) 100vw, 280px'

export default function AtivoCard({ ativo, prioridadeImagem = false }) {
  const { name, kicker, text, specs, pontos, image, imageAlt, verEm } = ativo

  return (
    <article className="ticks reveal flex flex-col overflow-hidden rounded-[16px] border border-line bg-white">
      <CoverMedia
        alt={imageAlt}
        label={name}
        priority={prioridadeImagem}
        ratio="2/1"
        sizes={CARD_SIZES}
        src={image}
        className="rounded-none border-0"
      />

      <div className="flex flex-1 flex-col border-t border-line p-7 max-mob:p-6">
        <p className="eyebrow m-0 text-orange">{kicker}</p>
        <h3 className="m-0 mt-3.5 text-[24px] font-extrabold leading-tight tracking-[-0.01em] text-ink max-mob:text-[21px]">
          {name}
        </h3>
        <p className="m-0 mt-4 text-[15.5px] leading-relaxed text-ink-soft">{text}</p>

        {specs && (
          <p className="m-0 mt-5 text-[13px] leading-relaxed text-ink-soft/85">{specs}</p>
        )}

        {pontos?.length > 0 && (
          <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-4 p-0 max-mob:grid-cols-1">
            {pontos.map((ponto, i) => (
              <li className="flex flex-col gap-2.5" key={`${ponto.name}-${i}`}>
                <CoverMedia
                  alt={ponto.imageAlt}
                  label={ponto.name}
                  ratio="16/9"
                  sizes={PONTO_SIZES}
                  src={ponto.image}
                />
                <div>
                  <p className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-ink">
                    {ponto.name}
                  </p>
                  {ponto.endereco && (
                    <p className="m-0 mt-1 text-[13px] leading-snug text-ink-soft">
                      {ponto.endereco}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {verEm && (
          <Link
            className="mt-auto flex items-center gap-2 pt-7 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 hover:text-orange"
            href={verEm.href}
          >
            {verEm.label}
            <span aria-hidden className="text-base">
              →
            </span>
          </Link>
        )}
      </div>
    </article>
  )
}
