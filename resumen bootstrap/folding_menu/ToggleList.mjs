export class ToggleList 
{
    constructor(event) {
        this.event = event;
        this.pairs = [];
    }

    add(btn, toggleClass, target=btn) {
        this.pairs.push({
            selector: btn,
            class: toggleClass,
            target: target
        });
        btn.on(this.event, ()=> { this.toggle(); } )
    }

    toggle() 
    {
        this.pairs.forEach(pair => {
            pair.target.toggleClass(pair.class);
        });
    }
}