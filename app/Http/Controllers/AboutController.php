<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Display the main about page.
     */
    public function index(): Response
    {
        // Data like description, team members, etc., can be fetched later
        // from a settings table or a dedicated model if needed.
        return Inertia::render('About/Index');
    }

    // Add methods for team/contacts pages later if needed
} 