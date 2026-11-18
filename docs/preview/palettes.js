// Single source for the 3 palette proposals (used by preview page + contrast check)
const PALETTES = {
  A: { name: 'Liquid Silver', mood: 'technical, futuristic; pairs with the liquid-metal logo',
    ink: '#0A0A0A', paper: '#FFFFFF', surface: '#F3F4F5', line: '#E2E4E7',
    text: '#0A0A0A', muted: '#5C6168', onDark: '#F5F6F7', mutedOnDark: '#A3A8AF',
    accent: '#C4C8CE', accentStrong: '#4B5058', accentOnLight: '#4B5058', accentOnDark: '#C4C8CE', darkAlt: '#141516' },
  B: { name: 'Bone & Charcoal', mood: 'soft, editorial, gallery-like',
    ink: '#0B0B0A', paper: '#FFFFFF', surface: '#EDE7DC', line: '#DDD6C9',
    text: '#0B0B0A', muted: '#615C54', onDark: '#EDE7DC', mutedOnDark: '#A9A398',
    accent: '#EDE7DC', accentStrong: '#2B2A27', accentOnLight: '#2B2A27', accentOnDark: '#EDE7DC', darkAlt: '#2B2A27' },
  C: { name: 'Ink Navy', mood: 'corporate, trustworthy, finance-grade',
    ink: '#0A0A0A', paper: '#FFFFFF', surface: '#EEF1F6', line: '#D9DEE8',
    text: '#0A0A0A', muted: '#556074', onDark: '#FFFFFF', mutedOnDark: '#A7B2C6',
    accent: '#0F1E3A', accentStrong: '#0F1E3A', accentOnLight: '#0F1E3A', accentOnDark: '#9FB3D9', darkAlt: '#0F1E3A' },
};
function lum(hex){const c=hex.replace('#','').match(/../g).map(h=>{const v=parseInt(h,16)/255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];}
function contrast(a,b){const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+0.05)/(y+0.05);}
function pairs(p){return [
  ['Body text on page', p.text, p.paper, 4.5], ['Muted text on page', p.muted, p.paper, 4.5],
  ['Body text on surface', p.text, p.surface, 4.5], ['Muted text on surface', p.muted, p.surface, 4.5],
  ['Text on dark (ink)', p.onDark, p.ink, 4.5], ['Muted on dark (ink)', p.mutedOnDark, p.ink, 4.5],
  ['Text on dark alt', p.onDark, p.darkAlt, 4.5], ['Muted on dark alt', p.mutedOnDark, p.darkAlt, 4.5],
  ['Emphasis on page', p.accentOnLight, p.paper, 4.5], ['Emphasis on dark', p.accentOnDark, p.ink, 4.5],
  ['Primary button (paper on ink)', p.paper, p.ink, 4.5], ['Dark-section button (ink on onDark)', p.ink, p.onDark, 4.5],
];}
if (typeof module !== 'undefined') module.exports = { PALETTES, contrast, pairs };
