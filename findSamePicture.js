var cards;
var start = document.getElementById("start");
var cardTableId = document.getElementById("cardTable");
var gameState = 'already';

// 난수 생성기
function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// 카드 테이블 생성
function setCardTable() {
    cards = [
        'card_001.png','card_001.png',
        'card_002.png','card_002.png',
        'card_003.png','card_003.png',
        'card_004.png','card_004.png',
        'card_005.png','card_005.png',
        'card_006.png','card_006.png',
        'card_007.png','card_007.png',
        'card_008.png','card_008.png',
        'card_009.png','card_009.png',
        'card_010.png','card_010.png',
        'card_011.png','card_011.png',
        'card_012.png','card_012.png',
        'card_013.png','card_013.png',
        'card_014.png','card_014.png',
        'card_015.png','card_015.png'
    ];
    var cardTable = '<tr>';
    for(var i = 0; i < 30; i++){
        if(i > 0 && i % 6 == 0){
            cardTable += '</tr><tr>';
        }
        var index = getRandomInt(0,29-i);
        var img = cards.splice(index,1);
        cardTable += '<td id="card'+i+'"><img class="card-list" src="image/maple/'+img+'"><img class="hide" src="image/maple/hide_maple.png"></td>';
    }
    cardTable += '</tr>';
    cardTableId.innerHTML = cardTable;
}

// 카드 숨기기
function hideCard() {
    var cards = document.getElementsByClassName("card-list");
    var hide = document.getElementsByClassName("hide");
    for(var i=0; i < cards.length; i++) {
        cards[i].style.display = 'none';
        hide[i].style.display = 'block';
    }
}

// 게임 시작
function startGame() {
    var timeCount = document.getElementById("countDown");
    var sec = 5;
    setCardTable();

    function timePrint(){
        timeCount.style.display = 'inline-block';
        timeCount.innerHTML = sec;
        if (sec > 1) {
            sec -= 1;
        }
    }
    
    // 카운트 다운
    var countDown = setInterval(timePrint,1000);
    setTimeout(function() {
        clearInterval(countDown);
        timeCount.style.display = 'none';
        hideCard();
        gameState = 'already';
    }, 6000);

    var success = 0;
    var count = 0;
    var cardSelects = document.getElementById("cardTable").getElementsByTagName("td");
        for (var i = 0; i < 30; i++){
            var firstSelect = '';
            var secondSelect = '';
            var firstHide = null;
            var secondHide = null;
            var firstClassCard = '';
            var secondClassCard = '';
            cardSelects[i].addEventListener("click",function twocardSelect(){
                if (gameState == 'Roading') return;
                if (secondSelect != '') return;
                if(this.className == 'open') return;
                var cardImg = this.getElementsByTagName("img")[0];
                var hideImg = this.getElementsByTagName("img")[1];
                cardImg.style.display = "block";
                hideImg.style.display = "none";
                count++;
                
                
                
                if(count == 1){
                    firstSelect = cardImg;
                    firstHide = hideImg;
                    this.classList.add("open");
                    firstClassCard = this;
                } else if(count == 2){
                    secondSelect = cardImg;
                    secondHide = hideImg;
                    this.classList.add("open");
                    secondClassCard = this;
                    if(firstSelect.getAttribute("src")== secondSelect.getAttribute("src")) {
                        success++;
                        secondSelect = '';  
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    else{
                        setTimeout(function(){
                            firstSelect.style.display = "none";
                            secondSelect.style.display = "none";
                            firstHide.style.display = "block";
                            secondHide.style.display = "block";
                            firstSelect = '';
                            secondSelect = '';     
                            firstClassCard.classList.remove("open");
                            secondClassCard.classList.remove("open");
                        }, 1000);
                    }
                    count = 0;
                }  
            },false);
        }
}


// start 버튼 누를 시 startGame() 실행
function clickStart() {
    if (gameState === 'already'){
        gameState = 'Roading';
        startGame();
    } 
}


start.getElementsByTagName("span")[0].addEventListener("click", clickStart, false);




