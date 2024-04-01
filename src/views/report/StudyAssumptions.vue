<template>
  <div class="study-assumptions-page">
    <div class="packaging-information">
      <h1 class="module-title">Packaging Information</h1>
      <div class="package-infomation-content">
        <div class="package-infomation-content-left">
          <div >Are there labeled supplies (Label group) only specific for certain countries?  Yes or no? If yes, please fill into the table on the right.</div>
          <el-radio-group v-model="formValue.hasLabelGroups"  class="ml-4">
            <el-radio :value="true" size="large">Yes</el-radio>
            <el-radio :value="false" size="large">No</el-radio>
          </el-radio-group>
        </div>
        <div v-if="formValue.hasLabelGroups" class="label-groups-content">
          <div style="margin-bottom:8px;">
            <el-button  type="primary" size="small" @click="addLabelGroups">Add</el-button>
            <el-button  size="small" @click="deleteLabelGroups">Delete</el-button>
          </div>
          <el-table :data="formValue.labelGroups" border style="width: 100%">
            <el-table-column prop="labelgroup" label="Label group">
              <template #default="scope">
                <el-input v-model="scope.row.labelGroup" placeholder="Please input"  />
              </template>
            </el-table-column>
            <el-table-column prop="countries" label="Countries">
              <template #default="scope">
                <el-input v-model="scope.row.countries" placeholder="Please input"  />
              </template>
            </el-table-column>
            <el-table-column prop="kitType" label="Kit type" >
              <template #default="scope">
                <el-input v-model="scope.row.kitType" placeholder="Please input"  />
              </template>
              </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="package-infomation-table">
        <div style="margin-bottom:8px;">
          <el-button  type="primary" size="small" @click="addPackageInfomation">Add</el-button>
          <el-button  size="small" @click="deletePackageInfomation">Delete</el-button>
        </div>
        <el-table :data="formValue.packageInfomation" border >
          <el-table-column prop="packageInfomation" label="Packaging information" align="center">
            <template v-for="(column,index) of packageInfomationColumn" :key="index">
              <el-table-column  :prop="column.prop" :label="column.label" :fixed="column?.fixed" :min-width="column.width ?? 120" >
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
                  <el-input-number v-else-if="column.type === 'number'" type="number" :min="column.min" :max="column.max" :controls="false" v-model="scope.row[column.prop]" />
                  <div v-else-if="column.type === 'amount'" style="display:flex">
                    <el-input-number  type="number" :precision="2"  :min="column.min" :max="column.max"  :controls="false" v-model="scope.row[column.prop]" />
                    <el-button @click="switchUnit(scope.row)">{{scope.row.unit}}</el-button>
                  </div>
                </template>
              </el-table-column>
            </template>
            
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="depot-networks">
      <h1 class="module-title">Depot Networks</h1>
      <div class="depot-networks-table">
        <el-table :data="formValue.depotNetworks" border >
          <template v-for="(column,index) of depotNetworksColumn" :key="index">
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
                <el-input-number v-else-if="column.type === 'number'" type="number" :min="column.min" :max="column.max" :controls="false" v-model="scope.row[column.prop]" />
                <div v-else-if="column.type === 'amount'" style="display:flex">
                  <el-input-number  type="number" :precision="2"  :min="column.min" :max="column.max"  :controls="false" v-model="scope.row[column.prop]" />
                  <el-button @click="switchUnit(scope.row)">{{scope.row.unit}}</el-button>
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>

    <div class="productions-depot-shipments">
      <h1 class="module-title">Productions and depot shipments cover period</h1>
      <h3 class="module-title-h3">Past IP releases (For revaluation or initial evaluation with historical data)</h3>
      <div class="productions-depot-past-IMP-releases-table">
        <el-table :data="formValue.pastIPReleases" border >
          <el-table-column prop="releasedPackagingCampaigns" label="Already released packaging campaigns (past IMP releases)" align="center">
            <template v-for="(column,index) of pastIPReleasesColumn" :key="index">
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
                  <el-input-number v-else-if="column.type === 'number'" type="number" :min="column?.min" :max="column?.max" :controls="false" v-model="scope.row[column.prop]" />
                  <div v-else-if="column.type === 'amount'" style="display:flex">
                    <el-input-number  type="number" :precision="2"  :min="column?.min" :max="column?.max"  :controls="false" v-model="scope.row[column.prop]" />
                    <el-button @click="switchUnit(scope.row)">{{scope.row.unit}}</el-button>
                  </div>
                  <el-date-picker v-else-if="column.type === 'date'" style="width:180px" v-model="scope.row[column.prop]" type="date" placeholder="Select"/>
                </template>
              </el-table-column>
            </template>
            
          </el-table-column>
        </el-table>
      </div>

      <h3 class="module-title-h3">Confirmed Future IP releases ( can leave as empty in case no future release plan)</h3>
      <div class="productions-depot-future-IMP-releases-table">
        <el-table :data="formValue.futureIPReleases" border >
          <el-table-column prop="futureImpReleases" label="Future IMP releases" align="center">
            <template v-for="(column,index) of futureIPReleasesColumn" :key="index">
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
                  <el-input-number v-else-if="column.type === 'number'" type="number" :min="column?.min" :max="column?.max" :controls="false" v-model="scope.row[column.prop]" />
                  <div v-else-if="column.type === 'amount'" style="display:flex">
                    <el-input-number  type="number" :precision="2"  :min="column?.min" :max="column?.max"  :controls="false" v-model="scope.row[column.prop]" />
                    <el-button @click="switchUnit(scope.row)">{{scope.row.unit}}</el-button>
                  </div>
                  <el-date-picker v-else-if="column.type === 'date'" style="width:180px" v-model="scope.row[column.prop]" type="date" placeholder="Select"/>
                </template>
              </el-table-column>
            </template>
            
          </el-table-column>
        </el-table>
      </div>

      <div class="preferred-release">
        <div>Preferred release frequency per kit type (e.g. max every x months)</div>
        <el-input type="textarea" placeholder="Please input"></el-input>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { packageInfomationColumn, PackageInfomationRowType,depotNetworksColumn,pastIPReleasesColumn,futureIPReleasesColumn } from './StudyAssumptions';
import { cloneDeep } from 'lodash-es';
const MAX_NUMS = 10;
const MIN_NUMS = 1;
const packageInfomationItem = {
  kitType:'',
  labelGroup:'',
  temperatureType:'',
  remainingShelfLife:'',
  costPerBatch:'',
  costPerUnit:'',
  packagingCostPerBatch:'',
  packagingCostPerUnit:'',
  commercialValue:'',
  leadTime:'',
  localSourcing:'',
  unit: '¥',
};

const depotNetworksItem = {
  centraldepot:'',
  localDepot:'',
  tiemLocalDepot:'',
  country:'',
  localDepotCountry:'',
  siteSetUp:'',
  shipment:'',
  costPer:'',
  unit: '¥',
};

const pastIPReleasesItem = {
  releaseDate:'',
  packageType:'',
  labelGroup:'',
  confirmedExpiryDate:'',
  lotNumber:'',
  kits:'',
};

const futureIPReleasesItem = {
  releaseDate:'',
  packageType:'',
  labelGroup:'',
  confirmedExpiryDate:'',
  lotNumber:'',
  fixedQuantity:'',
  fixedReleaseDate:'',
  kits:'',
};

const formValue = reactive({
  hasLabelGroups: true,
  labelGroups: [{labelgroup:'',countries:'',kitType:''}],
  packageInfomation:[cloneDeep(packageInfomationItem)],
  depotNetworks: [cloneDeep(depotNetworksItem)],
  pastIPReleases:[cloneDeep(pastIPReleasesItem)],
  futureIPReleases:[cloneDeep(futureIPReleasesItem)],
})

const addLabelGroups = async ()=>{
  if(formValue?.labelGroups?.length >= MAX_NUMS){
    return ElMessage.warning(`Add up to${MAX_NUMS}个label group`);
  } 
  formValue.labelGroups.push({labelgroup:'',countries:'',kitType:''})
}

const deleteLabelGroups = async ()=>{
  if(formValue?.labelGroups?.length <= MIN_NUMS){
    return ElMessage.warning(`At least ${MIN_NUMS} exists`);
  } 
  formValue.labelGroups.pop()
}

const switchUnit = (row:PackageInfomationRowType)=>{
  console.log({row});
  row.unit = row.unit === '$' ? '¥' : '$';
}


const addPackageInfomation = async ()=>{
  if(formValue?.packageInfomation?.length >= MAX_NUMS){
    return ElMessage.warning(`Add up to${MAX_NUMS}个label group`);
  } 
  formValue.packageInfomation.push(cloneDeep(packageInfomationItem))
}

const deletePackageInfomation = async ()=>{
  if(formValue?.packageInfomation?.length <= MIN_NUMS){
    return ElMessage.warning(`At least ${MIN_NUMS} exists`);
  } 
  formValue.packageInfomation.pop()
}

</script>
<style lang="scss" scoped>
.study-assumptions-page{
  color:#242933;
  .module-title{
    text-align: center;
    padding:16px;
    font-size: 24px;
    background:#2196F3;
    color:#fff;
  }
  .module-title-h3{
    text-align: center;
    padding:8px;
    font-size: 16px;
  }
  .package-infomation-content{
    display: flex;
    .package-infomation-content-left{
      flex: 0 1 400px;
    }
    .label-groups-content{
       flex:1
    }
  }
  .package-infomation-table{
    
  }
  .preferred-release{
    display:flex;
    padding: 16px;  
  }
}
:deep(.el-input-number .el-input){
  max-width: 100px !important; 
  min-width: 60px !important
}
</style>