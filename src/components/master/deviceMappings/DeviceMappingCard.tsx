import { useDispatch } from "react-redux";
import Card from "../../ui/Card";
import CardButton from "../../ui/CardButton";
import Image from "../../ui/Image";
import { openModal } from "../../../redux/modalSlice";
import './DeviceMappings.scss';

interface DeviceMappingCardProps {
    deviceNickname: string;
    creatureId: string;
    dungeonMaster: boolean;
}

const DeviceMappingCard = (props: DeviceMappingCardProps) => {
    const dispatch = useDispatch();

    const handleEditClick = (deviceNickname: string, creatureId: string, dungeonMaster: boolean) => {
        console.log(props.deviceNickname);
        dispatch(openModal({ modalType: "EditDeviceMapping", modalProps: { deviceNickname, creatureId, dungeonMaster } }));
    };
    return (
        <Card className="device-mapping">
            <div>{props.deviceNickname}</div>
            <div>{props.creatureId}</div>
            <div>{props.dungeonMaster ? "master" : "player"}</div>
            <CardButton className="edit" onClick={() => handleEditClick(props.deviceNickname, props.creatureId, props.dungeonMaster)}>
                <Image src="/edit-246.png" alt="image" />
            </CardButton>
        </Card>
        /*
        <div>
          {props.deviceNickname}
          {props.creatureId}
          {props.dungeonMaster ? "true" : "false"}
          <>edit</>
        </div>
        */
    )
}

export default DeviceMappingCard
