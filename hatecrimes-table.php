<?php
/*
Plugin Name: Hate Crime Table
Description: Data Table for Hate Crime plugin for crimenesdelodio.info project
Author: Gerald Kogler
Author URI: http://go.yuri.at
Text Domain: hatecrimes
*/

	wp_enqueue_style('datatables-css', 'https://cdn.datatables.net/v/dt/dt-1.10.20/datatables.min.css');
	wp_enqueue_script('datatables-js', 'https://cdn.datatables.net/v/dt/dt-1.10.20/datatables.min.js', array( 'jquery' ) );
	wp_enqueue_script('tables-js', plugins_url('table.js', __FILE__ ));

	add_action('template_include', 'hatecrime_template_include');
	function hatecrime_template_include($template) {
		if ( is_page( 'casos' )  ) {
		    $file = dirname( __FILE__ ).'/table-template.php';
		    if(file_exists($file)) {
		        $template = $file;
		    }
		}

	    return $template;
	}

?>