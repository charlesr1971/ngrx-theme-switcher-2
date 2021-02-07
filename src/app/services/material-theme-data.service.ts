import { Injectable } from '@angular/core';
import { createTheme } from '../util/createTheme';
import { materialThemeData } from '../util/data';

@Injectable({
  providedIn: 'root'
})
export class MaterialThemeDataService {

  materialThemes = [];

  constructor() { 
    this.materialThemes = materialThemeData.map( ( currentValue, index ) => {
      const theme = currentValue;
      return createTheme(theme);
    });
  }
  
}
