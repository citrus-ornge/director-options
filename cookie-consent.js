/* Director Options — Cookie Consent v2
   Google Consent Mode v2 compliant. Blocks all interaction until user chooses.
   Initialises dataLayer with all storage denied before GTM loads.
   Place BEFORE GTM snippet in <head>. */

(function () {
  var CONSENT_KEY = 'do_cookie_consent';
  var CONSENT_VERSION = '1';

  // --- Step 1: Initialise dataLayer and set ALL storage to denied by default ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': 2000
  });

  // Push consent_default event so GTM can listen
  dataLayer.push({ event: 'consent_default' });

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { }
  }

  function loadGTM() {
    if (document.getElementById('gtm-script')) return;
    var s = document.createElement('script');
    s.id = 'gtm-script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5L7ND2KJ';
    dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    document.head.appendChild(s);
  }

  function grantAll() {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted',
      'functionality_storage': 'granted',
      'security_storage': 'granted'
    });
    dataLayer.push({ event: 'consent_update', consent_action: 'accepted_all' });
    loadGTM();
  }

  function grantEssential() {
    gtag('consent', 'update', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted'
    });
    dataLayer.push({ event: 'consent_update', consent_action: 'essential_only' });
  }

  function removeOverlay() {
    var overlay = document.getElementById('do-consent-overlay');
    if (overlay) overlay.remove();
    // Re-enable scrolling
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }

  function acceptAll() {
    setConsent('accepted_' + CONSENT_VERSION);
    grantAll();
    removeOverlay();
  }

  function essentialOnly() {
    setConsent('essential_' + CONSENT_VERSION);
    grantEssential();
    removeOverlay();
  }

  function showBanner() {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    var overlay = document.createElement('div');
    overlay.id = 'do-consent-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Cookie consent');

    overlay.innerHTML = [
      '<div id="do-consent-box">',
        '<div id="do-consent-logo">Director<span>Options</span></div>',
        '<h2 id="do-consent-title">Before you continue</h2>',
        '<p id="do-consent-body">We use cookies and tracking technologies to understand how directors find us and to measure our marketing effectiveness. You can choose to accept all cookies or essential cookies only.</p>',
        '<p id="do-consent-body2">We use Meta Pixel, Google Analytics (GA4) and Google Ads for analytics and advertising. These will only activate with your consent. See our <a href="#" onclick="openModal && openModal(\'privacy\');return false;">Privacy Policy</a> for full details.</p>',
        '<div id="do-consent-btns">',
          '<button id="do-btn-essential">Essential only</button>',
          '<button id="do-btn-accept">Accept all cookies</button>',
        '</div>',
        '<p id="do-consent-note">You can change your preferences at any time by clearing your browser cookies.</p>',
      '</div>'
    ].join('');

    var style = document.createElement('style');
    style.textContent = [
      '#do-consent-overlay{',
        'position:fixed;inset:0;z-index:999999;',
        'background:rgba(10,22,40,0.92);',
        'display:flex;align-items:center;justify-content:center;',
        'padding:20px;',
        'font-family:"Nunito Sans",sans-serif;',
      '}',
      '#do-consent-box{',
        'background:#fff;border-radius:12px;',
        'padding:36px 32px;max-width:520px;width:100%;',
        'box-shadow:0 24px 64px rgba(0,0,0,0.4);',
        'text-align:center;',
      '}',
      '#do-consent-logo{',
        'font-family:"Nunito",sans-serif;font-size:18px;font-weight:800;',
        'color:#1a3a5c;letter-spacing:0.04em;text-transform:uppercase;',
        'margin-bottom:20px;',
      '}',
      '#do-consent-logo span{color:#2a9d5c;}',
      '#do-consent-title{',
        'font-family:"Nunito",sans-serif;font-size:20px;font-weight:800;',
        'color:#1a3a5c;margin-bottom:12px;',
      '}',
      '#do-consent-body,#do-consent-body2{',
        'font-size:13px;color:#555;line-height:1.6;margin-bottom:10px;',
      '}',
      '#do-consent-body2 a{color:#1a3a5c;text-decoration:underline;}',
      '#do-consent-btns{',
        'display:flex;gap:12px;margin:24px 0 16px;',
        'flex-direction:column;',
      '}',
      '#do-btn-essential{',
        'padding:13px 20px;border-radius:6px;font-size:14px;',
        'font-weight:700;cursor:pointer;',
        'border:2px solid #1a3a5c;background:#fff;color:#1a3a5c;',
        'font-family:"Nunito Sans",sans-serif;',
        'transition:background 0.15s;',
      '}',
      '#do-btn-accept{',
        'padding:13px 20px;border-radius:6px;font-size:14px;',
        'font-weight:700;cursor:pointer;border:none;',
        'background:#2a9d5c;color:#fff;',
        'font-family:"Nunito Sans",sans-serif;',
        'transition:background 0.15s;',
      '}',
      '#do-btn-essential:hover{background:#f0f4f8;}',
      '#do-btn-accept:hover{background:#238a4f;}',
      '#do-consent-note{',
        'font-size:11px;color:#aaa;line-height:1.5;margin:0;',
      '}',
      '@media(max-width:480px){',
        '#do-consent-box{padding:28px 20px;}',
        '#do-consent-title{font-size:18px;}',
      '}'
    ].join('');

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    document.getElementById('do-btn-accept').addEventListener('click', acceptAll);
    document.getElementById('do-btn-essential').addEventListener('click', essentialOnly);
  }

  // --- Step 2: Check existing consent on load ---
  var consent = getConsent();

  if (consent && consent.indexOf('accepted') === 0) {
    // Previously accepted — grant all and load GTM immediately
    grantAll();
  } else if (consent && consent.indexOf('essential') === 0) {
    // Previously declined tracking — essential only, no GTM
    grantEssential();
  } else {
    // No consent yet — show blocking overlay
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }

})();
