import express from "express";
import path from "path";
import fs from "fs";

const APP = express();
const IP = "127.0.0.1";
const PORT = 8081;

import models from "./models/index.js";

models.sequelize.sync( {force: true} )
.then( () => {
    console.log("DB und Tabelle erstellt");

    // mehrere DB-Einträge erstellen
    models.Question.bulkCreate([
        {
        name: "1. Wie wird ein HTML-Element in JS erstellt?",
        answer: `createElement`
        },
        {
        name: "2. Wie heißt die Methode, die ein in JS erzeugtes Element in DOM sichtbar macht?",
        answer: `append`
        },
        {
        name: "3. Welche Package muss installiert werden, um mit Datenbanken arbeiten zu können?",
        answer: `equelize`
        },
        {
        name: "4. Abkürzung von Regular Expressions und gleichzeitig Konstruktor-Funktion:",
        answer: `RegExp`
        },
        {
        name: "5. Welche Methode muss bei dem Array [5, 7, 9, 56, 4, 45, 11] angewendet werden, sodass im Ergebnis-Array nur die Zahlen gesammelt werden, die > 10 sind?",
        answer: `filter`    
        },
        {
        name: "6. Globale Funktion, um asynchrone Anfragen zu erstellen (Alternative zur Verwendung des XMLHttpRequest-Objektes):",
        answer: `fetch`
        },
        {
        name: "7. Schreibe den Code zu Ende:\n import express from ...",
        answer: `\"express\"`
        },
        {
        name: "8. Um HTML-Code aus der ejs-Datei zurückzugeben, wird statt res.send() ... verwendet.",
        answer: `res.render`
        },
        {
        name: "9. Welche Methode wird auf das localStorage angewendet, um ein Element da abzuspeichern?",
        answer: `setItem`
        },
        {
        name: "10. Name der Datenstruktur, in der wie in Objekten Schlüssel-Wert-Paare gespeichert werden. Sie kann jeden Datentyp als Schlüssel verwenden:",
        answer: `Map`
        }
    ])
    .then( (data) => {
        console.log(data);

        APP.set("view engine", "ejs");

        APP.use(express.static("public"));

        APP.use(express.urlencoded({extended: true}));
        APP.use(express.json());
        APP.post("/question", (req,res) => { 
    
            res.render("quiz", { question: data });
    
        });

        APP.post("/checkanswer", (req, res) => {
            let id = parseInt(req.body.id);
            let userAnswer = req.body.answer;
            console.log(userAnswer);

            models.Question.findOne({
                raw: true,
                attributes: ["answer"],
                where: {
                    id: id
                
                }
            })
            .then(obj => {
                console.log(obj);
                if ((new RegExp (obj.answer)).test (userAnswer)) {res.send("true")} else {res.send("false")}       
            })

            //res.redirect("/question/" + (id+1))
        });
        
        APP.get("/question/:idQuestion", (req, res) => { 
            let aktId = parseInt(req.params.idQuestion);
            if(!aktId) res.send("Error - not found");

            models.Question.findOne({
                raw: true, 
                attributes: ["id", "name", "answer"],
                where: {
                id: aktId      
                }
            })
            .then( data => {
            console.log(data);

            res.render("quiz", { question: data });
            });
    
        });

        APP.get("/result", (req,res) => {
            res.render("result")
        })

        APP.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`))

    })
})