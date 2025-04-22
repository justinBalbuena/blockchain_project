const signUpForm = document.getElementById("signup-form");

  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // ✅ Prevents page reload

    const formData = new FormData(signUpForm);

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password")
    };

    const res = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (res.ok) {
      const data = await res.json();
      console.log("✅ User created:", data.user);
      alert("User created successfully!");
      signUpForm.reset();
    } else {
      const error = await res.json();
      console.error("❌ Error creating user:", error);
      alert("There was a problem creating the user.");
    }
});