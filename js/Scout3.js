var Scout3={};
function s3SetScreen(screenname) {
    $('Scout3-screen').each(function(index,element){
        if($(element).attr('screen')!=screenname){
            if(!$(element).hide()) $(element).fadeOut(500);
            $(element).attr('active', 'no');
        }
        else if($(element).attr('screen')==screenname){
            $(element).attr('active', 'yes');
            $(element).fadeIn(500);
        }
    })
}
$(document).ready(function(){
//Functions and  vars
var Scout3timers={};
function Scout3Error(message) {
    this.name = "Scout3 Error";
    this.message = message+"(for now I\'ve broken the element and left it blank for you to fix)";
}
Scout3Error.prototype = Error.prototype;
//Tag Functions
function s3checklabel(is,label) {
    return "<label for='"+is+"'>"+label+"</label>";
}
function s3checkid(is,tag) {
    if (!is){ 
        throw new Scout3Error('You did not give one of your '+tag+' tags an `is` attr. Do that. I beg you. Now.'); 
    }
}
//Screen Functions
function s3checkscreenactive(ths) {
    if(ths.attr('active') == 'yes'){
        ths.fadeIn(500);
    }
    else if(ths.attr('active') == 'no'){
        if(!ths.hide()) ths.fadeOut(500);
    }
    else throw new Scout3Error('You did not set the active attr to yes or no for screen `'+ths.attr('screen')+'`. Please set it to either "yes" or "no"')
}
//End Functions
//Tags
xtag.register('scout3-input', {
    lifecycle:{
        created: function(){
            Scout3[$(this).attr('is')] = "";
            s3checkid($(this).attr('is'), 'scout3-input');
            var input = this.checkinputype();
            if($(this).attr('label')) var label = s3checklabel($(this).attr('is'),$(this).attr('label'));
            else label = "";
            $(this).html(label+input);
        }
    },
    methods: {
        checkinputype: function(){
        if(!$(this).attr('type')) throw new Scout3Error('there is an error in setting the input type of the id: '+$(this).attr('is')+'. You probably forgot to add a type for the element. It\'s required, read the docs.');
        else if($(this).attr('type') == 'textarea') return "<textarea class='child' id='"+$(this).attr('is')+"'/>";
        else if($(this).attr('type') == 'select'){
            var optionstag="<option class='child0' value='Please select an option'>Please select an option</option>\n";
            var childnum=1;
            $.each($(this).attr('options').split('_'), function(key,value){
                optionstag = optionstag+'<option class="child'+childnum+'" value="'+value+'">'+value+'</option> \n';
                childnum++;
            });
            return "<select id="+$(this).attr('is')+"> \n"+optionstag+"</select>";
        }
        else if($(this).attr('type') == 'radio'){
            var radiotag="";
            var childnum=0;
            var is=$(this).attr('is');
            $.each($(this).attr('options').split('_'), function(key,value){
                radiotag = radiotag+'<input type="radio" class="child'+childnum+'" name="'+is+'" value="'+value+'""> '+value+' \n';
                childnum++;
            });
            return radiotag;
        }
        else if($(this).attr('type') != 'textarea' || $(this).attr('type') != 'select' || $(this).attr('type') != 'radio') return "<input type='"+$(this).attr('type')+"' id='"+$(this).attr('is')+"' />";
        },
        setinputtimer: function(thisis,thistype){
            var i = setInterval(function() {
                if(thistype == 'checkbox') Scout3[thisis]= $("#"+thisis).is(":checked");
                else if(thistype == 'radio') Scout3[thisis]= $('input[name='+thisis+']:checked').val();
                else{
                    Scout3[thisis] = $('#'+thisis).val();
                }
            }, 500);
            $("#"+thisis).blur(function(){
                clearInterval(i);
            })
        }
    },
    events: {
        tap: function(){
            var thisis = $(this).attr('is');
            var thistype = $(this).attr('type');
            this.setinputtimer(thisis,thistype);
        }
    }
});
xtag.register('scout3-timer', {
    lifecycle:{
        created: function(){
            Scout3[$(this).attr('is')] = "";
            s3checkid($(this).attr('is'), 'scout3-timer');
            if($(this).attr('label')) var label = s3checklabel($(this).attr('is'),$(this).attr('label'));
            else label = "";
            var timer = this.createtimer();
            $(this).html(label+timer);
            if($(this).children('.stop')) $(this).children('.stop').prop("disabled",true);
            if($(this).children('.pause')) $(this).children('.pause').prop("disabled",true);
            Scout3timers[$(this).attr('is')] = {id: 'null', going: 'no', sec: '0', secc: '0', seccc: '0'};
            
        },
        attributeChanged: function(attrName, oldValue, newValue){
            Scout3[$(this).attr('is')] = "";
            s3checkid($(this).attr('is'), 'scout3-timer');
            if($(this).attr('label')) var label = s3checklabel($(this).attr('is'),$(this).attr('label'));
            else label = "";
            var timer = this.createtimer();
            $(this).html(label+timer);
            if($(this).children('.stop')) $(this).children('.stop').prop("disabled",true);
            if($(this).children('.pause')) $(this).children('.pause').prop("disabled",true);
            Scout3timers[$(this).attr('is')] = {id: 'null', going: 'no', sec: '0', secc: '0', seccc: '0'};
        }
    },
    methods: {
        createtimer: function(){
            var places;
            if(!$(this).attr('places')) throw new Scout3Error('You did not give one of your Scout3-timer tags (is="'+$(this).attr('is')+'") a `places` attr. Do that. I beg you. Now.'); 
            else if($(this).attr('places') != '1' && $(this).attr('places') != '2' && $(this).attr('places') != '3') throw new Scout3Error('One of your scout3-timer tags (is="'+$(this).attr('is')+'") has a places tag that is invalid (!1,2 or 3)'); 
            if(!$(this).attr('type')) throw new Scout3Error('You did not give one of your Scout3-timer tags (is="'+$(this).attr('is')+'") a `type` attr. Do that. I beg you. Now.'); 
            else if($(this).attr('type') != 'single' && $(this).attr('type') != 'double') throw new Scout3Error('One of your scout3-timer tags (is="'+$(this).attr('is')+'") has a type tag that is invalid (!single or double)'); 
            places = $(this).attr('places');
            var dispplaces = this.finddispplaces();
            if($(this).attr('type')=='single') return '<span class="time s places:'+places+'">'+dispplaces+'</span><br><button class="s start">Start/Stop/Reset</button>';
            if($(this).attr('type')=='double') return '<span class="time d places:'+places+'">'+dispplaces+'</span><br><button class="d start">Start</button><button class="d stop">Stop/Reset</button>';
            // if($(this).attr('type')=='triple') return '<span class="time t places:'+places+'">'+dispplaces+'</span><br><button class="t start">Start</button><button class="t pause">Pause</button><button class="t stop">Stop</button>';

        },
        finddispplaces: function(){
            if($(this).attr('places') == '1') return "0";
            if($(this).attr('places') == '2') return "0.0";
            if($(this).attr('places') == '3') return "0.00";
        }
    },
    events: {
        tap: function(){
            function setid(x){timerdata.id=x;}
            function cleargoing(){timerdata.going='no'};
            function clearid(){timerdata.id='0'};
            function findplacesforset(){
                if(places=='1') return sec;
                if(places=='2') return sec+'.'+secc;
                if(places=='3') return sec+'.'+secc+seccc;
            }
            //the variables
           var places=$(this).children('span').attr('class')[$(this).children('span').attr('class').search('places:')+7];
           var thisis=$(this).attr('is');
           var display=$(this).children('.time');
           var i;
           var type=$(this).children('span').attr('class')[$(this).children('span').attr('class').search('time ')+5];
           var timerdata=Scout3timers[$(this).attr('is')];
           var sec=timerdata.sec;
           var secc=timerdata.secc;
           var seccc=timerdata.seccc;
           if (timerdata.going=='no'){
            timerdata.going = 's';
            if($(this).children('.stop')) $(this).children('.start').prop("disabled",true);
            if($(this).children('.stop')) $(this).children('.stop').prop("disabled",false);
            if($(this).children('.pause')) $(this).children('.pause').prop("disabled",false);


            }
           if (timerdata.going=='yes'){
            clearInterval(timerdata.id);
            if(!$(this).attr('locked')){
                cleargoing();
                if($(this).children('.stop')) $(this).children('.start').prop("disabled",false);
            }
            timerdata.sec=0;
            timerdata.secc=0;
            timerdata.seccc=0;
            sec=0;
            secc=0;
            seccc=0;
            clearid();
            if($(this).children('.stop')) $(this).children('.stop').prop("disabled",true);
            if($(this).children('.pause')) $(this).children('.pause').prop("disabled",true);
           }
           if (timerdata.going=='s'){
             i = setInterval(function(){
                setid(i);
                seccc++;
                if(seccc==10){
                    seccc=0;
                    secc++;
                }
                if(secc==10){
                    secc=0;
                    sec++;
                }
                timerdata.sec=sec;
                timerdata.secc=secc;
                timerdata.seccc=seccc;
                Scout3[thisis]=sec+'.'+secc+seccc;
                display.html(findplacesforset())

            }, 10);
            timerdata.going='yes';
           }
        }
    }
});
//End Tags
//Screen
xtag.register('scout3-screen', {
    lifecycle:{
        created: function(){
            $(this).hide();
            s3checkscreenactive($(this));
        },
        attributeChanged: function(attrName, oldValue, newValue){
            s3checkscreenactive($(this));
        }
    },
});
});