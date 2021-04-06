$(function() {
  loadRecipies();
  $("#recipes").on("click",".btn-danger",handlebutondel);
  $("#addBtn").click(addrecpie);
});
function addrecpie(){
  var title=$("#title").val();
  var body=$("#body").val();
  alert("wer");
  $.ajax({

    url:"https://usman-recipes.herokuapp.com/api/recipes",
    method:"POST",
    data:{title,body},
    success:function(response){
      console.log(response);
      console.log(6);
      loadRecipies();
    }
  });
}
function handlebutondel(){
  var btn=$(this);
  var parentdiv=btn.closest(".recipe");
  let id =parentdiv.attr("data-id");
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
    method: "DELETE",
    success: function(){
      loadRecipies();
    }
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    success: function(response) {
      console.log(response);
      var recipies=$("#recipes");
      recipies.empty();

    for(var i=0; i<response.length;i++){
      var v = response[i];
     // console.log(v._id);
      recipies.append( `<div class="recipe" data-id="${v._id}"><h3>${v.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${v.body}</p></div>`);
    }
    }
    
  });
}
