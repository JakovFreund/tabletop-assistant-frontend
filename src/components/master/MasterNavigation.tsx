import CardButton from "../ui/CardButton";


interface MasterNavigationProps {
    setSelectedComponent: (component: string) => void;
    selectedComponent: string;
}

//TODO ˇˇ make a class and loop through these and MasterInterface.tsx duplicate list

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
            <CardButton
                onClick={() => props.setSelectedComponent('combat')}
                className={props.selectedComponent === 'combat' ? 'active' : ''}
            >
                Combat
            </CardButton>
        </div>
    )
}

export default MasterNavigation
