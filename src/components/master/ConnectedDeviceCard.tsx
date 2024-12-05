import Card from "../Card"
import Image from '../Image';
import '../../styles/style.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modalSlice';

interface ConnectedDeviceCardProps {
    deviceId: string;
    deviceNickname: string;
    color: string;
}

const ConnectedDeviceCard = (props: ConnectedDeviceCardProps) => {
    const dispatch = useDispatch();

    const handleEditClick = (deviceId: string) => {
        dispatch(openModal({ modalType: 'EditDevice', modalProps: { deviceId } }));
    };

    return (
        <Card className={"bg-" + props.color + " connected-device"}>
            <div>{props.deviceId}</div>
            <div>{props.deviceNickname}</div>
            <Card className="edit" onClick={() => handleEditClick(props.deviceId)}>
                <Image src="/edit-246.png" alt="image" width="30rem" />
            </Card>
        </Card>
    )
}

export default ConnectedDeviceCard
