export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mi Portfolio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}