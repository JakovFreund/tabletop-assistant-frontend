import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Card from '../Card';

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
                    if (deviceMapping){
                        return <Card className="bg-green">{device.deviceNickname}</Card>;
                    } else {
                        return <Card className="bg-red">{device.deviceId}</Card>;
                    }
                })
            ) : (
                <li>No devices found</li>
            )}
        </div>
    );
};


export default DeviceMappings
