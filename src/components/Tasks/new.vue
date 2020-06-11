<template lang="html">
    <div class="task_create_wrap">
            <router-link :to="'/tasks'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <hr class="mt-2 mb-2" />
            <div class="form-group">
                <label for="TopicTitle">Title : </label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" id="title"
                    v-model="title" required="required" />
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
            <button v-on:click="createTask" class="btn btn-primary mt-2">Save
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
// console.log( this.sysConst.URL_BASE )
    },
    data() {
        return {
            title:'',
            content:'',
            database : null
        }
    },
    methods: {
        createTask: function() {
            var url =  this.sysConst.URL_BASE +'/api/cross_task/create_task'
// console.log(url)            
            var task = {
                'title': this.title,
                'content': this.content,
            };   
            axios.post( url , task ).then(res => {
                console.log(res.data );
                this.$router.push('/tasks')
            });                     
        },
    }
}
</script>
