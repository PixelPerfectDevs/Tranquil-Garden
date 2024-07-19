import { createTheme} from '@mui/material/styles';
import { Caveat, Roboto } from 'next/font/google';
const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
  });
  const caveat= Caveat({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
  });
export const Themes = createTheme({
    palette: {
    Mauve : '#962E2A',
    Transparent: '#ffffff00',
    DustyRose: 'E3867D',
    SoftBlueGray: '#CEE6F2'
  },

  typography: {
    fontFamily: [
        caveat.style.fontFamily,
        roboto.style.fontFamily,
    ]
}
});