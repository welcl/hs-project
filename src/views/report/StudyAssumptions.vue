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
        <el-table  id="data-table1" :data="formValue.packageInfomation" border >
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
                  <span style="display: none">{{ scope.row[column.prop] }}</span>
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
        <el-table  id="data-table2" :data="formValue.depotNetworks" border >
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
                <span style="display: none">{{ scope.row[column.prop] }}</span>
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
        <el-table  id="data-table3" :data="formValue.pastIPReleases" border >
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
                  <span style="display: none">{{ scope.row[column.prop] }}</span>
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
        <el-table  id="data-table4" :data="formValue.futureIPReleases" border >
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
                  <span style="display: none">{{ scope.row[column.prop] }}</span>
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

    <el-button type="primary" @click="sheetExportExcel()">保存</el-button>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { packageInfomationColumn, PackageInfomationRowType,depotNetworksColumn,pastIPReleasesColumn,futureIPReleasesColumn } from './StudyAssumptions';
import { cloneDeep } from 'lodash-es';
import * as XLSX from 'xlsx';

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

const sheetExportExcel = () =>{
    const sheet1DataInfo:any = {};
    for(const key of Object.keys(formValue)){
      console.log(key);
      if(!['packageInfomation','depotNetworks','pastIPReleases','futureIPReleases'].includes(key)){
        sheet1DataInfo[key]= JSON.stringify(formValue[key]);
      }
    }
    console.log({sheet1DataInfo});
    let sheet1data = [sheet1DataInfo];
    var sheet = XLSX.utils.json_to_sheet(sheet1data);//新建一个工作表

      // 假设你有两个DOM元素，每个都包含表格数据
    const table1 = document.getElementById('data-table1');
    const table2 = document.getElementById('data-table2');
    const table3 = document.getElementById('data-table3');
    const table4 = document.getElementById('data-table4');
    // 将第一个表格转换为工作表的一部分
    const tableOrigin1 = 3;
    let sheet1 = XLSX.utils.table_to_sheet(table1,{
      header: 1,
      skipEmpty: true,
      origin: `A${tableOrigin1}`
    });

    // 将第二个表格的数据添加到同一个工作表中
    // 假设第二个表格后面有多少行，就在第一个表格后面添加多少空行
    
    const tableOrigin2 = tableOrigin1 + formValue.packageInfomation?.length + 5;
    let sheet2 = XLSX.utils.table_to_sheet(table2, {
      header: 1,
      skipEmpty: true,
      origin: `A${tableOrigin2}`
    });
    const tableOrigin3 =tableOrigin2 + formValue.depotNetworks?.length + 5;
  

    let sheet3 = XLSX.utils.table_to_sheet(table3, {
      header: 1,
      skipEmpty: true,
      origin: `A${tableOrigin3}`
    });

    const tableOrigin4 =  tableOrigin3 + formValue.pastIPReleases?.length+ 5;
    console.log({tableOrigin1,tableOrigin2,tableOrigin3,tableOrigin4});
    let sheet4 = XLSX.utils.table_to_sheet(table4, {
      header: 1,
      skipEmpty: true,
      origin: `A${tableOrigin4}`
    });
    
    

    // 将空行添加到工作表中，以便第二个表格的数据不会与第一个表格的数据重叠
    sheet = Object.assign({}, sheet, 3);
    sheet1 = Object.assign({}, sheet1, formValue.depotNetworks?.length - 1);
    sheet2 = Object.assign({}, sheet2, formValue.pastIPReleases?.length - 1);
    sheet3 = Object.assign({}, sheet3, formValue.futureIPReleases?.length - 1);

    // 合并两个工作表
    const mergedSheet = Object.assign({},sheet, sheet1, sheet2,sheet3,sheet4);

    // 创建工作簿并添加工作表
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, mergedSheet, 'Sheet1');

    // 生成Excel文件并导出
    XLSX.writeFile(workbook, 'StudyAssumptions.xlsx');
}

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