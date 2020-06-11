<template lang="html">
    <div>
        <div id="flash_message" v-if="message">
            <span class="badge badge-success">
                <h3 id="h3_msg" style="margin : 15px;">{{ message }}</h3>
            </span>
        </div>
        <!-- -->
        <router-link :to="'/todos'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" /> 

        <h3>Todos - edit</h3>
        <div class="form-group">
            <label for="TopicTitle">タイトル</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="title" v-model="title" >
            </div>
        </div>
        <div class="form-group">
            <label for="TopicContent">content</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="content" rows="10"
                 v-model="content"></textarea>
            </div>
        </div>
        <button v-on:click="updateTask" class="btn btn-primary">Save</button>
        <hr />
        <div v-if="complete==0">
            <button v-on:click="set_complete(1);" class="btn btn-outline-success" >完了登録</button>
        </div>
        <div v-else>
            <button v-on:click="set_complete(0);" class="btn btn-outline-success" >未完に戻す</button>            
        </div>        
        <hr />
        <button v-on:click="deleteTask" class="btn btn-outline-danger btn-sm">Delete
        </button>
    </div>
</template>

<script>
import axios from 'axios'
import {Mixin} from '../../mixin'

export default {
    mixins:[Mixin],
    created() {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.getItem();
    },
    data() {
        return {
            item : [],
            title:'',
            content:'',
            complete : 0,
            message : '',
            complete_name : '',            
        }
    },
    methods: {
        getItem: function() {
            var item = {
				"id" : this.$route.params.id ,
			}
            var url = this.sysConst.URL_BASE +'/api/cross_todos/get_item'
            axios.post(url  , item).then(res => {
                this.item = res.data;
                this.title = this.item.title
                this.content = this.item.content
                this.complete = this.item.complete
// console.log( this.item )
            })           
        },
        updateTask: function () {
            var task = {
                'id' : this.$route.params.id,
                'title': this.title,
                'content': this.content,
                "complete" : this.complete
            };
            var url = this.sysConst.URL_BASE +'/api/cross_todos/update_todo'
            axios.post(url , task ).then(res => {
                console.log(res.data );
                this.$router.push('/todos')
            });            

        },
        set_complete: function (value) {
            var dat = this.get_sendItem(this.$route.params.id, this.item );
            dat.complete = value
//            console.log( dat  )
            var url = this.sysConst.URL_BASE +'/api/cross_todos/update_todo'
            axios.post(url , dat ).then(res => {
                console.log(res.data );
                this.$router.push('/todos')
            });   

        },
        get_sendItem: function (id, item) {
            var ret = {
                'id' :  id,
                'title': item.title,
                'content': item.content,
                "complete" : item.complete
            };
            return ret;
        },
        deleteTask: function () {
            var task = {
                "id" : this.$route.params.id,
            };            
            var url = this.sysConst.URL_BASE +'/api/cross_todos/delete_todo'
                axios.post(url  ,task).then(res => {
console.log( res.data )
                this.$router.push('/todos')
            })            
        }
    }
}
</script>
