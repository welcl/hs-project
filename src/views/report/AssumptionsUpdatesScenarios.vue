<template>
  <div class="assumptions-updates-scenarios-page">
    <h1 class="module-title">Assumptions Report_Huasheng Pharmatech</h1>
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 800px; padding: 12px 0px"
    >
      <el-form-item label="(Re)evaluation :">
        <el-select v-model="form.evaluation">
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
        <el-select v-model="form.validatedByType">
          <el-option label="Clinschain's PM" value="Clinschain's PM" />
          <el-option label="Huasheng's PM" value="Huasheng's PM" />
        </el-select>
        <el-input v-model="form.validatedBy" placeholder="Please input" />
      </el-form-item>

      <el-form-item label="What is the main goal of this (re)evaluation ?">
        <el-input
          v-model="form.goalEvaluation"
          type="textarea"
          placeholder="1. what should be the best overage for this clinical supply strategy assumption? 2. what should be the best site shipment frequency for this China only trial?"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </el-form-item>
    </el-form>

    <el-table
      id="data-table1"
      :data="tableData1"
      :span-method="objectSpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="setups"
        label="Huasheng projects setups"
        width="260"
      />
      <el-table-column prop="linkTabs" label="Link to corresponding tabs" />
      <el-table-column
        prop="reevaluation"
        label="New assumptions since last reevaluation 
        (NA if nothing changed)"
        width="200"
      >
        <template #default="scope">
          <span style="display: none">{{ scope.row.reevaluation }}</span>
          <el-switch v-model="scope.row.reevaluation" />
        </template>
      </el-table-column>
    </el-table>

    <h3 class="module-title-h3"
      >Please enter in table below the extra scenario(s) that must be
      investigated in this reevaluation</h3
    >
    <el-input
      v-model="form.investigatedReevaluation"
      type="textarea"
      placeholder="Please enter in table below the extra scenario(s) that must be investigated in this reevaluation"
      :autosize="{ minRows: 3, maxRows: 6 }"
    />

    <el-table id="data-table2" :data="tableData2" border style="width: 100%">
      <template v-for="(item, index) of tableColumn2" :key="item.prop">
        <el-table-column
          v-if="item.prop === 'baseline'"
          :prop="item.prop"
          :label="item.prop"
          width="200"
        >
          <template #default>
            <el-button @click="addScenario">Add</el-button>
            <el-button @click="deleteScenario">Delete</el-button>
          </template>
        </el-table-column>
        <el-table-column v-else :prop="item.prop" :label="item.prop">
          <template #default="scope">
            <span style="display: none">{{
              scope.row.scenarioVal[index + 1]
            }}</span>
            <el-input
              v-model="scope.row.scenarioVal[index + 1]"
              type="textarea"
              placeholder="Please input"
              :autosize="{ minRows: 3, maxRows: 6 }"
            />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <h3 class="module-title-h3"
      >The table below needs to be filled in during the assumptions validation
      meeting together with Huasheng</h3
    >
    <div
      class="analysis-result-table"
      v-for="analysisResult of form.analysisResult"
      :key="analysisResult"
    >
      <el-table id="data-table3" :data="analysisResult" border>
        <el-table-column
          prop="analysisResult"
          label="Analysis provided in final results"
          align="center"
        >
          <template
            v-for="(column, index) of analysisResultColumn"
            :key="index"
          >
            <el-table-column
              :prop="column.prop"
              :label="column.label"
              :min-width="column.width ?? 120"
            >
              <template #header>
                {{ column.label }}
                <el-tooltip
                  v-if="column.tips"
                  class="box-item"
                  effect="dark"
                  :content="column.tips"
                  placement="top"
                >
                  <el-icon><InfoFilled /></el-icon>
                </el-tooltip>
              </template>
              <template #default="scope">
                <span style="display: none">{{ scope.row[column.prop] }}</span>
                <el-switch
                  v-if="column.type === 'radio'"
                  v-model="scope.row[column.prop]"
                />
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-button type="primary" @click="sheetExportExcel()">保存</el-button>
  </div>
</template>
<script setup lang="ts">
import { User } from '@element-plus/icons-vue/dist/types';
import { ElMessage, TableColumnCtx } from 'element-plus';
import { cloneDeep } from 'lodash';
import { reactive, ref } from 'vue';
import { analysisResultColumn } from './AssumptionsUpdatesScenarios';
import * as XLSX from 'xlsx';

interface SpanMethodProps {
  row: User;
  column: TableColumnCtx<User>;
  rowIndex: number;
  columnIndex: number;
}
const MAX_NUMS = 10;
const MIN_NUMS = 1;
const tableColumn2 = ref([
  {
    prop: 'Baseline'
  },
  {
    prop: 'Scenario 1'
  }
]);

const tableData1 = ref([
  {
    setups: 'Study Assumptions',
    linkTabs: 'Recruitment Assumptions',
    reevaluation: true,
    rowspan: 6
  },
  {
    setups: 'Study Assumptions',
    linkTabs: 'Randomization',
    reevaluation: true,
    rowspan: 0
  },
  {
    setups: 'Study Assumptions',
    linkTabs: 'Patient Factors (weight, BSA, age..)',
    reevaluation: true,
    rowspan: 0
  },
  {
    setups: 'Study Assumptions',
    linkTabs: 'Treatment Visits',
    reevaluation: true,
    rowspan: 0
  },
  {
    setups: 'Study Assumptions',
    linkTabs: 'Dispensing',
    reevaluation: true,
    rowspan: 0
  },
  {
    setups: 'Study Assumptions',
    linkTabs:
      'Patient evolution probabilities (screening faillure, drop-out & titrations)',
    reevaluation: true,
    rowspan: 0
  },

  {
    setups: 'Supply Strategy Assumptions',
    linkTabs: 'Packaging Information',
    reevaluation: true,
    rowspan: 4
  },
  {
    setups: 'Supply Strategy Assumptions',
    linkTabs: 'Network Routes',
    reevaluation: true,
    rowspan: 0
  },
  {
    setups: 'Supply Strategy Assumptions',
    linkTabs: 'Productions',
    reevaluation: true,
    rowspan: 0
  },
  {
    setups: 'Supply Strategy Assumptions',
    linkTabs: 'Desired depot shipments cover period',
    reevaluation: true,
    rowspan: 0
  }
]);

const tableData2 = ref([
  {
    baseline: 'Recruitment Setup',
    scenarioVal: []
  }
]);
const analysisResult = ref([
  {
    executiveSummary: true,
    lCurve: true,
    supplyPlan: true,
    depotShipmentsPlan: false,
    monthlyKitDispensing: true,
    recruitment: true,
    riskAtSites: true
  },
  {
    executiveSummary: false,
    lCurve: false,
    supplyPlan: false,
    depotShipmentsPlan: false,
    monthlyKitDispensing: false,
    recruitment: false,
    riskAtSites: false
  },
  {
    executiveSummary: false,
    lCurve: false,
    supplyPlan: false,
    depotShipmentsPlan: false,
    monthlyKitDispensing: false,
    recruitment: false,
    riskAtSites: false
  }
]);
const form = reactive({
  evaluation: '',
  assumptionsValidationDate: '',
  extractUsedDate: '',
  validatedBy: '',
  goalEvaluation: '',
  validatedByType: '',
  investigatedReevaluation: '',
  requiredReevaluationScenario: '',
  tableData1: tableData1.value,
  tableData2: tableData2.value,
  analysisResult: [analysisResult.value]
});

const sheetExportExcel = () => {
  const sheet1DataInfo: any = {};
  for (const key of Object.keys(form)) {
    console.log(key);
    if (!['tableData1', 'tableData2', 'analysisResult'].includes(key)) {
      sheet1DataInfo[key] = JSON.stringify(form[key]);
    }
  }
  console.log({ sheet1DataInfo });
  let sheet1data = [sheet1DataInfo];
  var sheet = XLSX.utils.json_to_sheet(sheet1data); //新建一个工作表

  // 假设你有两个DOM元素，每个都包含表格数据
  const table1 = document.getElementById('data-table1');
  const table2 = document.getElementById('data-table2');
  const table3 = document.getElementById('data-table3');
  // 将第一个表格转换为工作表的一部分
  const tableOrigin1 = 3;
  let sheet1 = XLSX.utils.table_to_sheet(table1, {
    header: 1,
    skipEmpty: true,
    origin: `A${tableOrigin1}`
  });

  // 将第二个表格的数据添加到同一个工作表中
  // 假设第二个表格后面有多少行，就在第一个表格后面添加多少空行
  // const numEmptyRows = formValue.patientVisitSchedule?.length - 1; // 减去表头; // 减去表头
  // const emptyRows = Array(numEmptyRows).fill(null).map(() => ({}));

  const tableOrigin2 = tableOrigin1 + form.tableData1?.length + 5;
  let sheet2 = XLSX.utils.table_to_sheet(table2, {
    header: 1,
    skipEmpty: true,
    origin: `A${tableOrigin2}`
  });
  const tableOrigin3 = tableOrigin2 + form.tableData2?.length + 5;
  console.log({ tableOrigin2, tableOrigin3 });

  let sheet3 = XLSX.utils.table_to_sheet(table3, {
    header: 1,
    skipEmpty: true,
    origin: `A${tableOrigin3}`
  });

  // 将空行添加到工作表中，以便第二个表格的数据不会与第一个表格的数据重叠
  sheet = Object.assign({}, sheet, 3);
  sheet1 = Object.assign({}, sheet1, form.tableData2?.length - 1);
  sheet2 = Object.assign({}, sheet2, form.analysisResult?.length - 1);

  // 合并两个工作表
  const mergedSheet = Object.assign({}, sheet, sheet1, sheet2, sheet3);

  // 创建工作簿并添加工作表
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, mergedSheet, 'Sheet1');

  // 生成Excel文件并导出
  XLSX.writeFile(workbook, 'AssumptionsUpdatesScenarios.xlsx');
};

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex
}: SpanMethodProps) => {
  console.log({ row, column, rowIndex, columnIndex });
  if (columnIndex === 0) {
    return {
      rowspan: row.rowspan,
      colspan: 1
    };
  }
};

const addScenario = () => {
  if (tableColumn2.value?.length >= MAX_NUMS) {
    return ElMessage.warning(`Add up to${MAX_NUMS}`);
  }
  tableColumn2.value.push({ prop: `scenario ${tableColumn2.value.length}` });
  form.analysisResult.push(cloneDeep(analysisResult.value));
};

const deleteScenario = () => {
  if (tableColumn2.value?.length === 2) {
    return ElMessage.warning(`At least ${MIN_NUMS} exists`);
  }
  tableColumn2.value.pop();
  form.analysisResult.pop();
};
</script>
<style lang="scss" scoped>
.assumptions-updates-scenarios-page {
  color: #242933;
  .module-title {
    text-align: center;
    padding: 16px;
    font-size: 24px;
    background: #ccc;
    color: #fff;
  }
  .module-title-h3 {
    text-align: center;
    padding: 8px;
    font-size: 16px;
  }
  .analysis-result-table {
    margin-top: 16px;
  }
}
</style>
