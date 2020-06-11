<template>
    <div>
        <h3>Todos - Index:</h3>        
        <hr class="mt-2 mb-2" />
        <router-link :to="'/todos/new/'" class="btn btn-primary">Create
        </router-link><br />
        <hr class="mt-2 mb-2" />
        <div v-if="complete==0">
            <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active">未完</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-on:click="set_complete(1)">完了済</a>
            </li>
            </ul>
        </div>
        <div v-else>
            <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" v-on:click="set_complete(0)">未完</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active">完了済</a>
            </li>
            </ul>              
        </div>        
        <!-- -->
        <table class="table">
        <thead>
        <tr>
            <!--             <th scope="col">id</th> 
            <th scope="col">date</th>
            <th scope="col">action</th>
            -->
            <th scope="col">title</th>
        </tr>
        </thead>
        <tbody v-for="todo in todos" v-bind:key="todo.id">
        <tr>
            <td>{{ todo.id }}</td>
            <td>
                <h3>
                <router-link :to="'/todos/show/' + todo.id">{{ todo.title }}</router-link>
                </h3>
                {{ todo.date_str }} , ID : {{ todo.id }}
                 &nbsp; &nbsp;
                <router-link :to="'/todos/edit/' + todo.id"
                    class="btn btn-outline-primary btn-sm">Edit
                </router-link>                
            </td>
            <td>{{ todo.date_str }}</td>
            <td>
                &nbsp;
                <router-link :to="'/todos/edit/' + todo.id"
                 class="btn btn-outline-primary btn-sm">Edit
                </router-link>
            </td>
        </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import {Mixin} from '../../mixin'

//
export default {
    mixins:[Mixin],
    created () {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
console.log( "uid=" + this.user_id )
        this.getTasks(0)
    },
    data () {
        return {
            blogs: [],
            todos: [],
            user_id : '',
            baseUrl : '',
            complete : 0,
        }
    },
    methods: {
        getTasks(complete) {
            console.log(complete)
            var item = {
                'user_id': this.user_id,
                'complete': complete,
            }; 
            var url = this.sysConst.URL_BASE +'/api/cross_todos/get_items'
console.log(url )
            axios.post(url ,item ).then(res =>  {
                this.todos = res.data
console.log( this.todos)
                /*
                var items =res.data.docs
                items.forEach( function (item) {
                    if(item.complete == complete ){
                        var dt = item.up_date
                        var s = new String(dt)                        
                        item.date_str = s.substring(0, 10)
                        todos.push(item)
                        console.log(s)
                    }                    
                });
                this.blogs = todos
                */
            })            
        },
        set_complete(value) {
            console.log(value)
            this.complete = value
            this.getTasks(value)
        }    
    }
}
</script>
<!-- -->
<style>
</style>
