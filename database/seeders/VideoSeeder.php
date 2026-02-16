<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create videos for the archive (no project)
        Video::factory()->count(2000)->create([
            'published_at' => fn() => fake()->dateTimeBetween('-2 months', 'now'),
            'project_id' => null,
        ]);

        // Create videos associated with projects
        $projects = Project::all();
        if ($projects->isNotEmpty()) {
            foreach ($projects as $project) {
                Video::factory()->count(rand(3, 8))->create([
                    'project_id' => $project->id,
                    'published_at' => fn() => fake()->dateTimeBetween('-1 month', 'now'),
                ]);
            }
        }

        // Create some unpublished videos
        Video::factory()->count(5)->create([
            'published_at' => null,
            'project_id' => $projects->isEmpty() ? null : $projects->random()->id,
        ]);

        // Create some videos scheduled for future publication
        Video::factory()->count(3)->create([
            'published_at' => fn() => fake()->dateTimeBetween('+1 day', '+1 month'),
            'project_id' => $projects->isEmpty() ? null : $projects->random()->id,
        ]);
    }
}
