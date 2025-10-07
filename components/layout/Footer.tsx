export default function Footer() {
  return (
    <footer className="mt-16 border-t border-secondary/50">
      <div className="container mx-auto py-6 text-sm text-foreground/60">
        <p>© {new Date().getFullYear()} Ben Prisby. All rights reserved.</p>
      </div>
    </footer>
  )
}


