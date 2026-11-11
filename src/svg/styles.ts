export function renderStyles(): string {
  return `
  <style>
    .caustic { animation: drift 14s linear infinite; }
    .fish { animation: swim calc(var(--dur) * 1s) ease-in-out infinite; animation-delay: calc(var(--delay) * 1s); }
    .plant { transform-box: fill-box; transform-origin: center bottom; animation: sway calc(var(--sway) * 1s) ease-in-out infinite alternate; animation-delay: calc(var(--sdelay) * 1s); }
    .bubble { animation: rise calc(var(--rise) * 1s) linear infinite; }
    .nutrient { animation: sink calc(var(--sink) * 1s) linear infinite; }
    @keyframes swim { 0%,100% { transform: translate(0,0); } 50% { transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px)); } }
    @keyframes sway { from { transform: rotate(-2deg); } to { transform: rotate(2deg); } }
    @keyframes rise { from { transform: translateY(0); opacity: 0.1; } to { transform: translateY(-220px); opacity: 0.9; } }
    @keyframes sink { from { transform: translateY(0); opacity: 0.9; } to { transform: translateY(190px); opacity: 0.2; } }
    @keyframes drift { from { transform: translateX(-18px); } to { transform: translateX(18px); } }
  </style>`;
}
