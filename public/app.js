const randomForm = document.querySelector('#random-form');
const randomResult = document.querySelector('#random-result');
const randomError = document.querySelector('#random-error');
const dashInput = document.querySelector('#dash-input');
const dashResult = document.querySelector('#dash-result');
const dashError = document.querySelector('#dash-error');
const countInput = document.querySelector('#count-input');
const countResult = document.querySelector('#count-result');
const wordLabel = document.querySelector('#word-label');
const countError = document.querySelector('#count-error');

async function postUtility(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Something went wrong');
  }

  return result;
}

randomForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  randomError.textContent = '';

  try {
    const result = await postUtility('/api/random-integer', {
      min: Number(randomForm.elements.min.value),
      max: Number(randomForm.elements.max.value),
    });
    randomResult.textContent = result.value;
  } catch (error) {
    randomError.textContent = error.message;
  }
});

let dashTimeout;
dashInput.addEventListener('input', () => {
  clearTimeout(dashTimeout);
  dashTimeout = setTimeout(async () => {
    dashError.textContent = '';
    try {
      const result = await postUtility('/api/spaces-to-dashes', { value: dashInput.value });
      dashResult.textContent = result.value || 'Your-dashed-text';
    } catch (error) {
      dashError.textContent = error.message;
    }
  }, 120);
});

countInput.addEventListener('input', async () => {
  countError.textContent = '';
  try {
    const result = await postUtility('/api/count-words', { value: countInput.value });
    countResult.textContent = result.value;
    wordLabel.textContent = result.value === 1 ? 'WORD' : 'WORDS';
  } catch (error) {
    countError.textContent = error.message;
  }
});

document.querySelector('#copy-result').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(dashResult.textContent);
    button.textContent = 'COPIED';
    setTimeout(() => {
      button.textContent = 'COPY';
    }, 1200);
  } catch {
    dashError.textContent = 'Clipboard access is unavailable in this browser.';
  }
});