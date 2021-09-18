import React from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {useListContext} from './context';

const List = () => {
  const {list, handleDelete, handleEdit} = useListContext();

  return (
    <div>
      {list.map((item) => {
        const {id, name} = item;
        return (
          <span key={id}>
            <h3>{name}</h3>
            <button
              onClick={() => {
                handleEdit(id);
              }}
            >
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(id)}>
              <FaTrash />
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default List;
