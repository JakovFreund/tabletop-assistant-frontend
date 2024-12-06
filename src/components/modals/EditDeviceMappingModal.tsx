import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from '../../redux/modalSlice';
import { saveDeviceMapping } from "../../api";

interface EditDeviceMappingModalProps {
    deviceNickname: string;
    creatureId: string;
    dungeonMaster: boolean;
}



const EditDeviceMappingModal = (props: EditDeviceMappingModalProps) => {
    const [creatureIdState, setCreatureIdState] = useState(props.creatureId);
    const [dungeonMasterState, setDungeonMasterState] = useState(props.dungeonMaster);
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await saveDeviceMapping(props.deviceNickname, creatureIdState, dungeonMasterState);
            dispatch(closeModal());
        } catch (error) {
            console.error('Error saving device:', error);
        }
    };

    return (
        <div className="edit-device-mapping-modal">
            <div className="modal-title"><h3>Edit Device Mapping</h3></div>
            <form onSubmit={handleSubmit}>
                <div>{props.deviceNickname}</div>
                <input
                    type="text"
                    value={creatureIdState}
                    onChange={(e) => setCreatureIdState(e.target.value)}
                    placeholder="Enter new creatureId"
                />
                <div>
                    <label htmlFor="dungeonMaster">isDungeonMaster</label>
                    <input
                        type="checkbox"
                        id="dungeonMaster"
                        name="dungeonMaster"
                        defaultChecked={dungeonMasterState}
                        onChange={() => setDungeonMasterState((state) => !state)}
                    />
                </div>
                <div className="modal-footer">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => dispatch(closeModal())}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditDeviceMappingModal
