var game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 480
    },
    pixelArt: true,
    antialias: false,
    backgroundColor: "#444",
    scene: [/*Start, Intro,*/ Collect, /*, Mix, Use, */ Final]
});

