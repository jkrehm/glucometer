<?php

use Illuminate\Database\Migrations\Migration;

class CreateHistoryTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('history', function($table) {
			$table->increments('id');
			$table->date('date');
			$table->time('time');
			$table->integer('level');
		});

		Schema::create('food_history', function($table) {
			$table->increments('id');
			$table->integer('history_id');
			$table->string('food');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('food_history');
		Schema::dropIfExists('history');
	}

}