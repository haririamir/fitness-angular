import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'component-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('list2', [
      state(
        'exit',
        style({
          opacity: 1,
        })
      ),
      transition('void=>*', [
        style({ opacity: 0 }),
        animate(
          '.5s',
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.25, offset: 0.2 }),
            style({ opacity: 0.5, offset: 0.3 }),
            style({ opacity: 0.75, offset: 1 }),
          ])
        ),
      ]),
      transition('*=>void', [
        style({ opacity: 1, backgroundColor: 'red' }),
        animate(
          '.5s',
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0.75, offset: 0.2 }),
            style({ opacity: 0.5, offset: 0.3 }),
            style({ opacity: 0.25, offset: 0.4 }),
            style({ opacity: 0, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class TableComponent implements OnInit, AfterViewInit {
  constructor() {}

  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() headerLabel: string[] = [];
  
  @Output() rowAction = new EventEmitter<{
    action: string;
    row: any;
    table: any;
  }>();

  @ViewChild(MatPaginator) paginator = '' as unknown as MatPaginator;
  @ViewChild(MatSort) sort = '' as unknown as MatSort;
  @ViewChild(MatTable) table = {} as MatTable<any>;

  displayedColumns: string[] = [];
  dataSource = '' as unknown as MatTableDataSource<any>;

  ngOnInit() {
    this.displayedColumns = [...this.columns, 'actions'];
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.data;
    }
  }

  updateTable() {
    this.table.renderRows();
  }

  onAction(action: string, row: any) {
    this.rowAction.emit({ action, row, table: this.table.renderRows() });
  }
}
