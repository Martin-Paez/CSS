import {HoverStyleMgr} from './HoverStyleMgr.mjs';
import {ToggleList} from './ToggleList.mjs';
import {ToggledAlwaysVisibleBtns} from './ToggledAlwaysVisibleBtns.mjs';

document.addEventListener('DOMContentLoaded', ()=>{
    let menu    =   $('.folding-menu');
    setHideBtnsHandler(menu);
    setExpandBtnHandlers(menu);
});

function setHideBtnsHandler(menu) 
{
    let hide =  menu.find('.hide-btn > i');
    let show =  $('.show-btn');
    let btns =  new ToggleList('click');
    
    btns.add(hide, 'hidden', menu);
    btns.add(show, 'enable');
}

function setExpandBtnHandlers(menu) 
{
    let $foldIcon   = menu.find('.expand-btn i'); 
    let $foldLink   = menu.find('.expand-btn');
    let expBtn      = new ToggledAlwaysVisibleBtns($foldIcon, $foldLink);

    expBtn.on('click', () => { foldBtnEvent(menu, 'narrow'); });
}

function foldBtnEvent(menu, foldClass) {
    let links   =   menu.find('.folding-links a');
    let arrows  =   menu.find('.hide-btn, .expand-btn');

    let show = `overflow: visible`;
    let hide = 'overflow: hidden';

    let linkMgr = new HoverStyleMgr(links , 'span', hide);
    let menuMgr = new HoverStyleMgr(menu  , 'span', show, hide);
    let arrowMgr= new HoverStyleMgr(arrows, 'span', hide, hide,
                                    ()=>{menuMgr.hoverOff();  },
                                    ()=>{menuMgr.deepHover(); });

    if(menu.hasClass(foldClass)) {
        linkMgr.hoverOff();
        menuMgr.hoverOff();
        arrowMgr.hoverOff();
    }
    menu.toggleClass(foldClass);
    if(menu.hasClass(foldClass)) {
        linkMgr.deepHover();
        menuMgr.deepHover();
        arrowMgr.deepHover();
    }
}
