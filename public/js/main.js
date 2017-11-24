$('document').ready(function() {
    alert("Hi! The system is ready.")
})



var kot = []
 
 

$(".card").on("click", function(){
 var mealid=$(this).data("id-value");
 var mealname=$(this).data("mealname-value");
 var mealprice=$(this).data("mealprice-value");
 
  var pregst = mealprice - 0.05*mealprice;
 console.log("pregst: " + pregst)
 
 
 
 console.log(mealid)

$('#billtable').append('<tr><td>' + mealname + '</td><th scope="row">1</th><td>' + mealprice + '</td></tr>');
$('#kottable').append('<tr><td>' + mealname + '</td><th scope="row">1</th></tr>');
//  alert(kot)
 
//  $('#myTable').append('<tr><td>my data</td><td>more data</td></tr>');

var result = [];
  $('table tr').each(function(){
  	$('td', this).each(function(index, val){
    	if(!result[index]) result[index] = 0;
      result[index] += parseInt($(val).text());
    });
  });
  
  $('table').append('<tr></tr>');
  $(result).each(function(){
  	$('#total_forces').html(this.toFixed(2))
 
  var cgst=this*0.025;
     	$('#cgst').html(cgst.toFixed(2))

  var sgst=this*0.025;
     	$('#sgst').html(sgst.toFixed(2))

  
 var pregsttotal = (this + 0.05*this).toFixed(2);
 console.log("pregsttotal: " + pregsttotal)
   	$('#total_gross').html(pregsttotal)

  });
 
 
});

    // $('#printbill').on("click", function(){
    //       $('#billtable').show().printElement();
    // })
 
//   function printDiv() 
// {

//   var divToPrint=document.getElementById('printbill');

//   var newWin=window.open('','Print-Window');

//   newWin.document.open();

//   newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

//   newWin.document.close();

//   setTimeout(function(){newWin.close();},10);

// } 
  
  $(document).ready(function() {
            $("#printbill").on("click", function () {//$btnPrint is button which will trigger print
                var divContents = $("#billdiv").html();//div which have to print
                var printWindow = window.open('', '', 'height=700,width=900');
                printWindow.document.write('<html><head><title></title>');
                printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >');//external styles
                printWindow.document.write('<link rel="stylesheet" href="/stylesheets/main.css" type="text/css"/>');
                printWindow.document.write('</head><body>');
                
                printWindow.document.write(divContents);
                printWindow.document.write('</body></html>');
                printWindow.document.close();

                printWindow.onload=function(){
                printWindow.focus();                                         
                printWindow.print();
                printWindow.close();
                }
            });
});

// $(document).ready(function(){
// var result = [];
//   $('table tr').each(function(){
//   	$('td', this).each(function(index, val){
//     	if(!result[index]) result[index] = 0;
//       result[index] += parseInt($(val).text());
//     });
//   });
  
//   $('table').append('<tr></tr>');
//   $(result).each(function(){
//   	$('table tr').last().append('<td>'+this+'</td>')
//   });
// });

