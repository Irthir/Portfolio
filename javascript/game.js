import Player from "./player.js";
import Sword from "./sword.js";

var platforms
var swords = Array();

export default class MainScene extends Phaser.Scene
{

    constructor(config)
    {
        super("main");
    }

    preload ()
    {
        this.load.image('caex', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_000.png');
        this.load.image('caexIdle01', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_001.png');
        this.load.image('caexIdle02', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_002.png');
        this.load.image('caexIdle03', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_003.png');
        this.load.image('caexIdle04', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_004.png');
        this.load.image('caexIdle05', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_005.png');
        this.load.image('caexIdle06', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_006.png');
        this.load.image('caexIdle07', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_007.png');
        this.load.image('caexIdle08', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_008.png');
        this.load.image('caexIdle09', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_009.png');
        this.load.image('caexIdle10', 'assets/Knights/SeperateImages/BlueKnight_entity_000_Idle_010.png');

        this.load.image('caexWalk00', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_000.png');
        this.load.image('caexWalk01', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_001.png');
        this.load.image('caexWalk02', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_002.png');
        this.load.image('caexWalk03', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_003.png');
        this.load.image('caexWalk04', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_004.png');
        this.load.image('caexWalk05', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_005.png');
        this.load.image('caexWalk06', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_006.png');
        this.load.image('caexWalk07', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_007.png');
        this.load.image('caexWalk08', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_008.png');
        this.load.image('caexWalk09', 'assets/Knights/SeperateImages/BlueKnight_entity_000_walk_009.png');

        this.load.image('epee01','assets/Swords/Epee1.png');
        this.load.image('epee02','assets/Swords/Epee2.png');
        this.load.image('epee03','assets/Swords/Epee3.png');
        this.load.image('epee04','assets/Swords/Epee4.png');
        this.load.image('epee05','assets/Swords/Epee5.png');
        this.load.image('epee06','assets/Swords/Epee6.png');
        
        this.load.image('sky', 'assets/sky.png');
        this.load.image('platform', 'assets/platform.png')
    }

    create ()
    {
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'platform').setScale(2).refreshBody();

        //caex = this.physics.add.existing(new Player(this, 400, 450, 'caex')).setScale(0.2,0.2).refreshBody();
        
        this.player = new Player(this, "Joueur");

        //caex = this.physics.add.sprite(400,450, 'caex').setScale(0.2,0.2).refreshBody();

        this.physics.add.collider(this.player.getCaex(), platforms);

        for (let index = 0; index < 6; index++)
        {
            swords.push(new Sword(this, "sword",this.player.getCaex(),platforms, 100+100*index, 100));
        }
    }

    update(time, delta)
    {
    
        /*if (cursors.down.isDown)
        {
            console.info('Display List:');
            console.table(this.sys.displayList.list, [ 'name', 'type', 'x', 'y', 'visible', 'renderFlags', 'cameraFilter' ]);
            console.info('Update List:');
            console.table(this.sys.updateList._list, [ 'name', 'type', 'active' ]);
        }*/

        this.player.update(time, delta);
    }
    
}