let memeNames = [];
// Executes when the extension button is clicked.
chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.create({ url: "index.html" });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("memeButton").addEventListener("click", createMeme);
  getMemeNames('https://memegen.link/api/templates/');
});

function getMemeNames(url){
  let nameData;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = function() {
    if (xhr.status == 200) {
      nameData = xhr.response;
      var keys = Object.keys(nameData);
      for(var i=0; i<keys.length; i++){
        memeNames[i] = keys[i];
      }
      displayNames(memeNames);
    }
  };
  xhr.send();
}

function createMeme() {
  console.log("clicked");
  let top = document.getElementById("topText").value;
  let bottom = document.getElementById("bottomText").value;
  let img = document.getElementById("image").value;

  document.getElementById("imgOut").innerHTML =
    '<img src="https://memegen.link/'+img+'/'+top+'/'+bottom+'.jpg" />';
}

function displayNames(memeNames) {
  let nameList = document.getElementById("imageNames");
  for(let i = 0; i < memeNames.length; i++) {
    console.log(memeNames[i]);
    nameList.innerHTML = nameList.innerHTML + memeNames[i] + '<br />';
  }
}