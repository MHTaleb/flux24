import { Component, ViewChild, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActiveFilter, Column, ColumnType, Filter, Filters } from './table-filter.model';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit, OnChanges {
  @Input() columns: Column[] = []; // { name: string, type: string, dataSource?: any[] }[]
  @Output() onFiltersSet = new EventEmitter<Filters>();

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  filterForm: FormGroup;
  activeFilters: ActiveFilter[] = [];

  private initialFormValues: any;
  private menuApplied = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.columns && this.columns.length > 0) {
      this.initForm();
    }
  }

  ngOnChanges({ columns }: SimpleChanges): void {
    if (columns && !columns.firstChange) {
      this.initForm(); 
      this.activeFilters = [];
    }
  }

  initForm() {
    const formControls = this.columns.reduce((acc, column) => {
      let validators = [];
      let valueControl;

      // Define validators and initial value based on the column type
      switch (column.type) {
        case 'number':
          validators.push(Validators.pattern(/^\d+$/));
          valueControl = this.fb.control({ value: '', disabled: true }, validators);
          break;
        case 'text':
          validators.push(Validators.required);
          valueControl = this.fb.control({ value: '', disabled: true }, validators);
          break;
        case 'date':
          valueControl = this.fb.control({ value: '', disabled: true });
          break;
        case 'select':
        case 'radio':
          valueControl = this.fb.control({ value: '', disabled: true });
          break;
        case 'checkboxes':
          const checkboxesGroup = this.fb.group({});
          column.dataSource.forEach((option) => {
            checkboxesGroup.addControl(option.id, this.fb.control({ value: false, disabled: true }));
          });
          valueControl = checkboxesGroup;
          break;
        case 'boolean':
          valueControl = this.fb.control({ value: false, disabled: true });
          break;
        default:
          valueControl = this.fb.control({ value: '', disabled: true });
          break;
      }

      acc[column.name] = this.fb.group({
        enabled: [false],
        value: valueControl,
      });

      return acc;
    }, {});

    this.filterForm = this.fb.group(formControls);
    // Store the initial form values after form initialization
    this.initialFormValues = this.filterForm.value;
  }

  onToggleChange(columnName: string) {
    const control = this.filterForm.get(columnName) as FormGroup;
    const valueControl = control.get('value');

    if (!control.get('enabled').value) {
      // Reset and disable the control
      valueControl.reset();
      valueControl.disable();
    } else {
      // Enable the control
      valueControl.enable();
    }
  }

  removeFilter(filter: any) {
    const control = this.filterForm.get(filter.column) as FormGroup;
    control.get('enabled').setValue(false);
    const valueControl = control.get('value');

    // Disable the control when filter is removed
    valueControl.reset();
    valueControl.disable();

    const index = this.activeFilters.findIndex((f) => f.column === filter.column);
    if (index >= 0) {
      this.activeFilters.splice(index, 1);
    }
  }
  
applyFilters() {
  this.activeFilters = [];
  const filters: Filters = {};

  for (let column of this.columns) {
    const control = this.filterForm.get(column.name) as FormGroup;
    if (control.get('enabled').value) {
      const valueControl = control.get('value');
      let value: any;

      switch (column.type) {
        case ColumnType.Checkboxes:
          const selectedOptions: string[] = [];
          const checkboxes = valueControl as FormGroup;
          for (let key in checkboxes.controls) {
            if (checkboxes.get(key).value) {
              selectedOptions.push(key);
            }
          }
          value = selectedOptions;
          break;
        case ColumnType.Number:
          value = Number(valueControl.value);
          break;
        case ColumnType.Date:
          value = new Date(valueControl.value);
          break;
        case ColumnType.Boolean:
          value = Boolean(valueControl.value);
          break;
        default:
          value = valueControl.value;
          break;
      }

      // Ensure value is valid
      if (value !== undefined && value !== null && value !== '' && value.length !== 0) {
        this.activeFilters.push({
          column: column.name,
          value: value,
        });

        // Construct the Filter object with correct type
        filters[column.name] = {
          enabled: true,
          value: value,
        } as Filter<typeof column.type>;
      }
    }
  }

  this.onFiltersSet.emit(filters);
  this.menuApplied = true;

  // Update initialFormValues to reflect the applied filters
  this.initialFormValues = this.filterForm.value;
}
  

  onMenuOpened() {
    this.menuApplied = false; // Reset the flag
    // Reset the form to initial values when the menu is opened
    this.filterForm.reset(this.initialFormValues);
  }

  onMenuClosed() {
    if (!this.menuApplied) {
      // User closed the menu without applying, reset to initial values
      this.filterForm.reset(this.initialFormValues);
    }
  }
}
