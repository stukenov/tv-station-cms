<?php

namespace Tests\Feature;

use App\Models\ScheduleItem;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ScheduleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the schedule page is accessible and shows today's schedule by default.
     */
    public function test_schedule_page_shows_today_by_default(): void
    {
        Carbon::setTestNow(Carbon::parse('2024-05-05 14:00:00'));

        // Today's items (past, current, future)
        $itemPast = ScheduleItem::factory()->create(['start_time' => now()->subHours(2), 'end_time' => now()->subHour()]);
        $itemCurrent = ScheduleItem::factory()->create(['start_time' => now()->subMinutes(30), 'end_time' => now()->addMinutes(30)]);
        $itemFuture = ScheduleItem::factory()->create(['start_time' => now()->addHour(), 'end_time' => now()->addHours(2)]);

        // Tomorrow's item (should not appear)
        ScheduleItem::factory()->create(['start_time' => now()->addDay(), 'end_time' => now()->addDay()->addHour()]);

        $response = $this->get(route('schedule.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Schedule')
                ->has('scheduleItems', 3) // Only today's items
                ->where('targetDate', '2024-05-05')
                ->has('nowTimestamp')
                ->where('scheduleItems.0.id', $itemPast->id)
                ->where('scheduleItems.1.id', $itemCurrent->id)
                ->where('scheduleItems.2.id', $itemFuture->id)
        );

        Carbon::setTestNow();
    }

     /**
     * Test that the schedule page shows schedule for a specific requested date.
     */
    public function test_schedule_page_shows_specific_date(): void
    {
        $testDate = '2024-06-10';
        $testDateCarbon = Carbon::parse($testDate);

        // Items for the specific date
        $item1 = ScheduleItem::factory()->create(['start_time' => $testDateCarbon->copy()->addHours(8), 'end_time' => $testDateCarbon->copy()->addHours(9)]);
        $item2 = ScheduleItem::factory()->create(['start_time' => $testDateCarbon->copy()->addHours(10), 'end_time' => $testDateCarbon->copy()->addHours(11)]);

        // Item for a different date
        ScheduleItem::factory()->create(['start_time' => $testDateCarbon->copy()->subDay(), 'end_time' => $testDateCarbon->copy()->subDay()->addHour()]);

        $response = $this->get(route('schedule.index', ['date' => $testDate]));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Schedule')
                ->has('scheduleItems', 2) // Only items for the requested date
                ->where('targetDate', $testDate)
                ->where('scheduleItems.0.id', $item1->id)
                ->where('scheduleItems.1.id', $item2->id)
        );
    }
} 