<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render("posts/index", [
            'posts' => Blog::with('user')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render("posts/new", [
            'user' => Auth::user(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => "required|string|max:250",
            'description' => "required|string",
            'body' => "required|string",
            'thumbnail' => "required|image",
        ]);
        $user = Auth::user();
        $slug = str($request->title)->slug();
        // store the image with random name
        $imageName = time() . '.' . $request->thumbnail->extension();
        $request->thumbnail->move(public_path('images'), $imageName);
        $post = Blog::create([
            'title' => $request->title,
            'description' => $request->description,
            'body' => $request->body,
            'thumbnail' => $imageName,
            'author' => $user->id,
            'slug' => $slug
        ]);
        return redirect()->route('posts.index')->with('success', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response|RedirectResponse
    {
        $post = Blog::with('user')->find($id);
        if (!$post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }
        return Inertia::render("posts/new", [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        Log::info(json_encode($request->all()));
        $request->validate([
            'title' => "required|string|max:250",
            'description' => "required|string",
            'body' => "required|string",
            'thumbnail' => "image",
        ]);
        // print _r($request->all());
        $post = Blog::with('user')->find($id);
        if (!$post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }
        $post->title = $request->title;
        $post->description = $request->description;
        $post->body = $request->body;
        if ($request->hasFile('thumbnail')) {
            //remove the old image from the public/images folder
            if ($post->thumbnail) {
                $imagePath = public_path('images/' . $post->thumbnail);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
            // store the new image with random name
            $imageName = time() . '.' . $request->thumbnail->extension();
            $request->thumbnail->move(public_path('images'), $imageName);
            $post->thumbnail = $imageName;
        }
        $post->slug = str($request->title)->slug();
        $post->save();
        return redirect()->route('posts.index')->with('success', 'Post updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $post = Blog::with('user')->find($id);
        if (!$post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }
        $post->delete();

        //remove the image from the public/images folder
        if ($post->thumbnail) {
            $imagePath = public_path('images/' . $post->thumbnail);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully');
    }
}
