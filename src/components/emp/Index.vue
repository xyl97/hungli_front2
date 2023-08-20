<!--
*@
*@author wq
*@date 2023/8/17 18:21
-->
<template>
    <div class="layout">
        <!--左侧导航栏-->
        <div class="menu">
            <Menu></Menu>
        </div>
        <!--右侧内容-->
        <div class="content">
            <Content></Content>
        </div>
    </div>
</template>


<script>
    import Menu from './Menus.vue'
    import Content from './ContentIndex.vue'
    export default {
        components:{
            Menu,
            Content
        }
    }
</script>

<style lang="less" scoped>
    .layout{
        /*display: flex;*/
        .menu{
            width: 200px;
            background: #545c64;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
        }
        .content{
            /*flex: 1;
            */
            padding-left: 200px;
        }
    }

</style>