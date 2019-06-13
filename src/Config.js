
import { Dimensions } from "react-native";
let { width, height } = Dimensions.get("window");

//import { _DATA } from 'number_therapy/resources/data.json';
const _PATH = "number_therapy/resources/"

let data = {
	"mot-image": [
		{
			"display": "serie-a",
			"questions": [
				{
					"display": "لوز",
					"clue": "amande",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"rightIndex": 0, // index de la réponse correct
					},
					"images": [
						require(_PATH + "mot-image/serie-a/01.jpg"),
						require(_PATH + "mot-image/serie-a/02.jpg"),
						require(_PATH + "mot-image/serie-a/03.jpg"),
						require(_PATH + "mot-image/serie-a/04.jpg")
					]
				},
				{
					"display": "ballon",
					"clue": "ballon",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"rightIndex": 0, // index de la réponse correct
					},
					"images": [
						require(_PATH + "mot-image/serie-a/05.jpg"),
						require(_PATH + "mot-image/serie-a/03.jpg"),
						require(_PATH + "mot-image/serie-a/07.jpg"),
						require(_PATH + "mot-image/serie-a/08.jpg")
					]
				},
				{
					"display": "café",
					"clue": "café",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"rightIndex": 3,
					},
					"images": [
						require(_PATH + "mot-image/serie-a/09.jpg"),
						require(_PATH + "mot-image/serie-a/10.jpg"),
						require(_PATH + "mot-image/serie-a/11.jpg"),
						require(_PATH + "mot-image/serie-a/12.jpg")
					]
				},
				{
					"display": "carrote",
					"clue": "carrote",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"rightIndex": 1,
					},
					"images": [
						require(_PATH + "mot-image/serie-a/13.jpg"),
						require(_PATH + "mot-image/serie-a/14.jpg"),
						require(_PATH + "mot-image/serie-a/15.jpg"),
						require(_PATH + "mot-image/serie-a/16.jpg")
					]
				}
			]
		},
		{
			"display": "serie-b",
			"questions": [
				{
					"display": "fourchette",
					"clue": "fourchette",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"rightIndex": 1,
					},
					"images": [
						require(_PATH + "mot-image/serie-b/33.jpg"),
						require(_PATH + "mot-image/serie-b/34.jpg"),
						require(_PATH + "mot-image/serie-b/35.jpg"),
						require(_PATH + "mot-image/serie-b/36.jpg")
					]
				},
				{
					"display": "lapin",
					"clue": "lapin",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"rightIndex": 2,
					},
					"images": [
						require(_PATH + "mot-image/serie-b/37.jpg"),
						require(_PATH + "mot-image/serie-b/38.jpg"),
						require(_PATH + "mot-image/serie-b/39.jpg"),
						require(_PATH + "mot-image/serie-b/40.jpg")
					]
				},
				{
					"display": "café",
					"clue": "café",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"rightIndex": 3, // index de la réponse correct
					},
					"images": [
						require(_PATH + "mot-image/serie-a/09.jpg"),
						require(_PATH + "mot-image/serie-a/10.jpg"),
						require(_PATH + "mot-image/serie-a/11.jpg"),
						require(_PATH + "mot-image/serie-a/12.jpg")
					]
				},
				{
					"display": "carrote",
					"clue": "carrote",
					"answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
						"rightIndex": 2
					},
					"images": [
						require(_PATH + "mot-image/serie-a/13.jpg"),
						require(_PATH + "mot-image/serie-a/14.jpg"),
						require(_PATH + "mot-image/serie-a/15.jpg"),
						require(_PATH + "mot-image/serie-a/16.jpg")
					]
				}
			]
		}
	],
	"comprehension": []
};


for (var t in data["mot-image"]) {

	let serie = data["mot-image"][t];

	for (var q in serie.questions) {
		let question = serie.questions[q];
		question.answer = {
			...question.answer,
			"clickedIndex": null, // indice de l'image cliquée
			"showBorder": false, // affiche l'encadré ?
			"correct": false, //réponse juste
			"wrong": false, // réponse fausse 
			"attempt": 0, // nombre de tentative 
		}
	}
}



export default {
	data,
	width
}