import { revalidatePath } from 'next/cache'

// As páginas públicas são servidas por ISR (revalidate = 300). Sem invalidação
// explícita, uma edição no admin levaria até 5 min para aparecer. Cada função
// abaixo lista onde aquele tipo de conteúdo é exibido.

export function revalidateBlog(...slugs) {
  revalidatePath('/blog')
  for (const slug of slugs) {
    if (slug) revalidatePath(`/blog/${slug}`)
  }
}

export function revalidateCases() {
  revalidatePath('/')
  revalidatePath('/cases')
  revalidatePath('/plataformas/[slug]', 'page')
}
