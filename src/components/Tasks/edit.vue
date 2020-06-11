<template lang="html">
    <div class="task_edit_wrap">
        <router-link :to="'/tasks'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <div class="form-group">
            <label for="TopicTitle">Title :</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="title" v-model="title" >
            </div>
        </div>
        <div class="form-group">
            <label for="TopicContent">Content :</label>
            <div class="col-sm-6">
                <textarea class="form-control" id="content" rows="3"
                v-model="content"></textarea>
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

export default {
    mixins:[Mixin],
    created() {
        //console.log( this.sysConst.URL_BASE )
    },
    data() {
        return {
            title:'',
            content:''
        }
    },
    mounted: function() {
        this.getItem();
    },
    methods: {
        getItem: function() {
            var task = {
                "id" :  this.$route.params.id,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_task/get_item'
//console.log(url)            
            axios.post( url  ,task).then(res => {
                this.item = res.data;
                this.title = this.item.title;
                this.content = this.item.content;
// console.log(this.item  );                
            });            
        },
        updateTask: function () {
            var task = {
                "id" :  this.$route.params.id,
                'title': this.title,
                'content': this.content
            };
            var url = this.sysConst.URL_BASE +'/api/cross_task/update_post'
// console.log(url)            
            axios.post(url ,task).then(res => {
                console.log(res.data.id );
                console.log(res.data.title);
                console.log(res.data.content);
                this.$router.push('/tasks')
            });            
        },
        deleteTask: function () {
            var task = {
                "id" : this.$route.params.id,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_task/delete_task'
            axios.post(url ,task).then(res => {
                console.log(res.data.id );
                this.$router.push('/tasks')
            });
            
        }
    }
}
</script>
