'use strict';
var actTest = "Test01";
var actimage = "";
var actquestion = null;
var questions;
let methods = [];
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
  var ref = firebase.database().ref(actTest);
  ref.once("value", function(snapshot) {
               document.getElementById("studyTitle").innerHTML = snapshot.child('Title').val();
               //Get the methods
                snapshot.child('methods').forEach(function(childSnapshot) {
                  var key = childSnapshot.key;
                  var childData = childSnapshot.val();
                  methods.push(childData);
                  var ul = document.getElementById('FBA_items');
                  var li = document.createElement('li');
                  li.innerHTML = childData;
                  li.classList.add("list-group-item");
                  li.id = key;
                  ul.appendChild(li);
                });
                //get the questions
                questions = snapshot.child('questions').toJSON();
                console.log(questions);
                var count = Object.keys(questions).length;
                if (count>0){
                  actquestion= "q01";
                }else{
                  console.log("Empty");
                }
                addListeners();
                setQuestion(actquestion);
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
      clearAllMarks();
      target.classList.add('marker');
      console.log('../images/'+target.id+'_'+actimage);
      document.getElementById('FBA').src='../images/'+target.id+'_'+actimage;
  };
  document.getElementById('nextQuestion').addEventListener("click",function() {
  //     document.getElementById('FBA').src= '../images/saliencymap_duck.png';
        updateActQuestion(false);
        setQuestion(actquestion);
  });
  document.getElementById('backQuestion').addEventListener("click",function() {
  //     document.getElementById('FBA').src= '../images/saliencymap_duck.png';
        updateActQuestion(true);
        setQuestion(actquestion);
  });

    document.getElementById('FBA').addEventListener("error", function(){
      console.log("Fan");
      document.getElementById('FBA').src="images/not-found-image.jpg"
    });
}


function updateActQuestion(back) {
  var tempquestion = actquestion;
  if (back) {
    console.log(back, actquestion);
    var numberNow = actquestion.substring(1, 3);
    if (parseInt(numberNow) > 1) {
      numberNow = numberNow - 1;
      if (numberNow < 10) {
        actquestion = "q0" + numberNow;
      } else {
        actquestion = "q" + numberNow;
      }
      document.getElementById("nextQuestion").innerHTML="Save and next &rarr;";
    }
  } else {
    console.log(back, actquestion);
    for (var key of Object.keys(questions)) {
      if (key == actquestion) {
        var number = key.substring(1, 3);
        if (Object.keys(questions).length >= number) {
          number++;
          if (number < 10) {
            tempquestion = "q0" + number;
          } else {
            tempquestion = "q" + number;
          }
        }
      }
    }
    actquestion = tempquestion;
    var numberNow = actquestion.substring(1, 3);
    if (parseInt(numberNow) >= Object.keys(questions).length) {
      console.log("FINI");
      document.getElementById("nextQuestion").innerHTML = "Exit";
    }
    console.log(numberNow, Object.keys(questions).length);
  }
  console.log(actquestion);
}

function setQuestion(q_number){
  document.getElementById('answers').innerHTML = "";
  document.getElementById('image_start').src='../images/loading.gif';
  clearAllMarks();
  document.getElementById("XAIimage").style.display = "none";
  document.getElementById("XAIimage_waiting").style.display = "block";
  for (var key of Object.keys(questions)) {
      if(key==actquestion){
        console.log(key + " -> " + questions[key].img)
        actimage = questions[key].img;
        document.getElementById('image_start').src='../images/'+actimage;
        document.getElementById('question').innerHTML=questions[key].question;
        //Predict if not already done
        if (actquestion=="q01"){
          document.getElementById('pred_acc').innerHTML="Confidence level: <b>Drake</b> 21%, <b>Red-Breasted Merganser</b> 5%, <b>Maillot</b> 4%, <b>Prairie Chicken</b> 3%, <b>Leatherback Turtle</b> 3%";
        }
        if (actquestion=="q02"){
          document.getElementById('pred_acc').innerHTML="Confidence level: <b>Standard Poodle</b> 86%, <b>Miniature Poodle</b> 6%, <b>Bedlington terrier</b> 4%, <b>Irish water spaniel</b> 1%, <b>Afghan Hound</b> 0.3%";
        }

        //questionCheckBox
        var div = document.createElement('div');
        div.id = "checkbox1";
        var label = document.createElement('label');
        label.classList.add("form-label");
        label.innerHTML=questions[key].checkbox1;
        div.appendChild(label);
        methods.forEach(function(item, index, array){
          label = document.createElement("label");
          label.classList.add("form-check-label");
          label.innerHTML=item;
          var input = document.createElement("input");
          input.classList.add("form-check-input");
          input.type = "checkbox";
          input.id = "smuck";
          var divInner = document.createElement('div');
          divInner.classList.add("form-check");
          divInner.appendChild(input);
          divInner.appendChild(label);
          div.appendChild(divInner);
        });
        document.getElementById("answers").appendChild(div);
        //Forms:
        if(questions[key].form01!=null){
          createTextarea("form01",questions[key].form01);
        }
        if(questions[key].form02!=null){
          createTextarea("form02",questions[key].form02);
        }
        if(questions[key].form03!=null){
          createTextarea("form03",questions[key].form03);
        }
        if(questions[key].form04!=null){
          createTextarea("form04",questions[key].form04);
        }
      }
  }
}

function createTextarea(formnumber,question)   {
  console.log(question);
  var label = document.createElement('label');
  label.className = "form-label";
  label.for = formnumber;
  label.innerHTML= question;
  var textarea = document.createElement("textarea");
  textarea.className="form-control";
  textarea.id=formnumber;
  textarea.rows="3";
  textarea.spellcheck=false;
  document.getElementById("answers").appendChild(label);
  document.getElementById("answers").appendChild(textarea);
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
