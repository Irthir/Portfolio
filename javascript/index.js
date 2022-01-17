// Index.js:
import MainScene from "./game.js";

var config, game;
function init()
{
    config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug : true
        }
    },
    scene: [MainScene],
    scale: {mode: Phaser.Scale.FIT}
    };

    game = new Phaser.Game(config);
}


// Prevent right click menu from showing because it is annoying
//document.addEventListener('contextmenu', event => event.preventDefault());
init();