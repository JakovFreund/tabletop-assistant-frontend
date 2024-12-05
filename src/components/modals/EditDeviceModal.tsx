import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import { saveDevice } from '../../api';
import CardButton from '../ui/CardButton';

interface EditDeviceModalProps {
    deviceId: string;
}

const EditDeviceModal = ({ deviceId }: EditDeviceModalProps) => {
    const [nicknameState, setNicknameState] = useState("");
    const dispatch = useDispatch();

    const handleSave = async () => {
        try {
            await saveDevice(deviceId, nicknameState);
            dispatch(closeModal());
        } catch (error) {
            console.error('Error saving device:', error);
        }
    };

    return (
        <div className="edit-device-modal">
            <div className="modal-title"><h3>Edit Device Nickname</h3></div>
            <input
                type="text"
                value={nicknameState}
                onChange={(e) => setNicknameState(e.target.value)}
            />
            <div className="modal-footer">
                <CardButton className="modal-button" onClick={handleSave}>Save</CardButton>
                <CardButton className="modal-button" onClick={() => dispatch(closeModal())}>Cancel</CardButton>
            </div>
        </div>
    );
};

export default EditDeviceModal;
