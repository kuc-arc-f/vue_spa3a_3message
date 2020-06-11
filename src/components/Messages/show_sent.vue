<template>
    <div class="panel panel-default" style="padding-top: 10px;">
        <router-link :to="'/messages'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />  
        <p>Sent > Show </p>  
        <div class="panel-heading">
            <div class="row">
                <div class="col-sm-6">
                    <h3 >{{ item.title }} </h3>
                </div>
                <div class="col-sm-6">
                </div>
            </div>
            <p>
                Date : {{ item.created_at }} <br />
                ID : {{ item.id }} <br />
            </p>
            <div class="col-sm-8">
                <pre class="pre_text">{{ item.content }}</pre>
            </div>        
        </div>
        <hr />
        <div class="panel-footer">
            <button  v-on:click="delete_item"
             class="btn btn-outline-danger btn-sm mt-2">Delete
            </button>
        </div>
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
            var data = {
                "id" :  this.$route.params.id,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_messages/get_sent_message'
//console.log(url)            
            axios.post( url  ,data ).then(res => {
                this.item = res.data;
console.log(this.item  );                
            });            
        },
        delete_item: function() {
            var data = {
                "id" :  this.$route.params.id,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_messages/delete_message'
            axios.post( url  ,data ).then(res => {
                this.item = res.data;
//console.log(this.item  );    
                this.$router.push('/messages')            
            });            
        }
    }
}
</script>
<!-- -->
<style>
.panel-heading .pre_text{
	border: 1px solid #000;
	background: #EEE;
	padding : 10px;
	font-family: BlinkMacSystemFont,"Segoe UI",Roboto;
	font-size: 1.0rem;
}    
</style>

