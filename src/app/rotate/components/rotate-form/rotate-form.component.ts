import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, tap } from 'rxjs';
import { ArrayValidators } from 'src/app/shared/validators/array.validators';
import { MatrixValidators } from './../../../shared/validators/matrix.validator';
import { StringValidators } from './../../../shared/validators/string.validator';

@Component({
  selector: 'app-rotate-form',
  templateUrl: './rotate-form.component.html',
  styleUrls: ['./rotate-form.component.css']
})
export class RotateFormComponent implements OnInit {
  @Output() entryValue: EventEmitter<string> = new EventEmitter();

  public form!: FormGroup;
  public originalMatrix: any[][]  = [];
  public matrix: any[][] = [];
  public readonly ENTRIES: any[][] = [
    ['4', '1', '2', '7', '5', '3', '8', '9', '6'],
    ['9', '4', '1', '2'],
    ['-9'],
    ['2', '3'],
    ['3', '-5', '-2'],
    ['1', '1', '1', '1', '1'],
    ['1', '1', '1', '1', '1', '323'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
  ];

  get f() {
    return this.form;
  }

  get fastEntry(): FormControl {
    return this.f.get('fast_entry') as FormControl;
  }

  get entries(): FormArray {
    return this.f.get('entries') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    this.listenToInputChanges();

    this.fastEntry.setValue(
      this
        .ENTRIES
        .map(a => `${a.toString()}\n`)
        .join("")
    );

    // const entry = this.entries.controls.find(entry => {
    //   return entry.valid? entry : null
    // });
    // this.entryValue.emit(entry?.value || '');
  }

  public listenToInputChanges(){
    this.fastEntry
      .valueChanges
      .pipe(
        tap(value => this.entries.clear()),
        map((value: string) => {
          return value
            .split("\n")
            .filter(value => value)
            .map(value => value.trim())
        })
      )
      .subscribe(value => {
        value.forEach((element: string) => {
          this.entries.push(
            this.createListaNumeros(element)
          );
        });
      });
  }

  public buildForm(){
    this.form = this.formBuilder.group({
      fast_entry: ['', [Validators.required]],
      entries: this.formBuilder.array([], ArrayValidators.minLength(1)),
    });
  }
  
  public entryValueSelected(entryValue: string){
    this.entryValue.emit(entryValue);
  }

  public createListaNumeros(element?: string) {
    return this.formBuilder.control(
      element || '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(4000),
        MatrixValidators.isSquareMatrix,
        StringValidators.stringHasOnlyNumbers
      ]
    );
  }  

  public deleteEntries(indexEntries: number): void {
    this.entries.removeAt(indexEntries)
  }
}