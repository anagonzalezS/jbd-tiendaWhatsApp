import React, { useState } from 'react'; 
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './Contacto.css';

const Contacto = () => {
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Estado para mostrar el mensaje de éxito

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios')
      .required('El nombre es obligatorio'),
    correo: Yup.string()
      .email('Correo electrónico no válido')
      .required('El correo electrónico es obligatorio'),
    message: Yup.string()
      .max(1000, 'El mensaje no debe exceder los 1000 caracteres') // Límite de 1000 caracteres
      .required('El mensaje es obligatorio'),
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch('http://localhost:5000/procesar-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values), // Aquí se envían los datos del formulario
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta de la red');
      }
      return response.json();
    })
    .then(data => {
      console.log('Correo enviado:', data);
      setFeedbackMessage('Gracias por su mensaje. En breve será respondido.'); // Mensaje cordial
      resetForm(); // Resetea el formulario después de enviar
    })
    .catch((error) => {
      console.error('Error al enviar el correo:', error);
      setFeedbackMessage('Hubo un error al enviar su mensaje. Intente de nuevo más tarde.'); // Mensaje de error
    });
  };

  return (
    <Container id="contacto" className="contacto-container my-5">
      <h2 className="text-center mb-4">Contacto</h2>

      {feedbackMessage && (
        <Alert variant="success" className="text-center">
          {feedbackMessage}
        </Alert>
      )}

      <Formik
        initialValues={{ nombre: '', correo: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Form className="contact-form" onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="formName">
                  <Form.Label>Nombre y apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    name="nombre"
                    value={values.nombre}  // Debe coincidir con el campo de initialValues
                    onChange={handleChange}
                    isInvalid={touched.nombre && !!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="formEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu correo"
                    name="correo"
                    value={values.correo}  // Debe coincidir con el campo de initialValues
                    onChange={handleChange}
                    isInvalid={touched.correo && !!errors.correo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.correo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Escribe tu mensaje (máximo 1000 caracteres)"
                name="message"
                value={values.message}  // Debe coincidir con el campo de initialValues
                onChange={handleChange}
                isInvalid={touched.message && !!errors.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Contacto;
