import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../../styles/style.scss';
import './ConnectedDevice.scss'
import ConnectedDeviceCard from './ConnectedDeviceCard';

// DM Interface Component
const ConnectedDevices = () => {
    const connectedDevices = useSelector((state: RootState) => state.deviceConnectionStatus.connectedDevices);
    const devices = useSelector((state: RootState) => state.gameState.devices);

    return (
        <div>
            <h3>Connected Devices</h3>
            {connectedDevices.length > 0 ? (
                connectedDevices.map((deviceId) => {
                    // if connectedDevice has deviceName
                    const device = devices.find(device => device.deviceId === deviceId);
                    return <ConnectedDeviceCard deviceId={deviceId} deviceNickname={device ? device.deviceNickname : ""} color={device ? "green" : "red"} />

                })
            ) : (
                <li>No devices found</li>
            )}
        </div>
    );
};

export default ConnectedDevices;