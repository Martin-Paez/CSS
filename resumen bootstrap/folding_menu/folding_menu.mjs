import {HoverStyleMgr} from './HoverStyleMgr.mjs';
import {ToggleList} from './ToggleList.mjs';
import {ToggledAlwaysVisibleBtns} from './ToggledAlwaysVisibleBtns.mjs';

document.addEventListener('DOMContentLoaded', ()=>{
    let menus = $('.folding-menu');
    menus.each((menu)=>{
        setHideBtnsHandler(menu);
        setExpandBtnHandlers(menu);
    });
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
    let $expandLink = menu.find('.expand-btn');
    let $expandIcon = $expandLink.find('i'); 
    let expandBtn   = new ToggledAlwaysVisibleBtns($expandIcon, $expandLink);

    expandBtn.on('click', () => { initToolTips(menu); });
}

function initToolTips(menu) 
{
    let arrows  = menu.find('.hide-btn, .expand-btn');
    let show    = `overflow: visible`;
    let hide    = `overflow: hidden`;
    let menuMgr = new HoverStyleMgr(menu  , 'span', show, hide);
    let arrowMgr= new HoverStyleMgr(arrows, 'span', hide, hide,
                                    ()=>{menuMgr.hoverOff();  },
                                    ()=>{menuMgr.deepHover(); });

    if(menu.hasClass('narrow')) {
        menuMgr.hoverOff();
        arrowMgr.hoverOff();
    }
    menu.toggleClass('narrow');
    if(menu.hasClass('narrow')) {
        menuMgr.deepHover();
        arrowMgr.deepHover();
    }
}
