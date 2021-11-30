'use strict';

//import {getIt, app, create, createReportList } from './fb.js';
//import { app} from './';
//'use strict';
// const app = initializeApp(firebaseConfig);
//Wait till all content is loaded, could be external fonts scripts from other servers etc....
if (document.readyState != 'loading'){
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}
// Page is loaded! Now event can be wired-up
function onDocumentReady() {
  console.log('Document ready.');
  document.getElementById("XAIimage").style.display = "none";
  document.getElementById("XAIimage_waiting").style.display = "block";
  getFirebase();
}

function getFirebase(){
  var ref = firebase.database().ref('Test01');
  ref.once("value", function(snapshot) {
               document.getElementById("studyTitle").innerHTML = snapshot.child('Title').val();
                snapshot.child('methods').forEach(function(childSnapshot) {
                  var key = childSnapshot.key;
                  console.log("***key**",key);
                  var childData = childSnapshot.val();
                  var ul = document.getElementById('FBA_items');
                  var li = document.createElement('li');
                  li.innerHTML = childData;
                  li.classList.add("list-group-item");
                  li.id = key;
                  ul.appendChild(li);
                });
                addListeners();
          });
}
//Helpers
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function addListeners(){
  var ul = document.getElementById('FBA_items');
  ul.onclick = function(event) {
      var target = getEventTarget(event);
      console.log(target.id);
      clearAllMarks();
      target.classList.add('marker');
      document.getElementById('FBA').src='../images/'+target.id+'_duck.png';
  };
}

 // document.getElementById('FBA_items').addEventListener("click",xaiMethod)
 // function xaiMethod() {
 //   var target=getEventTarget(event);
 //   document.getElementById(target).src= '../images/saliencymap_duck.png'
 //   console.log(target.id);
 // }


// document.querySelector("#Saliency_map").onclick = function() {
//     document.getElementById('FBA').src= '../images/saliencymap_duck.png';
//     clearAllMarks();
//     this.classList.add('marker');
// }
// document.querySelector("#Integrated_Gradient").onclick = function() {
//     document.getElementById('FBA').src='../images/ig_duck.png';
//     clearAllMarks();
//     this.classList.add('marker');
// }
// document.querySelector("#SmothGrad").onclick = function() {
//     document.getElementById('FBA').src='../images/sg_duck.png';
//     clearAllMarks();
//     this.classList.add('marker');
// }
// document.querySelector("#GradCAM").onclick = function() {
//     document.getElementById('FBA').src='../images/gradcam_duck.png';
//     clearAllMarks();
//     this.classList.add('marker');
// }
// document.querySelector("#Layer-wise_Relevance_Propagation").onclick = function() {
//     document.getElementById('FBA').src='../images/lrp_duck.png';
//     clearAllMarks();
//     this.classList.add('marker');
// }
// document.querySelector("#DeepLift").onclick = function() {
//     document.getElementById('FBA').src='../images/deeplift_duck.png';
//     clearAllMarks();
//     this.classList.add('marker');
// }
// document.querySelector("#Guided_Backpropagation").onclick = function() {
//     document.getElementById('FBA').src='../images/gb_duck.png';
//     clearAllMarks();
//     this.classList.add('marker');
// }

function clearAllMarks(){
  var ul = document.getElementById("FBA_items");
  var items = ul.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
    items[i].classList.remove('marker')
  }
  document.getElementById("XAIimage").style.display = "block";
  document.getElementById("XAIimage_waiting").style.display = "none";
}

// function PreLoadAllImages() {
//   var images = new Array();
//   var numberofimages = 0, loadedimages = 0;
//   function preload() {
//     numberofimages = preload.arguments.length;
//     for (i = 0; i < preload.arguments.length; i++) {
//       images[i] = new Image();
//       images[i].src = preload.arguments[i];
//       images[i].onload = () => {
//          loadedimages++;
//          if(loadedimages == numberofimages){
//              console.log("All images are loaded");
//          }
//       }
//     }
//   }
//
//   preload('../images/saliencymap_duck.png', '../images/ig_duck.png','../images/sg_duck.png','../images/gradcam_duck.png','../images/lrp_duck.png','../images/deeplift_duck.png','../images/gb_duck.png');
// }
