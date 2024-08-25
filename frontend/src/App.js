import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  // Multi-select dropdown options
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  // Handle JSON input change
  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      // Validate JSON input
      const jsonObject = JSON.parse(jsonInput);

      // Make API call
      const response = await axios.post('http://localhost:8080/bfhl', jsonObject);
      console.log(response);
      // Set response data
      setResponseData(response.data);
    } catch (error) {
      console.error('Error:', error);  // Added for debugging
      setError('Invalid JSON input or API error.');
      setResponseData(null);
    }
  };

  // Format response data based on selected options
  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const selectedValues = selectedOptions.map(option => option.value);

    let formattedOutput = '';

    if (selectedValues.includes('numbers')) {
      const numbers = responseData.numbers.join(', ');
      formattedOutput += `Numbers: ${numbers}\n`;
    }
    if (selectedValues.includes('alphabets')) {
      const alphabets = responseData.alphabets.join(', ');
      formattedOutput += `Alphabets: ${alphabets}\n`;
    }
    if (selectedValues.includes('highest_lowercase_alphabet')) {
      const highestLowercase = responseData.highest_lowercase_alphabet.join(', ');
      formattedOutput += `Highest lowercase alphabet: ${highestLowercase}\n`;
    }

    return <pre>{formattedOutput}</pre>;
  };

  return (
    <div className="App">
      <h1>TASK</h1> {/* Replace with your roll number */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleJsonChange}
          rows="10"
          cols="40"
          placeholder='Enter JSON here e.g. {"data":["A","C","z"]}'
        />
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseData && (
        <div>
          <h1>Filtered Response</h1>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select filters"
          />
          <div>
            {renderFilteredResponse()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
