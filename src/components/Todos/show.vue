<template>
    <div>
        <router-link :to="'/todos'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h1>{{ item.title }}</h1>
        <p style="margin-bottom: 20px;">Date: {{ item.created_at }}</p>
        <hr />
        <div id="post_item" v-html="item.content"></div>
    </div>
</template>

<script>
import axios from 'axios'
import marked from  'marked'
import {Mixin} from '../../mixin'

export default {
    mixins:[Mixin],
    created() {
        this.getItem()
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            editFlg: false,
            updated: false,
            baseUrl : '',
        }
    },
    mounted: function() {
    },
    methods: {
        getItem: function() {
            var item = {
				"id" : this.$route.params.id ,
			}
            var url = this.sysConst.URL_BASE +'/api/cross_todos/get_item'
            axios.post(url  , item).then(res => {
                this.item = res.data;
                this.item.content = marked(this.item.content)
//console.log( this.item )
            })
        },
    }
}
</script>
<!-- -->
<style>
/* div#post_item > h3{ color :gray; } */
div#post_item > p > img{
    max-width : 100%;
    height : auto;
}
div#post_item > hr {
  height: 1px;
  background-color: #000;
  border: none;
}
</style>


