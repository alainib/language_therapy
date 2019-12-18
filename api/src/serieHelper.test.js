const path = require("path");
// les données seront dans _IMAGES
require(path.join(__dirname, "..", "data.js"))();
require(path.join(__dirname, "serieHelper.js"))();
require(path.join(__dirname, "tools.js"))();

const Config = {
  _const: {
    easy: "easy",
    middle: "middle",
    hard: "hard",
    fr: "fr",
    ar: "ar"
  }
};

const _levels = ["easy", "middle", "hard"];

const _allCategories = ["aliments", "animaux", "autre", "recette-arabe", "vehicules", "vetements", "parties-du-corps"];

describe("allCategoriesNames", () => {
  it("not null and length == 9", () => {
    const res = allCategoriesNames(_IMAGES);
    //expect(res.length).toBeGreaterThan(3);
    expect(res.length === 9).toBe(true);
  });

  it("matches contains", () => {
    const res = allCategoriesNames(_IMAGES);
    expect(res).toEqual(expect.arrayContaining(_allCategories));
  });
});

for (let i = 0; i < 10; i++) {
  for (let c in _allCategories) {
    for (let l in _levels) {
      const level = _levels[l];
      const categoriesName = _allCategories[c];
      for (let j = 0; j < 10; j++) {
        const nbrItem = getRandomInt(1, 50);
        const nbrOfImagePerItem = getRandomInt(2, 6);

        test("randomSerie " + categoriesName + " " + level + " " + nbrItem + " " + nbrOfImagePerItem, () => {
          const res = randomSerie(_IMAGES, categoriesName, nbrItem, nbrOfImagePerItem, Config._const.ar, level, null);
          /*
          const nbr = nbrOfImageForCategorie(level, nbrOfImagePerItem);
          
          let goodCategorie = true;
          for (let q in res.questions) {
            goodCategorie = goodCategorie && checkGoodCategorie(res.questions[q].images, categoriesName, nbr, nbrOfImagePerItem);
          }
          */
          const goodCategorie = checkGoodImages(level, nbrOfImagePerItem, res.questions, categoriesName);
          expect(goodCategorie).toBe(true);
          expect(res.questions.length === nbrItem || res.questions.length === _IMAGES[categoriesName].length).toBe(true);
        });
      }
    }
  }
}

/*
test("adds 1 + 2 to equal 3", () => {
  let res = sum(1, 2);

  expect(res).toBe(3);
});
*/
/*test("allCategoriesNames retourne les bonnes catégories", () => {
  
  const shouldContain = [
    "aliments",
    "animaux",
    "autre",
    "nombres-ar",
    "nombres-fr",
    "parties-du-corps",
    "recette-arabe",
    "vehicules",
    "vetements"
  ];
  expect(res).toEqual(expect.arrayContaining(shouldContain));
});*/
