const form = document.getElementById('assessment-form');
const resultBadge = document.getElementById('result-badge');
const resultName = document.getElementById('result-name');
const resultDescription = document.getElementById('result-description');

function evaluateMaddox() {
  const pain = document.getElementById('dolor').checked;
  const erythema = document.getElementById('eritema').checked;
  const swelling = document.getElementById('hinchazon').checked;
  const hardening = document.getElementById('endurecimiento').checked;
  const cordon = document.getElementById('cordon').checked;
  const extension = document.getElementById('extension').value;
  const purulent = document.getElementById('secrecion').checked;
  const thrombosis = document.getElementById('trombosis').checked;
  const perfusion = document.getElementById('perfusion').checked;

  const noSigns = !pain && !erythema && !swelling && !hardening && !cordon && !purulent && !thrombosis && !perfusion;

  if (noSigns) {
    return {
      grade: 0,
      title: 'Grado 0',
      description: 'No se evidencia dolor, eritema, hinchazón, endurecimiento ni cordón venoso palpable. La zona está sin signos de flebitis.'
    };
  }

  if (pain && !erythema && !swelling && !hardening && !cordon && !purulent && !thrombosis && !perfusion) {
    return {
      grade: 1,
      title: 'Grado 1',
      description: 'Dolor en la zona de punción sin eritema, edema ni cordón venoso palpable. Se observa flebitis inicial leve.'
    };
  }

  if ((pain && (erythema || swelling)) && !hardening && !cordon && !purulent && !thrombosis && !perfusion) {
    return {
      grade: 2,
      title: 'Grado 2',
      description: 'Dolor asociado a eritema y/o hinchazón, sin cordón venoso palpable. Existe inflamación moderada de la vena.'
    };
  }

  if (
    (pain && erythema && swelling) &&
    (hardening || (cordon && extension === 'menor-6')) &&
    !purulent && !thrombosis && !perfusion
  ) {
    return {
      grade: 3,
      title: 'Grado 3',
      description: 'Dolor, eritema, hinchazón y endurecimiento o cordón venoso palpable menor de 6 cm. La flebitis es intensa y requiere intervención.'
    };
  }

  if (
    (pain && erythema && swelling && hardening) &&
    ((cordon && extension === 'mayor-6') || purulent)
  ) {
    return {
      grade: 4,
      title: 'Grado 4',
      description: 'Se observa dolor, eritema, hinchazón, endurecimiento y cordón venoso palpable mayor de 6 cm y/o secreción purulenta. Es una flebitis severa.'
    };
  }

  if (thrombosis || perfusion) {
    return {
      grade: 5,
      title: 'Grado 5',
      description: 'Existe sospecha de trombosis venosa o dificultad/interrupción de la perfusión junto con signos inflamatorios. Se considera una emergencia clínica.'
    };
  }

  if (pain || erythema || swelling || hardening || cordon || purulent) {
    const grouped = [
      pain ? 'dolor' : null,
      erythema ? 'eritema' : null,
      swelling ? 'hinchazón' : null,
      hardening ? 'endurecimiento' : null,
      cordon ? 'cordón venoso' : null,
      purulent ? 'secreción purulenta' : null,
    ].filter(Boolean);

    return {
      grade: 2,
      title: 'Grado 2',
      description: `Se reportan signos de flebitis con ${grouped.join(', ')}. Se recomienda seguimiento y valoración clínica continua.`
    };
  }

  return {
    grade: 0,
    title: 'Grado 0',
    description: 'No se evidencia alteración compatible con flebitis en la valoración actual.'
  };
}

function setResult(result) {
  const gradeColors = {
    0: ['#dff7ea', '#2d8f5d'],
    1: ['#fff7d7', '#b68300'],
    2: ['#fff0df', '#d97b19'],
    3: ['#ffe3e3', '#d94848'],
    4: ['#ffd5d5', '#bf2e2e'],
    5: ['#ffd8d8', '#9a1d1d']
  };

  const [bg, textColor] = gradeColors[result.grade] || ['#edf5ff', '#1a4d8f'];
  resultBadge.textContent = result.title;
  resultBadge.style.background = bg;
  resultBadge.style.color = textColor;
  resultName.textContent = result.title;
  resultDescription.textContent = result.description;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const result = evaluateMaddox();
  setResult(result);
});
