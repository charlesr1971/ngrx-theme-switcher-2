import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeTheme } from '../themeSwitcher.actions';
import { createTheme } from '../util/createTheme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-theme-switcher',
  templateUrl: './my-theme-switcher.component.html',
  styleUrls: ['./my-theme-switcher.component.css'],
})
export class MyThemeSwitcherComponent implements OnInit {

  debug = true;

  themeSwitch$: Observable<number>;
  themeSwitch = '';

  materialThemes = [];

  materialThemeData = [
    {
      themeName:'theme-1',
      colorName:'$mat-blue-grey',
      primaryIndex:'500',
      primaryHex:'#607D8B'
    },
    {
      themeName:'theme-2',
      colorName:'$mat-red',
      primaryIndex:'500',
      primaryHex:'#F44336'
    },
    {
      themeName:'theme-3',
      colorName:'$mat-pink',
      primaryIndex:'500',
      primaryHex:'#E91E63'
    },
    {
      themeName:'theme-4',
      colorName:'$mat-purple',
      primaryIndex:'500',
      primaryHex:'#9C27B0'
    },
    {
      themeName:'theme-5',
      colorName:'$mat-deep-purple',
      primaryIndex:'500',
      primaryHex:'#673AB7'
    },
    {
      themeName:'theme-6',
      colorName:'$mat-indigo',
      primaryIndex:'500',
      primaryHex:'#3F51B5'
    },
    {
      themeName:'theme-7',
      colorName:'$mat-blue',
      primaryIndex:'500',
      primaryHex:'#3F51B5'
    },
    {
      themeName:'theme-8',
      colorName:'$mat-light-blue',
      primaryIndex:'500',
      primaryHex:'#03A9F4'
    },
    {
      themeName:'theme-9',
      colorName:'$mat-cyan',
      primaryIndex:'500',
      primaryHex:'#00BCD4'
    },
    {
      themeName:'theme-10',
      colorName:'$mat-teal',
      primaryIndex:'500',
      primaryHex:'#009688'
    },
    {
      themeName:'theme-11',
      colorName:'$mat-green',
      primaryIndex:'500',
      primaryHex:'#4CAF50'
    },
    {
      themeName:'theme-12',
      colorName:'$mat-light-green',
      primaryIndex:'500',
      primaryHex:'#8BC34A'
    },
    {
      themeName:'theme-13',
      colorName:'$mat-lime',
      primaryIndex:'500',
      primaryHex:'#CDDC39'
    },
    {
      themeName:'theme-14',
      colorName:'$mat-yellow',
      primaryIndex:'500',
      primaryHex:'#FFEB3B'
    },
    {
      themeName:'theme-15',
      colorName:'$mat-amber',
      primaryIndex:'500',
      primaryHex:'#FFC107'
    },
    {
      themeName:'theme-16',
      colorName:'$mat-orange',
      primaryIndex:'500',
      primaryHex:'#FF9800'
    },
    {
      themeName:'theme-17',
      colorName:'$mat-deep-orange',
      primaryIndex:'500',
      primaryHex:'#FF5722'
    },
    {
      themeName:'theme-18',
      colorName:'$mat-brown',
      primaryIndex:'500',
      primaryHex:'#795548'
    },
    {
      themeName:'theme-19',
      colorName:'$mat-gray',
      primaryIndex:'500',
      primaryHex:'#9E9E9E'
    }
  ];

  selectionPrimaryHex = '';
  selectionText = '';
  themeSwitchObj = {};
  themeSwitchImperative = 0;

  constructor(
    private store: Store<{ themeSwitch: number }>,
    private http: HttpClient
    ) {
    
    this.themeSwitch$ = store.select('themeSwitch');

    //this.themeSwitchImperative = store.get('themeSwitch');

    //this.themeSwitchObj = this.readTheme(this.themeSwitch$);

    this.materialThemes = this.materialThemeData.map( ( currentValue, index ) => {
      const theme = currentValue;
      return createTheme(theme);
    });

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