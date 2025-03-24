import kaplay from "kaplay";

// Initialize Kaplay
kaplay({
    global: true, // Make Kaboom functions globally available
    width: 1600,   // Game width
    height: 800,  // Game height
    canvas: document.querySelector('#game-container') // Attach to the container
});


scene("start", () => {
    add([
        text("Press SPACE to Start", 24),
        pos(center()),
        anchor("center"),
    ]);

    onKeyPress("space", () => go("game")); // Switch to "game" scene
})

scene("game", () => {
    // Set the gravity acceleration (pixels per second)
    setGravity(1600);

    const player = add([
        rect(30, 30),
        pos(center()),
        area(),
        body()
    ]);

    // Simple movement
    onKeyPress('space', () => {
        if (player.isGrounded()) {
            player.jump()
        }
    });

    onKeyDown('left', () => {
        player.move(-200, 0);
    });

    onKeyDown('right', () => {
        player.move(200, 0);
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
})

go("start")