<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->company() . ' Project';
        $width = 400;
        $height = 600; // Portrait aspect ratio for project covers
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraphs(rand(2, 5), true),
            'cover_image_url' => 'https://place-hold.it/' . $width . 'x' . $height .  '/' . '?text=' . urlencode(substr($title, 0, 15)),
        ];
    }
}
