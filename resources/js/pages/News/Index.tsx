import React from 'react';
import { News } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { Paginator, PaginatorLink } from '@/types/paginator';
import MainLayout from '@/layouts/app/MainLayout';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface NewsIndexProps {
  news: Paginator<News>;
}

const ShadcnPagination = ({ links, className }: { links: PaginatorLink[], className?: string }) => {
  if (!links || links.length <= 3) return null;

  const prevLink = links[0];
  const nextLink = links[links.length - 1];
  const pageLinks = links.slice(1, -1);

  return (
    <Pagination className={cn("mt-10", className)}>
      <PaginationContent>
        <PaginationItem>
          {prevLink.url ? (
            <PaginationPrevious
              href={prevLink.url}
              className="rounded-full bg-muted hover:bg-accent/60 transition-colors"
            />
          ) : (
            <PaginationPrevious className="rounded-full bg-muted opacity-40 cursor-not-allowed" />
          )}
        </PaginationItem>
        {pageLinks.map((link, index) => (
          <PaginationItem key={index}>
            {link.url && !link.label.includes('...') ? (
              <PaginationLink
                href={link.url}
                isActive={link.active}
                className={cn(
                  "rounded-full min-w-[40px] h-10 flex items-center justify-center font-semibold text-base transition-colors",
                  link.active
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted text-foreground hover:bg-accent/60"
                )}
              >
                {link.label}
              </PaginationLink>
            ) : link.label.includes('...') ? (
              <PaginationEllipsis className="text-muted-foreground" />
            ) : (
              <PaginationLink
                isActive={link.active}
                className={cn(
                  "rounded-full min-w-[40px] h-10 flex items-center justify-center font-semibold text-base",
                  link.active
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted text-foreground"
                )}
              >
                {link.label}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          {nextLink.url ? (
            <PaginationNext
              href={nextLink.url}
              className="rounded-full bg-muted hover:bg-accent/60 transition-colors"
            />
          ) : (
            <PaginationNext className="rounded-full bg-muted opacity-40 cursor-not-allowed" />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'd MMMM yyyy', { locale: ru });
  } catch {
    return "Invalid date";
  }
};

const NewsPage = ({ news }: NewsIndexProps) => {
  return (
    <MainLayout>
      <Head title="Новости" />
      <div className="container mx-auto px-4 py-12">
        <section className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 text-foreground/90">Новости</h1>
          <p className="text-lg text-muted-foreground">
            Будьте в курсе последних событий и новостей
          </p>
        </section>
        <section>
          {news.data.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {news.data.map((item) => (
                <Link
                  key={item.id}
                  href={route('news.show', item.slug)}
                  className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl"
                >
                  <Card className="h-full flex flex-col bg-background/80 border border-border/60 rounded-2xl shadow-none hover:shadow-xl transition-shadow duration-200 overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="aspect-video w-full bg-muted flex items-center justify-center text-sm text-muted-foreground overflow-hidden">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-xs p-2 text-center">Изображение отсутствует</span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 flex-grow flex flex-col">
                      <CardTitle className="text-lg font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {item.title}
                      </CardTitle>
                    </CardContent>
                    <CardFooter className="p-5 pt-0 flex items-center justify-between text-xs text-muted-foreground">
                      <time dateTime={item.created_at || undefined}>
                        {formatDate(item.created_at)}
                      </time>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground text-lg">
              Нет доступных новостей.
            </div>
          )}
          <ShadcnPagination links={news.links} />
        </section>
      </div>
    </MainLayout>
  );
}

export default NewsPage;