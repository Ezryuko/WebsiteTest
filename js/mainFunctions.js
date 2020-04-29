$(document).ready(function(){
  loadPage();
});

function loadPage(){
  // -- Reload CSS --
  $("link[rel='stylesheet']").attr("href",function(i, origValue){
    return origValue + "?rnd=" + (new Date().valueOf());
  });
  // -- Load commons --
  $(".header_container").load("./common/header.html", function(responseTxt, statusTxt, xhr){
    if(statusTxt=="success")
      console.log("Header loaded!");
    if(statusTxt=="error")
      console.log("Failed to load header: " + xhr.status + " : " + xhr.statusTxt);
  });
  $(".navbar_container").load("./common/navbar.html", function(responseTxt, statusTxt, xhr){
    if(statusTxt=="success")
      console.log("Navbar loaded!");
    if(statusTxt=="error")
      console.log("Failed to load navbar: " + xhr.status + " : " + xhr.statusTxt);
  });
  $(".footer_container").load("./common/footer.html", function(responseTxt, statusTxt, xhr){
    if(statusTxt=="success")
      console.log("Footer loaded!");
    if(statusTxt=="error")
      console.log("Failed to load footer: " + xhr.status + " : " + xhr.statusTxt);
  });
  //

}

function createList(list){
  $.getJSON("./json/database.json", function(database){
    if(database.hasOwnProperty(list)){
      $(".content_container").text("");
      $("<div/>",{
        "class":"image-list"
      }).appendTo(".content_container");
      $.each(database[list], function(sublistName, sublistArray){
        $("<p/>",{
          text:sublistName
        }).appendTo(".image-list");
        $.each(sublistArray, function(topic, description){
          $("<div/>",{
            "onclick":"descriptionPage('" + list + "','" + sublistName + "','" + topic + "');",
            html:"<img src='img/" + topic + ".png'/><div><p>" + topic + "</p></div>"
          }).appendTo(".image-list");
        });
      });
    } else {
      console.log("List " + list + " not found!");
    }
  });
}

function descriptionPage(list, sublist, page){
  $.getJSON("./json/database.json", function(database){
    if(database.hasOwnProperty(list)){
      if(database[list].hasOwnProperty(sublist)){
        if(database[list][sublist].hasOwnProperty(page)){
          $(".content_container").text("");
          $("<div/>",{
            "class":"description-box",
            html:"<img src='img/" + page + ".png'/>"
          }).appendTo(".content_container");
          $("<p/>",{
            "class":"title",
            html:page
          }).appendTo(".content_container");
          $.each(database[list][sublist][page], function(topic, description){
            if(topic!="intro"){
              $("<p/>",{
                "class":"subtitle",
                html:topic
              }).appendTo(".content_container");
            }
            $("<p/>",{
              "class":"text",
              html:description
            }).appendTo(".content_container");
          });
        } else {
          console.log("Page " + page + " not found in sublist " + sublist + " in list " + list + "!");
        }
        $.each(database[list][page])
      } else {
        console.log("Sublist " + sublist + " not found in list " + list + "!");
      }
    } else {
      console.log("List " + list + " not found!");
    }
  });
}
