$(document).ready(function(){
var all = false;
var id;
var ctr = 0;
function passURL(u, v, z, i)
{
   $.ajax({
        type: 'POST',
        url: u,
        data: 'x=' + v + '&var=' + z + '&idz=' + i, //passing some input here
        dataType: 'text',
        success: function(response){
           output = response;
          // alert(output);
          }
}).done(function(data){
    
    //RETURN TO HTML
    data = data.replace(/ObjectId/g, "")
                    .replace(/\(/g, "")
                    .replace(/\)|/g, "")
                    .replace(/'/g, '"');
            
              
              var a = JSON.parse(data);
              
              for (var x = 0; x < a.length; x++){
                ctr += 1;
              var val = a[x]['tasks'];
              id = a[x]['mid'];
               $("#listahan").append('<p id=whole><input type=hidden name=hiddenstore id=temp'+id+' value='+val+'><span class=ch><input type=checkbox class=chk name=chk id=chk'+id+' value='+val+'><label class=strikethrough><span id=lis'+id+'>' + val + '</label></span></p><input type="text" class="hiddenedit" id="edt'+id+'" style="display:none"/></span>');           
              }
             
            
              
  console.log(data);
});
   
}
passURL('/select', 0, 0, 0)



//ADDING
    $("#btn1").click(function(){
      var todo = $("#new-todo").val();
      if (todo != ""){
        ctr += 1;
        
        $("#new-todo").focus();
        $("#listahan").append('<p id=whole><input type=hidden name=hiddenstore id=temp'+ctr+' value='+todo+'><span class=ch><input type=checkbox class=chk name=chk id=chk'+ctr+' value='+todo+'><label class=strikethrough><span id=lis'+ctr+'>' + todo + '</label></span></p><input type="text" class="hiddenedit" id="edt'+ctr+'" style="display:none"/></span>');           
        passURL('/add', todo, 0, ctr)
        $("#new-todo").val('');
        //alert(ctr);
      }
      else
        alert ("Please enter a task");
    });
//selectall
$("#btn3").click(function(){
       $('input:checkbox').prop('checked', true);
    });

//deleting
$("#btn2").click(function(){
      var IDs = [];
    	$(".ch input:checked").each(function() {
        if ($(this).is(":checked")) {
            $(this).parent().remove();
            $(this).remove();
            var temp = $(this).attr('id')
            IDs.push(temp.substring(3, temp.length));
              passURL('/delete', IDs, 0, 0)
        }
       
    	});
   });

//EDITS
$('#listahan').click(function(e) {
    var target = $(e.target), article;
    var i = e.target.id;
    var n = i.substring(3,i.length);
    var z = i.substring(0, 3);
    var editss;
    var oldt = ($('#temp'+n).attr('id'));
    //alert (oldt);
    if (z == "lis"){
      $('#lis'+n).hide();
      $("#edt"+n).show().val($('#lis'+n).text()).focus();

    }

    $('#edt'+n).bind("enterKey",function(e){
    $('#edt'+n).hide();
    $("#lis"+n).show().text($('#edt'+n).val());
    $('#temp'+n).val($('#edt'+n).val());
    editss = $('#temp'+n).val()
//    alert (editss);
    passURL('/edit', editss, oldt.substring(4, oldt.length), 0)
    });

    $('#edt'+n).keyup(function(e){
        if(e.keyCode == 13)
        {
            $(this).trigger("enterKey");
        }
        });

  });

});