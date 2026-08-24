// Enregistre le service worker qui gère le cache et le mode hors ligne.
export const Register = () => {

  // Vérifie que le navigateur prend en charge les service workers.
  if ("serviceWorker" in navigator) {

    // Le chemin est relatif à la page actuelle (ici, sw.js à la racine du projet).
    navigator.serviceWorker.register("./sw.js")
      .then(registration => {

        // Utile pour vérifier l'enregistrement dans la console pendant le développement.
        console.log("SW enregistré : ", registration)
      })
      .catch(error => {

        // Affiche la cause si l'enregistrement échoue.
        console.error('Erreur lors de l’enregistrement du SW :', error)
      })
  }
}
