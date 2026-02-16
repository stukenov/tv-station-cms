<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AboutTest extends TestCase
{
    // No RefreshDatabase needed yet as it's a static page

    /**
     * Test that the main about page is accessible.
     */
    public function test_about_index_page_is_accessible(): void
    {
        $response = $this->get(route('about.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page->component('About/Index')
        );
    }
} 