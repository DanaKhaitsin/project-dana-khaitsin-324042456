document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cardContainer');
  const stored = localStorage.getItem('circusAttractionList');

  if (!stored) {
    container.innerHTML = '<p>No submissions found.</p>';
    return;
  }

  const attractions = JSON.parse(stored);

  attractions.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h2>${item.name}</h2>
      <p><strong>Feeling:</strong> ${item.feeling}</p>
      <p><strong>Yes/No:</strong> ${item.yesNo}</p>
      <p><strong>Equipment:</strong> ${item.equipment || 'None'}</p>
      <p><strong>Age Restriction:</strong> ${item.age}</p>
      <p><strong>Intensity:</strong> ${item.intensity}</p>
      <p><strong>Email:</strong> ${item.email}</p>
    `;

    container.appendChild(card);
  });
});
