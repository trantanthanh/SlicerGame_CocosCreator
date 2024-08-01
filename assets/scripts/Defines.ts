export class Config
{
    static isSupportTwoScreenSize: boolean = false;
    static gameDuration = 30;
    static GAME_TIMER_WARNING = 5;
}

export enum EventType
{
    INGAME = "ingame",
    INGAME_EFFECT = "ingame_effect",
    RESULT = "result",
    SYSTEM = "system",
    SOUND = "sound",
}

export enum ActionSystem
{
    PAUSE,
    RESUME,
    BACK
}