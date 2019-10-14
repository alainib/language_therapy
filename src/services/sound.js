import * as tools from "language_therapy/src/tools";
import Config from "language_therapy/src/Config";

var Sound = require("react-native-sound");

/**
 * play a sound
 * @param {*}  filename (located in android/app/src/main/res/raw)
 */
export function sound_play(filename) {
  setTimeout(() => {
    if (filename.indexOf(".mp3") < 0) {
      filename += ".mp3";
    }

    var sound = new Sound(filename, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("not found", filename);
        console.warn(error);
        return;
      }
    });

    setTimeout(() => {
      sound.play(success => {});
    }, 100);
  }, 100);
}
