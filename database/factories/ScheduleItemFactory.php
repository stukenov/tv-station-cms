<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ScheduleItem>
 */
class ScheduleItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate start times around the current time for easier testing
        $startTime = Carbon::instance($this->faker->dateTimeBetween('-2 hours', '+2 hours'));
        $endTime = $startTime->copy()->addMinutes($this->faker->randomElement([30, 60, 90]));

        return [
            'title' => $this->faker->catchPhrase(),
            'start_time' => $startTime,
            'end_time' => $endTime,
        ];
    }
}
