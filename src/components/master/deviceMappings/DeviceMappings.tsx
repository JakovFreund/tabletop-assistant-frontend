import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import DeviceMappingCard from './DeviceMappingCard';

const DeviceMappings = () => {
    const devices = useSelector((state: RootState) => state.gameState.devices);
    const deviceMappings = useSelector((state: RootState) => state.gameState.deviceMappings);

    return (
        <div>
            <h3>Device Mappings</h3>
            {devices.length > 0 ? (
                devices.map((device) => {
                    // if connectedDevice has deviceName
                    const deviceMapping = deviceMappings.find(deviceMapping => deviceMapping.deviceNickname === device.deviceNickname);
                    return <DeviceMappingCard
                        deviceNickname={device.deviceNickname}
                        creatureId={deviceMapping ? deviceMapping.creatureId : "(none)"}
                        dungeonMaster={deviceMapping ? deviceMapping.dungeonMaster : false}
                    />
                })
            ) : (
                <li>No devices found</li>
            )}
        </div>
    );
};


export default DeviceMappings
