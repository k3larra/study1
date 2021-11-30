import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js'
import { firebase } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database-compat.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAQ2Tmn4lOu7IYRQq1Fz5DJA4jPKfcJT8",
  authDomain: "fba-and-inr.firebaseapp.com",
  databaseURL: "https://fba-and-inr-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fba-and-inr",
  storageBucket: "fba-and-inr.appspot.com",
  messagingSenderId: "236289404577",
  appId: "1:236289404577:web:9296a2e4f4e5dbd9f54ae0",
  measurementId: "G-HX7M7PBL8T"
};
const app = initializeApp(firebaseConfig);
//const database = firebase.database().ref();
function getIt(){
  //var defaultDatabase = app.database;

  //return database;
}
function create(id, parent, width, height) {
  console.log("hej");
}

function createReportList(wrapperId) {
  let list = document.createElement('ul');
  list.id = wrapperId + '-reporter';

  let canvasWrapper = document.getElementById(wrapperId);
  canvasWrapper.appendChild(list);

  return list.id;
}

export {getIt, app, create, createReportList };
