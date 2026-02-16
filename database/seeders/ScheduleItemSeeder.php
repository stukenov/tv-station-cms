<?php

namespace Database\Seeders;

use App\Models\ScheduleItem;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScheduleItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $startOfDay = Carbon::today()->startOfDay();

        // Seed schedule for today
        for ($i = 0; $i < 24; $i += rand(1, 3)) { // Create items roughly every 1-3 hours
            $startTime = $startOfDay->copy()->addHours($i)->addMinutes(fake()->randomElement([0, 15, 30, 45]));
            if ($startTime->isWeekend()) continue; // Skip weekends for simplicity

            ScheduleItem::factory()->create([
                'start_time' => $startTime,
                'end_time' => $startTime->copy()->addMinutes(fake()->randomElement([30, 45, 60, 90, 120])),
            ]);
        }

        // Seed schedule for yesterday and tomorrow as well
        $days = [Carbon::yesterday()->startOfDay(), Carbon::tomorrow()->startOfDay()];
        foreach($days as $day) {
             if ($day->isWeekend()) continue;
             for ($i = 0; $i < 24; $i += rand(2, 4)) {
                $startTime = $day->copy()->addHours($i)->addMinutes(fake()->randomElement([0, 15, 30, 45]));
                ScheduleItem::factory()->create([
                    'start_time' => $startTime,
                    'end_time' => $startTime->copy()->addMinutes(fake()->randomElement([30, 60, 90])),
                ]);
            }
        }
    }
}
