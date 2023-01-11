//User Interface Logic
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { library } from 'webpack';
import './css/styles.css';
import JokeService from './joke.js';

let globalJoke = {}; // Response Joke Object
let globalJokeArray = []; // Words of the joke split up

// Business Logic

function getJoke() {
  let promise = JokeService.getJoke();
  promise.then(function(joke) {
    printElements(joke); 
    globalJoke = joke;
    let practiceButton = document.getElementById("practiceButton");
    practiceButton.addEventListener("click", practiceJoke);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// UI Logic

function printElements(data) {
  document.querySelector('#jokeResponse').innerHTML = '';
  const jokeType = data['type'];
  if (jokeType === "single"){
    document.querySelector('#jokeResponse').innerHTML = data['joke'];
  }else if (jokeType === 'twopart') {
    let question = document.createElement("div");
    question.setAttribute("id","jokeQuestion");
    question.innerHTML = `Q: ${data['setup']}`;
    let answer = document.createElement("div");
    answer.setAttribute("id","jokeAnswer");
    answer.innerHTML = `A: ${data['delivery']}`;
    document.querySelector('#jokeResponse').append(question);
    document.querySelector('#jokeResponse').append(answer);
  }
}

function jokeFormGenerator(jokeArray){
  const ul = document.querySelector("ul");
  jokeArray.forEach((element, index) => {
    const li = document.createElement("li");
    li.append(element + ' ');
    ul.append(li);
    li.setAttribute("id", `${index}`);

    if (globalJoke['type'] === "twopart" && index === 0){
      const li = document.createElement("li");
      li.append('Q: ');
      ul.prepend(li);
    } else if (globalJoke['type'] === "twopart" && index === (globalJoke['setup'].split(' ').length-1)){
      ul.append(document.createElement("br"));
      const li = document.createElement("li");
      li.append('A: ');
      ul.append(li);
    }
  });
  let num = Math.floor(Math.random() * jokeArray.length);
  for (let i = 0; i<jokeArray.length; i++) {
    if (i === num) {
      let itemToDelete = document.getElementById(`${i}`);
      itemToDelete.innerText = '';
      let textBox = document.createElement("input");
      textBox.setAttribute("id", `${i}`);
      textBox.setAttribute("type", "text");
      itemToDelete.append(textBox);
    }
  }
  let compareButton = document.getElementById("compareButton");
  compareButton.addEventListener("click", compareInput);
}

function practiceJoke() {
  let data = globalJoke;
  const jokeType = data['type'];
  const ul = document.querySelector("ul");
  ul.innerHTML = null;
  if (jokeType === 'twopart') {
    let jokeArray = (data['setup'].split(' ')).concat(data['delivery'].split(' '));
    globalJokeArray = jokeArray;
    jokeFormGenerator(jokeArray);
  } else if (jokeType === 'single') {
    let jokeArray = data['joke'].split(' ');
    globalJokeArray = jokeArray;
    jokeFormGenerator(jokeArray);
  }
  }

function compareInput() {
  let jokeArray = globalJokeArray;
  let input = document.querySelector('input').value;
  let inputNum = document.querySelector('input').getAttribute('id');
  let results = document.getElementById('results');
  if (input === jokeArray[parseInt(inputNum)]) {
    results.innerHTML = "Correct!";
  } else {
    results.innerHTML = `Nope! The correct word was ${jokeArray[parseInt(inputNum)]}`;
  }
}

function printError(error) {
  document.querySelector('#jokeResponse').innerText = `There was an error accessing the joke data for ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  document.querySelector("ul").innerHTML = null;
  document.getElementById('results').innerHTML = null;
  getJoke();
}

window.addEventListener("load", function() {
  document.querySelector("form#makeJokeForm").addEventListener("submit", handleFormSubmission);
});

