import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotateComponent } from './rotate.component';

describe('RotateComponent', () => {
  let component: RotateComponent;
  let fixture: ComponentFixture<RotateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotateComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rotateMatrix', () => {
    it('must rotate a 2x2 matrix clockwise', () => {
      const originalMatrix = [
        [1, 2],
        [3, 4]
      ];

      const firstRotatedMatrix = component.rotateMatrix(originalMatrix, 0, 0, 2, 2);
      expect(firstRotatedMatrix).toEqual([
        [3, 1],
        [4, 2]
      ]);

      const secondRotatedMatrix = component.rotateMatrix(firstRotatedMatrix, 0, 0, 2, 2);
      expect(secondRotatedMatrix).toEqual([
        [4, 3],
        [2, 1]
      ]);
    });

    it('must rotate a 3x3 matrix clockwise', () => {
      const originalMatrix = [
        [4, 1, 2],
        [7,	5, 3],
        [8,	9, 6]
      ];

      const firstRotatedMatrix = component.rotateMatrix(originalMatrix, 0, 0, 3, 3);
      expect(firstRotatedMatrix).toEqual([
        [7,	4, 1],
        [8,	5, 2],
        [9,	6, 3]
      ]);

      const secondRotatedMatrix = component.rotateMatrix(firstRotatedMatrix, 0, 0, 3, 3);
      expect(secondRotatedMatrix).toEqual([
        [8,	7, 4],
        [9,	5, 1],
        [6,	3, 2]
      ]);
    });
  });
  describe('rotateMatrixAlreadyDefined', () => {
    it('should rotate a square matrix when component.matrix is already defined', () => {
      component.matrix = [
        ['4', '1'],
        ['3', '2'],
      ];
      component.rotateMatrixAlreadyDefined();
      expect(component.matrix).toEqual([
        ['3', '4'],
        ['2', '1'],
      ])
    });
  });

  describe('onEntryValueChange', () => {
    it('must go to the next step, convert into an array of chunks (given a comma-separated string) and must rotate a 2x2 matrix clockwise', () => {
      const entryValueMock = '1,2,3,4';
      component.onEntryValueChange(entryValueMock);
      expect(component.matrixOriginal).toEqual([
        ['1', '2'],
        ['3', '4'],
      ])
      expect(component.STEPS).toBe(1);
      expect(component.matrix).toEqual([
        ['3', '1'],
        ['4', '2']
      ]);
    });
  })
});
