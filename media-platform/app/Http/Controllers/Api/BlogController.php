<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $posts = Blog::select('id', 'title', 'author', 'description', 'thumbnail', 'views', 'slug', 'created_at', 'updated_at')->get();
        return response()->json([
            "message" => "Here are all the posts",
            "data" => $posts
        ]);
    }

    public function indexMine(): JsonResponse
    {
        $user = Auth::user();
        $posts = Blog::with('user')->select('id', 'title', 'author', 'description', 'thumbnail', 'views', 'slug', 'created_at', 'updated_at')->get();
        return response()->json([
            "message" => "Here are all your posts",
            "data" => $posts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "title" => "required|string",
            "description" => "required|string",
            "body" => "required|string",
            "thumbnail" => "required|image",
        ]);
        $user = Auth::user();
        $slug = str($request->title)->slug();
        // store the image with random name
        $imageName = time() . '.' . $request->thumbnail->extension();
        $request->thumbnail->move(public_path('images'), $imageName);
        $post = Blog::create([
            "title" => $request->title,
            "description" => $request->description,
            "body" => $request->body,
            "thumbnail" => $imageName,
            "author" => $user->id,
            "slug" => $slug
        ]);
        return response()->json([
            "message" => "Post created successfully",
        ])->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug): JsonResponse
    {
        $post = Blog::where("slug", $slug)->first();
        if (!$post) {
            return response()->json([
                "message" => "Post not found"
            ])->setStatusCode(404);
        }
        return response()->json([
            "message" => "Here is the post",
            "data" => $post
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            "title" => "required|string",
            "description" => "required|string",
            "body" => "required|string",
            "thumbnail" => "image",
        ]);
        $post = Blog::where("id", $id)->first();
        if (!$post) {
            return response()->json([
                "message" => "Post not found"
            ])->setStatusCode(404);
        }
        $user = Auth::user();
        if ($post->author != $user->id) {
            return response()->json([
                "message" => "You are not authorized to update this post"
            ])->setStatusCode(403);
        }
        if ($request->thumbnail) {
            // store the image with random name
            $imageName = time() . '.' . $request->thumbnail->extension();
            $request->thumbnail->move(public_path('images'), $imageName);
            $post->thumbnail = $imageName;
        }
        $post->title = $request->title;
        $post->description = $request->description;
        $post->body = $request->body;
        $post->save();
        return response()->json([
            "message" => "Post updated successfully",
        ])->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $post = Blog::where("id", $id)->first();
        if (!$post) {
            return response()->json([
                "message" => "Post not found"
            ])->setStatusCode(404);
        }
        $user = Auth::user();
        if ($post->author != $user->id) {
            return response()->json([
                "message" => "You are not authorized to delete this post"
            ])->setStatusCode(403);
        }
        // remove the image from the public/images folder
        if (file_exists(public_path('images/' . $post->thumbnail))) {
            unlink(public_path('images/' . $post->thumbnail));
        }
        $post->delete();
        return response()->json([
            "message" => "Post deleted successfully",
        ])->setStatusCode(200);
    }
}
