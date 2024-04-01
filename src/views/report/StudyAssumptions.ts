import { ref } from "vue";

export const  packageInfomationColumn = ref([
  {
    prop:'kitType',
    label:'Kit Type',
    tips:'',
    type:'text',
    width:'120',
    fixed:true
  },
  {
    prop:'labelGroup',
    label:'Label Group (NA)',
    tips:'',
    type:'text',
    width:'120'
  },
  
  {
    prop:'temperatureType',
    label:'Temperature Type',
    tips:'Temperature type，like 2-8°C or Ambient?',
    type:'text',
    width:'120'
  },
  {
    prop:'remainingShelfLife',
    label:'Remaining Shelf Life',
    tips:'Remaining shelf life to be taken into account for future productions? (if no expiry dates available yet)*',
    type:'number',
    min: 0,
    max: 360,
    width:'150'
  },
  {
    prop:'costPerBatch',
    label:'Fixed sourcing or production cost per batch',
    tips:'',
    type:'amount',
    min: 0,
    width:'170'
  },
  {
    prop:'costPerUnit',
    label:'Sourcing or production cost per unit',
    tips:'Remaining shelf life to be taken into account for future productions? if no expiry dates available yet)*',
    type:'amount',
    min: 0,
    width:'170'
  },
  {
    prop:'packagingCostPerBatch',
    label:'Fixed packaging & labeling cost per batch',
    tips:'',
    type:'amount',
    min: 0,
    width:'170'
  },
  {
    prop:'packagingCostPerUnit',
    label:'Packaging or Labelling cost per unit',
    tips:'',
    type:'amount',
    min: 0,
    width:'170'
  },
  {
    prop:'commercialValue',
    label:'Commercial Value',
    tips:'Commercial value (on which VAT/Custom fees will be applied)*if different per country, (N/A)',
    type:'amount',
    min: 0,
    width:'170'
  },
  {
    prop:'leadTime',
    label:'Lead Time',
    tips:'Lead time from order to Quality release (sourcing, packaging, labelling, release timelines)',
    type:'number',
    min: 0,
    max: 360,
    width:'120'
  },
  {
    prop:'localSourcing',
    label:'Local Sourcing',
    tips:'Local sourcing? If yes, please specify the country. (N/A)',
    type:'text',
    min: 0,
    width:'170'
  },
  
]);
export  type PackageInfomationRowType ={
  kitType: string;
  labelGroup: string;
  temperatureType: string;
  remainingShelfLife: number | string;
  costPerBatch:number | string,
  costPerUnit:number | string,
  packagingCostPerBatch:number | string,
  packagingCostPerUnit:number | string,
  commercialValue:number | string,
  leadTime:number | string,
  localSourcing:string,
  unit: '¥' | '$',
}

export const  depotNetworksColumn = ref([
  {
    prop:'centraldepot',
    label:'Central Depot',
    tips:'',
    type:'text',
    width:'120',
  },
  {
    prop:'localDepot',
    label:'Local Depot',
    tips:'',
    type:'text',
    width:'120',
  },
  {
    prop:'tiemLocalDepot',
    label:'Lead time from central to local depot',
    tips:'',
    type:'number',
    min: 0,
    max: 360,
    width:'150'
  },

  {
    prop:'country',
    label:'Country (sites)',
    tips:'',
    type:'text',
    width:'120'
  },
  {
    prop:'localDepotCountry',
    label:'Lead time from local depot to country (sites) ',
    tips:'',
    type:'number',
    width:'150'
  },

  {
    prop:'siteSetUp',
    label:'Site Seedings Set Up ',
    tips:'',
    type:'text',
    width:'120'
  },
  {
    prop:'shipment',
    label:'Cost Per Depot Shipment (NA)',
    tips:'',
    type:'amount',
    width:'170'
  },
  {
    prop:'costPer',
    label:'Cost Per Site Shipment',
    tips:'',
    type:'amount',
    width:'170'
  },
]);

export const  pastIPReleasesColumn = ref([
  {
    prop:'releaseDate',
    label:'Release Date',
    tips:'',
    type:'date',
    width:'210',
  },
  {
    prop:'packageType',
    label:'Package Type',
    tips:'',
    type:'text',
    width:'120',
  },
  {
    prop:'labelGroup',
    label:'Label Group (NA)',
    tips:'',
    type:'text',
    width:'120'
  },

  {
    prop:'confirmedExpiryDate',
    label:'Confirmed Expiry Date ',
    tips:'',
    type:'date',
    width:'210'
  },
  {
    prop:'lotNumber',
    label:'Lot Number',
    tips:'',
     min:0,
    type:'text',
    width:'150'
  },

  {
    prop:'kits',
    label:'# kits',
    tips:'',
    min:0,
    type:'number',
    width:'150'
  },
]);

export const  futureIPReleasesColumn = ref([
  {
    prop:'releaseDate',
    label:'Release Date',
    tips:'',
    type:'date',
    width:'210',
  },
  {
    prop:'packageType',
    label:'Package Type',
    tips:'',
    type:'text',
    width:'120',
  },
  {
    prop:'labelGroup',
    label:'Label Group (NA)',
    tips:'',
    type:'text',
    width:'120'
  },
  {
    prop:'expectedExpiryDate',
    label:'Expected Expiry Date',
    tips:'Expected expiry date(if not given, remaining shelf life defined in "Packaging information" tab will be used)',
    type:'date',
    width:'210'
  },
  {
    prop:'lotNumber',
    label:'Lot Number',
    tips:'',
     min:0,
    type:'text',
    width:'150'
  },
  {
    prop:'fixedQuantity',
    label:'Fixed quantity? If no, is there a min/max constraint?',
    tips:'',
    type:'text',
    width:'120'
  },
  {
    prop:'fixedReleaseDate',
    label:'Fixed release date? If no, is there a  constraint?',
    tips:'',
    type:'text',
    width:'120'
  },
  {
    prop:'kits',
    label:'# kits',
    tips:'',
    min:0,
    type:'number',
    width:'150'
  },
]);