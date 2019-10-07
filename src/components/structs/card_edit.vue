<template>
    <v-scroll-x-reverse-transition>
        <div style='position:fixed;right:0;height:100vh;width:30vw;z-index:10' v-show='value'>
            <v-card style='position:relative;overflow-y:auto;width:100%;height:100vh'>
                <v-toolbar color="white" dark tabs style='position:fixed;width:30vw;z-index:2'>
                    <v-toolbar-title class='black--text'>Editar cartão</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-toolbar-items>
                        <v-btn icon>
                            <v-icon color="red" v-on:click="close">close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-row row wrap width="100%" style='margin-top:52px'>
                    <v-col cols="12">
                        <v-tabs v-model="tab_open" center-active show-arrows next-icon="arrow_right"
                            prev-icon="arrow_left">
                            <v-tab v-for='(data,fieldName) in card.tabs' :key='fieldName'>
                                {{data.name}}
                            </v-tab>
                        </v-tabs>
                        <v-divider></v-divider>
                        <v-tabs-items v-model="tab_open">
                            <v-tab-item v-for='(data,fieldName) in card.tabs' :key='fieldName'>
                                <v-expansion-panels v-model='panel_open'>
                                    <v-expansion-panel v-for='(attr,i) in data.attrs' :key='i'>
                                        <v-expansion-panel-header>{{card.data[attr].name}}</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-container grid-list-xs style='margin-top:30px'>
                                                <component :is='card.data[attr].type' :name='card.data[attr].name'
                                                    :value='card.data[attr]'></component>
                                            </v-container>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>

                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </v-scroll-x-reverse-transition>
</template>

<script>
    export default {
        props: {
            value: Boolean,
            card: Object
        },
        data() {
            return {
                tab_open: 0,
                panel_open: 0
            }
        },
        methods: {
            close() {
                this.$emit("input", false);
            },
            onOpen(){
                for (var i = 0; i < this.card.tabs.length; i++) {
                    if (this.card.tabs[i].attrs.indexOf(this.card.item_opened) != -1) {
                        this.tab_open = i;
                        break;
                    }
                };
                this.panel_open = this.card.tabs[this.tab_open].attrs.indexOf(this.card.item_opened);
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>

</style>