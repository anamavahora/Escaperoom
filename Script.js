let currentRoom = '';
let inventory = [];

function playSound() {
  document.getElementById('clickSound').play();
}

function startGame(room) {
  currentRoom = room;
  inventory = [];
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('roomTitle').textContent = `Room: ${room.toUpperCase()}`;
  document.getElementById('inventory').innerHTML = `<strong>Inventory:</strong> (empty)`;
  loadPuzzle(room);
}

function goToMenu() {
  document.getElementById('menu').classList.remove('hidden');
  document.getElementById('game').classList.add('hidden');
}

function loadPuzzle(room) {
  const area = document.getElementById('puzzleArea');
  area.innerHTML = '';

  if (room === 'easy') {
    area.innerHTML = `
      <p>You see a box with the code "1 2 _ 4". What number completes the sequence?</p>
      <input type="text" id="easyAnswer" />
      <button onclick="checkEasy()">Submit</button>
    `;
  }

  if (room === 'medium') {
    area.innerHTML = `
      <p>Combine two clues found in the drawer: "X=5" and "Y=3". What is X * Y?</p>
      <input type="text" id="mediumAnswer" />
      <button onclick="checkMedium()">Submit</button>
    `;
  }

  if (room === 'hard') {
    area.innerHTML = `
      <p>Decode this Caesar cipher: "KHOOR" (shift = 3). What is the original word?</p>
      <input type="text" id="hardAnswer" />
      <button onclick="checkHard()">Submit</button>
    `;
  }
}

function checkEasy() {
  const val = document.getElementById('easyAnswer').value.trim();
  playSound();
  if (val === '3') {
    alert('Correct! You found a key 🔑');
    inventory.push('Key');
    updateInventory();
    unlockRoom('medium');
  } else {
    alert('Try again.');
  }
}

function checkMedium() {
  const val = document.getElementById('mediumAnswer').value.trim();
  playSound();
  if (val === '15') {
    alert('Correct! You found a USB drive 💾');
    inventory.push('USB');
    updateInventory();
    unlockRoom('hard');
  } else {
    alert('Try again.');
  }
}

function checkHard() {
  const val = document.getElementById('hardAnswer').value.trim().toLowerCase();
  playSound();
  if (val === 'hello') {
    alert('You escaped the lab! 🎉');
    inventory.push('Escape Badge 🏆');
    updateInventory();
  } else {
    alert('Try again.');
  }
}

function unlockRoom(room) {
  if (room === 'medium') {
    document.getElementById('mediumBtn').disabled = false;
  } else if (room === 'hard') {
    document.getElementById('hardBtn').disabled = false;
  }
}

function updateInventory() {
  document.getElementById('inventory').innerHTML = `<strong>Inventory:</strong> ${inventory.join(', ')}`;
}
