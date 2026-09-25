// Envoi des formulaires sans serveur, via Web3Forms (gratuit, 250 envois/mois).
//
// 1. Rendez-vous sur https://web3forms.com, saisissez l'adresse qui doit recevoir
//    les messages : une clé d'accès vous est envoyée par e-mail.
// 2. Collez cette clé ci-dessous, entre les guillemets.
//
// Tant que la clé est vide, les formulaires fonctionnent en « mode démo » :
// ils sont validés et affichent une confirmation, mais rien n'est envoyé.
const WEB3FORMS_ACCESS_KEY = "d050cfd5-1207-4a56-8fce-51f82df0b344";

const ENDPOINT = "https://api.web3forms.com/submit";

const MESSAGES = {
  fr: {
    sending: "Envoi en cours…",
    success: "Merci ! Votre demande a bien été envoyée. (Site de démonstration : elle parvient à Simon Vallée, pas à une vraie entreprise.)",
    demo: "Merci ! (Site de démonstration : aucune demande n'a réellement été envoyée.)",
    error: "L'envoi a échoué. Réessayez dans un instant ou contactez-nous par téléphone.",
  },
  en: {
    sending: "Sending…",
    success: "Thank you! Your request has been sent. (Demo website: it goes to Simon Vallée, not to a real business.)",
    demo: "Thank you! (Demo website: no request has actually been sent.)",
    error: "Something went wrong. Please try again in a moment or contact us by phone.",
  },
};

const lang = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "fr";
const t = MESSAGES[lang];

// Les dates de réservation ou de rendez-vous ne peuvent pas être dans le passé.
const today = new Date();
const isoToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);
document.querySelectorAll('form[data-form] input[type="date"]').forEach((input) => {
  input.min = isoToday;
});

document.querySelectorAll("form[data-form]").forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('[type="submit"]');

  const show = (message, state) => {
    status.textContent = message;
    status.dataset.state = state;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    // Champ piège invisible : un humain ne le coche jamais.
    if (data.botcheck) return;
    delete data.botcheck;

    submit.disabled = true;
    show(t.sending, "pending");

    try {
      if (!WEB3FORMS_ACCESS_KEY) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        form.reset();
        show(t.demo, "success");
        return;
      }

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: form.dataset.subject || document.title,
          from_name: form.dataset.fromName || document.title,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);

      form.reset();
      show(t.success, "success");
    } catch {
      show(t.error, "error");
    } finally {
      submit.disabled = false;
    }
  });
});
