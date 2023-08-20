

<template>

    <div>


        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formInline.emp_name" placeholder="姓名"></el-input>
            </el-form-item>

            <!--        部门 学历 下拉框应该在后端查询，不是在前端写死-->
            <el-form-item>
                <el-select v-model="formInline.dept_name" placeholder="部门">
                    <el-option label="" value="">全部</el-option>
                    <el-option label="业务部" value="业务部"></el-option>
                    <el-option label="人事部" value="人事部"></el-option>
                    <el-option label="后勤部" value="后勤部"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="formInline.emp_degree_name" placeholder="学历">
                    <el-option label="" value="">全部</el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="研究生" value="研究生"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
                <el-button type="primary" icon="el-add" @click="addEmpSub">添加</el-button>
                <el-button type="primary"   @click="downLoadExcel">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="编号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="empName"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="deptName"
                    label="部门名称">
            </el-table-column>
            <el-table-column
                    prop="empDegreeName"
                    label="学历">
            </el-table-column>

            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" @click="deleteEmp(scope.row.id)" size="small">删除</el-button>
                    <el-button type="primary" @click="updateEmp(scope.row)" size="small" >编辑</el-button>

                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <div class="block" style="margin-top:15px;">
            <el-pagination background align='center' @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="pageNo"
                           :page-sizes="[2, 3, 5]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>

        </div>
        <!--添加员工弹窗-->
        <addEmp :show-dialog.sync="DialogVisible" @close="addCloseFn"></addEmp>
        <!-- 修改员工弹窗-->
        <updateEmp :up-date-dialog.sync="UpdateVisible"  @close="updateCloseFn"  ref="dictDataEditDialog" :accuseitem="upDateEmpData"></updateEmp>

    </div>

</template>
<script>

    import addEmp from "./AddEmp.vue"
    import updateEmp from "./UpDateEmp.vue"
    export default {
        inject:["reload"],
        name: "StudentList",

        data() {
            return {
                tableData: [],
                DialogVisible: false, //添加员工弹窗是否显示

                deleVisible: false, //删除员工弹窗是否显示
                upDateEmpData: '',  //
                // accuseVisible: false,
                UpdateVisible: false, //修改员工弹窗是否显示
                pageNo: 1,
                pageSize: 5,
                total: 0,
                formInline: {   //条件查询
                    emp_name: '',
                    dept_name: '',  //部门名称
                    emp_degree_name: '', //学历

                }
            }
        },
        components: {
            addEmp,  //员工添加弹窗
            updateEmp //员工修改弹窗
        },

        created() {
            this.getList()
        },
        methods: {
            handleSizeChange(val) { // 修改每页所存数据量的值所触发的函数
                this.pageSize = val;// 修改页的大小
                this.getList();       // 按新的pageNo和pageSize进行查询
            },
            handleCurrentChange(val) { // 修改当前页所触发的函数
                this.pageNo = val;       // 更新当前的页
                this.getList();          // 按新的pageNo和pageSize进行查询
            },
            //查询员工列表
            getList() {
                this.$axios.post('http://localhost:8078/emp/list?pageNo=' + this.pageNo + "&pageSize=" + this.pageSize
                    , this.formInline).then((res) => {
                    this.tableData = res.data.result
                    this.total = res.data.total

                }).catch((err) => {
                })
            },

            //模糊查询方法
            onSearch() {
                this.pageNo = 1//查询之前，要先确保分页查询的当前页面在第一页
                this.getList();
            },
            //添加员工时弹窗
            addEmpSub() {
                this.DialogVisible = true
            },

            //修改员工弹窗
            updateEmp(data) {
                this.upDateEmpData = data
                // this.$refs.dictDataEditDialog.get()
                this.UpdateVisible = true


                // this.UpdateVisible = true

            },
            //关闭添加员工弹窗
            addCloseFn() {
                this.DialogVisible = false
            },
            //关闭修改员工弹窗
            updateCloseFn(){
                this.UpdateVisible=false
            },

            //删除员工
            deleteEmp(id) {
                this.$confirm('确定删除该员工吗？, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$axios.delete('http://localhost:8078/emp/deleteEmp/' + id).then((res) => {
                            //在此书写点击确定按钮以后的操作
                            if (res.data.result == "删除成功") {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.reload() //刷新页面
                            } else {  //删除失败
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        },
                    )

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //导出数据
            downLoadExcel() {
                this.$axios.post('http://localhost:8078/downLoadExcel', this.formInline, {responseType: 'blob'}).then((res) => {
                    // return res.blob()
                    // console.log(res.data)
                    const link = document.createElement('a')
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
                    link.style.display = 'none'
                    link.href = URL.createObjectURL(blob);
                    console.log("href:" + link.href)
                    let num = ''
                    for (let i = 0; i < 10; i++) {
                        num += Math.ceil(Math.random() * 10)
                    }
                    link.setAttribute('download', num + '.xls')
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)


                })




            }


        }


    }
</script>
<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>