import React from "react";
import { News, Project } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/app/MainLayout";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HomeProps {
  latestNews: News[];
  featuredNews: News[];
  projects: Project[];
}

export default function Home({ latestNews, featuredNews, projects }: HomeProps) {
  const mainFeaturedNews = featuredNews.length > 0 ? featuredNews[0] : null;
  const smallFeaturedNews =
    featuredNews.length > 1 ? featuredNews.slice(1, 7) : [];

  return (
    <MainLayout>
      <Head title="Главная" />
      <div className="container mx-auto px-4 py-14 space-y-24">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center gap-7">
          <h1 className="text-center font-semibold text-5xl md:text-7xl tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent drop-shadow-lg">
            DSL — Новости. Эфир. Проекты.
          </h1>
          <p className="text-center text-lg md:text-2xl text-muted-foreground max-w-2xl font-medium">
            Ваш надежный источник новостей и развлечений
          </p>
          <div className="flex gap-4 mt-4">
            <Button asChild size="lg" className="rounded-full px-8 shadow-md">
              <Link href="/novosti">Смотреть новости</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-2 border-primary/30">
              <Link href="/online">Смотреть эфир</Link>
            </Button>
          </div>
        </section>

        {/* Новости */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold tracking-tight">Новости</h2>
            <Button asChild variant="ghost" className="rounded-full px-7 text-lg font-medium">
              <Link href={route("news.index")}>Все новости</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Featured News */}
            <div className="lg:col-span-2 flex flex-col gap-7">
              {mainFeaturedNews && (
                <Card className="overflow-hidden group border-none shadow-xl bg-gradient-to-br from-background/90 to-muted/80 transition-all duration-200 hover:scale-[1.01]">
                  <Link
                    href={route("news.show", mainFeaturedNews.slug)}
                    className="block focus:outline-none"
                  >
                    <div className="aspect-[16/9] w-full bg-muted flex items-center justify-center overflow-hidden">
                      {mainFeaturedNews.image_url ? (
                        <img
                          src={mainFeaturedNews.image_url}
                          alt={mainFeaturedNews.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-base p-4 text-center text-muted-foreground">
                          Нет изображения
                        </span>
                      )}
                    </div>
                    <CardContent className="p-7">
                      <h3 className="text-3xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {mainFeaturedNews.title}
                      </h3>
                    </CardContent>
                  </Link>
                </Card>
              )}

              {smallFeaturedNews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {smallFeaturedNews.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden group border-none shadow bg-background/90 transition-all duration-200 hover:scale-[1.015]"
                    >
                      <Link
                        href={route("news.show", item.slug)}
                        className="block focus:outline-none"
                      >
                        <div className="aspect-video w-full bg-muted flex items-center justify-center overflow-hidden">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-xs p-2 text-center text-muted-foreground">
                              Нет изображения
                            </span>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h4 className="text-lg font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}

              {!mainFeaturedNews && smallFeaturedNews.length === 0 && (
                <div className="bg-card border rounded-2xl p-10 text-center text-muted-foreground flex items-center justify-center min-h-[200px]">
                  <p className="text-lg">Нет главных новостей для отображения.</p>
                </div>
              )}
            </div>

            {/* Latest News */}
            <div className="lg:col-span-1">
              <Card className="h-full flex flex-col border-none shadow bg-background/90">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Последние новости
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-2">
                  {latestNews.length > 0 ? (
                    <ul className="space-y-2">
                      {latestNews.slice(0, 10).map((newsItem, index) => (
                        <React.Fragment key={newsItem.id}>
                          <li>
                            <Link
                              href={route("news.show", newsItem.slug)}
                              className="text-lg text-foreground hover:text-primary transition-colors line-clamp-2 font-medium"
                            >
                              {newsItem.title}
                            </Link>
                          </li>
                          {index <
                            latestNews.slice(0, 10).length - 1 && (
                            <Separator className="my-2" />
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-center py-4 text-lg">
                      Нет доступных новостей.
                    </p>
                  )}
                </CardContent>
                {latestNews.length > 0 && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="w-full rounded-full font-medium"
                    >
                      <Link href={route("news.index")}>Все новости</Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </section>

        {/* Проекты */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold tracking-tight">Проекты</h2>
            <Button asChild variant="ghost" className="rounded-full px-7 text-lg font-medium">
              <Link href={route("projects.index")}>Все проекты</Link>
            </Button>
          </div>
          {projects.length > 0 ? (
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {projects.map((project) => (
                    <CarouselItem
                      key={project.id}
                      className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                    >
                      <Card className="h-full flex flex-col overflow-hidden border-none shadow bg-background/90 transition-all duration-200 hover:scale-[1.015]">
                        <CardContent className="flex flex-col items-start p-3 flex-grow">
                          <Link
                            href={route("projects.show", project.slug)}
                            className="block w-full group focus:outline-none"
                          >
                            <div className="aspect-[9/16] w-full rounded-xl mb-2 flex items-center justify-center bg-muted overflow-hidden">
                              {project.cover_image_url ? (
                                <img
                                  src={project.cover_image_url}
                                  alt={project.title}
                                  className="object-cover w-full h-full"
                                  loading="lazy"
                                />
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  Нет изображения
                                </span>
                              )}
                            </div>
                            <span className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </span>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-40px] top-1/2 -translate-y-1/2 fill-background hidden sm:inline-flex" />
                <CarouselNext className="absolute right-[-40px] top-1/2 -translate-y-1/2 fill-background hidden sm:inline-flex" />
              </Carousel>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-6 text-lg">
              Нет доступных проектов.
            </p>
          )}
        </section>
      </div>
    </MainLayout>
  );
}