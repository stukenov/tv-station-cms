import React from 'react';
import { Project } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { Paginator, PaginatorLink } from '@/types/paginator'; // Import Paginator types
import MainLayout from '@/layouts/app/MainLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; // Import Card components
import { Badge } from "@/components/ui/badge"; // Import Badge component
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Import AspectRatio
import {
    Pagination as ShadcnUIPagination, // Rename to avoid conflict if needed
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"; // Import Shadcn Pagination components
import { cn } from '@/lib/utils'; // Import cn utility
import { ArrowRight } from 'lucide-react'; // Import an icon

interface ProjectsIndexProps {
    projects: Paginator<Project>; // Expect Paginator object
}

// Shadcn Pagination Component (Adapted from News/Index.tsx)
// TODO: Extract this to a shared component later
const ShadcnPagination = ({ links, className }: { links: PaginatorLink[], className?: string }) => {
    if (!links || links.length <= 3) return null; // Only show if there are prev/next pages

    // Find previous and next links
    const prevLink = links[0];
    const nextLink = links[links.length - 1];

    // Filter out prev/next links to get page number links
    const pageLinks = links.slice(1, -1);

    // Helper to decode HTML entities like &laquo;
    const decodeHtml = (html: string) => {
        if (typeof window === 'undefined') return html; // Avoid document is not defined on SSR
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <ShadcnUIPagination className={cn("mt-8", className)}>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    {prevLink.url ? (
                        <PaginationPrevious href={prevLink.url}>
                            {decodeHtml(prevLink.label)}
                        </PaginationPrevious>
                    ) : (
                        <PaginationPrevious aria-disabled className="cursor-not-allowed opacity-50">
                             {decodeHtml(prevLink.label)}
                        </PaginationPrevious>
                    )}
                </PaginationItem>

                {/* Page Number Links */}
                {pageLinks.map((link, index) => (
                    <PaginationItem key={index}>
                        {link.url && !link.label.includes('...') ? (
                            <PaginationLink
                                href={link.url}
                                isActive={link.active}
                            >
                                {link.label}
                            </PaginationLink>
                        ) : link.label.includes('...') ? (
                            <PaginationEllipsis />
                        ) : (
                            // Render the active page number without a link
                            <PaginationLink isActive={link.active}>
                                {link.label}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                    {nextLink.url ? (
                        <PaginationNext href={nextLink.url}>
                             {decodeHtml(nextLink.label)}
                        </PaginationNext>
                    ) : (
                        <PaginationNext aria-disabled className="cursor-not-allowed opacity-50">
                            {decodeHtml(nextLink.label)}
                        </PaginationNext>
                    )}
                </PaginationItem>
            </PaginationContent>
        </ShadcnUIPagination>
    );
};


const ProjectsPage = ({ projects }: ProjectsIndexProps) => {
  return (
      <MainLayout>
          <Head title="Проекты" />
          <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-2">Проекты</h1>
              <p className="text-lg text-muted-foreground mb-8">
                  Изучите наши уникальные проекты и программы
              </p>

              {projects.data.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {/* Added xl for 4 columns */}
                    {projects.data.map((project) => (
                        <Link key={project.id} href={route('projects.show', project.slug)} className="block group">
                            <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-200 ease-in-out hover:shadow-xl">
                                <AspectRatio ratio={9 / 16} className="bg-muted overflow-hidden rounded-t-lg">
                                    {project.cover_image_url ? (
                                        <img 
                                            src={project.cover_image_url} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm p-2">
                                            [Обложка проекта]
                                        </div>
                                    )}
                                </AspectRatio>
                                <CardHeader className="p-4 pb-2 flex-grow">
                                    <CardTitle className="text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardFooter className="p-4 pt-2 flex justify-end">
                                    <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                                        Подробнее <ArrowRight className="ml-1 h-3 w-3" />
                                    </span>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
                 ) : (
                <div className="text-center py-10 text-muted-foreground">
                    Нет доступных проектов.
                </div>
            )}

              <ShadcnPagination links={projects.links} />
          </div>
      </MainLayout>
  )
}

export default ProjectsPage;