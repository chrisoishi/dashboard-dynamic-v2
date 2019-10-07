export default {
    props:{
        dashboard_id:String,
        dashboard_mode_edit:Boolean
    },
    watch: {
        $route(to, from) {

        },
    },
    data() {
        return {
            connection: {
                id: "",
                status: true,
                is_edit: false,
                snapshot: null,
            },
        }
    },
    methods: {
        conn_wait: function () {
            if (this.connection.status == false) {
                $.ajax({
                    url: routes.connection.wait,
                    dataType: "JSON",
                    method: 'GET',
                }).done((response) => {
                    if (response.connection != "false") {
                        this.dashboard.running = true;
                        this.connection.status = response.connection
                        this.dash_start_apresentation();
                        setTimeout(function () {
                            this.dashboard.apresentation.active = false;
                            this.dash_refresh();
                        }, 1000);
                    } else {

                        setTimeout(() => {
                            this.conn_wait();
                        }, 1000);
                    }
                });
            } else {
                if (window.location.href.indexOf("&show") > -1) {
                    this.dash_view_mode();
                } else {
                    this.configs_load();
                    this.sets.editor = true;
                    this.dashboard.apresentation.active = false;
                    if (this.dashboard.running) {
                        this.conn_start();
                    }
                }
            }

        },
        conn_start: function () {
            this.connection.is_edit = this.dashboard_mode_edit;
            if (!this.connection.is_edit) this.dashboard.apresentation.active = true;
            this.connection.id = this.dashboard_id;
            this.configs_load();
        },
        conn_stop() {
            this.configs_save(false);
            this.connection.id = "";
            this.connection.is_edit=false;
            this.configs = Object.assign({}, this.configs_init);
            if (this.connection.snapshot != null)this.connection.snapshot();
            this.onConnectionStop();
        }
    }
}