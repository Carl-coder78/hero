    const texts = [
      '¿Buscas vehículo o inmueble?...',
      'En Vitriz encuentras lo que necesitas,\ntodo en una sola vitrina.'
    ];

    const typewriterEl = document.getElementById('typewriter');
    let textIndex = 0, charIndex = 0;
    const typingSpeed = 40, pauseBetween = 1500;

    function type() {
      if (!typewriterEl) return;
      const t = texts[textIndex];

      if (charIndex < t.length) {
        const ch = t[charIndex];
        if (ch === '\n') {
          typewriterEl.appendChild(document.createElement('br'));
          charIndex++;
        } else if (ch === '.' && t.slice(charIndex, charIndex + 3) === '...') {
          const s = document.createElement('span');
          s.className = 'dots';
          s.textContent = '...';
          typewriterEl.appendChild(s);
          charIndex += 3;
        } else {
          typewriterEl.appendChild(document.createTextNode(ch));
          charIndex++;
        }
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(() => {
          typewriterEl.textContent = '';
          charIndex = 0;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(type, typingSpeed);
        }, pauseBetween);
      }
    }

    document.addEventListener('DOMContentLoaded', type);
 