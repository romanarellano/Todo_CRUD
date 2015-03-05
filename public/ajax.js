

$(document).ready(function(){ 
  var num=0;

  
  $("input[type=checkbox]").change(function(what){
     
     var doc_id = $(this).data('list-id');
    
     var checked = $(":checked").length;

     var total = $("input[type=checkbox]").length;

     $(this).closest("li").css({"text-decoration": "line-through"});
     

     if( $(this).prop( "checked" ) ){
        // checkbox was checked
        
        
      
        document.getElementById("countercheck").innerHTML = checked + " Complete";

        document.getElementById("counteruncheck").innerHTML = total - checked + " Incomplete"; 

   
        $.ajax('/check/'+ doc_id +'/complete', {
            method : "PUT"

        });


    }   else{

          $(this).closest("li").css({"text-decoration": "none"});
          
          document.getElementById("countercheck").innerHTML = checked + " Complete";

          document.getElementById("counteruncheck").innerHTML = total - checked + " Incomplete";
        
          $.ajax('/check/'+doc_id+'/incomplete', {
            method : "PUT"
          });
    
    }
  }); // change method
  
  // select all checkboxes with data of checked
  $("input[data-checked=true]").prop('checked', true);

    var checked = $(":checked").length;

    var total = $("input[type=checkbox]").length;

    document.getElementById("countercheck").innerHTML = $(":checked").length + " Complete";

    document.getElementById("counteruncheck").innerHTML = total - checked + " Incomplete";

});
