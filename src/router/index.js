import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/Home'
import about from '../components/About'

import tasksIndex from '../components/Tasks/Index'
import tasksNew from '../components/Tasks/new'
import tasksTest from '../components/Tasks/test'
import tasksShow from '../components/Tasks/show'
import tasksEdit from '../components/Tasks/edit'

import usersLogin from '../components/Users/Login'
import usersValidGo from '../components/Users/valid_go'
import usersTest from '../components/Users/test_auth'

import todosNew from '../components/Todos/new'
import todosIndex from '../components/Todos/Index'
import todosShow from '../components/Todos/show'
import todosEdit from '../components/Todos/edit'

// Messages
import messagesIndex from '../components/Messages/Index'
import messagesNew from '../components/Messages/new'
import messagesShow from '../components/Messages/show'
import messagesShowSent from '../components/Messages/show_sent'
import messagesReply from '../components/Messages/reply'

//
Vue.use(Router)
//
export default new Router({
	/* mode: 'history', */
	routes: [
		{ path: '/', component: home },
		{ path: '/about', component: about },
		/* tasks */
		{ path: '/tasks/edit/:id', component: tasksEdit },
		{ path: '/tasks', component: tasksIndex },
		{ path: '/tasks/new', component: tasksNew },
		{ path: '/tasks/test', component: tasksTest },
		{ path: '/tasks/show/:id', component: tasksShow },
		/* users */
		{ path: '/users/test', component: usersTest },
		{ path: '/users/login', component: usersLogin },
		{ path: '/users/valid_go', component: usersValidGo },
		/* todo */
		{ path: '/todos/new', component: todosNew },
		{ path: '/todos', component: todosIndex },  
		{ path: '/todos/show/:id', component: todosShow },
		{ path: '/todos/edit/:id', component: todosEdit },
		/* messagesIndex */
		{ path: '/messages', component: messagesIndex },  
		{ path: '/messages/new', component: messagesNew },  
		{ path: '/messages/show/:id', component: messagesShow }, 
		{ path: '/messages/show_sent/:id', component: messagesShowSent }, 
		{ path: '/messages/reply/:id', component: messagesReply }, 

	] 
})
