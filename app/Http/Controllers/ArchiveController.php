<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArchiveController extends Controller
{
    /**
     * Display a listing of the archived videos.
     */
    public function index(): Response
    {
        // Fetch published videos, newest first.
        $paginator = Video::where('published_at', '<', Carbon::now())
            ->orderBy('published_at', 'desc')
            ->paginate(12); // Paginate by 12 for grid layout

        return Inertia::render('Archive/Index', [
            'videos' => [
                'data' => $paginator->items(),
                'links' => $paginator->linkCollection()->toArray(),
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

    // Add 'show' method later for individual video pages
} 