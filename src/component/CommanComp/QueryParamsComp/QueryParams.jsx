import { Table, TextInput, Checkbox } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import './QueryParams.css';
import { useFormSelectors } from '../../../redux/selector';
import { setQueryParams } from '../../../redux/authSlice';


function QueryParamsTable({ updateUrlWithParams }) {
  const dispatch = useDispatch();
  const { queryParams } = useFormSelectors();
  // New: Access query parameters from Redux store
  const [rows, setRows] = useState(queryParams.length ? queryParams : [{ key: '', value: '', checked: false }]); // Updated: Initialize rows state
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
   
  
  useEffect(() => {
    updateUrlWithParams(rows);
    dispatch(setQueryParams(rows)); // Updated: Dispatch action to update query parameters in Redux store
  }, [rows]); // Updated: Dependency array to avoid infinite loop

  const handleInputChange = (index, field, value) => {
    setRows(prevRows => {
      const newRows = prevRows.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value, checked: row.key !== '' && row.value !== '' }; // Updated: Immutable update
        }
        return row;
      });

      if (index === prevRows.length - 1 && value !== '' && prevRows.length < 5) {
        newRows.push({ key: '', value: '', checked: false }); // Updated: Add new row if conditions are met
      }

      return newRows;
    });
  };

  const handleDeleteRow = (index) => {
    setRows(prevRows => prevRows.filter((_, i) => i !== index)); // Immutable delete
  };

  const handleCheckboxChange = (index) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], checked: !newRows[index].checked }; // Updated: Immutable checkbox update
      return newRows;
    });
  };

  const tableRows = rows.map((row, index) => (
    <tr key={index}
      onMouseEnter={() => setHoveredRowIndex(index)}
      onMouseLeave={() => setHoveredRowIndex(null)}
      style={{ position: 'relative', paddingTop: '10px', paddingBottom: '10px' }}
    >
      <td>
        <Checkbox
          checked={row.checked}
          color="blue"
          onChange={() => handleCheckboxChange(index)}
          iconColor="white"
          size="md"
        />
      </td>
      <td>
        <TextInput
          style={{ width: "55%", padding: "3px" }}
          className="input-field"
          placeholder='Enter Parameter'
          value={row.key}
          onChange={(event) => handleInputChange(index, 'key', event.target.value)}
        />
      </td>
      <td>
        <TextInput
          style={{ width: "55%", padding: "3px" }}
          className="input-field"
          placeholder='Enter Value'
          value={row.value}
          onChange={(event) => handleInputChange(index, 'value', event.target.value)}
        />
      </td>
      <td style={{ position: 'relative' }}>
        {hoveredRowIndex === index && rows.length > 1 && (
          <CiTrash
            onClick={() => handleDeleteRow(index)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: 'red',
            }}
          />
        )}
      </td>
    </tr>
  ));

  return (
    <Table style={{ position: "relative", bottom: "35px" }}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>KEY</Table.Th>
          <Table.Th>VALUE</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{tableRows}</Table.Tbody>
    </Table>
  );
}

export default QueryParamsTable;

// function QueryParamsTable({updateUrlWithParams}) {
//   const dispatch = useDispatch()
//   const { queryParams } = useFormSelectors()
//   const [rows, setRows] = useState([{ key: '', value: '', checked: false }]);
//   const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

//   useEffect(() => {
//     updateUrlWithParams(rows);
//     dispatch(setQueryParams(rows))
//   }, [rows]);

//   const handleInputChange = (index, field, value) => {
//     const newRows = [...rows];
//     newRows[index][field] = value;
//     newRows[index].checked = newRows[index].key !== '' && newRows[index].value !== '';
//     setRows(newRows);

//     if (index === rows.length - 1 && value !== '' && rows.length < 5) {
//       setRows([...newRows, { key: '', value: '', checked: false }]);
//     }
//   };

//   const handleDeleteRow = (index) => {
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   const handleCheckboxChange = (index) => {
//     const newRows = [...rows];
//     newRows[index].checked = !newRows[index].checked;
//     setRows(newRows);
//   };

//   const tableRows = rows.map((row, index) => (
//     <tr key={index}
//       onMouseEnter={() => setHoveredRowIndex(index)}
//       onMouseLeave={() => setHoveredRowIndex(null)}
//       style={{ position: 'relative', paddingTop: '10px', paddingBottom: '10px' }}
//     >
//       <td>
//         <Checkbox
//           checked={row.checked}
//           color="blue"
//           onChange={() => handleCheckboxChange(index)}
//           iconColor="white"
//           size="md"
//         />
//       </td>
//       <td>
//         <TextInput
//           style={{ width: "55%" , padding:"3px"}}
//           className="input-field"
//           placeholder='Enter Parameter'
//           value={row.key}
//           onChange={(event) => handleInputChange(index, 'key', event.target.value)}
//         />
//       </td>
//       <td>
//         <TextInput
//           style={{ width: "55%" , padding:"3px"}}
//           className="input-field"
//           placeholder='Enter Value'
//           value={row.value}
//           onChange={(event) => handleInputChange(index, 'value', event.target.value)}
//         />
//       </td>
//       <td style={{ position: 'relative' }}>
//         {hoveredRowIndex === index && rows.length > 1 && (
//           <CiTrash
//             onClick={() => handleDeleteRow(index)}
//             style={{
//               position: 'absolute',
//               right: '10px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               cursor: 'pointer',
//               color: 'red',
//             }}
//           />
//         )}
//       </td>
//     </tr>
//   ));

//   return (
//     <Table style={{position:"relative", bottom:"35px"}}>
//       <Table.Thead>
//         <Table.Tr>
//           <Table.Th></Table.Th>
//           <Table.Th>KEY</Table.Th>
//           <Table.Th>VALUE</Table.Th>
//         </Table.Tr>
//       </Table.Thead>
//       <Table.Tbody>{tableRows}</Table.Tbody>
//     </Table>
//   );
// }

// export default QueryParamsTable;
