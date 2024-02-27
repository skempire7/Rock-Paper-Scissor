let score = JSON.parse(localStorage.getItem('score')) ||{
  wins: 0,
  losses:0,
  ties:0
};

updateScore();
let autoPlaying=false;
let intervalId;

function autoPlay(){
    if(!autoPlaying){
    intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    autoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    autoPlaying = false;
  }
}

function playGame(playerMove){
  const computerMove=pickComputerMove();
  let result='';
  if(playerMove === 'scissors'){
    if(computerMove === 'scissors'){
      result = 'Tie.';
    }
    else if(computerMove==='rock'){
      result = 'You Lose.';
    }
    else if(computerMove==='paper'){
      result='You win.';
    }
  }
  else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie.';
    }
    else if(computerMove==='paper'){
      result = 'You Lose.';
    }
    else if(computerMove==='scissors'){
      result='You win.';
    }
  }
  else if(playerMove === 'paper'){
    if(computerMove === 'paper'){
      result = 'Tie.';
    }
    else if(computerMove==='scissors'){
      result = 'You Lose.';
    }
    else if(computerMove==='rock'){
      result='You win.';
    }
     
  }
  if(result === 'You win.'){
    score.wins+=1;
  }
  else if(result === 'You Lose.'){
    score.loses+=1;
  }
  else if(result === 'Tie.'){
    score.ties+=1;
  }

  localStorage.setItem('score',JSON.stringify(score));
  updateScore();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-picked').innerHTML = `you<img src="images/${playerMove}-emoji.png" class="move-icon"><img src="images/${computerMove}-emoji.png" class="move-icon"> computer`;
}

function updateScore(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}
function pickComputerMove(){
  const randomNumber= Math.random();
  let computerMove='';
  if(randomNumber>=0 && randomNumber< 1/3){
    computerMove='rock';
  }
  else if(randomNumber>=1/3 && randomNumber < 2/3){
    computerMove='paper';
  }
  else if(randomNumber < 1){
    computerMove='scissors';
  }
  return computerMove;
}