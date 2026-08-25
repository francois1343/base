// Affiche une notification si l’utilisateur a déjà donné son autorisation.
export const notifyMe = () => {

  // Simple message pour vérifier que la fonction est bien appelée.
  alert('Notif')

  // Informations affichées dans la notification.
  const notifTitle = "Titre de la notif"
  const notifyBody = "Créé par Francis"
  const notifImg = './icons/favicon-96x96.png'

  // Options de la notification : texte, icône et vibration.
  const options = {
    body: notifyBody,
    icon: notifImg,
    vibrate: [200, 100, 200, 100, 200]
  }

  // Vérifie que le navigateur prend en charge les notifications.
  if (!("Notification" in window)) {
    alert('Pas de notification dans ce navigateur.')

    // Crée la notification seulement si la permission est accordée.
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(notifTitle, options)

    // Au clic sur la notification, ouvre le site dans un nouvel onglet.
    notification.addEventListener('click', e => {
      window.focus()
      window.open('https://cepegra.be', '_blank')
    })

    // Sinon, demande l’autorisation à l’utilisateur.
  } else {
    notifRequest()
  }
}

// Demande la permission d’afficher des notifications.
export const notifRequest = () => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission()
      .then(permission => {

        // Vérifie que l’autorisation a été acceptée.
        if (permission === 'granted') {
          alert('Merci')
        }
      })
  }
}