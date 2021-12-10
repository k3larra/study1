'use strict';
if (document.readyState != 'loading'){
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}
// Page is loaded! Now event can be wired-up
function onDocumentReady() {
  console.log('Document ready.');
  document.getElementById('XAI').addEventListener('click', function(){
    console.log("Show it");
    let fileName="drake.jpg"
    let label=97;
    occlusion(fileName,label);
    //getData();
  });
}

function getData(){
    fetch('/getImage')
      .then(function (response) {
          return response.text();
      }).then(function (text) {
          console.log('response1');
          document.getElementById('image_start').src=text;
      });
}

function occlusion(filename,label){
    fetch('/occlusion/'+filename+"/"+label)
      .then(function (response) {
          return response.text();
      }).then(function (filename) {
          console.log(filename);
          document.getElementById('FBA').src=filename;
      }).catch(function(error){
          console.error('Error:', error);
      });
}
