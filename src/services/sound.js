import * as tools from "language_therapy/src/tools";
import Config from "language_therapy/src/Config";

var Sound = require("react-native-sound");

/**
 * play a sound
 * @param {*}  filename (located in android/app/src/main/res/raw)
 */
export function sound_play(filename) {
  console.log("sound_play(", filename);

  // filename est un path ou un require directmeent
  if (tools.isString(filename) && filename.indexOf(".mp3") < 0) {
    filename += ".mp3";
  }

  var sound = new Sound(filename, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("not found", filename);
      console.warn(error);
      return;
    }

    // setTimeout(() => {}, 500);

    sound.play(success => {
      // Release when it's done so we're not using up resources
      if (success) {
        sound.release();
      }
    });
  });
}
