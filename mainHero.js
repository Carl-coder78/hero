// Script para TYPEWRITER
document.addEventListener('DOMContentLoaded', function() { 
    const texts = {
        top: '¿Buscas vehículo',
        bottom: 'o vivienda?'
    };

    function typeWriter(el, text, onComplete) {
        let index = 0;

        function type() {
            if (index < text.length) {
                el.textContent += text.charAt(index);
                index++;

                // velocidad variable
                const currentChar = text.charAt(index - 1);
                let delay;
                if (/[.,;!?]/.test(currentChar)) {
                    delay = 300 + Math.random() * 200;
                } else if (currentChar === ' ') {
                    delay = 100 + Math.random() * 50;
                } else {
                    delay = 50 + Math.random() * 100;
                }

                setTimeout(type, delay);
            } else if (onComplete) {
                onComplete(); // cuando termine esta línea
            }
        }

        el.textContent = ''; // reset
        type();
    }

    function startTyping() {
        const topEl = document.getElementById('writer-top');
        const bottomEl = document.getElementById('writer-bottom');

        // limpiar antes de empezar
        topEl.textContent = '';
        bottomEl.textContent = '';

        // primero top
        typeWriter(topEl, texts.top, () => {
            // cuando termine, sigue bottom
            typeWriter(bottomEl, texts.bottom, () => {
                // cuando termina bottom, espera 10s y reinicia
                setTimeout(startTyping, 10000);
            });
        });
    }

    // arrancar la secuencia
    startTyping();
}); 

// CAJAS OPTION

document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.hero-options .option');
    let activeOption = document.querySelector('.option.active');

    function activateOption(option) {
        if (activeOption) {
            activeOption.classList.remove('active');
        }
        option.classList.add('active');
        activeOption = option;
    }

    options.forEach(option => {
        // Activa al hacer click
        option.addEventListener('click', () => activateOption(option));
        
        // Y opcional: activar también con hover
        // option.addEventListener('mouseover', () => activateOption(option));
    });

    // Efecto de escritura
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    }
});



// Efecto de un solo velo de sombra
// const layer = document.querySelector('.layer-bg');
// const steps = 80;

// // Parámetros del velo
// const angle = 35; // ángulo de inclinación
// const color = 'rgba(207,206,206,0.01)'; 

// const shadows = [];

// for (let i = 1; i <= steps; i++) {
//   const offsetX = -i;
//   const offsetY = i * Math.tan(angle * Math.PI / 180);
//   shadows.push(`${offsetX}px ${offsetY}px 0 ${color}`);
// }

// layer.style.boxShadow = shadows.join(',\n');


 // Overlay
 // const layer = document.querySelector('.layer-bg');

// // Parámetros del velo
// const angle = 35; // ángulo de inclinación
// const color = 'rgba(145,144,144,0.01)'; // translúcido y claro
// const steps = 80; // pasos simulados (para calcular longitud)

// // Crear el overlay
// const overlay = document.createElement('div');
// overlay.style.position = 'absolute';
// overlay.style.top = '0';
// overlay.style.left = '-100%';
// overlay.style.width = '200%';  // suficiente para cubrir horizontalmente
// overlay.style.height = '100%';
// overlay.style.pointerEvents = 'none';
// overlay.style.zIndex = '-1';

// // Crear gradiente simulando los pasos
// // Para que se vea idéntico a 80 pasos, usamos un gradiente lineal con ángulo exacto
// overlay.style.background = `linear-gradient(${angle}deg, ${color} 0%, rgba(145,144,144,0) 100%)`;

// // Asegurarnos que siga la forma del layer
// overlay.style.borderRadius = getComputedStyle(layer).borderRadius;

// layer.style.position = 'relative'; // asegurar contexto para overlay
// layer.appendChild(overlay);



// POSICION OVERLAY SHADOW 
(function () {
  const card = document.querySelector('.card-shadow');
  const bg   = document.querySelector('.bg-shadow');
  const svg  = document.querySelector('svg.overlay');
  const path = svg?.querySelector('path');
  if (!card || !bg || !svg || !path) return;

  function positionOverlay() {
    // Bounding box real del path
    const bbox = path.getBBox();

    // Normalizamos: path arranca en (0,0)
    path.setAttribute("transform", `translate(${-bbox.x},${-bbox.y})`);
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);

    // --- Aquí fijamos cuál es el codo verdadero ---
    // Tú me diste que el codo está en (182,538) respecto al path original
    // Lo convertimos a coords normalizadas (relativas al bbox)
    const anchor = {
      x: 182 - bbox.x,
      y: 538 - bbox.y
    };

    // Medidas de referencia
    const cardRect = card.getBoundingClientRect();
    const bgRect   = bg.getBoundingClientRect();
    const target = {
      x: bgRect.left - cardRect.left,
      y: bgRect.bottom - cardRect.top
    };

    // Posicionar el SVG
    svg.style.position = "absolute";
    svg.style.left   = target.x - anchor.x + "px";
    svg.style.top    = target.y - anchor.y + "px";
    svg.style.width  = bbox.width + "px";
    svg.style.height = bbox.height + "px";

    // Informe en consola
    console.log("📐 Overlay Ajustado");
    console.table({
      "BBox (L)": bbox,
      "Anchor (codo)": anchor,
      "Target bottomLeft (.bg-shadow)": target,
      "SVG style": {
        left: svg.style.left,
        top: svg.style.top,
        width: svg.style.width,
        height: svg.style.height
      }
    });
  }

  // Posiciona en carga y resize
  window.addEventListener('load', positionOverlay);
  window.addEventListener('resize', positionOverlay);

  // Observa cambios dinámicos
  const ro = new ResizeObserver(positionOverlay);
  ro.observe(bg);
})();


// MODAL CONTACTO CTRL + \ DESCOMENTA
// document.addEventListener('DOMContentLoaded', () => {
//   const modal     = document.getElementById('contactModal');
//   const form      = document.getElementById('contactForm');
//   const feedback  = document.getElementById('contactFeedback');
//   const closeBtn  = document.getElementById('closeContactModal');

//   // Selecciona tu opción “Contáctanos”
//   const contactOp = document.querySelector('.hero-options .option p')
//                      ?.textContent.trim().toLowerCase() === 'contáctanos'
//                    ? document.querySelector('.hero-options .option')
//                    : null;
//   if (!modal || !contactOp || !closeBtn || !form) return;

//   // Abrir modal
//   contactOp.addEventListener('click', () => {
//     modal.classList.add('active');
//     feedback.classList.remove('active');
//     form.style.display = '';
//     form.reset();
//   });

//   // Cerrar modal
//   closeBtn.addEventListener('click', () => modal.classList.remove('active'));
//   modal.addEventListener('click', e => {
//     if (e.target === modal) modal.classList.remove('active');
//   });

//   // Envío de formulario
//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const data = {
//       name:    form.name.value.trim(),
//       email:   form.email.value.trim(),
//       phone:   form.phone.value.trim(),
//       message: form.message.value.trim()
//     };
//     try {
//       const res = await fetch('/api/contact-request', {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify(data)
//       });
//       if (!res.ok) throw new Error(res.statusText);

//       form.style.display    = 'none';
//       feedback.classList.add('active');
//     } catch {
//       alert('Error. Intenta nuevamente.');
//     }
//   });
// });


/// MODAL CONTACTO + BLUR
document.addEventListener('DOMContentLoaded', () => {
  const blurTargets = document.querySelectorAll(
    '.hero__image, .hero__mask--upper, .hero__mask--lower'
  );

  const modal     = document.getElementById('contactModal');
  const form      = document.getElementById('contactForm');
  const feedback  = document.getElementById('contactFeedback');
  const closeBtn  = document.getElementById('closeContactModal');

  // Gatillo: la .option cuyo <p> diga Contáctanos
  const contactOp = Array.from(
    document.querySelectorAll('.hero-options .option')
  ).find(opt => {
    const txt = opt.querySelector('p')?.textContent || '';
    return txt.trim().toLowerCase() === 'contáctanos';
  });

  if (!modal || !contactOp || !closeBtn || !form || !feedback || blurTargets.length === 0) {
    console.warn('Faltan elementos requeridos para el modal de contacto');
    return;
  }

  // Mostrar modal + blur
  function openModal() {
    modal.classList.add('active');
    blurTargets.forEach(el => el.classList.add('blur'));
    feedback.classList.remove('active');
    form.style.display = '';
    form.reset();
  }

  // Ocultar modal + quitar blur
  function closeModal() {
    modal.classList.remove('active');
    blurTargets.forEach(el => el.classList.remove('blur'));
  }

  contactOp.addEventListener('click', openModal);
  closeBtn .addEventListener('click', closeModal);
  modal    .addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // Envío de formulario
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      phone:   form.phone.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const res = await fetch('/api/contact-request', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);

      form.style.display     = 'none';
      feedback.classList.add('active');
    } catch (err) {
      console.error('Error enviando petición:', err);
      alert('Ocurrió un error. Intenta nuevamente.');
    }
  });
});


// TEST medir coordenadas hero__image viewport
document.addEventListener('DOMContentLoaded', () => {
  const selectorColorMap = {
    '#main-section':       'purple',
    '.hero__box-container': 'red',
    '.hero__content':       'orange',
    '.hero__card-image':         'blue',
    '.hero__image':         'green'
  };

  function getDomPath(el) {
    if (!(el instanceof Element)) return '';
    const path = [];
    while (el.nodeType === Node.ELEMENT_NODE) {
      let sel = el.nodeName.toLowerCase();
      if (el.id) {
        sel += `#${el.id}`;
        path.unshift(sel);
        break;
      }
      if (el.classList.length) {
        sel += [...el.classList].map(c => `.${c}`).join('');
      }
      const sibs = el.parentNode
        ? Array.from(el.parentNode.children).filter(n => n.nodeName === el.nodeName)
        : [];
      if (sibs.length > 1) {
        const idx = Array.prototype.indexOf.call(el.parentNode.children, el) + 1;
        sel += `:nth-child(${idx})`;
      }
      path.unshift(sel);
      el = el.parentNode;
    }
    return path.join(' > ');
  }

  // 1. Bordes y logs
  Object.entries(selectorColorMap).forEach(([sel, color]) => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.border = `2px solid ${color}`;
      el.style.boxSizing = 'border-box';

      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const absX  = Math.round(rect.left + window.scrollX);
      const absY  = Math.round(rect.top  + window.scrollY);

      console.groupCollapsed(`%c${sel}`, `color:${color};font-weight:bold`);
      console.log('DOM Path:      ', getDomPath(el));
      console.log('Viewport (px): ', {
        top:    `${Math.round(rect.top)}px`,
        left:   `${Math.round(rect.left)}px`,
        bottom: `${Math.round(rect.bottom)}px`,
        right:  `${Math.round(rect.right)}px`
      });
      console.log('Documento (px):', { x: absX + 'px', y: absY + 'px' });
      console.log('Tamaño (px):   ', {
        width:  `${Math.round(rect.width)}px`,
        height: `${Math.round(rect.height)}px`
      });
      console.log('Márgenes:      ', {
        top:    style.marginTop,
        right:  style.marginRight,
        bottom: style.marginBottom,
        left:   style.marginLeft
      });
      console.groupEnd();
    });
  });

  // 2. Overlay de rejilla numerada cada 10px
  const main = document.getElementById('main-section');
  if (!main) return;

  // asegurar contenedor relativo
  if (getComputedStyle(main).position === 'static') {
    main.style.position = 'relative';
  }

  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position:      'absolute',
    top:           '0',
    left:          '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
    zIndex:        '9999'
  });
  main.appendChild(overlay);

  const { width, height } = main.getBoundingClientRect();

  // líneas verticales y etiquetas X
  for (let x = 0; x <= width; x += 10) {
    // línea
    const vLine = document.createElement('div');
    Object.assign(vLine.style, {
      position:    'absolute',
      top:         '0',
      left:        `${x}px`,
      width:       '1px',
      height:      '100%',
      background:  'rgba(0,0,0,0.1)'
    });
    overlay.appendChild(vLine);

    // etiqueta
    const vLabel = document.createElement('div');
    vLabel.innerText = `${x}px`;
    Object.assign(vLabel.style, {
      position:        'absolute',
      top:             '-14px',
      left:            `${x}px`,
      transform:       'translateX(-50%)',
      fontSize:        '10px',
      lineHeight:      '10px',
      color:           'rgba(0,0,0,0.5)',
      backgroundColor: 'rgba(255,255,255,0.7)',
      padding:         '0 2px',
      whiteSpace:      'nowrap'
    });
    overlay.appendChild(vLabel);
  }

  // líneas horizontales y etiquetas Y
  for (let y = 0; y <= height; y += 10) {
    // línea
    const hLine = document.createElement('div');
    Object.assign(hLine.style, {
      position:    'absolute',
      top:         `${y}px`,
      left:        '0',
      width:       '100%',
      height:      '1px',
      background:  'rgba(0,0,0,0.1)'
    });
    overlay.appendChild(hLine);

    // etiqueta
    const hLabel = document.createElement('div');
    hLabel.innerText = `${y}px`;
    Object.assign(hLabel.style, {
      position:        'absolute',
      top:             `${y}px`,
      left:            '-32px',
      transform:       'translateY(-50%)',
      fontSize:        '10px',
      lineHeight:      '10px',
      color:           'rgba(0,0,0,0.5)',
      backgroundColor: 'rgba(255,255,255,0.7)',
      padding:         '0 2px',
      whiteSpace:      'nowrap'
    });
    overlay.appendChild(hLabel);
  }
});


// LOADER
document.addEventListener('DOMContentLoaded', () => {
  const heroBox = document.querySelector('.hero__box-container');
  const heroContent = document.querySelector('.hero__content');
  let loader = document.getElementById('loader');
  const road = document.getElementById('roadContainer') || document.querySelector('.road-container');

  if (!heroBox || !heroContent || !road) return;

  // Si el loader NO está dentro del heroBox, lo movemos (así las coordenadas relativas funcionan)
  if (!loader || loader.parentElement !== heroBox) {
    // Si no existe loader en DOM o está fuera, creamos/ubicamos correctamente
    loader = loader || document.createElement('div');
    loader.id = 'loader';
    // si ya había uno fuera, lo traemos; si no, asegúrate de que tu HTML lo provea
    if (!loader.parentElement) heroBox.appendChild(loader);
    // Si no tenías roadContainer asignado, asegura que road esté dentro loader en tu HTML
  }

  // Fuerza dimensiones definidas (coinciden con CSS)
  road.style.width = road.style.width || '400px';
  road.style.height = road.style.height || '400px';

  function positionRoad() {
    const boxRect = heroBox.getBoundingClientRect();
    const contentRect = heroContent.getBoundingClientRect();

    // centro del heroContent relativo al heroBox
    const centerX = (contentRect.left - boxRect.left) + (contentRect.width / 2);
    const centerY = (contentRect.top  - boxRect.top)  + (contentRect.height / 2);

    road.style.left = `${Math.round(centerX)}px`;
    road.style.top  = `${Math.round(centerY)}px`;
    // transform: translate(-50%,-50%) en CSS hará el centrado exacto
  }

  // inicial y en resize/orientationchange
  positionRoad();
  window.addEventListener('resize', positionRoad);
  window.addEventListener('orientationchange', positionRoad);
  road.classList.add('ready');

  // --- sincronización del fade ---
  const carMotion = document.getElementById('carMotion'); // tu <animateMotion id="carMotion">

  // obtiene dur en ms desde el atributo dur (ej: "4s" ó "4000ms")
  function getDurMs(el) {
    if (!el) return 4000;
    const dur = el.getAttribute('dur') || '4s';
    if (dur.endsWith('ms')) return parseFloat(dur);
    if (dur.endsWith('s')) return parseFloat(dur) * 1000;
    return parseFloat(dur) * 1000;
  }

  const animationDurationMs = getDurMs(carMotion);

  // tiempo de fade extra (from CSS var --loader-fade or computed)
  const computed = getComputedStyle(loader);
  const cssFadeSec = parseFloat(computed.transitionDuration) || 0.6;
  const fadeMs = cssFadeSec * 1000;

  let fallbackTimer = setTimeout(startFade, animationDurationMs + 120); // fallback

function startFade() {
  clearTimeout(fallbackTimer);

  // oculta el vehículo al terminar el recorrido
  const vehicle = road.querySelector('#vehicle'); // dale id="vehicle" a tu <g> del coche
  if (vehicle) vehicle.style.display = 'none';

  if (!loader.classList.contains('fade-out')) {
    loader.classList.add('fade-out');
    setTimeout(() => {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      heroContent.classList.add('visible');
    }, fadeMs + 40);
  }
}


  // escucha SMIL endEvent (cuando animateMotion finaliza)
  if (carMotion && typeof carMotion.addEventListener === 'function') {
    try {
      carMotion.addEventListener('endEvent', () => {
        clearTimeout(fallbackTimer);
        startFade();
      });
    } catch (e) {
      // algunos entornos no exponen endEvent; fallback timer hará su trabajo
    }
  } else {
    // si no hay animateMotion, usar el fallback
    fallbackTimer = setTimeout(startFade, animationDurationMs + 120);
  }
});














