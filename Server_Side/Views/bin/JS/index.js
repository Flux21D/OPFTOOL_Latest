$(document).ready(function (){
	$( "#radioset" ).buttonset(); 

	$.getJSON( "database.json", function( data ) {
		
		$('body').find('form').find('table').append('<tbody></tbody>');
		for(var i=0; i<data.data.length; i++){
			$('body').find('form').find('table').find('tbody').append('<tr id="row' + (i+1) + '"></tr>');
			for(var j=0; j<data.data[i].length; j++){
				if(j==0){
					$('body').find('form').find('table').find('tbody').find('tr#row' + (i+1)).append('<td class="col' + (j+1) + '">' + '<img src="' + data.data[i][j] + '" width="20%"/>' + '</td>');
				}
				else{
				$('body').find('form').find('table').find('tbody').find('tr#row' + (i+1)).append('<td class="col' + (j+1) + '">' + data.data[i][j] + '</td>');
				}
			}
		}
		$('#metaInfo tbody tr').click(function () {
			$(this).toggleClass('selected');
		} );
		$('#Cancel').click( function () {
			$('#metaInfo tbody').find('tr').removeClass('selected');
			location.reload();
		} );    
		$('#delete').click( function () {
			$('#metaInfo tbody').find('tr.selected').remove();
		} );    
		$('#metaInfo tbody tr').each(function (ind,ele){
			$('#metaInfo tbody tr#row' + (ind+1)).dblclick(function () {
				id = '';
				$("#myModal").find('input#titleName').val($(this).find('td.col3').html());
				$("#myModal").find('input#authorName').val($(this).find('td.col4').html());
				$("#myModal").find('input#illustratorName').val($(this).find('td.col5').html());
				$("#myModal").find('input#publisherName').val($(this).find('td.col6').html());
				$("#myModal").find('input#isbnNumber').val($(this).find('td.col7').html());
				$("#myModal").find('input#copyrightInfo').val($(this).find('td.col8').html());
				if($(this).find('td.col9').html() == 'Yes'){
					$('label[for="radio1"]').addClass('ui-checkboxradio-checked');
					$('label[for="radio1"]').addClass('ui-state-active');
					$('label[for="radio2"]').removeClass('ui-checkboxradio-checked');
					$('label[for="radio2"]').removeClass('ui-state-active');
					$('#radio1').attr('checked','checked');
					$('#radio2').removeAttr('checked');
				}
				else {
					$('label[for="radio2"]').addClass('ui-checkboxradio-checked');
					$('label[for="radio2"]').addClass('ui-state-active');
					$('label[for="radio1"]').removeClass('ui-checkboxradio-checked');
					$('label[for="radio1"]').removeClass('ui-state-active');
					$('#radio2').attr('checked','checked');
					$('#radio1').removeAttr('checked');
				}

				$("#myModal").find('img').attr('src',$(this).find('img').attr('src'));
				$("#myModal").modal('show');
				$(document).keypress(function(e) { 
					if (e.which == 13) $('#ok').click();   // enter (works as expected)
					if (e.which == 27) $('#close').click(); // esc   (does not work)
				});
				id = $(this).attr('id');
				$('#close').click(function (){
					id = '';
				});

				$('#ok').click(function (){
					$("#myModal").modal('hide');
					$('#metaInfo').find('tr#' + id).find('td.col3').html($("#myModal").find('input#titleName').val());
					$('#metaInfo').find('tr#' + id).find('td.col4').html($("#myModal").find('input#authorName').val());
					$('#metaInfo').find('tr#' + id).find('td.col5').html($("#myModal").find('input#illustratorName').val());
					$('#metaInfo').find('tr#' + id).find('td.col6').html($("#myModal").find('input#publisherName').val());
					$('#metaInfo').find('tr#' + id).find('td.col7').html($("#myModal").find('input#isbnNumber').val());
					$('#metaInfo').find('tr#' + id).find('td.col8').html($("#myModal").find('input#copyrightInfo').val());
					if($('label[for="radio1"]').hasClass('ui-checkboxradio-checked')){
						$('#metaInfo').find('tr#' + id).find('td.col9').html('Yes');
					}
					else{
						$('#metaInfo').find('tr#' + id).find('td.col9').html('No');
					}
				});
			});
		});
		$('#Process').click(function (){
			var jsonObj = {};
			var tableObj = [];
			
			var data = "";
			$('table').find('tbody').find('tr').each(function (index,element){
				var rowObj = [];
				$(this).find('td').each(function (ind,ele){
					if(ind == 0){
						rowObj.push($(this).find('img').attr('src'));
					}
					else{
						rowObj.push($(this).html());
					}
				});
				tableObj.push(rowObj);
			});
			jsonObj.data = tableObj;
			$.ajax
			({
				type: 'POST',
				data: JSON.stringify(jsonObj),
				contentType: 'application/json',
				url: 'http://localhost:3000/process',
			});

		});
		
	
	});
	
	
});
