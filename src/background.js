let nameData = new Map();
// Executes when the extension button is clicked.
chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.create({ url: "index.html" });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("memeButton").addEventListener("click", createMeme);
  getMemeNames('https://memegen.link/api/templates/');
});

function getMemeNames(url){
  nameData.clear();
  let memeNames = [];
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = function() {
    if (xhr.status == 200) {
      memeLinkData = xhr.response;
      let keys = Object.keys(memeLinkData);
      let vals = Object.values(memeLinkData);
      for(var i = 0; i < keys.length; i++){
        memeNames[i] = keys[i];
        nameData.set(keys[i], vals[i]);
      }
      displayNames(memeNames);
    }
  };
  xhr.send();
}

function createMeme() {
  let top = document.getElementById("topText").value;
  let bottom = document.getElementById("bottomText").value;
  let imgName = document.getElementById("image").value;
  let imgCode = nameData.get(imgName);

  const regex = /[a-z]*$/gm;
  let img = regex.exec(imgCode);
  console.log(img);

  document.getElementById("imgOut").innerHTML =
    '<img src="https://memegen.link/'+img+'/'+top+'/'+bottom+'.jpg" />';
}

function displayNames(memeNames) {
  let nameList = document.getElementById("imageNames");
  for(let i = 0; i < memeNames.length; i++) {
    nameList.innerHTML = nameList.innerHTML + memeNames[i] + '<br />';
  }
}