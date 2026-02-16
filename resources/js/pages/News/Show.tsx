import React from 'react';
import { News } from '@/types/models';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/app/MainLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface NewsShowProps {
  newsItem: News;
}

const formatDateFull = (dateString: string | null): string => {
  if (!dateString) return 'Не указано';
  try {
    return format(parseISO(dateString), 'd MMMM yyyy, HH:mm', { locale: ru });
  } catch {
    return "Invalid date";
  }
};

export default function Show({ newsItem }: NewsShowProps) {
  return (
    <MainLayout>
      <Head title={newsItem.title} />
      <div className="flex justify-center py-10 px-2 sm:px-6 lg:px-0 bg-background min-h-[80vh]">
        <Card className="w-full max-w-2xl shadow-xl border border-border/60 rounded-3xl bg-background/90 backdrop-blur-md">
          {newsItem.image_url && (
            <div className="aspect-video w-full overflow-hidden rounded-t-3xl bg-muted">
              <img
                src={newsItem.image_url}
                alt={newsItem.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          )}
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-1">
              {newsItem.title}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Опубликовано: {formatDateFull(newsItem.created_at)}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 pt-2">
            <div
              className="prose dark:prose-invert max-w-none text-foreground text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
            <div className="mt-10 pt-6 border-t border-border/60 flex flex-col items-center">
              <p className="text-sm text-muted-foreground">
                Кнопки "Поделиться" и SEO теги будут здесь.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}