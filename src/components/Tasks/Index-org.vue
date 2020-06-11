<template>
    <div>
        <h3>Tasks- Index:</h3>
        <hr class="mt-2 mb-2" />
        <router-link :to="'/tasks/new/'" class="btn btn-primary">Create</router-link>
        <hr class="mt-2 mb-2" />
        <br />
        <ul v-for="task in tasks" v-bind:key="task.id">
            <li>
                <router-link :to="'/tasks/show/' + task.id">{{ task.title }}</router-link>
                &nbsp;&nbsp;
                <router-link :to="'/tasks/edit/' + task.id" class="btn btn-outline-primary btn-sm">Edit
                </router-link>
                <br />
                ID : {{ task.id }}
            </li>
        </ul>        
    </div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
import axios from 'axios'
//
export default {
    mixins:[Mixin],
    created () {
// console.log( this.sysConst.URL_BASE )
        this.getTasks()
    },
    data () {
        return {
        tasks: [],
        database : null
        }
    },
    methods: {
        getTasks () {
            var url = this.sysConst.URL_BASE +'/api/cross_task/get_tasks'
//console.log(url)
            axios.get(url).then(res =>  {
                this.tasks = res.data
//console.log( this.tasks )
            })            
        }
    }
}
</script>
