export default {
    data() {
        return {
            dashboard: {
                running: false,
                apresentation: {
                    active: true,
                    time: 1000,
                    timeout: null
                },
                pages: {
                    current: 1,
                    total: 1,
                },
                refresh_rate: 3000,
            },

        }
    },
    watch: {
        "dashboard.apresentation.active": function (newV) {
            this.dash_start_apresentation();
            this.shows.popups.card_edit_bottom=false;
        },
        "dashboard.pages.current": function (newV, oldV) {
            if (!this.dashboard.apresentation.active) {
                if (newV != oldV) this.configs_save();
            }
            this.$refs.dash[newV - 1].start();
            this.$refs.dash[oldV - 1].end();
            this.shows.popups.card_edit_bottom=false;
        },
        "dashboard.pages.total": function(){
            this.shows.popups.card_edit_bottom=false;
        }
    },
    methods: {
        dash_start_apresentation: function () {
            clearTimeout(this.dashboard.apresentation.timeout);
            if (this.dashboard.apresentation.active) {
                if (this.dashboard.pages.current > this.dashboard.pages.total) this.dashboard.pages.current = 1;
                this.dashboard.apresentation.timeout = setTimeout(() => {
                    this.dashboard.pages.current++;
                    this.dash_start_apresentation()
                }, this.configs.settings.apresentation_time * 1000);
            }
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
        dash_change_order: function (direction) {
            switch (direction) {
                case "LEFT":
                    if (this.dashboard.pages.current > 1) {
                        var next = parseInt(this.dashboard.pages.current) - 1;
                        var copy = this.configs.dashboards['dash' + next];
                        this.configs.dashboards['dash' + next] = this.configs.dashboards['dash' + this.dashboard.pages.current];
                        this.configs.dashboards['dash' + this.dashboard.pages.current] = copy;

                        this.dashboard.pages.current--;
                        this.configs_sync();
                        this.configs_save();
                    }
                    break;
                case "RIGHT":
                    if (this.dashboard.pages.current < this.dashboard.pages.total) {
                        var next = parseInt(this.dashboard.pages.current) + 1;
                        var copy = this.configs.dashboards['dash' + next];
                        this.configs.dashboards['dash' + next] = this.configs.dashboards['dash' + this.dashboard.pages.current];
                        this.configs.dashboards['dash' + this.dashboard.pages.current] = copy;
                        this.dashboard.pages.current++;
                        this.configs_sync();
                        this.configs_save();
                    }
                    break;
            }
        },
        dash_clear: function () {
            this.$refs.dash[this.dashboard.pages.current - 1].$refs.card1.remove();
        },
        dash_delete: function (index) {
            if (this.dashboard.pages.total > 1) {
                for (var i = index; i < this.dashboard.pages.total; i++) {
                    this.configs.dashboards["dash" + i] = this.configs.dashboards["dash" + (i + 1)];
                }
                delete this.configs.dashboards["dash" + this.dashboard.pages.total];
                this.configs_sync();

                this.dashboard.pages.total--;
                if (this.dashboard.pages.current > this.dashboard.pages.total) this.dashboard.pages.current = this.dashboard.pages.total;
            } else this.dash_clear();

            this.configs_save();

        },
        dash_get(index) {
            return this.$refs.dash[index - 1];
        },
        dash_edit_card_field(field) {
            var x = event.clientX; // Get the horizontal coordinate
            var y = event.clientY;
            this.shows.popups.card_edit_bottom = false;
            this.models.current_card_edit.position.top=false;
            this.models.current_card_edit.position.bottom=false;
            this.models.current_card_edit.position.right=false;
            this.models.current_card_edit.position.left=false;
            if(x/window.innerWidth>0.5)this.models.current_card_edit.position.left=true;
            else this.models.current_card_edit.position.right=true;
            if(y/window.innerHeight>0.5)this.models.current_card_edit.position.top=true;
            else this.models.current_card_edit.position.bottom=true;


            setTimeout(()=>{this.shows.popups.card_edit_bottom = true},50);
            this.models.current_card_edit.field = field;
        }
    }
}
