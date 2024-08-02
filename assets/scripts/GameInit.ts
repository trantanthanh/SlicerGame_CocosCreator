
import { _decorator, Component, Node, view, UITransform, macro, director } from 'cc';
import EventManager from './core/EventManager';
import { ActionSystem, EventType } from './Defines';
import { RegisterVisibilityChange } from './core/Utils';

const { ccclass, property } = _decorator;

@ccclass('GameInit')
export class GameInit extends Component {
    @property(Node)
    landscape: Node;

    onLoad() {
        this.Init();
        this.Alignment();
        RegisterVisibilityChange();
    }

    Init() {
        this.FunctionDefines();
    }

    Alignment() {
        // let viewDesign = view.getDesignResolutionSize();
        // let isMigGamePortrait = viewDesign.width < viewDesign.height;
        let isMigGamePortrait = false;
        let isHostGamePortrait = window.innerWidth < window.innerHeight
        let viewVisible = view.getVisibleSize();

        if (isMigGamePortrait === isHostGamePortrait) {//all are landscape
            let ratio = window.innerHeight / window.innerWidth;
            view.setOrientation(macro.ORIENTATION_LANDSCAPE);
            this.landscape.active = true;
            this.landscape.getComponent(UITransform).setContentSize(viewVisible.width, viewVisible.width * ratio);
        }
        else {
            let ratio = window.innerWidth / window.innerHeight;
            this.landscape.active = true;
            this.landscape.getComponent(UITransform).setContentSize(viewVisible.width, viewVisible.width * ratio);
        }

    }

    FunctionDefines() {
        let mainWindow = (<any>window);
        mainWindow.onGamePause = function () {
            let parameters = {
                action: ActionSystem.PAUSE,
                data: {}
            };

            director.pause();
            EventManager.Instance.emit(EventType.SYSTEM, parameters);
            console.log("🚀 ~ GameInit ~ FunctionDefines ~ game Pause");

            mainWindow.onGameResume = function () {
                let parameters = {
                    action: ActionSystem.RESUME,
                    data: {}
                };

                director.resume();
                EventManager.Instance.emit(EventType.SYSTEM, parameters);
                console.log("🚀 ~ GameInit ~ FunctionDefines ~ game Resume");
            }
        }
    }
}