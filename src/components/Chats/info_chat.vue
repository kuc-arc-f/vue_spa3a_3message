<template>
    <div>
        <router-link :to="'/chats'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>name : {{ item.name }}</h3>
        contennt:
        <div v-text="item.content"></div>
        <p class="mt-2">
        Create : {{ item.created_at }}
        </p>
        <hr />
        <h3>Members:</h3>
        <table class="table table-striped task-table">
			<thead>
				<th>User name</th>
				<th>Join date</th>
			</thead>
            <tbody>
                <tr v-for="member in CHAT_MEMBERS" v-bind:key="member.id">
                    <td class="table-text">
                        {{ member.user_name }}
                    </td>
                    <td class="table-text">
                        {{ member.created_at }}
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import axios from 'axios'

//
export default {
    mixins:[Mixin],
    created() {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
        this.getItem()
    },
    data: function( ) {
        var itemDat = {name : '', content : ''}
        return {
            user_id : 0,
            chat_id : this.$route.params.id,
            CHAT_MEMBERS : null,            
            item: itemDat,
            editFlg: false,
            updated: false,
        }
    },
    methods: {
        getItem: function() {
            var item = {
                    'chat_id': this.chat_id,
//                    'user_id': this.user_id,
                };            
                // cross_chats/info_chat
//            var url = this.sysConst.URL_BASE +'/api/cross_chats/get_member_info'
            var url = this.sysConst.URL_BASE +'/api/cross_chats/info_chat'
//console.log(url)            
            axios.post( url  , item).then(res => {
                this.item = res.data.chat;
                this.CHAT_MEMBERS = res.data.members;
//                this.title = this.item.title;
//                this.content = this.item.content;
console.log( res.data );                
//                console.log(res.data.id );
            });            
        },
    }
}
</script>


