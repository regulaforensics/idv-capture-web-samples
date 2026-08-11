import { createRoot } from 'react-dom/client';
import App from './App';

export async function loadFonts() {
    const fonts = await Promise.all([
        new FontFace("Bitcount Single", `url("https://incandescent-fairy-1c2024.netlify.app/fonts/BitcountSingle-VariableFont_CRSV,ELSH,ELXP,slnt,wght.ttf")`, {
            weight: "400",
        }).load(),
    ]);

    fonts.forEach((font) => document.fonts.add(font));
}

await loadFonts();

const element = document.getElementById('root');
const root = createRoot(element as HTMLElement);

root.render(<App />);
