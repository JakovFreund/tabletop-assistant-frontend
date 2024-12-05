import CardButton from "../ui/CardButton";


interface MasterNavigationProps {
    setSelectedComponent: (component: string) => void;
    selectedComponent: string;
}

const MasterNavigation = (props: MasterNavigationProps) => {
    return (
        <div className="menu">
            <CardButton
                onClick={() => props.setSelectedComponent('connectedDevices')}
                className={props.selectedComponent === 'connectedDevices' ? 'active' : ''}
            >
                Connected Devices
            </CardButton>
            <CardButton
                onClick={() => props.setSelectedComponent('playerControls')}
                className={props.selectedComponent === 'playerControls' ? 'active' : ''}
            >
                Player Controls
            </CardButton>
            <CardButton
                onClick={() => props.setSelectedComponent('deviceMappings')}
                className={props.selectedComponent === 'deviceMappings' ? 'active' : ''}
            >
                Device Mappings
            </CardButton>
        </div>
    )
}

export default MasterNavigation
