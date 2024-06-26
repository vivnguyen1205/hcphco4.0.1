import { Component, OnInit } from '@angular/core';
// import { Product } from '@domain/product';
// import { ProductService } from '@service/productservice';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoDemo } from './infodemo';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';

@Component({
    providers: [DialogService, MessageService],
    standalone:true,
    imports:[TableModule, ButtonModule],
    template: ''

})
export class ProductListDemo implements OnInit {
    // products: Product[];

    constructor(private dialogService: DialogService, private ref: DynamicDialogRef) {}

    ngOnInit() {
    }

    // selectProduct(product: Product) {
    //     this.ref.close(product);
    // }

    showInfo() {
        this.dialogService.open(InfoDemo, {
            modal: true,
            dismissableMask: true,
            data: {
                // totalProducts: this.products ? this.products.length : 0
            }
        });
    }

    closeDialog(data) {
        this.ref.close(data);
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
