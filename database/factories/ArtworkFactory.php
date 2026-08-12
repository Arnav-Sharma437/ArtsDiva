<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Artist;
use App\Models\Category;
use App\Models\Medium;

class ArtworkFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(3);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'artist_id' => Artist::factory(),
            'category_id' => Category::factory(),
            'medium_id' => Medium::factory(),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 100, 10000),
            'is_for_lease' => fake()->boolean(),
            'is_for_sale' => fake()->boolean(),
            'availability_status' => fake()->randomElement(['available', 'leased', 'sold']),
            'dimensions' => fake()->numberBetween(10, 100) . 'x' . fake()->numberBetween(10, 100) . ' cm',
            'year_created' => fake()->year(),
            'is_featured' => fake()->boolean(20),
            'views_count' => fake()->numberBetween(0, 1000),
        ];
    }
}
