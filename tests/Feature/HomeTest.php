<?php

namespace Tests\Feature;

use App\Models\News;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomeTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the home page is accessible and renders the correct component with latest news, featured news, and projects.
     */
    public function test_home_page_is_accessible_with_content(): void
    {
        // Create regular and featured news items
        News::factory()->count(12)->create(); // Create more for latest news pool
        $featuredNewsItems = News::factory()->count(7)->featured()->create()->sortByDesc('created_at')->values();

        // Create projects
        $projects = Project::factory()->count(8)->create()->sortByDesc('created_at')->values();

        $response = $this->get(route('home'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Home')
                ->has('latestNews', 10) // As per Home.tsx slice(0, 10)
                ->has('latestNews.0', fn (Assert $news) =>
                    $news->hasAll(['id', 'title', 'slug', 'image_url'])->etc()
                )
                ->has('featuredNews', 7) // As per HomeController
                ->where('featuredNews.0.id', $featuredNewsItems[0]->id)
                ->where('featuredNews.1.id', $featuredNewsItems[1]->id)
                ->has('featuredNews.0', fn (Assert $news) =>
                    $news->where('is_featured', true)
                         ->hasAll(['id', 'title', 'slug', 'image_url'])
                         ->etc()
                )
                ->has('projects', 6) // As per HomeController
                ->where('projects.0.id', $projects[0]->id)
                ->has('projects.0', fn (Assert $project) =>
                    $project->hasAll(['id', 'title', 'slug', 'cover_image_url'])
                           ->etc()
                )
        );
    }
} 