
import { _decorator, Component } from 'cc';
import EventManager from './core/EventManager';
import { ActionIngame, EventType } from './Defines';
import { PlaySound } from './core/Utils';
import { Ingame } from './states/Ingame';
import { Result } from './states/Result';
import { PopupTutorial } from './states/PopupTutorial';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Ingame) viewIngame: Ingame = null;
    @property(Result) viewResult: Result = null;
    @property(PopupTutorial) popupTutorial: PopupTutorial = null;

    onLoad() {
        EventManager.Instance.on(EventType.INGAME, this.OnIngameEvent, this);
        EventManager.Instance.on(EventType.RESULT, this.OnResultEvent, this);
        EventManager.Instance.on(EventType.POPUP_TUTORIAL, this.OnPopupTutorialEvent, this);

        this.viewIngame.node.active = true;
    }

    onDestroy() {
        EventManager.Instance.off(EventType.INGAME, this.OnIngameEvent, this);
        EventManager.Instance.off(EventType.RESULT, this.OnResultEvent, this);
        EventManager.Instance.off(EventType.POPUP_TUTORIAL, this.OnPopupTutorialEvent, this);
    }

    start() {
    }

    update(deltaTime: number) {
    }

    OnIngameEvent(paramaters: any) {
        switch (paramaters.action) {
            case ActionIngame.TIMEOUT:
                this.viewIngame.node.active = false;
                this.viewResult.node.active = true;
                break;

            case ActionIngame.EXIT:
                this.viewIngame.Pause();
                break;
        }
    }

    OnResultEvent(paramaters: any) {

    }

    OnPopupTutorialEvent(paramaters: any) {

    }
}