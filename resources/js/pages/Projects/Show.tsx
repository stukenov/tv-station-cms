import React from 'react';
import { Project, Video } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/app/MainLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Define component props
interface ProjectWithVideos extends Project {
    videos?: Video[]; // Videos might not be loaded
}

interface ProjectShowProps {
    project: ProjectWithVideos;
}

export default function Show({ project }: ProjectShowProps) {
    // Default to an empty array if videos are not present
    const videos = project.videos || [];

    return (
        <MainLayout>
            <Head title={project.title} />

            <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
                {/* Project Header Section */}
                <section className="mb-8 md:mb-10">
                    {/* Optional Project Cover Image */}
                    {project.cover_image_url && (
                        <div className="mb-6 md:mb-8 aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-lg bg-muted shadow-lg">
                            <img 
                                src={project.cover_image_url} 
                                alt={`Обложка проекта ${project.title}`} 
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    )}
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
                            {project.title}
                        </h1>
                        {project.description && (
                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mx-auto">
                                <p>{project.description}</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Videos Section */}
                {videos.length > 0 && (
                    <section>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center md:text-left">
                            Видео в этом проекте
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {videos.map((video) => (
                                <Link key={video.id} href={route('videos.show', video.slug)} className="group block">
                                    <Card className="h-full overflow-hidden transition-shadow duration-200 group-hover:shadow-lg">
                                        <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-t-lg">
                                            {video.thumbnail_url ? (
                                                <img
                                                    src={video.thumbnail_url}
                                                    alt={video.title}
                                                    className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs p-2">
                                                    [Видеопревью]
                                                </div>
                                            )}
                                        </AspectRatio>
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                                {video.title}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
                {videos.length === 0 && project.description && (
                     <div className="text-center py-10 text-muted-foreground">
                        <p>Для этого проекта еще не опубликовано ни одного видео.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}