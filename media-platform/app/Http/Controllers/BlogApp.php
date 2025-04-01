<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\In;
use Inertia\Inertia;
use Inertia\Response;

class BlogApp extends Controller
{
    public function index(): Response
    {
        $posts = Blog::with('user')
            ->select('id', 'title', 'author', 'description', 'thumbnail', 'views', 'slug', 'created_at', 'updated_at')
            ->get();
        return Inertia::render('views/index', [
            'posts' => $posts,
        ]);
    }

    public function display(string $slug): Response
    {
        $post = Blog::with('user')->where('slug', $slug)->first();
        return Inertia::render('views/preview', [
            'post' => $post
        ]);
    }
}
