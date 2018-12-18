<template>
	<div>
		<div class="headline">
			<p>商户管理</p>
		</div>

        <div class="ftitle">
            <!-- row1 -->
            <div class="frow">
                <div class="fcol">
                    <p>商户</p>
                    <Input v-model="order_codeText" placeholder="商户编号" style="width: 150px"></Input>
                </div>
                <div class="fcol">
                    <p>商户状态</p>
                    <Select v-model="model1" class="input" style="width:150px" filterable :clearable="true">
                        <Option v-for="item in orderStatusList" :value="item.code" :key="item.code">{{item.name}}</Option>
                    </Select>
                </div>
                <div class="fcol">
                    <p>商户编号</p>
                    <Input v-model="order_codeText" placeholder="商户编号" style="width: 150px"></Input>
                </div>
                
                <div class="fcol confirmPwd">
                    <p>登录密码</p>
                    <Input type="password" placeholder="输入密码" style="width: 150px"></Input>
                    <span class="shmg" @click="psdView"></span>
                </div>

                <!-- <div class="fcol">
                    <Button class="thebtn" type="primary" @click="query()">查询</Button>
                    <Button class="addbtn" @click="">新增下级商户</Button>
                </div> -->
            </div>
            <!-- row2... -->
        </div>

        <hr class="cp1">

        <div class="tablebox">
            <Table border class="tabSize" :columns="columns1" :data="data1"></Table> 
        </div>
        <div class="pagebox">
            <Page ref="pages" :total="maxPage" :page-size="pageSize" show-elevator show-total :page-size-opts="[15,30,50,70]" show-sizer @on-change="" @on-page-size-change=""></Page>
        </div>

	</div>
</template>

<script>
    export default {
        data(){
            return {
                
			};
        },
        computed:{

        },
        watch:{

        },
        components:{
            
        },
		methods: {

		},
		created() {

        },
        updated() {
            
        },
		mounted() {

            
		},
	};
</script>