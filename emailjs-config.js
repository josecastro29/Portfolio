// EmailJS Configuration for Portfolio Contact Form
// Este arquivo contém a configuração do EmailJS para envio direto de emails

// Inicializar EmailJS com chave pública
emailjs.init("Z8fX2sL_eNxYVqJ7K");

// Configuração do serviço
const EMAIL_CONFIG = {
    serviceID: 'service_portfolio_jose',
    templateID: 'template_contact_jose',
    userID: 'Z8fX2sL_eNxYVqJ7K'
};

// Função para enviar email diretamente
async function sendEmailDirect(formData) {
    try {
        const templateParams = {
            from_name: formData.get('from_name'),
            reply_to: formData.get('reply_to'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'josemarinho2004@gmail.com'
        };

        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templateID,
            templateParams,
            EMAIL_CONFIG.userID
        );

        return response;
    } catch (error) {
        throw error;
    }
}

// Template de email que será usado:
/*
Assunto: Nova mensagem do portfólio - {{subject}}

Nome: {{from_name}}
Email: {{reply_to}}
Assunto: {{subject}}

Mensagem:
{{message}}

---
Esta mensagem foi enviada através do portfólio online.
*/
