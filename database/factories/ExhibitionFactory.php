<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ExhibitionFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(4);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'cover_image' => fake()->imageUrl(800, 600, 'exhibition'),
            'description' => fake()->paragraph(),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'location' => fake()->address(),
            'city' => fake()->city(),
            'country' => fake()->country(),
            'status' => fake()->randomElement(['upcoming', 'ongoing', 'past']),
        ];
    }
}
