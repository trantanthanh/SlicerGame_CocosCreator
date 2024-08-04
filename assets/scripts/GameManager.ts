
import { _decorator, Component } from 'cc';
import EventManager from './core/EventManager';
import { EventType } from './Defines';
import { PlaySound } from './core/Utils';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    onLoad() {
    }

    start() {
        PlaySound("M_LIC_KT_BGM", true);
    }
    onDestroy() {
    }

    update(deltaTime: number) {
    }
}