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

//
export default {
    created() {
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.popup_open();
    },
    data() {
        return {
            user : [],
            message :''
        }
    },
    methods: {
        popup_open: function(){
//            var self = this
            firebase.auth().signInWithPopup(this.provider).then(function(result) {
                var token = result.credential.accessToken;
                console.log(token)
                var user = result.user;
//                console.log(user)
                console.log(user.uid)
                console.log(user.email)
                console.log(user.displayName)
//                self.$router.push('/')
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
//                var email = error.email;
//                var credential = error.credential;
            });

        }
    }
}
</script>

