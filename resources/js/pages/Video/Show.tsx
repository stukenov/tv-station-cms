import React from 'react';
import { Video } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { format, parseISO } from 'date-fns'; // For formatting date
import { ru } from 'date-fns/locale'; // Import Russian locale
import MainLayout from '@/layouts/app/MainLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from '@/components/ui/button'; // Import Button for links

interface VideoShowProps {
    video: Video;
}

// Helper to format date (can be moved to utils)
const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Дата не указана';
    try {
        // Use ru locale for formatting
        return format(parseISO(dateString), 'd MMMM yyyy г.', { locale: ru });
    } catch (error) {
        console.error("Error formatting date:", error);
        return 'Неверный формат даты';
    }
};

export default function Show({ video }: VideoShowProps) {
    return (
        <MainLayout>
            <Head title={video.title} />

            <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
                            {video.title}
                        </CardTitle>
                        <CardDescription>
                            Опубликовано: {formatDate(video.published_at)}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {/* Video Player Section */}
                        {video.video_url ? (
                            <div className="mb-6">
                                <AspectRatio ratio={16 / 9} className="bg-muted">
                                    {/* Basic video tag - replace with actual player later */}
                                    <video
                                        controls
                                        src={video.video_url}
                                        className="w-full h-full rounded-md" // Added styling
                                    >
                                        Ваш браузер не поддерживает тег video.
                                    </video>
                                </AspectRatio>
                            </div>
                        ) : (
                            <div className="mb-6 p-4 text-center bg-muted rounded-md">
                                <p className="text-muted-foreground">Видео недоступно.</p>
                            </div>
                        )}

                        {/* Description Section */}
                        {video.description && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Описание</h2>
                                {/* Using prose for potential markdown/html content styling */}
                                <div className="prose dark:prose-invert max-w-none text-foreground">
                                    <p>{video.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Links Section */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t">
                            {/* Link back to project if applicable - needs project data loaded */}
                            {/* {video.project && (
                                <Button variant="link" asChild className="p-0 h-auto">
                                    <Link href={route('projects.show', video.project.slug)}>
                                        К проекту: {video.project.title}
                                    </Link>
                                </Button>
                            )} */}

                            {/* Link back to archive */}
                            <Button variant="outline" asChild>
                                <Link href={route('archive.index')}>Назад в Архив</Link>
                            </Button>

                            {/* Placeholder for future Share buttons */}
                             <div className="mt-4 sm:mt-0 sm:ml-auto">
                                 {/* <ShareButtons url={route('videos.show', video.slug)} title={video.title} /> */}
                                 <p className="text-sm text-muted-foreground">Кнопки "Поделиться" будут здесь.</p>
                             </div>
                        </div>

                        {/* Placeholder for future SEO tags component */}
                        {/* <SeoTags type="VideoObject" data={video} /> */}
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}