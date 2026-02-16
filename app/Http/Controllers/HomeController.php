<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     */
    public function index(): Response
    {
        $latestNews = News::latest() // Order by created_at descending
            ->take(40)         // Get only the latest 5
            ->get();          // Execute the query

        $featuredNews = News::where('is_featured', true)
            ->latest()
            ->take(7) // Limit number of slider items
            ->get();

        // Fetch latest projects
        $projects = Project::latest() // Order by creation date
            ->take(6) // Limit to 6 projects for the homepage display
            ->get();

        return Inertia::render('Home', [
            'latestNews' => $latestNews,
            'featuredNews' => $featuredNews, // Pass featured news
            'projects' => $projects, // Pass projects to the view
        ]);
    }
} 