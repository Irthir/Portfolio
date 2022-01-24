// Index.js:
import MainScene from "./game.js";
import Scene1 from "./scene1.js";

var config, game;
function init()
{
    config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: "game",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug : true
        }
    },
    scene: [MainScene, Scene1],
    scale: {mode: Phaser.Scale.FIT}
    };

    game = new Phaser.Game(config);
}


// Prevent right click menu from showing because it is annoying
//document.addEventListener('contextmenu', event => event.preventDefault());
init();