import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Sempre importar Link e usePathname daqui, nunca de next/link ou
// next/navigation: estes conhecem o prefixo de locale. O usePathname do Next
// devolveria "/en/sobre", e o seletor de idioma montaria "/es/en/sobre".
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
