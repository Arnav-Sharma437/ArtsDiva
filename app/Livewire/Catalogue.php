<?php

namespace App\Livewire;

use App\Models\Artist;
use App\Models\Artwork;
use App\Models\Category;
use App\Models\Medium;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

class Catalogue extends Component
{
    use WithPagination;

    #[Url]
    public $search = '';

    #[Url]
    public $categoryId = '';

    #[Url]
    public $mediumId = '';

    #[Url]
    public $artistId = '';

    #[Url]
    public $minPrice = '';

    #[Url]
    public $maxPrice = '';

    #[Url]
    public $availability = ''; // 'all', 'for-sale', 'for-lease'

    #[Url]
    public $sort = 'newest'; // 'newest', 'price-asc', 'price-desc'

    public function updating($property)
    {
        // Reset pagination when any filter changes
        if (in_array($property, ['search', 'categoryId', 'mediumId', 'artistId', 'minPrice', 'maxPrice', 'availability', 'sort'])) {
            $this->resetPage();
        }
    }

    public function render()
    {
        $query = Artwork::with(['artist', 'category', 'medium', 'images']);

        if (!empty($this->search)) {
            $query->where(function ($q) {
                $q->where('title', 'like', '%' . $this->search . '%')
                  ->orWhereHas('artist', function ($q2) {
                      $q2->where('name', 'like', '%' . $this->search . '%');
                  });
            });
        }

        if (!empty($this->categoryId)) {
            $query->where('category_id', $this->categoryId);
        }

        if (!empty($this->mediumId)) {
            $query->where('medium_id', $this->mediumId);
        }

        if (!empty($this->artistId)) {
            $query->where('artist_id', $this->artistId);
        }

        if (!empty($this->minPrice)) {
            $query->where('price', '>=', $this->minPrice);
        }

        if (!empty($this->maxPrice)) {
            $query->where('price', '<=', $this->maxPrice);
        }

        if ($this->availability === 'for-sale') {
            $query->where('is_for_sale', true);
        } elseif ($this->availability === 'for-lease') {
            $query->where('is_for_lease', true);
        }

        // Sorting
        switch ($this->sort) {
            case 'price-asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price-desc':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $artworks = $query->paginate(12);

        return view('livewire.catalogue', [
            'artworks' => $artworks,
            'artists' => Artist::orderBy('name')->get(),
            'categories' => Category::orderBy('name')->get(),
            'mediums' => Medium::orderBy('name')->get(),
        ])->layout('components.layouts.app');
    }
}
