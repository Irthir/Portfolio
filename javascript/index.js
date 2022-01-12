// Index.js:
import MainScene from "./game.js";

var config, game;
function init()
{
    config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [MainScene]
    };

    game = new Phaser.Game(config);
}


// Prevent right click menu from showing because it is annoying
//document.addEventListener('contextmenu', event => event.preventDefault());
init();