
import { _decorator, Component, Node, director, assetManager, SceneAsset, AssetManager } from 'cc';
// import { AddLogText } from '../core/Utils';
// import EventManager from '../core/EventManager';
// import { EventType, ActionSystem } from '../Defines';
import { Fade } from '../utils/Fade';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property(Node)
    loadingInfo: Node;

    @property(Node)
    lostConnection: Node;

    @property(Fade)
    fadeScreen: Fade;

    isLoadFailed: boolean = false;
    loadedScene: SceneAsset;
    timeoutHandle: number;


    start() {
        this.loadingInfo.active = true;
        this.lostConnection.active = false;

        // EventManager.Instance.on(EventType.SYSTEM, this.OnInterruptEvent, this);
        assetManager.main.loadScene("Ingame", this.OnProgressing.bind(this), this.OnSceneLaunched.bind(this));

        // this.StartTimeout();
    }

    onEnable() {
        this.fadeScreen.out();
    }

    update(deltaTime: number) {
    }

    OnSceneLaunched(error: Error, scene: SceneAsset) {
        if (!error && !this.isLoadFailed) {
            this.Switch2Scene(scene);
        }

    }

    OnProgressing(finished: number, total: number, item: AssetManager.RequestItem) {
    }

    OnFail() {
        this.loadingInfo.active = false;
        this.lostConnection.active = true;
    }

    StartTimeout() {
        this.timeoutHandle = setTimeout(() => {
            this.OnFail();
        }, 30000);
    }

    Switch2Scene(scene: SceneAsset) {
        this.fadeScreen.in(
            () => director.runSceneImmediate(scene)
        );
    }

    // OnInterruptEvent(parameters: any) {
    //     if (!this.node.active) {
    //         return;
    //     }

    //     switch (parameters.action) {
    //         case ActionSystem.PAUSE:
    //             break;

    //         case ActionSystem.RESUME:
    //             if (this.loadedScene) {
    //                 setTimeout(() => this.Switch2Scene(this.loadedScene), 1000);
    //             }
    //             break;
    //     }
    // }
}
