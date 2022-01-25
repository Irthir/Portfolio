import Player from "./player.js";
import Sword from "./sword.js";
import Trigger from "./triggerVolume.js";

var platforms
var walls
var swords = Array();
var updates = Array();

export default class MainScene extends Phaser.Scene
{

    constructor(config)
    {
        super("main");
        this.config = config;
    }

    preload ()
    {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((width / 2)-180, (height / 2)-10, 320, 50);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((width / 2)-170, (height / 2), 300 * value, 30);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Chargement...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);


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
        this.load.image('epee07','assets/Swords/Epee7.png');
        this.load.image('epee08','assets/Swords/Epee8.png');

        this.load.audio("do", ["assets/Sons/do.mp3"]);
        this.load.audio("re", ["assets/Sons/re.mp3"]);
        this.load.audio("mi", ["assets/Sons/mi.mp3"]);
        this.load.audio("fa", ["assets/Sons/fa.mp3"]);
        this.load.audio("sol", ["assets/Sons/sol.mp3"]);
        this.load.audio("la", ["assets/Sons/la.mp3"]);
        this.load.audio("si", ["assets/Sons/si.mp3"]);
        this.load.audio("do2", ["assets/Sons/do2.mp3"]);
        
        this.load.image('sky', 'assets/sky.png');
        this.load.image('platform', 'assets/platform.png');

        this.load.image('portfolio','assets/Projets/Portfolio.png');
        this.load.image('portfoliogamifie','assets/Projets/Caex.png');
        this.load.image('wall','assets/wall.png');
        this.load.image('mur','assets/mur.png');
    }

    create ()
    {
        this.scale.displaySize.setAspectRatio(1920/1080);
        this.scale.refresh();

        this.add.image(1000, 600, 'sky').setScale(2.5);

        platforms = this.physics.add.staticGroup();
        walls = this.physics.add.staticGroup();

        //Placement du sol
        platforms.create(1000, 1080, 'platform').setScale(5).refreshBody();
        
        //Placement des murs
        for (let index = 0; index < 5; index++)
        {
            if (index==4)
            {
                for (let jndex = 0; jndex < 7; jndex++)
                {
                    walls.create(576+(128*jndex),64+128*index, 'wall');
                }
            }
            else
            {
                walls.create(960,64+128*index, 'wall');
            }
        }

        //Phaser.Actions.PlaceOnRectangle(walls.getChildren(), new Phaser.Geom.Rectangle(64,64,1344,640));
        //walls.refresh();

        this.player = new Player(this, "Joueur");
        updates.push(this.player);

        this.physics.add.collider(this.player.getCaex(), platforms);

        for (let index = 0; index < 38; index++)
        {
            var x = 50+50*index;
            var sword = new Sword(this, "sword",this.player,platforms, x, 1000, walls);
            swords.push(sword);
            updates.push(sword);
        }

        this.trigger0 = new Trigger(this,"Trigger",swords,"portfolio",1,"https://romainschlotter.wixsite.com/portfolio",false,480,300);

        this.trigger1 = new Trigger(this,"Trigger",swords,"portfoliogamifie",1,"scene1",true,1440,300);
    }

    update(time, delta)
    {
        updates.forEach(element =>
        {
            element.update(time, delta);
        });
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

}