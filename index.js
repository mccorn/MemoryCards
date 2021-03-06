

// Model:Состояние
let model = {
    FULLCARDSSET : ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","0C","0D","0H","0S","AC","AD","AH","AS","JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS"],
    PAIRSCOUNT : 9,
    
    cardsset : [],
    score : 0,
    openedpairs : 0,
    activedcards : 0,
    history : [],
    
    init: function() {
        model.cardsset = model.chooseCardsSet();
        model.score = 0;
        model.history=[];
        model.openedpairs = 0;
    },
    
    addlog: function(elem) {
        model.history.push(elem);
    },
    
    updateModel: function(boolkey) {
        if (boolkey) {
            model.openedpairs++;
            model.score += (model.PAIRSCOUNT - model.openedpairs)*42;    
        }   else {
            model.score -= model.openedpairs * 42;
        } 
    },
    
    chooseCardsSet: function() {
        var arr = [];
        arr = model.FULLCARDSSET.sort(compareRandom).slice(0,model.PAIRSCOUNT);
        arr = arr.concat(arr);
        arr.sort(compareRandom);
        return arr;
    }

};


// Controller
var controller = {
   startNewGame: function(){
        model.init();
        viewer.init();
    },

    gameAction: function(somecard){      
        viewer.flipCard($(somecard));
        model.addlog($(somecard).data('tm'));
        if (model.activedcards === 2) {
            if (model.history[model.history.length - 1] != model.history[model.history.length - 2]) 
            {
                setTimeout( function(){
                    viewer.flipCard($(".openedcard"));
                    model.updateModel(false);
                    viewer.getScore();
                    model.activedcards = 0;
                }, viewer.TIMERSMALL);           
            }
            else {
                setTimeout( function(){
                    deleteOpenedCards();
                    model.updateModel(true);
                    viewer.getScore();
                    model.activedcards = 0;
                }, viewer.TIMERSMALL);  
                if ( model.openedpairs == model.PAIRSCOUNT - 1) {
                    $('.restartsubmit').prop("disabled", true);
                    model.updateModel(true);
                    viewer.openCardsSet();
                    viewer.getScore(); 
                    setTimeout( function(){ 
                        viewer.showScreenByClass('.finishscreen');
                    },viewer.TIMERSMALL);          
                }
            } 
        } 
    },  
    
    restartGame: function() {
        controller.startNewGame();
    }
}
$(document).ready(function(){
    $(document).on('click', '.closedcard', function(){
        if (model.activedcards < 2) {
            model.activedcards++;
            controller.gameAction(this);
        };
    });
});


//  View: Отображение
var viewer = {
    const TIMERBIG = 2000;
    const TIMERSMALL = 1500;
    
    init: function() {
        $(".cardsflex").empty();
        viewer.printCardsSet(model.cardsset);
        viewer.showScreenByClass('.playscreen'); 
        viewer.getScore();
    },
    
    printCard: function(card) {
        $('.cardsflex').append('<div class="closedcard card" data-tm = "' + card + '"><div class="frontcard" style="background-image: url(img/cards/' + card + '.png);" data-tid="Card"></div><div class="backcard" data-tid="Card-flipped"></div></div>');
    },

    printCardsSet: function(cardsarray) {
        for (var i=0; i < cardsarray.length; i++) {
            viewer.printCard(cardsarray[i]);
        }
        viewer.openCardsSet();
        setTimeout(function() { 
            viewer.closeCardsSet();
        },timerBig);
    },

    closeCardsSet: function() {
        $(".card").addClass("closedcard");
        $(".card").removeClass("openedcard");
    },

    openCardsSet: function() {
        $(".card").removeClass("closedcard");
        $(".card").addClass("openedcard");
    },
    
    deleteOpenedCards: function() {
        $(".openedcard").empty();
        $(".openedcard").removeClass('openedcard');
    },

    getScore: function() {
        $('.score').attr('value',model.score);
    },

    flipCard: function(card) {
        $(card).toggleClass('closedcard');
        $(card).toggleClass("openedcard");
    },

    showScreenByClass: function(screensclass) {
        $('.screen').css('z-index',0);
        $(screensclass).css('z-index',100);
    }  
}


// Вспомогательные функции
function compareRandom(a, b) {
  return Math.random() - 0.5;
}
    