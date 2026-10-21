import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://eqslurqbdgfgnjvrmfkf.supabase.co";
const SUPABASE_KEY = "sb_publishable_tBzVUanIX0HplyKIOWbWtA_0SLauC60";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("login-form");
const message = document.getElementById("message");
const button = document.getElementById("submit-btn");

function afficherMessage(texte, type) {
  message.textContent = texte;
  message.className = type;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  button.disabled = true;
  button.textContent = "Connexion...";
  message.textContent = "";
  message.className = "";

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      throw error;
    }

    afficherMessage("Connexion réussie. Redirection...", "success");

    // Redirige vers votre page principale après connexion
    window.location.href = "dashboard.html";

  } catch (error) {
    afficherMessage(
      error.message === "Invalid login credentials"
        ? "E-mail ou mot de passe incorrect."
        : error.message || "Une erreur est survenue.",
      "error"
    );

  } finally {
    button.disabled = false;
    button.textContent = "Se connecter";
  }
});