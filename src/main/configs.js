import routes from "./routes";
import vars from "./vars";
import fs from "../services/firebase_service";
import Vue from "vue";
export default {
    data() {
        return {
            configs: {
                general: {
                    title: "",
                    apresentation: false,
                    apresentation_time: 10,
                    current_page: 1,
                    
                },

                settings: {
                    title: "",
                    page_current: 1,
                    apresentation: false,
                    apresentation_time: 10,
                    sync: null,
                    updated_level: 0,
                },
                dashboards: [],
                data_card: {},
            }
        }
    },
    watch: {
        "configs.general.current_page"(newV, oldV) {
            this.configs_save();
            this.$refs.dash[newV - 1].onPageJoin();
            this.$refs.dash[oldV - 1].onPageLeave();
            
        },
    },
    methods: {
        configs_save: function () {
            if (this.connection.is_edit) {
                if (this.editing_template) {
                    this.saveDash(true);
                }
                this.configs.settings.apresentation = this.dashboard.apresentation.active;
                this.configs.settings.page_current = this.dashboard.pages.current;
                this.configs.settings.number_dashs = this.dashboard.pages.total;
                this.configs.settings.updated_level++;
                console.log("asfasfas");
                fs.dashSaveConfig(this.connection.id, this.configs).then((a) => {}).catch((e) => {
                    console.log(e);
                });
            }
        },
        configs_load: function () {
            fs.dashLoadConfig(this.connection.id, (snapshot) => {
                var response = snapshot.data();
                if (response.hasOwnProperty("dashboards")) this.configs.dashboards = response.dashboards;
                if (response.hasOwnProperty("general")) this.configs.general = response.general;
                if (this.configs.dashboards.length == 0) {

                    this.configs.dashboards.push({});
                    alert(this.configs.dashboards.length);
                }
                Vue.nextTick(() => {
                    this.configs_sync();
                });
            });

        },
        configs_set: function (config) {
            this.configs.dashboards[config.dash] = config.cfg;
            if (!config.onload) {
                this.configs_save();
            }
        },
        configs_sync() {
            for (var i = 0; i < this.configs.dashboards.length; i++) {
                if (Object.keys(this.configs.dashboards[i]).length != 0) {
                    console.log(this.$refs.dash);
                    this.$refs.dash[i].load(this.configs.dashboards[i]);
                }
            }
        }
    }
}