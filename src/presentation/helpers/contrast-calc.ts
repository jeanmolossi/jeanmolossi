export function getContrast(hexColor: string) {
    if (hexColor.startsWith('#')) {
        hexColor = hexColor.replace('#', '');
    }

    if (hexColor.length === 3) {
        // Its duplicate three char hexcode to six char hexcode
        // E.g. 012 => 001122
        hexColor = hexColor
            .split('')
            .map(c => `${c}${c}`) // duplicate color code
            .join('');
    }

    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);

    const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

    return yiq >= 128 ? 'black' : 'white';
}
