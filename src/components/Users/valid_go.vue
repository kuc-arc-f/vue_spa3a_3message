<template>
    <div>
        <h1>test -Google Login:</h1>
        <hr />
        <!--
        test : {{ message }}
        -->
        <p>・ ポップアップ画面で、Googleログイン認証ログインしてください。</p>
        <p>・ chromeブラウザのポップアップ許可が必要になります。</p>
        <p>・ chromeブラウザに、Googleアカウントでログインしている事が必用です。</p>
    </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import {Mixin} from '../../mixin'

//
export default {
    mixins:[Mixin],
    created() {
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.popup_open();
//        this.remove_exStorage( this.sysConst.STORAGE_KEY_userData )
        var d = this.get_exStorage(this.sysConst.STORAGE_KEY_userData)
console.log(d.length )
//console.log(d[0].email )
    },
    data() {
        return {
            user : [],
            message :''
        }
    },
    methods: {
        popup_open: function(){
            var self = this
            firebase.auth().signInWithPopup(this.provider).then(function(result) {
                var token = result.credential.accessToken;
                console.log(token)
                var user = result.user;
                console.log(user.uid)
                console.log(user.email)
                console.log(user.displayName)
                var item = {
                    "email" : user.email,
                    "displayName" : user.displayName,
                    "uid" : user.uid,
                };
                var url = self.sysConst.URL_BASE +'/api/cross_user/get_user'
                axios.post( url  , item).then(res => {
                    var data = res.data;
        //console.log(data);
        console.log(data.return  );              
                    if(data.return == 1){
        //console.log(data.user);
                        var param = [ data.user ]
                        self.set_exStorage(self.sysConst.STORAGE_KEY_userData, param )
                        self.$router.push('/')
                    }else{
                        alert("このメールは。通常メールログインで登録済で。Googleログインできません");
                    }
                });
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });

        }
    }
}
</script>

