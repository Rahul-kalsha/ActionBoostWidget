/**
 * action-boost-widget.js
 *
 * Copyright (c) 2023 Rahul Kalsha
 * All rights reserved. This code may not be copied or reproduced
 * without the express written permission of the author.
 *
 * Date: 2023-09-09
 */
function appendStylesToHead(styles) {
    var css = document.createElement('style');
    css.type = 'text/css';
    if (css.styleSheet) {
        css.styleSheet.cssText = styles;
    } else {
        css.appendChild(document.createTextNode(styles));
    }
    document.getElementsByTagName("head")[0].appendChild(css);
}
function closeModal() {
    var e = document.getElementsByTagName("html")[0];
    (e = (e = e || document.getElementsByTagName("body")[0]) || document.getElementsByTagName("div")[0]).style.width = "", e.style.position = "", e.style.top = "", e.style.overflow = "", document.getElementById("abw-modal-close").removeEventListener("click", closeModal), document.getElementById("abw-modal-Div").remove()
}
function initModal(e) {
    var t = document.createElement("div");
    t.setAttribute("id", "abw-modal-Div"), t.style.height = "100vh", t.style.width = "100%", t.style.position = "absolute", t.style.top = "0px", t.style.backgroundColor = "rgba(0,0,0,.5)", t.style.zIndex = "9999999";
    var l = document.createElement("button");
    l.setAttribute("id", "abw-modal-close"), l.setAttribute("aria-label", "Close"), l.style.position = "fixed", l.style.top = "5px", l.style.cursor = "pointer", l.style.right = "5px", l.style.background = "transparent", l.style.border = "1px solid white", l.style.height = "25px", l.style.width = "35px", l.style.borderRadius = "6px", l.style.color = "white", l.innerText = "✕", l.cursor = "pointer", l.addEventListener("click", closeModal);
    var o = document.createElement("div");
    o.setAttribute("id", "abw-Modal"), o.setAttribute("role", "dialog"), o.style.height = "90vh", o.style.width = "99%", o.style.margin = "auto", o.style.left = ".5%", o.style.top = "35px", o.style.background = "white", o.style.borderRadius = "3px", o.style.position = "absolute";
    var s = document.getElementsByTagName("html")[0];
    (s = (s = s || document.getElementsByTagName("body")[0]) || document.getElementsByTagName("div")[0]).style.width = "calc(100% - 0px)", s.style.position = "fixed", s.style.top = "0px", s.style.overflow = "hidden", s.appendChild(t), t.appendChild(l), t.appendChild(o);
    var i = document.createElement("iframe");
    i.setAttribute("src", e), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("frameborder", "0"), i.setAttribute("allowfullscreen", "1"), i.setAttribute("id", "abw-iframe"), i.style.borderRadius = "5px", o.appendChild(i)
}
function createWidget(myCustomData, actionWidgetSetting) {
    if (myCustomData && myCustomData.length > 1) {
        createQuickBall(myCustomData, actionWidgetSetting);
    } else if (myCustomData && myCustomData.length === 1) {
        createQuickBallMenu(myCustomData[0], actionWidgetSetting, document.getElementsByTagName("body")[0], myCustomData.length, 0);
    }
}
function createQuickBallMenu(item, actionWidgetSetting, menu, customDataLength, index) {
    const menuItem = document.createElement('a');
    menuItem.href = item?.openInModal ? 'javascript:;' : item?.url;
    menuItem.target = item?.openInModal ? '_self' : '_blank';
    menuItem.className = `abw-quick-ball-item abw-quick-ball-menu-item-${index}`;
    menuItem.title = item?.label;
    const imgElement = document.createElement('img');
    imgElement.src = item?.buttonIconUrl;
    imgElement.alt = 'Quick Action Icon';
    imgElement.style.width = '24px';
    imgElement.style.marginRight = '5px';
    const labelDiv = document.createElement('div');
    labelDiv.className = 'abw-label-text-section';
    const labelSpan = document.createElement('span');
    labelSpan.className = 'label-text';
    labelSpan.innerText = item?.label;
    labelDiv.appendChild(labelSpan);
    if (customDataLength === 1 && actionWidgetSetting?.showAttributionText) {
        labelDiv.style.display = 'flex';
        labelDiv.style.flexDirection = 'column';
        const whiteLabelSpan = document.createElement('span');
        whiteLabelSpan.className = 'white-label-text';
        whiteLabelSpan.style.fontSize = '6px';
        whiteLabelSpan.innerText = actionWidgetSetting?.attributionText ? actionWidgetSetting?.attributionText : '';
        labelDiv.appendChild(whiteLabelSpan);
    }
    menuItem.appendChild(imgElement);
    menuItem.appendChild(labelDiv);
    let internalstyle;
    if (customDataLength === 1) {
        internalstyle = `
            .abw-quick-ball-menu-item-${index} {
                background: ${item?.buttonBackgroundColor ? item.buttonBackgroundColor : 'transparent'};
                color: ${item?.buttonTextColor ? item.buttonTextColor : 'black'};
                box-shadow : 0 5px 10px rgb(0 0 0 / 20%);
                cursor : pointer;
                margin : 0px;
                text-align : center;
                transition : all 0.3s;
                text-decoration : none;
                justify-content : center;
                align-items : center;
                display : flex;
                position : fixed;
                z-index: 1;
                overflow: hidden;
                padding : 10px 10px;
                border-radius : 5px;
                top : ${actionWidgetSetting?.location?.top ? actionWidgetSetting.location.top + 'px' : 'auto'};
                right : ${actionWidgetSetting?.location?.right ? actionWidgetSetting.location.right + 'px' : 'auto'};
                left : ${actionWidgetSetting?.location?.left ? actionWidgetSetting.location.left + 'px' : 'auto'};
                bottom : ${actionWidgetSetting?.location?.bottom ? actionWidgetSetting.location.bottom + 'px' : 'auto'};
            }
            .abw-quick-ball-menu-item-${index}::after {
                content: '';
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                -webkit-transform: scaleY(0);
                transform: scaleY(0);
                -webkit-transform-origin: 50% 100%;
                transform-origin: 50% 100%;
                -webkit-transition-property: transform;
                transition-property: transform;
                -webkit-transition-duration: 0.5s;
                transition-duration: 0.5s;
                -webkit-transition-timing-function: ease-out;
                transition-timing-function: ease-out;
                background: ${item?.hoverBackgroundColor ? item.hoverBackgroundColor : 'transparent'};
            }
            .abw-quick-ball-menu-item-${index}:hover:after {
                -webkit-transform: scaleY(1);
                transform: scaleY(1);
                -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
                transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
                opacity: 1;
            }
            .abw-quick-ball-menu-item-${index}:hover {color: ${item?.hoverTextColor ? item.hoverTextColor : 'transparent'};
        }`;
    } else {
        internalstyle = `.abw-quick-ball-menu-item-${index} {
            background: ${item?.buttonBackgroundColor ? item.buttonBackgroundColor : 'transparent'};
            color: ${item?.buttonTextColor ? item.buttonTextColor : 'black'};
        }.abw-quick-ball-menu-item-${index}:hover {color: ${item?.buttonTextColor ? item.buttonTextColor : 'transparent'};`;
    }
    appendStylesToHead(internalstyle);
    menuItem.addEventListener('click', function () {
        (item?.openInModal) ? initModal(item.url) : window.open(item.url, '_blank');
    });
    menu.appendChild(menuItem);
}
function createQuickBall(myCustomData, actionWidgetSetting) {
    const quickBallButtonSection = document.createElement('div');
    quickBallButtonSection.id = 'abw-quick-ball';
    if (actionWidgetSetting?.toolTipText) {
        const quickBallButtonToolTip = document.createElement('div');
        quickBallButtonToolTip.className = 'abw-quick-ball-tooltip';
        const quickBallButtonToolTipP = document.createElement('p');
        quickBallButtonToolTipP.className = 'abw-quick-ball-tooltip-inner';
        quickBallButtonToolTipP.innerText = actionWidgetSetting?.toolTipText ? actionWidgetSetting.toolTipText : '';
        quickBallButtonToolTipP.title = actionWidgetSetting?.toolTipText ? actionWidgetSetting.toolTipText : '';
        quickBallButtonToolTipP.innerHTML = quickBallButtonToolTipP.innerText.split("").map((char, i) => `<span style=" -webkit-transform:rotate(${i * 12}deg);transform:rotate(${i * 12}deg);">${char}</span>`).join("");
        quickBallButtonToolTip.appendChild(quickBallButtonToolTipP);
        quickBallButtonSection.appendChild(quickBallButtonToolTip);

    }
    const internalstyle = `
        :root {
            --abw-radius: 53px;
            --abw-frame-size: calc(var(--abw-radius) / 2);
            --abw-outer: calc(var(--abw-radius) * 2);
            --abw-font-size: calc(var(--abw-radius) / 5);
        }
        .abw-quick-ball-item {
            width: 100%;
            max-width: 40px;
            height: 40px;
            padding: 5px;
            border-radius: 50%;
            opacity: 0;
            -webkit-transform: translateY(0px);
            transform: translateY(0px);
            white-space: nowrap;
            box-shadow : 0 5px 10px rgb(0 0 0 / 20%);
            cursor : pointer;
            margin : 0px;
            text-align : center;
            transition : all 0.3s;
            text-decoration : none;
            justify-content : center;
            align-items : center;
            display : flex;
            position: absolute;

        }
        .abw-quick-ball-item.animate {
            opacity: 1;
        }
        .abw-quick-ball-item .abw-label-text-section {
            font-size: 14px;
            width: 0;
            opacity: 0;
        }
        .abw-quick-ball-item:hover {
            border-radius: 5px;
            width: auto;
            min-width: 100%;
            max-width: 125px;
            z-index: 11;
        }
        .abw-quick-ball-item:hover .abw-label-text-section {
            width: auto;
            opacity: 1;
        }
        #abw-quick-ball { 
            flex-direction: ${(actionWidgetSetting?.location?.top && actionWidgetSetting?.location?.right) || (actionWidgetSetting?.location?.bottom && actionWidgetSetting?.location?.right) ? 'row' : 'row-reverse'};
            width: var(--abw-outer);
            height: var(--abw-outer);
            justify-content: center;
            position: fixed;
            margin: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
        #abw-quick-ball #quick-ball-button::after{
            content: "X";
            font-size: 30px;
            opacity: 0;
            position: absolute;
            transition: all 0.4s;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            color: #FFF;
            background: black;
            justify-content: center;
            display: flex;
            align-items: center;
            overflow: hidden;
            border-radius: 50%;
        }
        #abw-quick-ball.active #quick-ball-button::after{
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
            opacity: 1;
        }
        .abw-quick-ball-tooltip-inner {
            font-size: var(--abw-font-size);
            width: 100%;
            height: 100%;
            margin: auto;
            display: block;
        }
        .abw-quick-ball-tooltip {
            position: absolute;
            width: var(--abw-outer);
            height: var(--abw-outer);
            animation: rotateText 10s linear infinite;
        }
        .abw-quick-ball-tooltip span {
            position: absolute;
            left: 50%;
            font-size: 1.2em;
            -webkit-transform-origin: 0 var(--abw-radius);
            transform-origin: 0 var(--abw-radius);
        }
        @keyframes rotateText {
            0% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
            100% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
        }
    `;
    appendStylesToHead(internalstyle);
    const quickBallButton = document.createElement('div');
    quickBallButton.id = 'quick-ball-button';

    const imgElement = document.createElement('img');
    imgElement.src = actionWidgetSetting.imgUrl;
    imgElement.alt = 'quick action';
    imgElement.style.cssText = 'width: 100%; height: 50px; max-width: 50px; display: flex; margin: auto;object-fit: cover;';
    imgElement.onload = function () {
        const quickBallMenu = document.createElement('div');
        quickBallMenu.id = 'quick-ball-menu';
        myCustomData.forEach(function (item, index) {
            createQuickBallMenu(item, actionWidgetSetting, quickBallButtonSection, myCustomData.length, index);
        });
    };
    quickBallButton.appendChild(imgElement);
    quickBallButtonSection.style.top = actionWidgetSetting?.location?.top ? actionWidgetSetting.location.top + 'px' : null;
    quickBallButtonSection.style.right = actionWidgetSetting?.location?.right ? actionWidgetSetting.location.right + 'px' : null;
    quickBallButtonSection.style.left = actionWidgetSetting?.location?.left ? actionWidgetSetting.location.left + 'px' : null;
    quickBallButtonSection.style.bottom = actionWidgetSetting?.location?.bottom ? actionWidgetSetting.location.bottom + 'px' : null;
    quickBallButton.style.zIndex = '9999999';
    quickBallButton.style.boxShadow = '0 5px 10px rgb(0 0 0 / 20%)';
    quickBallButton.style.padding = '10px';
    quickBallButton.style.borderRadius = '50%';
    quickBallButton.style.position = 'absolute';
    quickBallButton.style.background = '#FFF';
    quickBallButtonSection.addEventListener('click', function () {
        const mainElement = document.querySelector('#abw-quick-ball');
        let initDeg = 0;
        mainElement.className = mainElement.className === 'active' ? '' : 'active';
        if (actionWidgetSetting?.location?.bottom && actionWidgetSetting?.location?.left) {
            initDeg = 270;
        } else if (actionWidgetSetting?.location?.top && actionWidgetSetting?.location?.left) {
            initDeg = 0;
        } else if (actionWidgetSetting?.location?.top && actionWidgetSetting?.location?.right) {
            initDeg = 90;
        } else if (actionWidgetSetting?.location?.bottom && actionWidgetSetting?.location?.right) {
            initDeg = 180;
        }
        document.querySelectorAll('.abw-quick-ball-item').forEach(function (item, index) {
            item.className = `abw-quick-ball-item abw-quick-ball-menu-item-${index} ${mainElement.className === 'active' ? 'animate' : ''}`;
            if (mainElement.className === 'active') {
                item.style.transform = `rotate(${initDeg}deg) translate(120px) rotate(-${initDeg}deg)`;
            } else {
                item.style = ''
            }
            initDeg = initDeg + 45;
        });
    });
    quickBallButtonSection.appendChild(quickBallButton);
    document.body.appendChild(quickBallButtonSection);
}