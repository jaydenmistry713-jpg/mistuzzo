// ─── REPLACE THIS WITH YOUR PIXEL ID FROM META EVENTS MANAGER ───
const MM_PIXEL_ID = '1639779053986650';
// ────────────────────────────────────────────────────────────────

const CONSENT_KEY = 'mm_cookie_consent';

function loadPixel() {
    if (typeof fbq !== 'undefined') return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', MM_PIXEL_ID);
    fbq('track', 'PageView');
    document.dispatchEvent(new Event('mm:pixel-ready'));
}

function acceptCookies() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    hideBanner();
    loadPixel();
}

function declineCookies() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    hideBanner();
}

function hideBanner() {
    const banner = document.getElementById('mm-cookie-banner');
    if (banner) {
        banner.classList.remove('visible');
        setTimeout(() => banner.remove(), 400);
    }
}

function showBanner() {
    const style = document.createElement('style');
    style.textContent = `
        #mm-cookie-banner {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(120%);
            opacity: 0;
            z-index: 99999;
            background: rgba(17,17,17,0.97);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 20px;
            max-width: 760px;
            width: calc(100vw - 40px);
            box-shadow: 0 8px 40px rgba(0,0,0,0.5);
            transition: transform 0.4s ease, opacity 0.4s ease;
        }
        #mm-cookie-banner.visible {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        .mm-cookie-text {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 0;
        }
        .mm-cookie-text p {
            margin: 0;
            font-size: 0.85rem;
            color: #ccc;
            line-height: 1.5;
            font-family: 'Outfit', sans-serif;
        }
        .mm-cookie-text a {
            color: #00e5ff;
            text-decoration: none;
            white-space: nowrap;
        }
        .mm-cookie-icon {
            width: 36px; height: 36px;
            border-radius: 50%;
            background: rgba(0,229,255,0.1);
            border: 1px solid rgba(0,229,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .mm-cookie-buttons {
            display: flex;
            gap: 10px;
            flex-shrink: 0;
        }
        .mm-btn-decline {
            padding: 9px 20px;
            background: transparent;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 6px;
            color: #888;
            font-family: 'Outfit', sans-serif;
            font-size: 0.82rem;
            font-weight: 500;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        }
        .mm-btn-decline:hover { border-color: rgba(255,255,255,0.25); color: #ccc; }
        .mm-btn-accept {
            padding: 9px 20px;
            background: #00e5ff;
            border: none;
            border-radius: 6px;
            color: #0a0a0a;
            font-family: 'Outfit', sans-serif;
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        }
        .mm-btn-accept:hover { background: #f0f0f0; }
        @media (max-width: 560px) {
            #mm-cookie-banner {
                bottom: 0;
                left: 0;
                width: 100%;
                max-width: 100%;
                border-radius: 16px 16px 0 0;
                border-bottom: none;
                flex-direction: column;
                align-items: stretch;
                gap: 14px;
                padding: 20px 16px;
                transform: translateY(120%);
            }
            #mm-cookie-banner.visible {
                transform: translateY(0);
                opacity: 1;
            }
            .mm-cookie-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
            .mm-btn-decline, .mm-btn-accept {
                text-align: center;
                padding: 11px 16px;
            }
        }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.id = 'mm-cookie-banner';
    banner.innerHTML = `
        <div class="mm-cookie-text">
            <div class="mm-cookie-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            </div>
            <p>We use cookies to track ad performance via Meta Pixel. No data is shared without your consent. <a href="/privacy-policy.html">Privacy Policy</a></p>
        </div>
        <div class="mm-cookie-buttons">
            <button class="mm-btn-decline" onclick="declineCookies()">Decline</button>
            <button class="mm-btn-accept" onclick="acceptCookies()">Accept</button>
        </div>
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('visible')));
}

const consent = localStorage.getItem(CONSENT_KEY);
if (consent === 'accepted') {
    loadPixel();
} else if (!consent) {
    document.addEventListener('DOMContentLoaded', showBanner);
}
