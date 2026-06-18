import { useState, useEffect } from 'react';
import { AccessibilityContext } from './AccessibilityContext';

export const AccessibilityProvider = ({ children }) => {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem('sinca-theme') || 'normal';
  });

  const [fontSize, setFontSize] = useState(() => {
    return Number(localStorage.getItem('sinca-fontSize')) || 16;
  });

  const [subtitulos, setSubtitulos] = useState(() => {
    return localStorage.getItem('sinca-subs') === 'true' || true;
  });

  const [modoSimple, setModoSimple] = useState(() => {
    return localStorage.getItem('sinca-modo') === 'true';
  });

  const [readingMask, setReadingMask] = useState(() => {
    return localStorage.getItem('sinca-reading-mask') === 'true';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', tema);
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    if (modoSimple) {
      document.body.classList.add('modo-simple');
    } else {
      document.body.classList.remove('modo-simple');
    }

    if (readingMask) {
      document.body.classList.add('reading-mask');
    } else {
      document.body.classList.remove('reading-mask');
    }
  }, [tema, fontSize, modoSimple, readingMask]);

  const cambiarTema = (nuevoTema) => {
    setTema(nuevoTema);
    localStorage.setItem('sinca-theme', nuevoTema);
  };

  const cambiarFontSize = (nuevoSize) => {
    setFontSize(nuevoSize);
    localStorage.setItem('sinca-fontSize', nuevoSize);
  };

  const cambiarSubtitulos = (valor) => {
    setSubtitulos(valor);
    localStorage.setItem('sinca-subs', String(valor));
  };

  const cambiarModoSimple = (valor) => {
    setModoSimple(valor);
    localStorage.setItem('sinca-modo', String(valor));
  };

  const cambiarReadingMask = (valor) => {
    setReadingMask(valor);
    localStorage.setItem('sinca-reading-mask', String(valor));
    window.dispatchEvent(new Event('reading-mask-change'));
  };

  const resetearAccesibilidad = () => {
    setTema('normal');
    setFontSize(16);
    setSubtitulos(true);
    setModoSimple(false);
    setReadingMask(false);
    document.body.removeAttribute('data-theme');
    document.body.classList.remove('modo-simple', 'reading-mask');
    localStorage.clear();
    window.dispatchEvent(new Event('reading-mask-change'));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        tema,
        fontSize,
        subtitulos,
        modoSimple,
        readingMask,
        cambiarTema,
        cambiarFontSize,
        cambiarSubtitulos,
        cambiarModoSimple,
        cambiarReadingMask,
        resetearAccesibilidad,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};