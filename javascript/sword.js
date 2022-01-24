var scale = Array(6);
var sprite = Array(6);
var vitesse = 600;

export default class Sword extends Phaser.GameObjects.GameObject
{
    constructor (scene, type, caex, platforms, x, y, walls)
    //BUT : Créer un objet représentant une épée.
    //ENTREE : La scène, le type d'objet, le joueur, le sol et la position en x, y.
    //SORTIE : La création d'un objet épée avec son sprite, ses évènements et ses collisions.
    {
        super(scene, type);
        scale = [0.1, 0.1, 0.1, 0.04, 0.04, 0.04];
        sprite = ['epee01','epee02','epee03','epee04','epee05','epee06'];
        this.active = true;
        this.create(scene, caex, platforms, x, y, walls);
        this.etats = ['sol','tel','vol'];
        this.etat = 'sol'; 
        this.caex = caex;
        this.actif = false;

        this.velX=0;
        this.velY=0;
    }

    create(scene, caex, platforms, x, y, walls)
    {
        var min = Math.ceil(0);
        var max = Math.floor(5);
        var rand = Math.floor(Math.random() * (max - min +1)) + min;
        
        //rand = this.getRandomIntInclusive(0,5);
        this.caex = caex;
        this.platforms = platforms;
        this.walls = walls;
        this.scene = scene;
        
        this.sword = scene.physics.add.sprite(x,y, sprite[rand]).setScale(scale[rand]).refreshBody();
        this.sword.setFlip(false, true);
        this.collider = scene.physics.add.collider(this.sword, platforms, this.touchGround.bind(this));
        this.collider = scene.physics.add.collider(this.sword, walls,null, null, this.scene);
        this.overlap = scene.physics.add.overlap(this.sword, caex.getCaex(), this.telekineticSword.bind(this));
        this.overlap = scene.physics.add.overlap(this.sword, platforms, this.touchGround.bind(this));
        this.input = scene.input;

        this.sword.setCollideWorldBounds(true);
        this.sword.onWorldBounds = true;
        this.sword.body.setBounce(1,1);
        this.sword.body.isCircle = true;

        scene.physics.add.existing(this.sword);
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
            this.sword.body.setAllowGravity(false);
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
            this.sword.body.setAllowGravity(true);
            this.sword.setVelocity(0, 0);
        }
        else if (this.etat=='tel')
        {
            this.sword.body.setAllowGravity(false);
            this.sword.setVelocity(0, 0);
        }
        else if (this.etat=='vol')
        {
            this.sword.body.setAllowGravity(false);
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
        }
    }

    rotationTo(x,y)
    {
        let angle=Phaser.Math.Angle.Between(this.sword.x,this.sword.y,x,y);
        this.sword.setRotation(angle-(90*(Math.PI / 180)));
    }
}