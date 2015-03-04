

$(document).ready(function(){ 
  var num=0;

  

   

  $("input[type=checkbox]").change(function(){
    var doc_id = $(this).data('list-id');
    //alert(doc_id);
    
     var checked = $(":checked").length;

     var total = $("input[type=checkbox]").length;

    

    if( $(this).prop( "checked" ) ){
      // checkbox was checked
      
       
        document.getElementById("countercheck").innerHTML = checked + " Complete";

        document.getElementById("counteruncheck").innerHTML = total - checked + " Incomplete"; 

       
        $.ajax('/check/'+ doc_id +'/complete', {
          method : "PUT"

        });


      

      // alert('sent PUT request to '+'/list/:id/complete');
    }else{

        
        
        
        document.getElementById("countercheck").innerHTML = checked + " Complete";

        document.getElementById("counteruncheck").innerHTML = total - checked + " Incomplete";
      
      $.ajax('/check/'+doc_id+'/incomplete', {
        method : "PUT"
      });
      // alert('sent PUT request to '+'/list/'+doc_id+'/uncomplete');
    }
  }); // change method
  
  // select all checkboxes with data of checked
  $("input[data-checked=true]").prop('checked', true);

  var checked = $(":checked").length;

  var total = $("input[type=checkbox]").length;

  document.getElementById("countercheck").innerHTML = $(":checked").length + " Complete";

  document.getElementById("counteruncheck").innerHTML = total - checked + " Incomplete";

});
