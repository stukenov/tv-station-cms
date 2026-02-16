import MainLayout from '@/layouts/app/MainLayout'
import { Head, Link } from '@inertiajs/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HomePage = () => {
  return (
    <>
      <Head title="Insport" />
      <MainLayout>
        {/* Hero Section */}
        <section className="w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/60">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <h1 className={cn(
              "text-center font-semibold",
              "text-5xl md:text-6xl tracking-tight",
              "bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent",
              "mb-6"
            )}>
              DSL — Новости. Эфир. Проекты.
            </h1>
            <p className="text-center text-lg md:text-2xl text-muted-foreground max-w-2xl mb-8">
              Ваш надежный источник новостей и развлечений
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-md">
                <Link href="/novosti">Смотреть новости</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-2 border-primary/30">
                <Link href="/online">Смотреть эфир</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="w-full py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 md:grid-cols-3">
              <Card className={cn(
                "rounded-2xl border-none shadow-none bg-gradient-to-br from-muted/80 to-background/90",
                "hover:scale-[1.025] hover:shadow-xl transition-all duration-200"
              )}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-foreground mb-2">Последние новости</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Будьте в курсе последних событий
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="rounded-full mt-4 px-6">
                    <Link href="/novosti">Читать новости</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className={cn(
                "rounded-2xl border-none shadow-none bg-gradient-to-br from-background/80 to-muted/80",
                "hover:scale-[1.025] hover:shadow-xl transition-all duration-200"
              )}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-foreground mb-2">Прямой эфир</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Смотрите нас в прямом эфире
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="rounded-full mt-4 px-6">
                    <Link href="/online">Смотреть эфир</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className={cn(
                "rounded-2xl border-none shadow-none bg-gradient-to-br from-muted/70 to-background/80",
                "hover:scale-[1.025] hover:shadow-xl transition-all duration-200"
              )}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-foreground mb-2">Проекты</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Изучите наши уникальные проекты
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="rounded-full mt-4 px-6">
                    <Link href="/proekty">Смотреть проекты</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  )
}

export default HomePage