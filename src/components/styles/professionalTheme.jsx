export const getProfessionalTheme = (isNight) => ({
    titleColor: isNight ? '#003300' : '#1e3a5f',       // darker forest green
    subtitleColor: isNight ? '#002200' : '#2a3d4d',    // very dark muted green
    textColor: isNight ? '#001a00' : '#3b3b3b',         // almost black-green text
    textShadow: isNight
        ? '0 1px 2px rgba(0, 50, 0, 0.6)'               // darker greenish shadow
        : '0 1px 2px rgba(30, 60, 90, 0.3)',
    divider: isNight
        ? 'linear-gradient(to right, #00994d, #001100, #00994d)' // darker gradient (deeper green)
        : 'linear-gradient(to right, #c2e9f6, #f0faff, #c2e9f6)',
    titleLine: isNight ? '#00994d' : '#88ccff',         // line under titles (deeper green)
    badgeShadow: isNight
        ? '0 0 6px rgba(0, 153, 77, 0.3)'               // softer badge glow
        : '0 2px 5px rgba(0,0,0,0.2)',
    badgeBg: isNight ? '#001100' : '#ffffff',           // super dark green background
});
