<template>
    <div style='height:100%'>
        <v-row align="center" justify="center" v-show="!dash_active">
            <v-col cols='5' class='d-flex align-center'>
                <v-container grid-list-xs>
                    <v-card>
                        <v-toolbar color="grey darken-3" dark>
                            <v-toolbar-title style='width:100%' class='text-center'> Dashboards</v-toolbar-title>
                        </v-toolbar>
                        <v-row>
                            <template v-if="user != null">
                                <v-col cols='12'>
                                    <v-list>
                                        <v-list-item v-for="(name,i) in user.names" :key="i">
                                            <v-list-item-content @click="()=>{}">
                                                <v-list-item-title v-text="name" />
                                            </v-list-item-content>
                                            <div>
                                                <v-btn icon color='green' @click='start(user.dashboards[i],false)'>
                                                    <v-icon>visibility</v-icon>
                                                </v-btn>
                                                <v-btn icon color='blue-grey darken-3'
                                                    @click='start(user.dashboards[i],true)'>
                                                    <v-icon>edit</v-icon>
                                                </v-btn>
                                                <v-btn icon color='red' @click="remove(user.dashboards[i])">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols='12'>
                                    <v-container grid-list-xs>
                                        <v-btn outlined color="primary" dark width='100%' @click="create()">
                                            <v-icon left>add</v-icon>Iniciar nova dashboard
                                        </v-btn>
                                    </v-container>
                                </v-col>
                            </template>
                            <v-col cols='12' class='text-center' v-else>
                                <v-container grid-list-xs>
                                    <v-progress-circular indeterminate></v-progress-circular>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-container>

            </v-col>
        </v-row>
        <Dashboard ref="dash" v-if="dash_active" :onConnectionStop="stop" :dashboard_id="dashboard_id" :dashboard_mode_edit="dashboard_mode_edit"/>
    </div>
</template>

<script>
    import Vue from "vue";
    import fs from "../services/firebase_service";
    export default {
        components: {
            "Dashboard": () => import("./dashboard")
        },
        data() {
            return {
                dashboard_id:"",
                dashboard_mode_edit:false,
                dash_active: false,
                user: null,
                snapshot: null
            }
        },
        watch: {
            $route(to, from) {
                //alert();
            }
        },
        methods: {
            load() {
                this.$root.app.loading.set(true);
                fs.user_data(true).then((user) => {
                    this.$root.app.loading.set(false);
                    console.log(user);
                    this.user = user;
                }).catch((e) => {
                    console.log(e);
                    //this.$root.alert.set(e);
                });
            },
            create() {
                this.$root.app.loading.set(true);
                fs.dashboard_create().then((doc) => {
                    this.load();
                }).catch((e) => {
                    console.log(e);
                    //this.$root.alert.set(e);
                });
            },
            remove(id) {
                this.$root.app.loading.set(true);
                fs.dashboard_delete(id).then((doc) => {
                    this.load();
                }).catch(e => {
                    console.log(e);
                })
            },
            start(id, edit_mode) {
                this.dash_active = true;
                this.dashboard_id = id;
                this.dashboard_mode_edit = edit_mode;

            },
            stop() {
                this.dash_active = false;
                this.load();
            }
        },
        mounted() {
            this.load();
        },
    }
</script>

<style lang="scss" scoped>

</style>