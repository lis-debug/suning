! function($) {
    const $goodsUl = $('.goods-details ul');
    const $btn = $('.details-wrap button');
    let $arr_pre = []; //排序前的数组
    let $arr = []; //排序后的数组
    let $pre_price = []; //前一个商品的价格
    let $price = []; //后一个商品的价格

    $.ajax({
        url: 'http://10.31.160.88/suning/sunning/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $dataArr = data.pagedata;
        console.log($dataArr);
        let $strHtml = '';
        $.each($dataArr, function(index, value) {
            $strHtml += `
            <li>
            <a href="detail.html?sid=${value.sid}">
            <img src="${value.url}" width="200" height="200"/>
            <p>${value.title}</p>
            <span>￥${value.price}</span>
            </a>
            </li>
            `;
        });
        $goodsUl.html($strHtml);
        $arr_pre = [];
        $arr = [];
        //将li添加到数组中
        $('.goods-details li').each(function(index, element) {
            $arr_pre[index] = $(this);
            $arr[index] = $(this);
        });


        //分页
        $('.page').pagination({
            pageCount: data.pageno, //总的页数
            jump: true, //是否开启跳转到指定的页数，布尔值。
            prevContent: '上一页', //将图标改成上一页下一页。
            nextContent: '下一页',
            callback: function(api) {
                console.log(api.getCurrent()); //获取当前的点击的页码。
                $.ajax({
                    url: 'http://10.31.160.88/suning/sunning/php/listdata.php',
                    data: {
                        page: api.getCurrent()
                    },
                    dataType: 'json'
                }).done(function(data) {
                    let $dataArr = data.pagedata;
                    console.log($dataArr);
                    let $strHtml = '';
                    $.each($dataArr, function(index, value) {
                        $strHtml += `
                            <li>
                            <a href="detail.html?sid=${value.sid}">
                            <img src="${value.url}" width="200" height="200"/>
                            <p>${value.title}</p>
                            <span>￥${value.price}</span>
                            </a>
                            </li>
                            `;
                    });
                    $goodsUl.html($strHtml);
                    //将li添加到数组中
                    $arr_pre = [];
                    $arr = [];
                    $('.goods-details li').each(function(index, element) {
                        $arr_pre[index] = $(this);
                        $arr[index] = $(this);
                    });
                });
            }

        });

        //默认排序
        $btn.eq(0).on('click', function() {
            $.each($arr_pre, function(index, value) {
                $goodsUl.append(value);
            });
        });

        //升序排列
        $btn.eq(1).on('click', function() {
            for (let i = 0; i < $arr.length - 1; i++) {
                for (let j = 0; j < $arr.length - i - 1; j++) {
                    $pre_price = parseFloat($arr[j].find('span').html().substring(1)); //前一个价格
                    $price = parseFloat($arr[j + 1].find('span').html().substring(1)); //后一个价格
                    console.log($pre_price);
                    if ($pre_price > $price) { //价格比较
                        let temp = $arr[j]; //交换的是li
                        $arr[j] = $arr[j + 1];
                        $arr[j + 1] = temp;
                    }
                }
            }
            //交换后的新数据加到ul上
            $.each($arr, function(index, value) {
                $goodsUl.append(value);
            });
        });

        //降序排列
        $btn.eq(2).on('click', function() {
            for (let i = 0; i < $arr.length - 1; i++) {
                for (let j = 0; j < $arr.length - i - 1; j++) {
                    $pre_price = parseFloat($arr[j].find('span').html().substring(1));
                    $price = parseFloat($arr[j + 1].find('span').html().substring(1));
                    if ($pre_price < $price) {
                        let temp = $arr[j];
                        $arr[j] = $arr[j + 1];
                        $arr[j + 1] = temp;
                    }
                }
            }
            $.each($arr, function(index, value) {
                $goodsUl.append(value);
            });
        });

    });

}(jQuery);