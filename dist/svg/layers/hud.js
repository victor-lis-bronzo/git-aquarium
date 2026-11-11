export function renderHud(width, height, metrics) {
    return `
  <g id="hud">
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="6" fill="none" stroke="rgba(255,255,255,0.18)"/>
    <g transform="translate(${width - 220} 10)">
      <rect width="210" height="36" rx="8" fill="rgba(10,8,5,0.45)" stroke="rgba(255,255,255,0.22)"/>
      <text x="10" y="16" fill="#f9e8c6" font-family="ui-sans-serif, system-ui" font-size="11">30d: ${metrics.last30DaysContributions} · 7d: ${metrics.last7DaysContributions}</text>
      <text x="10" y="29" fill="#cdd9ea" font-family="ui-sans-serif, system-ui" font-size="11">Streak: ${metrics.currentStreak}d</text>
    </g>
  </g>`;
}
//# sourceMappingURL=hud.js.map