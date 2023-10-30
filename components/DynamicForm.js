import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFieldArray, useForm } from 'react-hook-form';
const DynamicForm = ({ metadata , onFormSubmit}) => {

  const [formData, setFormData] = useState({});
  
  const [errors, setErrors] = useState({});

  const {register, handleSubmit , control} = useForm();
  const {fields, append , remove} = useFieldArray({control, name:"Ordered Details"})

  const handleInputChange = (event) => {
    const { name, value, type, options } = event.target;
    let newValue =
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

  
 
  const formhandleSubmit = (data) => {
    console.log("'formData",formData);
    console.log("data",data);
    // e.preventDefault();
    const newErrors = {};
    let values = {
      ...formData,
      ...data
    }


    // metadata.Form.forEach((field) => {
    //   if (field.required) {
    //     console.log("filed",field);
    //     if (
    //       (field.type !== 'multiselect' && (!formData[field.name] || formData[field.name].trim() === '')) ||
    //       (field.type === 'multiselect' && (!formData[field.name] || formData[field.name].length === 0)) 
    //     ) {
    //       newErrors[field.name] = 'Field is required.';
    //     }
    //   }
    // });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid. Perform save operation with data:', formData);
      console.log("formData",formData);
      onFormSubmit(values);
      setFormData({});
      setErrors({});
    }
  };

  return (
 <>
    <Container>
   
      <form onSubmit={handleSubmit(formhandleSubmit)}>
      {metadata.Form.map((field, index) => (
        field.fields.map((field, index)=>{
       return(
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
          ) 


          : field.type === 'form' ? (
            <>
            
             <button type='button'  onClick={() => append()}>Add</button>
                {fields.map(({id}, index) => {                  
                return(
                  <div className='customForm'>
                   
                  <div key={id}>
                  {field.fields.map((field,id)=>{
                    return(
                      <div key={id}>    
                      <table className='table' >
                      <thead>
                      <tr>
                        <th>
                        <label htmlFor={field.name}>{field.label}</label>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>

                        
                      {field.type === 'text' ? (
                          <input
                            type="text"
                            {...register(`Ordered Details.${index}.${field.name}`)}
                          />
                        ) :field.type === 'date' ? (
                          <input
                            type="date"
                            {...register(`Ordered Details.${index}.${field.name}`)}
                          />
                        ) :field.type === 'dropdown' ? (
                          <select
                            {...register(`Ordered Details.${index}.${field.name}`)}
                          ><option value="">Select...</option>
                            {field.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) :null}
                       
                       </td>
                        </tr>
                      </tbody>
                      </table>          
                    </div>
                    )
                })}
                <button type='button' onClick={() => remove(index)}>Remove</button>
                </div>
              </div>
              )
            })}           
          </>
             
          ): field.type === 'multiselect' ? (
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
        )
         })
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
