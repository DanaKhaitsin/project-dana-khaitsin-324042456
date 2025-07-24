document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cardContainer');
  const selector = document.getElementById('entrySelector');
  const sortSelector = document.getElementById('sortFeeling');
  const message = document.getElementById('displayMessage');

  let data = JSON.parse(localStorage.getItem('circusAttractionList')) || [];

  function renderCards() {
    container.innerHTML = '';
    selector.innerHTML = '<option value="">בחר הצעה קיימת</option>';

    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>סוג רגש:</strong> ${item.feeling}</p>
        <p><strong>האם יש השתתפות:</strong> ${item.yesNo}</p>
        <p><strong>ציוד נדרש:</strong> ${item.equipment || 'None'}</p>
        <p><strong>הגבלת גיל:</strong> ${item.age}</p>
        <p><strong>אינטנסיביות:</strong> ${item.intensity}</p>
        <p><strong>תיבת דוא"ל:</strong> ${item.email}</p>
      `;
      container.appendChild(card);

      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = `${item.name} (${item.email})`;
      selector.appendChild(opt);
    });
  }

  renderCards();

  window.deleteSelected = () => {
    const index = selector.value;
    if (index === "") {
      message.textContent = "אנא בחר את ההצעה שתרצה למחוק...";
      message.className = "error";
      return;
    }

    data.splice(index, 1);
    localStorage.setItem('circusAttractionList', JSON.stringify(data));
    window.location.reload();
  };

  window.loadToForm = () => {
    const index = selector.value;
    if (index === "") {
      message.textContent = "אנא בחר את ההצעה שתרצה לערוך...";
      message.className = "error";
      return;
    }

    const selected = data[index];
    localStorage.setItem('editAttraction', JSON.stringify({ ...selected, index: Number(index) }));
    window.location.href = 'index.html';
  };

  window.sortByFeeling = () => {
    const selectedFeeling = sortSelector.value;
    if (!selectedFeeling) {
      data = JSON.parse(localStorage.getItem('circusAttractionList')) || [];
    } else {
      data.sort((a, b) => {
        if (a.feeling === selectedFeeling && b.feeling !== selectedFeeling) return -1;
        if (a.feeling !== selectedFeeling && b.feeling === selectedFeeling) return 1;
        return 0;
      });
    }
    renderCards();
  };
});
