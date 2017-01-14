var ajaxRequest;  // The variable that makes Ajax possible!
// var baseURL = "http://wissamapps.esy.es/public/"
var baseURL = "http://127.0.0.1:8080/"
function ajaxFunction(){
   // document.write("ajaxFunction")
   try{

      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
   }catch (e){

      // Internet Explorer Browsers
      try{
         ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {

         try{
            ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){

            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
   }
}

function update_map() {
   // document.write("update_map")
  // ajaxFunction()
  $.ajax({
    type:"POST",
    dataType: "JSON",
    url: baseURL + "admin/update_map",
        success: function(data) {
      // document.write("update_map returned")
      // document.write(data)
      // $('.result').html(data)
      var ajaxDisplay = document.getElementById('ajaxDiv');
      // ajaxDisplay.innerHTML = ajaxRequest.responseText;
      if (data.status === "0"){//data.requests and data.drivers contain what you need

        showMrakersAndDrivers(data.requests, data.drivers, data.time);
        // ajaxDisplay.textContent = data.requests
      // $.each(data.requests, function(index, element) {
      //         $.each(element, function(index2, element2) {
      //       ajaxDisplay.appendChild($('<p>', {
      //           element2
      //       }));
      //     });
      //   });
      }
     // $.each(data, function(index, element) {
      // if(index === "greetings")
            // $('body').append($('<div>', {
                // text: element
            // }));
        // });
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(update_map, 5000);
      // direct("12332","86");
      // cancel("132");
    }
  });
  // ajaxRequest.onreadystatechange = function(){
  //  var ajaxDisplay = document.getElementById('ajaxDiv');
  //  ajaxDisplay.innerHTML = ajaxRequest.responseText;
  //  // setTimeout(update_map, 2000);
  // }
  // var url = "ajax_server.php" ;

  //  ajaxRequest.open("POST", url, true);
  //  ajaxRequest.send(null);

}
function main(){
   ajaxFunction();
   update_map();
}

function direct(request_id, driver_id) {
  $.ajax({
    type:"POST",
    data:{"request_id":request_id, "driver_id":driver_id},
    dataType: "JSON",
    url: baseURL + "admin/direct",
        success: function(data) {
      var ajaxDisplay = document.getElementById('ajaxDiv');
      if (data.status === "0"){

        showDialogInfo("Request redirected successfully.\nWait a while to see the effect.");
        enterRedirectMode();

    } else {

      showDialogInfo("Failed to redirect request. Try again later.");
    }
  }
  });
}

function cancel(request_id) {
  console.log(request_id);
  $.ajax({
    type:"POST",
    data:{"request_id":request_id},
    dataType: "JSON",
    url: baseURL + "admin/cancel",
        success: function(data) {
      var ajaxDisplay = document.getElementById('ajaxDiv');

      if (data.status === "0"){
        removeRequest(request_id);
        showDialogInfo("Request canceled successfully.");
        showNoDetailsInDetailsPane();
        // console.log(request);

    } else {

      showDialogInfo("Failed to cancel request. Try again later.");
    }
  }
  });
}

var count = 1
function countedHello(){
   document.write("Hello World")
   document.write(count)
   document.write(linebreak)
   count += 1
}
// setInterval(countedHello, 500);

// document.write("Outside the functions")
$(document).ready(main());
