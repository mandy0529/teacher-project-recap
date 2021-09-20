import React from 'react';
import {useGlobalContext} from '../contexts/context';

const Modal = () => {
  const {handleCloseModal, score, modal} = useGlobalContext();
  return (
    <div className={`${modal ? 'modal-container isOpen' : 'modal-container'}`}>
      <div className="modal-content">
        <h2>congrats!</h2>
        <h2>your score is {score}. awesome!</h2>
        <button className="close-btn" onClick={handleCloseModal}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
