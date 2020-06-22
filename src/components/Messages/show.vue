<template>
    <div class="panel panel-default" style="padding-top: 10px;">
        <a href="" v-on:click="move_index();"  class="btn btn-outline-primary mt-2">Back
        </a>         
        <hr class="mt-2 mb-2" />    
        <div class="panel-heading">
            <div class="row">
                <div class="col-sm-6">
                    <h3 >{{ item.title }} </h3>
                </div>
                <div class="col-sm-6">
                    <router-link :to="'/messages/reply/' + item.id"
                    class="btn btn-primary btn-sm"><i class="fas fa-reply"></i> Reply
                    </router-link>
                    &nbsp;&nbsp;
                    <a v-bind:href="url_export" class="btn btn-outline-primary btn-sm">
                        <i class="fas fa-download"></i> &nbsp;export
                    </a>
                </div>
            </div>
            <p>
                Date : {{ item.created_at }} <br />
                from : {{ item.user_name }} / {{ item.user_email }}<br />
                ID : {{ item.id }} <br />
            </p>
            <div class="col-sm-8">
                <pre class="pre_text">{{ item.content }}</pre>
            </div>        
        </div>
        <hr />
        <div class="panel-footer">
            <router-link :to="'/messages/reply/' + item.id"
            class="btn btn-primary btn-sm"><i class="fas fa-reply"></i> Reply
            </router-link>
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
        this.URL_BASE = this.sysConst.URL_BASE;
        this.url_export = this.URL_BASE + "/api/cross_messages/export?id=" + this.$route.params.id;
//console.log( this.url_export )
        this.getItem()
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            editFlg: false,
            updated: false,
            URL_BASE : "",
            url_export : "",
        }
    },
    methods: {
        getItem: function() {
            var data = {
                "id" :  this.$route.params.id,
            };
            var url = this.sysConst.URL_BASE +'/api/cross_messages/get_message'
//console.log(url)            
            axios.post( url  ,data ).then(res => {
                this.item = res.data;
// console.log(this.item.id  );                
            });            
        },
        move_index: function(){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/messages' )
            window.location.href = this.sysConst.HTTP_URL
        },        
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

