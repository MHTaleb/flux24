// table-config.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, ReplaySubject, shareReplay, startWith, switchMap, withLatestFrom } from 'rxjs';
import { TableConfig } from '../model/table-config.model';


@Injectable({
    providedIn: 'root'
})
export class TableConfigService {

    // Updated tableConfigs with five configurations
tableConfigs: TableConfig[] = [
    {
      name: 'Invoice Summary',
      displayedColumns: [
        { name: 'invoiceId', type: 'number' },
        { name: 'customerName', type: 'text' },
        { name: 'invoiceDate', type: 'date' },
        { name: 'totalAmount', type: 'number' },
        { name: 'status', type: 'select', dataSource: [
          { id: 'paid', textualValue: 'Paid' },
          { id: 'unpaid', textualValue: 'Unpaid' },
          { id: 'overdue', textualValue: 'Overdue' },
        ]},
        { name: 'isVerified', type: 'boolean' },
      ],
      dataSource: [
        { invoiceId: 1001, customerName: 'Company A', invoiceDate: '2021-07-01', totalAmount: 1500.00, status: 'paid', isVerified: true },
        { invoiceId: 1002, customerName: 'Company B', invoiceDate: '2021-07-02', totalAmount: 2500.00, status: 'unpaid', isVerified: false },
        // ... add at least seven rows
        { invoiceId: 1003, customerName: 'Company C', invoiceDate: '2021-07-03', totalAmount: 3500.00, status: 'overdue', isVerified: true },
        { invoiceId: 1004, customerName: 'Company D', invoiceDate: '2021-07-04', totalAmount: 4500.00, status: 'paid', isVerified: false },
        { invoiceId: 1005, customerName: 'Company E', invoiceDate: '2021-07-05', totalAmount: 5500.00, status: 'unpaid', isVerified: true },
        { invoiceId: 1006, customerName: 'Company F', invoiceDate: '2021-07-06', totalAmount: 6500.00, status: 'overdue', isVerified: false },
        { invoiceId: 1007, customerName: 'Company G', invoiceDate: '2021-07-07', totalAmount: 7500.00, status: 'paid', isVerified: true },
      ],
      columnDefinitions: {
        invoiceId: 'Invoice ID',
        customerName: 'Customer Name',
        invoiceDate: 'Invoice Date',
        totalAmount: 'Total Amount',
        status: 'Status',
        isVerified: 'Verified',
      },
    },
    {
      name: 'Payment History',
      displayedColumns: [
        { name: 'paymentId', type: 'number' },
        { name: 'invoiceId', type: 'number' },
        { name: 'paymentDate', type: 'date' },
        { name: 'paymentMethod', type: 'radio', dataSource: [
          { id: 'credit_card', textualValue: 'Credit Card' },
          { id: 'bank_transfer', textualValue: 'Bank Transfer' },
          { id: 'cash', textualValue: 'Cash' },
        ]},
        { name: 'amountPaid', type: 'number' },
        { name: 'notes', type: 'text' },
      ],
      dataSource: [
        { paymentId: 2001, invoiceId: 1001, paymentDate: '2021-07-05', paymentMethod: 'credit_card', amountPaid: 1500.00, notes: 'Paid in full' },
        { paymentId: 2002, invoiceId: 1002, paymentDate: '2021-07-06', paymentMethod: 'bank_transfer', amountPaid: 1250.00, notes: 'Partial payment' },
        // ... add at least seven rows
        { paymentId: 2003, invoiceId: 1003, paymentDate: '2021-07-07', paymentMethod: 'cash', amountPaid: 3500.00, notes: '' },
        { paymentId: 2004, invoiceId: 1004, paymentDate: '2021-07-08', paymentMethod: 'credit_card', amountPaid: 4500.00, notes: '' },
        { paymentId: 2005, invoiceId: 1005, paymentDate: '2021-07-09', paymentMethod: 'bank_transfer', amountPaid: 5500.00, notes: 'Delayed payment' },
        { paymentId: 2006, invoiceId: 1006, paymentDate: '2021-07-10', paymentMethod: 'cash', amountPaid: 6500.00, notes: '' },
        { paymentId: 2007, invoiceId: 1007, paymentDate: '2021-07-11', paymentMethod: 'credit_card', amountPaid: 7500.00, notes: '' },
      ],
      columnDefinitions: {
        paymentId: 'Payment ID',
        invoiceId: 'Invoice ID',
        paymentDate: 'Payment Date',
        paymentMethod: 'Payment Method',
        amountPaid: 'Amount Paid',
        notes: 'Notes',
      },
    },
    {
      name: 'Customer Feedback',
      displayedColumns: [
        { name: 'customerId', type: 'number' },
        { name: 'customerName', type: 'text' },
        { name: 'feedbackDate', type: 'date' },
        { name: 'feedbackType', type: 'select', dataSource: [
          { id: 'complaint', textualValue: 'Complaint' },
          { id: 'suggestion', textualValue: 'Suggestion' },
          { id: 'compliment', textualValue: 'Compliment' },
        ]},
        { name: 'resolved', type: 'boolean' },
        { name: 'tags', type: 'checkboxes', dataSource: [
          { id: 'urgent', textualValue: 'Urgent' },
          { id: 'follow_up', textualValue: 'Follow Up' },
          { id: 'escalated', textualValue: 'Escalated' },
        ]},
      ],
      dataSource: [
        { customerId: 3001, customerName: 'Company A', feedbackDate: '2021-07-01', feedbackType: 'complaint', resolved: false, tags: ['urgent'] },
        { customerId: 3002, customerName: 'Company B', feedbackDate: '2021-07-02', feedbackType: 'suggestion', resolved: true, tags: ['follow_up'] },
        // ... add at least seven rows
        { customerId: 3003, customerName: 'Company C', feedbackDate: '2021-07-03', feedbackType: 'compliment', resolved: true, tags: [] },
        { customerId: 3004, customerName: 'Company D', feedbackDate: '2021-07-04', feedbackType: 'complaint', resolved: false, tags: ['escalated'] },
        { customerId: 3005, customerName: 'Company E', feedbackDate: '2021-07-05', feedbackType: 'suggestion', resolved: true, tags: ['follow_up', 'urgent'] },
        { customerId: 3006, customerName: 'Company F', feedbackDate: '2021-07-06', feedbackType: 'compliment', resolved: true, tags: [] },
        { customerId: 3007, customerName: 'Company G', feedbackDate: '2021-07-07', feedbackType: 'complaint', resolved: false, tags: ['urgent'] },
      ],
      columnDefinitions: {
        customerId: 'Customer ID',
        customerName: 'Customer Name',
        feedbackDate: 'Feedback Date',
        feedbackType: 'Feedback Type',
        resolved: 'Resolved',
        tags: 'Tags',
      },
    },
    {
      name: 'Product Inventory',
      displayedColumns: [
        { name: 'productId', type: 'number' },
        { name: 'productName', type: 'text' },
        { name: 'category', type: 'select', dataSource: [
          { id: 'electronics', textualValue: 'Electronics' },
          { id: 'furniture', textualValue: 'Furniture' },
          { id: 'office_supplies', textualValue: 'Office Supplies' },
        ]},
        { name: 'stockQuantity', type: 'number' },
        { name: 'reorderLevel', type: 'number' },
        { name: 'discontinued', type: 'boolean' },
      ],
      dataSource: [
        { productId: 4001, productName: 'Laptop', category: 'electronics', stockQuantity: 50, reorderLevel: 10, discontinued: false },
        { productId: 4002, productName: 'Desk', category: 'furniture', stockQuantity: 20, reorderLevel: 5, discontinued: false },
        // ... add at least seven rows
        { productId: 4003, productName: 'Chair', category: 'furniture', stockQuantity: 100, reorderLevel: 20, discontinued: false },
        { productId: 4004, productName: 'Printer', category: 'electronics', stockQuantity: 15, reorderLevel: 5, discontinued: true },
        { productId: 4005, productName: 'Paper', category: 'office_supplies', stockQuantity: 500, reorderLevel: 100, discontinued: false },
        { productId: 4006, productName: 'Monitor', category: 'electronics', stockQuantity: 30, reorderLevel: 10, discontinued: false },
        { productId: 4007, productName: 'Keyboard', category: 'electronics', stockQuantity: 200, reorderLevel: 50, discontinued: false },
      ],
      columnDefinitions: {
        productId: 'Product ID',
        productName: 'Product Name',
        category: 'Category',
        stockQuantity: 'Stock Quantity',
        reorderLevel: 'Reorder Level',
        discontinued: 'Discontinued',
      },
    },
    {
      name: 'Employee Directory',
      displayedColumns: [
        { name: 'employeeId', type: 'number' },
        { name: 'fullName', type: 'text' },
        { name: 'dateOfHire', type: 'date' },
        { name: 'department', type: 'select', dataSource: [
          { id: 'sales', textualValue: 'Sales' },
          { id: 'marketing', textualValue: 'Marketing' },
          { id: 'development', textualValue: 'Development' },
        ]},
        { name: 'isActive', type: 'boolean' },
        { name: 'skills', type: 'checkboxes', dataSource: [
          { id: 'java', textualValue: 'Java' },
          { id: 'angular', textualValue: 'Angular' },
          { id: 'sql', textualValue: 'SQL' },
        ]},
      ],
      dataSource: [
        { employeeId: 5001, fullName: 'Alice Smith', dateOfHire: '2019-06-15', department: 'development', isActive: true, skills: ['java', 'sql'] },
        { employeeId: 5002, fullName: 'Bob Johnson', dateOfHire: '2020-01-20', department: 'marketing', isActive: true, skills: ['angular'] },
        // ... add at least seven rows
        { employeeId: 5003, fullName: 'Carol Williams', dateOfHire: '2018-03-10', department: 'sales', isActive: false, skills: ['sql'] },
        { employeeId: 5004, fullName: 'David Brown', dateOfHire: '2017-08-05', department: 'development', isActive: true, skills: ['java', 'angular'] },
        { employeeId: 5005, fullName: 'Eve Davis', dateOfHire: '2016-11-30', department: 'marketing', isActive: true, skills: [] },
        { employeeId: 5006, fullName: 'Frank Miller', dateOfHire: '2015-05-25', department: 'sales', isActive: false, skills: ['sql', 'angular'] },
        { employeeId: 5007, fullName: 'Grace Wilson', dateOfHire: '2021-02-14', department: 'development', isActive: true, skills: ['java'] },
      ],
      columnDefinitions: {
        employeeId: 'Employee ID',
        fullName: 'Full Name',
        dateOfHire: 'Date of Hire',
        department: 'Department',
        isActive: 'Active',
        skills: 'Skills',
      },
    },
  ];
  
    // tableConfigs: TableConfig[] = [
    //     // Populate this array with your actual table configurations
    //     {
    //         displayedColumns: [{name:'id',type:'text'}, {name:'date',type:'date'},{name:'title',type:'text'} ,{name:'amount',type:'text'} ],
    //         dataSource: [
    //             { id: 1, date: '2021-07-01', title: 'Invoice 001', amount: '$500.00' },
    //             { id: 2, date: '2021-07-02', title: 'Invoice 002', amount: '$300.00' }
    //         ],
    //         columnDefinitions: {
    //             id: 'ID',
    //             date: 'Date',
    //             title: 'Title',
    //             amount: 'Amount'
    //         },
    //         name: 'Daily Sales Report'
    //     },
    //     {
    //         displayedColumns: [{name:'order',type:'text'}, {name:'shipDate',type:'date'},{name:'status',type:'text'} ],
    //         dataSource: [
    //             { order: 1234, status: 'Shipped', shipDate: '2021-07-05' },
    //             { order: 1235, status: 'Pending', shipDate: '2021-07-06' }
    //         ],
    //         columnDefinitions: {
    //             order: 'Order Number',
    //             status: 'Status',
    //             shipDate: 'Ship Date'
    //         },
    //         name: 'Shipping Status Report'
    //     },
    //     {
    //         displayedColumns: [{name:'nu;ber',type:'text'}, {name:'stqtus',type:'text'}, {name:'shipDate',type:'date'}],
    //         dataSource: [
    //             { number: 1234, status: 'Shipped', shipDate: '2021-07-05' },
    //             { number: 1235, status: 'Pending', shipDate: '2021-07-06' }
    //         ],
    //         columnDefinitions: {
    //             number: 'Invoice Number',
    //             status: 'Status',
    //             shipDate: 'Expected Ship Date'
    //         },
    //         name: 'Pending Orders Overview'
    //     }
    //     ];

    currentTableIndex = 0;

    #datasources: BehaviorSubject<TableConfig[]> = new BehaviorSubject<TableConfig[]>([]);
    datasources$ = this.#datasources.asObservable();


    selectDatasourceAction: ReplaySubject<string> = new ReplaySubject<string>();
    selectDatasourceEvent$ = this.selectDatasourceAction.asObservable().pipe(startWith(this.tableConfigs[0].name));


    selectedDatasource$ = this.selectDatasourceEvent$.pipe(
        withLatestFrom(this.datasources$),
        switchMap(([name, configs]) => of(configs.find(ele => ele.name === name)))
    )

    nextDatasourceInfo$ = this.selectDatasourceEvent$.pipe(
        withLatestFrom(this.datasources$),
        map(([name, configs]) => {
            const index = (configs.findIndex(ele => ele.name === name) + 1 + configs.length) % configs.length;
            return configs[index].name
        }),
        shareReplay(1)
    )


    previousDatasourceInfo$ = this.selectDatasourceEvent$.pipe(
        withLatestFrom(this.datasources$),
        map(([name, configs]) => {
            const index = (configs.findIndex(ele => ele.name === name) - 1 + configs.length) % configs.length;
            return configs[index].name
        }),
        shareReplay(1)
    )

    constructor() {
        this.padDataSources();
        this.#datasources.next(this.tableConfigs)
    }


    padDataSources(): void {
        this.tableConfigs.forEach(config => {
            const remainder = config.dataSource.length % 10;
            if (remainder !== 0) {
                const rowsToAdd = 10 - remainder;
                for (let i = 0; i < rowsToAdd; i++) {
                    const emptyRow = {};
                    config.displayedColumns.forEach(column => {
                        emptyRow[column.name] = '';  // Use empty string or another placeholder as needed
                    });
                    config.dataSource.push(emptyRow);
                }
            }
        });
    }
}








