export enum ColumnType {
    Number = 'number',
    Text = 'text',
    Date = 'date',
    Select = 'select',
    Radio = 'radio',
    Checkboxes = 'checkboxes',
    Boolean = 'boolean',
}

export type ColumnValueTypes = {
    [ColumnType.Number]: number;
    [ColumnType.Text]: string;
    [ColumnType.Date]: Date;
    [ColumnType.Select]: string;       // Assuming selects return a single string value
    [ColumnType.Radio]: string;        // Assuming radios return a single string value
    [ColumnType.Checkboxes]: string[]; // Assuming checkboxes return an array of strings (IDs)
    [ColumnType.Boolean]: boolean;
};

export interface Option {
    id: string;
    textualValue: string;
}

export interface Column {
    name: string;
    type: ColumnType;
    dataSource?: Option[];
}

export interface ActiveFilter {
    column: string;
    value: any; // You can improve this by mapping ColumnType to specific types
}


export interface Filter<T extends ColumnType> {
    enabled: boolean;
    value: ColumnValueTypes[T];
  }

// filters.interface.ts
export type Filters = {
    [columnName: string]: Filter<ColumnType>;
  };