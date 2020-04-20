$(document).ready(function(){
  loadPage();
});

function loadPage(){
  $.ajax({
    url:"./common/head.html",
    success: function(data) {$("head").prepend(data);},
    dataType: "html"
  });
  console.log("head loaded");
  console.log("Loading navbar");
  $('.nav_container').load("./common/navbar.html");
  console.log("navbar loaded");
  console.log("Loading footer");
  $('.footer_container').load("./common/footer.html");
  console.log("Footer loaded");
}
