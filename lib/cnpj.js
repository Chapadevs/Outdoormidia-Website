// CNPJ: máscara e validação, compartilhadas pelo formulário (cliente) e pela
// validação do lead (servidor). Sem dependência, para valer nos dois lados.
//
// Desde julho de 2026 a Receita emite CNPJ alfanumérico: as 12 primeiras
// posições aceitam letra maiúscula ou dígito, e só os 2 verificadores seguem
// numéricos. O cálculo é o mesmo módulo 11 de sempre, com cada caractere
// valendo o código ASCII menos 48 (dígito vale o próprio número, 'A' vale 17).
// Os CNPJ só numéricos continuam válidos pela mesma conta.

const TAMANHO = 14
const PESOS_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const PESOS_2 = [6, ...PESOS_1]

// Só o que pode compor um CNPJ, já em caixa alta. Aceita o valor com ou sem
// pontuação e devolve os 14 caracteres crus (ou menos, se estiver incompleto).
export function normalizarCnpj(valor) {
  return String(valor || '')
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, '')
    .slice(0, TAMANHO)
}

// XX.XXX.XXX/XXXX-XX, aplicada sobre o que já foi digitado: serve de máscara
// de input, então nunca completa o que falta nem rejeita valor parcial.
export function formatarCnpj(valor) {
  const crua = normalizarCnpj(valor)
  return crua
    .replace(/^(.{2})(.)/, '$1.$2')
    .replace(/^(.{2})\.(.{3})(.)/, '$1.$2.$3')
    .replace(/^(.{2})\.(.{3})\.(.{3})(.)/, '$1.$2.$3/$4')
    .replace(/^(.{2})\.(.{3})\.(.{3})\/(.{4})(.)/, '$1.$2.$3/$4-$5')
}

function digitoVerificador(caracteres, pesos) {
  const soma = caracteres.reduce(
    (total, c, i) => total + (c.charCodeAt(0) - 48) * pesos[i],
    0
  )
  const resto = soma % 11
  return resto < 2 ? 0 : 11 - resto
}

// Verdadeiro para um CNPJ completo e com os dois verificadores corretos.
// Sequência repetida (00000000000000) passa na conta e é recusada à parte.
export function cnpjValido(valor) {
  const crua = normalizarCnpj(valor)
  if (crua.length !== TAMANHO) return false
  if (!/^[0-9A-Z]{12}\d{2}$/.test(crua)) return false
  if (/^(.)\1+$/.test(crua)) return false

  const base = crua.slice(0, 12).split('')
  const dv1 = digitoVerificador(base, PESOS_1)
  const dv2 = digitoVerificador([...base, String(dv1)], PESOS_2)
  return crua.slice(12) === `${dv1}${dv2}`
}
