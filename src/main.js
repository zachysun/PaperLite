import Vue from 'vue'
import App from './App.vue'
import {Button, ButtonGroup, Input} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Input)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')