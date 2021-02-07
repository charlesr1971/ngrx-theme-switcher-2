export function readTheme ( materialThemes: any, id: number ) : any {
    let result = {};
    materialThemes.map( ( currentValue, index ) => {
      if(currentValue['id'] === id){
        result = currentValue;
      }
    });
    return result;
}