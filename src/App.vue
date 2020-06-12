<template>
  <div id="app">
    <navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navbar from './components/Layouts/Navbar'
import axios from 'axios'
import $ from 'jquery'
import {Mixin} from './mixin'

/**********************************************
 *
 *********************************************/    
function set_time_text(url_base, user_id){
	var data = {
				'user_id': user_id,
				'type': 1,
            };           
    var url = url_base + "/api/cross_messages/get_last_item"
	axios.post(url , data).then(res =>  {
		var item = res.data
		if(item.id != null){
			$("input#time_text").val( item.id );
            $("input#message_title").val( item.title );
		}else{
			$("input#time_text").val( 0 );
		}
// console.log( item  );
	});	 
 }

export default {
    mixins:[Mixin],
    name: 'app',
    components: {
        navbar
    },
    data () {
        return {
            timerObj : null,
            URL_BASE : "",
            user_id : 0,
        }
    },    
    created () {
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
//console.log( "uid=" + this.user_id )
        set_time_text(this.sysConst.URL_BASE, this.user_id )
    //        console.log("# App.create")
        this.app_timer_start()
    },
    methods: {
        get_items () {},
        app_count: function() {
            var valid_user = this.valid_login(this.sysConst.STORAGE_KEY_userData)
            if(valid_user == true ){
                set_time_text(this.sysConst.URL_BASE, this.user_id )
            }
        },
		app_timer_start: function() {
			var self = this;
			this.timerObj = null;
            var TIMER_SEC = 1000 * 600;
//            var TIMER_SEC = 1000 * 30;
			this.timerObj = setInterval(function() {self.app_count()}, TIMER_SEC )
		},        
    },
}

</script>

<style>
</style>
