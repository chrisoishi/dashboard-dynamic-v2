<template>
    <v-tooltip bottom >
        <template v-slot:activator="{ on }">
            <v-btn icon color='white' dark fab  small class='ma-1' v-on='on' @click='$emit("click",this)' >
                <v-icon>{{icon}}</v-icon>
            </v-btn>
        </template>
        <span>{{tip}}</span>
    </v-tooltip>
</template>

<script>
    export default {
        props:{
            icon:String,
            tip:String
        }
    }
</script>