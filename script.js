const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
const game = document.querySelector('.game')

let isPlaying = true

let isJumping = false
let dinoPosition = 0;

const handleKeys = (e) => {
  if (e.keyCode === 32) {
    if (isPlaying === true) {
      if (!isJumping) jump()
    } else {
      // Restart
      window.location.reload(); 
      isPlaying = true
    }
  }
  if (e.keyCode === 83) {
    // s saves screenshot
    html2canvas(document.body, {
      onrendered: function (canvas) {
        canvas.toBlob(function (blob) {
          saveAs(blob, "wholePage.png");
        });
      },
      // view-source:https://w3lessons.info/demo/screenshots-using-javascript.php
      allowTaint: true,
      imageTimeout: 0,
      useCORS: true
    });
    return false;
  }
}

const jump = () => {
  isJumping = true

  let upInterval = setInterval(
    () => {
      if (dinoPosition >= 150) {
        clearInterval(upInterval)

        let downInterval = setInterval(() => {
          if (dinoPosition <= 0) {
            isJumping = false
            clearInterval(downInterval)
          } else {
            dinoPosition -= 20
            dino.style.bottom = dinoPosition + "px"
          }
        }, 20);
      } else {
        dinoPosition += 20
        dino.style.bottom = dinoPosition + "px"
      }
    },
    20
  )
}

const createCactus = () => {
  const cactus = document.createElement('div')
  let cactusPosition = window.innerWidth
  cactus.classList.add('cactus')
  cactus.style.left = cactusPosition + 'px'
  background.appendChild(cactus)

  let randomTime = Math.random() * 6000

  let leftInterval = setInterval(() => {
    if (cactusPosition <= -60) {
      background.removeChild(cactus)
      clearInterval(leftInterval)
    } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60) {
      // Game Over
      clearInterval(leftInterval)
      isPlaying = false
      game.innerHTML = '<div><h1 class="game-over">Game Over</h1><p class="instructions">Press <i>space</i> to start and to jump.</p></div>'
    } else {
      cactusPosition -= 10
      cactus.style.left = cactusPosition + 'px'
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus()
document.addEventListener('keydown', handleKeys)