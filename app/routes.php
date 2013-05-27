<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});


Route::get('/records/recent', function() {

    $recent = History::with('foods')->recent()->get();

    return $recent->toJson();

});


Route::post('/record', function() {

    header('Access-Control-Allow-Origin: http://localhost:4000');
    
    $history = new History();

    $history->date = Input::get('date');
    $history->time = Input::get('time');
    $history->level = Input::get('level');

    $history->save();

    foreach (explode(',', Input::get('food')) as $value) {
        
        $food = new Food();

        $food->food = $value;

        $history->foods()->save($food);

    }

    $return = array('success' => true);

    return Response::json($return)->setCallback(Input::get('callback'));

});


App::before(function() {

    if (Request::ajax()) {
        header('Access-Control-Allow-Origin: http://localhost:4000');
    }

});