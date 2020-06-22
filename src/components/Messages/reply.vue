<template>
    <div class="panel panel-default" style="padding-top: 10px;">
        <a href="" v-on:click="move_index();"  class="btn btn-outline-primary mt-2">Back
        </a>        
        <hr class="mt-2 mb-2" />    
        <div class="panel-heading">
            <div class="row">
                <div class="col-sm-6">
                    <h3 >Message - Reply</h3>
                </div>
                <div class="col-sm-6">
                </div>
            </div>
            <p>
                Date : {{ item.created_at }} <br />
            </p>
            <hr />
            送信者 : {{ item.user_name }} / {{ item.user_email }} 
            <hr />
            <div class="form-group">
                <label for="TopicTitle">タイトル : </label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" id="title"
                    v-model="title" required="required" />
                </div>
            </div>            
            <div class="form-group">
                <label for="TopicContent">本文 :</label>
                <div class="col-sm-8">
                    <textarea class="form-control" id="content" rows="6"
                        v-model="content"></textarea>
                </div>
            </div>
            <hr />
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-6">
                    <button v-on:click="send_message" class="btn btn-primary mt-2">Save
                    </button>
                </div>
            </div>
        </div>
        <hr />
        <div class="panel-footer">
        </div>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import axios from 'axios'

//
export default {
    mixins:[Mixin],
    created() {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
console.log( "uid=" + this.user_id )        
        this.getItem()
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            editFlg: false,
            updated: false,
            title:'',
            content:'',  
            user_id : 0,          
        }
    },
    methods: {
        getItem: function() {
            var data = {
                "id" :  this.$route.params.id,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_messages/get_message'
//console.log(url)            
            axios.post( url  ,data ).then(res => {
                this.item = res.data;
                this.title = "Re : " + this.item.title
console.log(this.item  );                
            });            
        },
        send_message: function() {
            var data = {
                'user_id' : this.user_id,
                'to_id' : this.item.from_id,
                'title': this.title,
                'content': this.content,
            }; 
console.log(data  );  
            var url =  this.sysConst.URL_BASE +'/api/cross_messages/create_message'
            axios.post( url , data ).then(res => {
                console.log(res.data );
//                this.$router.push('/messages')
                this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/messages' )
                window.location.href = this.sysConst.HTTP_URL
            }); 
        },
        move_index: function(){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/messages' )
            window.location.href = this.sysConst.HTTP_URL
        },                
    }
}
</script>
<!-- -->
<style>
.panel-heading .pre_text{
	border: 1px solid #000;
	background: #EEE;
	padding : 10px;
	font-family: BlinkMacSystemFont,"Segoe UI",Roboto;
	font-size: 1.0rem;
}    
</style>

