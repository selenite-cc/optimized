let currentver = "v1.0.2";
var ver;
getCDN();
$.get("https://raw.githubusercontent.com/skysthelimitt/selenite-optimized/main/activelink", function(data) {
  $("#gametitle").text("sry for this website being so bad, ill work on it eventually - current working link: " + data)
})
function loadGames() {
  $("#backarrow").hide();
  $.getJSON(cdnurl + "/games.json", function (data) {
    for (let i = 0; i < data.length; i++) {
      let $element = $("<div>")
        .prop({
          class: "game",
          style: "cursor: pointer;",
          id: data[i].directory,
        })
        .append(
          $("<img>").prop({
            src: cdnurl + "/" + data[i].directory + "/" + data[i].image,
            alt: data[i].name + " logo",
          })
        )
        .append($("<h1>").text(data[i].name));

      $("#games").append($element);
    }
  });
}
$(document).ready(function () {
  $(document).on("click", ".game", function (event) {
    redirectGame($(this).attr("id"), $(this).find("h1").text());
  });
});
function redirectGame(dir, title) {
  var iframe = document.createElement("iframe");
  $("#games").hide();
  $("#backarrow").show();
  $("#gametitle").show();
  $("#gametitle").text(title);
  iframe.src = cdnurl + "/" + dir + "/index.html";
  document.body.appendChild(iframe);
}

function exitGame() {
  $("iframe").remove();
  $("#backarrow").hide();
  $("#gametitle").hide();
  $("#games").show();
}
var cdnurl;
async function getCDN() {
  checkVer();
  $.getJSON(
    "https://raw.githubusercontent.com/skysthelimitt/selenite-optimized/main/links.json",
    async function (data) {
      cdnurls = data["urls"];
      for (let i = 0; i < cdnurls.length; i++) {
        var check = await fetch(cdnurls[i] + "/README.md");
        var checktext = await check.text();
        if (checktext.startsWith("## Selenite")) {
          console.log("CDN Found: " + cdnurls[i]);
          cdnurl = cdnurls[i];
          loadGames();
          break;
        } else {
          console.log("CDN Blocked: " + cdnurls[i]);
        }
      }
      if (!cdnurl) {
        alert(
          "looks like none of the cdns are available, please check again later."
        );
      }
    }
  );
}
async function checkVer() {
  var checkver = await fetch("https://raw.githubusercontent.com/skysthelimitt/selenite-optimized/main/ver");
  var ver = await checkver.text();
  if (!ver.startsWith(currentver)) {
    if (confirm("Your Selenite Optimized version is currently out of date. Click OK to update, or click cancel to continue.")
    ){
      window.location.replace("https://raw.githubusercontent.com/skysthelimitt/selenite-optimized/main/build/bookmark.txt");
    }
  }
}
