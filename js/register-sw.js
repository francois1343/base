export const Register = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(registration => {
        console.log("SW enregistré : ", registration)
      })
      .catch(error => {
        console.log('sw, error')
      })
  }
}