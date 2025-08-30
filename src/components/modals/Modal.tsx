import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { closeModal } from '../../redux/modalSlice';
import './modal.scss';

import EditDeviceModal from './EditDeviceModal';
import EditDeviceMappingModal from './EditDeviceMappingModal';

const MODAL_COMPONENTS: { [key: string]: React.FC<any> } = {
  EditDevice: EditDeviceModal,
  EditDeviceMapping: EditDeviceMappingModal
};

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector((state: RootState) => state.modal);

  if (!isOpen || !modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType];
  if (!SpecificModal) return null;

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <SpecificModal {...modalProps} />
      </div>
    </div>
  );
};

export default Modal;
