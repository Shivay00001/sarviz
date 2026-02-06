import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b bg-background px-4 md:px-6">
        <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Sarviz</span>
          <span className="font-bold">Sarviz</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Button asChild size="sm">
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40 grid place-items-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Grow Your Local Business on Autopilot
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  AI-powered growth plans, automated ads, and lead management. All in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 grid place-items-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">AI Growth Plans</h3>
                <p className="text-muted-foreground">Get a personalized marketing strategy generated instantly based on your business profile.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Ads Manager</h3>
                <p className="text-muted-foreground">Launch and manage campaigns across Google and Social Media with ease.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Smart CRM</h3>
                <p className="text-muted-foreground">Track every lead and never miss a customer with our built-in lead management system.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 Sarviz Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
