const form = document.querySelector('.form');
const submitButton = document.querySelector('.form__btn');

(function() {
    emailjs.init({publicKey: "E2CD12DXUxtwL-PFL"}); 
})();

const showAlert = (text, type) => {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert + alert--${type}`;
    alertDiv.innerText = text;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        if (!alertDiv) {
            return;
        }
        alertDiv.classList.add('alert--fade-out');
        
        setTimeout(() => {
            if (!alertDiv) {
                return;
            }
            alertDiv.remove();
        }, 1000);
    }, 5000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    submitButton.disabled = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const seminar = document.getElementById('seminar').value;


    emailjs.send('service_mu51rug', 'template_qnhvm53', {
        to_email: email,
        name,
        seminar
    })
    .then(() => {
        showAlert("✓ Ваша заявка успешно отправлена и находится в обработке. Ожидайте email с подтверждением бронирования.", "success");
        form.reset();
    })
    .catch(() => {
        showAlert("× Произошла ошибка во время отправки email. Попробуйте ещё раз", "error")
    })
    .finally(() => {
        submitButton.disabled = false;
    })
})