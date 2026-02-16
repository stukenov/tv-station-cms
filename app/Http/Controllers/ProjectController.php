<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index(): Response
    {
        $paginator = Project::latest()->paginate(15); // Use paginate

        return Inertia::render('Projects/Index', [
            'projects' => [
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

    /**
     * Display the specified project.
     */
    public function show(Project $project): Response
    {
        // Eager load published videos associated with this project, ordered by latest published date
        $project->load(['videos' => function ($query) {
            $query->where('published_at', '<', Carbon::now())
                  ->orderBy('published_at', 'desc');
        }]);

        return Inertia::render('Projects/Show', [
            'project' => $project,
            // The loaded videos are now nested within the $project object
        ]);
    }
} 