import Card from "../../ui/Card"
import Image from '../../ui/Image';
import './ConnectedDevices.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/modalSlice';
import CardButton from "../../ui/CardButton";

interface ConnectedDeviceCardProps {
    deviceId: string;
    deviceNickname: string;
    mapped: boolean;
}

const ConnectedDeviceCard = (props: ConnectedDeviceCardProps) => {
    const dispatch = useDispatch();

    const handleEditClick = (deviceId: string) => {
        dispatch(openModal({ modalType: "EditDevice", modalProps: { deviceId } }));
    };

    return (
        <Card className={"connected-device " + (props.mapped ? "device-mapped" : "device-unmapped")}>
            <div>{props.deviceId}</div>
            <div>{props.deviceNickname}</div>
            <CardButton className="edit" onClick={() => handleEditClick(props.deviceId)}>
                <Image src="/edit-246.png" alt="image" />
            </CardButton>
        </Card>
    )
}

export default ConnectedDeviceCard
