export function renderStyles(): string {
  return `
  <style>
    .caustic { animation: drift 14s linear infinite; }
    .fish { animation: swim var(--dur)s ease-in-out infinite; animation-delay: calc(var(--delay) * 1s); }
    .plant { transform-origin: center bottom; animation: sway var(--sway)s ease-in-out infinite alternate; animation-delay: calc(var(--sdelay) * 1s); }
    .bubble { animation: rise var(--rise)s linear infinite; }
    .nutrient { animation: sink var(--sink)s linear infinite; }
    @keyframes swim { 0%,100% { transform: translate(0,0); } 50% { transform: translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px)); } }
    @keyframes sway { from { transform: rotate(-2deg); } to { transform: rotate(2deg); } }
    @keyframes rise { from { transform: translateY(0); opacity: 0.1; } to { transform: translateY(-220px); opacity: 0.9; } }
    @keyframes sink { from { transform: translateY(0); opacity: 0.9; } to { transform: translateY(190px); opacity: 0.2; } }
    @keyframes drift { from { transform: translateX(-18px); } to { transform: translateX(18px); } }
  </style>`;
}
