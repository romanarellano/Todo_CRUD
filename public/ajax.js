

$(document).ready(function(){ 
  var num=0;
  $("input[type=checkbox]").change(function(){
    var doc_id = $(this).data('list-id');
    //alert(doc_id);
    
    if( $(this).prop( "checked" ) ){
      // checkbox was checked
       num++;
       document.getElementById("counter").innerHTML = num + " Complete";

       var incomplete = document.getElementById("counter1").innerHTML;

       document.getElementById("counter1").innerHTML = incomplete;

      $.ajax('/check/'+ doc_id +'/complete', {
        method : "PUT"
      });
      // alert('sent PUT request to '+'/list/:id/complete');
    }else{

      num--;
      document.getElementById("counter").innerHTML = num + " Complete";

      $.ajax('/check/'+doc_id+'/incomplete', {
        method : "PUT"
      });
      // alert('sent PUT request to '+'/list/'+doc_id+'/uncomplete');
    }
  });
  // select all checkboxes with data of checked
  $("input[data-checked=true]").prop('checked', true);
});
