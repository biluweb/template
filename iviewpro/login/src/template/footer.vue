<template>
    <div class="form_footer">
        <div class="form_footer_space">
            <a class="form_footer_font">关于我们</a>
            <a  class="form_footer_font">文档发布</a>
            <a  class="form_footer_font">服务协议</a>
            <a  class="form_footer_font">隐私政策</a>
        </div>
        <span class="form_footer_records">渝 ICP 备 1423315654 号-1</span>
    </div>
</template>

<script>
export default {
        data() {
            return {
                
            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        // methods: {

        // },
        // components:{

        // },
        created(){

        },
        updated(){

        }
        
    };
</script>

<style lang='less' scoped>
    .form_footer{
        background-color: rgba(255,255,255,0.2);
        width: 100%;
        height: 5vh;
        position: fixed;
        bottom: 0px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .form_footer_space{
            margin: 0 auto;
        }
        .form_footer_font{
            color: #96a4bd;
            padding: 0 70px;
        }
        .form_footer_records{
            color: #004a95;
            position: absolute;
            right: 0;
            padding-right: 50px;
        }
    }
</style>