<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Procedures extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
     protected $table ='procedures';

    protected $fillable = [
      'name','description'];
    /**
    * The attributes that aren't mass assignable.
    *
    * @var array
    */
    protected $guarded = [];

    public function tooltype()
{
    return $this->hasMany('App\ToolType','cat_id');
}
}
