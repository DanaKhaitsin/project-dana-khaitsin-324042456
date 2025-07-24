document.addEventListener('DOMContentLoaded', () => {
  const ageRestriction = document.getElementById('ageRestriction');
  const intensity = document.getElementById('intensity');
  const intensityMin = document.getElementById('intensityMin');
  const intensityMax = document.getElementById('intensityMax');
  const sendBtn = document.getElementById('sendBtn');
  const editBtn = document.getElementById('editBtn');
  const messageDiv = document.getElementById('message');



  const editData = JSON.parse(localStorage.getItem('editAttraction'));

  if (editData) {
    document.getElementById('attractionName').value = editData.name;
    document.getElementById('mainFeeling').value = editData.feeling;
    document.getElementById('yesNo').value = editData.yesNo;
    document.getElementById('equipment').value = editData.equipment;
    document.getElementById('ageRestriction').value = editData.age;
    document.getElementById('intensity').value = editData.intensity;
    document.getElementById('email').value = editData.email;
    editBtn.style.display = 'inline-block';

    ageRestriction.dispatchEvent(new Event('change'));
  }



  function updateIntensityLimits(min, max, defaultValue = min) {
    intensity.min = min;
    intensity.max = max;

    if (parseInt(intensity.value) < min || parseInt(intensity.value) > max) {
      intensity.value = defaultValue;
    }

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
    var selectedAge ="";
    //switch (ageRestriction.value)
    switch (document.getElementById('ageRestriction').value)
    {
      case 'toddler':
        selectedAge = "תינוק";
        break;
      case 'teen':
        selectedAge = "נער";
        break;

      case 'adult':
        selectedAge = "מבוגר";
        break;

      default:
        selectedAge = "ללא הגבלה";
    }




    const name = document.getElementById('attractionName').value.trim();
    const feeling = document.getElementById('mainFeeling').value;
    const yesNo = document.getElementById('yesNo').value;
    const equipment = document.getElementById('equipment').value.trim();
    const age = selectedAge;
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

      const list = JSON.parse(localStorage.getItem('circusAttractionList')) || [];
      list.push(formData);
      localStorage.setItem('circusAttractionList', JSON.stringify(list));
      localStorage.removeItem('editAttraction');

      messageDiv.textContent = "פרטים נשלחו!";
      messageDiv.className = "success";
    } else {
      messageDiv.textContent = "אנא בדוק נתונים ונסה שוב...";
      messageDiv.className = "error";
    }
  });


  editBtn.addEventListener('click', () => {
    if (!editData) return;

    var selectedAge ="";
    switch (document.getElementById('ageRestriction').value)
    {
      case 'toddler':
        selectedAge = "תינוק";
        break;
      case 'teen':
        selectedAge = "נער";
        break;

      case 'adult':
        selectedAge = "מבוגר";
        break;

      default:
        selectedAge = "ללא הגבלה";
    }

    const updated = {
      name: document.getElementById('attractionName').value.trim(),
      feeling: document.getElementById('mainFeeling').value,
      yesNo: document.getElementById('yesNo').value,
      equipment: document.getElementById('equipment').value.trim(),
      age: selectedAge,
      intensity: document.getElementById('intensity').value,
      email: document.getElementById('email').value.trim()
    };

    if (
      !updated.name || !updated.feeling || !updated.yesNo ||
      !updated.age || !updated.email || !validateEmail(updated.email)
    ) {
      messageDiv.textContent = "Recheck your details";
      messageDiv.className = "error";
      return;
    }

    const list = JSON.parse(localStorage.getItem('circusAttractionList')) || [];
    list[editData.index] = updated;
    localStorage.setItem('circusAttractionList', JSON.stringify(list));
    localStorage.removeItem('editAttraction');

messageDiv.textContent = "שונה בהצלחה!";
messageDiv.className = "success";

  });
});
