<template>
    <div>
        <h1>tasks- test:</h1>
        <hr />
        test : {{ message }}
    </div>
</template>

<script>
import axios from 'axios'
import {Mixin} from '../../mixin'
//
export default {
    mixins:[Mixin],
    created() {
//console.log( this.sysConst.URL_BASE )
        this.getTasks();
//            console.log( exStorage.load( sysConst.STORAGE_KEY_flash ) )
//            userState.check()
//            console.log(this.user)
//          myStorage.load()
//            myStorage.remove()
    },
    data() {
        return {
            user : [],
            message :''
        }
    },
    methods: {
        getTasks(){
            var url = this.sysConst.URL_BASE +'/api/test_tasks'
console.log(url)
            axios.get(url).then(res =>  {
                this.tasks = res.data
//                console.log(res.data.length )
console.log( this.tasks )
            })            

        },
    }
}
</script>

