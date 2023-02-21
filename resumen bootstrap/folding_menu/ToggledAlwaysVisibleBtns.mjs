export class ToggledAlwaysVisibleBtns {
    constructor($firstBtn, $secondBtn) {
        this.btnA = $firstBtn;
        this.btnB = $secondBtn;
    }

    on(event, handler) 
    {
        this.btnA.on(event, () => {
            handler();
            this.btnA.off(event);
            this.btnB.on(event, () => {
                this.btnB.off(event);
                this.on(event, handler);
            });
        });
    }
}