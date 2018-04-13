var FULLCARDSSET = ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","0C","0D","0H","0S","AC","AD","AH","AS","JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS"];
var PAIRSCOUNT = 2;


var cardsset = [];
var history = []; // История вскрытия карт
var score = 0;
var openedpairs = 0;

var controller = {
// С этой функцией вроде все в порядке
    startNewGame: function(){
//        alert('Game started');
        showScreenByClass('.playscreen');
        $(".cardsflex").empty();
        cardsset = chooseCardsSet();
        printCardsSet(cardsset);
        score = 0;
        history = [];
        openedpairs = 0;
        getScore(score);
    }
//    Если рас коментировать эту функцию,код упадет    
//    gameAction: function(){
//        if ($('.openedcard').length <= 1) {
//            flipCard($(this));
//        }
//        history.push($(this).attr('data-tm'));
//        if (!(history.length % 2)) {
//            if (history[history.length - 1] != history[history.length - 2]) 
//            {
//                setTimeout( function(){
//                    flipCard($(".openedcard"));
//                },2000);   
//                score -= openedpairs * 42;
//                getScore(score);
//            }
//            else {
//                setTimeout( function(){
//                    $(".openedcard").empty();
//                    $(".openedcard").removeClass('openedcard');
//                    openedpairs++;
//                    score += (PAIRSCOUNT - openedpairs)*42;
//                    getScore(score);
//                },2000);    
//                if ( $('.closedcard').length == 2) {
//                    openCardsSet();
//                    openedpairs++;
//                    score += (PAIRSCOUNT - openedpairs)*42;
//                    getScore(score);
//                    setTimeout( function(){
//                        showScreenByClass('.finishscreen');
//                    },2000);          
//                }
//            }
//        }   
//    }
}

function compareRandom(a, b) {
      return Math.random() - 0.5;
    }

//            Состояние
    function chooseCardsSet() {
        var arr = [];
        arr = FULLCARDSSET.sort(compareRandom).slice(0,PAIRSCOUNT);
        arr = arr.concat(arr);
        arr.sort(compareRandom);
        return arr;
    }

//            Отображение

    function printCard(card) {
        $('.cardsflex').append('<div class="closedcard card" data-tm = "' + card + '"><div class="frontcard" style="background-image: url(img/cards/' + card + '.png);" data-tid="Card"></div><div class="backcard" data-tid="Card-flipped"></div></div>');
    }

    function printCardsSet(cardsarray) {
        for (var i=0; i < cardsarray.length; i++) {
            printCard(cardsarray[i]);
        }
        openCardsSet();
        setTimeout(function() { 
            closeCardsSet();
        },5000);
    }

    function closeCardsSet() {
        $(".card").addClass("closedcard");
        $(".card").removeClass("openedcard");
    }

    function openCardsSet() {
        $(".card").removeClass("closedcard");
        $(".card").addClass("openedcard");
    }

    function getScore(num) {
        $('.score').attr('value',num);
    }

    function flipCard(card) {
        $(card).toggleClass('closedcard');
        $(card).toggleClass("openedcard");
    }

    function showScreenByClass(screensclass) {
        $('.screen').css('z-index',0);
        $(screensclass).css('z-index',100);
    }  

    