// Modules responsables de l'installation de l'application et du service worker.
import { installApp } from './js/install.js'
import { Register } from './js/register-sw.js'

// Initialise le bouton d'installation de la PWA.
installApp()

// Enregistre le service worker pour activer le cache hors ligne.
Register()

// Vérifie si l'application est ouverte en tant que PWA installée.
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.matchMedia('(display-mode: minimal-ui)').matches

if (isPWA) {
  //alert('pwa')
}

// Récupère les données de la base Firebase.
fetch('https://ingrwf13-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
  .then(resp => resp.json())
  .then(resp => {
    alert(resp['-P-OwlX8uaoWvyuI7TGg'].tabel)
  })
  .catch(err => console.log(err))
