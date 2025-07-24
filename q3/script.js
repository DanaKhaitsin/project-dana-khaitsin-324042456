document.addEventListener('DOMContentLoaded', () => {
  const ageRestriction = document.getElementById('ageRestriction');
  const intensity = document.getElementById('intensity');
  const intensityMin = document.getElementById('intensityMin');
  const intensityMax = document.getElementById('intensityMax');
  const sendBtn = document.getElementById('sendBtn');
  const messageDiv = document.getElementById('message');

  function updateIntensityLimits(min, max, defaultValue = min) {
    intensity.min = min;
    intensity.max = max;
    intensity.value = defaultValue;
    intensityMin.textContent = min;
    intensityMax.textContent = max;
  }

  ageRestriction.addEventListener('change', function () {
    switch (this.value) {
      case 'toddler':
        updateIntensityLimits(1, 2);
        break;
      case 'adult':
        updateIntensityLimits(4, 5);
        break;
      default:
        updateIntensityLimits(1, 5, 3);
    }
  });

  function validateEmail(email) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(email);
  }

  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('attractionName').value.trim();
    const feeling = document.getElementById('mainFeeling').value;
    const yesNo = document.getElementById('yesNo').value;
    const equipment = document.getElementById('equipment').value.trim();
    const age = ageRestriction.value;
    const intensityVal = intensity.value;
    const email = document.getElementById('email').value.trim();

    let valid = true;

    if (!name || !feeling || !yesNo || !age || !email || !validateEmail(email)) {
      valid = false;
    }

    if (valid) {
      const formData = {
        name,
        feeling,
        yesNo,
        equipment,
        age,
        intensity: intensityVal,
        email
      };

      //localStorage.setItem('circusAttractionData', JSON.stringify(formData));

      let existing = JSON.parse(localStorage.getItem('circusAttractionList')) || [];
      existing.push(formData);
      localStorage.setItem('circusAttractionList', JSON.stringify(existing));

      messageDiv.textContent = "All done";
      messageDiv.className = "success";
    } else {
      messageDiv.textContent = "Recheck your details";
      messageDiv.className = "error";
    }
  });
});
