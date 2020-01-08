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

#### data-creator

Script permettant à partir d'un dossier d'image de créer le fichier source utilisé par l'API et l'application Mobile.
Mettre les images dans le dossier `mot-image` par catégories. Le nom des images doit respecter les régles suivantes :

- taille de 500 x 500 (la compression en qualité 80% des images permet de réduire significativement leurs tailles)
- `[nom_en_fr]-[nom_en_arabe].jpg` le tiret sépare le nom français de l'arabe
- remplacer les espaces par des underscore
  Créer un fichier mp3 avec l'enregistrement vocale de chaque mot avec :
- `[nom_en_fr].mp3` (la compression en VBR des mp3 permet de réduire significativement leurs tailles)
- `[nom_en_fr]_ar.mp3`

Dossiers de sortie :
le script `app.js` :

- copie dans l'application mobile les images ( `/mobile/ressources/mot-image/` ), les mp3 ( `/mobile/android/app/src/main/res/raw`) et le fichier data.js (`/mobile/ressources/data.js`)
- copie dans l'API les images ( `/api/public/mot-image/` ), les mp3 ( `/api/public/mot-image/mp3/` ) et le fichier data.js ( `/api/data.js` )

#### api

Api développée NodeJS

L'API sert les services, les fichiers static et le site web en production.

```
$ cd api
$ npm install
$ node app.js  // or use npm start with PM2
écoute sur  localhost:1110 ( port défini dans api/src/port.json )
```

Il n'y a pas de base données. Les services utilisent des fonctions déclarées dans le fichier `src/serieHelper.js` pour récupérer les données adéquates  (ce fichier est identique à 99% de celui de la partie mobile ) .
Pour lancer les test sur `serieHelper`
```
$ npm test // test si les series de test sont correctement formés ( bon nombre d'image en fonction de la difficulté ect)
```



#### web

Site web développé avec ReactJS

```
$ cd web
$ npm install
$ npm start // ouvre chrome sur localhost:3000
```
Pour créer une version de production du site web (servable par n'importe quel serveur de fichier statique)
```
$ cd web
$ npm run build


```



#### mobile

L'application mobile a été developpée avec React-Native, testé uniquement sous Android
```
$ cd mobile
$ npm install
```

### Tech

- React-Native
- ReactJS
- Redux
- NodeJs
- Docker

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
