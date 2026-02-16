<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    /**
     * Display the specified video.
     *
     * @param Video $video
     * @return Response
     */
    public function show(Video $video): Response
    {
        // Ensure the video is published before showing (optional, depending on requirements)
        // if (!$video->published_at || $video->published_at->isFuture()) {
        //     abort(404);
        // }

        // We might want to load the related project later if it exists
        // $video->load('project:id,title,slug');

        return Inertia::render('Video/Show', [
            'video' => $video,
        ]);
    }
}
