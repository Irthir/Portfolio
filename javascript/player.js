var cursors;
var caex;
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

        
        caex = scene.physics.add.sprite(400,450, 'caex').setScale(0.2,0.2).refreshBody();
        caex.setCollideWorldBounds(true);
        scene.physics.add.existing(caex);
        cursors = scene.input.keyboard.createCursorKeys();

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
    }

    getCaex()
    {
        return caex;
    }
}