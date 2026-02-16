<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the projects index page is accessible and renders the correct component with paginated data.
     */
    public function test_project_index_page_is_accessible(): void
    {
        Project::factory()->count(20)->create(); // Create 20 projects

        $response = $this->get(route('projects.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Projects/Index')
                ->has('projects') // Check root paginator prop
                ->has('projects.data', 15) // Check items on the first page
                ->has('projects.links')
                ->has('projects.meta')
                ->where('projects.meta.total', 20) // Check total items count
                ->where('projects.meta.per_page', 15)
        );
    }

    /**
     * Test that the project show page is accessible and includes published videos.
     */
    public function test_project_show_page_is_accessible(): void
    {
        $project = Project::factory()->create();

        // Create associated videos
        $publishedVideo1 = Video::factory()->forProject($project->id)->create(['published_at' => now()->subDay()]);
        $publishedVideo2 = Video::factory()->forProject($project->id)->create(['published_at' => now()->subHour()]); // Newer published
        Video::factory()->forProject($project->id)->create(['published_at' => now()->addDay()]); // Unpublished future
        Video::factory()->forProject($project->id)->create(['published_at' => null]); // Unpublished null
        Video::factory()->create(); // Video for another project

        $response = $this->get(route('projects.show', $project->slug));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Projects/Show')
                ->has('project')
                ->where('project.id', $project->id)
                ->where('project.slug', $project->slug)
                ->where('project.title', $project->title)
                ->has('project.videos', 2) // Assert only 2 published videos for this project are passed
                // Check order (newest published first)
                ->where('project.videos.0.id', $publishedVideo2->id)
                ->where('project.videos.1.id', $publishedVideo1->id)
        );
    }
} 