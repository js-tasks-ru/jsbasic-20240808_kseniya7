function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const ageCell = row.cells[1];
    const genderCell = row.cells[2];
    const statusCell = row.cells[3];

    const available = statusCell.getAttribute('data-available');
    if (available === 'true') {
      row.classList.add('available');
    } else if (available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }

    const gender = genderCell.textContent;
    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    const age = parseInt(ageCell.textContent);
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  });
}
