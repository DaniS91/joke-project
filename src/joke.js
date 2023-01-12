//Business Logic

// export default class JokeService {  
//   static getJoke() {
//     return new Promise(function(resolve, reject) {
//       let request = new XMLHttpRequest();
//       const url = `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
//       request.addEventListener("loadend", function() {
//         const response = JSON.parse(this.responseText);
//         if (this.status === 200) {
//           resolve(response);
//         } else {
//           reject([this, response]);
//         }
//       });
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }

// export default class JokeService {  
//   static getJoke() {
//     return fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`)
//       .then(function(response) {
//         if (!response.ok) {
//           const errorMessage = `${response.status} ${response.statusText}`;
//           throw new Error(errorMessage);
//         } else {
//           return response.json();
//         }
//       })      
//       .catch(function(error) {
//         return error;
//       });
//   }
// }

export default class JokeService {  
  static async getJoke() {
    try {
      const response = await fetch(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}