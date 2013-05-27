<?php

class Food extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'food_history';

    public $timestamps = false;

    public function history() {

        return $this->belongsTo('History');

    }

}