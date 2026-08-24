//Install
const installBtn = document.querySelector('#install')
let defferedPrompt = null

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault()
  defferedPrompt = event
  installBtn.classList.remove('hidden')
  installBtn.addEventListener('click', installApp)
})

const installApp = () => {
  defferedPrompt.prompt()
  installBtn.classList.add('hidden')

  //wait user choice
  defferedPrompt.userChoice.then(choiceResult => {
    console.log(choiceResult)
    if (choiceResult.outcome === 'accepted') {
      installBtn.classList.add('hidden')
    }
    else {
      console.log('PWA rejected')
    }
    defferedPrompt = null
  })
}