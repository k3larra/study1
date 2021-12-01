'use strict';
var actTest = "Test01";
var actimage = "";
var actquestion = null;
var questions;
let methods = [];
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
  document.addEventListener('keydown', function(event) {
    switch (event.key) { // change to event.key to key to use the above variable
      case "ArrowLeft":
        // Left pressed
        console.log("last");
        document.getElementById('backQuestion').click();
        break;
      case "ArrowRight":
      console.log("next");
        document.getElementById('nextQuestion').click();
        break;
    }
  });
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
      document.getElementById('FBA').src="images/not-found-image.jpg"
    });
}


function updateActQuestion(back) {
  var tempquestion = actquestion;
  if (back) {
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
    for (var key of Object.keys(questions)) {
      if (key == actquestion) {
        var number = key.substring(1, 3);
        if (Object.keys(questions).length > number) {
          number++;
          if (number < 10) {
            tempquestion = "q0" + number;
          } else {
            tempquestion = "q" + number;
          }
        }else{
          alert("exit");
        }
      }
    }
    actquestion = tempquestion;

    var numberNow = actquestion.substring(1, 3);
    if (parseInt(numberNow) >= Object.keys(questions).length) {
      document.getElementById("nextQuestion").innerHTML = "Exit";
    }
  }
}

function setQuestion(q_number){
  document.getElementById('answers').innerHTML = "";
  for (var key of Object.keys(questions)) {
      if(key==actquestion){
        document.getElementById('question').innerHTML=questions[key].question;
        if(questions[key].layout==1){ //preset image
          clearAllMarks();
          document.getElementById("XAIimage").style.display = "none";
          document.getElementById("XAIimage_waiting").style.display = "block";
          document.getElementById('image_start').src='../images/loading.gif';
          document.getElementById('images-and-methods').style.display = "block";
          actimage = questions[key].img;
          document.getElementById('image_start').src='../images/'+actimage;
          document.getElementById('pred_acc').classList.remove("text-start");
          document.getElementById('pred_acc').innerHTML="";
        } else if (questions[key].layout==0) {
            console.log("What");
            document.getElementById('images-and-methods').style.display = "none";
            document.getElementById('pred_acc').innerHTML=questions[key].info1;
            document.getElementById('pred_acc').classList.add("text-start");
        }
        //Predict if not already done
        if (actquestion=="q02"){
          document.getElementById('pred_acc').classList.remove("text-start");
          document.getElementById('pred_acc').innerHTML="Confidence level: <b>Drake</b> 21%, <b>Red-Breasted Merganser</b> 5%, <b>Maillot</b> 4%, <b>Prairie Chicken</b> 3%, <b>Leatherback Turtle</b> 3%";
        }else if (actquestion=="q03"){
          document.getElementById('pred_acc').classList.remove("text-start");
          document.getElementById('pred_acc').innerHTML="Confidence level: <b>Standard Poodle</b> 86%, <b>Miniature Poodle</b> 6%, <b>Bedlington terrier</b> 4%, <b>Irish water spaniel</b> 1%, <b>Afghan Hound</b> 0.3%";
        }else if (actquestion=="q04"){
          document.getElementById('pred_acc').classList.remove("text-start");
          document.getElementById('pred_acc').innerHTML="Confidence level: <b>Flamingo</b> 99%, <b>Goldfish</b> 0.06%, <b>Macaw</b> 0.02%, <b>Spoonbill</b> 0.01%, <b>Crane</b> 0,00%";
        }else if (actquestion=="q05"){
          document.getElementById('pred_acc').classList.remove("text-start");
          document.getElementById('pred_acc').innerHTML="Confidence level: <b>African Crocodile</b> 16%, <b>Sidewinder</b> 15%, <b>Komodo Dragon</b> 11%, <b>Horned Viper</b> 8%, <b>Frilled Lizard</b> 7%";
        }else if (actquestion=="q06"){
          document.getElementById('pred_acc').classList.remove("text-start");
          document.getElementById('pred_acc').innerHTML="Confidence level: <b>Lemon</b> 67%, <b>Orange</b> 17%, <b>Spaghetti Squash</b> 12%, <b>Black Widow</b> 0.3%, <b>Pineapple</b> 0.3%";
        }
        //questionCheckBox
        if(questions[key].checkbox1!=null){
          var div = document.createElement('div');
          div.id = "checkbox1";
          div.classList.add("mt-3");
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
            var divInner = document.createElement('div');
            divInner.classList.add("form-check");
            divInner.appendChild(input);
            divInner.appendChild(label);
            div.appendChild(divInner);
          });
          document.getElementById("answers").appendChild(div);
        }
        if(questions[key].checkbox2!=null){  //Takes a string separated by ";" and builds a checkbox;
          const myArray = questions[key].checkbox2.split(";");
          var div = document.createElement('div');
          div.classList.add("mt-3");
          div.id = "checkbox2";
          var label = document.createElement('label');
          label.classList.add("form-label");
          label.innerHTML=myArray[0];
          div.appendChild(label);
          for (var i = 1; i < myArray.length; i++) {
              console.log(myArray[i]);
              label = document.createElement("label");
              label.classList.add("form-check-label");
              label.innerHTML= myArray[i];
              var input = document.createElement("input");
              input.classList.add("form-check-input");
              input.type = "radio";
              input.name = "flexRadioGroup";
              var divInner = document.createElement('div');
              divInner.classList.add("form-check");
              divInner.appendChild(input);
              divInner.appendChild(label);
              div.appendChild(divInner);
          }
          document.getElementById("answers").appendChild(div);
        }

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
  var indicator= parseInt(actquestion.substring(1, 3))+"/"+Object.keys(questions).length;
  document.getElementById("page-indicator").innerHTML=indicator;
}

function createTextarea(formnumber,question)   {
  var label = document.createElement('label');
  label.className = "form-label";
  label.classList.add("mt-3");
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
