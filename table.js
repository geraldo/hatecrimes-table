jQuery(document).ready(function($) {

	// Fetch, process and display geoJSON.
	$.when(
		$.getJSON("/getjson", {})   
		.done (function( data ) {

			$.each( data.features, function( id, feature ) {
				var item = feature.properties;
				//console.log(feature.properties);
				
				$('<tr id="'+item.id+'">\
					<td><a target="_parent" href="/index.php?p='+item.id+'">'+item.title+'</a></td>\
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
				"language": {
	                "url": "/wp-content/plugins/hatecrimes-table/lib/dataTables."+getLang()+".lang"
	            },
				/*"oLanguage": {
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
				},*/
				initComplete: function () {
		            this.api().columns().every( function (i) {
		            	if (i === 1) {
		            		// date, show only year value
		            		// type, split up column data and search for containing value
			                var column = this;
			                var select = $('<select><option value=""></option></select>')
			                    .appendTo( $(column.header()) )
			                    .on( 'change', function () {
			                        var val = $.fn.dataTable.util.escapeRegex(
			                            $(this).val()
			                        );

			                        column
			                            .search( val )
			                            .draw();
			                    } );
			 
			                var data = getYears(column.data().unique().sort());
			                for (key in data) {
			                	select.append( '<option value="'+data[key]+'">'+data[key]+'</option>' )
			                }
		            	}
		            	else if (i === 2) {
		            		// type, split up column data and search for containing value
			                var column = this;
			                var select = $('<select><option value=""></option></select>')
			                    .appendTo( $(column.header()) )
			                    .on( 'change', function () {
			                        var val = $.fn.dataTable.util.escapeRegex(
			                            $(this).val()
			                        );

			                        column
			                            .search( val )
			                            .draw();
			                    } );
			 
			                var data = splitContent(column.data().unique().sort());
			                for (key in data) {
			                	select.append( '<option value="'+data[key]+'">'+data[key]+'</option>' )
			                }
			            }
		            	else if (i > 2) {
		            		// all other columns, search for exact value
			                var column = this;
			                var select = $('<select><option value=""></option></select>')
			                    .appendTo( $(column.header()) )
			                    .on( 'change', function () {
			                        var val = $.fn.dataTable.util.escapeRegex(
			                            $(this).val()
			                        );
			 
			                        column
			                            .search( val ? '^'+val+'$' : '', true, false )
			                            .draw();
			                    } );
			 
			                column.data().unique().sort().each( function ( d, j ) {
			                    select.append( '<option value="'+d+'">'+d+'</option>' )
			                } );
			            }
		            } );
		        }
			});
		})
	    .fail(function(data) {    
	      console.log("json error");
	    })
	).then(function() { 
		console.log("json loaded!");
	});

	//get language from URL
	function getLang() {
		var language = "Spanish";
		var loc = window.location.href;
		var url = "crimenesdeodio.info"
		var pos1 = loc.indexOf(url);
		loc = loc.substring(pos1+url.length+1);
		loc = loc.split("/");
		if (loc[0] == "en") {
			language = "English";
		} else if (loc[0] == "ca") {
			language = "Catalan";
		}
		return language;
	}

	function splitContent(data) {
		var result = {};
		data.each( function ( d, j ) {
			d.split(',').forEach(function(ele) {
				result[ele.trim()] = ele.trim();
			});
		});

		// falta sort!
		return result;
	}

	function getYears(data) {
		var result = {};
		data.each( function ( d, j ) {
			result[d.substring(6)] = d.substring(6);
		});

		// falta sort!
		return result;
	}
});