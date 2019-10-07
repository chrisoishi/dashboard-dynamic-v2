import fs from "../services/firebase_service";
export default {
    data() {
        return {
            dashboard: {
                running: false,
                apresentation: {
                    active: false,
                    time: 1000,
                    timeout: null
                },
                pages: {
                    current: 1,
                    total: 1,
                },
                refresh_rate: 3000,
            },
            current_card_edit: {
                item_opened: "",
                data: null,
                tabs: [],
                object: null
            },
            is_card_editing: false

        }
    },
    computed: {
        width_dashboard() {
            return this.is_card_editing ? "70vw" : "100vw";
        },
    },
    watch: {
        "configs.general.apresentation"(v) {
            if (v) {
                this.dash_start_apresentation();
            } else {
                clearTimeout(this.dashboard.apresentation.timeout);
            }
        },
        "dashboard.apresentation.active": function (newV) {
            if (newV) {

                this.shows.popups.card_edit_bottom = false;
                this.shows.popups.card_edit = false;
            }

        },
        "dashboard.pages.total": function () {
            this.shows.popups.card_edit_bottom = false;
        },
        "is_card_editing": function () {
            if (!this.is_card_editing && this.current_card_edit.object != null) {
                this.current_card_edit.object.save(false);
                this.current_card_edit.object.is_editing = false;
            }

        },
    },
    methods: {
        dash_start_apresentation: function () {
            clearTimeout(this.dashboard.apresentation.timeout);
            if (this.dashboard.apresentation.active) {
                this.configs.general.current_page++;
                if (this.configs.general.current_page > this.configs.dashboards.length) this.configs.general.current_page = 1;
            }
            this.dashboard.apresentation.timeout = setTimeout(() => {
                this.dash_start_apresentation()
            }, this.configs.general.apresentation_time * 1000);

        },
        dash_refresh: function () {
            this.configs_load();
            setTimeout(() => {
                this.dash_refresh(false);
            }, this.dashboard.refresh_rate);

        },
        dash_view_mode() {
            if (this.connection.id.length == 5) {
                this.block_init_settings = true;
                this.dashboard.apresentation.active = true;
                this.dashboard.pages.current = 1;
                this.dashboard.running = true;
                this.model_connect = false;
                this.sets.editor = false;
                setTimeout(() => {
                    this.dash_start_apresentation();
                    this.dash_refresh();
                }, 1000);
            }
        },
        dash_change_order(direction) {
            var current_page = this.configs.general.current_page-1;
            switch (direction) {
                case "LEFT":
                    if (current_page > 0) {
                        var dash = Object.assign({},this.configs.dashboards[current_page]);
                        this.configs.dashboards.splice(current_page,1);
                        this.configs.dashboards.splice(current_page-1,0,dash);
                        this.configs_sync();
                        this.$nextTick(()=>{
                            this.configs.general.current_page--;
                        });
                    }
                    break;
                case "RIGHT":
                    if (current_page < this.configs.dashboards.length-1) {
                        var dash = Object.assign({},this.configs.dashboards[current_page]);
                        this.configs.dashboards.splice(current_page,1);
                        this.configs.dashboards.splice(current_page+1,0,dash);
                        this.configs_sync();
                        this.$nextTick(()=>{
                            this.configs.general.current_page++;
                        });
                    }
                    break;
            }
        },
        dash_clear: function () {
            this.$refs.dash[this.dashboard.pages.current - 1].$refs.card1.remove();
        },
        dash_add: function () {
            this.configs.dashboards.splice(this.configs.general.current_page,0,null);
            this.$nextTick(()=>{
                this.configs_sync();
                this.configs.general.current_page++;
            });
            
        },
        dash_delete: function (index) {
            if (this.configs.dashboards.length > 1) {
                this.configs.dashboards.splice(index, 1);
                this.configs.general.current_page--;
            } else this.dash_clear();
            console.log(this.configs.dashboards);
            this.configs_sync();
            this.configs_save();

        },
        dash_get(index) {
            return this.$refs.dash[index - 1];
        },
        dash_edit_card_field(field) {
            var x = event.clientX; // Get the horizontal coordinate
            var y = event.clientY;
            this.shows.popups.card_edit_bottom = false;
            this.models.current_card_edit.position.top = false;
            this.models.current_card_edit.position.bottom = false;
            this.models.current_card_edit.position.right = false;
            this.models.current_card_edit.position.left = false;
            if (x / window.innerWidth > 0.5) this.models.current_card_edit.position.left = true;
            else this.models.current_card_edit.position.right = true;
            if (y / window.innerHeight > 0.5) this.models.current_card_edit.position.top = true;
            else this.models.current_card_edit.position.bottom = true;


            setTimeout(() => {
                this.shows.popups.card_edit_bottom = true
            }, 50);
            this.models.current_card_edit.field = field;
        },
        dash_edit_card(card, item_opened) {
            if (this.current_card_edit.object != null) this.current_card_edit.object.is_editing = false;
            this.current_card_edit.item_opened = item_opened;
            this.current_card_edit.tabs = card.$refs.card.tabs;
            this.current_card_edit.data = card.$refs.card.data;
            this.current_card_edit.object = card;
            this.is_card_editing = true;
            this.$refs.card_edit.onOpen();
        }

    }
}