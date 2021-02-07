import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeTheme } from '../themeSwitcher.actions';
import { readTheme } from '../util/readTheme';
import { MaterialThemeDataService } from '../services/material-theme-data.service';

@Component({
  selector: 'app-my-theme-switcher',
  templateUrl: './my-theme-switcher.component.html',
  styleUrls: ['./my-theme-switcher.component.css'],
})
export class MyThemeSwitcherComponent implements OnInit {

  debug = true;

  themeSwitch$: Observable<number>;
  themeSwitch = '';
  colorNameTitle = '';

  materialThemes = [];

  selectionPrimaryHex = '';
  selectionText = '';
  themeSwitchObj = {};
  themeSwitchImperative = 0;

  constructor(
    private store: Store<{ themeSwitch: number }>,
    private MaterialThemeDataService: MaterialThemeDataService
    ) {
    
    this.themeSwitch$ = store.select('themeSwitch');

    this.materialThemes = this.MaterialThemeDataService.materialThemes;

    if(this.debug) {
      console.log('my-theme-switcher.component: this.materialThemes: ',this.materialThemes);
    }

  }

  changeTheme(event: any) {
    const id = event.value;
    if(this.debug) {
      console.log('my-theme-switcher.component: id: ',id);
    }
    this.store.dispatch(changeTheme({ id: id }));
    const materialTheme = this.readTheme(id);
    if('primaryHex' in materialTheme){
      this.selectionPrimaryHex = materialTheme['primaryHex'];
    }
    if('colorNameTitle' in materialTheme){
      this.selectionText = materialTheme['colorNameTitle'];
    }
  }

  ngOnInit() {

    this.store.select('themeSwitch').subscribe( ( id ) => {
      const materialTheme = readTheme( this.MaterialThemeDataService.materialThemes, id );
      this.colorNameTitle = materialTheme['colorNameTitle']
    })

  }

  readTheme(id: number): any {
    let result = {};
    this.materialThemes.map( ( currentValue, index ) => {
      if(currentValue['id'] === id){
        result = currentValue;
      }
    });
    return result;
  }

}