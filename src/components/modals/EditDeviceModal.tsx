import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import { saveDevice } from '../../api';

interface EditDeviceModalProps {
    deviceId: string;
}

const EditDeviceModal = ({ deviceId }: EditDeviceModalProps) => {
    const [nicknameState, setNicknameState] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nicknameState}
                    onChange={(e) => setNicknameState(e.target.value)}
                    placeholder="Enter new nickname"
                />
                <div className="modal-footer">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => dispatch(closeModal())}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDeviceModal;
