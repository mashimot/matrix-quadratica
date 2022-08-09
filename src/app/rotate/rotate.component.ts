import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rotate',
  templateUrl: './rotate.component.html',
  styleUrls: ['./rotate.component.css']
})
export class RotateComponent implements OnInit {
  public STEPS: number = 0;
  public matrixOriginal: any[][]  = [];
  public matrix: any[][] = [];

  constructor() {}

  public ngOnInit(): void {}

  public onEntryValueChange($eventEntryValue: string){
    this.STEPS = 1;
    this.matrixOriginal = this.breakIntoChunks($eventEntryValue.split(","));
    this.beginToRotate($eventEntryValue);
  }

  public rotateMatrixAlreadyDefined(){
    this.matrix = this.rotateMatrix(this.matrix, 0, 0, this.matrix.length, this.matrix.length);
  }

  public beginToRotate(entryValue: string){
    const arraySplitted = entryValue.split(',');
    const squareMatrix = this.breakIntoChunks(arraySplitted);
    const squareMatrixLength = Math.pow(arraySplitted.length, 0.5);
    this.matrix = this.rotateMatrix(squareMatrix, 0, 0, squareMatrixLength, squareMatrixLength);
  }

  public rotateMatrix(matrix: any[][], rowStart: number, colStart: number, maxRow: number, maxCol: number) : any {
      if (rowStart >= maxRow - 1 || colStart >= maxCol - 1){ 
        return matrix;
      }

      let previous = matrix[rowStart + 1][colStart]; 
      let current;
          
      // Move os elementos da primeira linha para a direita
      for (let i = colStart; i < maxCol; i++){ 
        current = matrix[rowStart][i]; 
        matrix[rowStart][i] = previous; 
        previous = current; 
      } 
      rowStart++; 
  
      // Move os elementos da última coluna para baixo
      for (let i = rowStart; i < maxRow; i++){ 
        current = matrix[i][maxCol - 1]; 
        matrix[i][maxCol - 1] = previous; 
        previous = current; 
      } 
      maxCol--; 
  
      // Move os elementos da última linha para esquerda
      if (rowStart < maxRow){ 
        for (let i = maxCol - 1; i >= colStart; i--){ 
          current = matrix[maxRow - 1][i]; 
          matrix[maxRow - 1][i] = previous; 
          previous = current; 
        } 
      } 
      maxRow--; 
  
      // Move os elementos da primeira coluna das linhas restantes
      if (colStart < maxCol){ 
        for (let i = maxRow - 1; i >= rowStart; i--){ 
          current = matrix[i][colStart]; 
          matrix[i][colStart] = previous; 
          previous = current; 
        } 
      } 
      colStart++; 
  
      // Rotaciona recursivamente
      return this.rotateMatrix(matrix, rowStart, colStart, maxRow, maxCol);
  }

  public breakIntoChunks(array: any[]): any[][] {
    const perChunk = Math.pow(array.length, 0.5);
    return array.reduce((newArray, item, index) => {
      const chunkIndex = Math.floor(index/perChunk)
   
      if(!newArray[chunkIndex]) {
        newArray[chunkIndex] = [];
      }
   
      newArray[chunkIndex].push(item)
   
      return newArray;
    }, [])
  }
}