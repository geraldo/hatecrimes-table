<?php
/*
Plugin Name: Hate Crime Table
Description: Data Table for Hate Crime plugin for crimenesdelodio.info project
Author: Gerald Kogler
Author URI: http://go.yuri.at
Text Domain: hatecrimes
*/

wp_enqueue_style('datatables-css', plugins_url('lib/datatables.min.css', __FILE__ ));
wp_enqueue_script('datatables-js', plugins_url('lib/datatables.min.js', __FILE__ ), array( 'jquery' ) );

?>