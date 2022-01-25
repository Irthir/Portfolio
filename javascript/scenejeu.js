import Player from "./player.js";
import Sword from "./sword.js";

var platforms
var walls
var swords = Array();
var updates = Array();

export default class SceneJeu extends Phaser.Scene
{
    constructor(config)
    {
        super("scenejeu");
        this.config = config;
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

        this.load.image('caexRun00', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_000.png');
        this.load.image('caexRun01', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_001.png');
        this.load.image('caexRun02', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_002.png');
        this.load.image('caexRun03', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_003.png');
        this.load.image('caexRun04', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_004.png');
        this.load.image('caexRun05', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_005.png');
        this.load.image('caexRun06', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_006.png');
        this.load.image('caexRun07', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_007.png');
        this.load.image('caexRun08', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_008.png');
        this.load.image('caexRun09', 'assets/Knights/SeperateImages/BlueKnight_entity_000_run_009.png');

        this.load.image('epee01','assets/Swords/Epee1.png');
        this.load.image('epee02','assets/Swords/Epee2.png');
        this.load.image('epee03','assets/Swords/Epee3.png');
        this.load.image('epee04','assets/Swords/Epee4.png');
        this.load.image('epee05','assets/Swords/Epee5.png');
        this.load.image('epee06','assets/Swords/Epee6.png');
        
        this.load.image('sky', 'assets/sky.png');
        this.load.image('platform', 'assets/platform.png');

        this.load.image('wall','assets/wall.png');
        
        this.load.spritesheet('teleporter','assets/MagicCircle.png',{
            frameWidth: 128,
            frameHeight: 128
            });
    }

    create ()
    {
        this.scale.displaySize.setAspectRatio(1920/1080);
        this.scale.refresh();

        this.add.image(1000, 600, 'sky').setScale(2.5);

        platforms = this.physics.add.staticGroup();
        walls = this.physics.add.staticGroup({
            key: 'wall',
            frameQuantity: 18});

        //Placement du sol
        platforms.create(1000, 1080, 'platform').setScale(5).refreshBody();
        
        //Placement des murs
        Phaser.Actions.PlaceOnRectangle(walls.getChildren(), new Phaser.Geom.Rectangle(192,192,1536,448));
        walls.refresh();

        this.player = new Player(this, "Joueur");
        updates.push(this.player);

        this.physics.add.collider(this.player.getCaex(), platforms);

        for (let index = 2; index < 38; index++)
        {
            var x = 50+50*index;
            var sword = new Sword(this, "sword",this.player,platforms, x, 1000, walls);
            swords.push(sword);
            updates.push(sword);
        }

        this.anims.create({
            key: 'magic',
            frames: this.anims.generateFrameNumbers('teleporter', { start: 0, end: 31 }),
            frameRate: 10,
            repeat: -1
        });
        //Gestion du téléporteur
        this.teleporter = this.add.sprite(70, 940, 'teleporter');
        this.teleporter.setScale(2);
        this.teleporter.anims.play('magic', true);
    }

    update(time, delta)
    {
        updates.forEach(element =>
        {
            element.update(time, delta);
        });


        let rayon = 15;
        if (this.player.getCaex().x <= this.teleporter.x+rayon && this.player.getCaex().x >= this.teleporter.x-rayon )
        {
            this.teleportation(1);
        }

        this.scale.refresh();
    }

    start(url)
    {
        this.resetScene();
        this.player.resetPlayer();
        this.scene.start(url);
    }

    
    resetScene()
    {
        platforms = null;
        walls = null;
        swords = Array();
        updates = Array();
    }

    teleportation(x)
    {
        if (x == 1)
        {
            this.start("scene2");
        }
    }

}