import React from 'react';
import { ScheduleItem } from '@/types/models';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/app/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale'; // Import Russian locale if needed for time formatting consistency

interface OnlineProps {
    upcomingSchedule: ScheduleItem[];
    // currentItem?: ScheduleItem | null; // Add later if needed
}

// Helper to format time using date-fns for consistency
const formatTime = (dateTimeString: string): string => {
    try {
        // Use parseISO as the backend likely sends ISO 8601 format
        return format(parseISO(dateTimeString), 'HH:mm');
    } catch (e) {
        console.error("Error parsing/formatting time:", dateTimeString, e);
        return "Invalid time";
    }
};

export default function Online({ upcomingSchedule }: OnlineProps) {
    return (
        <MainLayout>
            <Head title="Онлайн" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6">Онлайн трансляция</h1>

                {/* Placeholder for Video Player - Styled with Tailwind/Shadcn */}
                <div className={cn(
                    "border border-border rounded-lg bg-card text-card-foreground",
                    "min-h-[300px] lg:min-h-[500px]", // Adjust height as needed
                    "mb-6 flex items-center justify-center",
                    "text-muted-foreground"
                )}>
                    [Live Video Player Placeholder]
                </div>

                {/* Upcoming Schedule using Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Далее в эфире</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {upcomingSchedule.length > 0 ? (
                            <ul className="space-y-3">
                                {upcomingSchedule.map((item) => (
                                    <li key={item.id} className="flex items-center space-x-3 text-sm">
                                        <span className="font-medium w-12 text-right text-primary">
                                            {formatTime(item.start_time)}
                                        </span>
                                        <span className="flex-1 text-foreground">{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">Пока нет программы передач.</p>
                        )}
                        {/* Real-time update notice/logic will be added later */}
                        {/* Consider adding a small note about real-time updates if needed */}
                        {/* <p className="text-xs text-muted-foreground mt-4">Расписание обновляется автоматически.</p> */}
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}