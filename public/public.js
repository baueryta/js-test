"use strict";

let idField = document.querySelector("#id");

if (document.querySelector("#answer")) {
let answerField = document.querySelector("#answer");
answerField.focus();
let submitButton = document.querySelector("#submit");
console.log(answerField.textContent);

submitButton.addEventListener("click", event => {
    event.preventDefault();
    let userAnswer = answerField.value;
    let aktId = idField.textContent;
    fetch("/checkanswer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"answer": userAnswer, "id": aktId})
    })
    .then ((res) => res.json())
    .then( (data) => {
        let correct = Number(data)
        console.log(correct);
        if (sessionStorage.getItem("count")) {
            correct += Number(sessionStorage.getItem("count"))
        }
        sessionStorage.setItem("count", correct)
        if (Number(aktId) < 10) {
        location.replace("/question/" + (Number(aktId) + 1)) 
        } else if (Number(aktId) > 9) {
            location.replace("/result")
        }
    })
    .catch(error => console.log(error))
})
}

const counter = sessionStorage.getItem("count");

if (document.querySelector("#message")) {
let message = document.querySelector("#message");

if (counter > 7) {message.textContent = `Glückwunsch! Du hast ${counter} Punkte erhalten. Deine JavaScript-Kenntnisse sind wunderbar!`}
else if (counter > 4) {message.textContent = `Du hast ${counter} Punkte erhalten. Es wäre nicht schlecht, ein Paar Themen zu wiederholen.`} 
else if (counter == 1) {message.textContent = `Du hast ${counter} Punkt erhalten. Der Kurs muss wiederholt werden.`}
else {message.textContent = `Du hast ${counter} Punkte erhalten. Der Kurs muss leider wiederholt werden.`}

let newstart = document.querySelector("#newstart");
newstart.addEventListener ("click", () => sessionStorage.clear())
}