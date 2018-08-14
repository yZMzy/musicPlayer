(function ($,root){
    var $scope  = $(document.body);
    var controlmanager;
    $playList = $('<div class="play-list">'+ 
    '<div class="list-header">播放列表</div>'+
    '<ul class="list-wrapper"></ul>'+
    '<div class="close-btn">关闭</div>'
    +'</div>');
    function renderPlayList(data){
        var html = '';
        for(var i = 0;i < data.length; i++){
            html +=  "<li><h3>" + data[i].song  + '-<span>' + data[i].singer + '</span></h3></li>'
        }
        $playList.find('ul').html(html);
        $scope.append($playList)
    }
    function show (control){
        controlmanager = control;
        var index = controlmanager.index;
        $playList.addClass('show');
        signRed(index);
        bindEvent(); 
    }
    function signRed(index){
        $scope.find('.sign').removeClass('sign');
        $scope.find('li').eq(index).addClass('sign');
    }
    function bindEvent(){
        $playList.find('.close-btn').on('click',function () {
            $playList.removeClass('show');
            
        })
        $playList.find('li').on('click',function(){
            var index = $(this).index();
            signRed(index);
            $scope.trigger('player:change',[index,true]);
            controlmanager.index = index;
            setTimeout(function(){
                $playList.removeClass('show')
            },500);
            $scope.find('.play-btn').addClass('playing');
            
        })
    }
    root.playList = {
        renderPlayList : renderPlayList,
        show : show
    }

}(window.Zepto,window.player))