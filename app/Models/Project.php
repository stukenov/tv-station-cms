<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    /**
     * Get the videos for the project.
     */
    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }

    // Define fillable fields if needed later
    // protected $fillable = ['title', 'slug', 'description'];
}
