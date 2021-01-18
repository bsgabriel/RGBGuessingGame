let numberOfSquares = 6;
let colors;
let targetColor;
let score = 0;
let isPlaying = true;
const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const message = document.getElementById('message');
const h1 = document.querySelector('h1'); 
const resetButton = document.querySelector('#reset');
const difficultyButtons = document.querySelectorAll('.difficulty');
const scoreString = document.querySelector('#score');

init()

function init()
{
  setDifficultyButtons();
  setSquares();
  reset();
}

// Event listeners dos botoões de dificuldade
function setDifficultyButtons()
{
  for(let i = 0; i < difficultyButtons.length; i++)
  {
    difficultyButtons[i].addEventListener('click', function(){
      difficultyButtons[0].classList.remove('selected');
      difficultyButtons[1].classList.remove('selected');
      this.classList.add('selected');
      if(this.textContent === 'easy')
      {
        numberOfSquares = 3;
      }
      else
      {
        numberOfSquares = 6;
      }
      reset();
    });
  }
}

function setSquares()
{
  for(let i = 0; i < squares.length; i++)
  {
    // Adiciona eventos de clique nos quadrados
    squares[i].addEventListener('click', function()
    {
      // Pega a cor do quadrado selecionado
      const clickedColor = this.style.backgroundColor;
      // Compara com  a cor que deve ser adivinhada
      console.log(`Clicked: ${clickedColor}, target: ${targetColor}`);
      if(isPlaying)
      { 
        if (clickedColor === targetColor)
        {
          message.textContent = "Correct!";
          resetButton.textContent = "Play again?";
          h1.style.backgroundColor = targetColor;
          changeColors(clickedColor);
          score++;
          isPlaying = false;
        }
        else
        {
          this.style.backgroundColor = "#232323";
          message.textContent = "Try again";
        }
      } 
    });
  }
}

function reset()
{
  // Gerar todas as cores
  colors = generateRandomColors(numberOfSquares);
  // Pegar uma cor aleatória no array de cores
  targetColor = pickColor();
  // Muda o colorDisplay
  colorDisplay.textContent = targetColor;
  resetButton.textContent = 'New Colors';
  message.textContent = '';
  scoreString.textContent = `SCORE: ${score}`;
  isPlaying = true;
  // Mudar a cor dos quadrados
  for(let i = 0; i < squares.length; i++)
  {
    if(colors[i])
    {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    }
    else
    {
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = 'steelblue';
}

resetButton.addEventListener('click', reset);
colorDisplay.textContent = targetColor; // Cor que deve ser adivinhada

function changeColors(color)
{
  for(let i = 0; i < squares.length; i++)
  {
    squares[i].style.backgroundColor = color;
  }  
}

function pickColor()
{
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(numSquares)
{
  // Cria um array
  const arr = [];

  // Repete de acordo com o número de quadrados
  for(let i = 0; i < numSquares; i++)
  {
    // Pega uma cor aleatória e joga no array
    arr.push(randomColor());
  }
  return arr;
}

function randomColor()
{
  // Gera as cores Vermelho, Verde e Azul
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
 return  `rgb(${r}, ${g}, ${b})`;
}
