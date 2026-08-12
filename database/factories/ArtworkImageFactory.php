<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Artwork;

class ArtworkImageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'artwork_id' => Artwork::factory(),
            'image_path' => fake()->imageUrl(640, 480, 'art'),
            'sort_order' => fake()->numberBetween(0, 5),
        ];
    }
}
