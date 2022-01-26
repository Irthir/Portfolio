// Index.js:
import MainScene from "./game.js";
import Scene1 from "./scene1.js";
import Scene2 from "./scene2.js";
import SceneJeu from "./scenejeu.js";

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
    scene: [MainScene, Scene1, Scene2, SceneJeu],
    scale: {mode: Phaser.Scale.FIT}
    };

    game = new Phaser.Game(config);
}

function loadScene(url)
{
    console.log("start "+ url);
    game.start(url);
}


// Prevent right click menu from showing because it is annoying
//document.addEventListener('contextmenu', event => event.preventDefault());
init();
for (let index = 0; index < 30; index++)
{
    console.log(game.scene.scenes[index]);
}
//loadScene("scene1");