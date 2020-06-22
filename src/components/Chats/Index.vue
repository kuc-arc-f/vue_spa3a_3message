<template>
<div class="row">
    <div class="col-sm-3">
        <ChatLeftArea></ChatLeftArea>
    </div>
    <div class="col-sm-9">
        <FlashMessage></FlashMessage>
        <router-link :to="'/chats/new/'" class="btn btn-primary mt-2">Create
        </router-link>
        <table class="table table-striped chat-table mt-2">
            <thead>
                <th>Name</th>
                <th>Join</th>                
            </thead>
            <tbody>
                <tr v-for="chat in chats" v-bind:key="chat.id">
                    <td class="table-text">
                        <p class="p_tbl_chat_name mb-0">
                            <span v-if="chat.valid_join">
                                <a href="" v-on:click="proc_next(chat.id);">{{ chat.name }}
                                </a>                                                      
                            </span>
                            <span v-else>{{ chat.name }}
                            </span>
                        </p> 
                        <span>
                            ID : {{ chat.id }}
                            &nbsp;&nbsp;
                            <router-link :to="'/chats/info/' + chat.id"
                                class="btn btn-outline-primary btn-sm">
                                <i class="fas fa-info-circle"></i> Info
                            </router-link>                                
                        </span>
                        <span v-if="chat.user_id==user_id">
                            &nbsp;&nbsp;
                            <router-link :to="'/chats/edit/' + chat.id"
                                class="btn btn-outline-primary btn-sm">Edit
                            </router-link>                                
                        </span>
                    </td>
                    <td class="table-text">
                        <span v-if="chat.valid_join">
                            <button v-on:click="delete_member(chat.id);" 
                                class="btn btn-outline-danger btn-sm">退会
                            </button>
                        </span>
                        <span v-else>
                            <button v-on:click="add_member(chat.id);" 
                                class="btn btn-outline-primary btn-sm">参加
                            </button>
                        </span>                   
                    </td>
                </tr>

            </tbody>
        </table>

        <hr />
        <div class="page_info_wrap">
            <ul>
                <li>このページの機能は、オープンソースで公開しております。<br />
                    <a  href='https://github.com/kuc-arc-f/vue_spa3a_4chat'>
                        https://github.com/kuc-arc-f/vue_spa3a_4chat
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href='https://knaka0209.hatenablog.com/entry/lara58_31cross_chat'>
                        https://knaka0209.hatenablog.com/entry/lara58_31cross_chat
                    </a><br />
                </li>
            </ul>
        </div>        

    </div>

</div>
</template>

<!-- -->
<style> 
.search_key{
    width: 200px; 
    float: left;
}
.p_tbl_chat_name{ font-size: 1.4rem; }
.chat-table td{ padding : 8px;}
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
import ChatLeftArea from '../../components/Element/ChatLeftArea'
import FlashMessage from '../../components/Layouts/FlashMessage'

//
export default {
    mixins:[Mixin],
    components: { ChatLeftArea , FlashMessage },
    created () {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
console.log( "uid=" + this.user_id )        
        this.getTasks()
    },
    data () {
        return {
            user_id : 0,
            chats: [],
            database : null
        }
    },
    methods: {
        getTasks () {
            var url = this.sysConst.URL_BASE +'/api/cross_chats/get_chats'
// console.log(url)
            var item = {
                'user_id': this.user_id,
            }; 
            axios.post(url, item).then(res =>  {
                this.chats = res.data.chat_items
                this.set_exStorage(this.sysConst.KEY_CHAT_JOIN_ITEMS, res.data.join_chats )
//console.log( res.data )
            })            
        },
        delete_member: function(chat_id){
            var item = {
                'user_id': this.user_id,
                'chat_id': chat_id,
            }; 
            var url = this.sysConst.URL_BASE +'/api/cross_chats/delete_member'
            axios.post(url, item).then(res =>  {
                var arr=[ {message : 'チャット退会。完了しました。'} ]
                this.set_exStorage( this.sysConst.STORAGE_KEY_flash, arr )

                this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/chats')
                window.location.href = this.sysConst.HTTP_URL
console.log(res.data)
            })             

        },
        add_member: function(chat_id){
            var item = {
                'user_id': this.user_id,
                'chat_id': chat_id,
            }; 
console.log(chat_id )
            var url = this.sysConst.URL_BASE +'/api/cross_chats/add_member'
            axios.post(url, item).then(res =>  {
                var data = res.data
                if(data.return == 1){
// console.log(data)
                    var arr=[ {message : 'チャット参加。完了しました。'} ]
                    this.set_exStorage( this.sysConst.STORAGE_KEY_flash, arr )

                    this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/chats')
                    window.location.href = this.sysConst.HTTP_URL
                }
            })  
        },
        proc_next: function(id){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/chats/show/' + id )
            window.location.href = this.sysConst.HTTP_URL
        },        
    }
}
</script>
