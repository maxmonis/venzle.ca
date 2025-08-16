import { toast } from "./elements"

let timeout: ReturnType<typeof setTimeout>

function removeToast() {
  return new Promise(resolve => {
    clearTimeout(timeout)
    toast.classList.add("exit")
    timeout = setTimeout(() => {
      toast.classList.remove("enter", "exit")
      toast.remove()
      resolve(true)
    }, 300)
  })
}

export async function showToast(message: string) {
  if (document.body.contains(toast)) await removeToast()
  toast.innerHTML = message
  document.body.appendChild(toast)
  timeout = setTimeout(() => {
    toast.classList.add("enter")
    timeout = setTimeout(removeToast, 3000)
  }, 50)
}
