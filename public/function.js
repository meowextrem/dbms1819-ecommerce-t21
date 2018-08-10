function showModal(var4,var5){
		if(var4=='delete'){
		$('#myModal').modal("show");  
		$('#mod-title').html("Delete Applicant");
		$('#mod-content').html(
					'<input type="text" id="updateIdx" hidden>'+
					'<div class="form-group">'+
					'<p>Would you like to delete this data?</p>'+
					'</div>'							
);
				  $('#notif-mess').html(' ');
		$('#mod-footer').html('<button id="addUserSubmitform"  class="btn btn-primary" onclick=showModal("delete2") >Submit</button>'+
		'<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>');
		 $('#updateIdx').val(var5);

		}
		else if(var4=='delete2'){
				
				var updateIdx = $('#updateIdx').val();
				
				  $('#myModal').modal("hide");  
				  location.href='/product/delete/{{prod_id}}';	
				
				
		}
		
		}
	