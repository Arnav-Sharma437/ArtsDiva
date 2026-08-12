<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EventFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(3);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'cover_image' => fake()->imageUrl(800, 600, 'event'),
            'description' => fake()->paragraph(),
            'event_date' => fake()->date(),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'location' => fake()->address(),
        ];
    }
}
