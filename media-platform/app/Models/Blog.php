<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 *
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Blog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Blog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Blog query()
 * @mixin \Eloquent
 */
class Blog extends Model
{
    protected $table = 'blog';
    protected $fillable = [
        'title',
        'description',
        'slug',
        'body',
        'thumbnail',
        'author',
        'views',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author');
    }
}
