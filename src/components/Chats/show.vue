<template>
<div class="row">
    <div class="col-sm-3">
        <ChatLeftArea />
    </div>
    <div class="col-sm-9">
        <FlashMessage></FlashMessage>
        <div id="app">
            <div class="row" style="margin-top: 10px;">
                <div class="col-sm-6">
                    <h3>{{ chat.name }} </h3>
                    <p class="mb-2">ID : {{ chat.id }} </p>
                </div>
                <div class="col-sm-3 pt-2" style="text-align: center; ">
                    <a href="" v-on:click="move_show(chat_id);"
                        class="btn btn-outline-primary">
                        <i class="fas fa-redo-alt"></i> Load
                    </a>							
                </div>                
            </div>
            <hr class="mt-2 mb-2" />        
            <!-- input_area -->
            <div class="input_area_wrap" style="text-align: center;">
                <div class="row">
                    <div class="col-sm-6" style="text-align: right;">
                        <!--  mb-0 -->
                        <textarea v-model="message" class="form-control mt-0"
                        style="padding :12px; 0px;"
                        rows="3" cols="40" id="send_text"
                        v-on:click="input_active();"
                        placeholder="please Input" required="required"></textarea>                        
                    </div>
                    <div class="col-sm-6" style="text-align: left;">
                        <button @click="addItem" id="send_button" class="btn btn-primary"
                        data-toggle="tooltip" title="send post">Post
                        </button>                        
                    </div>
                </div>
            </div>
            <hr class="mt-2 mb-2">	
            <!-- post-list -->
            <ul class="ul_post_box" style="list-style: none;">
            <li v-for="task in tasks" v-bind:key="task.id">
                <div v-bind:class="'post_item'+' '+ task.item_bg"
                    v-on:click="open_modal(task.id)">
                    <div class="col_name">
                        <div class="post_user_wrap">
                            <span style="font-size: 42px; float: left; padding: 0px;">
                                <div v-if="task.is_other">
                                    <i class="far fa-meh"></i>	
                                </div>
                                <div v-else style="color: #616161;  padding: 0px;">
                                    <i class="fas fa-meh" style="margin: 0px;"></i>
                                </div>
                            </span>
                            <div class="time_box pl-1" >
                                <p class="mb-0">
                                    {{ task.user_name }}:<br /> 
                                    {{ task.date_str }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col_body">
                        <p class="li_p_box mb-0" v-html="task.body">
                        </p>							 
                    </div>
                </div>
            </li>                
            </ul>            
        </div>
        <!-- -->    
        <div class="token_wrap" style="display: none;">
            <p>
                title:
                <input type="text" value="title-123" id="send_title">
            </p>
            <hr />
            <p>
                IID_TOKEN:
                <input type="text" value="YOUR-INCETANCE-ID-TOKEN" id="textInstanceIdToken"
                style="width:100%;box-sizing:border-box;">
            </p>
        </div>  
        <!-- modal -->	
        <div class="modal fade" id="modal1" tabindex="-1"
            role="dialog" aria-labelledby="label1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="label1">
                        {{ modal_item.user_name }} : {{ modal_item.date_str }}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ID: {{modal_item.id}}
                    <pre class="modal_body_text" v-html="modal_item.body_org"></pre>
                    <div v-if="delete_ok">
                        <hr />
                        <span style="font-size: 24px; color: #f44336;" class="pl-2">
                            <i v-on:click="open_delete(modal_item.id)" class="far fa-trash-alt"></i>
                        </span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div><!-- modal-content -->
            </div><!-- modal-dialog -->
        </div><!-- modal -->

        <!-- -->
        <div class="time_text_wrap" style="display: none;">
            watch-test:
            <input type="text" id="chat_time_text" value="" />
            <br />
            <br />
            <br />
        </div>        
    </div>
</div>
</template>

<!-- -->
<style>
.ul_post_box .bg_gray{	background: #EEE; }
.modal_body_text{
    border: 1px solid #000;
    background: #EEE;
    padding : 10px;
    font-family: BlinkMacSystemFont,"Segoe UI",Roboto;
    font-size: 1.0rem;    
}
.post_item{
    display:flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #000;
    margin : 0px;
}
.post_item .col_name{
    padding : 0px 8px;
    width : 180px;
}
.li_p_box{
    padding : 10px;
}
.time_box{
    margin-left : 52px;
    padding: 8px;
    color: gray;
    font-size: 0.875rem;
}
.hr_post_bottom{
    height: 10px;
    width : 100%;
    background-color: #000;
    border: none;	
}
/* input */
#send_button{	margin : 30px 10px;	}
</style>
<!-- -->
<script>
import {Mixin} from '../../mixin'
import axios from 'axios'
import $ from 'jquery'
import ChatLeftArea from '../../components/Element/ChatLeftArea'
import FlashMessage from '../../components/Layouts/FlashMessage'

//init
var TIME_TEXT_STR = "";
//
export default {
    mixins:[Mixin],
    components: { ChatLeftArea ,FlashMessage },
    created() {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
console.log( "uid=" + this.user_id ) 
        this.fcm_init()               
    },
    data: function( ) {
        return {
            user_id : 0,
            chat_id : this.$route.params.id,
            chat : { 'name' : "", 'id' : 0 },
            message : "",
            posts : [],
            tasks : [],
            modal_item : [],
            editFlg: false,
            updated: false,
            messaging : null,
            CHAT_MEMBER_ID : 0,
            CHAT_MEMBERS : null,
            timerObj : null,
            delete_ok : 0,
        }
    },
    methods: {
        fcm_init: function(){
            this.messaging = window.fcm_init_proc( 
                this.sysConst.messagingSenderId , this.sysConst.FCM_PublicVapidKey 
            );
            var item = {
                    'chat_id': this.chat_id,
                    'user_id': this.user_id,
                }; 
            var url = this.sysConst.URL_BASE +'/api/cross_chats/get_member_info'
            var post_url = this.sysConst.URL_BASE +'/api/cross_chats/update_token'
            axios.post(url , item ).then(res => {
                var data = res.data;
//console.log(res.data.join_chats );
                this.tasks = this.convert_post_data( res.data.chat_posts )
                this.chat = res.data.chat; 
                this.CHAT_MEMBER_ID = data.chat_member.id
                this.CHAT_MEMBERS = data.chat_members;
                this.set_exStorage(this.sysConst.KEY_CHAT_JOIN_ITEMS, res.data.join_chats )
                window.fcm_get_token(this.messaging, this.CHAT_MEMBER_ID, post_url);
                window.fcm_onMessage(this.messaging,  this.CHAT_MEMBER_ID )
                window.set_time_text();
                TIME_TEXT_STR = $("input#chat_time_text").val();
                this.timer_start();
            });
        },
        input_active() {
            $("#send_text").css('height','200px');
        },        
        addItem() {
            console.log(this.message );
            if(this.message !=''){
                this.update_post(this.message , this.chat_id , this.user_id);
                $("#send_text").css('height','90px');
            }else{
                alert("text input, require..");
            }
            this.message='';
        },   
        update_post(body, CHAT_ID ,USER_ID){
            var item = {
                    'chat_id': CHAT_ID,
                    'user_id': USER_ID,
                    'body': body,
                };
                var url = this.sysConst.URL_BASE +'/api/cross_chats/update_post'
                axios.post(url , item ).then(res => {
console.log(res.data );
                    window.set_time_text();
                    window.fcm_send_member(
                        this.CHAT_MEMBERS,
                        this.chat_id,
                        body, 
                        this.sysConst.FCM_SERVER_KEY 
                    );
                });
        },         
        convert_post_data: function(items){
            var new_items = [];
            var user_id = this.user_id
            items.forEach(function(item){
                if(item.user_id == user_id ){
                    item.is_other = 0;
                    item.item_bg = 'bg_gray';
                }else{
                    item.is_other = 1;
                    item.item_bg = '';
                }
                new_items.push(item);
            });  
            return new_items          
        },   
        get_posts() {
            var url = this.sysConst.URL_BASE +'/api/cross_chats/get_post?cid='+ this.chat_id
            axios.get(url ).then(res =>  {
                var items = res.data;
//console.log( items  )
                var new_items = this.convert_post_data( items )
                this.tasks  = new_items;
//                this.timer_start();
            })            
        },
		count: function() {
            var chk_time = $("input#chat_time_text").val();
//console.log(TIME_TEXT_STR );
//console.log( "chk=" + chk_time);
            if(
                TIME_TEXT_STR != chk_time
                && chk_time != null
            ){
				console.log( "#change_time");
				this.get_posts();
				TIME_TEXT_STR = $("input#chat_time_text").val();
			}
        },
		timer_start: function() {
            var self = this;
            this.timerObj = null;
			this.timerObj = setInterval(function() {self.count()}, 3000)
        },
		open_modal: function(id) {
console.log("open_modal : " + id );
			var item = this.get_modal_data(id, this.tasks );
            this.modal_item = item;
			this.delete_ok = 0;
			if(item.user_id == this.user_id ){
				this.delete_ok = 1;
            }
            window.chat_modal_open()
        },
		get_modal_data(id, items ) {
			var ret = null;
			items.forEach(function(item){
				if(item.id == id){
					ret = item;
				}
				//console.log(item.id);
			});
			return ret;
        },
		open_delete: function(id) {
			var item = {
                'id': id,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_chats/delete_post'
            axios.post(url  , item ).then(res => {
                console.log(res.data );
                var arr=[ {message : 'Success , delete complete'} ]
                this.set_exStorage( this.sysConst.STORAGE_KEY_flash, arr )
                this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/chats/show/' + this.chat_id )
                window.location.href = this.sysConst.HTTP_URL                
            });			
		}, 
        move_show: function(id){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/chats/show/' + id )
            window.location.href = this.sysConst.HTTP_URL                
        },       
    }
}
</script>


