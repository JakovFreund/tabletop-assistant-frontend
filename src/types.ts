export interface TurnResource {
    type: string;
    amount: number;
}

export interface StatusEffectInstance {
    statusEffect: StatusEffect;
    duration: Duration;
    source: EffectSource;
    dependsUpon: StatusEffect[];
    customNote: string;
}

export interface StatusEffect {
    name: string;
    description: string;
    includedEffects: StatusEffect[];
}

export interface Duration {
    durationType: string;
    turnsDuration: number;
}

export interface EffectSource {
    effectSourceType: string;
    creatureId: string;
}

export interface Creature {
    creatureId: string;
    name: string;
    subrace: string;
    concentratingOn: string;
    background: string;
    alignment: string;
    abilityScores: Record<string, number>;
    skillProficiencies: Record<string, boolean>;
    savingThrowProficiencies: Record<string, boolean>;
    classes: Record<string, number>;
    subclasses: string[];
    statusEffectInstances: StatusEffectInstance[];
    turnResources: TurnResource[];
    equiped: string[];
    // ---
    // Calculated values below ?
    race: string;
    creatureSize: string;
    level: number;
    proficiencyBonus: number;
    passivePerception: number;
    initiativeModifier: number;
    carryingCapacity: number;
    pushDragLiftCapacity: number;
    ArmourClass: number;
    jumpLength: number;
    jumpHeight: number;
}

export interface DeviceMapping {
    deviceNickname: string;
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
    selectedCreatureId: string | null;
    selectedLogEntryId: string | null;
    combatLog: LogEntry[];
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

/*
// probably don't need this
export enum Ability {
    STR = 'Strength',
    DEX = 'Dexterity',
    CON = 'Constitution',
    INT = 'Intelligence',
    WIS = 'Wisdom',
    CHA = 'Charisma'
}

export enum Skill {
    ACROBATICS = 'Acrobatics',
    // Add other skills here...
}

export enum GameClass {
    FIGHTER = 'Fighter',
    WIZARD = 'Wizard',
    // Add other classes here...
}
*/

export interface CastableInstance {
  id: string;
  damageType: string;
  damageAmount: string; //TODO make into list
  statusEffects: string[];
  effectSource: number;
}

export interface LogEntry {
  id: string;
  text: string;
  castableInstance?: CastableInstance;
}