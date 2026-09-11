// A decisão de mídia do `CarrosselContinuo`, separada do efeito.
//
// O carrossel não pode manter os sete vídeos da listagem vivos ao mesmo tempo:
// cada `<video>` com fonte anexada segura um decodificador, e o navegador tem
// um teto pequeno deles — passando do teto tudo cai para decodificação em
// software, que era a travada da home. Então a fonte é anexada perto do centro
// e devolvida longe dele, e quem decide qual card recebe o quê é esta função.
//
// Ela é pura de propósito: recebe o retrato do momento e devolve **uma** ação,
// nunca a lista toda. Uma por vez é o que espalha as trocas de fonte por vários
// tiques em vez de despejá-las no mesmo instante, e ser pura é o que permite
// simular a fita inteira (deriva, arrasto, arremesso) sem navegador.

// Distância de `valor` até zero pelo caminho mais curto de um círculo de `n`
// posições: o resultado fica em (-n/2, n/2]. É a única peça de matemática que o
// modo contínuo precisa.
export const envolver = (valor, n) => {
  const resto = ((valor % n) + n) % n
  return resto > n / 2 ? resto - n : resto
}

// Distância (em cards) em que o vídeo do card recebe a fonte, em que ele toca,
// e em que ele devolve o decodificador.
//
// Os limiares são curtos porque o card não depende mais do vídeo para ter
// imagem: o `poster` cobre todo o intervalo em que a fonte não está anexada
// (ver `lib/videoPoster.js`). Antes o vídeo precisava chegar cedo — o card
// subia vazio sem ele — e só saía tarde, o que mantinha cinco fontes vivas de
// uma vez. Com `carrega` em 1,35 os candidatos são exatamente os três cards do
// meio, e a folga até `descarrega` é histerese: sem ela o card na fronteira
// soltaria e recarregaria a fonte a cada passagem.
//
// `max` é um teto de fontes simultâneas independente da geometria. Com as
// distâncias acima ele não chega a morder numa tela comum; existe para que
// monitor ultralargo (que traz mais card para a cena) não consiga estourar o
// teto de decodificadores do navegador por conta própria.
//
// `margemTroca` é a histerese da vez de tocar: quem já está tocando só entrega
// a vez quando o vizinho estiver mais perto do centro por essa margem. Sem ela,
// a fita pousada exatamente no meio do caminho entre dois cards (o ponteiro em
// cima congela `pos` onde estiver) trocaria de vídeo a cada passagem.
export const LIMITES_MIDIA = {
  carrega: 1.35,
  toca: 0.85,
  descarrega: 2.1,
  margemTroca: 0.12,
  max: 3,
}

// Devolve a próxima ação de mídia, ou `null` quando não há nada a fazer.
//
// `carregados` e `tocando` são o estado real dos elementos; `temFonte[i]` diz
// se aquele card tem vídeo para anexar. A ordem das regras é a ordem de
// importância: tocar e pausar primeiro, porque é o que o visitante percebe;
// soltar antes de carregar, para que o teto seja respeitado abrindo vaga em vez
// de recusar o card que chegou ao centro.
export function proximaAcaoDeMidia({
  n,
  pos,
  temFonte,
  carregados,
  tocando,
  limites = LIMITES_MIDIA,
}) {
  const distancia = (i) => Math.abs(envolver(i - pos, n))

  // 1. Tocar e pausar. **Um vídeo por vez**: o do card mais perto do centro.
  //
  // Não é "todo card a menos de `toca` do centro toca", que é o que a versão
  // anterior fazia: com `toca` em 0,85 e os cards a uma unidade de distância,
  // a fita passando entre dois deixava os dois tocando, e dois decodificadores
  // de 1080p no ar é exatamente a carga que derruba o navegador para
  // decodificação em software.
  let alvo = -1
  let menor = limites.toca
  for (let i = 0; i < n; i++) {
    if (!carregados[i]) continue
    const d = distancia(i)
    if (d < menor) {
      menor = d
      alvo = i
    }
  }

  const atual = tocando.indexOf(true)
  if (
    atual >= 0 &&
    carregados[atual] &&
    distancia(atual) < limites.toca &&
    distancia(atual) - menor < limites.margemTroca
  ) {
    alvo = atual
  }

  // Pausar vem antes de tocar, e uma ação por vez: assim não existe nem o
  // instante em que os dois estão tocando.
  for (let i = 0; i < n; i++) {
    if (tocando[i] && i !== alvo) return { tipo: 'pausar', i }
  }
  if (alvo >= 0 && !tocando[alvo]) return { tipo: 'tocar', i: alvo }

  // 2. Soltar a fonte mais distante que já passou do limiar.
  let soltar = -1
  let maisLonge = limites.descarrega
  for (let i = 0; i < n; i++) {
    if (!carregados[i]) continue
    const d = distancia(i)
    if (d > maisLonge) {
      maisLonge = d
      soltar = i
    }
  }
  if (soltar >= 0) return { tipo: 'soltar', i: soltar }

  // 3. Anexar a fonte do card mais próximo que ainda não tem.
  let carregar = -1
  let maisPerto = limites.carrega
  for (let i = 0; i < n; i++) {
    if (!temFonte[i] || carregados[i]) continue
    const d = distancia(i)
    if (d < maisPerto) {
      maisPerto = d
      carregar = i
    }
  }
  if (carregar < 0) return null

  let vivos = 0
  for (let i = 0; i < n; i++) if (carregados[i]) vivos++
  if (vivos < limites.max) return { tipo: 'carregar', i: carregar }

  // Teto batido: abre vaga soltando o mais distante — mas só se ele já estiver
  // fora da faixa de carga, senão os dois ficariam se expulsando a cada tique.
  let fora = -1
  let dist = limites.carrega
  for (let i = 0; i < n; i++) {
    if (!carregados[i]) continue
    const d = distancia(i)
    if (d > dist) {
      dist = d
      fora = i
    }
  }
  return fora >= 0 ? { tipo: 'soltar', i: fora } : null
}
