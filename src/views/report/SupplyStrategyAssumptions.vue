<template>
  <div class="supply-strategy-assumptions">
    <h1 class="module-title">Study Assumptions </h1>
    <el-form :model="formValue" label-width="auto" style="max-width: 800px">
      <el-form-item label="Randomization level:">
        <el-input v-model="formValue.studyAssumptions" />
      </el-form-item>
      
      <el-form-item label="Please indicate the enrollment stopping criterion:">
        <el-date-picker
          v-model="formValue.stoppingCriterion"
          type="date"
          placeholder="请选择"
          clearable
        />
      </el-form-item>
      <el-form-item label="Is there a 'hard trial stopping date'?*">
        <el-radio-group v-model="formValue.stoppingDate"  class="ml-4">
          <el-radio :value="true" size="large">Yes</el-radio>
          <el-radio :value="false" size="large">No</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <h3 class="module-title-h3">* A hard trial stopping date means that the trial will end at a specific date, even if patients have not finished their treatment</h3>
    <div  class="supply-strategy-assumptions-content">
      <div style="margin-bottom:8px;">
        <el-button  type="primary" size="small" @click="addRandomization">添加</el-button>
        <el-button  size="small" @click="deleteRandomization">删除</el-button>
      </div>
      <el-table :data="formValue.randomizationDetails" border show-summary >
        <el-table-column prop="randomizationDetails" label="Randomization Details : " align="center">
          <template v-for="(column,index) of randomizationDetailsColumn" :key="index">
            <el-table-column  :prop="column.prop" :label="column.label" :sortable="column.sortable" :min-width="column.width ?? 120" >
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
                <el-input v-if="column.type === 'text'" type="text" v-model="scope.row[column.prop]" />
                <el-input-number v-else-if="column.type === 'number'" type="number" :min="column.min" :max="column.max" :controls="false" :precision="column.precision" v-model="scope.row[column.prop]" />  
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <h1 class="module-title">Patient Visit schedule </h1>
    <div class="patient-visit-schedule-content">
      <template v-for="(item,index) of formValue.patientVisitSchedule" :key="index">
        <el-table :data="item" border class="patient-visit-schedule-content-table" >
          <el-table-column prop="dispensingPlan" :label="'Description of Arm '+ formValue.randomizationDetails![index]?.arm + ' treatment plan and IMP dispensing plan'" align="center">
            <template v-for="(column,index) of patientVisitScheduleColumn" :key="index">
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
              <el-input v-if="column.type === 'text'" type="text" v-model="scope.row[column.prop]" />
              <el-input-number v-else-if="column.type === 'number'" type="number" :min="column.min" :max="column.max" :controls="false" :precision="column.precision" v-model="scope.row[column.prop]" />  
              </template>
            </el-table-column>
            </template>
          </el-table-column>
        </el-table> 
      </template>
    </div>
    <div class="screen-failure">
      <h1 class="module-title">Screen failure, drop-out and titrations </h1>
      <h3 class="module-title-h3">Drop-out</h3>
      <div class="screen-failure-item-layout">
        <div class="desc">Do you want to consider a drop-out rate assumption that is identical or different per treatment arm?</div>
        <el-radio-group v-model="formValue.screenFailure.dropOutArm"  class="ml-4">
          <el-radio :value="true" size="large">Yes</el-radio>
          <el-radio :value="false" size="large">No</el-radio>
        </el-radio-group>
      </div>
      <div class="screen-failure-item-layout">
        <div class="desc">What is the targeted indication? Please describe into details </div>
        <el-input type="textarea" v-model="formValue.screenFailure.describeDetails" />
      </div>
      <div class="screen-failure-item-layout">
        <div class="desc">Do you have a drop-out rate assumption that is global or at country/region specific? </div>
        <el-input type="textarea" v-model="formValue.screenFailure.dropOutCountry" />
      </div>
      <el-table :data="formValue.screenFailure.expectedSummary" border >
        <template v-for="(column,index) of screenFailureExpectedSummaryColumn" :key="index">
          <el-table-column  :prop="column.prop" :label="column.label" :min-width="column.width ?? 120" >
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
              <el-input v-if="column.type === 'text'" type="text" v-model="scope.row[column.prop]" />
              <el-input-number v-else-if="column.type === 'number'" type="number" :min="column.min" :max="column.max" :controls="false" :precision="column.precision" v-model="scope.row[column.prop]" />  
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <div class="dispensing-plan">
      <h1 class="module-title">Dispensing plan</h1>
    </div>

    <div class="Recruitment">
      <h1 class="module-title">Recruitment</h1>
    </div>
   
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import {  cloneDeep } from 'lodash';
import { reactive } from 'vue';
import { randomizationDetailsColumn,patientVisitScheduleColumn,screenFailureExpectedSummaryColumn } from './SupplyStrategyAssumptions';

const randomizationDetailsItem = {arm:'',countries:'',randomization:'',pts:''}
const patientVisitScheduleItem = {treatmentVisit:'',studyWeek:'',timeToVisit:'',drugA:'',drugB:'',drugC:'',drugD:''}
const patientVisitScheduleItemArray = new Array(10);

patientVisitScheduleItemArray.fill(cloneDeep(patientVisitScheduleItem));
console.log({patientVisitScheduleItemArray});

const formValue = reactive({
  studyAssumptions:'',
  stoppingCriterion: '',
  stoppingDate: false,
  randomizationDetails:[cloneDeep(randomizationDetailsItem)],
  patientVisitSchedule:[patientVisitScheduleItemArray],
  screenFailure:{
    dropOutArm: false,
    describeDetails:'',
    dropOutCountry:'',
    expectedSummary:[{
      expectedMax:'',
      expectedAverage:'',
      expectedStudy:''
    }]
  }
})




const MAX_NUMS = 5;
const MIN_NUMS = 1;

const addRandomization = async ()=>{
  if(formValue?.randomizationDetails?.length >= MAX_NUMS){
    return ElMessage.warning(`最多添加${MAX_NUMS}个label group`);
  } 
  formValue.randomizationDetails.push(cloneDeep(randomizationDetailsItem))
  formValue.patientVisitSchedule.push(cloneDeep(patientVisitScheduleItemArray));
}

const deleteRandomization = async ()=>{
  if(formValue?.randomizationDetails?.length <= MIN_NUMS){
    return ElMessage.warning(`最少存在添加${MIN_NUMS}个label group`);
  } 
  formValue.randomizationDetails.pop();
  formValue.patientVisitSchedule.pop();
}
</script>
<style lang="scss" scoped>
.supply-strategy-assumptions{
  color:#242933;
  .module-title{
    text-align: center;
    padding:16px;
    font-size: 24px;
  }
  .module-title-h3{
    text-align: center;
    padding:8px;
    font-size: 16px;
  }
  .patient-visit-schedule-content-table:not(:last-child){
    margin-bottom: 16px;
  }
  .screen-failure-item-layout{
    display: flex;
    .desc{
      flex: 0 0 400px;
      padding: 12px;
    }
  }
}
</style>