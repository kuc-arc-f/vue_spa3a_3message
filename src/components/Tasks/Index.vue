<template>
    <div class="task_index_wrap">
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
        <hr />
        <div class="page_info_wrap">
            <ul>
                <li>このページの機能は、オープンソースで公開しております。<br />
                    <a  href='https://github.com/kuc-arc-f/vue_spa3a'>https://github.com/kuc-arc-f/vue_spa3a
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href='https://knaka0209.hatenablog.com/entry/lara58_28cross_vue'>
                        https://knaka0209.hatenablog.com/entry/lara58_28cross_vue
                    </a><br />
                </li>
            </ul>
        </div>        
    </div>
</template>

<!-- -->
<style> 
.page_info_wrap{
    background: #EEE;
    padding : 10px;
    margin-top : 20px;
}
</style>
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
