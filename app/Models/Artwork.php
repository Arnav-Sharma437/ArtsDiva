<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Artwork extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'artist_id',
        'category_id',
        'medium_id',
        'description',
        'price',
        'is_for_lease',
        'is_for_sale',
        'availability_status',
        'dimensions',
        'year_created',
        'is_featured',
        'views_count',
    ];

    protected $casts = [
        'is_for_lease' => 'boolean',
        'is_for_sale' => 'boolean',
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
        'year_created' => 'integer',
        'views_count' => 'integer',
    ];

    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function medium(): BelongsTo
    {
        return $this->belongsTo(Medium::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ArtworkImage::class)->orderBy('sort_order');
    }
    
    public function enquiries(): HasMany
    {
        return $this->hasMany(Enquiry::class);
    }
}
