var scale = Array(8);
var sprite = Array(8);
var vitesse = 400;

export default class Sword extends Phaser.GameObjects.GameObject
{
    constructor (scene, type, caex, platforms, x, y, walls)
    //BUT : Créer un objet représentant une épée.
    //ENTREE : La scène, le type d'objet, le joueur, le sol et la position en x, y.
    //SORTIE : La création d'un objet épée avec son sprite, ses évènements et ses collisions.
    {
        super(scene, type);
        scale = [0.1, 0.1, 0.1, 0.04, 0.04, 0.04,1,1];
        sprite = ['epee01','epee02','epee03','epee04','epee05','epee06','epee07','epee08'];
        this.son = ['do','re','mi','fa','sol','la','si','do2'];
        this.music = ['music01','music06','music11','music16','music21'];
        this.animmusic = ['animmusic01','animmusic02','animmusic03','animmusic04','animmusic05'];
        this.active = true;
        this.create(scene, caex, platforms, x, y, walls);
        this.etats = ['sol','tel','vol'];
        this.etat = 'sol'; 
        this.caex = caex;
        this.actif = false;

        this.velX=0;
        this.velY=0;

        this.originX = x;
        this.originY = y;
    }

    create(scene, caex, platforms, x, y, walls)
    {
        var min = Math.ceil(0);
        var max = Math.floor(7);
        var rand = Math.floor(Math.random() * (max - min +1)) + min;
    
        this.caex = caex;
        this.platforms = platforms;
        this.walls = walls;
        this.scene = scene;
        
        this.sword = scene.physics.add.sprite(x,y, sprite[rand]).setScale(scale[rand]).refreshBody();
        this.sword.setFlip(false, true);

        this.collider = scene.physics.add.collider(this.sword, platforms, this.touchGround.bind(this));
        this.collider = scene.physics.add.collider(this.sword, walls);
        this.overlap = scene.physics.add.overlap(this.sword, walls, this.touchWall.bind(this,this.sword, walls));
        this.overlap = scene.physics.add.overlap(this.sword, caex.getCaex(), this.telekineticSword.bind(this));
        this.overlap = scene.physics.add.overlap(this.sword, platforms, this.touchGround.bind(this));
        this.input = scene.input;

        this.sword.setCollideWorldBounds(true);
        this.sword.onWorldBounds = true;
        this.sword.body.setBounce(1,1);
        this.sword.body.isCircle = true;

        this.scene.physics.add.existing(this.sword);

        this.ding = this.scene.sound.add(this.son[rand], {loop:false});

        scene.anims.create({
            key: 'animmusic01',
            frames: [
                { key: 'music01', duration : 50},
                { key: 'music02', duration : 50},
                { key: 'music03', duration : 50},
                { key: 'music04', duration : 50},
                { key: 'music05', duration : 50}
            ],
            frameRate: 60
        });

        scene.anims.create({
            key: 'animmusic02',
            frames: [
                { key: 'music06', duration : 50},
                { key: 'music07', duration : 50},
                { key: 'music08', duration : 50},
                { key: 'music09', duration : 50},
                { key: 'music10', duration : 50}
            ],
            frameRate: 60
        });

        scene.anims.create({
            key: 'animmusic03',
            frames: [
                { key: 'music11', duration : 50},
                { key: 'music12', duration : 50},
                { key: 'music13', duration : 50},
                { key: 'music14', duration : 50},
                { key: 'music15', duration : 50}
            ],
            frameRate: 60
        });

        scene.anims.create({
            key: 'animmusic04',
            frames: [
                { key: 'music16', duration : 50},
                { key: 'music17', duration : 50},
                { key: 'music18', duration : 50},
                { key: 'music19', duration : 50},
                { key: 'music20', duration : 50}
            ],
            frameRate: 60
        });

        scene.anims.create({
            key: 'animmusic05',
            frames: [
                { key: 'music21', duration : 50},
                { key: 'music22', duration : 50},
                { key: 'music23', duration : 50},
                { key: 'music24', duration : 50},
                { key: 'music25', duration : 50}
            ],
            frameRate: 60
        });

        this.effect=null;
    }

    update(time,delta)
    {
        if (this.etat == "tel")
        {
            if (this.actif)
            {
                this.rotationTo(this.input.x,this.input.y);
            }
            else
            {
                if(this.sword.rotation!=0)
                    this.sword.setRotation(0);
            }
        }
        else if (this.etat == "vol")
        {
            this.bounce();
        }
    }

    getSword()
    {
        return this.sword;
    }

    telekineticSword(epee)
    {
        this.caex.addEpee(this);
    }

    touchGround()
    {
        if (this.etat != "tel")
        {
            this.setEtat(0);
            this.sword.setVelocity(0,0);
            //this.sword.body.setAllowGravity(false);
        }
    }

    throw()
    {
        this.actif = false;
        this.setEtat(2)

        var vec = new Phaser.Math.Vector2(vitesse,vitesse);
        
        let angle=Phaser.Math.Angle.Between(this.sword.x,this.sword.y,this.input.x,this.input.y);
        vec.rotate(angle+(-45*(Math.PI / 180)));

        this.sword.setVelocity(vec.x, vec.y);

        
        this.velX = 0;
        this.velY = 0;
    }

    setEtat(i)
    {
        this.etat = this.etats[i];
        if (this.etat=='sol')
        {
            //this.sword.body.setAllowGravity(true);
            this.sword.setVelocity(0, 0);
        }
        else if (this.etat=='tel')
        {
            //this.sword.body.setAllowGravity(false);
            this.sword.setVelocity(0, 0);
        }
        else if (this.etat=='vol')
        {
            //this.sword.body.setAllowGravity(false);
        }
    }

    setActif(bool)
    {
        this.actif = bool;
    }

    bounce()
    {
        var velX = this.sword.body.velocity.x;
        var velY = this.sword.body.velocity.y;

        if (this.velX==0)
        {
            this.velX = velX;
        }

        if (this.velY==0)
        {
            this.velY = velY;
        }

        if ((this.velX!=velX && this.velX!=0) || (this.velY!=velY && this.velY!=0))
        {
            let x = this.sword.x + velX;
            let y = this.sword.y + velY;

            this.rotationTo(x,y);

            this.velX = this.sword.body.velocity.x;
            this.velY = this.sword.body.velocity.y;

            this.ding.play();

            let min = Math.ceil(0);
            let max = Math.floor(4);
            let rand = Math.floor(Math.random() * (max - min +1)) + min;

            console.log(rand);
            if (this.effect==null)
            {
                this.effect = this.scene.physics.add.sprite(this.sword.x-40,this.sword.y-40, this.music[rand]).setScale(0.5).refreshBody();
                this.effect.play(this.animmusic[rand],false);
                this.effect.once('animationcomplete', () => {
                    this.effect.destroy();
                    this.effect=null;
                })
            }
        }
    }

    rotationTo(x,y)
    {
        let angle=Phaser.Math.Angle.Between(this.sword.x,this.sword.y,x,y);
        this.sword.setRotation(angle-(90*(Math.PI / 180)));
    }

    touchWall(epee, mur)
    {
        /*console.log(epee);
        console.log(mur);*/

        let wall = this.getClosestWall(epee,mur);

        let bounceX = 1;
        let bounceY = 1;

        if ((epee.body.velocity.x > 0 && wall.x>epee.x) || (epee.body.velocity.x < 0 && wall.x<epee.x))
        {
            bounceX = -1;
        }

        if ((epee.body.velocity.y > 0 && wall.y>epee.y) || (epee.body.velocity.y < 0 && wall.y<epee.y))
        {
            bounceY = -1;
        }

        this.sword.setVelocity(bounceX*this.sword.body.velocity.x,bounceY*this.sword.body.velocity.y);
    }

    getClosestWall(epee,mur)
    {
        let wall=null;
        let dist = 0;

        mur.getChildren().forEach(element =>
        {
            let walldist = Math.hypot(element.x-epee.x, element.y-epee.y);

            if (wall == null)
            {
                wall = element;
                dist = walldist;
            }
            else
            {
                if (walldist<dist)
                {
                    wall = element;
                    dist = walldist;
                }
            }
        });

        return wall;
    }

    resetSword()
    {
        this.setEtat(0);
        this.sword.x = this.originX;
        this.sword.y = this.originY;
    }
}