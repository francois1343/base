// Initialise le bouton d'installation de la PWA.
export const installApp = (idElement = '#install') => {
  const installBtn = document.querySelector(idElement)
  if (!installBtn) return
  let deferredPrompt = null

  // Le navigateur propose l'installation : on garde l'événement pour l'utiliser au clic.
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault()
    deferredPrompt = event
    installBtn.classList.remove('hidden')
    installBtn.addEventListener(`click`, installApp)
  })

  const installApp = () => {
    // Affiche la fenêtre native d'installation lorsque l'utilisateur clique sur le bouton.
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return

      deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice

      console.log(`Installation : ${choiceResult.outcome}`)
      deferredPrompt = null
      installBtn.classList.add('hidden')
    })

    // L'application vient d'être installée avec succès.
    window.addEventListener('appinstalled', () => {
      console.log('PWA installée')
      installBtn.classList.add('hidden')
    })
  }
}