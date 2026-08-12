import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import Artist from '../models/Artist';
import Category from '../models/Category';
import Medium from '../models/Medium';
import Artwork from '../models/Artwork';
import Exhibition from '../models/Exhibition';
import Event from '../models/Event';
import Publication from '../models/Publication';

const seed = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');
    
    // Clear existing data
    await Artist.deleteMany({});
    await Category.deleteMany({});
    await Medium.deleteMany({});
    await Artwork.deleteMany({});
    await Exhibition.deleteMany({});
    await Event.deleteMany({});
    await Publication.deleteMany({});

    // Add dummy categories
    const cat1 = await Category.create({ name: 'Contemporary', slug: 'contemporary' });
    const cat2 = await Category.create({ name: 'Modern', slug: 'modern' });

    // Add dummy mediums
    const med1 = await Medium.create({ name: 'Oil on Canvas' });
    const med2 = await Medium.create({ name: 'Bronze' });
    const med3 = await Medium.create({ name: 'Photography' });

    // Add dummy artists
    const artists = [];
    for (let i = 1; i <= 10; i++) {
      artists.push(
        await Artist.create({
          name: `Artist ${i}`,
          slug: `artist-${i}`,
          bio: `This is the bio for artist ${i}`,
          imageUrl: `https://example.com/artist-${i}.jpg`
        })
      );
    }

    // Add dummy artworks
    for (let i = 1; i <= 20; i++) {
      await Artwork.create({
        title: `Artwork ${i}`,
        slug: `artwork-${i}`,
        artistId: artists[i % artists.length]._id,
        categoryId: i % 2 === 0 ? cat1._id : cat2._id,
        mediumId: i % 3 === 0 ? med1._id : (i % 3 === 1 ? med2._id : med3._id),
        description: `This is the description for artwork ${i}`,
        price: i * 1000,
        isForLease: i % 2 === 0,
        isForSale: true,
        availabilityStatus: 'AVAILABLE',
        dimensions: '100x100 cm',
        yearCreated: 2020 + (i % 5),
        isFeatured: i % 4 === 0,
        images: [{ url: `https://example.com/artwork-${i}.jpg`, sortOrder: 0 }]
      });
    }

    // Add dummy exhibitions
    for (let i = 1; i <= 6; i++) {
      await Exhibition.create({
        title: `Exhibition ${i}`,
        slug: `exhibition-${i}`,
        coverImageUrl: `https://example.com/exhibition-${i}.jpg`,
        description: `Description for exhibition ${i}`,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        location: `Location ${i}`,
        city: `City ${i}`,
        country: `Country ${i}`,
        status: i % 2 === 0 ? 'ONGOING' : 'UPCOMING'
      });
    }
    
    // Add dummy events
    for (let i = 1; i <= 6; i++) {
      await Event.create({
        title: `Event ${i}`,
        slug: `event-${i}`,
        coverImageUrl: `https://example.com/event-${i}.jpg`,
        description: `Description for event ${i}`,
        eventDate: new Date(),
        startTime: '18:00',
        endTime: '21:00',
        location: `Gallery Space ${i}`,
        tags: ['Opening', 'Artist Talk']
      });
    }

    // Add dummy publications
    for (let i = 1; i <= 6; i++) {
      await Publication.create({
        title: `Publication ${i}`,
        slug: `publication-${i}`,
        artistId: artists[i % artists.length]._id,
        coverImageUrl: `https://example.com/publication-${i}.jpg`,
        excerpt: `Excerpt for publication ${i}`,
        body: `Full body text for publication ${i}`,
        publishedAt: new Date()
      });
    }

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data', error);
    process.exit(1);
  }
};

seed();
