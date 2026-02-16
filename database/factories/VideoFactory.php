<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(5, true);
        return [
            'title' => Str::title($title),
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraph(),
            'video_url' => 'https://example.com/video/' . $this->faker->uuid() . '.mp4', // Placeholder URL
            'thumbnail_url' => 'https://place-hold.it/640x360?text=' . urlencode($title), // Placeholder image
            'project_id' => null, // Default to null (archive video)
            'published_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
            'created_at' => fn (array $attributes) => $attributes['published_at'],
            'updated_at' => fn (array $attributes) => $attributes['published_at'],
        ];
    }

    /**
     * Indicate that the video belongs to a project.
     */
    public function forProject(int $projectId): static
    {
        return $this->state(fn (array $attributes) => [
            'project_id' => $projectId,
        ]);
    }
}
