import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ModalComponent} from "../../../components/modal/modal.component";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
  TuiComboBoxModule, TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiFileLike,
  TuiInputFilesModule,
  TuiInputModule, TuiInputNumberModule, TuiSelectModule
} from "@taiga-ui/kit";
import {map, Observable, Subject} from "rxjs";
import {CategoryService, ICategory} from "../../../services/category-service.service";
import {IProduct, ProductsService} from "../../../services/products.service";
import {TuiValidationError} from "@taiga-ui/cdk";
import {filesToBase64} from "../../../utils/convertToBase64";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AsyncPipe,
    ModalComponent,
    NgForOf,
    NgIf,
    NgbAlert,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiComboBoxModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputFilesModule,
    TuiInputModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiInputNumberModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiDataListModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productForm = new FormGroup({
    categoryValue: new FormControl('', Validators.required),
    priceValue: new FormControl(0, Validators.required),
    nameValue: new FormControl('', Validators.required),
    photoValue: new FormControl([], Validators.required),
    descriptionValue: new FormControl('')
  });
  errorMessage: string = '';
  categories!: Observable<ICategory[]>;
  products!: Observable<IProduct[]>;
  isOpen: boolean = false;


  readonly control = new FormControl([], [maxFilesLength(5)]);
  readonly options = {updateOn: 'blur'} as const;
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();



  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }


  removeFile({name}: File): void {
    this.productForm.controls.photoValue.setValue(
      this.productForm.controls.photoValue.value?.filter((current: File) => current.name !== name) ?? [],
    );
  }

  removeFile2(name: string): void {
    this.productForm.controls.photoValue.setValue(
      this.productForm.controls.photoValue.value?.filter((current: string) => current !== name) ?? [],
    );
  }


  constructor(private catService: CategoryService, private productService: ProductsService) {
    this.categories = catService.getCategories();
    this.products = productService.getProducts();
  }

  deleteProduct(id: string) {

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.pipe(map(items => items.filter(item => item._id !== id)));
      }
    })
  }

  onValueChange<K extends keyof IProduct>(
    value: IProduct[K],
    key: K,
    current: IProduct,
    data:  Observable<IProduct[]>,
  ): void {
    const updated = {...current, [key]: value};
    console.log(updated)
    this.products =
      data === this.products
        ? this.products
        : this.products.pipe(map(items => items.map(item => (item === current ? updated : item))));


  }

  get f () { return this.productForm.controls; }

  submit() {
    if (this.productForm.invalid) {
      return;
    }

    if (this.f.photoValue?.value?.length === 0) {
      return;
    }

    filesToBase64(this.f.photoValue.value as File[])
      .then(base64Images => {
        console.log(base64Images, 'base64Imagesbase64Images')
        this.productService.addProduct(
          this.f.nameValue.value || '',
          base64Images as string[],
          this.f.categoryValue.value || '',
          this.f.priceValue.value || 0,
          this.f.descriptionValue.value || ''
        ).subscribe({
          next: data => {
            this.products = this.products.pipe(map(items => [...items]));
            this.productForm.reset();
          },
          error: err => {
            console.log(err)
          }
        })
      })




    console.log(this.productForm.value)
  }

  open() {
    this.isOpen = !this.isOpen
  }
  ngOnInit() {
    this.products = this.productService.getProducts()
  }
}

export function maxFilesLength(maxLength: number): ValidatorFn {
  return ({value}: AbstractControl) =>
    value.length > maxLength
      ? {
        maxLength: new TuiValidationError(
          'Error: maximum limit - 5 files for upload',
        ),
      }
      : null;
}
