<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'cover_image',
        'description',
        'event_date',
        'start_time',
        'end_time',
        'location',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];

    public function tags(): HasMany
    {
        return $this->hasMany(EventTag::class);
    }
}
