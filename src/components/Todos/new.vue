<template lang="html">
    <div>
        <router-link :to="'/todos'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>Todos - new</h3>
        <hr class="mt-2 mb-2" />
        <div class="form-group">
            <label for="TopicTitle">タイトル</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="title" v-model="title">
            </div>
        </div>
        <div class="form-group">
            <label for="TopicContent">content</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="content" rows="10" v-model="content"></textarea>
            </div>
        </div>
        <hr />
        <button v-on:click="createTask()" class="btn btn-primary">Save
        </button>    
    </div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
import axios from 'axios'

export default {
    mixins:[Mixin],
    created() {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
console.log( 'new.uid ='+ this.user_id )
    },
    data() {
        return {
            title:'',
            content:'',
            user_id: '',
            baseUrl : '',
        }
    },
    methods: {
        createTask: function() {
            var task = {
                'title': this.title,
                'content': this.content,
                'complete' : 0,
                'user_id' : this.user_id
            };
            var url = this.sysConst.URL_BASE  + "/api/cross_todos/create_todo"
            axios.post( url , task ).then(res => {
                console.log(res.data );
                this.$router.push('/todos')
            });            

        },
    }
}
</script>
