<template>
    <v-app>
        <v-row align="center" justify="center">
            <v-col cols='5' class='d-flex align-center'>
                <v-container grid-list-xs>
                    <v-card>
                        <v-toolbar color="grey darken-3" dark>
                            <v-toolbar-title style='width:100%' class='text-center'>{{title}}</v-toolbar-title>
                        </v-toolbar>
                        <v-container class='pa-10'>
                            <v-form ref='form'>
                                <v-row>
                                    <v-col cols='12'>
                                        <v-text-field :label="email_text" v-model='email' :rules="[form.rules.empty]">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols='12'>
                                        <v-text-field :label="name_text" v-model='name' :rules="[form.rules.empty]">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols='12'>
                                        <v-text-field :label="password_text" v-model='password'
                                            :rules="[form.rules.empty]" type='password'></v-text-field>
                                    </v-col>
                                    <v-col cols='12'>
                                        <v-text-field :label="password2_text" v-model='password2'
                                            :rules="[form.rules.empty,form.rules.confirm_password]" type='password'>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols='12'>
                                        <v-btn width="100%" @click='register()'>
                                            Criar conta
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
                title: "DynaDash - Criar uma conta",
                email_text: "E-mail",
                name_text:"Nome",
                password_text: "Senha",
                password2_text: "Confimar senha",
                email: "",
                name:"",
                password: "",
                password2: "",
                form: {
                    rules: {
                        empty: (val) => {
                            return val == "" ? "Não pode estar em branco" : false;
                        },
                        confirm_password: (val) => {
                            return val != this.password ? "Repita sua senha corretamente" : false;
                        }
                    }
                }
            }
        },
        methods: {
            register() {
                if (this.$refs.form.validate()) {
                    this.$root.app.loading.set(true);
                    fs.register(this.email, this.password,this.name).then((m) => {
                        this.$router.push('/login');
                        this.$root.app.loading.set(false);
                    }).catch((m) => {
                        this.$root.app.alert.set(m);
                        this.$root.app.loading.set(false);
                    });
                } else {}
            }

        },
    }
</script>