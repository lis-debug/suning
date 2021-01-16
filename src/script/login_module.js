define([], function() {
    return {
        init: function() {
            const $tel = $('#userName'); //手机号
            const $pwd = $('#password'); //密码
            const $login = $('#login');

            $('#login').on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.160.88/suning/sunning/php/login.php',
                    data: {
                        tel: $tel.val(),
                        password: $pwd.val()
                    }
                }).done(function(data) {
                    console.log(data);
                    if (!data) { //登录失败
                        alert('用户名或密码有误！');
                        $pwd.val('');
                    } else {
                        location.href = 'index.html';
                        localStorage.setItem('telnumber', $tel.val());
                    }
                })
            })


        }
    }
});