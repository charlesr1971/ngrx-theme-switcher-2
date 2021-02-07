export function createTheme(theme: any): any {
    const debug = false;
    const themeObj = theme;
    const _theme = themeObj['themeName'].toString() === '0' ? '' : themeObj['themeName'];
    const result = {
        default: 'theme-1-dark',
        id: 1,
        stem: 'theme-1',
        light: 'theme-1-light',
        dark: 'theme-1-dark'
    };
    if(debug) {
        console.log('http.service: createTheme(): _theme ',_theme);
    }
    if(_theme !== '') {
        result['default'] = _theme + '-dark';
        const themeArray = _theme.split('-');
        if(Array.isArray(themeArray) && themeArray.length === 2){
            const id = parseInt(themeArray[1]);
            result['id'] = id;
            result['stem'] = 'theme-' + id;
            result['light'] = 'theme-' + id + '-light';
            result['dark'] = 'theme-' + id + '-dark';
            result['colorName'] = themeObj['colorName'];
            result['primaryIndex'] = themeObj['primaryIndex'];
            result['primaryHex'] = themeObj['primaryHex'];
            let colorNameTitle = themeObj['colorName'].replace("$","").replace(/[-]+/gim," ");
            result['colorNameTitle'] = colorNameTitle;
        }
    }
    if(debug) {
        console.log('util: createTheme(): result ',result);
    }
    return result;
}