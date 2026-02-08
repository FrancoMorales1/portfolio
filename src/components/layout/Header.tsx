import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Home</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
            Sobre mí
          </Link>
          <Link href="/#education" className="text-sm font-medium transition-colors hover:text-primary">
            Educación
          </Link>
          <Link href="/#projects" className="text-sm font-medium transition-colors hover:text-primary">
            Proyectos
          </Link>
        </nav>
      </div>
    </header>
  )
}