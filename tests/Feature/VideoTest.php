<?php

namespace Tests\Feature;

use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class VideoTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the video show page is accessible.
     */
    public function test_video_show_page_is_accessible(): void
    {
        $video = Video::factory()->create(['published_at' => now()]); // Ensure it's published

        $response = $this->get(route('videos.show', $video->slug));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Video/Show')
                ->has('video')
                ->where('video.id', $video->id)
                ->where('video.slug', $video->slug)
                ->where('video.title', $video->title)
        );
    }

    // Add test for unpublished videos returning 404 if uncommenting logic in controller
} 