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

      localStorage.setItem("username", data.user.name)
      logInForm.reset();
    } else {
      const error = await res.json();
      console.error("❌ Error Logging In:", error);
      alert("Ivalid Credentials");
    }
});