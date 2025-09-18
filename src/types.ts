export interface TurnResource {
    type: string;
    name: string;
    amount: number;
    maxAmount: number;
    refillRate: string;
}

export interface StatusEffectInstance {
    statusEffect: StatusEffect;
    duration: Duration;
    source: EffectSource;
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
}

export interface Devices { // do i need this??
    devices: Device[];
}

export interface ThisDevice { //DeviceState
    deviceId: string;
    creatureId: string;
    dungeonMaster: boolean;
}

export interface ConnectedDevices {
    connectedDevices: string[];
    loading: boolean;
    error: string | null;
}

export interface Castable {
    name: string;
    ritual: boolean;
    concentration: boolean;
    savingThrow: string;
    effectTarget: EffectTarget;
    duration: Duration;
    costs: Record<string, number>;
    castableDamageComponents: CastableDamageComponent[];
    healAtSlotLevel: Record<number, string>;
    appliesStatusEffects: string[];
    description: string[];
}

export interface CastableDamageComponent {
    damageType: string;
    damageAtCreatureLevel: Record<number, string>;
    damageAtSlotLevel: Record<number, string>;
}

export interface EffectTarget {
    rangeType: string;
    rangeSize: number;
    areaType: string;
    areaSize: number;
}

export interface CastableInstance {
    castable: Castable;
    casterId: string;
    casterName: string;
    slotLevel: number;
    damageInstance: DamageInstance;
}

export interface DamageInstance {
    damage: Damage;
    effectSource: EffectSource;
}

export interface Damage {
    components: Record<string, string>;
}

export interface StatCalculationStep {
    value: number;
    description: string;
}

export interface StatCalculationBreakdown {
    type: string;
    total: number;
    statCalculationSteps: StatCalculationStep[];
}

export interface DamageEntry {
    damageType: string;
    damageAmount: string;
}

export interface LogEntry {
    logEntryId: string;
    timestamp: string;
    visibility: string;
    isNested: boolean;
    logEntryType: string;

    targetCreatureId: string;
    targetCreatureName: string;
    sourceCreatureId: string;
    sourceCreatureName: string;
    itemId: string;
    itemName: string;
    deviceNickname: string;
    damageEntry: DamageEntry;
    effectSourceType: string;
    castableInstance: CastableInstance;
    lostStatusEffectInstance: StatusEffectInstance;
    receivedStatusEffectInstance: StatusEffectInstance;

    statCalculationBreakdowns: StatCalculationBreakdown[];

    roundNumber: number;
    weather: string;
    timeOfDay: string;
    sceneCover: string;
    sceneLightSource: string;
    sceneLighting: string;
}