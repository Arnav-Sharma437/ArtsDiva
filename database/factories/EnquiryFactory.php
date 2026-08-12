<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Artwork;

class EnquiryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'message' => fake()->paragraph(),
            'artwork_id' => fake()->boolean(50) ? Artwork::factory() : null,
            'type' => fake()->randomElement(['purchase', 'lease', 'general']),
            'status' => fake()->randomElement(['new', 'contacted', 'closed']),
        ];
    }
}
