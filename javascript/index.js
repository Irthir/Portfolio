// Index.js:
import MainScene from "./game.js";
import Scene1 from "./scene1.js";
import Scene2 from "./scene2.js";
import Scene3 from "./scene3.js";
import Scene4 from "./scene4.js";
import SceneJeu from "./scenejeu.js";
import SceneLien from "./scenelien.js";

var config, game;
function init()
{
    config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "divgame",
    physics: {
        default: 'arcade',
        arcade: {
            //debug : true
        }
    },
    scene: [MainScene, Scene1, Scene2, Scene3, Scene4, SceneJeu, SceneLien],
    scale: {mode: Phaser.Scale.FIT}
    };

    game = new Phaser.Game(config);
}

// Prevent right click menu from showing because it is annoying
//document.addEventListener('contextmenu', event => event.preventDefault());
init();