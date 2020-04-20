$(document).ready(function(){
  loadPage();
});

function loadPage(){
  console.log("Loading navbar");
  $('.nav_container').load("common/navbar.html");
  console.log("navbar loaded");
  console.log("Loading footer");
  $('.footer_container').load("common/footer.html");
  console.log("Footer loaded");
}
