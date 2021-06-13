'use strict';
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '世界で一番大きな湖は？', c:['カスピ海', 'カリブ海','琵琶湖']},
    {q: '2の8乗は?', c:['256', '64','1024']},
    {q: '次のうち、一番最初にリリースされた言語は？', c:['python', 'JavaScript','HTML']},
  ]);
  let currentNum = 0; //今何問目のクイズを解いているのかという変数
  let isAnswered;
  let score = 0;
  
  //フィッシャー・イエーツのシャッフル アルゴリズムのひとつ
  function shuffle(arr) {
    //array（配列）を引数にして、関数を作る
    //ランダムに選ぶ範囲の終点をiとする
    for (let i = arr.length - 1; i>0 ; i--) {
      const j = Math.floor(Math.random()*(i+1));
      //arrayのi番目とj番目を入れ替える操作 分割代入
      [arr[j],arr[i]] = [arr[i],arr[j]];
    }
    
    return arr;
  }

  function checkAnswer(li){
    // if(isAnswered === true){
    //  return;
    // }
    if(isAnswered){
     return;
    }
    isAnswered = true;
   if(li.textContent === quizSet[currentNum].c[0]){
     li.classList.add('correct');
     score++;
   }else{
    li.classList.add('wrong');
   }

   btn.classList.remove('disabled');
  }
  

  function setQuiz(){
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

     while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
     } 

  
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => {
          checkAnswer(li);
        });
        choices.appendChild(li);
      });

      if(currentNum === quizSet.length - 1){
        btn.textContent = 'Show Score';
      }
  }

  setQuiz();

  btn.addEventListener('click' , () =>{
    if(btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1) {
      scoreLabel.textContent =`Score:${score}/${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
  






}