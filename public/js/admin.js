query_dir = basicUtil.url.getQueryDir();

console.log(query_dir);



$(function () {
    if (query_dir !== '/admin/dashboard') {
        return false;
    }
    $($(".layui-nav-item").children("a[href='/admin/dashboard']")).parent('li').addClass('layui-this');

    layui.use('table', function () {
        var table = layui.table;
        table.on('tool(articles)', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;
            var tr = obj.tr;
            if (layEvent === 'detail') {
                window.open("/home/article-detail/" + data.id + "");
            }
            if (layEvent === 'edit') {
                window.location.href = "/admin/update-article/" + data.id + "";
            }
            if (layEvent === 'del') {
                layer.confirm('辛辛苦苦写的文章，就这么删除了？', {
                    btn: ['确定', '取消'] //按钮
                }, function (index) {
                    $.post('/admin/delete-article', {id: data.id}, function (res) {
                        if (res.code == 0) {
                            obj.del();
                            layer.close(index);
                            layer.msg('真的删了', {time: 2000, icon: 1});
                        } else {
                            layer.msg(res.msg, {time: 2000, icon: 5});
                        }
                    });
                    //
                });
            }

        });
        $('#search').click(function () {
            table.reload('article_table', {
                url: '/admin/articles'
                , where: {kw: $('#kw').val()}
            });
        });
    });

});

$(function () {
    if (query_dir !== '/admin/infoset') {
        return false;
    }
    $($(".layui-nav-item").children("a[href='/admin/infoset']")).parent('li').addClass('layui-this');
    //修改签名
    $('.sign').change(function () {
        var sign = $('.sign').val();
        $.ajax({
            type: "POST",
            url: "/admin/edit_sign",
            data: {sign: sign},
            dataType: "json",
            beforeSend: function () {
                layer.load(0, {shade: 0.1});
            },
            success: function (res) {
                layer.closeAll('loading');
                if (res.code == 0) {
                    layer.msg(res.msg, {icon: 1});
                } else {
                    layer.alert(res.msg, {icon: 5});
                }
            }
        });
    });
});
