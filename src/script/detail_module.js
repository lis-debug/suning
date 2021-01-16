define(['jcookie'], () => {
    return {
        init: function() {
            // 通过地址栏把sid传给后端
            //获取sid
            let $sid = location.search.substring(1).split('=')[1];
            //如果没有传，默认为1
            if (!$sid) {
                $sid = '1';
            }
            //将sid的值传给后端,后端返回对应sid的数据
            $.ajax({
                url: 'http://10.31.160.88/suning/sunning/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                $('#pic').attr('src', data.url);
                $('.item-name').html(data.title);
                $('.item-desc').html(data.title);
                $('.ckPrice-sp1').html(data.price);
                $('.ckPrice-sp2').html(data.price);
                $('#bPic').attr('src', data.url);
                //渲染放大镜下面的小图
                let $picurl = data.urls.split(','); //将数据转换成数组。
                let $strhtml = '<ul>';
                const $list = $('#list');
                $.each($picurl, function(index, value) {
                    $strhtml += `<li class="details-li"><img src="${value}" class = "details-img"/></li>`;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
            });
            const $spic = $('#img-box'); //左边的图片
            const $bpic = $('#bPic'); //右边的大图
            const $sf = $('#sf'); //小放大镜
            const $bf = $('#bigPic'); //大放大镜
            const $list = $('#list'); //下面的小图列表
            //小放大镜/大放大镜=小图/大图
            //小放大镜=小图*大放大镜/大图
            $sf.width($spic.width() * $bf.width() / $bpic.width());
            $sf.height($spic.height() * $bf.height() / $bpic.height());
            let $bili = $bpic.width() / $spic.width(); //比例大于1 放大效果

            $spic.hover(function() {
                $sf.css('opacity', '0.6'); //大小放大镜显示
                $bf.css('opacity', '1');
                $(this).on('mousemove', function(ev) {
                    // 小放大镜的left值
                    let $leftvalue = ev.pageX - $('.details-wrap').offset().left - $sf.width() / 2;
                    //小放大镜的top值
                    let $topvalue = ev.pageY - $('.details-wrap').offset().top - $sf.height() / 2;
                    if ($leftvalue < 0) {
                        $leftvalue = 0;
                    } else if ($leftvalue >= $spic.width() - $sf.width()) {
                        $leftvalue = $spic.width() - $sf.width()
                    }

                    if ($topvalue < 0) {
                        $topvalue = 0;
                    } else if ($topvalue >= $spic.height() - $sf.height()) {
                        $topvalue = $spic.height() - $sf.height()
                    }

                    $sf.css({
                        left: $leftvalue,
                        top: $topvalue
                    });

                    $bpic.css({
                        left: -$leftvalue * $bili,
                        top: -$topvalue * $bili
                    });

                });
            }, function() {
                $sf.css('opacity', '0');
                $bf.css('opacity', '0');
            });

            //小图切换 - 小图是渲染出来的，找不到li。
            $('#list').on('click', 'li', function() { //事件委托,ul元素没有高度不可见，委托#list
                let $imgurl = $(this).find('img').attr('src'); //获取当前图片的地址
                $('#pic').attr('src', $imgurl);
                $('#bPic').attr('src', $imgurl);
            });


            //加入购物车
            //1.准备两个数组。存储sid和num
            let arrSid = [];
            let arrNum = [];

            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrSid = $.cookie('cookiesid').split(',');
                    arrNum = $.cookie('cookienum').split(',');
                } else {
                    arrSid = [];
                    arrNum = [];
                }
            }

            $('.gwc-box a').on('click', function() {
                getcookietoarray();
                //当前的详情页面的sid在数组中不存在，表示第一次加入购物车
                if ($.inArray($sid, arrSid) === -1) {
                    arrSid.push($sid); //把当前的sid存下来
                    console.log($sid);
                    console.log(arrSid);
                    $.cookie('cookiesid', arrSid, { expires: 10, path: '/' }); //sid以数组的形式保存到cookie中
                    arrNum.push($('#count').val()); //获取加入购物车的商品数量，加到数量数组中
                    $.cookie('cookienum', arrNum, { expires: 10, path: '/' }); //保存到cookie中
                    alert('加入购物车成功！');
                } else { //如果不是第一次添加
                    // 通过当前商品的sid在数组中的位置，获取对应的数量
                    let $index = $.inArray($sid, arrSid);
                    // 重新给num赋值
                    arrNum[$index] = parseInt(arrNum[$index]) + parseInt($('#count').val());
                    $.cookie('cookienum', arrNum, { expires: 10, path: '/' }); //保存到cookie中
                    alert('加入购物车成功！');
                }
            })




        }
    }

});