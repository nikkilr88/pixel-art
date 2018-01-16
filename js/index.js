const formBtn = document.querySelector('#formBtn'),
  settings = document.querySelector('#settings'),
  wrapper = document.querySelector('.gridWrapper'),
  colorPick = document.querySelector('#colorPick'),
  arrow = document.querySelector('#arrow'),
  size = document.querySelector('#size'),
  tools = document.querySelector('.tools'),
  clear = document.querySelector('#clear');

let color = '#000',
  height;

// CALL CREATEDIV FUNCTION
formBtn.addEventListener('click', function () {
  let rows = document.querySelector('#rows').value;
  let cols = document.querySelector('#cols').value;
  height = 20;
  createGrid(rows, cols);
  showHide('hide');
});

// CLEAR
clear.addEventListener('click', function () {
  let res = confirm('Are you sure you want to clear your beautiful work?');

  if (res) {
    clearBoard();
  }
});

// COLOR DIV
// Detect if mouse button is down
let mouseDown = 0;

wrapper.onmousedown = function () {
  mouseDown = 1;
}
wrapper.onmouseup = function () {
  mouseDown = -1;
}

// Color div
const drawEvents = ['click', 'mouseover'].map(function (event) {
  wrapper.addEventListener(event, function (e) {
    // On hover
    if (e.type === 'mouseover') {
      if (mouseDown > 0 && e.target && e.target.className === 'box') {
        e.target.style.background = color;
      }
    }
    // On click
    if (e.type === 'click') {
      if (e.target && e.target.className === 'box') {
        e.target.style.background = !e.target.style.background ? color :
          e.target.style.background && e.altKey ? '' :
          color;
      }
    }

  });
});

// CHANGE COLOR
colorPick.addEventListener('change', function (e) {
  color = this.value;
});

// CHANGE BOX SIZE
const sizeEvents = ['change', 'mousemove'].map(function (event) {
  size.addEventListener(event, function () {
    let boxes = document.querySelectorAll('.box');
    height = this.value;

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.height = this.value + 'px';
      boxes[i].style.width = this.value + 'px';
    }
  })
})

// HIDE/SHOW SETTINGS PANEL
arrow.addEventListener('click', function () {
  showHide('show');
});

document.addEventListener('click', function (e) {
  let clickedInside = settings.contains(e.target);

  if (!clickedInside && e.target.id !== "arrow") {
    showHide('hide');
  }
});

/*==================================
  GRID SETTINGS FUNCTIONS
===================================*/

// ADD COLUMNS
function addCol() {
  let rows = document.querySelectorAll('.row');

  for (let i = 0; i < rows.length; i++) {
    let div = createDiv();
    rows[i].appendChild(div);
  }
}

// REMOVE COLUMNS
function removeCol() {
  let rows = document.querySelectorAll('.row');

  for (let i = 0; i < rows.length; i++) {
    rows[i].removeChild(rows[i].lastChild);
  }
}

// ADD ROWS
function addRow() {
  let rows = document.querySelector('.row');
  let cols = rows.children.length;

  let row = createRow(cols);
  wrapper.appendChild(row);
}

// REMOVE ROWS
function removeRow() {
  wrapper.removeChild(wrapper.lastChild);
}

// CLEAR BOARD
function clearBoard() {
  let boxes = document.querySelectorAll('.box');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.removeProperty('background');
  }
}

/*==================================
  HELPER FUNCTIONS
===================================*/

// CREATE GRID
function createGrid(rows, cols) {

  wrapper.innerHTML = '';
  size.value = 20;

  let row = createRow(cols);

  for (let i = 0; i < rows; i++) {
    let clone = row.cloneNode(true);
    wrapper.appendChild(clone);
  }

  wrapper.style.display = 'table';
  tools.style.display = 'block';
}

// SHOW/HIDE
function showHide(cmd) {
  arrow.style.opacity = cmd == 'hide' ? 1 : 0;
  settings.style.height = cmd == 'hide' ? '0' : '150px';
}

// CREATE BOX DIV
function createDiv() {
  let div = document.createElement('div');
  div.classList.add('box');
  div.style.height = height + 'px';
  div.style.width = height + 'px';
  return div;
}

// CREATE GRID ROW
function createRow(cols) {
  let row = document.createElement('div');
  row.classList.add('row');

  for (let i = 0; i < cols; i++) {
    let div = createDiv();
    row.appendChild(div);
  }

  return row;
}