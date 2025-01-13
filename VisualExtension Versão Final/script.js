chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'applyFilter') {
        let colorblindnessType = message.colorblindnessType;

        // Remove qualquer filtro existente antes de aplicar um novo
        removeLensOverlay();

        switch (colorblindnessType) {
            case 'acromatopsia':
                applyLensOverlay('acromatopsia');
                break;
            case 'acromatomalia':
                applyLensOverlay('acromatomalia');
                break;
            case 'deuteranomalia':
                applyLensOverlay('deuteranomalia');
                break;
            case 'deuteranopia':
                applyLensOverlay('deuteranopia');
                break;
            case 'monocromacia':
                applyLensOverlay('monocromacia');
                break;
            case 'protanomalia':
                applyLensOverlay('protanomalia');
                break;
            case 'protanopia':
                applyLensOverlay('protanopia');
                break;
            case 'tritanomalia':
                applyLensOverlay('tritanomalia');
                break;
            case 'tritanopia':
                applyLensOverlay('tritanopia');
                break;
        }
    }
});

function applyLensOverlay(type) {
    let filter = '';
    let svgFilter = '';

    // Definir o filtro CSS e SVG com base no tipo de daltonismo
    switch (type) {
        case 'acromatomalia':
            filter = 'grayscale(0.7) contrast(1.3)';
            svgFilter = "0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0";
            break;
        case 'acromatopsia':
            filter = 'grayscale(0.8) brightness(1.05)';
            svgFilter = "0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0";
            break;
        case 'deuteranomalia':
            filter = 'hue-rotate(-20deg) saturate(1.2)';
            svgFilter = "1.2, 0, 0, 0, 0,0, 1, 0, 0, 0,0, 0, 0.8, 0, 0,0, 0, 0, 1, 0";
            break;
        case 'deuteranopia':
            filter = 'hue-rotate(-20deg) saturate(1.1) brightness(1.1)';
            svgFilter = "1, 0.7, 0, 0, 0,0, 1, 0, 0, 0,0, 0, 1, 0, 0,0, 0, 0, 1, 0";
            break;
        case 'monocromacia':
            filter = 'grayscale(1) brightness(1.1)';
            break;
        case 'protanomalia':
            filter = 'hue-rotate(-30deg) saturate(1.2)';
            svgFilter = "1, 0.5, 0, 0, 0,0, 1, 0, 0, 0,0, 0, 1, 0, 0,0, 0, 0, 1, 0";
            break;
        case 'protanopia':
            filter = 'hue-rotate(-30deg) saturate(1.2) brightness(1.05)';
            svgFilter = "1, 0, 0, 0, 0,0.5, 1, 0, 0, 0,0, 0, 1, 0, 0,0, 0, 0, 1, 0";
            break;
        case 'tritanomalia':
            filter = 'hue-rotate(45deg) saturate(1.3)';
            svgFilter = "0.75, 0, 0, 0, 0,0, 1, 0, 0, 0,0, 0, 1.25, 0, 0,0, 0, 0, 1, 0";
            break;
        case 'tritanopia':
            filter = 'hue-rotate(45deg) saturate(1.2) brightness(1.05)';
            svgFilter = "0.5, 0, 0, 0, 0,0, 1, 0, 0, 0,0, 0, 1.5, 0, 0,0, 0, 0, 1, 0";
            break;
    }

    // Cria uma camada de sobreposição transparente por cima de toda a página
    let overlay = document.createElement('div');
    overlay.setAttribute('id', 'colorblindnessLensOverlay');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none'; 
    overlay.style.zIndex = '9999'; 
    overlay.style.backdropFilter = filter; 

    if (svgFilter) {
        let svgElement = makeSVGFilter(type, svgFilter);
        overlay.innerHTML = svgElement;
    }

    document.body.appendChild(overlay);
}

function removeLensOverlay() {
    let existingOverlay = document.getElementById('colorblindnessLensOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
}

// Função para gerar o filtro SVG
function makeSVGFilter(id, matrix) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter id="${id}">
          <feColorMatrix type="matrix" values="${matrix}"/>
        </filter>
      </svg>
    `;
}
