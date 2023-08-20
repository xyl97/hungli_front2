<!--
*@
*@author wq
*@date 2023/8/16 21:09
-->
<template>
    <!--   <div>-->
    <el-dialog :visible="showDialog" title="新增职工" @close="addCloseFn">
        <el-form :inline="true" :model="addEmpData" class="demo-form-inline" :rules="rules" ref="addEmpDataFrom">
            <el-form-item label="姓名" prop="empName">
                <el-input v-model="addEmpData.empName" placeholder="姓名"></el-input>
            </el-form-item>
            <div>
                <el-form-item label="性别" prop="empSex">
                    <!--                   <el-input v-model="addEmpData.empSex" placeholder="性别"></el-input>-->
                    <el-radio v-model="addEmpData.empSex" label="男">男</el-radio>
                    <el-radio v-model="addEmpData.empSex" label="女">女</el-radio>
                </el-form-item>
            </div>
            <el-form-item label="年龄" prop="empAge" type="age">
                <el-input v-model.number="addEmpData.empAge" placeholder="年龄"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="empDeptName">
                <el-select v-model="addEmpData.empDeptName" placeholder="部门">
                    <el-option label="业务部" value="业务部"></el-option>
                    <el-option label="人事部" value="人事部"></el-option>
                    <el-option label="后勤部" value="后勤部"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学历" prop="empDegreeName">
                <el-select v-model="addEmpData.empDegreeName" placeholder="学历">
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="研究生" value="研究生"></el-option>
                </el-select>
            </el-form-item>

            <el-row type="flex" justify="center">
                <el-button tpye="primary" @click="addEmpSub">确定</el-button>
                <el-button @click="addCloseFn">取消</el-button>

            </el-row>

        </el-form>
        <!--   </div>-->
    </el-dialog>
</template>

<script>
    export default {
        // name: "AddEmp",

        inject:["reload"],
        props: {
            showDialog: {
                type: Boolean,
                default: false,
            },

        },
        data() {
            return {
                addEmpData: {
                    empName: '',
                    empSex: '',
                    empAge: '',
                    empDeptName: '',
                    empDegreeName: '',

                },

                rules: {
                    empName: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
                    empSex: [{required: true, message: '性别不能为空', trigger: 'blur'}],
                    empAge: [{required: true, message: '年龄不能为空', trigger: 'blur'},
                        { type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
                    ],
                    empDeptName: [{required: true, message: '部门不能为空', trigger: 'blur'}],
                    empDegreeName: [{required: true, message: '学历不能为空', trigger: 'blur'}],
                }

            }

        },
        methods: {


            addEmpSub() {
                //校验
                this.$refs.addEmpDataFrom.validate((valid) => {
                    if (valid) {
                        // alert("成功")
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }

                    //添加职工
                    this.$axios.post('http://localhost:8078/emp/add'
                        , this.addEmpData).then((res) => {

                        if (res.data.result == '添加成功') {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });

                            this.addCloseFn()    //关闭弹窗
                            this.$refs['addEmpDataFrom'].resetFields();//清空表单
                            this.reload() //刷新页面
                        } else {
                            this.$message({  //添加失败
                                message: res.data.msg,
                                type: 'error'
                            });
                        }

                    }).catch((err) => {
                        console.log(err)
                    })

                })
            },
            //关闭弹窗
            addCloseFn() {
                this.$emit('update:showDialog', false)
            }
        }
    }
</script>

<style scoped>

</style>