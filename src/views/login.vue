<template>
    <v-app>
        <v-row align="center" justify="center">
            <v-col cols='5' class='d-flex align-center'>
                <v-container grid-list-xs>
                    <v-card>
                        <v-toolbar color="grey darken-3" dark>
                            <v-toolbar-title style='width:100%' class='text-center'>DynaDash Login</v-toolbar-title>
                        </v-toolbar>
                        <v-container class='pa-10'>
                            <v-form ref='form'>
                                <v-row>
                                    <v-col cols='12'>
                                        <v-text-field :label="email_text" v-model='email' :rules="[form.rules.empty]">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols='12'>
                                        <v-text-field :label="password_text" v-model='password' type='password'
                                            :rules="[form.rules.empty]"></v-text-field>
                                    </v-col>
                                    <v-col cols='12'>
                                        <v-btn width="100%" @click='login()'>
                                            Login
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>

                        </v-container>
                    </v-card>
                </v-container>

            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    import fs from "../services/firebase_service";
    export default {
        name: "Login",
        data() {
            return {
                email_text: "E-mail",
                password_text: "Senha",
                email: "",
                password: "",
                form: {
                    rules: {
                        empty: (val) => {
                            return val == "" ? "Não pode estar em branco" : false;
                        }
                    }
                }
            }
        },
        methods: {
            login() {

                if (this.$refs.form.validate()) {
                    this.$root.app.loading.set(true);
                    fs.auth(this.email, this.password).then((m) => {
                        this.$router.push('/');
                        this.$root.app.loading.set(false);
                    }).catch((m) => {
                        this.$root.app.alert.set(m);
                        this.$root.app.loading.set(false);
                    });
                } else {
                }
            }

        },
    }
</script>