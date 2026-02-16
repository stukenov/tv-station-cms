<?php

namespace Tests\Feature;

use App\Models\ScheduleItem;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class OnlineTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the online page is accessible and shows upcoming schedule.
     */
    public function test_online_page_is_accessible(): void
    {
        // Freeze time to make assertions predictable
        Carbon::setTestNow(Carbon::parse('2024-05-05 12:00:00'));

        // Create items before, during, and after current time
        ScheduleItem::factory()->create(['start_time' => now()->subHour(), 'end_time' => now()->subMinutes(30)]); // Past
        ScheduleItem::factory()->create(['start_time' => now()->subMinutes(15), 'end_time' => now()->addMinutes(15)]); // Current (for later)

        // Create 12 future items to ensure the ->take(10) works
        $futureItems = ScheduleItem::factory()->count(12)->sequence(
            fn ($sequence) => [
                'start_time' => now()->addMinutes(30 * ($sequence->index + 1)),
                'end_time' => now()->addMinutes(30 * ($sequence->index + 2))
            ]
        )->create();

        $response = $this->get(route('online.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Online')
                ->has('upcomingSchedule', 10) // Check if exactly 10 items are passed
                 // Check if the first upcoming item is the correct one
                ->where('upcomingSchedule.0.id', $futureItems->first()->id)
        );

        // Unfreeze time
        Carbon::setTestNow();
    }
} 