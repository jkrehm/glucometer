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

    $recent = History::with('food')->recent()->get();

    $recent = $recent->toArray();

    foreach ($recent as &$record) {

        $food = array();

        foreach ($record['food'] as $f) {

            $food[] = $f['food'];
            
        }

        $record['food'] = $food;
    }

    return Response::json( array_reverse($recent) );

});


Route::post('/record', function() {

    header('Access-Control-Allow-Origin: http://localhost:4000');
    
    $history = new History();

    $history->date = Input::get('date');
    $history->time = Input::get('time');
    $history->level = Input::get('level');

    $history->save();

    foreach (Input::get('food') as $value) {
        
        $food = new Food();

        $food->food = $value;

        $history->food()->save($food);

    }

    $return = array('success' => true);

    return Response::json($return)->setCallback(Input::get('callback'));

});


Route::put('/record', function() {

    header('Access-Control-Allow-Origin: http://localhost:4000');
    
    $history = History::find( Input::get('id') );

    $history->date = Input::get('date');
    $history->time = Input::get('time');
    $history->level = Input::get('level');

    $history->save();

    // Remove the current food
    $history->food()->delete();

    foreach (Input::get('food') as $value) {
        
        $food = new Food();

        $food->food = $value;

        $history->food()->save($food);

    }

    $return = array('success' => true);

    return Response::json($return)->setCallback(Input::get('callback'));

});


App::before(function() {

    if (Request::ajax()) {
        header('Access-Control-Allow-Origin: http://localhost:4000');
    }

});