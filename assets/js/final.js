var Final = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize: function (config)
    {
        Phaser.Scene.call(this, {
            key: "final",
            active: false,
        });
    },

    preload: function ()
    {
    },

    create: function ()
    {
        const button = this.add.text(0, 400, "Jogar novamente", {fontSize: "18pt", color: "#000", backgroundColor: "#ffcc00"})
            .setInteractive()
            .on("pointerdown", () => button.setScale(1.1))
            .on("pointerup", () => {
                button.setScale(1.0);
                this.scene.start("collect");
            });

        this.add.text(100, 100, "Parabens! fim de jogo!", {fontSize: "20pt"});
    },

    update: function ()
    {
    }
});
