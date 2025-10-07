import Link from 'next/link'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-secondary/50 backdrop-blur bg-primary/80">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">Ben Prisby</Link>
        <nav className="flex items-center gap-5 text-sm text-foreground/80">
          {nav.map(item => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}


