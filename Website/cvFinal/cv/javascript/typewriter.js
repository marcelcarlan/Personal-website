
var i = 0;
var speed = 110;
var speedFast = 45;
var slowSpeed=700;
var index=0;
var textField = $('#typed1').get(0);
var typechanged=true;
var array =languageArrays['ro'][0];
var arraySecond = languageArrays['ro'][1] ;

var showTimeout;
var deleteTimeout;
var deleteTimeoutSecond;
var changeTimeout;
var initTimeout;
function deleteString() {
    var text = textField.innerText;
    if (text.length > 0) {
        textField.innerHTML = text.slice(0, -1);
        deleteTimeout=setTimeout(deleteString, speedFast)
    }
    else {
        typeWriter();
    }
}
function typeWriter() {
    if (index < array.length)
        if (i < array[index].length) {
            textField.innerHTML += array[index].charAt(i);
            i++;
            showTimeout=setTimeout(typeWriter, speed)
        } else {
            i = 0;
            index++;
            if (index != array.length) {
                deleteTimeout=setTimeout(deleteString, slowSpeed);
            }
            else {
                if (typechanged)
                    changeTimeout=setTimeout(changeWriteres,400);
                else finalAction();
            }
        }
}
function fadeItIn(item) {
    if(item.attr("data")=="visible") {
        item.fadeIn('fast', function () {
            fadeItOut(item);
        });
    }
    else item.hide();
}

function fadeItOut(item) {
    if(item.attr("data")=="visible") {
        item.fadeOut('fast', function () {
            fadeItIn(item);
        });
    }
    else item.hide();
}

function changeWriteres() {
    typechanged=false;
    i=0;
    index=0;
    array=arraySecond;
    textField=$('#typed2').get(0);
    $('#fader1').attr('data',"invisible");
    $('#fader2').attr('data',"visible");
    fadeItIn($('#fader2'));
    typeWriter();
}
function initTypewriter() {
    $('#fader2').hide();
    $('#fader1').attr('data',"visible");
    $('#fader2').attr('data',"invisible");
    i=index=0;
    typechanged=true;
    $('#home').removeClass('hometitleSmall');
    $('#home').addClass('hometitleBig');
    $('#typed1').text('');
    $('#typed2').text('');
    textField = $('#typed1').get(0);
    clearTimeout(showTimeout);
    clearTimeout(deleteTimeout);
    clearTimeout(deleteTimeoutSecond);
    clearTimeout(changeTimeout);
    clearTimeout(initTimeout);
    fadeItIn($('#fader1'));

    initTimeout=setTimeout(typeWriter,1000);
}
function finalAction() {
    $('#home').removeClass('hometitleBig');
    $('#home').addClass('hometitleSmall');
}

$(function () {
    $('.translate').click(function () {
        var lang = $(this).attr('id');
        if(lang==='ro') {
            array = languageArrays['ro'][0];
            arraySecond = languageArrays['ro'][1];
        }
        else {
            array = languageArrays['en'][0];
            arraySecond = languageArrays['en'][1];
        }
        $('#fader1').attr('data',"invisible");
        $('#fader2').attr('data',"invisible");
        initTypewriter();
        $('.lang').each(function (index,element) {
            $(this).html(arrLang[lang][$(this).attr('key')]);
        })
    })
})
$(document).ready(initTypewriter());