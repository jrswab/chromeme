// Global map for pass by reference.
let nameData = new Map();

// Executes when the extension button is clicked.
chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.create({ url: "index.html" });
});

// Wait for the page to load befor setting event listeners and loading
// meme data.
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("memeButton").addEventListener("click", createMeme);
  getMemeNames('https://memegen.link/api/templates/');
});

// Get all the meme titles and URLs from the meme.link API
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

// Function runs on button click.
function createMeme() {
  document.getElementById("fakeProgress").style.display = "block";
  let top = document.getElementById("topText").value;
  let bottom = document.getElementById("bottomText").value;
  let imgName = document.getElementById("image").value;
  let imgCode = nameData.get(imgName);

  const regex = /[a-z\-]*$/gm;
  let img = regex.exec(imgCode);

  document.getElementById("imgOut").innerHTML =
    '<img id="meme" src="https://memegen.link/'+img+'/'+encodeURIComponent(top)+'/'+encodeURIComponent(bottom)+'.jpg" />';
  
  checkImage();
}


// Loads the titles from the API to give the user the correct names to input.
function displayNames(memeNames) {
  select = document.getElementById('image');
  for (let i = 0; i < memeNames.length; i++){
      let opt = document.createElement('option');
      opt.value = memeNames[i];
      opt.innerHTML = memeNames[i];
      select.appendChild(opt);
  }
}

// Hide the progress bar after image loads.
function checkImage() {
  if (document.getElementById("meme").complete) {
    document.getElementById("fakeProgress").style.display = "none";
  } else {
    setTimeout(checkImage, 100);
  }
}