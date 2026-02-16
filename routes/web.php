<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\OnlineController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\AboutController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/novosti', [NewsController::class, 'index'])->name('news.index');
Route::get('/novosti/{news:slug}', [NewsController::class, 'show'])->name('news.show');
Route::get('/proekty', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/proekty/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/online', [OnlineController::class, 'index'])->name('online.index');
Route::get('/programma-peredach', [ScheduleController::class, 'index'])->name('schedule.index');
Route::get('/arhiv', [ArchiveController::class, 'index'])->name('archive.index');
Route::get('/video/{video:slug}', [VideoController::class, 'show'])->name('videos.show');
Route::get('/o-telekanale', [AboutController::class, 'index'])->name('about.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
