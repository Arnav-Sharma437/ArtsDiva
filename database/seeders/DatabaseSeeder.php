<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Artist;
use App\Models\Category;
use App\Models\Medium;
use App\Models\Artwork;
use App\Models\ArtworkImage;
use App\Models\Exhibition;
use App\Models\Event;
use App\Models\Publication;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@artsdiva.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create Taxonomies
        $categories = Category::factory(4)->create();
        $mediums = Medium::factory(5)->create();

        // Create Artists and Artworks
        Artist::factory(10)->create()->each(function ($artist) use ($categories, $mediums) {
            Artwork::factory(3)->create([
                'artist_id' => $artist->id,
                'category_id' => $categories->random()->id,
                'medium_id' => $mediums->random()->id,
            ])->each(function ($artwork) {
                ArtworkImage::factory(2)->create([
                    'artwork_id' => $artwork->id,
                ]);
            });
        });

        // Create Exhibitions, Events, Publications
        Exhibition::factory(5)->create();
        Event::factory(5)->create();
        Publication::factory(5)->create([
            'artist_id' => Artist::inRandomOrder()->first()->id,
        ]);
    }
}
