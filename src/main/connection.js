import routes from "./routes";
export default {
    watch: {
        $route(to, from) {
            this.connection.id = this.$route.params.id;
            this.connection.status = true;
            this.shows.popups.new_connection=false;
            this.configs_load();
        }
    },
    data() {
        return {
            connection: {
                id: "",
                status: false,
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
            // $.ajax({
            //     url: routes.connection.start,
            //     dataType: "JSON",
            //     method: 'POST',
            //     data: {
            //         dash_id: this.connection.id,
            //         connection: this.connection.id,
            //     },
            //     headers: vars.header
            // })

        },
        conn_editor() {
            if (this.connection.id.length == 5) {
                this.$router.push("dash/" + this.connection.id);
            }
        },
    }
}