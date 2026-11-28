const DEMO_USER_KEY = "bookieDemoUser";

export function signInDemo(email) {
  sessionStorage.setItem(DEMO_USER_KEY, JSON.stringify({ email }));
}

export function getDemoUser() {
  const user = sessionStorage.getItem(DEMO_USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    sessionStorage.removeItem(DEMO_USER_KEY);
    return null;
  }
}

export function signOutDemo() {
  sessionStorage.removeItem(DEMO_USER_KEY);
}
