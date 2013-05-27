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

        return $query->orderBy('date')->orderBy('time')->take(5);

    }


    public function foods() {

        return $this->hasMany('Food', 'history_id');

    }

}