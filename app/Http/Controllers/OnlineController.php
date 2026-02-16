<?php

namespace App\Http\Controllers;

use App\Models\ScheduleItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OnlineController extends Controller
{
    /**
     * Display the online streaming page with the upcoming schedule.
     */
    public function index(): Response
    {
        $now = Carbon::now();

        $upcomingSchedule = ScheduleItem::where('start_time', '>=', $now)
            ->orderBy('start_time', 'asc')
            ->take(10)
            ->get();

        // You might also want to fetch the *currently* playing item separately
        // $currentItem = ScheduleItem::where('start_time', '<', $now)
        //     ->where('end_time', '>', $now)
        //     ->first();

        return Inertia::render('Online', [
            'upcomingSchedule' => $upcomingSchedule,
            // 'currentItem' => $currentItem, // Add this later if needed
        ]);
    }
} 