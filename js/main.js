//Wait till all content is loaded, could be external fonts scripts from other servers etc....
if (document.readyState != 'loading'){
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}

// Page is loaded! Now event can be wired-up
function onDocumentReady() {
  console.log('Document ready.');
  PreLoadAllImages();
}




let FBAImage = document.querySelector('#FBA');
document.querySelector("#Saliency_map").onclick = function() {
    FBAImage.setAttribute('src','../images/saliencymap_duck.png');
    clearAllMarks();
    this.classList.add('marker');
}
document.querySelector("#Integrated_Gradient").onclick = function() {
    FBAImage.setAttribute('src','../images/ig_duck.png');
    clearAllMarks();
    this.classList.add('marker');
}
document.querySelector("#SmothGrad").onclick = function() {
    FBAImage.setAttribute('src','../images/sg_duck.png');
    clearAllMarks();
    this.classList.add('marker');
}
document.querySelector("#GradCAM").onclick = function() {
    FBAImage.setAttribute('src','../images/gradcam_duck.png');
    clearAllMarks();
    this.classList.add('marker');
}
document.querySelector("#Layer-wise_Relevance_Propagation").onclick = function() {
    FBAImage.setAttribute('src','../images/lrp_duck.png');
    clearAllMarks();
    this.classList.add('marker');
}
document.querySelector("#DeepLift").onclick = function() {
    FBAImage.setAttribute('src','../images/deeplift_duck.png');
    clearAllMarks();
    this.classList.add('marker');
}
document.querySelector("#Guided_Backpropagation").onclick = function() {
    FBAImage.setAttribute('src','../images/gb_duck.png');
    clearAllMarks();
    this.classList.add('marker');
}

function clearAllMarks(){
  var ul = document.getElementById("FBA_items");
  var items = ul.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
    items[i].classList.remove('marker')
  }
}

function PreLoadAllImages() {
  var images = new Array();
  var numberofimages = 0, loadedimages = 0;
  function preload() {
    numberofimages = preload.arguments.length;
    for (i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
      images[i].onload = () => {
         loadedimages++;
         if(loadedimages == numberofimages){
             console.log("All images are loaded");
         }
      }
    }
  }

  preload('../images/saliencymap_duck.png', '../images/ig_duck.png','../images/sg_duck.png','../images/gradcam_duck.png','../images/lrp_duck.png','../images/deeplift_duck.png','../images/gb_duck.png');
}
