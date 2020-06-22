<template lang="html">
    <div class="task_edit_wrap">
        <router-link :to="'/chats'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>Chat - edit</h3>
        Id: {{ chat.id  }}
        <hr class="mt-2 mb-2" />        
        <div class="form-group">
            <label for="TopicTitle">Name :</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="name" >
            </div>
        </div>
        <div class="form-group">
            <label for="TopicContent">Content :</label>
            <div class="col-sm-8">
                <input type="text" class="form-control"  v-model="content" >
            </div>
        </div>
        <hr />        
        <button v-on:click="updateTask" class="btn btn-primary mt-2">Save
        </button>
        <hr />
        <button v-on:click="deleteTask" class="btn btn-outline-danger btn-sm mt-2">Delete
        </button>
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
        this.getItem();                    
    },
    data() {
        return {
            name :'',
            content:'',
            chat_id : this.$route.params.id,
            chat : { 'name' : "", 'id' : 0 },
        }
    },
    methods: {
        getItem: function() {
            var item = {
                    'chat_id': this.chat_id,
                    'user_id': this.user_id,
                };             
            var url = this.sysConst.URL_BASE +'/api/cross_chats/get_member_info'
//console.log(url)            
            axios.post( url  ,item).then(res => {
                this.chat = res.data.chat;
                this.name = this.chat.name;
                this.content = this.chat.content;
// console.log(res.data.chat );                
            });            
        },
        updateTask: function () {
            var item = {
                "id" :  this.$route.params.id,
                'name': this.name,
                'content': this.content
            };
            var url = this.sysConst.URL_BASE +'/api/cross_chats/update_chat'
// console.log(url)            
            axios.post(url , item).then(res => {
                console.log(res.data);
                var arr=[ {message : 'Success , save complete'} ]
                this.set_exStorage( this.sysConst.STORAGE_KEY_flash, arr )
                this.$router.push('/chats')
            });            
        },
        deleteTask: function () {
            var item = {
                "id" : this.$route.params.id,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_chats/delete_chat'
            axios.post(url , item).then(res => {
                console.log(res.data);
                var arr=[ {message : 'Success , delete complete'} ]
                this.set_exStorage( this.sysConst.STORAGE_KEY_flash, arr )

                this.$router.push('/chats')
            });
            
        }
    }
}
</script>
