import { ref } from "vue";

export const  randomizationDetailsColumn = ref([
  {
    prop:'arm',
    label:'Arm',
    tips:'',
    type:'input',
    width:'120',
  },
  {
    prop:'randomization',
    label:'Ratio of Randomization',
    tips:'',
    min:0,
    type:'number',
    precision:2,
    sortable:true,
    width:'120'
  },
  {
    prop:'pts',
    label:'# pts',
    tips:'',
    min:0,
    type:'number',
    sortable:true,
    width:'120'
  },
]);

export const  patientVisitScheduleColumn = ref([
  {
    prop:'treatmentVisit',
    label:'Treatment Visit / Cycle',
    tips:'',
    type:'input',
    width:'120',
  },
  {
    prop:'studyWeek',
    label:'Study Week',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'timeToVisit',
    label:'Time to visit / Day',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'drugA',
    label:'# of Drug A',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'drugB',
    label:'# of Drug B',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'drugC',
    label:'# of Drug C',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'drugD',
    label:'# of Drug D',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
]);

export const  screenFailureExpectedSummaryColumn = ref([
  {
    prop:'expectedMax',
    label:'Expected Max # cycles that subject can reach ',
    tips:'',
    min:0,
    type:'number',
    width:'120',
  },
  {
    prop:'expectedAverage',
    label:'Expected average # cycles',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'expectedStudy',
    label:'Expected % patients reaching end of Study ',
    tips:'',
    type:'input',
    width:'120'
  },
]);

export const  dispensingPlanColumn = ref([
  {
    prop:'cycle',
    label:'Cycle',
    tips:'',
    type:'text',
    width:'120',
  },
  {
    prop:'drugA',
    label:'# of Drug A',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'drugB',
    label:'# of Drug B',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'drugC',
    label:'# of Drug C',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'drugD',
    label:'# of Drug D',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
]);

export const  recruitmentInfoColumn = ref([
  {
    prop:'country',
    label:'Country',
    tips:'',
    type:'textarea',
    width:'120',
  },
  {
    prop:'subjectQty',
    label:'Subject Qty',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'siteQty',
    label:'Site Qty',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'dateTime',
    label:'Start Time and End Time',
    tips:'',
    type:'dateRange',
    width:'280'
  },
]);

export const  recruitmentSummaryItemColumn = ref([
  {
    prop:'country',
    label:'Country',
    tips:'',
    type:'textarea',
    width:'120',
  },
  {
    prop:'subjectQty',
    label:'Subject Qty',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  {
    prop:'siteQty',
    label:'Site Qty',
    tips:'',
    min:0,
    type:'number',
    width:'120'
  },
  
]);

