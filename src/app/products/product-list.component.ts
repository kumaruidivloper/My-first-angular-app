import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product-model";
import { ProductService } from "./product.service";

@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    public pageTitle: string = 'Product List';
    public imageWidth: number = 50;
    public imageMargin: number = 2;
    public showImage: boolean = false;
    public errorMessage;
    // public listFilter: string = 'cart';

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    public filteredProducts: IProduct[];
    public products: IProduct[] = [];
        
    constructor(private productService: ProductService) {
        // this.filteredProducts = this.products;
        // this.listFilter = 'cart';
    }

    onRatingClicked(message: string):void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            products => {
                this.products = products,
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
        
    }
}