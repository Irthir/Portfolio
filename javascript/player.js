import Position from "./position";

var cursors;
var caex;
var epees = Array();
var positions = Array();
var nbEpee = 15;

export default class Player extends Phaser.GameObjects.GameObject
{
    constructor (scene, type)
    {
        super(scene, type);
        this.active = true;
        this.create(scene);
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
            frameRate: 8,
            repeat: -1
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
            frameRate: 8,
            repeat: -1
        });

        for (let i = 0; i < (nbEpee/5); i++)
        {
            for (let j = 0; j < 5; j++)
            {
                var x=0;
                var y=0;
                switch (j)
                {
                    case 0:
                        x=-50;
                        y=-50;
                        break;
                    case 1:
                        x=-25;
                        y=-25;
                        break;
                    case 3:
                        x=25;
                        y=-25;
                        break;
                    case 4:
                        x=50;
                        y=-50;
                        break;
                    default:
                        x=0;
                        y=0;
                }

                var position = new Position(x,-100-(100*i)-y);
                positions.push(position);   
            }
        }

        
        caex = scene.physics.add.sprite(400,450, 'caex').setScale(0.2,0.2).refreshBody();
        caex.setCollideWorldBounds(true);
        scene.physics.add.existing(caex);
        cursors = scene.input.keyboard.createCursorKeys();
        this.input = scene.input;
        this.input.on('pointerdown',this.shoot);

        caex.anims.play('idle', true);
    }

    update(time,delta)
    {
        if (cursors.left.isDown)
        {
            caex.setVelocityX(-160);
            caex.anims.play('walk',true);
            //console.log("left");
            caex.setFlip(false, false);
        }
        else if (cursors.right.isDown)
        {
            caex.setVelocityX(160);
            caex.anims.play('walk',true);
            //console.log("right");
            caex.setFlip(true, false);
        }
        else
        {
            caex.setVelocityX(0);
            caex.anims.play('idle', true);
            //console.log("idle");
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
        console.log("shoot");

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