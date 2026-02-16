<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(rand(5, 10)); // Longer titles for realism
        $width = 640;
        $height = 480;
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $this->faker->paragraphs(rand(3, 7), true),
            // Placeholder image using placehold.co for more variety
            'image_url' => 'https://place-hold.it/' . $width . 'x' . $height . '/' . '?text=' . urlencode(substr($title, 0, 20)),
            'created_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
            'updated_at' => fn (array $attributes) => $attributes['created_at'],
            'is_featured' => false,
        ];
    }

    /**
     * Indicate that the news item should be featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}
