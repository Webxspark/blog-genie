<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/login", [AuthController::class, 'login']);
Route::post("/signup", [\App\Http\Controllers\Auth\RegisteredUserController::class, "apiStore"]);


Route::get("/posts", [BlogController::class, 'index']);
Route::get("/posts/{slug}", [BlogController::class, 'show']);

Route::middleware("auth:sanctum")->group(function () {
    Route::post("/logout", [AuthController::class, 'logout']);
    Route::get("/posts/me", [BlogController::class, 'indexMine']);
    Route::post("/posts", [BlogController::class, 'store']);
    Route::put("/posts/{id}", [BlogController::class, 'update']);
    Route::delete("/posts/{id}", [BlogController::class, 'destroy']);
});
