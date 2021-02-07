export async function jqueryWatcher() {
  return new Promise((resolve) => {
    if (window.$ || window.jQuery) {
      resolve()
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('script').forEach((script) => {
          script.onload = () => {
            if (window.$ || window.jQuery) {
              resolve()
            }
          }
        })
      })
    }
  })
}
