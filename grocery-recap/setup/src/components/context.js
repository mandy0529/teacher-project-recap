import React, {useContext, useEffect, useState} from 'react';

let timeout;

const CONTROL = 'control';
const getLocalStorage = () => {
  const control = localStorage.getItem(CONTROL);
  if (control) {
    return JSON.parse(control);
  } else {
    return [];
  }
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [list, setList] = useState(getLocalStorage);
  const [alert, setAlert] = useState({show: false, msg: ''});
  const [query, setQuery] = useState('');
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const setLocalStorage = () => {
    localStorage.setItem(CONTROL, JSON.stringify(list));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return controlAlert(true, 'please write your value in form');
    if (isEditing) {
      setList(changeTitleQuery);
      setIsEditing(false);
      controlAlert(true, 'this item edited');
      setQuery('');
    } else {
      setQuery('');
      setList([...list, {id: Math.random(), name: query}]);
      controlAlert(true, 'new item added');
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const controlAlert = (show = false, msg = '') => {
    setAlert({show, msg});
  };

  const handleDelete = (id) => {
    console.log('삭제');
    const deleteItem = list.filter((item) => item.id !== id);
    setList(deleteItem);
    controlAlert(true, 'this item deleted');
  };

  const handleEdit = (id) => {
    console.log('수정시작');
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setQuery(editItem.name);
  };

  const changeTitleQuery = () => {
    const changeTitle = list.map((item) => {
      if (item.id === editId) {
        return {...item, name: query};
      }
      return item;
    });
    return changeTitle;
  };

  useEffect(() => {
    timeout = setTimeout(() => controlAlert(), 3000);
    setLocalStorage();
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [list]);

  return (
    <AppContext.Provider
      value={{
        form: {query, handleSubmit, handleChange},
        list: {list, handleDelete, handleEdit},
        alert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export const useFormContext = () => {
  const {form} = useContext(AppContext);
  return form;
};

export const useListContext = () => {
  const {list} = useContext(AppContext);
  return list;
};

export default AppProvider;
