import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RotateFormComponent } from './rotate-form.component';

describe('RotateFormComponent', () => {
  let component: RotateFormComponent;
  let fixture: ComponentFixture<RotateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotateFormComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entries must be valid', () => {
    const VALID_ENTRIES = [
      `4,1,2,7,5,3,8,9,6`,
      `9,4,1,2`,
      `1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16`,
      `-9`
    ];

    VALID_ENTRIES.forEach(value => {
      it(`should '${value}' must be valid`, () => {
        component.entries.at(0).setValue(value);
    
        expect(component.entries.at(0).valid).toEqual(true);
      });
    });
  });

  describe('entries must be invalid', () => {
    const INVALID_ENTRIES = [
      `2,3`,
      `3,-5,-2`,
      `1, 2, 3, - 4`,
      `1,1,1,1,1`,
      `1a, 2s, 3f, 4s`,
      ``
    ];

    INVALID_ENTRIES.forEach(value => {
      it(`should '${value}' must be invalid`, () => {
        component.entries.at(0).setValue(value);
    
        expect(component.entries.at(0).valid).toEqual(false);
      });
    })
  });

  describe('entryValueSelected', () => {
    it(`should emit entryValue when user click in "Rotacionar"`, () => {
      spyOn(component.entryValue, 'emit');

      component.entryValueSelected(`4,1,2,7,5,3,8,9,6`)
      expect(component.entryValue.emit).toHaveBeenCalledOnceWith(`4,1,2,7,5,3,8,9,6`);
    });
  });

  describe('deleteEntries', () => {
    it(`should delete an element on form array`, () => {
      component.deleteEntries(0);
      component.deleteEntries(1);
      expect(component.entries.value.length).toEqual(6);
    });
  });  
});
