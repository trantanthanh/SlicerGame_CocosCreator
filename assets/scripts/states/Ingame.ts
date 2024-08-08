import { _decorator, CCFloat, Component, Label, Node, tween, Vec3 } from 'cc';
import { Fade } from '../utils/Fade';
import Timer from '../core/Timer';
import { ActionIngame, ActionPopupTutorial, Config, EventType } from '../Defines';
import { PauseMusic, PlaySound } from '../core/Utils';
import EventManager from '../core/EventManager';
const { ccclass, property } = _decorator;

enum STATE {
    NONE,
    TUTORIAL,
    PLAY,
    PAUSE,
    RESUME,
    TIMEOUT,
    TIMES_UP
}

@ccclass('Ingame')
export class Ingame extends Component {

    @property(Label) labelTimer: Label = null;
    @property(Fade) fadeScreen: Fade = null;
    @property(Node) textTimesUp: Node = null;
    @property(CCFloat) gameTextDuration: number = 1.5;//Time of text consist on the screen

    state: STATE = STATE.NONE;
    timerMain: Timer = new Timer();

    isGameStarted: boolean = false;
    isFirstLaunch: boolean = true;
    isFinishTutorial: boolean = true;

    mScore: number = 0;
    private previousTime: number = 0;

    onEnable() {
        this.mScore = 0;
        this.textTimesUp.active = false;
        this.timerMain.SetDuration(Config.gameDuration);

        if (this.isFirstLaunch) {
            if (!this.isFinishTutorial) {
                this.SetState(STATE.TUTORIAL);
            }
            else {
                this.StartGame();
                this.SetState(STATE.PLAY);
            }
        }
        else {
            this.isGameStarted = true;
            this.SetState(STATE.PLAY);
        }

        PlaySound("M_LIC_KT_BGM", true);
    }

    StartGame() {
        this.isGameStarted = true;
        this.isFinishTutorial = true;
        this.SetState(STATE.PLAY);
    }

    EndGame() {
        this.isGameStarted = false
        this.isFirstLaunch = false;
        PauseMusic();
        this.SetState(STATE.TIMEOUT);
    }

    SetState(state: STATE) {
        this.state = state;
        let paramaters;
        switch (this.state) {
            case STATE.TUTORIAL:
                paramaters = {
                    action: ActionPopupTutorial.SHOW,
                    data: {}
                }
                EventManager.Instance.emit(EventType.POPUP_TUTORIAL, paramaters);
                break;

            case STATE.PLAY:
                break;

            case STATE.PAUSE:
                PauseMusic();
                break;

            case STATE.RESUME:
                PlaySound("M_LIC_KT_BGM");
                this.SetState(STATE.PLAY);
                break;

            case STATE.TIMEOUT:
                paramaters = {
                    action: ActionIngame.TIMEOUT,
                    data: null
                }

                EventManager.Instance.emit(EventType.INGAME, paramaters);
                break;
            case STATE.TIMES_UP:
                this.UpdateTweenText(this.textTimesUp);
                break;
        }
    }

    UpdateTweenText(text: Node) {
        text.setScale(Vec3.ZERO);
        tween(text)
            .to(this.gameTextDuration,
                {
                    scale: Vec3.ONE
                },
                {
                    easing: 'elasticOut',
                    onStart: () => {
                        text.active = true
                    },
                    onComplete: () => {
                        text.active = false
                    }
                })
            .start()
    }

    UpdateTimer(time: number) {
        if (time <= Config.GAME_TIMER_WARNING) {
            if (this.previousTime != Math.floor(time)) {
                this.previousTime = Math.floor(time);
                PlaySound("SFX_UI_TIME_OVER");
            }
        }
        this.labelTimer.string = Math.floor(time) + "\"";
    }

    start() {

    }

    update(deltaTime: number) {
        switch (this.state) {
            case STATE.TUTORIAL:
                break;

            case STATE.PLAY:
                this.timerMain.Update(deltaTime);
                this.UpdateTimer(this.timerMain.GetTime());
                if (this.timerMain.IsDone()) {
                    PlaySound("SFX_UI_TIME_OVER");
                    this.SetState(STATE.TIMES_UP);
                }
                break;

            case STATE.PAUSE:
                break;

            case STATE.RESUME:
                break;

            case STATE.TIMEOUT:
                break;
            case STATE.TIMES_UP:
                if (!this.textTimesUp.active) {
                    this.EndGame();
                }
                break;
        }
    }
}


