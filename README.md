# Language Therapy

Language Therapy est composé d'une application mobile et d'un site web ainsi que d'une API.




Il sert de support pour la rééducation de patients aphasiques bilingues français-arabe sur un principe simple, le patient doit retrouver l'image correspondant à l'item affiché.


 - Neuf catégories sémantiques pour le moment
![Alt text](readme/web-categories.jpg?raw=true "Categories")
 - Création de test en choisissant une ou plusieurs catégories
 ![Alt text](readme/web-testa.jpg?raw=true "Test exemple")
- Paramétrage du niveau de difficulté et d'autres options
 ![Alt text](readme/web-parametres.jpg?raw=true "parametres")
 - Mode image par image sans nom d'item affiché
![Alt text](readme/web-imageparimage.jpg?raw=true "imageparimage")


La version web est disponible ici http://88.190.14.12:1110/ ( authentification nécessaire )


### Structure par sous projets
 
 ##### data-creator  
 Script permettant à partir d'un dossier d'image de créer le fichier source utilisé par l'API et l'application Mobile.
 Mettre les images dans le dossier `mot-image` par catégories. Le nom des images doit respecter les régles suivantes : 
 - [nom_en_fr]-[nom_en_arabe].jpg   le tiret sépare le nom français de l'arabe
 - remplacer les espaces par des underscore
 Créer un fichier mp3 avec l'enregistrement vocale de chaque mot avec :
 - [nom_en_fr].mp3
 - [nom_en_fr]_ar.mp3
 
 ##### api
 ##### web
 ##### mobile

 
### Tech

 * React-Native
 * ReactJS
 * Redux
 * NodeJs
 * Docker


### Installation

NodeJs is required
Clone this repo

```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```
$ cd web
$ 
```

