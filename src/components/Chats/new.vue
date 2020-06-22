<template lang="html">
    <div class="task_create_wrap">
            <router-link :to="'/chats'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <hr class="mt-2 mb-2" />
            <div class="form-group">
                <label for="TopicTitle">Title : </label>
                <div class="col-sm-6">
                    <input type="text" class="form-control"
                    v-model="name" required="required" />
                </div>
            </div>
            <div class="form-group">
                <label for="TopicContent">Content :</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="title"
                    v-model="content" required="required" />                    
                </div>
            </div>
            <hr />
            <button v-on:click="createChat" class="btn btn-primary mt-2">Save
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
// console.log( this.sysConst.URL_BASE )
    },
    data() {
        return {
            name :'',
            content:'',
            user_id : 0,
        }
    },
    methods: {
        createChat: function() {
            var url =  this.sysConst.URL_BASE +'/api/cross_chats/create_chat'
// console.log(url)            
            var task = {
                'user_id' : this.user_id,
                'name': this.name,
                'content': this.content,
            };   
            axios.post( url , task ).then(res => {
                console.log(res.data );
                var arr=[ {message : 'Success , save complete'} ]
                this.set_exStorage( this.sysConst.STORAGE_KEY_flash, arr )                
                this.$router.push('/chats')
            });                     
        },
    }
}
</script>
