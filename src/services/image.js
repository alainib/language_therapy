
import RawDatas from "number_therapy/ressources/data";

/*let _PATH = "number_therapy/ressources/";

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
                        require(_PATH + "mot-image/serie-a/allumette.jpg"),
                        require(_PATH + "mot-image/serie-a/amande.jpg"),
                        require(_PATH + "mot-image/serie-a/ananas.jpg"),
                        require(_PATH + "mot-image/serie-a/arbre.jpg")
                    ]
                },
                {
                    "display": "ballon",
                    "clue": "ballon",
                    "answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
                        "rightIndex": 0, // index de la réponse correct
                    },
                    "images": [
                        require(_PATH + "mot-image/serie-a/appareil photo.jpg"),
                        require(_PATH + "mot-image/serie-a/arbre.jpg"),
                        require(_PATH + "mot-image/serie-a/bague.jpg"),
                        require(_PATH + "mot-image/serie-a/avion.jpg")
                    ]
                }
            ]
        }
    ],
    "comprehension": []
};
*/

/**
 * On renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
 * @param min
 * @param max
 * @returns {*}
 */
function tools_getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function createMotImageSerie(limit = 10) {
    let serie = {
        "display": "random",
        "questions": []
    }
    /*
        pour créer une serie de questions, 
        il faut pour chaque question choisir 4 images aux hasard 
        et en définir une comme celle à trouver
    */
    for (var lim = 0; lim < limit; lim++) {
        // on choisi les images aux hasard 
        // contient path + noms, on choisira a la fin lequel sera le bon
        let randomImages = [];
        // contient juste les chemins
        let images = [];

        for (var i = 0; i < 4; i++) {
            let l = tools_getRandomInt(0, RawDatas._IMAGES.length);
            randomImages.push(RawDatas._IMAGES[l]);
            images.push(RawDatas._IMAGES[l].path);
        }
        // image à trouver !
        let foundIndex = tools_getRandomInt(0, 3);
        serie.questions.push(
            {
                "display": randomImages[foundIndex]["ar"],
                "clue": randomImages[foundIndex]["fr"],
                "answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
                    "rightIndex": foundIndex, // index de la réponse correct
                },
                "images": images
            }
        )
    }


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

    return serie;
}