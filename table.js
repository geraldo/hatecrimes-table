jQuery(document).ready(function($) {

	// Fetch, process and display geoJSON.
	$.when(
		$.getJSON("http://crimenesdeodio.info/wp-content/export/hatecrimes.js", {})   
		.done (function( data ) {

			$.each( data.features, function( id, feature ) {
				var item = feature.properties;
				//console.log(feature.properties);
				
				$('<tr id="'+item.id+'">\
					<td><a target="_parent" href="http://crimenesdeodio.info/index.php?p='+item.id+'">'+item.title+'</a></td>\
					<td>'+item.date+'</td>\
					<td>'+item.category+'</td>\
					<td>'+item.city+'</td>\
					<td>'+item.province+'</td>\
					<td>'+item.sentence+'</td>\
					<td>'+item.delict+'</td>\
				</tr>').appendTo($("#crims tbody"));
					//<td>'+feature.geometry.coordinates[1]+'</td>\
					//<td>'+feature.geometry.coordinates[0]+'</td>\
					//<td>'+item.age+'</td>\
			});

			$('#crims').dataTable( {
				"aLengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
				"iDisplayLength": 20,
				"aaSorting": [[ 1, "desc" ]],
				"sPaginationType": "full_numbers",
				"oLanguage": {
					"sLengthMenu": "Muestra _MENU_ registros por página",
					"sZeroRecords": "No encontrado nada - lo siento",
					"sInfo": "Muestra _START_ hasta _END_ de _TOTAL_ registros",
					"sInfoEmpty": "Muestra 0 hasta 0 de 0 registros",
					"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
					"sSearch" : "Buscar:",
					"oPaginate": {
						"sPrevious": "Página previa",
						"sNext": "Próxima página",
						"sFirst": "Primera página",
						"sLast": "Última página"
					}
				},
			});
		})
	    .fail(function(data) {    
	      console.log("json error");
	    })
	).then(function() { 
		console.log("json loaded!");
	});
});
