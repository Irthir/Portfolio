import Player from "./player.js";
import Sword from "./sword.js";
import Trigger from "./triggerVolume.js";

var platforms
var walls
var swords = Array();
var updates = Array();
var unlock = false;

export default class MainScene extends Phaser.Scene
{

    constructor(config)
    {
        super("main");
        this.config = config;
    }

    preload ()
    {
        //Chargement Interface
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((width / 2)-180, (height / 2)-10, 320, 50);

        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((width / 2)-170, (height / 2), 300 * value, 30);
        });
                    
        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
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

        this.load.image('music01','assets/Effets/Music_01.png');
        this.load.image('music02','assets/Effets/Music_02.png');
        this.load.image('music03','assets/Effets/Music_03.png');
        this.load.image('music04','assets/Effets/Music_04.png');
        this.load.image('music05','assets/Effets/Music_05.png');
        this.load.image('music06','assets/Effets/Music_06.png');
        this.load.image('music07','assets/Effets/Music_07.png');
        this.load.image('music08','assets/Effets/Music_08.png');
        this.load.image('music09','assets/Effets/Music_09.png');
        this.load.image('music10','assets/Effets/Music_10.png');
        this.load.image('music11','assets/Effets/Music_11.png');
        this.load.image('music12','assets/Effets/Music_12.png');
        this.load.image('music13','assets/Effets/Music_13.png');
        this.load.image('music14','assets/Effets/Music_14.png');
        this.load.image('music15','assets/Effets/Music_15.png');
        this.load.image('music16','assets/Effets/Music_16.png');
        this.load.image('music17','assets/Effets/Music_17.png');
        this.load.image('music18','assets/Effets/Music_18.png');
        this.load.image('music19','assets/Effets/Music_19.png');
        this.load.image('music20','assets/Effets/Music_20.png');
        this.load.image('music21','assets/Effets/Music_21.png');
        this.load.image('music22','assets/Effets/Music_22.png');
        this.load.image('music23','assets/Effets/Music_23.png');
        this.load.image('music24','assets/Effets/Music_24.png');
        this.load.image('music25','assets/Effets/Music_25.png');

        this.load.audio("do", ["assets/Sons/do.ogg"]);
        this.load.audio("re", ["assets/Sons/re.ogg"]);
        this.load.audio("mi", ["assets/Sons/mi.ogg"]);
        this.load.audio("fa", ["assets/Sons/fa.ogg"]);
        this.load.audio("sol", ["assets/Sons/sol.ogg"]);
        this.load.audio("la", ["assets/Sons/la.ogg"]);
        this.load.audio("si", ["assets/Sons/si.ogg"]);
        this.load.audio("do2", ["assets/Sons/do2.ogg"]);
        
        this.load.image('sky', 'assets/sky.png');
        this.load.image('cave', 'assets/cave.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('ground', 'assets/stone.png');

        this.load.spritesheet('teleporter','assets/MagicCircle.png',{
            frameWidth: 128,
            frameHeight: 128
            });

        //this.load.image('portfolio','assets/Projets/Portfolio.png');
        this.load.image('portfoliogamifie','assets/Projets/Caex.png');
        this.load.image('wall','assets/wall.png');

        this.load.image('mouse','assets/Inputs/Mouse.png');
        this.load.image('left','assets/Inputs/Left.png');
        this.load.image('right','assets/Inputs/Right.png');

        this.load.image('leveldesign','assets/Projets/LevelDesign.png');
        this.load.image('cerest','assets/Projets/Cerest.png');
        this.load.image('tutoriel','assets/Projets/Tutoriel.png');
        this.load.image('cv','assets/Projets/CV.png');
        this.load.image('astralshmup','assets/Projets/AstralManicShooter.png');

        this.load.image('runbow','assets/Projets/Runbow.png');
        this.load.image('saumon','assets/Projets/Saumon.png');
        this.load.image('storig','assets/Projets/Storig.png');
        this.load.image('paredre','assets/Projets/Paredre.png');
    }

    create ()
    {
        this.scale.displaySize.setAspectRatio(1920/1080);
        this.scale.refresh();

        this.add.image(960, 540, 'cave').setScale(2);

        platforms = this.physics.add.staticGroup();
        walls = this.physics.add.staticGroup();

        
        
        //Placement des murs
        for (let index = 0; index < 5; index++)
        {
            if (index==0 || index==2 || index ==4)
            {
                for (let jndex = 2; jndex < 5; jndex++)
                {
                    walls.create(576+(128*jndex),64+128*index, 'wall');
                }
            }
            else
            {
                walls.create(960,64+128*index, 'wall');
            }
        }
        
        this.add.text(775,18, "             Bienvenue sur mon portfolio.\n\nJe suis Romain Schlotter et vous pouvez\ndécouvrir mon profil à travers ce site ludifié.", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize : 19});


        this.add.text(780,260, "Ce site ouvre des liens vers d'autres sites qui\npeuvent être bloqués comme des popups par\ncertains navigateurs.\nSi envoyer une épée sur \"Portfolio Classique\"\nn'ouvre aucune fenêtre, veuillez autoriser\nce site à ouvrir des fenêtres popups.", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize : 18});

        this.player = new Player(this, "Joueur");
        updates.push(this.player);

        this.physics.add.collider(this.player.getCaex(), platforms);

        for (let index = 2; index < 35; index++)
        {
            var x = 50+50*index;
            var sword = new Sword(this, "sword",this.player,platforms, x, 1000, walls);
            swords.push(sword);
            updates.push(sword);
        }

        //Placement du sol
        for (let index = 0; index < 25; index++)
        {
            platforms.create(41+82*index, 1044, 'ground').setScale(1).refreshBody();
            
        }

        this.anims.create({
            key: 'magic',
            frames: this.anims.generateFrameNumbers('teleporter', { start: 0, end: 31 }),
            frameRate: 10,
            repeat: -1
        });

        if (unlock || true)
        {
            //Gestion du téléporteur
            this.teleporter = this.add.sprite(70, 940, 'teleporter');
            this.teleporter.setScale(2);
            this.teleporter.anims.play('magic', true);
            this.add.text(25,1035, "Zone de jeu", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize : 18});
    
            this.teleporter2 = this.add.sprite(1850, 940, 'teleporter');
            this.teleporter2.setScale(2);
            this.teleporter2.anims.play('magic', true);
            this.add.text(1780,1035, "Réalité Virtuelle", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize : 18});

            
            this.trigger2 = new Trigger(this,"Trigger",swords,"astralshmup",0.4,"scene4",true,1830,540, "Manic Shooter");
            this.trigger3 = new Trigger(this,"Trigger",swords,"leveldesign",0.4,"scene2",true,1830,740, "Conception de niveau");

            
            this.trigger4 = new Trigger(this,"Trigger",swords,"cv",0.4,"scenelien",true,90,540, "Curriculum Vitae");
            this.trigger5 = new Trigger(this,"Trigger",swords,"tutoriel",0.4,"scene3",true,90,740, "Projet Tutoriel");

            this.trigger6 = new Trigger(this,"Trigger",swords,"runbow",0.4,"scene5",true,90,340, "Hippo Runbow");
            this.trigger7 = new Trigger(this,"Trigger",swords,"saumon",0.4,"scene6",true,90,140, "O.C.T.O.P.U.S.");
            this.trigger8 = new Trigger(this,"Trigger",swords,"storig",0.4,"scene7",true,340,100, "De Storig Kaschte");
            this.trigger9 = new Trigger(this,"Trigger",swords,"paredre",0.4,"scene8",true,540,100, "Paredre");

        }

        //this.trigger0 = new Trigger(this,"Trigger",swords,"portfolio",1,"https://romainschlotter.wixsite.com/portfolio",false,480,260, "Portfolio Classique");

        this.trigger1 = new Trigger(this,"Trigger",swords,"portfoliogamifie",1,"scene1",true,1440,260, "Portfolio Ludifié");

        this.add.sprite(960, 580, 'mouse');
        this.add.sprite(840, 580, 'left');
        this.add.sprite(1080, 580, 'right');

        //Outil de debug
        //this.start("scene4");
    }

    update(time, delta)
    {
        updates.forEach(element =>
        {
            element.update(time, delta);
        });
        this.scale.refresh();
        
        if (unlock && this.teleporter!=null)
        {
            let rayon = 15;
            if (this.player.getCaex().x <= this.teleporter.x+rayon && this.player.getCaex().x >= this.teleporter.x-rayon )
            {
                this.teleportation(1);
            }
            else if (this.player.getCaex().x <= this.teleporter2.x+rayon && this.player.getCaex().x >= this.teleporter2.x-rayon )
            {
                this.teleportation(2);
            }
        }
    }

    start(url)
    {
        this.resetScene();
        this.player.resetPlayer();
        this.scene.start(url);
        unlock = true;
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
        if (x == 2)
        {
            this.start("scene1");
        } 
        else if (x == 1)
        {
            this.start("scenejeu");
        }
    }

}