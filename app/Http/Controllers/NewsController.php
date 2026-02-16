<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display a listing of the news articles.
     */
    public function index(): Response
    {
        $paginator = News::latest()->paginate(15);

        return Inertia::render('News/Index', [
            'news' => [
                'data' => $paginator->items(),
                'links' => $paginator->linkCollection()->toArray(), // Use linkCollection() for Inertia compatibility
                'meta' => [
                    'current_page' => $paginator->currentPage(),
                    'from' => $paginator->firstItem(),
                    'last_page' => $paginator->lastPage(),
                    'path' => $paginator->path(),
                    'per_page' => $paginator->perPage(),
                    'to' => $paginator->lastItem(),
                    'total' => $paginator->total(),
                ],
            ],
        ]);
    }

    /**
     * Display the specified news article.
     */
    public function show(News $news): Response // Type-hint News model for route model binding
    {
        return Inertia::render('News/Show', [
            'newsItem' => $news, // Pass the specific news item
        ]);
    }
}