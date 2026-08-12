<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Artist;

class PublicationFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(4);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'artist_id' => Artist::factory(),
            'cover_image' => fake()->imageUrl(400, 600, 'book'),
            'excerpt' => fake()->sentence(10),
            'body' => fake()->text(1000),
            'published_at' => fake()->dateTime(),
        ];
    }
}
