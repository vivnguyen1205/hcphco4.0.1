// import { Component } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductListDemo } from './productlistdemo';
// import { Footer } from './demo/footer';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import {ApiService} from '../../../services/api.service';
import {PaginatorModule} from 'primeng/paginator';
// import { ButtonModule } from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgDatePickerModule} from 'ng-material-date-range-picker';
// import { ColComponent, DateRangePickerComponent, RowComponent } from '@coreui/angular';
import {DialogModule} from 'primeng/dialog';
import {HomepageComponent} from '@pages/homepage/homepage.component';
import {ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {Table} from 'primeng/table';
import {ImportsModule} from 'primeimports';
import {SortEvent} from 'primeng/api';
import {EventListenerObject} from 'rxjs/internal/observable/fromEvent';
import {Data} from '@angular/router';
import {DropdownModule} from 'primeng/dropdown';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html', 
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  
  constructor(
    private dialogConfig: DynamicDialogConfig,
    private apiService: ApiService,
) {}
ref: DynamicDialogRef | undefined;
  detailId: string;
  data?: any;
  ngOnInit(): void {
    this.loadDetailData(this.dialogConfig.data?.CSFId);
  }
  loadDetailData(id:string) {
    if(id) {
      const apiURL = `https://hcp-api-stg.genesolutions.vn/api/HCP/LabStatusDetailv2?idEncrypt=${id}&labCodeEncrypt=`
      this.apiService.getData(apiURL).subscribe((res: any) => {
        this.data = res.Data;
        console.log(this.data);
    });
    }

 
}
}


