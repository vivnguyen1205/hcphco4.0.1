import { HomepageformComponent } from '@components/homepageform/homepageform.component';
// import { Component } from '@angular/core';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { allIcons } from 'ngx-bootstrap-icons';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { ProductListDemo } from './productlistdemo';
// import { Footer } from './demo/footer';
import { PrimeIcons } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import {ApiService} from '../../../services/api.service';
import {PaginatorModule} from 'primeng/paginator';
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
import {ElementRef, HostBinding, Input, OnChanges} from '@angular/core';
import {
  animate, style, transition, trigger
} from "@angular/animations";
@Component({
  animations: [
    trigger('grow', [
      transition('void <=> *', []),
      transition('* <=> *', [
        style({height: '{{startHeight}}px', opacity: 0}),
        animate('.5s ease'),
      ], {params: {startHeight: 0}})
    ])
    
  ],

  selector: 'app-popup',
  templateUrl: './popup.component.html', 
  styleUrl: './popup.component.scss',
  
})
export class PopupComponent implements OnInit, OnChanges{
  @Input()
  trigger: string;

  startHeight: number;
  
  constructor(
    private element: ElementRef,
    private dialogConfig: DynamicDialogConfig,
    private apiService: ApiService,
    private HomepageformComponent: HomepageformComponent,
) {}
ref: DynamicDialogRef | undefined;
  detailId: string;
  data?: any;
  ngOnInit(): void {
    this.loadDetailData(this.dialogConfig.data?.CSFId);
  }
  @HostBinding('@grow') get grow() {
    return {value: this.trigger, params: {startHeight: this.startHeight}};
  }
  setStartHeight(){
    this.startHeight = this.element.nativeElement.clientHeight;
  }
  ngOnChanges(){
    this.setStartHeight();
  }
  
  
  
  // changeContent(){
  //   this.content = this.longContent !== this.content ? this.longContent : this.shortContent;
  // }
  
  loadDetailData(id:string) {
    if(id) {
      const apiURL = `https://hcp-api-stg.genesolutions.vn/api/HCP/LabStatusDetailv2?idEncrypt=${id}&labCodeEncrypt=`
      this.apiService.getData(apiURL).subscribe((res: any) => {
        this.data = res.Data;
        console.log(this.data);
        console.log(this.data.result_list);
        console.log(this.data.sample_list);
        
    });
    
    }



 
}
}

