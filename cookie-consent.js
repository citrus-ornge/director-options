/* Director Options — Cookie Consent
   Blocks GTM until user accepts. PECR/UK GDPR compliant.
   Drop this script BEFORE the GTM snippet in <head>.
   GTM snippet should use window.dataLayer push pattern (already does). */

(function() {
  var CONSENT_KEY = 'do_cookie_consent';
  var CONSENT_VERSION = '1';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch(e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch(e) {}
  }

  function loadGTM() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5L7ND2KJ';
    document.head.appendChild(s);
  }

  function dismissBanner() {
    var banner = document.getElementById('do-cookie-banner');
    if (banner) banner.remove();
  }

  function acceptAll() {
    setConsent('accepted_' + CONSENT_VERSION);
    loadGTM();
    dismissBanner();
  }

  function acceptEssential() {
    setConsent('essential_' + CONSENT_VERSION);
    dismissBanner();
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'do-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = [
      '<div id="do-cookie-inner">',
        '<div id="do-cookie-text">',
          '<strong>We use cookies</strong>',
          '<p>We use analytics and advertising cookies to understand how directors find us and to measure our marketing. You can accept all cookies or essential cookies only. See our <a href="/privacy" id="do-privacy-link">Privacy Policy</a> for details.</p>',
        '</div>',
        '<div id="do-cookie-btns">',
          '<button id="do-btn-essential">Essential only</button>',
          '<button id="do-btn-accept">Accept all</button>',
        '</div>',
      '</div>'
    ].join('');

    var style = document.createElement('style');
    style.textContent = [
      '#do-cookie-banner{',
        'position:fixed;bottom:0;left:0;right:0;z-index:99999;',
        'background:#0f2236;border-top:3px solid #2a9d5c;',
        'padding:16px 24px;box-shadow:0 -4px 24px rgba(0,0,0,0.35);',
        'font-family:"Nunito Sans",sans-serif;',
      '}',
      '#do-cookie-inner{',
        'max-width:1100px;margin:0 auto;display:flex;',
        'align-items:center;gap:24px;flex-wrap:wrap;',
      '}',
      '#do-cookie-text{flex:1;min-width:240px;}',
      '#do-cookie-text strong{',
        'display:block;font-size:14px;font-weight:800;',
        'color:#fff;margin-bottom:4px;',
      '}',
      '#do-cookie-text p{',
        'font-size:12px;color:rgba(255,255,255,0.7);',
        'line-height:1.5;margin:0;',
      '}',
      '#do-cookie-text a{color:#2a9d5c;text-decoration:underline;}',
      '#do-cookie-btns{display:flex;gap:10px;flex-shrink:0;}',
      '#do-btn-essential{',
        'padding:10px 18px;border-radius:5px;font-size:13px;',
        'font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,0.3);',
        'background:transparent;color:#fff;',
        'font-family:"Nunito Sans",sans-serif;',
      '}',
      '#do-btn-accept{',
        'padding:10px 20px;border-radius:5px;font-size:13px;',
        'font-weight:700;cursor:pointer;border:none;',
        'background:#2a9d5c;color:#fff;',
        'font-family:"Nunito Sans",sans-serif;',
      '}',
      '#do-btn-essential:hover{background:rgba(255,255,255,0.08);}',
      '#do-btn-accept:hover{background:#238a4f;}',
      '@media(max-width:600px){',
        '#do-cookie-inner{flex-direction:column;align-items:flex-start;gap:14px;}',
        '#do-cookie-btns{width:100%;}',
        '#do-btn-essential,#do-btn-accept{flex:1;text-align:center;}',
      '}'
    ].join('');

    document.head.appendChild(style);
    document.body.appendChild(banner);

    document.getElementById('do-btn-accept').addEventListener('click', acceptAll);
    document.getElementById('do-btn-essential').addEventListener('click', acceptEssential);
  }

  // On load: check existing consent
  var consent = getConsent();
  if (consent && consent.indexOf('accepted') === 0) {
    // Previously accepted — load GTM immediately
    loadGTM();
  } else if (consent && consent.indexOf('essential') === 0) {
    // Previously declined tracking — no GTM
  } else {
    // No consent yet — show banner, do not load GTM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
