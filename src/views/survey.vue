<template>
    <v-app>
        <v-container fill-height>
            <v-card width="100%" height="100vh" style='overflow:auto'>
                <v-row justify="center">
                    <v-col cols='12' v-if='waiting'>
                        <v-row align='center'>
                            <v-col cols='12' class='display-3 text-center'>{{survey.question}}</v-col>
                            <v-col cols='12' class='display-3 text-center' v-for='(s,i) in survey.answers' :key='i'>
                                <v-container>
                                    <v-btn :color="colors[color_choice[i]]" outlined large width='100%' height="100px" @click='answer(i)'>
                                        {{s.value}}</v-btn>
                                </v-container>
                            </v-col>

                        </v-row>
                    </v-col>
                    <v-col cols=12 v-else class='display-3 text-center'>
                        <v-progress-circular indeterminate></v-progress-circular>
                    </v-col>
                </v-row>

            </v-card>
        </v-container>

    </v-app>
</template>

<script>
    import fs from "../services/firebase_service";
    export default {
        name: "Login",
        data() {
            return {
                id: "",
                survey: {
                    question: "",
                    answers: []
                },
                colors: ['blue', 'purple', 'green', 'orange darken-4', 'red', 'brown darken-3'],
            }
        },
        watch: {
        },
        computed: {
            waiting: function () {
                return this.survey.answers.length > 0 ? true : false;
            },
            color_choice: function () {
                var choices = [];
                for (var i = 0; i < this.survey.answers.length; i++) {
                    choices.push(Math.floor((Math.random() * this.survey.answers.length) + 0));
                }
                return choices;
            },
        },
        methods: {
            load_survey() {
                fs.loadSurvey(this.$route.params.id).then((snap) => {
                    this.survey = snap.data();
                });
            },
            answer(i) {
                var attr = "ans" + i;
                if (this.survey.hasOwnProperty(attr)) this.survey[attr]++;
                else this.survey[attr] = 1;
                var ans = {}
                ans[attr] = this.survey[attr]
                fs.saveSurvey(this.$route.params.id, ans).then(()=>{
                    window.close();
                }).catch(()=>{
                    window.close();
                });
            }

        },
        mounted() {
            this.load_survey();
        }
    }
</script>