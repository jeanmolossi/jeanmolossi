type AcceptNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Timer = `${AcceptNum}${AcceptNum}${'s' | 'm' | 'h' | 'd'}`;

export function timeIn(t: Timer): number {
    const timeMap = {
        s: 1,
        m: 60,
        h: 60 * 60,
        d: 60 * 60 * 24,
    };

    const range = t.replace(/\d/gi, '') as keyof typeof timeMap; // parse key of time range
    const time = +t.replace(/\D/gi, ''); // remove letters and convert to number

    const timeRange = timeMap[range] || timeMap.h; // select property time range: ;

    return timeRange * time;
}
