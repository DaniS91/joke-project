//User Interface Logic
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import JokeService from './joke.js';

// Business Logic

function getJoke() {
  let promise = JokeService.getJoke();
  promise.then(function(joke) {
    printElements(joke);   
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

function printError(error) {
  document.querySelector('#jokeResponse').innerText = `There was an error accessing the joke data for ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  getJoke();
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});