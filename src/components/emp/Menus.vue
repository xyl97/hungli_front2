<!--
*@
*@author wq
*@date 2023/8/17 18:43
-->
<template>

  <div>
     <el-menu
             default-active="$route.path"
             class="el-menu-vertical-demo"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b" router>
         <el-menu-item index="/index">
             <i class="el-icon-menu"></i>
             <span slot="title">首页</span>
         </el-menu-item>

        <el-submenu index="1">
           <template slot="title">
              <i class="el-icon-location"></i>
              <span>职工管理</span>
           </template>
           <el-menu-item-group>
<!--              <template slot="title">分组一</template>-->
              <el-menu-item index="/emp/empCount">职工统计</el-menu-item>
              <el-menu-item index="/emp/emplist">职工列表</el-menu-item>
           </el-menu-item-group>
<!--           <el-menu-item-group title="分组2">-->
<!--              <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--           </el-menu-item-group>-->
<!--           <el-submenu index="1-4">-->
<!--              <template slot="title">选项4</template>-->
<!--              <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--           </el-submenu>-->
        </el-submenu>
<!--        <el-menu-item index="2">-->
<!--           <i class="el-icon-menu"></i>-->
<!--           <span slot="title">导航二</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="3" disabled>-->
<!--           <i class="el-icon-document"></i>-->
<!--           <span slot="title">导航三</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="4">-->
<!--           <i class="el-icon-setting"></i>-->
<!--           <span slot="title">导航四</span>-->
<!--        </el-menu-item>-->
     </el-menu>

  </div>
</template>

<script>
    export default {

    }
</script>

<style >

</style>