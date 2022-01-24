import Position from "./position.js";

var cursors;
var caex;
var epees = Array();
var positions = Array();
var nbEpee = 21;
var vitesse = 300;

export default class Player extends Phaser.GameObjects.GameObject
{
    constructor (scene, type)
    {
        super(scene, type);
        this.active = true;
        this.create(scene);
        this.sprint = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        
        this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.leftQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    }

    create(scene)
    {
        scene.anims.create({
            key: 'idle',
            frames: [
                { key: 'caexIdle01', duration : 50},
                { key: 'caexIdle02', duration : 50},
                { key: 'caexIdle03', duration : 50},
                { key: 'caexIdle04', duration : 50},
                { key: 'caexIdle05', duration : 50},
                { key: 'caexIdle06', duration : 50},
                { key: 'caexIdle07', duration : 50},
                { key: 'caexIdle08', duration : 50},
                { key: 'caexIdle09', duration : 50},
                { key: 'caexIdle10', duration : 50}
            ],
            frameRate: 60,
            repeat: 1
        });

        scene.anims.create({
            key: 'walk',
            frames: [
                { key: 'caexWalk00', duration : 50},
                { key: 'caexWalk01', duration : 50},
                { key: 'caexWalk02', duration : 50},
                { key: 'caexWalk03', duration : 50},
                { key: 'caexWalk04', duration : 50},
                { key: 'caexWalk05', duration : 50},
                { key: 'caexWalk06', duration : 50},
                { key: 'caexWalk07', duration : 50},
                { key: 'caexWalk08', duration : 50},
                { key: 'caexWalk09', duration : 50}
            ],
            frameRate: 60,
            repeat: 1
        });

        scene.anims.create({
            key: 'run',
            frames: [
                { key: 'caexRun00', duration : 50},
                { key: 'caexRun01', duration : 50},
                { key: 'caexRun02', duration : 50},
                { key: 'caexRun03', duration : 50},
                { key: 'caexRun04', duration : 50},
                { key: 'caexRun05', duration : 50},
                { key: 'caexRun06', duration : 50},
                { key: 'caexRun07', duration : 50},
                { key: 'caexRun08', duration : 50},
                { key: 'caexRun09', duration : 50}
            ],
            frameRate: 60,
            repeat: 1
        });

        for (let i = 0; i < (nbEpee/7); i++)
        {
            for (let j = 0; j < 7; j++)
            {
                var x=0;
                var y=0;
                switch (j)
                {
                    case 0:
                        x=-75;
                        y=-75;
                        break;
                    case 1:
                        x=-50;
                        y=-50;
                        break;
                    case 2:
                        x=-25;
                        y=-25;
                        break;
                    case 4:
                        x=25;
                        y=-25;
                        break;
                    case 5:
                        x=50;
                        y=-50;
                        break;
                    case 6:
                        x=75;
                        y=-75;
                        break;
                    default:
                        x=0;
                        y=0;
                }

                var position = new Position(x,-100-(100*i)-y);
                positions.push(position);   
            }
        }

        
        caex = scene.physics.add.sprite(960,960, 'caex').setScale(0.2,0.2).refreshBody();
        caex.setCollideWorldBounds(true);
        scene.physics.add.existing(caex);
        cursors = scene.input.keyboard.createCursorKeys();
        this.input = scene.input;
        this.input.on('pointerdown',this.shoot);

        caex.anims.play('idle', true);
    }

    update(time,delta)
    {
        if (cursors.left.isDown || this.leftA.isDown || this.leftQ.isDown)
        {
            if (this.sprint.isDown)
            {
                caex.setVelocityX(-vitesse*1.5);
                caex.anims.play('run',true);
            }
            else
            {
                caex.setVelocityX(-vitesse);
                caex.anims.play('walk',true);
            }
            caex.setFlip(false, false);
        }
        else if (cursors.right.isDown || this.right.isDown)
        {
            if (this.sprint.isDown)
            {
                caex.setVelocityX(vitesse*1.5);
                caex.anims.play('run',true);
            }
            else
            {
                caex.setVelocityX(vitesse);
                caex.anims.play('walk',true);
            }
            caex.setFlip(true, false);
        }
        else
        {
            caex.setVelocityX(0);
            caex.anims.play('idle', true);
        }

        for (let i = 0; i < nbEpee; i++)
        {
            if (epees[i]!=null)
            {
                epees[i].getSword().setX(caex.x+positions[i].getX());
                epees[i].getSword().setY(caex.y+positions[i].getY());
            }
        }
    }

    getCaex()
    {
        return caex;
    }

    addEpee(epee)
    {
        if (epees.length<nbEpee && epee.etat!=epee.etats[1])
        {
            epees.forEach(epee =>
            {
                epee.setActif(false);    
            });
            epee.setEtat(1);
            epee.setActif(true);
            epees.push(epee);
        }
    }

    shoot()
    {
        if (epees.length>0)
        {
            var epee = epees[epees.length-1];
            
            epee.throw();

            epees.pop();

            if (epees.length>0)
                epees[epees.length-1].setActif(true);
        }
    }
}