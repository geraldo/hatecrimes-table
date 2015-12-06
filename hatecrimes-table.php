<?php
/*
Plugin Name: Hate Crime Table
Description: Data Table for Hate Crime plugin for crimenesdelodio.info project
Author: Gerald Kogler
Author URI: http://go.yuri.at
Text Domain: hatecrimes
*/

//if (is_page_template("table-template.php")) {
	wp_enqueue_style('datatables-css', plugins_url('lib/jquery.dataTables.min.css', __FILE__ ));
	wp_enqueue_script('datatables-js', plugins_url('lib/jquery.dataTables.min.js', __FILE__ ), array( 'jquery' ) );

	/* pass language function to javascript */
	wp_enqueue_script('tables-js', plugins_url('table.js', __FILE__ ));
	//global $q_config;
	//wp_localize_script( 'tables-js', 'lang', array('iso' => qtranxf_getLanguage()));
	//wp_localize_script( 'tables-js', 'lang', array('iso' => $q_config));
	//wp_enqueue_script('tables-js');
//}

?>