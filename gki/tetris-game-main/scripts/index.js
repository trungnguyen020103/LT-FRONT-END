//21130589 Nguyen Quoc Trung
// khai báo biến

const LEVEL = {
  1:{
    time: 350,
    route :false,
    number_brick_random: 0
  },
  2: {
    time: 300,
    route:false,
    number_brick_random: 7
  },
  3: {
    time: 300,
    route :true,
    number_brick_random: 5
  },
  4:{
    time: 300,
   check_false:false,
   route : false,
   number_brick_random:4
  },
  5:{
    time: 300,
    check_false :false,
    route : false,
    number_brick_random:1
  }
}
let time;
let route;
let number_brick_random;
let count_move =0;
let count_brick_current=0;
let isPause = false;
let refresh;
let leveltext = "Level";
let max_score = 0;
let isPlaying ;
let count_false=0;
const COLLUM = 10;
const ROW = 20;
const size_block = 30;
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const UP_ARROW = 'ArrowUp';
const DOWN_ARROW = 'ArrowDown';
const LIST_COLOR = [
  'red',
  'orange',
  'green',
  'purple',
  'blue',
  'cyan',
  'yellow',
  'white',
];

const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];
const ARROW = {
  LEFT: LEFT_ARROW,
  RIGHT: RIGHT_ARROW,
  UP: UP_ARROW,
  DOWN: DOWN_ARROW,
};
const WHITE_COLOR_ID = 7;
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');

context.canvas.width = COLLUM * size_block;
context.canvas.height = ROW * size_block;

class Board {
  constructor(context) {
    this.context = context;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.isOver = false;
    this.isPlaying = false;
  }

  reset() {
    this.score = 0;
    this.grid = this.generateWhiteBoard();
    this.isOver = false;
    this.drawBoard();
  }

  generateWhiteBoard() {
    const whiteBoard = [];
    for (let i = 0; i < ROW; i++) {
      const row = [];
      for (let j = 0; j < COLLUM; j++) {
        row.push(WHITE_COLOR_ID);
      }
      whiteBoard.push(row);
    }
    return whiteBoard;
  }

  drawCell(xAxis, yAxis, colorId) {
    const xCoordinate = xAxis * size_block;
    const yCoordinate = yAxis * size_block;
    const color = LIST_COLOR[colorId] || LIST_COLOR[WHITE_COLOR_ID];

    this.context.fillStyle = color;
    this.context.fillRect(xCoordinate, yCoordinate, size_block, size_block);
    
    this.context.strokeStyle = 'black';
    this.context.strokeRect(xCoordinate, yCoordinate, size_block, size_block);
}  
  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  complete() {
    const latestGrid = board.grid.filter((row) => {
        return row.some(col => col === WHITE_COLOR_ID);
    });

    const newScore = ROW - latestGrid.length;

    if (newScore) {
        // Tạo một hàng mới với các ô màu trắng và thêm vào đầu grid
        const newROW = Array.from({ length: newScore }, () => Array(COLLUM).fill(WHITE_COLOR_ID));
        board.grid = [...newROW, ...latestGrid];
        // Cập nhật điểm
        this.showScore(newScore * 10);
        // Đặt lại đếm số lần không hoàn thành hàng về 0
        count_false = 0;
    } else {
       if(LEVEL[4].check_false==true){
         // Tăng số lần không hoàn thành hàng lên 1
         count_false++;
         // Kiểm tra nếu đã có 5 lần không hoàn thành hàng
         if (count_false === 10) {
             // Tạo một khối mới ngẫu nhiên và cho nó rơi xuống
            for(var i =0;i<LEVEL[4].number_brick_random;i++){
              generateAndDropNewBrick();
            }
             // Đặt lại số lần không hoàn thành hàng về 0
             count_false = 0;
       }
        }
        if(LEVEL[5].check_false==true){
          // Tăng số lần không hoàn thành hàng lên 1
          count_false++;
          // Kiểm tra nếu đã có 5 lần không hoàn thành hàng
          if (count_false === 5) {
            clearBoard();
              // Tạo một khối mới ngẫu nhiên và cho nó rơi xuống
             for(var i =0;i<count_brick_current;i++){
               generateAndDropNewBrick();
             }
              // Đặt lại số lần không hoàn thành hàng về 0
              
              count_false = 0;
        }
         }
    }
}


  showScore(newScore) {
    this.score += newScore;

    document.getElementById('score').innerHTML = this.score;
  }

  overGame() {
    if (this.score > max_score) {
      max_score = this.score;
      $('#max_score').text(max_score);
    }

    this.isOver = true;
    this.isPlaying = false;
    $(".content-arlet").text("You lose !!!");
    $("#play-again").css('display', 'block');
    $("#btn-arlet").click();
  }
}

class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id];
    this.currentPosition = 0;
    this.colCoordinates = 3;
    this.rowCoordinates = 0;
    this.rotationCount=0;
  }
// vẽ khối 
  draw() {
    const layout = this.layout[this.currentPosition];
    for (let row = 0; row < layout.length; row++) {
      for (let col = 0; col < layout[0].length; col++) {
        const cellColor = layout[row][col];
        if (cellColor !== WHITE_COLOR_ID) {
          const cellRow = row + this.rowCoordinates;
          const cellCol = col + this.colCoordinates;
          board.drawCell(cellCol, cellRow, this.id);
        }
      }
    }
}

clear() {
  const layout = this.layout[this.currentPosition];
  layout.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
          if (cell !== WHITE_COLOR_ID) {
              board.drawCell(colIndex + this.colCoordinates, rowIndex + this.rowCoordinates, WHITE_COLOR_ID);
          }
      });
  });
}


  moveLeft() {
    if (
      !this.checkCollision(
        this.rowCoordinates,
        this.colCoordinates - 1,
        this.layout[this.currentPosition]
      )
    ) {
      this.clear();
      this.colCoordinates--;
      this.draw();
    }
  }

  moveRight() {
    if (
      !this.checkCollision(
        this.rowCoordinates,
        this.colCoordinates + 1,
        this.layout[this.currentPosition]
      )
    ) {
      this.clear();
      this.colCoordinates++;
      this.draw();
    }
  }

  moveDown() {
    if (
      !this.checkCollision(
        this.rowCoordinates + 1,
        this.colCoordinates,
        this.layout[this.currentPosition]
      )
    ) {
      this.clear();
      this.rowCoordinates++;
      this.draw();
      count_move++;
      console.log("Số hàng đã di chuyển: "+count_move);

    

      return;
    }

    this.landingBlock();
    generateNewBrick();
}

  moveDownInstance() {
    if (
      !this.checkCollision(
        this.rowCoordinates + 1,
        this.colCoordinates,
        this.layout[this.currentPosition]
      )
    ) {

      while (!this.checkCollision(this.rowCoordinates + 1, this.colCoordinates, this.layout[this.currentPosition])) {
        this.clear();
        this.rowCoordinates++;
        this.draw();
      }
      count_brick_current++;
      console.log(count_brick_current);
      return;
    }
    this.landingBlock();
    generateNewBrick();
  }
  rotate() {
    if(LEVEL[3].route===true || LEVEL[4].route===true){
      
      if (this.rotationCount < 3) { // Kiểm tra số lần xoay đã thực hiện
        if (
          !this.checkCollision(
            this.rowCoordinates,
            this.colCoordinates,
            this.layout[(this.currentPosition + 1) % 4]
          )
        ) {
          this.clear();
          this.currentPosition = (this.currentPosition + 1) % 4;
       this.rotationCount++;
          this.draw();
        }
      }
    }else{
      if (
        !this.checkCollision(
          this.rowCoordinates,
          this.colCoordinates,
          this.layout[(this.currentPosition + 1) % 4]
        )
      ) {
        this.clear();
        this.currentPosition = (this.currentPosition + 1) % 4;
        /**
         * currentPosition = 0
         * 0 + 1 = 1 % 4 ==> 1
         *
         * currentPosition = 3
         * 3 + 1 = 4 % 4 ==> 0
         *
         * **/
        this.draw();
        this.rotationCount++;
      }
    }
  }

   checkCollision(nextRow, nextCol, nextLayout) {
    return nextLayout.some((row, rowIndex) => {
        return row.some((cell, colIndex) => {
            const boardRow = nextRow + rowIndex;
            const boardCol = nextCol + colIndex;
            return (
                cell !== WHITE_COLOR_ID &&
                (boardRow < 0 || boardCol < 0 || boardRow >= ROW || boardCol >= COLLUM || board.grid[boardRow][boardCol] !== WHITE_COLOR_ID)
            );
        });
    });
}
checkCollision(nextRow, nextCol, nextLayout) {

    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= COLLUM ||
            row + nextRow >= ROW ||
            board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
          )
            return true;
        }
      }
    }

    return false;
  }
  // xử lý hạ khối xuống
  landingBlock() {
    if (this.rowCoordinates <= 0) {
      board.overGame();
      return;
    }

    for (let row = 0; row < this.layout[this.currentPosition].length; row++) {
      for (let col = 0; col < this.layout[this.currentPosition][0].length; col++) {
        if (this.layout[this.currentPosition][row][col] !== WHITE_COLOR_ID) {
          board.grid[row + this.rowCoordinates][col + this.colCoordinates] = this.id;
        }
      }
    }
    board.complete();
    board.drawBoard();
  }
}



document.addEventListener('keydown', (e) => {
  if (!board.isOver && board.isPlaying) {
    console.log({ e });
    switch (e.code) {
      case ARROW.LEFT:
        brick.moveLeft();
        break;
      case ARROW.RIGHT:
        brick.moveRight();
        break;
      case ARROW.DOWN:
        brick.moveDownInstance();
        break;
      case ARROW.UP:
        brick.rotate();
        break;
      default:
        break;
    }
  }
});
function createBrickRandom(board) {
  const randomBrickId = Math.floor(Math.random() * 10) % BRICK_LAYOUT.length;
  const brick = new Brick(randomBrickId);
  const initialrowCoordinates = -2;
  const initialcolCoordinates = Math.floor(Math.random() * (COLLUM - brick.layout[0][0].length));
  brick.rowCoordinates = initialrowCoordinates;
  brick.colCoordinates = initialcolCoordinates;

  while (!brick.checkCollision(brick.rowCoordinates + 1, brick.colCoordinates, brick.layout[brick.currentPosition])) {
    brick.rowCoordinates++;
  }
  brick.draw();
  for (let row = 0; row < brick.layout[brick.currentPosition].length; row++) {
    for (let col = 0; col < brick.layout[brick.currentPosition][0].length; col++) {
      if (brick.layout[brick.currentPosition][row][col] !== WHITE_COLOR_ID) {
        board.grid[row + brick.rowCoordinates][col + brick.colCoordinates] = brick.id;
      }
    }
  }

  board.drawBoard();
}

function generateNewBrick() {
  brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length); 

}
board = new Board(context);
board.drawBoard();
// xử lý nút play
document.getElementById('play').addEventListener('click', () => {

    count_false=0;
    count_brick_current=0;
    // xử lý lv1
  if(leveltext ==="Level"){
    $(".content-arlet").text("Please choose a level!!!");
    $("#btn-arlet").click();
    
  }
  if (leveltext === "Level 1") {
    isPause = false;
    
   if(board.isPlaying){
        clearInterval(refresh);
        $('#score').text(0)
        board.reset();
        board.isPlaying = true;
        generateNewBrick();
        console.log(board.isPlaying);
         refresh = setInterval(() => {
          if (!board.isOver ) {
            brick.moveDown();
          } else if (board.isPlaying==true|| board.isOver){
            clearInterval(refresh);
          }
        }, LEVEL[1].time);
   }else{
    $('#score').text(0)
    board.reset();
    board.isPlaying = true;
    generateNewBrick();
    
    console.log(board.isPlaying);
     refresh = setInterval(() => {
      if (!board.isOver ) {
        brick.moveDown();
      } else{
        clearInterval(refresh);
      }
    }, LEVEL[1].time);
   }
  }
  // xử lý lv2
  if (leveltext === "Level 2") {
    count_brick_current =0;
    count_brick_current += LEVEL[2].number_brick_random;
    isPause = false;
    if(board.isPlaying){
      clearInterval(refresh);
      console.log(board.isPlaying);
      $('#score').text(0)
      board.reset();
      board.isPlaying = true;
      generateNewBrick();
      for (let i = 0; i < LEVEL[2].number_brick_random; i++) {
        createBrickRandom(board);
      }
       refresh = setInterval(() => {
        if (!board.isOver) {
          brick.moveDown();
        } else {
          clearInterval(refresh);
        }
      }, LEVEL[2].time);
    }else{
      $('#score').text(0)
    board.reset();
    board.isPlaying = true;
    generateNewBrick();
    for (let i = 0; i < LEVEL[2].number_brick_random; i++) {
      createBrickRandom(board);
    }
     refresh = setInterval(() => {
      if (!board.isOver) {
        brick.moveDown();
      } else {
        clearInterval(refresh);
      }
    }, LEVEL[2].time);
    }
  }
  // xử lý lv3
  if (leveltext === "Level 3") {
    isPause = false;
    count_brick_current =0;
    count_brick_current+=LEVEL[3].number_brick_random;
    if(board.isOver||board.isPlaying) {
      clearInterval(refresh);
      console.log(board.isPlaying);
      $('#score').text(0)
      board.reset();
      board.isPlaying = true;
      generateNewBrick();
        LEVEL[3].route = true;
        for (let i = 0; i < LEVEL[3].number_brick_random; i++) {
          createBrickRandom(board);
        }
       refresh = setInterval(() => {
        if (!board.isOver) {
          brick.moveDown();
        } else {
          clearInterval(refresh);
        }
      }, LEVEL[3].time);
    }else{
      $('#score').text(0)
      board.reset();
      board.isPlaying = true;
      generateNewBrick();
        LEVEL[3].route = true;
        for (let i = 0; i < 7; i++) {
          createBrickRandom(board);
        }
       refresh = setInterval(() => {
        if (!board.isOver) {
          brick.moveDown();
        } else {
          clearInterval(refresh);
        }
      }, LEVEL[3].time);
    }
   
  }
  // xử lý lv4
  if (leveltext === "Level 4") {
    isPause = false;
    count_brick_current+=LEVEL[4].number_brick_random;
    LEVEL[4].check_false = true;
    if(board.isOver||board.isPlaying) {
      clearInterval(refresh);
      console.log(board.isPlaying);
      $('#score').text(0)
      board.reset();
      board.isPlaying = true;
      generateNewBrick();
        LEVEL[4].route = true;
        for (let i = 0; i < LEVEL[4].number_brick_random; i++) {
          createBrickRandom(board);
        }
       refresh = setInterval(() => {
        if (!board.isOver) {
          brick.moveDown();
        } else {
          clearInterval(refresh);
        }
      }, LEVEL[4].time);
    }else{
      $('#score').text(0)
      board.reset();
      board.isPlaying = true;
      generateNewBrick();
        LEVEL[4].route = true;
        for (let i = 0; i < LEVEL[4].number_brick_random; i++) {
          createBrickRandom(board);
        }
       refresh = setInterval(() => {
        if (!board.isOver) {
          brick.moveDown();
        } else {
          clearInterval(refresh);
        }
      }, LEVEL[4].time);
    }
   
  }
  //xử lý lv5
  if (leveltext === "Level 5") {
    
    isPause = false;
    count_brick_current+=LEVEL[5].number_brick_random;
    LEVEL[5].check_false = true;
    if(board.isOver||board.isPlaying) {
      clearInterval(refresh);
      console.log(board.isPlaying);
      $('#score').text(0)
      board.reset();
      board.isPlaying = true;
      generateNewBrick();
        LEVEL[5].route = false;
        for (let i = 0; i < LEVEL[5].number_brick_random; i++) {
          createBrickRandom(board);
        }
       refresh = setInterval(() => {
        if (!board.isOver) {
          brick.moveDown();
        } else {
          clearInterval(refresh);
        }
      }, LEVEL[5].time);
    }else{
      $('#score').text(0)
      board.reset();
      board.isPlaying = true;
      generateNewBrick();
        LEVEL[5].route = false;
        for (let i = 0; i < LEVEL[5].number_brick_random; i++) {
          createBrickRandom(board);
        }
       refresh = setInterval(() => {
        if (!board.isOver) {
          brick.moveDown();
        } else {
          clearInterval(refresh);
        }
      }, LEVEL[5].time);
    }
   
  }
})
function limitRotateBrick(board) {
  if (
    !this.checkCollision(
      this.rowCoordinates,
      this.colCoordinates,
      this.layout[(this.currentPosition + 1) % 4]
    )
  ) {
    this.clear();
    this.currentPosition = (this.currentPosition + 1) % 4;
    this.draw();
  }
}
// xu ly nut pause
$("#pause").on("click",function () {
isPause = !isPause;
if (isPause) {
clearInterval(refresh);
$("#pause").text("Continue");
$("#pause").css("background-color", "red");
$("#pause").css("text-aligh", "center");
}else{
if (!isPause) {

  $("#pause").text("Pause");
$("#pause").css("background-color", "greenyellow");
}
  refresh = setInterval(() => {
    if (!board.isOver) {
        brick.moveDown();
    } else if (board.isPlaying || board.isOver) {
        clearInterval(refresh);
    }
},getSpeedByLevel());
}});
function getSpeedByLevel(){
  const numberLevel = String.prototype.lastIndexOf(leveltext);
  if (leveltext === "Level 1") {
    return LEVEL[1].time;
  }
  if (leveltext === "Level 2") {
    return LEVEL[2].time ;
  }
  if (leveltext === "Level 3") {
    return LEVEL[3].time;
  }
}
// xử lý sự kiện next level
$(document).ready(function() {
  $("#next").on("click", function() {
    
    let levelNumber = parseInt(leveltext.match(/\d+/)[0]); 
    console.log(levelNumber);
    if( levelNumber+1>6){
      $(".content-arlet").text("Please choose a level number from the 1 to 6 !!! ");
      $("#btn-arlet").click();
     
    }else{
      let nextLevelNumber = levelNumber + 1;
    let changLevelText = "Level"+" "+nextLevelNumber;
   leveltext = changLevelText;
    
    $("#dropbtn").text(changLevelText);
    $("#play").click ();
    }

  });
});
//hàm này dùng trong lv4, dùng để tạo ra các khối và tự động thả xuống ngẫu nhiên
function generateAndDropNewBrick() {
  // Tạo một khối mới ngẫu nhiên
  const randomBrickId = Math.floor(Math.random() * 10) % BRICK_LAYOUT.length;
  brick = new Brick(randomBrickId);

  // Xác định vị trí ban đầu cho khối mới
  const initialrowCoordinates = 0;
  const initialcolCoordinates = Math.floor(Math.random() * (COLLUM - brick.layout[0][0].length));
  brick.rowCoordinates = initialrowCoordinates;
  brick.colCoordinates = initialcolCoordinates;

  // Đặt khối vào vị trí rơi xuống đầu tiên
  while (!brick.checkCollision(brick.rowCoordinates + 1, brick.colCoordinates, brick.layout[brick.currentPosition])) {
      brick.rowCoordinates++;
  }

  // Vẽ khối trên màn hình và cập nhật grid
  brick.draw();
  for (let row = 0; row < brick.layout[brick.currentPosition].length; row++) {
      for (let col = 0; col < brick.layout[brick.currentPosition][0].length; col++) {
          if (brick.layout[brick.currentPosition][row][col] !== WHITE_COLOR_ID) {
              board.grid[row + brick.rowCoordinates][col + brick.colCoordinates] = brick.id;
          }
      }
  }
  board.drawBoard();
}
// đếm số brick có trong bảng hiện tại
function countBlocks() {
  let blockCount = 0;
  // Duyệt qua từng ô trong lưới
  for (let row = 0; row < ROW; row++) {
      for (let col = 0; col < COLLUM; col++) {
          // Nếu giá trị của ô không phải màu trắng, tăng biến đếm lên
          if (board.grid[row][col] !== WHITE_COLOR_ID) {
              blockCount++;
          }
      }
  }

  return blockCount;
}
// xóa và vẽ lại bảng ( )
function clearBoard() {
  // Duyệt qua từng ô trong lưới và đặt giá trị của nó về màu trắng
  for (let row = 0; row < ROW; row++) {
      for (let col = 0; col < COLLUM; col++) {
          board.grid[row][col] = WHITE_COLOR_ID;
      }
  }
  // Vẽ lại bảng để hiển thị trạng thái mới sau khi xóa
  board.drawBoard();
}

$(document).ready(function () {
  $("#dropbtn").click(function () {
    $("#myDropdown").toggle(); // Toggle dropdown
  });
});

$(document).ready(function () {
  // xử lý sự kiện chọn levels
  $(".level").click(function () {
    var selectedLevel = $(this).text();
    $("#dropbtn").text(selectedLevel);
    console.log(selectedLevel);
    leveltext = selectedLevel
    $("#pause").text("Pause");
    $("#pause").css("background-color","greenyellow");
    $(".dropdown-content").hide();
  });
  // xử lý sự kiện nút play-again
  $("#play-again").click(function () {
    $("#play").click();
  });
  
});

