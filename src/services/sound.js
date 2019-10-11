import * as tools from "language_therapy/src/tools";
import Config from "language_therapy/src/Config";

var Sound = require("react-native-sound");

/**
 * play a sound
 * @param {*}  filename (located in android/app/src/main/res/raw)
 */
export function sound_play(filename) {
  setTimeout(() => {
    filename = "test.mp3";

    var sound = new Sound(filename, Sound.MAIN_BUNDLE, error => {
      console.log(error);
    });

    setTimeout(() => {
      sound.play(success => {});
    }, 100);
  }, 100);
}
