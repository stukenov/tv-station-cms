<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 15 regular news items
        News::factory()->count(150)->create();

        // Create 5 featured news items
        News::factory()->count(10)->featured()->create();
    }
}
