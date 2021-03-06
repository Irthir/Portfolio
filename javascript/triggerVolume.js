
export default class Trigger extends Phaser.GameObjects.GameObject
{

    constructor (scene, type, swords, sprite, scale, url, bScene, x, y, text)
    //BUT : Créer un objet représentant une épée.
    //ENTREE : La scène, le type d'objet, le joueur, le sol et la position en x, y.
    //SORTIE : La création d'un objet épée avec son sprite, ses évènements et ses collisions.
    {
        super(scene, type);
        this.active = true;
        this.swords = swords;
        this.url = url;
        this.scene = scene;
        this.bScene = bScene;
        this.text = text;
        this.create(x, y, sprite, scale);
    }

    create(x, y, sprite, scale)
    {
        this.trigger = this.scene.physics.add.sprite(x,y, sprite).setScale(scale).refreshBody();

        this.scene.add.text(x-Math.floor((7*(this.text.length))*scale),y+Math.floor(200*scale), this.text, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize : Math.floor(32*scale)});

        this.bTrigger = false;

        this.swords.forEach(sword =>
        {
            this.overlap = this.scene.physics.add.overlap(this.trigger, sword.getSword(), this.onTrigger.bind(this, this.trigger, sword));    
        });        
        

        this.scene.physics.add.existing(this.trigger);
    }
    update(time,delta)
    {
    }

    getbScene()
    {
        return this.bScene;
    }
    getUrl()
    {
        return this.url;
    }
    
    onTrigger(trigger, sword)
    {
        if (sword.etat=="vol")
        {
            if (this.bTrigger==false)
            {
                if (this.bScene)
                {
                    //console.log(this.scene);
                    this.scene.start(this.url);
                }
                else
                {
                    window.open(this.url, '_blank');
                }
                this.bTrigger = true;
                this.resetTrigger();
            }
            sword.resetSword();
        }
    }

    async resetTrigger() {
        await new Promise(resolve => setTimeout(resolve, 10000));
        this.bTrigger = false;
    }
      


}