<template>
  <div class="assumptions-updates-scenarios-page">
   <h1 class="module-title">Assumptions Report_Huasheng Pharmatech</h1>
   <el-form :model="form" label-width="auto" style="max-width: 800px;padding:12px 0px">
    <el-form-item label="(Re)evaluation :">
      <el-select v-model="form.evaluation" >
        <el-option label="Initial Report" value="Initial Report" />
        <el-option label="Reevaluation Report" value="Reevaluation Report" />
       </el-select>
    </el-form-item>
    <el-form-item label="Date of assumptions validation:">
      <el-date-picker
        v-model="form.assumptionsValidationDate"
        type="date"
        placeholder="Select"
        clearable
      />
    </el-form-item>
    <el-form-item label="Date of the IRT extract to be used:">
      <el-date-picker
        v-model="form.extractUsedDate"
        type="date"
        placeholder="Select"
        clearable
      />
    </el-form-item>
    <el-form-item label="Validated by :">
      <el-select v-model="form.validatedByType" >
        <el-option label="Clinschain's PM" value="Clinschain's PM" />
        <el-option label="Huasheng's PM" value="Huasheng's PM" />
       </el-select>
       <el-input v-model="form.validatedBy" placeholder="Please input" />
    </el-form-item>

    <el-form-item label="What is the main goal of this (re)evaluation ?">
      <el-input v-model="form.goalEvaluation" type="textarea" placeholder="1. what should be the best overage for this clinical supply strategy assumption? 2. what should be the best site shipment frequency for this China only trial?" :autosize="{ minRows: 3, maxRows: 6 }" />
    </el-form-item>
    </el-form>

    <el-table :data="tableData1" :span-method="objectSpanMethod" border style="width: 100%">
      <el-table-column prop="setups" label="Huasheng projects setups" width="260" />
      <el-table-column prop="linkTabs" label="Link to corresponding tabs"  />
      <el-table-column prop="reevaluation" label="New assumptions since last reevaluation 
        (NA if nothing changed)" width="200"  >
        <template #default="scope">
          <el-switch v-model="scope.row.reevaluation" />
        </template>
      </el-table-column>
    </el-table>

    <h3 class="module-title-h3">Please enter in table below the extra scenario(s) that must be investigated in this reevaluation</h3>
    <el-input v-model="form.investigatedReevaluation" type="textarea" placeholder="Please enter in table below the extra scenario(s) that must be investigated in this reevaluation" :autosize="{ minRows: 3, maxRows: 6 }" />

    <el-table :data="tableData2" border style="width: 100%">
      <template v-for="(item, index) of tableColumn2"  :key="item.prop" >
        <el-table-column v-if="item.prop === 'baseline'" :prop="item.prop" :label="item.prop" width="200" >
          <template #default>
              <el-button @click="addScenario">Add</el-button>
              <el-button @click="deleteScenario">Delete</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else :prop="item.prop" :label="item.prop"  >
          <template #default="scope">
            <el-input v-model="scope.row.scenarioVal[index+1]" type="textarea" placeholder="Please input" :autosize="{ minRows: 3, maxRows: 6 }" />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <h3 class="module-title-h3">The table below needs to be filled in during the assumptions validation meeting together with Huasheng</h3>
    <div class="analysis-result-table" v-for="analysisResult of form.analysisResult" :key="analysisResult">
      <el-table :data="analysisResult" border >
        <el-table-column prop="analysisResult" label="Analysis provided in final results" align="center">
          <template v-for="(column,index) of analysisResultColumn" :key="index">
            <el-table-column  :prop="column.prop" :label="column.label"  :min-width="column.width ?? 120" >
                <template #header>
                  {{ column.label }}
                  <el-tooltip v-if="column.tips"
                    class="box-item"
                    effect="dark"
                    :content="column.tips"
                    placement="top"
                  >
                  <el-icon ><InfoFilled /></el-icon>
                  </el-tooltip>
                </template>
                <template #default="scope">
                  <el-switch v-if="column.type === 'radio'" v-model="scope.row[column.prop]" />
                </template>
              </el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { User } from '@element-plus/icons-vue/dist/types';
import { ElMessage, TableColumnCtx } from 'element-plus';
import { cloneDeep } from 'lodash';
import { reactive,ref } from 'vue';
import { analysisResultColumn } from './AssumptionsUpdatesScenarios';
interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}
const MAX_NUMS = 10;
const MIN_NUMS = 1;
const tableColumn2 = ref([{
  prop:'Baseline',
},
{
  prop:'Scenario 1',
}])

const tableData1 = ref([{
  setups:'Study Assumptions',
  linkTabs:'Recruitment Assumptions',
  reevaluation:true,
  rowspan: 6
},
{
  setups:'Study Assumptions',
  linkTabs:'Randomization',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Study Assumptions',
  linkTabs:'Patient Factors (weight, BSA, age..)',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Study Assumptions',
  linkTabs:'Treatment Visits',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Study Assumptions',
  linkTabs:'Dispensing',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Study Assumptions',
  linkTabs:'Patient evolution probabilities (screening faillure, drop-out & titrations)',
  reevaluation:true,
  rowspan: 0
},

{
  setups:'Supply Strategy Assumptions',
  linkTabs:'Packaging Information',
  reevaluation:true,
  rowspan: 4
},
{
  setups:'Supply Strategy Assumptions',
  linkTabs:'Network Routes',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Supply Strategy Assumptions',
  linkTabs:'Productions',
  reevaluation:true,
  rowspan: 0
},
{
  setups:'Supply Strategy Assumptions',
  linkTabs:'Desired depot shipments cover period',
  reevaluation:true,
  rowspan: 0
},
]);

const tableData2 = ref([{
  baseline:'Recruitment Setup',
  scenarioVal:[],
  },
]);
const analysisResult = ref([{
    executiveSummary:true,
    lCurve:true,
    supplyPlan:true,
    depotShipmentsPlan:false,
    monthlyKitDispensing:true,
    recruitment:true,
    riskAtSites:true
  },
  {
    executiveSummary:false,
    lCurve:false,
    supplyPlan:false,
    depotShipmentsPlan:false,
    monthlyKitDispensing:false,
    recruitment:false,
    riskAtSites:false
  },
  {
    executiveSummary:false,
    lCurve:false,
    supplyPlan:false,
    depotShipmentsPlan:false,
    monthlyKitDispensing:false,
    recruitment:false,
    riskAtSites:false
  },
]);
const form = reactive({
  evaluation: '',
  assumptionsValidationDate: '',
  extractUsedDate: '',
  validatedBy: '',
  goalEvaluation: '',
  validatedByType: '',
  investigatedReevaluation:'',
  requiredReevaluationScenario:'',
  tableData1:tableData1.value,
  tableData2:tableData2.value,
  analysisResult:[analysisResult.value]
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


const addScenario = ()=>{
  if(tableColumn2.value?.length >=MAX_NUMS){
    return ElMessage.warning(`Add up to${MAX_NUMS}`);
  }
  tableColumn2.value.push({prop:`scenario ${tableColumn2.value.length}`})
  form.analysisResult.push(cloneDeep(analysisResult.value));
}

const deleteScenario = ()=>{
  if(tableColumn2.value?.length ===2){
    return ElMessage.warning(`At least ${MIN_NUMS} exists`);
  }
  tableColumn2.value.pop();
  form.analysisResult.pop();
}

</script>
<style lang="scss" scoped>
.assumptions-updates-scenarios-page{
  color:#242933;
  .module-title{
    text-align: center;
    padding:16px;
    font-size: 24px;
    background:#ccc;
    color:#fff;
  }
  .module-title-h3{
    text-align: center;
    padding:8px;
    font-size: 16px;
  }
  .analysis-result-table{
    margin-top: 16px;
  }
}
</style>