import React from 'react';
import { ScheduleItem } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { format, parseISO, addDays, subDays } from 'date-fns';
import { ru } from 'date-fns/locale'; // Import Russian locale for date formatting
import MainLayout from '@/layouts/app/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Example icons

interface ScheduleProps {
    scheduleItems: ScheduleItem[];
    targetDate: string; // YYYY-MM-DD
    nowTimestamp: number;
}

// Helper to format time (can be moved to utils)
const formatTime = (dateTimeString: string): string => {
    try {
        return format(parseISO(dateTimeString), 'HH:mm');
    } catch (e) {
        console.error("Error parsing/formatting time:", dateTimeString, e);
        return "Invalid time";
    }
};

// Helper to format date for display (can be moved to utils)
const formatDate = (dateString: string): string => {
    try {
        // Format with Russian locale and desired format
        return format(parseISO(dateString), 'EEEE, d MMMM yyyy г.', { locale: ru }); // e.g., Воскресенье, 5 мая 2024 г.
    } catch (e) {
        console.error("Error parsing/formatting date:", dateString, e);
        return "Invalid date";
    }
};

export default function Schedule({ scheduleItems, targetDate, nowTimestamp }: ScheduleProps) {
    const now = new Date(nowTimestamp * 1000); // Convert PHP timestamp to JS Date
    const targetDateObj = parseISO(targetDate);

    const getItemStatus = (item: ScheduleItem): 'past' | 'current' | 'future' => {
        try {
            const startTime = parseISO(item.start_time);
            const endTime = parseISO(item.end_time);

            // Compare directly with the 'now' timestamp from the server
            if (endTime.getTime() < now.getTime()) {
                return 'past';
            }
            if (startTime.getTime() > now.getTime()) {
                return 'future';
            }
            return 'current'; // If not past and not future, it must be current
        } catch (e) {
            console.error("Error determining item status:", item, e);
            return 'future'; // Default to future on error
        }
    };

    const goToDate = (newDate: Date) => {
        const dateString = format(newDate, 'yyyy-MM-dd');
        router.get(route('schedule.index'), { date: dateString }, { preserveState: true, replace: true });
    };

    const prevDay = subDays(targetDateObj, 1);
    const nextDay = addDays(targetDateObj, 1);

    return (
        <MainLayout>
            <Head title={`Программа передач - ${formatDate(targetDate)}`} />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6">Программа передач</h1>

                {/* Date Navigation */}
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" size="icon" onClick={() => goToDate(prevDay)} aria-label="Предыдущий день">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold text-center">{formatDate(targetDate)}</h2>
                    <Button variant="outline" size="icon" onClick={() => goToDate(nextDay)} aria-label="Следующий день">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Schedule List */}
                <Card>
                    <CardContent className="pt-6"> {/* Add padding top if no CardHeader */}
                        {scheduleItems.length > 0 ? (
                            <ul className="space-y-4">
                                {scheduleItems.map((item) => {
                                    const status = getItemStatus(item);
                                    const itemClasses = cn(
                                        'flex items-center space-x-3 p-3 rounded-md transition-colors', // Base styles
                                        status === 'past' && 'text-muted-foreground opacity-70', // Past item style
                                        status === 'current' && 'bg-primary/10 border border-primary text-primary font-semibold', // Current item style
                                        status === 'future' && 'hover:bg-accent' // Future item hover style
                                    );

                                    return (
                                        <li key={item.id} className={itemClasses}>
                                            <span className={cn(
                                                "font-medium w-12 text-right", // Fixed width for time alignment
                                                status === 'current' ? 'text-primary' : '' // Ensure time color matches current highlight if needed
                                            )}>
                                                {formatTime(item.start_time)}
                                            </span>
                                            <span className="flex-1">{item.title}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-center text-muted-foreground py-4">Нет программы передач для этого дня.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}