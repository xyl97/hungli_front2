<template>

    <div id="app">



<!--        <el-main>-->
         <router-view  v-if="isRouterAlive"> </router-view>


    </div>




</template>

<style>

</style>
<script>

    export default {
        provide() {
            return {
                reload: this.reload
            }
        },
        data(){
            return {
                isRouterAlive: true
            }
        },

        methods: {
            // 解决重新加载当前页面方法
            reload() {
                this.isRouterAlive = false
                this.$nextTick(() => {
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>