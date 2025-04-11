import kaplay from "kaplay";

// Initialize Kaplay
kaplay({
    global: true, // Make Kaboom functions globally available
    width: 1200,   // Game width
    height: 600,  // Game height
    canvas: document.querySelector('#game-container') // Attach to the container
});

loadSprite("singleBox", "/game/assets/sprites/singleBox.png")
loadSprite("singleSpike", "/game/assets/sprites/singleSpike.png")
loadSprite("tripleSpike", "/game/assets/sprites/tripleSpike.png")
loadSprite("bg", "/game/assets/bg/bg.png")

scene("start", () => {
    add([
        text("Press SPACE to Start", 24),
        pos(center()),
        anchor("center"),
    ]);

    onKeyPress("space", () => go("game")) // Switch to "game" scene
    
})

scene("game", () => {
    // debug.inspect = true
    setGravity(1200);

    /*------------Background------------*/
    const bg1 = add([
        sprite("bg", { width: width(), height: height() },),
        pos(0, 0),
        z(-10),
    ]);
      
    const bg2 = add([
        sprite("bg", { width: width(), height: height() }),
        pos(width(), 0),
        z(-10),
    ]);

    onUpdate(() => {
        const speed = 100; // pixels per second
      
        bg1.move(-speed, 0);
        bg2.move(-speed, 0);
      
        if (bg1.pos.x <= -width()) {
          bg1.pos.x = bg2.pos.x + width();
        }
      
        if (bg2.pos.x <= -width()) {
          bg2.pos.x = bg1.pos.x + width();
        }
    });
    /*----------------------------------*/

    /*-------Animation Functions--------*/
    function jumpAndSpin(player) {
        if (player.isGrounded()) {
          player.jump();
          player.angle = 0;
      
          // Animate a 360-degree spin whi le jumping
          tween(
            0,
            360,
            1.2, // duration in seconds
            (angle) => (player.angle = angle),
            easings.easeInOutCubic
          );
        }
    }
    /*-----------------------------------*/

    /*--------------Objects--------------*/
    // Platform To Hold Player
    add([
        rect(width(), 48),
        outline(4),
        area(),
        pos(0, height() - 48),
        body({ isStatic: true }),
    ]);
    
    const player = add([
        sprite("singleBox"),
        pos(200, 200),
        anchor("center"),
        scale(5),
        area(),
        body(),
        "player"
    ])

    // Platform To Hold Player
    add([
        rect(width(), 48),
        outline(4),
        area(),
        pos(0, height() - 48),
        body({ isStatic: true }),
    ]);

    function makePolygonSpike(spawnX, spawnY, speed) {
        const hitbox1 = add([
            pos(spawnX, spawnY),
            polygon([
                vec2(0, 22),    // bottom-left
                vec2(11, 0),   // top-center
                vec2(22, 22),   // bottom-right
            ]),
            area(),
            scale(10),
            body(),
            anchor("center"),
            scale(3),
            "spike", 
            { speed: speed }
        ])
        return hitbox1
    }

    function makeFalseSpike(spawnX, spawnY, speed) {
        const hitbox2 = add([
            sprite("singleSpike"),
            pos(spawnX, spawnY),
            area(),
            body(),
            scale(0.035),
            anchor("center"),
            "spike",
            {speed: speed}
        ])
        return hitbox2 
    }

    function makeFalseTripleSpike(spawnX, spawnY, speed) {
        const hitbox3 = add([
            sprite("tripleSpike"),
            pos(spawnX, spawnY),
            area(),
            body(),
            scale(5),
            anchor("center"),
            "spike",
            {speed: speed}
        ])
        return hitbox3
    }
    /*----------------------------------------*/

    /*-------------Key Press Rules------------*/
    // Jump
    onKeyPress('space', () => {
        if (player.isGrounded()) {
            jumpAndSpin(player)
        }
    });

    /*----------------------------------------*/

    /*--------------Interactions--------------*/
    loop(3, () => {
        const spawnX = width() + 20
        const spawnY = height() - 120
        const speed = 360

        const determinator = rand(0, 3)
        console.log(Math.floor(determinator))

        switch(Math.floor(determinator)) {
            case 0:
                makeFalseTripleSpike(spawnX, spawnY, speed)
                break
            case 1:
                makeFalseSpike(spawnX, spawnY, speed)
                break
            case 2:
                makePolygonSpike(spawnX, spawnY, speed)
                break
        }
    })

    player.onCollide("spike", () => {
        console.clear()
        addKaboom(player.pos)
        player.destroy()
        go("start")
    })

    onUpdate("spike", (spike) => {
        spike.move(-spike.speed, 0)
        if (spike.pos.x < -30) {
            destroy(spike)
        }
    })

})

go("start")