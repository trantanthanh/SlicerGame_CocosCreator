export class Config {
    static isSupportTwoScreenSize: boolean = false;
    static gameDuration = 30;
    static GAME_TIMER_WARNING = 5;
}

export enum EventType {
    INGAME = "ingame",
    INGAME_EFFECT = "ingame_effect",
    RESULT = "result",
    POPUP_TUTORIAL = "popup_tutorial",
    SYSTEM = "system",
    SOUND = "sound",
}

export enum ActionSystem {
    PAUSE,
    RESUME,
    BACK
}

export enum ActionIngame
{
    TIMEOUT,
    EXIT,
    CLEAR_ITEMS,
    SPAWN_WAVE,
    GET_SCORE,
    GET_PENALTY,
    CREATE_EFFECT,
}

export enum ActionSound {
    PAUSE,
    PLAY,
    PLAY_ONE_SHOT,
    STOP
}

export enum ActionPopupTutorial {
    SHOW,
    HIDE
}