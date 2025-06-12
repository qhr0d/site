// === Структура метрик ===
const metricsStructure = {
  R1: {
    Physical: [
      { name: 'Фізичний контроль доступу', ids: ['q1_1'] },
      { name: 'Фізична різноманітність', ids: ['q1_2'] }
    ],
    Organizational: [
      { name: 'Контроль доступу на основі ролей', ids: ['q3_1'] },
      { name: 'Аудит та звітність', ids: ['q5_1'] },
      { name: 'Управління внутрішніми загрозами 1', ids: ['q6_5'] }
    ],
    Technical: [
      { name: 'Сегментація мережі', ids: ['q2_1'] },
      { name: 'Шифрування та аутентифікація', ids: ['q2_2'] },
      { name: 'Логічний контроль доступу', ids: ['q3_2'] }
    ]
  },
  R2: {
    Physical: [
      { name: 'Резервування пристроїв', ids: ['q4_1'] },
      { name: 'Резервування каналів зв’язку та джерел живлення', ids: ['q4_2'] }
    ],
    Organizational: [
      { name: 'План дій у надзвичайних ситуаціях', ids: ['q6_1'] },
      { name: 'Політика управління змінами', ids: ['q7_2'] }
    ],
    Technical: [
      { name: 'Резервне копіювання серверів та носіїв даних', ids: ['q4_3'] },
      { name: 'Різноманітність вендорів', ids: ['q4_4'] }
    ]
  },
  R3: {
    Physical: [
      { name: 'Фізичний моніторинг', ids: ['q1_3'] },
      { name: 'Захист даних', ids: ['q8_1'] }
    ],
    Organizational: [
      { name: 'Централізований SOC', ids: ['q5_2'] },
      { name: 'Організація реагування та відновлення', ids: ['q6_2'] },
      { name: 'Пом’якшення наслідків та аналіз', ids: ['q6_3'] },
      { name: 'Ефективність внутрішнього спілкування', ids: ['q7_3'] }
    ],
    Technical: [
      { name: 'Система виявлення вторгнень (IDS)', ids: ['q5_3'] },
      { name: 'Система оновлення та виправлення вразливостей', ids: ['q8_2'] },
      { name: 'Реєстрація та аналіз інцидентів', ids: ['q5_4'] }
    ]
  },
  R4: {
    Physical: [
      { name: 'Забезпечення фізичного доступу', ids: ['q1_4'] },
      { name: 'Безперебійна доступність', ids: ['q4_5'] }
    ],
    Organizational: [
      { name: 'Управління надзвичайними ситуаціями', ids: ['q6_4'] },
      { name: 'Навчання та підвищення обізнаності', ids: ['q7_4'] },
      { name: 'Управління внутрішніми загрозами 2', ids: ['q7_1'] }
    ],
    Technical: [
      { name: 'Обробка та прийняття рішень на рівні системи', ids: ['q5_5'] },
      { name: 'Мережеве широкомасштабне забезпечення зв’язку', ids: ['q2_3'] }
    ]
  }
};

// === Стратегічні ваги R1..R4 ===
const strategicWeights = {
  R1: 0.3597,
  R2: 0.1640,
  R3: 0.1931,
  R4: 0.2832
};

let userStrategicWeights = {};

// === Ваги доменів ===
const domainWeights = {
  Physical:       0.2833,
  Organizational: 0.3233,
  Technical:      0.3934
};

let userDomainWeights = {};

// === Ваги підметрик ===
const submetricsWeights = {
  R1: {
    Physical: {
      'Фізичний контроль доступу': 0.5289,
      'Фізична різноманітність':   0.4711
    },
    Organizational: {
      'Контроль доступу на основі ролей':       0.3773,
      'Аудит та звітність':                     0.4472,
      'Управління внутрішніми загрозами 1':     0.1755
    },
    Technical: {
      'Сегментація мережі':           0.2536,
      'Шифрування та аутентифікація': 0.4384,
      'Логічний контроль доступу':    0.3080
    }
  },
  R2: {
    Physical: {
      'Резервування пристроїв':                          0.4891,
      'Резервування каналів зв’язку та джерел живлення': 0.5109
    },
    Organizational: {
      'План дій у надзвичайних ситуаціях': 0.6231,
      'Політика управління змінами':       0.3769
    },
    Technical: {
      'Резервне копіювання серверів та носіїв даних': 0.7903,
      'Різноманітність вендорів':                     0.2097
    }
  },
  R3: {
    Physical: {
      'Фізичний моніторинг': 0.2560,
      'Захист даних':        0.7440
    },
    Organizational: {
      'Централізований SOC':                    0.3200,
      'Організація реагування та відновлення':  0.2965,
      'Пом’якшення наслідків та аналіз':        0.2121,
      'Ефективність внутрішнього спілкування':  0.1714
    },
    Technical: {
      'Система виявлення вторгнень (IDS)':             0.2910,
      'Система оновлення та виправлення вразливостей': 0.3224,
      'Реєстрація та аналіз інцидентів':               0.3867
    }
  },
  R4: {
    Physical: {
      'Забезпечення фізичного доступу':  0.3557,
      'Безперебійна доступність':        0.6443
    },
    Organizational: {
      'Управління надзвичайними ситуаціями': 0.4071,
      'Навчання та підвищення обізнаності':  0.2349,
      'Управління внутрішніми загрозами 2':  0.3580
    },
    Technical: {
      'Мережеве широкомасштабне забезпечення зв’язку': 0.5824,
      'Обробка та прийняття рішень на рівні системи':  0.4176
    }
  }
};

// === Функція для зчитування відповіді з одного поля ===
function getAnswerValue(qId) {
  const radio = document.querySelector(`input[name="${qId}"]:checked`);
  return radio ? parseInt(radio.value, 10) : null;
}

// === Збір усіх відповідей у вкладений обʼєкт ===
function collectAllAnswers() {
  const result = {};
  for (let Rkey of Object.keys(metricsStructure)) {
    result[Rkey] = {};
    for (let domain of Object.keys(metricsStructure[Rkey])) {
      for (let sm of metricsStructure[Rkey][domain]) {
        const answersForSM = [];
        for (let qId of sm.ids) {
          const val = getAnswerValue(qId);
          answersForSM.push(val);
        }
        result[Rkey][sm.name] = answersForSM;
      }
    }
  }
  return result;
}

// === Обчислення ECS ===
function computeECS(answersForSM) {
  const sum = answersForSM.reduce((acc, v) => acc + v, 0);
  return sum / answersForSM.length;
}

// === Обчислення DS ===
function computeDomainScore(Rkey, domainKey, allAnswers) {
  let ds = 0;
  for (let sm of metricsStructure[Rkey][domainKey]) {
    const smName = sm.name;
    const answersForSM = allAnswers[Rkey][smName];
    const ecs = computeECS(answersForSM);
    const wSM = submetricsWeights[Rkey][domainKey][smName] || 0;
    ds += ecs * wSM;
  }
  return ds;
}

// === Обчислення Ri (до нормалізації) ===
function computeCi(Rkey, allAnswers) {
  const dsPhys = computeDomainScore(Rkey, 'Physical', allAnswers);
  const dsOrg  = computeDomainScore(Rkey, 'Organizational', allAnswers);
  const dsTech = computeDomainScore(Rkey, 'Technical', allAnswers);

  let wPhys, wOrg, wTech;
  if (Object.keys(userDomainWeights).length > 0) {
    wPhys = userDomainWeights['Physical'];
    wOrg  = userDomainWeights['Organizational'];
    wTech = userDomainWeights['Technical'];
  } else {
    wPhys = domainWeights.Physical;
    wOrg  = domainWeights.Organizational;
    wTech = domainWeights.Technical;
  }

  return wPhys * dsPhys + wOrg * dsOrg + wTech * dsTech;
}

// === Нормалізація Ri у [0..1] ===
function normalizeCi(ci) {
  return (ci - 1) / 4;
}

// === Обчислення CSF ===
function computeCSF(allCiN) {
  let csf = 0;
  for (let Rkey of Object.keys(strategicWeights)) {
    let wRi;
    if (Object.keys(userStrategicWeights).length > 0) {
      wRi = userStrategicWeights[Rkey];
    } else {
      wRi = strategicWeights[Rkey];
    }
    const ciN = allCiN[Rkey];
    csf += wRi * ciN;
  }
  return csf;
}

// === Обчислення R ===
function computeResilienceR(csf) {
  return (1 - csf) / Math.log(1 / csf);
}

// === Основна функція, що обчислює всі метрики та R ===
function computeResilienceMetrics(allAnswers) {
  const allCi  = {};
  const allCiN = {};

  for (let Rkey of Object.keys(metricsStructure)) {
    const ci    = computeCi(Rkey, allAnswers);
    allCi[Rkey] = ci;
    allCiN[Rkey] = normalizeCi(ci);
  }

  const csf = computeCSF(allCiN);

  const resilienceR = computeResilienceR(csf);

  displayResults({ allCi, allCiN, csf, resilienceR });
}

// === Відображення результатів у таблицю ===
function displayResults(data) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  // let html = `<h3 class="fw-bold text-blue-3 mt-4">Результати обчислення кіберрезильєнтності</h3>`;
  // html += `<table class="table table-bordered mt-3">
  //            <thead>
  //              <tr>
  //                <th>Стратегічна (Ri) метрика</th>
  //                <th>Значення R<sub>i</sub> (1–5)</th>
  //                <th>Нормалізоване R<sub>iN</sub> (0–1)</th>
  //              </tr>
  //            </thead>
  //            <tbody>`;

  // for (let Rkey of Object.keys(data.allCi)) {
  //   html += `<tr>
  //              <td>${Rkey}</td>
  //              <td>${data.allCi[Rkey].toFixed(3)}</td>
  //              <td>${data.allCiN[Rkey].toFixed(3)}</td>
  //            </tr>`;
  // }

  // html += `</tbody></table>`;
  // html += `<p class="fw-bold text-blue-3 mt-3">CSF (Critical Service Functionality): ${data.csf.toFixed(3)}</p>`;
  const html = `<p class="fw-bold text-blue-3 mt-3">Загальний рівень кіберрезильєнтності Вашого енергопідприємства R: ${data.resilienceR.toFixed(3)}</p>`;

  container.innerHTML = html;
}

const resilienceTitles = {
  R1: 'Міцність',
  R2: 'Надлишковість',
  R3: 'Винахідливість',
  R4: 'Швидкість реагування'
};

const COLOR_MAP = {
  R1: { background: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)', point: 'rgba(54, 162, 235, 1)' },
  R2: { background: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)', point: 'rgba(255, 159, 64, 1)' },
  R3: { background: 'rgba(255, 205, 86, 0.2)', border: 'rgba(255, 205, 86, 1)', point: 'rgba(255, 205, 86, 1)' },
  R4: { background: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)', point: 'rgba(255, 99, 132, 1)' }
};

const DOMAIN_COLORS = {
  Physical: { background: 'rgba(54, 162, 235, 0.6)', border: 'rgba(54, 162, 235, 1)' },
  Organizational: { background: 'rgba(75, 192, 192, 0.6)', border: 'rgba(75, 192, 192, 1)' },
  Technical: { background: 'rgba(255, 99, 132, 0.6)', border: 'rgba(255, 99, 132, 1)' }
};

// === Функція для розбиття тексту на рядки по maxChars символів ===
function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (let word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current += ' ' + word;
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

// === Візуалізація радарних діаграм ===
function renderRadarChart(canvasId, title, rawLabels, data, colors) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  const labels = rawLabels.map(label => wrapText(label, 10));

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: title,
        data,
        backgroundColor: colors.background,
        borderColor: colors.border,
        pointBackgroundColor: colors.point,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          min: 1,
          max: 5,
          ticks: { stepSize: 1 },
          angleLines: { color: '#ddd' },
          grid: { color: '#eee' },
          pointLabels: { font: { size: 16 }, color: '#2d336b' }
        }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: title, font: { size: 18 }, color: '#2d336b' }
      }
    }
  });
}

// === Функція для побудови радарів за ECS-підметриками ===
function renderAllRadarCharts(allAnswers) {
  for (let Rkey of Object.keys(metricsStructure)) {
    const rawLabels = [];
    const data   = [];

    for (let domain of Object.keys(metricsStructure[Rkey])) {
      for (let sm of metricsStructure[Rkey][domain]) {
        const ecs = computeECS(allAnswers[Rkey][sm.name]);
        rawLabels.push(sm.name);
        data.push(+ecs.toFixed(2));
      }
    }

    const colors = COLOR_MAP[Rkey] || COLOR_MAP['R1'];

    const displayTitle = resilienceTitles[Rkey] || Rkey;
    renderRadarChart(`radar-${Rkey}`, displayTitle, rawLabels, data, colors);
  }
}

// === Функція для побудови кругової діаграми ===
function renderStrategicPieChart(allCiN) {
  const ctx = document.getElementById('strategic-pie').getContext('2d');
  const labels = Object.keys(allCiN).map(Rkey => `${resilienceTitles[Rkey]} (${Rkey})`);
  const data = Object.values(allCiN);
  const backgroundColors = Object.keys(allCiN).map(Rkey => COLOR_MAP[Rkey].background);
  const borderColors = Object.keys(allCiN).map(Rkey => COLOR_MAP[Rkey].border);

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { size: 14 },
            color: '#2d336b'
          }
        },
        title: {
          display: true,
          text: 'Розподіл стратегічних метрик резильєнтності',
          font: { size: 18 },
          color: '#2d336b'
        }
      }
    }
  });
}

// === Функція для побудови стовпчикової діаграми ===
function renderDomainBarChart(allDS) {
  const ctx = document.getElementById('domain-bar').getContext('2d');
  const labels = Object.keys(allDS).map(Rkey => `${resilienceTitles[Rkey]} (${Rkey})`);
  const domains = ['Physical', 'Organizational', 'Technical'];

  const datasets = domains.map(domain => ({
    label: domain,
    data: labels.map((_, idx) => allDS[Object.keys(allDS)[idx]][domain]),
    backgroundColor: DOMAIN_COLORS[domain].background,
    borderColor: DOMAIN_COLORS[domain].border,
    borderWidth: 1
  }));

  new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Стратегічні метрики', color: '#2d336b', font: { size: 14 } } },
        y: { 
          beginAtZero: true, 
          max: 5, 
          ticks: { stepSize: 1 },
          title: { display: true, text: 'Оцінка доменів', color: '#2d336b', font: { size: 14 } }
        }
      },
      plugins: {
        legend: { position: 'top', labels: { font: { size: 14 }, color: '#2d336b' } },
        title: { display: true, text: 'Доменні метрики для кожної стратегічної метрики', font: { size: 18 }, color: '#2d336b' }
      },
      barPercentage: 0.8,
      categoryPercentage: 0.9
    }
  });
}

// === Обробник події для кнопки "Відправити відповіді" ===
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#survey form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const allAnswers = collectAllAnswers();

    // Перевірка на пропущені відповіді
    for (let Rkey of Object.keys(allAnswers)) {
      for (let smName of Object.keys(allAnswers[Rkey])) {
        if (allAnswers[Rkey][smName].some(v => v === null)) {
          alert(`Будь ласка, дайте відповідь на питання "${smName}".`);
          return;
        }
      }
    }

    // Обчислення основних метрик
    computeResilienceMetrics(allAnswers);

    // Обчислення даних для графіків
    const allCi = {};
    const allCiN = {};
    const allDS = {};
    for (let Rkey of Object.keys(metricsStructure)) {
      const ci = computeCi(Rkey, allAnswers);
      allCi[Rkey] = ci;
      allCiN[Rkey] = normalizeCi(ci);
      allDS[Rkey] = {
        Physical: computeDomainScore(Rkey, 'Physical', allAnswers),
        Organizational: computeDomainScore(Rkey, 'Organizational', allAnswers),
        Technical: computeDomainScore(Rkey, 'Technical', allAnswers)
      };
    }

    // Рендеринг графіків
    renderStrategicPieChart(allCi);
    renderDomainBarChart(allDS);
    renderAllRadarCharts(allAnswers);

    document.getElementById('results').style.display = 'block';
    document.getElementById('diagrams').style.display = 'block';
  });
});

// === Обробник події для кнопки "Продовжити" ===
document.getElementById('proceed-button').addEventListener('click', function() {
  const expertChoice = document.getElementById('expert-weights').checked;
  const customChoice = document.getElementById('custom-weights').checked;
  const weightsSection = document.getElementById('weights');

  if (expertChoice) {
    // Якщо обрано експертні ваги, приховуємо секцію вводу ваг
    weightsSection.style.display = 'none';
    userStrategicWeights = {};
    userDomainWeights = {};
    alert('Ви обрали опитування з вагами від експертів. Починаємо опитування.');
  } else if (customChoice) {
    // Якщо обрано введення власних ваг, показуємо секцію для введення
    weightsSection.style.display = 'block';
  } else {
    alert('Будь ласка, оберіть один із варіантів.');
  }
});

  // Перевірка введених ваг
document.getElementById('save-weights').addEventListener('click', function() {
  // Перевірка стратегічних метрик
  const strategicInputs = document.querySelectorAll('#strategic-weights-table input[type="number"]');
  let strategicSum = 0;
  let allStrategicFilled = true;
  strategicInputs.forEach(input => {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0 || value > 1) {
      allStrategicFilled = false;
    } else {
      strategicSum += value;
    }
  });

  // Перевірка доменних метрик
  const domainInputs = document.querySelectorAll('#domain-weights-table input[type="number"]');
  let domainSum = 0;
  let allDomainFilled = true;
  domainInputs.forEach(input => {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0 || value > 1) {
      allDomainFilled = false;
    } else {
      domainSum += value;
    }
  });

  // Перевірка умов
  if (!allStrategicFilled || !allDomainFilled) {
    alert('Будь ласка, заповніть всі ваги коректними значеннями (від 0 до 1).');
    return;
  }

  if (Math.abs(strategicSum - 1) > 0.001) {
    alert('Сума ваг для стратегічних метрик повинна дорівнювати 1.');
    return;
  }

  if (Math.abs(domainSum - 1) > 0.001) {
    alert('Сума ваг для доменних метрик повинна дорівнювати 1.');
    return;
  }

  // Збереження стратегічних ваг
  userStrategicWeights['R1'] = parseFloat(document.querySelector('input[name="R1-weight"]').value);
  userStrategicWeights['R2'] = parseFloat(document.querySelector('input[name="R2-weight"]').value);
  userStrategicWeights['R3'] = parseFloat(document.querySelector('input[name="R3-weight"]').value);
  userStrategicWeights['R4'] = parseFloat(document.querySelector('input[name="R4-weight"]').value);

  // Збереження доменних ваг
  userDomainWeights['Physical'] = parseFloat(document.querySelector('input[name="Physical-weight"]').value);
  userDomainWeights['Organizational'] = parseFloat(document.querySelector('input[name="Organizational-weight"]').value);
  userDomainWeights['Technical'] = parseFloat(document.querySelector('input[name="Technical-weight"]').value);

  alert('Ваги збережено успішно!');
});
