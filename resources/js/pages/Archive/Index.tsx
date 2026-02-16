import React from 'react';
import { Video } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { Paginator, PaginatorLink } from '@/types/paginator';
import MainLayout from '@/layouts/app/MainLayout';
import {
    Card,
    CardHeader,
    CardTitle,
    // CardDescription, // Keep if needed for date/description later
    // CardContent, // Keep if needed later
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface ArchiveIndexProps {
    videos: Paginator<Video>;
}

// Helper function to render pagination items using asChild and Inertia Link
const renderPaginationLink = (link: PaginatorLink, index: number) => {
    // Common props for Inertia Link
    const inertiaLinkProps = {
        preserveScroll: true,
        preserveState: true, // Preserve component state (like filters) on navigation
    };

    // Previous Button
    // Decode HTML entities for comparison
    const decodedLabel = document.createElement("textarea");
    decodedLabel.innerHTML = link.label;
    const labelText = decodedLabel.value;

    if (labelText === 'Previous') { // Check decoded label
        return (
            <PaginationItem key={`prev-${index}`}>
                <PaginationPrevious
                    href={link.url ?? '#'} // href is still needed for semantics/fallback
                    aria-disabled={!link.url}
                    tabIndex={!link.url ? -1 : undefined}
                    className={!link.url ? "pointer-events-none opacity-50" : ""}
                    asChild={!!link.url} // Use asChild only if URL exists
                >
                    {/* Render Inertia Link only if it's clickable */}
                    {link.url ? (
                         <Link href={link.url} {...inertiaLinkProps} aria-disabled={!link.url} tabIndex={!link.url ? -1 : undefined}>
                            {/* Content is provided by PaginationPrevious */}
                        </Link>
                    ) : (
                        // Render a span or div if not clickable to maintain layout
                        <span>{/* Content is provided by PaginationPrevious */}</span>
                    )}
                </PaginationPrevious>
            </PaginationItem>
        );
    }

    // Next Button
    if (labelText === 'Next') { // Check decoded label
        return (
            <PaginationItem key={`next-${index}`}>
                <PaginationNext
                    href={link.url ?? '#'}
                    aria-disabled={!link.url}
                    tabIndex={!link.url ? -1 : undefined}
                    className={!link.url ? "pointer-events-none opacity-50" : ""}
                    asChild={!!link.url} // Use asChild only if URL exists
                >
                     {/* Render Inertia Link only if it's clickable */}
                     {link.url ? (
                        <Link href={link.url} {...inertiaLinkProps} aria-disabled={!link.url} tabIndex={!link.url ? -1 : undefined}>
                            {/* Content is provided by PaginationNext */}
                        </Link>
                     ) : (
                        <span>{/* Content is provided by PaginationNext */}</span>
                     )}
                </PaginationNext>
            </PaginationItem>
        );
    }

    // Ellipsis
    if (link.label === '...') {
        return (
            <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
            </PaginationItem>
        );
    }

    // Numbered Page Link
    // Check if it's a valid clickable link (has url and is not active)
    const isClickable = !!link.url && !link.active;

    return (
        <PaginationItem key={`page-${link.label}-${index}`}>
            <PaginationLink
                href={link.url ?? '#'} // href for semantics
                isActive={link.active}
                aria-current={link.active ? 'page' : undefined}
                // Apply disabled styles if not clickable and not active
                className={!isClickable && !link.active ? "pointer-events-none opacity-50" : ""}
                asChild={isClickable} // Use asChild only for clickable links
            >
                {isClickable ? (
                    <Link href={link.url!} {...inertiaLinkProps}>
                        {/* Use label directly, PaginationLink handles content */}
                        {link.label}
                    </Link>
                ) : (
                    // Render span for active or non-URL links
                    // Use label directly, PaginationLink handles content
                    <span>{link.label}</span>
                )}
            </PaginationLink>
        </PaginationItem>
    );
};


export default function Index({ videos }: ArchiveIndexProps) {
    return (
        <MainLayout>
            <Head title="Архив видео" />
            <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                    Архив видео
                </h1>

                {videos.data.length > 0 ? (
                    <>
                        {/* Video Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {videos.data.map((video: Video) => (
                                <Link
                                    key={video.id}
                                    href={route('videos.show', video.slug)}
                                    className="group block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                                >
                                    <Card className="h-full overflow-hidden transition-shadow duration-200 group-hover:shadow-lg dark:border-gray-700">
                                        <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
                                            {video.thumbnail_url ? (
                                                <img
                                                    src={video.thumbnail_url}
                                                    alt={video.title}
                                                    className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                                                    loading="lazy" // Add lazy loading for images
                                                />
                                            ) : (
                                                // Placeholder if no thumbnail
                                                <div className="flex items-center justify-center w-full h-full bg-secondary">
                                                    <span className="text-muted-foreground text-sm">Нет изображения</span>
                                                </div>
                                            )}
                                        </AspectRatio>
                                        <CardHeader className="p-3 md:p-4"> {/* Adjust padding */}
                                            <CardTitle className="text-sm md:text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary">
                                                {video.title}
                                            </CardTitle>
                                            {/* Optional: Add formatted date */}
                                            {/* <p className="text-xs text-muted-foreground mt-1">
                                                {new Date(video.published_at ?? video.created_at).toLocaleDateString('ru-RU')}
                                            </p> */}
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination using Shadcn UI */}
                        {videos.links.length > 3 && ( // Only show pagination if there's more than one page (prev, current, next)
                            <div className="mt-6 md:mt-8 flex justify-center">
                                <Pagination>
                                    <PaginationContent>
                                        {videos.links.map(renderPaginationLink)}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                ) : (
                    // Message when no videos are found
                    <div className="flex justify-center items-center min-h-[300px]">
                         <p className="text-center text-muted-foreground text-lg">
                            В архиве пока нет видео.
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}