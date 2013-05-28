<?php

class History extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'history';

    public $timestamps = false;


    public function scopeRecent($query) {

        return $query->orderBy('date', 'desc')->orderBy('time', 'desc')->take(5);

    }


    public function food() {

        return $this->hasMany('Food', 'history_id');

    }

}