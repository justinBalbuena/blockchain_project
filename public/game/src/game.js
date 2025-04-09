import kaplay from "kaplay";

// Initialize Kaplay
kaplay({
    global: true, // Make Kaboom functions globally available
    width: 1200,   // Game width
    height: 600,  // Game height
    canvas: document.querySelector('#game-container') // Attach to the container
});

loadSprite("singleBox", "/game/assets/sprites/singleBox.png", {
})

scene("start", () => {
    add([
        text("Press SPACE to Start", 24),
        pos(center()),
        anchor("center"),
    ]);

    onKeyPress("space", () => go("game")); // Switch to "game" scene
})

scene("game", () => {
    function jumpAndSpin(player) {
        if (player.isGrounded()) {
          player.jump();
          player.angle = 0;
      
          // Animate a 360-degree spin while jumping
          tween(
            0,
            360,
            1.2, // duration in seconds
            (angle) => (player.angle = angle),
            easings.easeInOutCubic
          );
        }
    }

    // debug.inspect = true
    setGravity(1200);

    const player = add([
        sprite("singleBox"),
        pos(200, 200),
        anchor("center"),
        scale(5),
        area(),
        body()
    ])


    // Simple movement
    onKeyPress('space', () => {
        if (player.isGrounded()) {
            jumpAndSpin(player)
        }
    });

    // Add a platform to hold the player
    add([
        rect(width(), 48),
        outline(4),
        area(),
        pos(0, height() - 48),
        // Give objects a body() component if you don't want other solid objects pass through
        body({ isStatic: true }),
    ]);



    player.onCollide("spike", () => {
        addKaboom(player.pos)
        player.destroy()
        shake(12)
    })

    onUpdate("spike", (spike) => {
        spike.move(-spike.speed, 0)
        if (spike.pos.x < -30) {
            destroy(spike)
        }
    })

    loop(3, () => {
        const spawnX = width() + 20
        const spawnY = height() - 64
        const speed = 360
        const triple_spike = chance(0.3)
        const double_spike = chance (0.4)
        const single_spike = chance(0.7)

        add([
            rect(60, 30),
            pos(spwanX, spwanY),
            area(),
            body(),
            anchor("center"),
            "spike",
            { speed: speed }
        ])
    })

})

go("start")