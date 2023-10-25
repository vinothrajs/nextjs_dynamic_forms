import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const DynamicForm = ({ metadata , onFormSubmit}) => {

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, options } = event.target;
    const newValue =
      type === 'select-multiple'
        ? Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value)
        : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleBlur = (event) => {
    const { name, value, minLength, maxLength } = event.target;
    const newErrors = { ...errors };

    if (minLength && value.length < minLength) {
      newErrors[name] = `Minimum length is ${minLength} characters.`;
    } else if (maxLength && value.length > maxLength) {
      newErrors[name] = `Maximum length is ${maxLength} characters.`;
    } else {
      delete newErrors[name]; // Remove the error if the value is valid
    }

    setErrors(newErrors);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    metadata.Form.forEach((field) => {
      if (field.required) {
        if (
          (field.type !== 'multiselect' && (!formData[field.name] || formData[field.name].trim() === '')) ||
          (field.type === 'multiselect' && (!formData[field.name] || formData[field.name].length === 0))
        ) {
          newErrors[field.name] = 'Field is required.';
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid. Perform save operation with data:', formData);
      onFormSubmit(formData);
      setFormData({});
      setErrors({});
    }
  };

  return (
 <>
    <Container>
   
      <form onSubmit={handleSubmit}>
      {metadata.Form.map((field, index) => (
        <Row className='customRow'>
          <Col>
          <div key={index}>
          <Col xs={12} md={6}> 
              <label htmlFor={field.name}>{field.label}</label>
          </Col>
          <Col xs={12} md={6}> 
          {field.type === 'text' ? (
            <input
              type="text"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              onBlur={handleBlur}
              minLength={field.minLength}
              maxLength={field.maxLength}
            />
          ) : field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              onBlur={handleBlur}
              minLength={field.minLength}
              maxLength={field.maxLength}
            />
          ) : field.type === 'dropdown' ? (
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              {field.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === 'date' ? (
            <input
              type="date"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
            />
          ) : field.type === 'multiselect' ? (
            <select
              name={field.name}
              multiple
              value={formData[field.name] || []}
              onChange={handleInputChange}
            >
              {field.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : null}
          {errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
          </Col>
        </div>
          </Col>  
       
        </Row>
      ))}
      <div className='customRow'>
          <button variant="primary" className='sm' type="submit">Submit</button>
      </div>
      
      </form>
     
    </Container>

    </>
  );
};

export default DynamicForm;
