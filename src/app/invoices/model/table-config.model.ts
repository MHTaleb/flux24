export interface TableConfig {
    displayedColumns: {name:string,type:string,dataSource?: any[]}[];
    dataSource: any[];
    columnDefinitions: { [key: string]: string };
    name: string;
  }