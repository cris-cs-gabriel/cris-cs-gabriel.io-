window.onload = () => {
  const game        = document.getElementById('game');
  const dino        = document.getElementById('dino');
  const beginBtn    = document.getElementById('begin');
  const endScreen   = document.getElementById('endScreen');
  const retryBtn    = document.getElementById('retry');
  const scoreEl     = document.getElementById('score');
  const timeEl      = document.getElementById('time');
  const finalScore  = document.getElementById('finalScore');
  const finalTime   = document.getElementById('finalTime');

  const NORMAL_H = 40;
  const CROUCH_H = 20;

  let jumping   = false;
  let crouching = false;
  let gameOver  = false;
  let score     = 0;
  let startTime = 0;
  let timeTimer = null;
  let spawnId   = null;
  let activeObstacles = [];

  beginBtn.addEventListener('click', () => {
    beginBtn.style.display = 'none';
    startGame();
  });

  retryBtn.addEventListener('click', () => {
    endScreen.style.display = 'none';
    startGame();
  });

  window.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowUp'   ||
        e.code === 'ArrowDown' ||
        e.code === 'Space') {
      e.preventDefault();
    }

    if (gameOver) return;

    if ((e.code === 'Space' || e.code === 'ArrowUp') && !jumping && !crouching) {
      doJump();
    }

    if (e.code === 'ArrowDown' && !jumping) {
      crouching = true;
      dino.style.height = CROUCH_H + 'px';
    }
  });

  window.addEventListener('keyup', function(e) {
    if (e.code === 'ArrowDown') {
      crouching = false;
      dino.style.height = NORMAL_H + 'px';
    }
  });

  function doJump() {
    jumping = true;
    const duration  = 600;
    const maxHeight = 100;
    let startTs = null;

    function frame(ts) {
      if (!startTs) startTs = ts;
      const p = ts - startTs;
      dino.style.bottom = (Math.sin(Math.PI * (p / duration)) * maxHeight) + 'px';
      if (p < duration) {
        requestAnimationFrame(frame);
      } else {
        dino.style.bottom = '0px';
        jumping = false;
      }
    }
    requestAnimationFrame(frame);
  }

  function startGame() {
    gameOver  = false;
    jumping   = false;
    crouching = false;
    score     = 0;

    dino.style.bottom = '0px';
    dino.style.height = NORMAL_H + 'px';
    scoreEl.textContent = 'SCORE: 0';

    document.querySelectorAll('.obstacle').forEach(o => o.remove());
    activeObstacles = [];

    clearInterval(timeTimer);
    clearInterval(spawnId);

    startTime = Date.now();
    timeTimer = setInterval(() => {
      if (!gameOver) {
        timeEl.textContent = 'TIME: ' + Math.floor((Date.now() - startTime) / 1000) + 's';
      }
    }, 1000);

    spawnLoop();
  }

  function spawnLoop() {
    const GAME_W = 800;
    const GAP    = 300;

    spawnId = setInterval(() => {
      if (gameOver) { clearInterval(spawnId); return; }

      let rightmost = -Infinity;
      activeObstacles.forEach(t => { rightmost = Math.max(rightmost, t.pos); });

      const spawnX = GAME_W - 30;
      if (rightmost === -Infinity || spawnX - rightmost >= GAP) {
        createObstacle(spawnX, Math.random() < 0.2);
      }
    }, 20);
  }

  function createObstacle(startX, flying) {
    if (gameOver) return;

    const obs = document.createElement('div');
    obs.className = 'obstacle';
    obs.style.left = startX + 'px';

    if (flying) {
      obs.classList.add('flying');
      obs.style.height = '70px';
      obs.style.bottom = '20px';
    } else {
      obs.classList.add('ground');
      const h = [70, 45, 60][Math.floor(Math.random() * 3)];
      obs.style.height = h + 'px';
      obs.style.bottom = '0px';
    }

    game.appendChild(obs);

    const tracker = { pos: startX, passed: false };
    activeObstacles.push(tracker);

    const moveId = setInterval(() => {
      if (gameOver) {
        clearInterval(moveId);
        obs.remove();
        activeObstacles = activeObstacles.filter(t => t !== tracker);
        return;
      }

      const d = dino.getBoundingClientRect();
      const o = obs.getBoundingClientRect();

      if (d.left < o.right && d.right > o.left &&
          d.top  < o.bottom && d.bottom > o.top) {
        gameOver = true;
        clearInterval(moveId);
        obs.remove();
        activeObstacles = activeObstacles.filter(t => t !== tracker);
        endGame();
        return;
      }

      if (!tracker.passed && o.right < d.left) {
        tracker.passed = true;
        score++;
        scoreEl.textContent = 'SCORE: ' + score;
        scoreEl.classList.add('pop');
        setTimeout(() => scoreEl.classList.remove('pop'), 300);
      }

      if (tracker.pos <= -50) {
        clearInterval(moveId);
        obs.remove();
        activeObstacles = activeObstacles.filter(t => t !== tracker);
      } else {
        tracker.pos -= 5;
        obs.style.left = tracker.pos + 'px';
      }
    }, 20);
  }

  function endGame() {
    clearInterval(timeTimer);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    finalScore.textContent = 'FINAL SCORE: ' + score;
    finalTime.textContent  = 'FINAL TIME: '  + elapsed + 's';
    endScreen.style.display = 'flex';
  }
};