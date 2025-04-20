import kaplay from "kaplay";

const gun = window.gun
console.log("Gun is: ", gun)
// Initialize Kaplay
kaplay({
    global: true, // Make Kaboom functions globally available
    width: 1200,   // Game width
    height: 600,  // Game height
    canvas: document.querySelector('#game_container') // Attach to the container
});

loadSprite("singleBox", "/game/assets/sprites/singleBox.png")
loadSprite("singleSpike", "/game/assets/sprites/singleSpike.png")
loadSprite("tripleSpike", "/game/assets/sprites/tripleSpike.png")
loadSprite("bg", "/game/assets/bg/bg.png")

scene("start", () => {
    add([
        sprite("bg",{ width: width(), height: height(),}),
        pos(0, 0),
        z(-10),
    ])
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

    /*-----------Scoring---------*/
    let score = 0
    const scoreLabel = add([
    text(`Score: ${score}`, { size: 24 }),
        pos(width() - 200, 24),
        fixed(), // keeps it in the same place on screen
        z(100),  // stays on top of other elements
    ]);

    loop(1, () => {
        score += 1
        scoreLabel.text = `Score: ${score}`
    })
    /*---------------------------*/

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
            { speed: speed }
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
            { speed: speed }
        ])
        return hitbox3
    }

    function makeFlyingSpike(spawnX, spawnY, speed) {
        const hitbox4 = add([
            pos(spawnX, spawnY),
            area(),
            body( {isStatic: true} ),
            anchor("center"),
            polygon([
                vec2(-33, 11),
                vec2(22, 22),
                vec2(22, 0)
            ]),
            "spike",
            { speed: speed }
        ])
    }

    function makeJumpPlatform(spawnX, spawnY, speed) {
        const platform = add([
            rect(100, 10),
            body( {isStatic: true} ),
            pos(spawnX - 200, spawnY),
            area(),
            anchor("center"),
            "platform",
            { speed: speed}
        ])
        return platform
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

        if (chance(0.4)) {
            makeJumpPlatform(spawnX, spawnY - 50, speed)
        }
    })

    player.onCollide("spike", () => {
        console.clear()

        const username = localStorage.getItem("username") || "anon"; // or any fallback
        gun.get("users").get(username).get("highScore").once((prevScore) => {
            if (!prevScore || score > prevScore) {
              gun.get("users").get(username).get("highScore").put(score);
              console.log(`🏆 New high score for ${username}: ${score}`);
            } else {
              console.log(`ℹ️ Score ${score} not higher than previous: ${prevScore}`);
            }
        });

        console.log("Score saved:", score);
        addKaboom(player.pos)
        player.destroy()
        go("start")
    })

    player.onCollide("platform", (platform) => {
        platform.speed -= 100
        if (chance(0.5)) {
            makeFlyingSpike(width() + 20, height() - 220, 400)
            score += 2
        }
    })

    onUpdate("player", (player) => {
        if (player.pos.x < 0) {
            player.pos.x = 200
        }

        if (player.pos.x > width()) {
            console.clear()
            addKaboom(player.pos)
            player.destroy()
            go("start")
        } 
    })
    
    onUpdate("spike", (spike) => {
        spike.move(-spike.speed, 0)
        if (spike.pos.x < -30) {
            destroy(spike)
        }
    })

    onUpdate("platform", (platform) => {
        platform.move(-platform.speed, 0)
        if (platform.pos.x < -30) {
            destroy(platform)
        }
    })
})

go("start")