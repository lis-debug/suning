! function($) {
    // 轮播图
    const $lunboDiv = $('.lunbo');
    const $lunboLi = $('.lunbo ul li'); //轮播图片
    const $lunboItem = $('.lunbo-nav .lunbo-item'); //点击切换的小按钮
    const $detailsUl = $('.channel-tab-details-ul'); //数据渲染Ul
    const $leftBtn = $('.nav-left-btn'); //左边的按钮
    const $rightBtn = $('.nav-right-btn'); //右边的按钮

    let $num = 0;
    let $timer1 = null; //定时器1
    let $timer2 = null; //定时器2
    //点击小圆圈切换
    $lunboItem.on('mouseover', function() {
        $num = $(this).index(); //获取当前鼠标移入的索引
        $timer1 = setTimeout(function() {
            tabChange();
        }, 300);
    });
    $lunboItem.on('mouseout', function() {
        clearTimeout($timer1);
    });
    //点击左箭头切换
    $leftBtn.on('click', function() {
        $num--;
        if ($num < 0) {
            $num = $lunboLi.length - 1;
        }
        tabChange();
    });
    //点击右箭头切换
    $rightBtn.on('click', function() {
        $num++;
        if ($num > $lunboLi.length - 1) {
            $num = 0;
        }
        tabChange();
    });
    //封装函数
    function tabChange() {
        $lunboItem.eq($num).addClass('active').siblings().removeClass('active');
        $lunboLi.eq($num).stop(true).animate({
            opacity: 1
        }).siblings().stop(true).animate({
            opacity: 0
        });
    }

    //自动更换
    $timer2 = setInterval(() => {
        $rightBtn.click();
    }, 3000);

    $lunboDiv.hover(function() {
        clearInterval($timer2);
    }, function() {
        $timer2 = setInterval(() => {
            $rightBtn.click();
        }, 3000);
    });


    // 二级菜单
    const $sortList = $('.sort-list-box-ul li'); //左侧的list
    const $detailsDiv = $('.sort-list-details'); //二级菜单大盒子
    const $detailList = $('.sort-list-tel-details'); //二级菜单每个页面
    $sortList.hover(function() {
        $detailsDiv.show(); //右边的大盒子显示
        $(this).addClass('active').siblings('li').removeClass('active'); //当前点击的页面加类名
        $detailList.eq($(this).index()).show().siblings('.sort-list-tel-details').hide();

        let $scrollTop = $(window).scrollTop();
        let $divTop = $('.sort-list-box').offset().top;
        if ($scrollTop > $divTop) {
            $detailsDiv.css({
                top: $scrollTop - $divTop
            });
        } else {
            $detailsDiv.css({
                top: 0
            });
        }
    }, function() {
        $detailsDiv.hide();
    });

    //鼠标移到右边的盒子，盒子不消失
    $detailsDiv.hover(function() {
        $(this).show();
    }, function() {
        $(this).hide();
    });


    // $.ajax({
    //     url: 'http://localhost/dashboard/sunning/php/suningjson.php',
    //     dataType: 'json'
    // }).done(function(data) {
    //     // console.log(data); //Array(5)
    //     let strHtml = '';
    //     $.each(data, function(index, value) {
    //         strHtml += `<li class = "channel-tab-details-li">
    //         <a href="channel-tab-details-a" class=""><img src="${value.url}" class="channel-tab-details-img"></a>
    //         <p class="channel-tab-details-title">${value.title}</p>
    //         <p class="channel-tab-details-p"><span class="channel-tab-details-sale">${value.sale}</span></p>
    //         <p class="channel-tab-details-p1"><span class="channel-tab-details-saleprice"><i>￥</i><em>${value.saleprice}</em></span><span class="channel-tab-details-price"><i>￥</i><em>${value.price}</em></span></p>
    //         </li>`;
    //     });
    //     $detailsUl.html(strHtml);
    // });

    //tab切换效果
    const $channelLi = $('.channel-tab-nav-li'); //标题li
    const $channelTitle = $('.channel-tab-nav-title');
    const $channelWords = $('.channel-tab-nav-words span');
    // $channelLi.on('mouseover', function() {
    //     $channelTitle.eq($(this).index()).css('color', '#ff8000');
    //     $channelWords.eq($(this).index()).css('color', '#fff');
    //     $channelWords.eq($(this).index()).css('background-color', '#ff8000');
    // });
    // $channelLi.on('mouseout', function() {
    //     $channelTitle.eq($(this).index()).css('color', '#333');
    //     $channelWords.eq($(this).index()).css('color', '#999');
    //     $channelWords.eq($(this).index()).css('background-color', '#f2f2f2');
    // });

    //tab切换内容更改
    $.ajax({
        url: 'http://localhost/suning/sunning/php/suningjson.php',
        dataType: 'json'
    }).done(function(data) {
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        let arr6 = [];
        let arr7 = [];
        let newArr = [];
        $.each(data, function(index, value) {
            switch (value.tag) {
                case "精选":
                    arr1.push(value);
                    break;
                case "品质空调":
                    arr2.push(value);
                    break;
                case "商用空调":
                    arr3.push(value);
                    break;
                case "视觉盛宴":
                    arr4.push(value);
                    break;
                case "精选冰箱":
                    arr5.push(value);
                    break;
                case "洗衣必备":
                    arr6.push(value);
                    break;
                case "吃鸡装备":
                    arr7.push(value);
                    break;
            }
        });
        newArr.push(arr1, arr2, arr3, arr4, arr5, arr6, arr7);
        const $channelLi = $('.channel-tab-nav-li');
        let $timer = null;
        let strHtml = '';
        $.each(newArr[0], function(index, value) {
            $channelTitle.eq(0).css('color', '#ff8000');
            $channelWords.eq(0).css('color', '#fff');
            $channelWords.eq(0).css('background-color', '#ff8000');
            let $arrValue = value;
            strHtml += `<li class = "channel-tab-details-li">
            <a href="channel-tab-details-a" class=""><img src="${value.url}" class="channel-tab-details-img"></a>
            <p class="channel-tab-details-title">${value.title}</p>
            <p class="channel-tab-details-p"><span class="channel-tab-details-sale">${value.sale}</span></p>
            <p class="channel-tab-details-p1"><span class="channel-tab-details-saleprice"><i>￥</i><em>${value.saleprice}</em></span><span class="channel-tab-details-price"><i>￥</i><em>${value.price}</em></span></p>
            </li>`;
        });
        $detailsUl.html(strHtml);

        $channelLi.on('mouseover', function() {
            let $this = $(this);
            let strHtml = '';
            $channelTitle.eq($(this).index()).css('color', '#ff8000');
            $channelWords.eq($(this).index()).css('color', '#fff');
            $channelWords.eq($(this).index()).css('background-color', '#ff8000');
            $.each(newArr[$this.index()], function(index, value) {
                let $arrValue = value;
                strHtml += `<li class = "channel-tab-details-li">
                <a href="channel-tab-details-a" class=""><img src="${value.url}" class="channel-tab-details-img"></a>
                <p class="channel-tab-details-title">${value.title}</p>
                <p class="channel-tab-details-p"><span class="channel-tab-details-sale">${value.sale}</span></p>
                <p class="channel-tab-details-p1"><span class="channel-tab-details-saleprice"><i>￥</i><em>${value.saleprice}</em></span><span class="channel-tab-details-price"><i>￥</i><em>${value.price}</em></span></p>
                </li>`;
            });
            $detailsUl.html(strHtml);
        });
        $channelLi.on('mouseout', function() {
            $channelTitle.eq($(this).index()).css('color', '#333');
            $channelWords.eq($(this).index()).css('color', '#999');
            $channelWords.eq($(this).index()).css('background-color', '#f2f2f2');
        });


    });

    //检测是否用户已经登录
    if (localStorage.getItem('telnumber')) {
        $('.admin').show();
        $('#login-btn').hide();
        $('#reg-btn').hide();
        $('.admin span').html(localStorage.getItem('telnumber'));
    }

    //退出登录 - 删除本地存储
    $('.admin a').on('click', function() {
        $('.admin').hide();
        $('#login-btn').show();
        $('#reg-btn').show();
        localStorage.removeItem('telnumber');
    });

}(jQuery);