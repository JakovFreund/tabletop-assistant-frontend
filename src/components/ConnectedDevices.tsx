import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// DM Interface Component
const ConnectedDevices = () => {

    const connectedDevices = useSelector((state: RootState) => state.deviceConnectionStatus.connectedDevices);

    return (
        <div>
            <h3>Connected Devices</h3>
            <ul>
                {connectedDevices.length > 0 ? (
                    connectedDevices.map((deviceId) => (
                        <li key={deviceId}> {deviceId} </li>
                    ))
                ) : (
                    <li>No devices found</li>
                )}
            </ul>
        </div>
    );
};

export default ConnectedDevices;