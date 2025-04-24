const logInForm = document.getElementById("login-form");

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // ✅ Prevents page reload

  const formData = new FormData(logInForm);

  const user = {
    email: formData.get("email"),
    password: formData.get("password")
  };

  const res = await fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (res.ok) {
    const data = await res.json();
    console.log("✅ User Logged In:", data.user);
    alert("User Logged In Successfully");

    console.log("Gun exists?", gun);
    localStorage.setItem("username", data.user.name)
    
    // Generate a persistent peer ID on first visit
    let peerId = localStorage.getItem("peerId");
    if (!peerId) {
      peerId = crypto.randomUUID(); // auto-generates a unique ID
      localStorage.setItem("peerId", peerId);
    }

    // Store user login info
    const username = localStorage.getItem("username");
    gun.get("nodeIdentity").get(peerId).put({ username });

    console.log("🧠 Saved identity:", { peerId, username });

    logInForm.reset();

    // console.log(gun.get("nodeInfo").get("username"));
  } else {
    const error = await res.json();
    console.error("❌ Error Logging In:", error);
    alert("Ivalid Credentials");
  }
});