<template>
    <div>
        <router-link :to="'/tasks'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>title : {{ item.title }}</h3>
        <div v-text="item.content"></div>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import axios from 'axios'

//
export default {
    mixins:[Mixin],
    created() {
console.log( this.sysConst.URL_BASE )
        this.getItem()
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            editFlg: false,
            updated: false,
        }
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
console.log(this.item  );                
                console.log(res.data.id );
            });            
        },
    }
}
</script>


