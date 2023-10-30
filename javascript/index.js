// Index.js:
import MainScene from "./game.js";
import Scene1 from "./scene1.js";
import Scene2 from "./scene2.js";
import Scene3 from "./scene3.js";
import Scene4 from "./scene4.js";
import Scene5 from "./scene5.js";
import Scene6 from "./scene6.js";
import Scene7 from "./scene7.js";
import Scene8 from "./scene8.js";
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
    scene: [MainScene, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, SceneJeu, SceneLien],
    scale: {mode: Phaser.Scale.FIT}
    };

    game = new Phaser.Game(config);
}

// Prevent right click menu from showing because it is annoying
//document.addEventListener('contextmenu', event => event.preventDefault());
init();