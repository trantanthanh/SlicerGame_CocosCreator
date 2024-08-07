import { EventTarget } from 'cc';

class EventManager extends EventTarget {
    GetInstance() {
        throw new Error('Method not implemented.');
    }
    private instance: EventManager = null;
    get Instance() {
        if (this.instance == null) {
            this.instance = new EventManager()
        }
        return this.instance;
    }
}
export default new EventManager();
