/**
 * On renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
 * @param min
 * @param max
 * @returns {*}
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}