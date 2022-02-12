export async function register(username, password) {
  return await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}

export async function login(user = null) {
  return await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export function tokenIsExpired() {
  const tokenExpiration = JSON.parse(localStorage.getItem("tokenExpiration"));
  console.log(tokenExpiration < Date.now() / 1000);
  return tokenExpiration < Date.now() / 1000;
}

export function logout() {
  localStorage.setItem("tokenExpiration", null);
  console.log("Logged Out.");
}
