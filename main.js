const electron = require('electron')

const path = require('path')

const FPS = 60

let quit = false

function choiceRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function createWindow () {
  const win = new electron.BrowserWindow({
    width: 236,
    height: 238,
    useContentSize: true,
    resizable: false,
    fullscreen: false,
    frame: false,
  })

  electron.app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required")
  win.loadURL('file://' + path.join(__dirname, 'index.html'))

  let dx = choiceRandom([-20, -10, 10, 20])
  let dy = choiceRandom([-20, -10, 10, 20])

  const interval = setInterval(() => {
    if (win.isDestroyed()) {
      clearInterval(interval)
      return
    }
    const workArea = electron.screen.getPrimaryDisplay().workArea
    const winPos = win.getPosition()
    const winWorkAreaPos = {
      x: winPos[0] - workArea.x,
      y: winPos[1] - workArea.y,
    }
    const margin = {
      left: winWorkAreaPos.x,
      right: workArea.width - winWorkAreaPos.x - win.getSize()[0],
      top: winWorkAreaPos.y,
      bottom: workArea.height - winWorkAreaPos.y - win.getSize()[1],
    }
    if (margin.left + dx < 0 || margin.right - dx < 0) dx *= -1
    if (margin.top + dy < 0 || margin.bottom - dy < 0) dy *= -1
    win.setPosition(winPos[0] + dx, winPos[1] + dy)
  }, 1000 / FPS)

  win.on('close', (event) => {
    if (!quit) {
      event.preventDefault()
      createWindow()
    }
  })
}

electron.app.on('ready', createWindow)

electron.app.on('before-quit', () => quit = true)
