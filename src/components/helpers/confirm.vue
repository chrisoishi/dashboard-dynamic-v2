<template>
    <v-dialog v-model="loading" max-width="500px"  persistent>
        <v-card>
            <v-container>
                <v-row>
                    <v-col cols='3' class='text-center'>
                        <v-progress-circular indeterminate></v-progress-circular>
                    </v-col>
                    <v-col cols='9' class='display-1'>{{text}}</v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                text: "",
            }
        },
        methods: {
            set(active, text = "Carregando...") {
                if(!active){
                    setTimeout(()=>{
                        this.loading = active
                    },100);
                }
                else this.loading = active;
                
                this.text = text;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>