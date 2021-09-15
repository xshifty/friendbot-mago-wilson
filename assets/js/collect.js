var Collect = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize: function (config)
    {
        Phaser.Scene.call(this, {
            key: "collect",
            active: false,
        });
    },

    preload: function ()
    {
        this.load.image('labo', 'assets/img/labo.jpg');
        
        this.load.image('feather', 'assets/img/feather.png');
        this.load.image('mushroom', 'assets/img/mushroom.png');
        this.load.image('powder', 'assets/img/powder.png');
        this.load.image('spider', 'assets/img/spider.png');
        this.load.image('tooth', 'assets/img/tooth.png');

        this.load.audio('sugar_plum_fairy', 'assets/audio/sugar_plum.mp3', {
            instances: 1,
        });
    },

    create: function ()
    {
        this.createScene();
        this.createIngredientsBar();
        this.createCollectAreas();
    },

    update: function ()
    {
        updateIngredientsBar.call(this);
        updateCollectAreas.call(this);
    },

    createScene: function ()
    {
        this.theme = this.sound.add('sugar_plum_fairy');
        this.theme.loop = true;
        this.theme.play();
        
        let labo = this.add.image(400, 240, 'labo');
        labo.setPipeline('Light2D');
        this.add.text(20, 30, "Coletar ingredientes", {fontSize: "14pt"});

        this.lights.enable().setAmbientColor(0x555555);
        
        let lantern = this.lights.addLight(500, 250, 200, 0xffffff, 3);

        this.input.on('pointermove', function (pointer) {
            lantern.x = pointer.x;
            lantern.y = pointer.y;
        });

        this.lantern = lantern;
    },

    createIngredientsBar: function ()
    {
        this.ingredients = {
            feather: {
                index: 1,
                img: null,
                collected: false,
            },
            mushroom: {
                index: 2,
                img: null,
                collected: false,
            },
            powder: {
                index: 3,
                img: null,
                collected: false,
            },
            spider: {
                index: 4,
                img: null,
                collected: false,
            },
            tooth: {
                index: 5,
                img: null,
                collected: false,
            }
        };

        let graph = this.add.graphics();
        graph.fillStyle(0xff00ff, .2);
        graph.fillRoundedRect(360, 20, 420, 40, 8);

        for (let i in this.ingredients) {
            this.ingredients[i].img = this.add.image(330 + (this.ingredients[i].index * 80), 40, i);
            this.ingredients[i].img.scale = .3;
            this.ingredients[i].img.alpha = .4;

            this.ingredients[i].img.setInteractive()
                .on("pointerdown", () => this.ingredients[i].img.setAlpha(.5))
                .on("pointerup", () => {
                    this.ingredients[i].img.alpha = .4;
                });
        }
    },

    createCollectAreas: function ()
    {
        this.collectAreas = [];

        for (let i in CollectAreas.areas) {
            let graph = this.add.graphics();
        

            graph.fillStyle(0x000000, .0);
            graph.lineStyle(0, 0xffffff, 1);

            if (CollectAreas.debug) {
                graph.fillStyle(0x00ff00, .1);
                graph.lineStyle(1, 0xffffff, 1);
            }

            let area = CollectAreas.areas[i];
            let poly = new Phaser.Geom.Polygon();
            let points = [];

            for (let q in area.poly) {
                let p = area.poly[q];
                points.push(new Phaser.Geom.Point(p[0], p[1]));
            }

            poly.setTo(points);

            graph.setInteractive(poly, (p, x, y) => p.contains(x, y), {cursor: 'pointer'})
                .on("pointerover", () => {
                    graph.clear();
                    graph.fillStyle(0xffffff, 0);
                    graph.lineStyle(1, 0xffcc00, .5);
                })
                .on("pointerout", () => {
                    graph.clear();
                    graph.fillStyle(0xffffff, .0);
                    graph.lineStyle(0, 0xffffff, .0);
                })
                .on("pointerup", () => {
                    let isCollectable = area.collectable && area.item in this.ingredients;

                    if (isCollectable && this.ingredients[area.item].collected) {
                        return true;
                    }
                    
                    if (isCollectable) {
                        this.ingredients[area.item].collected = true;
                    }

                    showMessage(area.message);
                });


            this.collectAreas.push({poly: poly, graph: graph});
        }
    },
});

function updateIngredientsBar()
{
    allCollected = true;

    for (let i in this.ingredients) {
        if (this.ingredients[i].collected) {
            this.ingredients[i].img.alpha = 1;
            this.ingredients[i].img.scale = .4;
            continue;
        }

        allCollected = false;
    }


    if (allCollected) {
        this.theme.stop();
        this.scene.stop("collect");
        this.scene.start("final");
    }
}

function updateCollectAreas()
{
    for (i in this.collectAreas) {
        let area = this.collectAreas[i];

        area.graph.fillPoints(area.poly.points, true);
        area.graph.strokePoints(area.poly.points, true);
    }
}

function showMessage(msg)
{
    alert(msg);
}
