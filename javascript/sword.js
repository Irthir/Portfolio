var scale = Array(6);
var sprite = Array(6);

export default class Sword extends Phaser.GameObjects.GameObject
{
    constructor (scene, type, caex, platforms, x, y)
    {
        super(scene, type);
        scale = [0.1, 0.1, 0.1, 0.04, 0.04, 0.04];
        sprite = ['epee01','epee02','epee03','epee04','epee05','epee06'];
        this.active = true;
        this.create(scene, caex, platforms, x, y);
        this.etats = ['sol','tel','vol'];
        this.etat = 'sol'; 
        this.caex = caex;
        this.actif = false;
    }

    create(scene, caex, platforms, x, y)
    {
        var min = Math.ceil(0);
        var max = Math.floor(5);
        var rand = Math.floor(Math.random() * (max - min +1)) + min;
        
        //rand = this.getRandomIntInclusive(0,5);
        this.caex = caex;
        this.platforms = platforms;
        this.scene = scene;
        
        this.sword = scene.physics.add.sprite(x,y, sprite[rand]).setScale(scale[rand]).refreshBody();
        this.sword.setFlip(false, true);
        this.collider = scene.physics.add.collider(this.sword, platforms, this.touchGround.bind(this));
        this.overlap = scene.physics.add.overlap(this.sword, caex.getCaex(), this.telekineticSword.bind(this));
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
                let angle=Phaser.Math.Angle.Between(this.sword.x,this.sword.y,this.input.x,this.input.y);
                this.sword.setRotation(angle-(90*(Math.PI / 180)));
            }
            else
            {
                if(this.sword.rotation!=0)
                    this.sword.setRotation(0);
            }

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
        this.actif = false;
        this.etat = this.etats[0];
        this.sword.setVelocity(0,0);
        this.sword.body.setAllowGravity(false);
    }

    throw()
    {
        this.actif = false;
        this.etat = this.etats[2];

        var vec = new Phaser.Math.Vector2(100,100);
        
        let angle=Phaser.Math.Angle.Between(this.sword.x,this.sword.y,this.input.x,this.input.y);
        vec.rotate(angle+(90*(Math.PI / 180)));
        console.log(angle+(90*(Math.PI / 180)));

        this.sword.setVelocity(vec.x, vec.y);
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
}