<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'bio',
        'photo',
        'nationality',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];

    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }

    public function publications(): HasMany
    {
        return $this->hasMany(Publication::class);
    }
}
