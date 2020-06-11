<template lang="html">
    <div class="task_create_wrap">
        <router-link :to="'/messages'" class="btn btn-outline-primary mt-2">Back
        </router-link><br />
        <h3 class="" style="margin-top: 8px;">Message - 新規作成</h3>
        <hr class="mt-2 mb-2" />
        <div class="form-group">
            <div class="col-sm-12">
                <p class="mb-2">mail : <span style="color: green;">送信先を検索下さい。</span></p> 
                <div class="mail_item">
                    <div class="col_mail_text col-sm-6">
                        <input type="email" class="form-control" id="title" v-model="mail"
                        placeholder="hoge@aaa.com" />
                    </div>
                    <div class="col_search_btn">
                        <button class="btn btn-outline-primary btn-sm"
                         v-on:click="search_user">Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- user_result -->
        <div class="form-group">
            <div class="sent_user_wrap" style="display:none;">
                <hr class="mt-2 mb-2" />
                送信先 :
                <div class="col-sm-8">
                    {{user.name}} / {{user.email}} <br />
                </div>
            </div>
        </div>
        <hr class="mt-2 mb-2" />
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
            <div class="col-sm-offset-3 col-sm-6 sumit_btn">
                <button v-on:click="createTask" class="btn btn-primary mt-2">Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import axios from 'axios'
import $ from 'jquery'

//
export default {
    mixins:[Mixin],
    created() {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
console.log( "uid=" + this.user_id )                
    },
    data() {
        return {
            mail : "",
            user : { "name" : "", "email" : "" },
            title:'',
            content:'',
            database : null
        }
    },
    methods: {
        createTask: function() {
            var data = {
                'user_id' : this.user_id,
                'to_id' : this.user.id,
                'title': this.title,
                'content': this.content,
            };   
            var url =  this.sysConst.URL_BASE +'/api/cross_messages/create_message'
            axios.post( url , data ).then(res => {
                console.log(res.data );
                this.$router.push('/messages')
            }); 
        },
		search_user(){
console.log(this.mail );
		var data = {
				'mail': this.mail,
            };           
            var url =  this.sysConst.URL_BASE +'/api/cross_messages/get_user'
			axios.post(url , data).then(res =>  {
				this.user = res.data
console.log(this.user );
				if(this.user.id != null){
//console.log(this.user.id);
					$("#to_id").val(this.user.id);
					$('.sumit_btn').css('display','inherit');
					$('.sent_user_wrap').css('display','inherit');
				}else{
					alert("nothig user, for mail");
				}
			});
		},        
    }
}
</script>
<!-- -->
<style>
.sumit_btn{ display: none}
/* mail_search */
.mail_item{
	display:flex;
	flex-wrap: wrap;
}

</style>