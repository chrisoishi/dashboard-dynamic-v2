import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from "./router";
Vue.use(VueRouter)

global.$ = require("jquery");

import dash_card from "./components/structs/dash_card";
import dash_card_add from "./components/structs/dash_card_add";
import dash_layout_full from "./components/structs/dash_layout_full";
import dash_layout_1x2 from "./components/structs/dash_layout_1x2";
import dash_layout_2x1 from "./components/structs/dash_layout_2x1";
import dash_text from "./components/structs/dash_text";
import dash_container from "./components/structs/dash_container";

import dash_card_birthday from "./components/cards/dash_card_birthday";
import dash_card_carrosel from "./components/cards/dash_card_carrosel";
import dash_card_feed from "./components/cards/dash_card_feed";
import dash_card_image from "./components/cards/dash_card_image";
import dash_card_survey from "./components/cards/dash_card_survey";
import dash_card_video from "./components/cards/dash_card_video";
import dash_card_data from "./components/cards/dash_card_data";

import dash_form_background from "./components/forms/dash_form_background";
import dash_form_color from "./components/forms/dash_form_color";
import dash_form_json from "./components/forms/dash_form_json";
import dash_form_slide from "./components/forms/dash_form_slide";
import dash_form_string_array from "./components/forms/dash_form_string_array";
import dash_form_string from "./components/forms/dash_form_string";
import dash_form_text from "./components/forms/dash_form_text";
import dash_form_textarea from "./components/forms/dash_form_textarea";

import comp_loading from "./components/helpers/loading";
import comp_alert from "./components/helpers/alert";

import swatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.min.css"

Vue.config.productionTip = false




Vue.component("dash-card", dash_card);
Vue.component("dash-card-add", dash_card_add);
Vue.component("dash-layout-full", dash_layout_full);
Vue.component("dash-layout-1x2", dash_layout_1x2);
Vue.component("dash-layout-2x1", dash_layout_2x1);

Vue.component("dash-card-birthday", dash_card_birthday);
Vue.component("dash-card-carrosel", dash_card_carrosel);
Vue.component("dash-card-feed", dash_card_feed);
Vue.component("dash-card-image", dash_card_image);
Vue.component("dash-card-survey", dash_card_survey);
Vue.component("dash-card-video", dash_card_video);
Vue.component("dash-card-data", dash_card_data);

Vue.component("dash-form-background", dash_form_background);
Vue.component("dash-form-color", dash_form_color);
Vue.component("dash-form-json", dash_form_json);
Vue.component("dash-form-slide", dash_form_slide);
Vue.component("dash-form-string-array", dash_form_string_array);
Vue.component("dash-form-string", dash_form_string);
Vue.component("dash-form-text", dash_form_text);
Vue.component("dash-form-textarea", dash_form_textarea);

Vue.component("dash-text", dash_text);
Vue.component("dash-container", dash_container);
Vue.component("swatches", swatches);

Vue.component("c-loading", comp_loading);
Vue.component("c-alert", comp_alert);


new Vue({
  vuetify,
  router,
  render: h => h(App),
  computed: {
    app() {
      return this.$children[0];
    },
  },
  data() {
    return {
      dash: null
    }
  }
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   vuetify,
//   template: '<App/>',
//   components: { App }
// })