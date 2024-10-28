export interface TurnResource {
    type: string;
    amount: number;
}

export interface Creature {
    creatureId: string;
    name: string;
    subrace: string;
    turnResources: TurnResource[];
}

export interface DeviceMapping {
    deviceId: string;
    creatureId: string;
    dungeonMaster: boolean;
}

export interface Device {
    deviceId: string;
    deviceNickname: string;
}

export interface GameState {
    creatures: Creature[];
    deviceMappings: DeviceMapping[];
    devices: Device[];
    loading: boolean;
    error: string | null;
}

export interface DeviceState {
    creatureId: string;
    dungeonMaster: boolean;
}

export interface ConnectedDevices {
    connectedDevices: string[];
    loading: boolean;
    error: string | null;
}