import fs from "../services/firebase_service";
import Vue from "vue";
export default {
    data() {
        return {
            configs: {
                general: {
                    title: "",
                    apresentation: false,
                    apresentation_time: [10],
                    current_page: 1,
                },
                dashboards: [],
                data_card: {},
            },
            is_ready_save: false,
            is_need_save: false
        }
    },
    watch: {
        "configs.general.apresentation"() {
            this.configs_save();
        },
        "configs.general.current_page"(newV, oldV) {
            this.configs_save();
            if (typeof this.$refs.dash === "undefined") return;
            this.$refs.dash[newV - 1].onPageJoin();
            this.$refs.dash[oldV - 1].onPageLeave();

        },
    },
    methods: {
        configs_save: function (need_save = true) {
            if (need_save) {
                this.is_need_save = true;
                return;
            }
            this.is_need_save = false;
            if (this.connection.is_edit && this.is_ready_save) {
                fs.dashSaveConfig(this.connection.id, this.configs).then((a) => {}).catch((e) => {
                    console.log(e);
                });
            }
        },
        configs_load: function () {
            this.connection.snapshot = fs.dashboard_configs_load(this.connection.id, (snapshot) => {
                this.is_ready_save = false;
                var response = snapshot.data();
                if (response.hasOwnProperty("dashboards")) this.configs.dashboards = response.dashboards;
                if (response.hasOwnProperty("general")) this.configs.general = Object.assign(this.configs.general,response.general);
                if (this.configs.dashboards.length == 0) {
                    this.configs.dashboards.push(null);
                    this.configs.general.current_page = 1;
                }
                this.$nextTick(() => {
                    this.is_ready_save = true;
                    //this.configs_sync();
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
                this.$refs.dash[i].load(this.configs.dashboards[i]);
                // this.$refs.dash[i].load();
            }
            this.is_ready_save = true;
        }
    }
}