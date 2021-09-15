var Start = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize: function (config)
    {
        Phaser.Scene.call(this, {
            key: "start",
            active: true,
        });
    },

    preload: function ()
    {
    },

    create: function ()
    {
        const button = this.add.text(30, 400, "Iniciar jogo", {
            fontSize: "28pt",
            color: "#000",
            backgroundColor: "#ffcc00"
        })
            .setInteractive()
            .on("pointerdown", () => button.setScale(1.1))
            .on("pointerup", () => {
                button.setScale(1.0);
                this.scene.stop("start").start("intro");
            });
    },

    update: function ()
    {
    }
});
