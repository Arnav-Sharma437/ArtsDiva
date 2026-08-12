<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ArtistFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->name();
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'bio' => fake()->paragraph(),
            'photo' => fake()->imageUrl(640, 480, 'people'),
            'nationality' => fake()->country(),
            'is_featured' => fake()->boolean(20),
        ];
    }
}
