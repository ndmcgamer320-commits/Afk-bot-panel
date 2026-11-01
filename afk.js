#!/usr/bin/env node
// AFK Bot Panel - single file. Run:  node afk.js   then open http://localhost:3000 (password is printed)
const __HTML__ = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n<title>AFK Bot Panel</title>\n<link rel=\"manifest\" href=\"/manifest.json\">\n<meta name=\"theme-color\" content=\"#0f1115\">\n<link rel=\"apple-touch-icon\" href=\"/icon-192.png\">\n<meta name=\"mobile-web-app-capable\" content=\"yes\">\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n<style>\n:root{--bg:#0f1115;--panel:#181b22;--panel2:#20242e;--line:#2c3140;--tx:#e8ebf2;--mut:#8b93a7;--ac:#7c5cff;--ok:#3ddc84;--bad:#ff5c6c;--warn:#ffb84d}\n*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}\nhtml,body{margin:0;background:var(--bg);color:var(--tx);font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}\nbutton,input,select{font:inherit;color:inherit}\ninput{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:9px 10px;width:100%;outline:none}\ninput:focus{border-color:var(--ac)}\nbutton{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:9px 12px;cursor:pointer;touch-action:manipulation}\nbutton:active{filter:brightness(1.25)}\nbutton.pri{background:var(--ac);border-color:var(--ac);font-weight:600}\nbutton.bad{background:#3a1d24;border-color:#5a2832;color:#ff8b98}\nbutton.on{background:var(--ac);border-color:var(--ac)}\nheader{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--line);background:var(--panel);position:sticky;top:0;z-index:5}\nheader h1{font-size:16px;margin:0;flex:1}\nheader .dot{width:9px;height:9px;border-radius:50%;background:var(--bad)}\nheader .dot.ok{background:var(--ok)}\n.wrap{max-width:1200px;margin:0 auto;padding:12px;display:grid;gap:12px}\n.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px}\n.card h2{margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--mut)}\n.add{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}\n.add .f{grid-column:span 2}.add .w{grid-column:span 3}.add .full{grid-column:1/-1}\n.add label{display:block;font-size:12px;color:var(--mut);margin-bottom:3px}\n.chk{display:flex;gap:14px;align-items:center;flex-wrap:wrap;grid-column:1/-1;color:var(--mut)}\n.chk label{display:flex;gap:6px;align-items:center;margin:0;color:var(--tx)}\n.chk input{width:auto}\n.tabs{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px}\n.tab{flex:0 0 auto;display:flex;gap:8px;align-items:center;padding:8px 12px;border-radius:10px;background:var(--panel2);border:1px solid var(--line);cursor:pointer}\n.tab.sel{border-color:var(--ac);box-shadow:0 0 0 1px var(--ac) inset}\n.tab .s{width:8px;height:8px;border-radius:50%;background:var(--mut)}\n.tab .s.online{background:var(--ok)}.tab .s.connecting{background:var(--warn)}\n.main{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:12px}\n@media(max-width:860px){.main{grid-template-columns:1fr}.add .f,.add .w{grid-column:span 6}}\n.screen{position:relative;width:100%;aspect-ratio:16/9;background:#000;border-radius:10px;overflow:hidden;border:1px solid var(--line)}\n.screen iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}\n.screen .ov{position:absolute;inset:0;touch-action:none;cursor:crosshair;z-index:2}\n.screen .cross{position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-9px;pointer-events:none;z-index:3;opacity:.75}\n.screen .cross:before,.screen .cross:after{content:\"\";position:absolute;background:#fff;mix-blend-mode:difference}\n.screen .cross:before{left:8px;top:0;width:2px;height:18px}.screen .cross:after{top:8px;left:0;height:2px;width:18px}\n.screen .msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;color:var(--mut);padding:20px;z-index:1}\n.stats{display:flex;gap:14px;flex-wrap:wrap;margin:10px 0;color:var(--mut);font-size:13px}\n.stats b{color:var(--tx)}\n.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}\n.pad{display:grid;grid-template-columns:repeat(3,56px);grid-template-rows:repeat(3,56px);gap:6px}\n.pad button{padding:0;font-size:18px;user-select:none;-webkit-user-select:none}\n.ctl{display:flex;gap:18px;flex-wrap:wrap;align-items:center;margin-top:10px}\n.side{display:flex;flex-direction:column;gap:6px}\n.side button{min-width:96px;user-select:none;-webkit-user-select:none}\n.chat{height:240px;overflow-y:auto;background:#0b0d11;border:1px solid var(--line);border-radius:8px;padding:8px;font:12.5px/1.45 ui-monospace,Menlo,Consolas,monospace;word-break:break-word}\n.chat div.sys{color:var(--mut)}.chat div.err{color:var(--bad)}.chat div.me{color:var(--ac)}\n.hotbar{display:grid;grid-template-columns:repeat(9,1fr);gap:4px;margin-bottom:8px}\n.hotbar button{padding:8px 0}\n.inv{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;max-height:220px;overflow-y:auto}\n.item{display:flex;justify-content:space-between;gap:6px;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:6px 8px;font-size:12px;cursor:pointer}\n.item.held{border-color:var(--ok)}\n.item span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.mut{color:var(--mut)}\n#toast{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#000c;border:1px solid var(--line);padding:8px 14px;border-radius:20px;display:none;z-index:9}\n.hide{display:none!important}\n</style>\n</head>\n<body>\n<header>\n  <div class=\"dot\" id=\"conn\"></div>\n  <h1>⛏️ AFK Bot Panel</h1>\n  <button id=\"toggleAdd\" class=\"pri\">+ Add account</button>\n</header>\n\n<div class=\"wrap\">\n  <div class=\"card\" id=\"addCard\">\n    <h2>Add cracked account</h2>\n    <form class=\"add\" id=\"addForm\" autocomplete=\"off\">\n      <div class=\"w\"><label>Cracked username</label><input id=\"a_user\" placeholder=\"e.g. AFK_Gg\" maxlength=\"16\" required></div>\n      <div class=\"w\"><label>Server IP / host</label><input id=\"a_host\" placeholder=\"play.example.net\" required></div>\n      <div class=\"f\"><label>Port</label><input id=\"a_port\" type=\"number\" value=\"25565\"></div>\n      <div class=\"f\"><label>Version (blank = auto)</label><input id=\"a_ver\" placeholder=\"1.21.11\"></div>\n      <div class=\"f\"><label>/login password (optional)</label><input id=\"a_pw\" placeholder=\"for AuthMe servers\"></div>\n      <div class=\"chk\">\n        <label><input type=\"checkbox\" id=\"a_afk\" checked> Anti-AFK moves</label>\n        <label><input type=\"checkbox\" id=\"a_rec\" checked> Auto-reconnect</label>\n      </div>\n      <div class=\"full\"><button class=\"pri\" style=\"width:100%\">Add &amp; connect</button></div>\n    </form>\n  </div>\n\n  <div class=\"card\">\n    <h2>Accounts</h2>\n    <div class=\"tabs\" id=\"tabs\"></div>\n    <div class=\"mut\" id=\"empty\">No accounts yet. Add one above.</div>\n  </div>\n\n  <div class=\"main hide\" id=\"main\">\n    <div class=\"card\">\n      <h2 id=\"title\">Live view</h2>\n      <div class=\"screen\" id=\"screen\">\n        <div class=\"msg\" id=\"scrMsg\">Not connected</div>\n        <iframe id=\"view\" title=\"live view\"></iframe>\n        <div class=\"ov\" id=\"ov\"></div>\n        <div class=\"cross\"></div>\n      </div>\n      <div class=\"stats\" id=\"stats\"></div>\n      <div class=\"row\" style=\"margin-bottom:6px\">\n        <button id=\"modeBtn\">Tap = Attack / Break</button>\n        <span class=\"mut\">Click the screen to aim &amp; act. Drag to look. Right-click / long-press = use / place.</span>\n      </div>\n      <div class=\"ctl\">\n        <div class=\"pad\" id=\"pad\">\n          <span></span><button data-k=\"forward\">W</button><span></span>\n          <button data-k=\"left\">A</button><button data-k=\"back\">S</button><button data-k=\"right\">D</button>\n        </div>\n        <div class=\"side\">\n          <button data-k=\"jump\">Jump</button>\n          <button data-k=\"sneak\" data-t=\"1\">Sneak</button>\n          <button data-k=\"sprint\" data-t=\"1\">Sprint</button>\n          <button id=\"stopBtn\" class=\"bad\">Stop</button>\n        </div>\n        <div class=\"side\">\n          <button id=\"conBtn\" class=\"pri\">Connect</button>\n          <button id=\"disBtn\">Disconnect</button>\n          <button id=\"respBtn\">Respawn</button>\n          <button id=\"rmBtn\" class=\"bad\">Remove</button>\n        </div>\n      </div>\n      <div class=\"row\" style=\"margin-top:12px\">\n        <label class=\"row\"><input type=\"checkbox\" id=\"t_afk\" style=\"width:auto\"> Anti-AFK</label>\n        <label class=\"row\"><input type=\"checkbox\" id=\"t_rec\" style=\"width:auto\"> Auto-reconnect</label>\n      </div>\n      <div class=\"row\" style=\"margin-top:10px\">\n        <input id=\"gx\" type=\"number\" placeholder=\"X\" style=\"width:80px\"><input id=\"gy\" type=\"number\" placeholder=\"Y\" style=\"width:80px\"><input id=\"gz\" type=\"number\" placeholder=\"Z\" style=\"width:80px\">\n        <button id=\"goBtn\">Walk there</button>\n      </div>\n    </div>\n\n    <div style=\"display:grid;gap:12px;align-content:start\">\n      <div class=\"card\">\n        <h2>Chat &amp; commands</h2>\n        <div class=\"chat\" id=\"chat\"></div>\n        <form class=\"row\" id=\"chatForm\" style=\"margin-top:8px;flex-wrap:nowrap\" autocomplete=\"off\">\n          <input id=\"chatIn\" placeholder=\"Message or /command\" maxlength=\"256\">\n          <button class=\"pri\">Send</button>\n        </form>\n      </div>\n      <div class=\"card\">\n        <h2>Hotbar &amp; inventory</h2>\n        <div class=\"hotbar\" id=\"hotbar\"></div>\n        <div class=\"inv\" id=\"inv\"></div>\n        <div class=\"mut\" style=\"margin-top:6px;font-size:12px\">Tap an item to hold it. Press ✕ to drop the stack.</div>\n      </div>\n    </div>\n  </div>\n</div>\n<div id=\"toast\"></div>\n\n<script src=\"/socket.io/socket.io.js\"></script>\n<script>\nconst $ = s => document.querySelector(s)\nconst socket = io()\nconst bots = new Map()\nconst logs = new Map()\nconst invs = new Map()\nlet sel = null\nlet clickMode = 'left'\nlet lastViewKey = ''\n\nfunction toast (t) { const el = $('#toast'); el.textContent = t; el.style.display = 'block'; clearTimeout(toast.t); toast.t = setTimeout(() => el.style.display = 'none', 3500) }\n\nsocket.on('connect', () => $('#conn').classList.add('ok'))\nsocket.on('disconnect', () => $('#conn').classList.remove('ok'))\nsocket.on('toast', toast)\nsocket.on('init', d => {\n  bots.clear(); logs.clear()\n  d.bots.forEach(b => bots.set(b.id, b))\n  d.logs.forEach(l => logs.set(l.id, l.lines))\n  if (!sel && d.bots.length) sel = d.bots[0].id\n  renderAll()\n})\nsocket.on('bot', b => { bots.set(b.id, b); if (!sel) sel = b.id; renderAll() })\nsocket.on('removed', id => { bots.delete(id); logs.delete(id); if (sel === id) sel = bots.size ? [...bots.keys()][0] : null; renderAll() })\nsocket.on('log', ({ id, line }) => { const a = logs.get(id) || []; a.push(line); if (a.length > 300) a.shift(); logs.set(id, a); if (id === sel) appendLine(line) })\nsocket.on('inv', ({ id, items, held }) => { invs.set(id, { items, held }); if (id === sel) renderInv() })\n\n$('#toggleAdd').onclick = () => $('#addCard').classList.toggle('hide')\n$('#a_host').value = localStorage.getItem('host') || ''\n$('#a_port').value = localStorage.getItem('port') || 25565\n$('#addForm').onsubmit = ev => {\n  ev.preventDefault()\n  const cfg = { username: $('#a_user').value.trim(), host: $('#a_host').value.trim(), port: +$('#a_port').value || 25565, version: $('#a_ver').value.trim(), password: $('#a_pw').value, afk: $('#a_afk').checked, reconnect: $('#a_rec').checked }\n  localStorage.setItem('host', cfg.host); localStorage.setItem('port', cfg.port)\n  socket.emit('add', cfg)\n  $('#a_user').value = ''\n  toast('Adding ' + cfg.username + '...')\n}\n\nfunction renderAll () {\n  $('#empty').classList.toggle('hide', bots.size > 0)\n  $('#main').classList.toggle('hide', !sel || !bots.has(sel))\n  const tabs = $('#tabs'); tabs.innerHTML = ''\n  for (const b of bots.values()) {\n    const d = document.createElement('div')\n    d.className = 'tab' + (b.id === sel ? ' sel' : '')\n    d.innerHTML = '<span class=\"s ' + b.status + '\"></span><b></b><span class=\"mut\"></span>'\n    d.querySelector('b').textContent = b.cfg.username\n    d.querySelector('.mut').textContent = b.cfg.host\n    d.onclick = () => { sel = b.id; renderAll(); renderChat(); renderInv() }\n    tabs.appendChild(d)\n  }\n  const b = bots.get(sel)\n  if (!b) return\n  $('#title').textContent = b.cfg.username + ' — ' + b.status\n  $('#t_afk').checked = b.cfg.afk\n  $('#t_rec').checked = b.cfg.reconnect\n  const p = b.pos\n  $('#stats').innerHTML = b.status === 'online'\n    ? '❤️ <b>' + (b.health ?? '?') + '</b> &nbsp; 🍗 <b>' + (b.food ?? '?') + '</b> &nbsp; 📍 <b>' + (p ? p.x + ', ' + p.y + ', ' + p.z : '?') + '</b> &nbsp; 👥 <b>' + b.players + '</b>'\n    : '<span>Status: <b>' + b.status + '</b> — ' + b.cfg.host + ':' + b.cfg.port + '</span>'\n  const online = b.status === 'online'\n  $('#conBtn').disabled = b.status !== 'offline'\n  $('#disBtn').disabled = b.status === 'offline'\n  const key = b.id + ':' + b.viewerOn\n  if (key !== lastViewKey) {\n    lastViewKey = key\n    if (b.viewerOn) { setTimeout(() => { $('#view').src = '/view/' + b.id + '/' }, 800) }\n    else $('#view').removeAttribute('src')\n  }\n  $('#scrMsg').textContent = b.status === 'connecting' ? 'Connecting...' : online ? 'Loading view...' : 'Not connected'\n  $('#scrMsg').classList.toggle('hide', false)\n  $('#view').style.visibility = b.viewerOn ? 'visible' : 'hidden'\n  if (b.viewerOn) $('#scrMsg').textContent = 'Loading view...'\n}\n\nfunction appendLine (l) {\n  const c = $('#chat'); const d = document.createElement('div'); d.className = l.kind\n  d.textContent = new Date(l.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '  ' + l.text\n  const stick = c.scrollTop + c.clientHeight >= c.scrollHeight - 30\n  c.appendChild(d); if (stick) c.scrollTop = c.scrollHeight\n}\nfunction renderChat () { $('#chat').innerHTML = ''; (logs.get(sel) || []).forEach(appendLine); $('#chat').scrollTop = 1e9 }\nfunction renderInv () {\n  const hb = $('#hotbar'); hb.innerHTML = ''\n  for (let i = 0; i < 9; i++) { const b = document.createElement('button'); b.textContent = i + 1; b.onclick = () => socket.emit('hotbar', { id: sel, slot: i }); hb.appendChild(b) }\n  const d = invs.get(sel); const el = $('#inv'); el.innerHTML = ''\n  if (!d || !d.items.length) { el.innerHTML = '<span class=\"mut\">Empty / offline</span>'; return }\n  d.items.forEach(it => {\n    const x = document.createElement('div'); x.className = 'item' + (it.name === d.held ? ' held' : '')\n    x.innerHTML = '<span></span><span class=\"mut\"></span>'\n    x.children[0].textContent = it.display || it.name\n    x.children[1].textContent = '×' + it.count + ' ✕'\n    x.children[1].onclick = ev => { ev.stopPropagation(); socket.emit('drop', { id: sel, slot: it.slot }) }\n    x.onclick = () => socket.emit('equip', { id: sel, slot: it.slot })\n    el.appendChild(x)\n  })\n}\n\n$('#chatForm').onsubmit = ev => { ev.preventDefault(); const v = $('#chatIn').value.trim(); if (v && sel) socket.emit('chat', { id: sel, text: v }); $('#chatIn').value = '' }\n$('#conBtn').onclick = () => socket.emit('connectBot', sel)\n$('#disBtn').onclick = () => socket.emit('disconnectBot', sel)\n$('#respBtn').onclick = () => socket.emit('respawn', sel)\n$('#rmBtn').onclick = () => { if (confirm('Remove this account?')) socket.emit('remove', sel) }\n$('#stopBtn').onclick = () => { socket.emit('stop', sel); document.querySelectorAll('[data-k]').forEach(b => b.classList.remove('on')) }\n$('#t_afk').onchange = e => socket.emit('toggle', { id: sel, key: 'afk', value: e.target.checked })\n$('#t_rec').onchange = e => socket.emit('toggle', { id: sel, key: 'reconnect', value: e.target.checked })\n$('#goBtn').onclick = () => socket.emit('goto', { id: sel, x: parseFloat($('#gx').value), y: parseFloat($('#gy').value), z: parseFloat($('#gz').value) })\n$('#modeBtn').onclick = () => { clickMode = clickMode === 'left' ? 'right' : 'left'; $('#modeBtn').textContent = clickMode === 'left' ? 'Tap = Attack / Break' : 'Tap = Use / Place'; $('#modeBtn').classList.toggle('on', clickMode === 'right') }\n\n// movement buttons\ndocument.querySelectorAll('[data-k]').forEach(btn => {\n  const k = btn.dataset.k, toggle = btn.dataset.t\n  const send = s => socket.emit('control', { id: sel, key: k, state: s })\n  if (toggle) { btn.onclick = () => { const s = !btn.classList.contains('on'); btn.classList.toggle('on', s); send(s) } }\n  else {\n    const down = e => { e.preventDefault(); btn.classList.add('on'); send(true) }\n    const up = e => { e.preventDefault(); btn.classList.remove('on'); send(false) }\n    btn.addEventListener('pointerdown', down); btn.addEventListener('pointerup', up); btn.addEventListener('pointerleave', up); btn.addEventListener('pointercancel', up)\n  }\n})\n// keyboard\nconst KEYS = { w: 'forward', s: 'back', a: 'left', d: 'right', ' ': 'jump', shift: 'sneak', control: 'sprint' }\nfunction kb (e, s) {\n  if (/INPUT|TEXTAREA/.test(document.activeElement.tagName) || !sel) return\n  const k = KEYS[e.key.toLowerCase()]; if (k) { e.preventDefault(); socket.emit('control', { id: sel, key: k, state: s }) }\n  if (s && /^[1-9]$/.test(e.key)) socket.emit('hotbar', { id: sel, slot: +e.key - 1 })\n}\naddEventListener('keydown', e => { if (!e.repeat) kb(e, true) })\naddEventListener('keyup', e => kb(e, false))\n\n// screen: click to aim+act, drag to look\nconst ov = $('#ov')\nlet drag = null\nov.addEventListener('contextmenu', e => e.preventDefault())\nov.addEventListener('pointerdown', e => {\n  ov.setPointerCapture(e.pointerId)\n  drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: Date.now(), moved: false, btn: e.button, last: 0 }\n  drag.lp = setTimeout(() => { if (drag && !drag.moved) { drag.long = true; if (navigator.vibrate) navigator.vibrate(30); clickAt(drag.sx, drag.sy, 'right') } }, 550)\n})\nov.addEventListener('pointermove', e => {\n  if (!drag) return\n  const dx = e.clientX - drag.x, dy = e.clientY - drag.y\n  if (!drag.moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 8) { drag.moved = true; clearTimeout(drag.lp) }\n  if (drag.moved && Date.now() - drag.last > 40) {\n    socket.emit('look', { id: sel, dyaw: -dx * 0.006, dpitch: -dy * 0.006 })\n    drag.x = e.clientX; drag.y = e.clientY; drag.last = Date.now()\n  }\n})\nov.addEventListener('pointerup', e => {\n  if (!drag) return\n  clearTimeout(drag.lp)\n  if (!drag.moved && !drag.long) clickAt(e.clientX, e.clientY, drag.btn === 2 ? 'right' : clickMode)\n  drag = null\n})\nfunction clickAt (cx, cy, button) {\n  if (!sel) return\n  const r = ov.getBoundingClientRect()\n  socket.emit('click', { id: sel, button, nx: ((cx - r.left) / r.width) * 2 - 1, ny: 1 - ((cy - r.top) / r.height) * 2, aspect: r.width / r.height })\n}\nrenderInv()\nif ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {})\n</script>\n</body>\n</html>\n"
;(function () {
  const fs = require('fs'), path = require('path'), cp = require('child_process')
  const need = ['mineflayer', 'prismarine-viewer', 'mineflayer-pathfinder', 'express', 'socket.io', 'vec3', 'http-proxy']
  const missing = need.filter(m => !fs.existsSync(path.join(__dirname, 'node_modules', m)))
  if (missing.length) {
    console.log('First run: installing dependencies (1-3 min)...')
    const r = cp.spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install', '--prefix', __dirname, '--no-audit', '--no-fund', '--ignore-scripts', ...need], { stdio: 'inherit', cwd: __dirname })
    if (r.status !== 0) { console.log('npm install failed. Make sure Node.js 18+ is installed (Termux: pkg install nodejs).'); process.exit(1) }
  }
  // The live viewer only needs 'canvas' on the server for headless rendering, which we don't use.
  // The real module needs native build tools (fails on Android), so provide a harmless stub if it can't load.
  try { require(path.join(__dirname, 'node_modules', 'canvas')) } catch (e) {
    const d = path.join(__dirname, 'node_modules', 'canvas')
    fs.mkdirSync(d, { recursive: true })
    fs.writeFileSync(path.join(d, 'package.json'), '{"name":"canvas","version":"0.0.0-stub","main":"index.js"}')
    fs.writeFileSync(path.join(d, 'index.js'), 'class C{getContext(){return new Proxy({},{get:()=>()=>({})})}};module.exports={createCanvas:()=>new C(),Canvas:C,Image:class{}}')
  }
})()
// AFK Bot Panel - server (mineflayer + prismarine-viewer + socket.io)
const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const { Server } = require('socket.io')
const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const { Vec3 } = require('vec3')
const crypto = require('crypto')
const httpProxy = require('http-proxy')

let mineflayerViewer = null
try { mineflayerViewer = require('prismarine-viewer').mineflayer } catch (e) { console.log('Viewer unavailable:', e.message) }

const PORT = +process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'
const VIEW_BASE = +process.env.VIEW_BASE || 3100
const DATA_FILE = path.join(__dirname, 'bots.json')
const HTML = __HTML__

const app = express()
const server = http.createServer(app)
const io = new Server(server, { destroyUpgrade: false })

// ---------- password login (needed when hosted online) ----------
const LOCAL = ['127.0.0.1', 'localhost'].includes(HOST)
let PASSWORD = process.env.PASSWORD || ''
let generated = false
if (!PASSWORD && !LOCAL) {
  const pf = path.join(__dirname, 'auth.json')
  try { PASSWORD = JSON.parse(fs.readFileSync(pf, 'utf8')).password } catch (e) {}
  if (!PASSWORD) { PASSWORD = crypto.randomBytes(5).toString('hex'); try { fs.writeFileSync(pf, JSON.stringify({ password: PASSWORD })) } catch (e) {} }
  generated = true
}
const SECRET = crypto.createHash('sha256').update('afk-panel:' + PASSWORD).digest('hex')
function getCookie (req, n) { const m = (req.headers.cookie || '').match(new RegExp('(?:^|; )' + n + '=([^;]*)')); return m ? m[1] : '' }
function authed (req) {
  if (!PASSWORD) return true
  const c = getCookie(req, 'afk')
  return c.length === SECRET.length && crypto.timingSafeEqual(Buffer.from(c), Buffer.from(SECRET))
}
function loginPage (err) {
  return '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>AFK Bot Panel</title><style>body{margin:0;background:#0f1115;color:#e8ebf2;font:16px system-ui;display:flex;min-height:100vh;align-items:center;justify-content:center}form{background:#181b22;border:1px solid #2c3140;border-radius:14px;padding:24px;width:min(340px,90vw);display:grid;gap:12px}input,button{font:inherit;padding:11px;border-radius:8px;border:1px solid #2c3140;background:#20242e;color:inherit}button{background:#7c5cff;border-color:#7c5cff;font-weight:600}.e{color:#ff5c6c;font-size:13px}</style><form method="post" action="/login"><b>⛏️ AFK Bot Panel</b>' + (err ? '<div class="e">' + err + '</div>' : '') + '<input type="password" name="password" placeholder="Password" autofocus><button>Log in</button></form>'
}
const ICON192 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAB9UlEQVR42u3dsQ3CMBBA0Qtik6wBVIwRUbEBJWkp2YCKKZCgghkoU1AxhpkhSEYOfm8AiBx9XXNymr5LKaBSM0eAAEAAIAAQAAgABAACAAGAAEAAIAAQAAgABAACAAGAAEAAIAAQAAgABABlmef+g/Nt6ZT52mb9MAFAACAAEAAIAAQAAgABgABAACAAiDJ2gcbaDjtv5Y+d2qMJAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAIAAQAAgABgABAABC+EfZb1/fTW8EEAAGAAEAAIAAQAAgABAACAAGAACCmvwuU273dZ/391XDw/CYACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAQ7gWKKu69qe3eHhMABAACAAGAAEAAIAAQAAgABAACgLALFNP4JlfYHTIBQAAgABAACAAEAAIAAYAAQAAgAAi7QGGXBhMABAACAAGAAEAAIAAQAAgABAACAAGAABAACAAEAAIAAYAAQAAgABAACADCvUA5vRYXbwUTAAQAAgABgABAACAAEAAIAAQAAoDxmr5LyTFgAoAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAEX4AKp5H2cWL2YyAAAAAElFTkSuQmCC', 'base64')
const ICON512 = Buffer.from('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', 'base64')
app.use(express.urlencoded({ extended: false }))
app.get('/manifest.json', (req, res) => res.json({ name: 'AFK Bot Panel', short_name: 'AFK Bots', start_url: '/', display: 'standalone', background_color: '#0f1115', theme_color: '#0f1115', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }] }))
app.get('/icon-192.png', (req, res) => res.type('png').send(ICON192))
app.get('/icon-512.png', (req, res) => res.type('png').send(ICON512))
app.get('/sw.js', (req, res) => res.type('js').send("self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('fetch',()=>{});"))
app.post('/login', (req, res) => {
  setTimeout(() => {
    const ok = !PASSWORD || (typeof req.body.password === 'string' && crypto.createHash('sha256').update(req.body.password).digest('hex') === crypto.createHash('sha256').update(PASSWORD).digest('hex'))
    if (!ok) return res.status(401).type('html').send(loginPage('Wrong password'))
    const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : ''
    res.setHeader('Set-Cookie', 'afk=' + SECRET + '; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000' + secure)
    res.redirect('/')
  }, 700)
})
app.use((req, res, next) => {
  if (authed(req)) return next()
  if (req.method === 'GET' && req.path === '/') return res.type('html').send(loginPage())
  res.status(401).end('Unauthorized')
})
io.use((socket, next) => authed(socket.request) ? next() : next(new Error('unauthorized')))
app.get('/', (req, res) => res.type('html').send(HTML))

// ---------- live view proxy: everything goes through ONE port ----------
const proxy = httpProxy.createProxyServer({ ws: true })
proxy.on('error', (err, req, res) => { try { if (res && res.writeHead) { res.writeHead(502); res.end('viewer not ready') } else if (res && res.destroy) res.destroy() } catch (e) {} })
function viewerTarget (url) {
  const m = url.match(/^\/view\/(\d+)\//)
  const e = m && bots.get(+m[1])
  return e && e.viewerOn ? 'http://127.0.0.1:' + e.viewerPort : null
}
app.use('/view', (req, res) => {
  req.url = req.originalUrl
  const t = viewerTarget(req.url)
  if (!t) return res.status(503).end('Viewer not ready')
  proxy.web(req, res, { target: t })
})
server.on('upgrade', (req, socket, head) => {
  if (!req.url.startsWith('/view/')) return
  const t = authed(req) && viewerTarget(req.url)
  if (!t) return socket.destroy()
  proxy.ws(req, socket, head, { target: t })
})

const bots = new Map() // id -> entry
let nextId = 1

const FACES = [new Vec3(0, -1, 0), new Vec3(0, 1, 0), new Vec3(0, 0, -1), new Vec3(0, 0, 1), new Vec3(-1, 0, 0), new Vec3(1, 0, 0)]

function save () {
  const list = [...bots.values()].map(e => e.cfg)
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2)) } catch (e) {}
}

function pub (e) {
  const b = e.bot
  const ent = b && b.entity
  return {
    id: e.id,
    cfg: { ...e.cfg, password: e.cfg.password ? '***' : '' },
    status: e.status,
    viewerPort: e.viewerPort,
    viewerOn: !!e.viewerOn,
    health: b && b.health != null ? Math.round(b.health) : null,
    food: b && b.food != null ? b.food : null,
    pos: ent ? { x: +ent.position.x.toFixed(1), y: +ent.position.y.toFixed(1), z: +ent.position.z.toFixed(1) } : null,
    players: b && b.players ? Object.keys(b.players).length : 0
  }
}

function emitBot (e) { io.emit('bot', pub(e)) }
function log (e, text, kind = 'sys') {
  const line = { t: Date.now(), text: String(text), kind }
  e.log.push(line)
  if (e.log.length > 300) e.log.shift()
  io.emit('log', { id: e.id, line })
}

function invList (b) {
  return b.inventory.slots.map((it, slot) => it ? { slot, name: it.name, display: it.displayName, count: it.count } : null).filter(Boolean)
}

function addEntry (cfg) {
  const id = nextId++
  const e = {
    id,
    cfg: Object.assign({ username: 'Bot', host: 'localhost', port: 25565, version: '', password: '', afk: true, reconnect: true, auto: false }, cfg),
    bot: null, status: 'offline', log: [], viewerPort: VIEW_BASE + id, viewerOn: false,
    afkTimer: null, reconnectTimer: null, statTimer: null, manualStop: false
  }
  bots.set(id, e)
  return e
}

function startAfk (e) {
  clearInterval(e.afkTimer)
  if (!e.cfg.afk) return
  e.afkTimer = setInterval(() => {
    const b = e.bot
    if (!b || !b.entity || e.status !== 'online') return
    const r = Math.random()
    try {
      if (r < 0.4) { b.setControlState('jump', true); setTimeout(() => b.setControlState('jump', false), 300) }
      else if (r < 0.7) b.look(b.entity.yaw + (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 0.6, false)
      else { b.swingArm('right') }
    } catch (err) {}
  }, 15000 + Math.random() * 10000)
}

function connect (e) {
  if (e.bot) return
  e.manualStop = false; e.cfg.auto = true; save()
  clearTimeout(e.reconnectTimer)
  e.status = 'connecting'
  emitBot(e)
  log(e, `Connecting ${e.cfg.username} -> ${e.cfg.host}:${e.cfg.port} ...`)

  const opts = { host: e.cfg.host, port: +e.cfg.port || 25565, username: e.cfg.username, auth: 'offline', hideErrors: true }
  if (e.cfg.version) opts.version = e.cfg.version
  let bot
  try { bot = mineflayer.createBot(opts) } catch (err) { log(e, 'Failed: ' + err.message, 'err'); e.status = 'offline'; emitBot(e); return }
  e.bot = bot
  bot.loadPlugin(pathfinder)

  bot.once('spawn', () => {
    e.status = 'online'
    log(e, `Spawned (Minecraft ${bot.version})`)
    if (mineflayerViewer && !e.viewerOn) {
      try {
        mineflayerViewer(bot, { port: e.viewerPort, prefix: '/view/' + e.id, firstPerson: true, viewDistance: 4 })
        e.viewerOn = true
      } catch (err) { log(e, 'Viewer error: ' + err.message, 'err') }
    }
    startAfk(e)
    clearInterval(e.statTimer)
    e.statTimer = setInterval(() => { if (e.status === 'online') { emitBot(e); io.emit('inv', { id: e.id, items: invList(bot), held: bot.heldItem ? bot.heldItem.name : null }) } }, 2000)
    emitBot(e)
  })

  // Cracked servers with AuthMe-style plugins
  bot.on('messagestr', (msg, pos) => {
    if (pos === 'game_info') return
    log(e, msg, 'chat')
    const pw = e.cfg.password
    if (!pw) return
    const m = msg.toLowerCase()
    if (m.includes('/register')) setTimeout(() => bot.chat(`/register ${pw} ${pw}`), 800)
    else if (m.includes('/login') || m.includes('please login') || m.includes('please log in')) setTimeout(() => bot.chat(`/login ${pw}`), 800)
  })
  bot.on('health', () => emitBot(e))
  bot.on('death', () => log(e, 'Died', 'err'))
  bot.on('kicked', r => log(e, 'Kicked: ' + (typeof r === 'string' ? r : JSON.stringify(r)), 'err'))
  bot.on('error', err => log(e, 'Error: ' + (err.message || err), 'err'))
  bot.on('end', reason => {
    clearInterval(e.afkTimer); clearInterval(e.statTimer)
    try { if (bot.viewer && bot.viewer.close) bot.viewer.close() } catch (err) {}
    e.viewerOn = false
    e.bot = null
    e.status = 'offline'
    log(e, 'Disconnected: ' + reason)
    emitBot(e)
    if (e.cfg.reconnect && !e.manualStop) {
      log(e, 'Reconnecting in 10s...')
      e.reconnectTimer = setTimeout(() => connect(e), 10000)
    }
  })
}

function disconnect (e) {
  e.manualStop = true; e.cfg.auto = false; save()
  clearTimeout(e.reconnectTimer)
  if (e.bot) { try { e.bot.quit() } catch (err) {} }
  else { e.status = 'offline'; emitBot(e) }
}

function yawPitchFromClick (b, nx, ny, aspect) {
  // nx, ny in [-1,1] (right/up positive). Viewer vertical FOV is 75 degrees.
  const tanV = Math.tan((75 / 2) * Math.PI / 180)
  const x = nx * tanV * aspect
  const y = ny * tanV
  const yawOff = -Math.atan(x)
  const pitchOff = Math.atan(y / Math.sqrt(1 + x * x))
  return { yaw: b.entity.yaw + yawOff, pitch: Math.max(-1.5, Math.min(1.5, b.entity.pitch + pitchOff)) }
}

async function doClick (e, d) {
  const b = e.bot
  if (!b || !b.entity) return
  if (typeof d.nx === 'number') {
    const t = yawPitchFromClick(b, d.nx, d.ny, d.aspect || 1.6)
    await b.look(t.yaw, t.pitch, true)
  }
  const ent = b.entityAtCursor(4)
  const blk = b.blockAtCursor(5)
  if (d.button === 'left') {
    if (ent) { b.attack(ent); log(e, `Attacked ${ent.name || ent.username}`) }
    else if (blk) {
      log(e, `Breaking ${blk.name}`)
      try { await b.dig(blk, true) } catch (err) { log(e, 'Dig stopped: ' + err.message, 'err') }
    } else b.swingArm('right')
  } else {
    if (ent) { try { await b.activateEntity(ent) } catch (err) {} log(e, `Used on ${ent.name || ent.username}`) }
    else if (blk) {
      const held = b.heldItem
      const isBlockItem = held && b.registry.blocksByName[held.name]
      const interactive = /chest|door|button|lever|table|furnace|anvil|barrel|shulker|bed|gate|trapdoor|hopper|dispenser|dropper|sign|loom|smoker|blast|cartography|grindstone|stonecutter|enchanting|brewing|note|repeater|comparator|beacon/.test(blk.name)
      if (isBlockItem && !interactive) {
        try { await b.placeBlock(blk, FACES[blk.face != null ? blk.face : 1]); log(e, `Placed ${held.name}`) } catch (err) { log(e, 'Place failed: ' + err.message, 'err') }
      } else { try { await b.activateBlock(blk); log(e, `Used ${blk.name}`) } catch (err) { log(e, 'Use failed: ' + err.message, 'err') } }
    } else { b.activateItem(); log(e, 'Used held item') }
  }
}

io.on('connection', socket => {
  socket.emit('init', { bots: [...bots.values()].map(pub), logs: [...bots.values()].map(e => ({ id: e.id, lines: e.log.slice(-80) })) })

  socket.on('add', cfg => {
    if (!cfg || !cfg.username) return
    const name = String(cfg.username).trim().slice(0, 16)
    if (!/^[A-Za-z0-9_]{1,16}$/.test(name)) return socket.emit('toast', 'Username must be 1-16 letters, numbers or _')
    const e = addEntry({ username: name, host: String(cfg.host || 'localhost').trim(), port: +cfg.port || 25565, version: String(cfg.version || '').trim(), password: cfg.password || '', afk: cfg.afk !== false, reconnect: cfg.reconnect !== false, auto: true })
    save(); emitBot(e); connect(e)
  })
  socket.on('connectBot', id => { const e = bots.get(id); if (e) connect(e) })
  socket.on('disconnectBot', id => { const e = bots.get(id); if (e) disconnect(e) })
  socket.on('remove', id => { const e = bots.get(id); if (!e) return; disconnect(e); bots.delete(id); save(); io.emit('removed', id) })
  socket.on('toggle', ({ id, key, value }) => {
    const e = bots.get(id); if (!e || !['afk', 'reconnect'].includes(key)) return
    e.cfg[key] = !!value; save()
    if (key === 'afk') { if (value) startAfk(e); else clearInterval(e.afkTimer) }
    emitBot(e)
  })
  socket.on('chat', ({ id, text }) => { const e = bots.get(id); if (e && e.bot && text) { e.bot.chat(String(text).slice(0, 256)); log(e, '> ' + text, 'me') } })
  socket.on('control', ({ id, key, state }) => {
    const e = bots.get(id); if (!e || !e.bot || !e.bot.entity) return
    if (['forward', 'back', 'left', 'right', 'jump', 'sprint', 'sneak'].includes(key)) e.bot.setControlState(key, !!state)
  })
  socket.on('stop', id => { const e = bots.get(id); if (e && e.bot) { e.bot.clearControlStates(); try { e.bot.pathfinder.setGoal(null) } catch (err) {} } })
  socket.on('look', ({ id, dyaw, dpitch }) => {
    const e = bots.get(id); if (!e || !e.bot || !e.bot.entity) return
    const b = e.bot
    b.look(b.entity.yaw + dyaw, Math.max(-1.5, Math.min(1.5, b.entity.pitch + dpitch)), true)
  })
  socket.on('click', d => { const e = bots.get(d.id); if (e) doClick(e, d).catch(err => log(e, 'Click error: ' + err.message, 'err')) })
  socket.on('hotbar', ({ id, slot }) => { const e = bots.get(id); if (e && e.bot) e.bot.setQuickBarSlot(Math.max(0, Math.min(8, slot | 0))) })
  socket.on('equip', async ({ id, slot }) => {
    const e = bots.get(id); if (!e || !e.bot) return
    const it = e.bot.inventory.slots[slot]; if (it) { try { await e.bot.equip(it, 'hand') } catch (err) { log(e, 'Equip failed: ' + err.message, 'err') } }
  })
  socket.on('drop', async ({ id, slot }) => {
    const e = bots.get(id); if (!e || !e.bot) return
    const it = e.bot.inventory.slots[slot]; if (it) { try { await e.bot.tossStack(it) } catch (err) { log(e, 'Drop failed: ' + err.message, 'err') } }
  })
  socket.on('goto', ({ id, x, y, z }) => {
    const e = bots.get(id); if (!e || !e.bot || !e.bot.entity) return
    if ([x, y, z].some(v => typeof v !== 'number' || isNaN(v))) return
    const b = e.bot
    b.pathfinder.setMovements(new Movements(b))
    b.pathfinder.setGoal(new goals.GoalBlock(Math.floor(x), Math.floor(y), Math.floor(z)))
    log(e, `Walking to ${x} ${y} ${z}`)
  })
  socket.on('respawn', id => { const e = bots.get(id); if (e && e.bot) { try { e.bot.respawn() } catch (err) {} } })
})

// load saved bots
try {
  const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  for (const c of saved) { const e = addEntry(c); if (c.auto) connect(e) }
} catch (e) {}

server.listen(PORT, HOST, () => {
  console.log(`\n  AFK Bot Panel running -> http://localhost:${PORT}`)
  if (PASSWORD) console.log(`  Login password: ${process.env.PASSWORD ? '(the PASSWORD you set)' : PASSWORD}`)
  console.log('')
})

process.on('uncaughtException', err => console.log('Uncaught:', err.message))
process.on('unhandledRejection', err => console.log('Unhandled:', err && err.message))