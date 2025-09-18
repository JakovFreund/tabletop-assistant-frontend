import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import DeviceMappingCard from './DeviceMappingCard';

const DeviceMappings = () => {
    const devices = useSelector((state: RootState) => state.deviceRegistry.devices);
    const deviceMappings = useSelector((state: RootState) => state.gameState.deviceMappings);

    return (
        <div>
            <h3>Device Mappings</h3>
            <ul>
                {devices.length > 0 ? (
                    devices.map((device) => {
                        // if connectedDevice has deviceName
                        const deviceMapping = deviceMappings.find(deviceMapping => deviceMapping.deviceNickname === device.deviceNickname);
                        return <li key={device.deviceId}><DeviceMappingCard
                            deviceNickname={device.deviceNickname}
                            creatureId={deviceMapping ? deviceMapping.creatureId : "(none)"}
                            dungeonMaster={deviceMapping ? deviceMapping.dungeonMaster : false}
                        /></li>
                    })
                ) : (
                    <li>No devices found</li>
                )}
            </ul>
        </div>
    );
};


export default DeviceMappings
