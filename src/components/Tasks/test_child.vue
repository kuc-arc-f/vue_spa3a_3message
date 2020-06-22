<template>
    <div>
        <h1>Tasks- testChild:</h1>
        <hr />
        <!--
        test : {{ message }}
            -->
        <TestTimerChild></TestTimerChild>
    </div>
</template>

<script>
import axios from 'axios'
import {Mixin} from '../../mixin'
import TestTimerChild from '../../components/Element/TestTimerChild'

//
export default {
    mixins:[Mixin],
    components: { TestTimerChild },
    created() {
        this.getTasks()
//console.log( this.sysConst.URL_BASE )
    },
    data() {
        return {
            user : [],
            message : "data: Hello-TestChild-123",
            child_data : "hoge",
            items : [],
        }
    },
    methods: {
        getTasks(){
            var url = this.sysConst.URL_BASE +'/api/test_tasks'
console.log(url)
            axios.get(url).then(res =>  {
                this.tasks = res.data
                this.set_exStorage(this.sysConst.KEY_CHAT_JOIN_ITEMS, this.tasks )
//                console.log(res.data.length )
//console.log( this.tasks )
            })            

        },
    }
}
</script>

