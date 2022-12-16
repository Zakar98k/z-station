(function() {
    emailjs.init('jbhc97ggVd6og6AcR');
}())

window.onload = function() {
    const formAlert = document.getElementById('form-alert')

    // Alert function to construct dismissible alert
    const alertMessage = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        formAlert.append(wrapper)
    }

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(function() {
                console.log('SUCCESS!');
                document.getElementById("contact-form").reset()
                alertMessage('Message sent successfully', 'success')
                // TODO: Add alert if message sent successfully
            }, function(error) {
                console.log('FAILED...', error);
                document.getElementById("contact-form").reset()
                alertMessage('Something went wrong. Please try again', 'danger')
                // TODO: Add alert if message sent successfully
            });
    });
}