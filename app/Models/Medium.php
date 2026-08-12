<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Medium extends Model
{
    use HasFactory;
    
    protected $table = 'mediums';

    protected $fillable = [
        'name',
    ];

    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }
}
