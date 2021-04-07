$(function() {
  loadRecipies();
  $("#recipes").on("click",".btn-danger",handlebutondel);
  $("#recipes").on("click",".btn-warning",handleupdate);
  $("#addBtn").click(addrecpie);
});

function handleupdate(){
  $("#updatemodel").modal("show");
}

function addrecpie(){
  var title=$("#title").val();
  var body=$("#body").val();
  console.log(body);
  alert("wer");
  
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title, body },
    success: function(response) {
      console.log(response);

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
