<?php

namespace App\Http\Controllers;

use App\Models\ScheduleItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    /**
     * Display the TV schedule for a given day.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        // Validate the requested date or default to today
        $requestedDate = $request->input('date');
        try {
            $targetDate = $requestedDate ? Carbon::parse($requestedDate) : Carbon::today();
        } catch (\Exception $e) {
            $targetDate = Carbon::today(); // Fallback to today on invalid date
        }

        $startOfDay = $targetDate->copy()->startOfDay();
        $endOfDay = $targetDate->copy()->endOfDay();

        $scheduleForDay = ScheduleItem::whereBetween('start_time', [$startOfDay, $endOfDay])
            ->orderBy('start_time', 'asc')
            ->get();

        // Get current timestamp to help frontend determine past/current/future
        $now = Carbon::now();

        return Inertia::render('Schedule', [
            'scheduleItems' => $scheduleForDay,
            'targetDate' => $targetDate->toDateString(), // Pass the date being viewed (YYYY-MM-DD)
            'nowTimestamp' => $now->timestamp, // Pass current server time timestamp
        ]);
    }
} 