import { ref } from 'vue';

export const analysisResultColumn = ref([
  {
    prop: 'executiveSummary',
    label: 'Executive Summary',
    tips: '',
    type: 'radio',
    width: '140'
  },
  {
    prop: 'lCurve',
    label: 'L-Curve',
    tips: 'L-Curve ( site shipment frequency analysis)(only for initial report)',
    type: 'radio',
    width: '140'
  },

  {
    prop: 'supplyPlan',
    label: 'Supply Plan (Production plan optimization)',
    tips: 'Temperature type，like 2-8°C or Ambient?',
    type: 'radio',
    width: '140'
  },
  {
    prop: 'depotShipmentsPlan',
    label: 'Depot Shipments Plan',
    tips: 'Depot shipments plan(not standardly part of a scenario) ',
    type: 'radio',
    width: '140'
  },
  {
    prop: 'monthlyKitDispensing',
    label: 'Monthly Kit Dispensing',
    tips: ' ',
    type: 'radio',
    width: '140'
  },
  {
    prop: 'recruitment',
    label: 'Recruitment',
    tips: '',
    type: 'radio',
    width: '140'
  },
  {
    prop: 'riskAtSites',
    label: 'Risk At Sites',
    tips: '',
    type: 'radio',
    width: '140'
  }
]);
