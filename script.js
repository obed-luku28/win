import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Configuration Supabase
const SUPABASE_URL = "https://eqslurqbdgfgnjvrmfkf.supabase.co";
const SUPABASE_KEY = "sb_publishable_tBzVUanIX0HplyKIOWbWtA_0SLauC60";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Éléments HTML
const form = document.getElementById("signup-form");
const message = document.getElementById("message");
const button = document.getElementById("submit-btn");

// Afficher un message
function afficherMessage(texte, type) {
  message.textContent = texte;
  message.className = type;
}

// Inscription
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!nom || !email || password.length < 8) {
    afficherMessage(
      "Vérifie les champs. Le mot de passe doit contenir au moins 8 caractères.",
      "error"
    );
    return;
  }

  button.disabled = true;
  button.textContent = "Création du compte...";
  message.textContent = "";
  message.className = "";

  try {
    // Création du compte : le trigger SQL enregistre
    // ensuite nom, email et mot de passe dans "profiles"
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nom: nom,
          password: password
        },
        emailRedirectTo: `${window.location.origin}/confirmation.html`
      }
    });

    if (error) {
      throw error;
    }

    form.reset();

    afficherMessage(
      "Si l'inscription a été acceptée, vérifie ta boîte e-mail et clique sur le lien de confirmation.",
      "success"
    );

  } catch (error) {
    afficherMessage(
      error.message || "Une erreur est survenue.",
      "error"
    );

  } finally {
    button.disabled = false;
    button.textContent = "Créer mon compte";
  }
});