<!--
*@
*@author wq
*@date 2023/8/17 4:50
-->
<template>
  <el-dialog :visible="upDateDialog" title="修改员工信息" @close="updateCloseFn">
    <el-form :inline="true" :model="accuseitem" class="demo-form-inline" >
        <el-form-item label="姓名" prop="empName">
            <el-input v-model="accuseitem.empName" placeholder="姓名"></el-input>
        </el-form-item>
        <div>
            <el-form-item label="性别" prop="empSex">
                <!--                   <el-input v-model="addEmpData.empSex" placeholder="性别"></el-input>-->
                <el-radio v-model="accuseitem.sex" label="男">男</el-radio>
                <el-radio v-model="accuseitem.sex" label="女">女</el-radio>
            </el-form-item>
        </div>
        <el-form-item label="年龄" prop="empAge" type="age">
            <el-input v-model.number="accuseitem.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="empDeptName">
            <el-select v-model="accuseitem.deptName" placeholder="部门">
                <el-option label="业务部" value="业务部"></el-option>
                <el-option label="人事部" value="人事部"></el-option>
                <el-option label="后勤部" value="后勤部"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="empDegreeName">
            <el-select v-model="accuseitem.empDegreeName" placeholder="学历">
                <el-option label="大专" value="大专"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="研究生" value="研究生"></el-option>
            </el-select>
        </el-form-item>

        <el-row type="flex" justify="center">
            <el-button tpye="primary" @click="updateSub">确定</el-button>
            <el-button @click="updateCloseFn">取消</el-button>

        </el-row>

    </el-form>

    </el-dialog>
</template>

<script>
    export default {
        // name: "",

        inject:["reload"],
        props: {
            upDateDialog: {
                type: Boolean,
                default: false,

            },
            accuseitem:{
                type: [String,Object]
            }


        },


        data() {
            return {
                datae: {
                    empName: '',
                    sex: '',
                     age: '',
                    deptName: '',
                    empDegreeName: '',

                },
            }
        },
        // created() {
        //     console.log( 'child_msg',this.accuseitem)
        // },
        methods: {

            //修改员工数据
            updateSub(){

            // debugger;


                this.$axios.put('http://localhost:8078/emp/update',this.accuseitem).then((res)=>{
                    if (res.data.result=='修改成功'){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });

                        this.updateCloseFn()    //关闭弹窗

                        this.reload() //刷新页面
                    }else {
                        this.$message({
                            message: '修改失败',
                            type: 'error'
                        });

                    }  this.updateCloseFn()    //关闭弹窗

                })
            },
            //关闭弹窗
            updateCloseFn() {
                this.$emit('update:upDateDialog', false)
            },

        },

    }
</script>

<style scoped>

</style>