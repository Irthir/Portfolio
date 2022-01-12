var sword;
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
    }

    create(scene, caex, platforms, x, y)
    {
        var min = Math.ceil(0);
        var max = Math.floor(5);
        var rand = Math.floor(Math.random() * (max - min +1)) + min;
        
        //rand = this.getRandomIntInclusive(0,5);
        sword = scene.physics.add.sprite(x,y, sprite[rand]).setScale(scale[rand]).refreshBody();
        sword.setFlip(false, true);
        scene.physics.add.collider(sword, platforms);
        scene.physics.add.overlap(sword, caex, this.telekineticSword.bind(this));
        
        scene.physics.add.existing(sword);
    }

    update(time,delta)
    {
    }

    getSword()
    {
        return sword;
    }

    telekineticSword(epee)
    {
        console.log("Epee");
    }
}