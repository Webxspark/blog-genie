<?php

use App\Http\Controllers\BlogApp;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [BlogApp::class, 'index'])->name('home');
Route::get('/post/{slug}', [BlogApp::class, 'display'])->name('posts.userPreview');
Route::get('/about', function () {
    Inertia::render('About');
});
Route::get('/contact', function () {
    Inertia::render('Contact');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('dashboard/posts', BlogController::class);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
