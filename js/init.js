var l, pw, ph, prevh, prevw, thumb, hash, tid, t, relink, content, oldhash = "", settings = {};
    var click = true;

function pageload(hash, page) {
  if (page) is_menu = 1; else is_menu = 0;
    l = t;
    t = '#hit-' + hash;
    relink = content;
    h = $(t).height();
    w = $(t).width();
    if (!page) {
        the_url = $(t).find('a').attr('id');
    } else {
        the_url = page;
    }
    if ($(t).length == 0) {
        the_url = $('a[href$="#' + hash + '"]').attr('id');
        page = the_url;
        $('#page').addClass('post').empty();
    }
    if (hash) {
        $.ajax({
            url: the_url,
            cache: false,
            success: function (html) {
                $(l).fadeOut(settings.speed, function () {
                        $(this).empty();
                        $(this).append(relink);
                        $(this).removeClass('open opencols');
                });
                $(l).fadeIn();
                prevh = $(t).height();
                prevw = $(t).width();
                ph = $(t).find('img').height();
                pw = $(t).find('img').width();
                $("#loader").fadeOut(settings.duration + 100, function () {
                    if (!page) {
                        $('#page').removeClass('post').empty();
                        content = $(t).html();
                        tid = $(t).find('a').attr('id');
                        thumb = $(t).find('img').attr('src');
                        oldhash = $(t).find('a').attr('href');
                        $(t).empty();
                        $(t).append(html);
                        _height = $("#hit-" + hash).height();
                        $("#hit-" + hash + ' .single').fadeTo(0, 0);
                        $(t).addClass('open opencols');
                        $("#content").grid(settings, t, false, true);
                        click = true;
				        return true;
                    } else {
                        $('#page').addClass('post').empty();
                        $('#page').append(html).fadeTo(0, 0);
                        $('#page .single').fadeTo(0, 0);
                        $("#content").grid(settings, '#page', false, true);
                    }
                });
            }
        });
    } else {
        $(t).empty();
    }
}
$(function () {
	
	dur = $('#content').find('.post').size() * settings.speed;

    $('.navigation').hide();
    $('.search').mouseenter(function () {
        if ($(this).val() == 'Search') $(this).val('');
        $(this).focus();
    })
    $('.search').mouseleave(function () {
        if ($(this).val() == '') {
            $(this).val('Search');
            $(this).blur();
        }
    })
    $('.browse').click(function () {
        $('.navigation').css('visibility', 'hidden');
        $('.navigation_content').fadeOut(0);
        if ($(this).hasClass('down')) {
            $(this).removeClass('down').addClass('up');
       } else {
            $(this).removeClass('up').addClass('down');
        }
        $('.navigation').slideToggle(100, function () {
            $("#content").grid(settings);
            setTimeout(function() { $('.navigation').css('visibility', 'visible'); $('.navigation_content').fadeIn(100); }, dur);
        });
    });
    var resizeTimer = null;
    $(window).bind('resize', function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $("#content").grid(settings, '', false, false);
        }, 100);
    });
    $(".thumbimg").live("mouseenter", function () {
        $(this).fadeTo('fast', 1);
    }).live("mouseleave", function () {
        $(this).fadeTo('slow', 0.3);
    });
    
    // disable animation at start
    settings.animateUpdate = false;
    $("#content").grid(settings, '', false, true);
    // enable animation
    settings.animateUpdate = true;
    
    $(".page > a[rel='history']").live('click', function (e) {
        var hash = this.href;
        var page = this.id;
        hash = hash.replace(/^.*#/, '');
        $.historyLoad(hash, page);
        $("#loader").css('top', e.pageY - 10);
        $("#loader").css('left', e.pageX - 10);
        $("#loader").fadeIn(100);
    });
    $("#content div > a[rel='history']").live('click', function (e) {
        if(click===true){
        	click = false;
        	var hash = this.href;
	        hash = hash.replace(/^.*#/, '');
	        $.historyLoad(hash);
	        $("#loader").css('top', e.pageY - 10);
	        $("#loader").css('left', e.pageX - 10);
	        $("#loader").fadeIn(100);
	        return true;
        } else {
        	return false;
        }
    });
    $.historyInit(pageload);
});
