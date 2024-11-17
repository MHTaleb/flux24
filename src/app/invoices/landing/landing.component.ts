// landing.component.ts
import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfigService } from '../services/landing-invoice.service';
import { combineLatest, filter, map, ReplaySubject, tap } from 'rxjs';
import { TableConfig } from '../model/table-config.model';
import { Filters } from 'src/app/shared/components/table-filter/table-filter.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit {
  handleFilterSet(filters: Filters) {
    console.log(filters);
    // Access filters with proper typing
    const firstColumnName = this.tableConfigService.tableConfigs[this.tableConfigService.currentTableIndex].displayedColumns[0].name;
    const firstFilter = filters[firstColumnName];
  
    if (firstFilter && firstFilter.enabled) {
      const value = firstFilter.value;
      // TypeScript knows the type of value based on ColumnType
      console.log(`Filter for ${firstColumnName}:`, value);
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  #viewInit: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  #viewInitEvent$ = this.#viewInit.asObservable();
  vm$ = combineLatest([
    this.tableConfigService.datasources$,
    this.tableConfigService.selectedDatasource$,
    this.tableConfigService.nextDatasourceInfo$,
    this.tableConfigService.previousDatasourceInfo$,
    this.#viewInitEvent$,
  ]).pipe(
    tap(console.table),
    filter(([ds,sds,ndsi,pdsi,vii]) => !!vii),
    map(
      ([
        allConfs,
        currentConf,
        nextDatasourceName,
        previousDatasourceName,
      ]) => ({
        datasource: this.buildDatasource(currentConf),
        allTableConfs: allConfs,
        nextDatasourceName,
        previousDatasourceName,
        currentConf,
        displayColumns: currentConf.displayedColumns.map((ele) => ele.name),
      })
    )
  );

  buildDatasource(currentConf: TableConfig): MatTableDataSource<any> {
    const dataSource = new MatTableDataSource<any>(currentConf?.dataSource);
    dataSource.paginator = this.paginator;
    return dataSource;
  }
  constructor(public tableConfigService: TableConfigService) {}

  ngOnInit() {
    this.#viewInit.next(true);
  }

  selectTable(name) {
    this.tableConfigService.selectDatasourceAction.next(name);
  }
}
