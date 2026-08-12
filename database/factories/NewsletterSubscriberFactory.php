<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class NewsletterSubscriberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'subscribed_at' => fake()->dateTime(),
        ];
    }
}
