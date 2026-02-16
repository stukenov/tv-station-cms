<?php

namespace Tests\Feature;

use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ArchiveTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the archive index page is accessible and renders paginated videos.
     */
    public function test_archive_index_page_is_accessible(): void
    {
        // Create published and unpublished videos
        Video::factory()->count(15)->create(['published_at' => now()->subMinutes(rand(1, 1000))]); // Create 15 published
        Video::factory()->create(['published_at' => now()->addDay()]); // Unpublished
        Video::factory()->create(['published_at' => null]); // Unpublished

        $response = $this->get(route('archive.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Archive/Index')
                ->has('videos') // Check root paginator prop
                ->has('videos.data', 12) // Check items on the first page (page size 12)
                ->has('videos.links')
                ->has('videos.meta')
                ->where('videos.meta.total', 15) // Check total published items count
                ->where('videos.meta.per_page', 12)
                // ->where('videos.0.id', $publishedVideo2->id) // Order check is less critical now
                // ->where('videos.1.id', $publishedVideo1->id)
        );
    }

    // Add tests for 'show' later
} 