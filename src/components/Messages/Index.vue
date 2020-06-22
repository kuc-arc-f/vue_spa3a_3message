<template>
    <div class="task_index_wrap">
        <div class="row" style="margin-top: 10px; ">
            <div class="col-sm-4"><h3>Messages</h3>
            </div>
            <div class="col-sm-4">
                <router-link :to="'/messages/new/'" class="btn btn-primary">Create</router-link>
            </div>
            <div class="col-sm-4" style="padding-top: 8px; ">
                 <button v-on:click="proc_reload()" 
                 class="btn btn-outline-primary btn-sm" style="float :left;">
                     <i class="fas fa-redo-alt"></i> Reload
                 </button>
                <span class="search_btn_wrap">
                    <button  class="btn btn-sm btn-outline-primary serach_display_btn mb-0"
                    style="margin-left : 10px;">
                        <i class="fas fa-arrow-down serach_display_btn"></i>&nbsp;Search
                    </button>                 
                </span>
            </div>
        </div>
        <hr class="mt-2 mb-2" />
		<div class="search_wrap mt-2" style="display: none; ">
			<div class="row  mb-0" >            
				<div class="col-sm-4">
					<input type="text" class="form-control" placeholder="title"
					v-model="search_key">
				</div>
				<div class="col-sm-4">
					<input type="text" class="form-control" placeholder="mail"
					v-model="search_mail">
				</div>				
				<div class="col-sm-4">
					<a href="#" class="btn btn-primary btn-sm"
					v-on:click="searchTasks()" >Search Go
					</a>
				</div>
			</div>		
			<hr class="mb-2 mt-2" />
		</div>        

        <!-- tab_mode -->
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" id="nav_receive_tab" v-on:click="change_type(1)">
                    Receive
                </a>
            </li>
            <li class="nav-item">
                <!-- href="#" -->
                <a  class="nav-link" id="nav_sent_tab" v-on:click="change_type(2)">
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
                    <a  href='https://github.com/kuc-arc-f/vue_spa3a_3message'>
                        https://github.com/kuc-arc-f/vue_spa3a_3message
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href='https://knaka0209.hatenablog.com/entry/lara58_30cross_message'>
                        https://knaka0209.hatenablog.com/entry/lara58_30cross_message
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
	});	 
 }
 //timer
var timer_func = function(){
    set_time_text();
};

// notification - check
window.valid_notification();
$(function(){
	$( '.serach_display_btn' ).click( function() {
		$('.search_wrap').css('display','inherit');
	});
});
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
//        var TIMER_SEC = 1000 * 30;
        setInterval(timer_func, TIMER_SEC );        
        this.get_items()
        this.timerObj = null;
        TIME_TEXT_STR = 0;
        this.timer_start()
    },
    data () {
        return {
            items : [],
            database : null,
            user_id : 0,
            mode : MODE_RECEIVE,
            timerObj : null,
            search_key : "",
            search_mail : "",            
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
                set_time_text();
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
                $('.search_btn_wrap').css('display','inherit');		
			}else{
				$('#nav_sent_tab').addClass('active');
				$('#nav_receive_tab').removeClass('active');
                this.get_sent_item();
                $('.search_wrap').css('display','none');
                $('.search_btn_wrap').css('display','none');
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
                && (parseFloat(chk_time) > 0 )
            ){
//console.log( "#change_time");
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
        proc_reload: function(){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/messages' )
            window.location.href = this.sysConst.HTTP_URL
        },
        searchTasks(){
            var data = {
                'search_key': this.search_key,
				'user_id': this.user_id,
				'search_mail' : this.search_mail,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_messages/search'
            axios.post(url , data ).then(res => {
// console.log(res.data );
                this.items = res.data
            });
        },        
    }
}
</script>
