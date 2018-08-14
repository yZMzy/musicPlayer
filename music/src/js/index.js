var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList;
var controlmanager;
var audiomanager = new root.audioManager();
var processor = root.process;
var playList = root.playList;

function bindTouch(){
    var $sliderPoint = $scope.find('.slider-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on('touchstart',function (){
        processor.stop()
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0; 
        }
        processor.upDate(percent);
    }).on('touchend',function (e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0; 
        }
        processor.upDate(percent);
        var index = controlmanager.index;
        var curDuration = songList[index].duration;
        var curTime = curDuration * percent;
        
        audiomanager.jumpToPlay(curTime);
        $scope.find('.play-btn').addClass('playing')
    })
}
function bindClick (){
    $scope.on('click','.play-btn',function(){
        if(audiomanager.status == 'play'){
            audiomanager.pause();
            processor.stop();
            
        }else{
            audiomanager.play();
            processor.start();
           
        }
        $(this).toggleClass('playing'); 
    })
    $scope.find('.list-btn').on('click',function (){
        playList.show(controlmanager);
    })
    $scope.find('.next-btn').on('click',function(){
        //处理边界值
        // if(index == songList.length-1){
        //     index = 0;
        // }else{
        //     index++;
        // }
        // root.render(songList[index])
        var index = controlmanager.next();
        $scope.trigger('player:change',index)
        
    })
    $scope.find('.prev-btn').on('click',function(){
        //处理边界值
    //     if(index == 0){
    //         index = songList.length - 1;
    //     }else{
    //         index--;
    //     }
    //     root.render(songList[index])
    var index = controlmanager.prev();
    $scope.trigger('player:change',index)
    })
}
$scope.on('player:change',function (event,index,flag){
    root.render(songList[index]);
    
    audiomanager.changeSource(songList[index].audio);
    if(audiomanager.status == 'play' || flag){
        
        processor.start();
        audiomanager.play();
    }
    processor.renderAllTime(songList[index].duration);
    processor.upDate(0);

})

console.log(root)
function getData(url){
    $.ajax({
        type:'GET',
        url: url,
        success : successFn
        }

    )
}
getData('/mock/data.json')
function successFn (data) {
    songList = data;
    // root.render(data[0]);
    $scope.trigger("player:change", 0);
    // $scope.trigger('player:change',0);
    bindTouch();
    

    bindClick();
    playList.renderPlayList(data);
    controlmanager = new root.controlManager(data.length);
}
