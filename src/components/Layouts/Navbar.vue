<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Code-Kuc</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link  to="/" class="nav-link">Home</router-link>
                </li>
                <!--
                <li class="nav-item active">
                    <router-link  to="/about" class="nav-link">About</router-link>
                </li>
                -->
                <li class="nav-item active">
                    <router-link  to="/tasks" class="nav-link">Tasks</router-link>
                </li>
                <li class="nav-item active">
                    <router-link  to="/todos" class="nav-link">Todos</router-link>
                </li>
                <li class="nav-item active">
                    <router-link  to="/messages" class="nav-link">Message</router-link>
                </li>
            </ul>
			<!-- right_nav -->
			<ul class="navbar-nav">
                <div v-if="valid_user==false">
                    <li class="nav-item">
                        <router-link  to="/users/login" class="nav-link">Login
                        </router-link>
                    </li>					
                </div>
                <div v-else>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-on:click="proc_logout()">Logout
                        </a>
                    </li>					
                </div>
				<li class="nav-item">
                    <router-link  to="/about" class="nav-link">About</router-link>
				</li>
			</ul>            
        </div>
        <hr />
    </nav>
</template>

<script>
import {Mixin} from '../../mixin'

export default {
    mixins:[Mixin],
    created () {
        this.valid_user = this.valid_login(this.sysConst.STORAGE_KEY_userData)
        console.log(this.valid_user );
    },
    data() {
        return {
            valid_user : null,
        }
    },    
    methods: {
        proc_logout: function() {
            this.remove_exStorage(this.sysConst.STORAGE_KEY_userData )
            this.$router.push('/users/login')
            //console.log('#-Logout')
        },
    }    
}
</script>
