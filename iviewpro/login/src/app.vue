<template>
    <div class="login">
		<div class="login_back_logo"></div>
        <div class="login_inner_wrap">
            <router-view></router-view>
            <foo-ter></foo-ter>
        </div>
    </div>
</template>
<style>
    html,body{
        width: 100%;
        height:100%;
    }
    li{list-style-type: none;}
</style>
<script>
import fooTer from './template/footer.vue';
    export default {
        data() {
            return {
                
            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        },
        components:{
            fooTer,
        },
        created(){

        },
        updated(){

        }
        
    };
</script>