<template>
  <div class="assumptions-updates-scenarios-page">
   <h1 class="module-title">Assumptions Report_Huasheng Pharmatech</h1>
   <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="(Re)evaluation :">
      <el-input v-model="form.evaluation" />
    </el-form-item>
    <el-form-item label="Date of assumptions validation:">
      <el-date-picker
        v-model="form.assumptionsValidationDate"
        type="date"
        placeholder="请选择"
        clearable
      />
    </el-form-item>
    <el-form-item label="Date of the IRT extract to be used:">
      <el-date-picker
        v-model="form.extractUsedDate"
        type="date"
        placeholder="请选择"
        clearable
      />
    </el-form-item>
    <el-form-item label="Validated by :">
      <el-input v-model="form.validatedBy" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="What is the main goal of this (re)evaluation ?">
      <el-input v-model="form.validatedBy" type="textarea" placeholder="1. what should be the best overage for this clinical supply strategy assumption? 2. what should be the best site shipment frequency for this China only trial?" :autosize="{ minRows: 3, maxRows: 6 }" />
    </el-form-item>
  </el-form>

  <el-table :data="tableData1" :span-method="objectSpanMethod" border style="width: 100%">
    <el-table-column prop="setups" label="Huasheng projects setups" width="260" />
    <el-table-column prop="linkTabs" label="Link to corresponding tabs"  />
    <el-table-column prop="reevaluation" label="New assumptions since last reevaluation 
      (NA if nothing changed)" width="200"  >
      <template #default="scope">
        <el-radio-group v-model="scope.row.reevaluation" class="ml-4">
          <el-radio :value="true" size="large">Yes</el-radio>
          <el-radio :value="false" size="large">No</el-radio>
        </el-radio-group>
      </template>
    </el-table-column>
  </el-table>

  <h1 class="module-title">Please enter in table below the extra scenario(s) that must be investigated in this reevaluation</h1>
  <el-input v-model="form.validatedBy" type="textarea" placeholder="Please enter in table below the extra scenario(s) that must be investigated in this reevaluation" :autosize="{ minRows: 3, maxRows: 6 }" />

  <h1 class="module-title">The table below needs to be filled in during the assumptions validation meeting together with Huasheng</h1>
  <el-table :data="tableData2" border style="width: 100%">
    <template v-for="item of tableColumn2"  :key="item.prop" >
      <el-table-column v-if="item.prop === 'baseline'" :prop="item.prop" :label="item.prop" width="160" >
        <template #default="scope">
          
            <el-button @click="addScenario">添加</el-button>
            <el-button @click="deleteScenario">删除</el-button>
          
        </template>
      </el-table-column>
      <el-table-column v-else :prop="item.prop" :label="item.prop"  >
        <template #default="scope">
          <el-input v-model="scope.row.scenarioVal" type="textarea" placeholder="请输入" :autosize="{ minRows: 3, maxRows: 6 }" />
        </template>
      </el-table-column>
    </template>
  
  </el-table>
  </div>
</template>
<script setup lang="ts">
import { User } from '@element-plus/icons-vue/dist/types';
import { ElMessage, TableColumnCtx } from 'element-plus';
import { reactive,ref } from 'vue';
interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}


const form = reactive({
  evaluation: '',
  assumptionsValidationDate: '',
  extractUsedDate: '',
  validatedBy: '',
  requiredReevaluationScenario:''
})


const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  console.log({row,column,rowIndex,columnIndex});
  if (columnIndex === 0) {
    return {
        rowspan: row.rowspan,
        colspan: 1,
      }
  }
  
}
const tableData1 = ref([{
  setups:'Recruitment setup',
  linkTabs:'Recruitment assumptions',
  reevaluation:true,
  rowspan: 1
},
{
  setups:'Treatment setup',
  linkTabs:'Randomization',
  reevaluation:true,
  rowspan: 5
},
{
  setups:'Treatment setup',
  linkTabs:'Patient factors (weight, BSA, age..)',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Treatment setup',
  linkTabs:'Treatment visits',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Treatment setup',
  linkTabs:'Dispensing',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Treatment setup',
  linkTabs:'Patient evolution probabilities (screening faillure, drop-out & titrations)',
  reevaluation:true,
  rowspan: 0
},

{
  setups:'Network setup',
  linkTabs:'Packaging information',
  reevaluation:true,
  rowspan: 2
},
{
  setups:'Network setup',
  linkTabs:'Network routes',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Production setup',
  linkTabs:'Productions',
  reevaluation:true,
  rowspan: 2
},
{
  setups:'Production setup',
  linkTabs:'Desired depot shipments cover period',
  reevaluation:true,
  rowspan: 0
},
]);
const tableColumn2 = ref([{
  prop:'baseline',
},
{
  prop:'scenario 1',
}])
const tableData2 = ref([{
  baseline:'Recruitment setup',
  scenarioVal:'',
},
]);

const addScenario = ()=>{
  if(tableColumn2.value?.length >=5){
    return ElMessage.warning('最多添加4个场景');
  }
  tableColumn2.value.push({prop:`scenario ${tableColumn2.value.length}`})
}

const deleteScenario = ()=>{
  if(tableColumn2.value?.length ===2){
    return ElMessage.warning('最少存1个场景');
  }
  tableColumn2.value.pop();
}

</script>
<style lang="scss" scoped>
.assumptions-updates-scenarios-page{
  color:#242933;
  .module-title{
    text-align: center;
    padding:16px;
    font-size: 24px;
  }
}
</style>