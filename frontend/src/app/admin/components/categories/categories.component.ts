import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  TuiCheckboxModule,
  TuiFieldErrorPipeModule, TuiFileLike,
  TuiInputDateTimeModule, TuiInputFilesModule,
  TuiInputModule,
  TuiInputPasswordModule, TuiTextareaModule
} from "@taiga-ui/kit";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Observable, map, timer, finalize, switchMap, Subject, of} from "rxjs";
import {CategoryService, ICategory} from "../../../services/category-service.service";
import {TuiButtonModule, TuiErrorModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../../components/modal/modal.component";
import {RouterLink} from "@angular/router";



@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    TuiCheckboxModule,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    TuiSvgModule,
    ModalComponent,
    NgIf,
    NgbAlert,
    RouterLink,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiInputFilesModule,
    TuiTextareaModule,
    FormsModule,
    TuiTextfieldControllerModule,
    NgOptimizedImage
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoryForm = new FormGroup({
    nameValue: new FormControl('', Validators.required),
    photoValue: new FormControl(null, Validators.required),
    descriptionValue: new FormControl('')
  });
  errorMessage: string = '';
  categories!: Observable<ICategory[]>;
  isOpen: boolean = false;

  readonly control = new FormControl();
  readonly options = {updateOn: 'blur'} as const;
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }


  removeFile(): void {
    this.categoryForm.controls.photoValue.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }



  constructor(private catService: CategoryService) {

  }

  deleteCategory(id: string) {

    this.catService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.pipe(map(items => items.filter(item => item._id !== id)));
      }
    })
  }

  onValueChange<K extends keyof ICategory>(
    value: ICategory[K],
    key: K,
    current: ICategory,
    data:  Observable<ICategory[]>,
  ): void {
    const updated = {...current, [key]: value};
    console.log(updated)
    this.categories =
      data === this.categories
        ? this.categories
        : this.categories.pipe(map(items => items.map(item => (item === current ? updated : item))));

    this.catService.editCategory(updated._id, updated.name, updated.photo, updated.description).subscribe({

    })
  }

  submit() {
    if (!this.categoryForm.controls.photoValue.value || !this.categoryForm.controls.nameValue.value) {
      return;
    }

    let base64String = '';
    let reader = new FileReader();
    reader.onload = () => {
      // @ts-ignore
      base64String ="data:image/jpeg;base64," + reader?.result?.replace("data:", "")
        .replace(/^.+,/, "");


      this.catService.addCategory(this.categoryForm.controls.nameValue.value || '', base64String, this.categoryForm.controls.descriptionValue.value || '' )
        .subscribe({
        next: data => {
          this.categories = this.categories.pipe(map(items => [...items]));
          this.categoryForm.reset();
        },
        error: err => {
          console.log(err)
        }
      })

    }
    // @ts-ignore
    reader.readAsDataURL(this.categoryForm.controls.photoValue.value);
  }

  open() {
    this.isOpen = !this.isOpen
  }
  ngOnInit() {
    this.categories = this.catService.getCategories()
  }
}
