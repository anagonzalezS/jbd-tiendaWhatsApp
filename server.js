const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Para datos de formularios
app.use(bodyParser.json()); // Para datos JSON

// Ruta para manejar GET en la raíz
app.get('/', (req, res) => {
  res.send('Servidor corriendo y listo para recibir correos.');
});

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anaester.sanchezgonzalez@gmail.com', // Tu correo
    pass: 'utkvgubvwkacbfce', // Tu contraseña o app password
  },
});

// Ruta para procesar el envío del correo
app.post('/procesar-email', (req, res) => {
  const { nombre, correo, message } = req.body; // Extraer datos del formulario

  if (!nombre || !correo || !message) {
    return res.status(400).send({ message: 'Faltan campos en el formulario' });
  }

  // Definir el contenido del correo electrónico
  const mailOptions = {
    from: 'JBD Accesorios <anaester.sanchezgonzalez@gmail.com>', // Correo desde el cual se envía
    to: 'anaester.sanchezgonzalez@gmail.com', // Tu correo donde recibes el mensaje
    subject: `Nuevo mensaje de ${nombre}`, // Asunto del correo
    text: `Has recibido un nuevo mensaje de ${nombre} (${correo}):\n\n${message}`, // Cuerpo del mensaje con el correo del cliente
    replyTo: correo, // El cliente al que se le responderá
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).send({ message: 'Error al enviar el correo', error });
    }
    console.log('Correo enviado:', info);
    return res.status(200).send({ message: 'Correo enviado', info });
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
