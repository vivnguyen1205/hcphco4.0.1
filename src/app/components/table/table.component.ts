import { HomepageComponent } from '@pages/homepage/homepage.component';
import {ApiService} from './../../services/api.service';
import { HomepageformComponent } from '@components/homepageform/homepageform.component';
import {Component, OnInit, ViewChild} from '@angular/core';
// import { ProductService } from '@service/productservice';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
// import { TableModule } from 'primeng/table';
import {Table} from 'primeng/table';
import {ImportsModule} from 'primeimports';
import {SortEvent} from 'primeng/api';
import {ProductService} from '../../services/productservice';
import {Product} from '../../products';
// import { HomepageformComponent } from '@components/homepageform/homepageform.component';
// import { SortEvent } from 'primeng/api';
// import { ApiService } from '../../services/api.service';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    providers: [ProductService],
    imports: [ImportsModule],
    standalone: true
})
// export interface Product{
//   id?: string;
//     code?: string;
//     name?: string;
//     description?: string;
//     price?: number;
//     quantity?: number;
//     inventoryStatus?: string;
//     category?: string;
//     image?: string;
//     rating?: number;
export class TableComponent implements OnInit {
    private tokenKey: string =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJVc2VybmFtZSI6ImRvY3RvcjIiLCJUeXBlIjoiUGFydG5lciIsIkZ1bGxOYW1lIjoiZG9jdG9yIDIiLCJFbWFpbCI6IjJAZ21haWwuY29tIiwiUGhvbmUiOiIwIiwiSXNBZ3JlZW1lbnQiOiJUcnVlIiwiSXNMb3lhbHR5UHJvZ3JhbSI6IlRydWUiLCJMaXN0SG9zcGl0YWwiOiJbe1wiSWRcIjo0NzczLFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDA3NDhcIixcIk5hbWVcIjpcIkJWIFBTIE1la29uZ1wifSx7XCJJZFwiOjQ5MjUsXCJUeXBlXCI6XCJwa1wiLFwiQ29kZVwiOlwiR1MwMDA3MVwiLFwiTmFtZVwiOlwiUEsgQlMgVHLhuqduIFRo4buLIFPGoW4gVHLDoFwifSx7XCJJZFwiOjQ5MzQsXCJUeXBlXCI6XCJwa1wiLFwiQ29kZVwiOlwiR1MwMDM2NFwiLFwiTmFtZVwiOlwiUEsgQlMgVHLGsMahbmcgTmfhu41jIFRo4bqjb1wifSx7XCJJZFwiOjQ5ODMsXCJUeXBlXCI6XCJvdGhlclwiLFwiQ29kZVwiOlwiR1MwMDczNFwiLFwiTmFtZVwiOlwiVklOQ0lCSU9cIn0se1wiSWRcIjo1MTQxLFwiVHlwZVwiOlwicGtcIixcIkNvZGVcIjpcIkdTMDA0MTNcIixcIk5hbWVcIjpcIlBLIFRoYW5oIEjDom5cIn0se1wiSWRcIjo2ODU5LFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDIxMDlcIixcIk5hbWVcIjpcIlBYTiBZIEtob2EgNDhcIn0se1wiSWRcIjo2OTg3LFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDIyMzdcIixcIk5hbWVcIjpcIlBLIEJTIMSQb8OgbiBUaOG7iyBLaW0gRHVuZ1wifV0iLCJleHAiOjE3MTk0NjE5NjQsImlzcyI6ImhjcC1nZW5lc29sdXRpb24iLCJhdWQiOiJoY3AtZ2VuZXNvbHV0aW9uIn0.hCt4oMmC8DcsAMKSFOIVKp06p2f7uLRRa8pwa34yeq4';
      
    hospitalId: number;

    labDataApi: string ='https://hcp-api-stg.genesolutions.vn/api/HCP/GetLabByUser?id_hospital=-1&id_doctor=-1&id_combo=-1&id_service_code=&StartDate_Collect=&EndDate_Collect=&StartDate_Receive=&EndDate_Receive=&StartDate_Complete_Lab=&EndDate_Complete_Lab=&customer_name=&lab_code=&Type=-1&sortField=&sortOrder=&pageNumber=1&pageSize=20';
    @ViewChild('dt') dt: Table;
    dataList: any[] = [];
    data: any[];
    

    initialValue: Product[];

    isSorted: boolean = null;

    constructor(private apiService: ApiService) {}

    ngOnInit() {
       this.getLabData(this.labDataApi);
    }
    // onSubmit(){
    //   const labDataApi = 'https://hcp-api-stg.genesolutions.vn/api/HCP/GetLabByUser?id_hospital=' + this.hospitalId + '&id_doctor=-1&id_combo=-1&id_service_code=&StartDate_Collect=&EndDate_Collect=&StartDate_Receive=&EndDate_Receive=&StartDate_Complete_Lab=&EndDate_Complete_Lab=&customer_name=&lab_code=&Type=-1&sortField=&sortOrder=&pageNumber=1&pageSize=20';
    // }
    getLabData(labDataApi: any) {
        this.apiService.getData(this.labDataApi).subscribe((data: any) => {
            this.dataList = data.Data.ListData;
            console.log(this.dataList);
        });


        // sortTableData(event) {
        //   event.data.sort((data1, data2) => {
        //       let value1 = data1[event.field];
        //       let value2 = data2[event.field];
        //       let result = null;
        //       if (value1 == null && value2 != null) result = -1;
        //       else if (value1 != null && value2 == null) result = 1;
        //       else if (value1 == null && value2 == null) result = 0;
        //       else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        //       else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        //       return event.order * result;
        //   });
        // }
    }

}