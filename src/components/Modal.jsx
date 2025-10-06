import { createPortal } from 'react-dom';

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) {

    if (!show) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                {content}

                <div className="modal-actions">
                    <button className='btn' onClick={onClose}>Cancel</button>
                    <button className='btn btn-primary' onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
};