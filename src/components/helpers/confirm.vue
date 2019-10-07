<template>
    <v-dialog v-model="loading" max-width="500px" persistent>
        <v-card>
            <v-toolbar>
                <v-toolbar-title style='width:100%' class='text-center'>{{title}}</v-toolbar-title>
            </v-toolbar>
            <v-container>
                <div style='width:100%' class='text-center pa-2'>{{text}}</div>
            </v-container>
            <v-divider></v-divider>
            <div style='width:100%' class='text-right pa-2'>
                <v-btn outlined color="error" class='mr-2' @click='onButtonCancel'>{{cancel}}</v-btn>
                <v-btn outlined color="success"  @click='onButtonOk'>{{ok}}</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                title: "Title",
                text: "text",
                ok: "Continuar",
                cancel: "Cancelar",
                onOk: null,
                onCancel: null,
            }
        },
        methods: {
            set(active, data = {}) {
                if (!active) {
                    setTimeout(() => {
                        this.loading = active
                    }, 100);
                } else this.loading = active;
                if(!active)return;
                this.title = data.hasOwnProperty("title") ? data.title : "Continuar";
                this.text = data.hasOwnProperty("text") ? data.text : "";
                this.ok = data.hasOwnProperty("ok") ? data.ok : "Continuar";
                this.cancel = data.hasOwnProperty("cancel") ? data.cancel : "Continuar";
                this.cancel = data.hasOwnProperty("cancel") ? data.cancel : "Cancelar";
                this.onOk = data.hasOwnProperty("onOk") ? data.onOk : () => {};
                this.onCancel = data.hasOwnProperty("onCancel") ? data.onCancel : () => {};
            },
            onButtonOk() {
                this.onOk();
                this.set(false);
            },
            onButtonCancel() {
                this.onCancel();
                this.set(false);
            },
        },
    }
</script>