<div class="catalogue-layout container section-padding" style="padding-top: 120px;">
    <!-- SIDEBAR FILTER -->
    <aside class="catalogue-sidebar">
        <!-- Search -->
        <div class="filter-group">
            <h4 class="filter-title uppercase">Search</h4>
            <div class="search-box">
                <input type="text" wire:model.live.debounce.400ms="search" placeholder="Search artwork or artist..." class="search-input" style="width: 100%; padding: 10px; border: 1px solid #eaeaea; font-family: inherit;">
            </div>
        </div>

        <!-- Availability -->
        <div class="filter-group">
            <h4 class="filter-title uppercase">Availability</h4>
            <div class="filter-options">
                <label class="filter-label"><input type="radio" wire:model.live="availability" value="" name="avail"> <span>All</span></label>
                <label class="filter-label"><input type="radio" wire:model.live="availability" value="for-sale" name="avail"> <span>For Sale</span></label>
                <label class="filter-label"><input type="radio" wire:model.live="availability" value="for-lease" name="avail"> <span>For Lease</span></label>
            </div>
        </div>

        <!-- Categories -->
        <div class="filter-group">
            <h4 class="filter-title uppercase">Category</h4>
            <div class="filter-options" style="max-height: 200px; overflow-y: auto;">
                <label class="filter-label"><input type="radio" wire:model.live="categoryId" value="" name="cat"> <span>All Categories</span></label>
                @foreach($categories as $category)
                    <label class="filter-label"><input type="radio" wire:model.live="categoryId" value="{{ $category->id }}" name="cat"> <span>{{ $category->name }}</span></label>
                @endforeach
            </div>
        </div>

        <!-- Mediums -->
        <div class="filter-group">
            <h4 class="filter-title uppercase">Medium</h4>
            <div class="filter-options" style="max-height: 200px; overflow-y: auto;">
                <label class="filter-label"><input type="radio" wire:model.live="mediumId" value="" name="med"> <span>All Mediums</span></label>
                @foreach($mediums as $medium)
                    <label class="filter-label"><input type="radio" wire:model.live="mediumId" value="{{ $medium->id }}" name="med"> <span>{{ $medium->name }}</span></label>
                @endforeach
            </div>
        </div>

        <!-- Artists -->
        <div class="filter-group">
            <h4 class="filter-title uppercase">Artist</h4>
            <div class="filter-options" style="max-height: 200px; overflow-y: auto;">
                <label class="filter-label"><input type="radio" wire:model.live="artistId" value="" name="art"> <span>All Artists</span></label>
                @foreach($artists as $artist)
                    <label class="filter-label"><input type="radio" wire:model.live="artistId" value="{{ $artist->id }}" name="art"> <span>{{ $artist->name }}</span></label>
                @endforeach
            </div>
        </div>

        <!-- Price Range -->
        <div class="filter-group">
            <h4 class="filter-title uppercase">Price Range (USD)</h4>
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="number" wire:model.live.debounce.400ms="minPrice" placeholder="Min" style="width: 100%; padding: 8px; border: 1px solid #eaeaea;">
                <span>-</span>
                <input type="number" wire:model.live.debounce.400ms="maxPrice" placeholder="Max" style="width: 100%; padding: 8px; border: 1px solid #eaeaea;">
            </div>
        </div>
    </aside>

    <!-- MAIN CONTENT -->
    <div class="catalogue-main">
        <div class="catalogue-header">
            <div>
                <h1 class="uppercase" style="font-size: 28px; font-weight: 400;">COLLECTION</h1>
                <p style="color: #666; font-size: 14px; margin-top: 5px;">Showing {{ $artworks->firstItem() ?? 0 }}–{{ $artworks->lastItem() ?? 0 }} of {{ $artworks->total() }} results</p>
            </div>
            <div class="sort-box">
                <span style="font-size: 13px; color: #666; margin-right: 10px;" class="uppercase">Sort by:</span>
                <select wire:model.live="sort" style="padding: 8px 15px; border: 1px solid #eaeaea; font-family: inherit; font-size: 14px; background: #fff; cursor: pointer;">
                    <option value="newest">Newest First</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="price-asc">Price: Low to High</option>
                </select>
            </div>
        </div>

        <!-- Loader -->
        <div wire:loading style="width: 100%; text-align: center; padding: 40px 0;">
            <p style="color: #666;">Loading artworks...</p>
        </div>

        <!-- Grid -->
        <div class="catalogue-grid" wire:loading.class="opacity-50" style="transition: opacity 0.3s;">
            @forelse($artworks as $artwork)
                <article class="card">
                    @if($artwork->is_for_lease && !$artwork->is_for_sale)
                        <div style="position: absolute; top: 15px; left: 15px; background: #111; color: #fff; font-size: 11px; padding: 5px 10px; z-index: 2;" class="uppercase">Lease Only</div>
                    @endif
                    @if($artwork->availability_status !== 'available')
                        <div style="position: absolute; top: 15px; right: 15px; background: #999; color: #fff; font-size: 11px; padding: 5px 10px; z-index: 2;" class="uppercase">{{ $artwork->availability_status }}</div>
                    @endif
                    
                    <a href="#" style="text-decoration: none; color: inherit; display: block;">
                        <div class="card-image square" style="margin-bottom: 25px; position: relative;">
                            @if($artwork->images->count() > 0)
                                <img src="{{ asset('assets/images/exhibition_1.jpg') }}" alt="{{ $artwork->title }}" style="object-fit: cover; width: 100%; height: 100%;">
                            @else
                                <div style="width: 100%; height: 100%; background: #f0f0f0;"></div>
                            @endif
                        </div>
                        <p class="card-meta uppercase" style="margin-bottom: 15px !important; font-size: 13px; font-weight: 400; color: #555; border-bottom: 1px solid #eaeaea; padding-bottom: 15px;">{{ $artwork->artist->name ?? 'Unknown Artist' }}</p>
                        <h3 class="card-title" style="font-weight: 400; font-size: 20px; margin-bottom: 8px !important; color: #111;">{{ $artwork->title }}</h3>
                        <p style="font-size: 13px; color: #666; margin-bottom: 4px;">{{ $artwork->medium->name ?? 'Mixed Media' }}</p>
                        <p style="font-size: 13px; color: #666; margin-bottom: 15px;">{{ $artwork->dimensions ?? 'Various Dimensions' }}</p>
                        <p style="font-size: 16px; font-weight: 500; color: #111;">
                            @if($artwork->price)
                                ${{ number_format($artwork->price) }}
                            @else
                                Price on Request
                            @endif
                        </p>
                    </a>
                </article>
            @empty
                <div style="grid-column: 1 / -1; padding: 60px 0; text-align: center; color: #666;">
                    <p style="font-size: 18px; margin-bottom: 15px;">No artworks found matching your criteria.</p>
                    <button wire:click="$set('search', ''); $set('categoryId', ''); $set('mediumId', ''); $set('artistId', ''); $set('minPrice', ''); $set('maxPrice', ''); $set('availability', '');" class="btn btn-primary">Clear Filters</button>
                </div>
            @endforelse
        </div>

        <div style="margin-top: 40px;">
            {{ $artworks->links() }}
        </div>
    </div>
</div>
