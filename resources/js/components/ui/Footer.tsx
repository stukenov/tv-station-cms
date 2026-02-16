import { Link } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface FooterLinkItem {
  href: string
  label: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLinkItem[]
}

const footerSections: FooterSection[] = [
  {
    title: 'О телеканале',
    links: [
      { href: '/o-telekanale', label: 'О нас' },
      { href: '/team', label: 'Команда' },
      { href: '/contacts', label: 'Контакты' },
    ],
  },
  {
    title: 'Программы',
    links: [
      { href: '/novosti', label: 'Новости' },
      { href: '/proekty', label: 'Проекты' },
      { href: '/arhiv', label: 'Архив' },
    ],
  },
  {
    title: 'Юридическая информация',
    links: [
      { href: '/license', label: 'Лицензия' },
      { href: '/partners', label: 'Партнеры' },
      { href: '/privacy', label: 'Конфиденциальность' },
    ],
  },
  {
    title: 'Следите за нами',
    links: [
      { href: '#', label: 'Facebook', external: true },
      { href: '#', label: 'Instagram', external: true },
      { href: '#', label: 'Telegram', external: true },
    ],
  },
]

const socialLinks: FooterLinkItem[] = [
  { href: '#', label: 'Facebook', external: true },
  { href: '#', label: 'Instagram', external: true },
  { href: '#', label: 'Telegram', external: true },
]

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/60 shadow-[0_-1px_24px_0_rgba(0,0,0,0.04)]">
      <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          <div className="flex flex-col gap-4 lg:w-1/4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                Insport
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mt-2">
              DSL — Новости. Эфир. Проекты. Ваш надежный источник новостей и развлечений.
            </p>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "inline-block text-sm rounded-md px-2.5 py-1.5 transition-colors duration-200",
                    "text-muted-foreground hover:text-primary hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  )}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 select-none">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "inline-block text-sm rounded-md px-2.5 py-1.5 transition-colors duration-200",
                          "text-muted-foreground hover:text-primary hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                        )}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-10 bg-border/60" />
        <div>
          <p className="text-center text-xs text-muted-foreground font-medium tracking-tight">
            © {new Date().getFullYear()} Insport. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer