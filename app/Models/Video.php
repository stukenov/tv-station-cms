<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * Get the project that owns the video.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    // Define fillable fields if needed
    // protected $fillable = ['title', 'slug', 'description', 'video_url', 'thumbnail_url', 'project_id', 'published_at'];
}
