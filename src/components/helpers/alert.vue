<template>
    <v-snackbar v-model='model' top>{{text}}</v-snackbar>
</template>

<script>
    export default {
        data() {
            return {
                model: false,
                text: "",
            }
        },
        methods: {
            set(text) {
                this.model = true;
                this.text = text;
            }
        },
    }
</script>