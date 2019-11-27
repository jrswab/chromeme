// Executes when the extension button is clicked.
chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.create({ url: "index.html" });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("memeButton").addEventListener("click", getMemeData);
});

function getMemeData() {
  console.log("clicked");
  let top = document.getElementById("topText").value;
  let bottom = document.getElementById("bottomText").value;
  let img = document.getElementById("image").value;

  document.getElementById("imgOut").innerHTML =
    '<img src="https://memegen.link/'+img+'/'+top+'/'+bottom+'.jpg" />';
}