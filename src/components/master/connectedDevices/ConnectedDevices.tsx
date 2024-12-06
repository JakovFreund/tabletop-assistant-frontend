import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import './ConnectedDevices.scss'
import ConnectedDeviceCard from './ConnectedDeviceCard';
import { fetchConnectedDevices } from '../../../redux/connectedDevicesSlice';
import { useEffect } from 'react';



// DM Interface Component
const ConnectedDevices = () => {
    const dispatch = useDispatch<AppDispatch>(); // AppDispatch?

    const connectedDevices = useSelector((state: RootState) => state.deviceConnectionStatus.connectedDevices);
    const devices = useSelector((state: RootState) => state.gameState.devices);

    useEffect(() => {
        const fetchConnectedDevicesData = async () => {
            try {
                dispatch(fetchConnectedDevices());
            } catch {
                console.error('Error fetching connected devices data');
            }
        };

        const connectedDevicesIntervalId = setInterval(fetchConnectedDevicesData, 1000);

        return () => clearInterval(connectedDevicesIntervalId);
    }, [dispatch]);

    return (
        <div>
            <h3>Connected Devices</h3>
            {connectedDevices.length > 0 ? (
                connectedDevices.map((deviceId) => {
                    const device = devices.find(device => device.deviceId === deviceId);
                    return <ConnectedDeviceCard
                        key={deviceId}
                        deviceId={deviceId}
                        deviceNickname={device ? device.deviceNickname : ""}
                        mapped={device ? true : false}
                    />
                })
            ) : (
                <li>No devices found</li>
            )}
        </div>
    );
};

export default ConnectedDevices;