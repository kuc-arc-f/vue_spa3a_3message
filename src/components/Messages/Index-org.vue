<template>
    <div class="task_index_wrap">
        <h3>Messages- Index:</h3>
        <hr class="mt-2 mb-2" />
        <router-link :to="'/messages/new/'" class="btn btn-primary">Create</router-link>
        <hr class="mt-2 mb-2" />
        <br />
        <!-- tab_mode -->
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a href="#" class="nav-link active" id="nav_receive_tab" v-on:click="change_type(1)">
                    Receive
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" id="nav_sent_tab" v-on:click="change_type(2)">
                    Sent
                </a>
            </li>
        </ul>        
        <ul v-for="item in items" v-bind:key="item.id"
         class="ul_post_box" style="list-style: none;">
            <li>
                <div class="title_wrap">
                    <span v-if="item.status==1" >
                        <i class="far fa-envelope"></i>
                    </span>
                    &nbsp;&nbsp;                    
                    <span v-if="mode==1">
                        <router-link :to="'/messages/show/' + item.id">{{ item.title }}
                        </router-link>
                    </span>
                    <span v-else>
                        <router-link :to="'/messages/show_sent/' + item.id">{{ item.title }}
                        </router-link>
                    </span>

                    <br />
                    <!-- date -->
                    <span class="date_str" style="margin-top:0px;">{{ item.date_str }}
                    </span>
                    <span class="date_str">
                        , ID : {{ item.id }}
                    </span>
                </div>
            </li>
        </ul>
        <!-- -->
        <div class="time_text_wrap" style="display: none;">
            watch :
            <input type="text" id="time_text" value="0" />
            <input type="text" id="message_title" value="" />
        </div>        
        <hr />
        <div class="page_info_wrap">
            <ul>
                <li>このページの機能は、オープンソースで公開しております。<br />
                    <a  href=' '>
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href=' '>
                    </a><br />
                </li>
            </ul>
        </div>        
    </div>
</template>

<!-- -->
<style> 
.page_info_wrap{
    background: #EEE;
    padding : 10px;
    margin-top : 20px;
}
.ul_post_box .date_str{ font-size: 0.84rem; }
.ul_post_box .title_wrap{
	font-size: 1.32rem;
	border-bottom: 1px solid #000; 
	margin-top: 8px;
}
</style>
<!-- -->
<script>
import {Mixin} from '../../mixin'
import axios from 'axios'
import $ from 'jquery'

var USER_ID = 0;
var URL_BASE ="";
var TIME_TEXT_STR = 0;
var MODE_RECEIVE = 1;
var MODE_SENT = 2;
/**********************************************
 *
 *********************************************/    
 function set_time_text(){
	var data = {
				'user_id': USER_ID,
				'type': 1,
            };           
    var url = URL_BASE + "/api/cross_messages/get_last_item"
	axios.post(url , data).then(res =>  {
		var item = res.data
		if(item.id != null){
			$("input#time_text").val( item.id );
            $("input#message_title").val( item.title );
            //TIME_TEXT_STR = $("input#time_text").val();
		}else{
			$("input#time_text").val( 0 );
		}
//console.log( item );
//console.log( TIME_TEXT_STR );
	});	 
 }
 //timer
var timer_func = function(){
    set_time_text();
};

// notification - check
window.valid_notification();
//
export default {
    mixins:[Mixin],
    created () {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
        USER_ID = this.user_id;
        URL_BASE = this.sysConst.URL_BASE;
console.log( "uid=" + this.user_id )       
        var TIMER_SEC = 1000 * 600;
        //var TIMER_SEC = 1000 * 30;
        setInterval(timer_func, TIMER_SEC );

        set_time_text();
        this.get_items()
        this.timer_start()
    },
    data () {
        return {
            items : [],
            database : null,
            user_id : 0,
            mode : MODE_RECEIVE,
            timerObj : null,
        }
    },
    methods: {
        get_items () {
			var data = {
				'user_id': this.user_id,
				'type': 1,
            };        
            var url = this.sysConst.URL_BASE +'/api/cross_messages/get_item'
//console.log(url)
            axios.post(url, data).then(res =>  {
                this.items = res.data
                this.mode = MODE_RECEIVE;
//console.log( res.data )
            })            
        },
		get_sent_item: function() {
			var data = {
				'user_id': this.user_id,
				'type': 1,
            };           
            var url = this.sysConst.URL_BASE +'/api/cross_messages/get_sent_item'
			axios.post(url , data).then(res =>  {
				this.items = res.data
//console.log(res.data );
				this.mode = MODE_SENT;
			});
		},        
		change_type: function(type) {
 //console.log(type );
			if(type == MODE_RECEIVE){
				$('#nav_receive_tab').addClass('active');
				$('#nav_sent_tab').removeClass('active');	
				this.get_items();			
			}else{
				$('#nav_sent_tab').addClass('active');
				$('#nav_receive_tab').removeClass('active');
				this.get_sent_item();
			}
        },
		count: function() {
			var chk_time = $("input#time_text").val();
            if(parseFloat(TIME_TEXT_STR) == 0){
                TIME_TEXT_STR = $("input#time_text").val();
            }
//console.log("ct=" + TIME_TEXT_STR );
//console.log( "ct.chk=" + chk_time);
            if( 
                parseFloat(TIME_TEXT_STR) != parseFloat(chk_time) 
                && chk_time != null
            ){
//console.log( "#change_time");
//console.log( "mode=" + this.mode );
                if( this.mode == MODE_RECEIVE ){
                    var msg = $("input#message_title").val();
                    window.display_notification("Recive Message", msg );
                    this.get_items()
					TIME_TEXT_STR = $("input#time_text").val();
				}
			}
        },
		timer_start: function() {
			var self = this;
			this.timerObj = null;
			this.timerObj = setInterval(function() {self.count()}, 10000)
		},        

    }
}
</script>
