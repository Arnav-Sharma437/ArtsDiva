<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventTag extends Model
{
    protected $fillable = [
        'event_id',
        'tag_name',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
