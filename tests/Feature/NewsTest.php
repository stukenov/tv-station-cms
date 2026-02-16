<?php

namespace Tests\Feature;

use App\Models\News;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class NewsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the news index page is accessible and renders the correct component with paginated news data.
     */
    public function test_news_index_page_is_accessible(): void
    {
        // Create 20 news items to test pagination (page size is 15)
        News::factory()->count(20)->create();

        $response = $this->get(route('news.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('News/Index')
                ->has('news') // Check root paginator prop
                ->has('news.data', 15) // Check items on the first page
                ->has('news.links')
                ->has('news.meta')
                ->where('news.meta.total', 20) // Check total items count
                ->where('news.meta.per_page', 15)
        );
    }

    /**
     * Test that the news show page is accessible and renders the correct component with the correct news item.
     */
    public function test_news_show_page_is_accessible(): void
    {
        // Create a specific news item
        $newsItem = News::factory()->create();

        $response = $this->get(route('news.show', $newsItem->slug));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('News/Show')
                ->has('newsItem')
                ->where('newsItem.id', $newsItem->id)
                ->where('newsItem.slug', $newsItem->slug)
                ->where('newsItem.title', $newsItem->title)
        );
    }
} 