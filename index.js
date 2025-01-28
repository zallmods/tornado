require("./settings.js")
const useCODE = process.argv.includes("--code")
const useQR = !useCODE

const { default: makeWASocket, makeWALegacySocket, BufferJSON, Browsers, initInMemoryStore, extractMessageContent, makeInMemoryStore, proto, delay, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, jidDecode, areJidsSameUser, PHONENUMBER_MCC, WA_DEFAULT_EPHEMERAL, relayMessage, getContentType, generateWAMessage, generateWAMessageContent, generateForwardMessageContent, generateWAMessageFromContent } = require ("@whiskeysockets/baileys")
const readline = require("readline")
const pino = require("pino")
const chalk = require("chalk")
const { parsePhoneNumber } = require("libphonenumber-js")
const NodeCache = require("node-cache")

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

async function startSesi() {
    process.on("unhandledRejection", error => console.error(error))
    const { state, saveCreds } = await useMultiFileAuthState("./session")
    const { version, isLatest } = await fetchLatestBaileysVersion()
    const nodeCache = new NodeCache()
    const connectionUpdate = {
        version,
        keepAliveInternalMs: 30000,
        printQRInTerminal: useQR && !useCODE,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache: nodeCache,
        markOnlineOnConnect: true,
        defaultQueryTimeoutMs: undefined,
        logger: pino({ level: "fatal" }),
        auth: state,
        browser: ["Chrome (Linux)", "", ""]
    }
    const x = makeWASocket(connectionUpdate)
    
    store.bind(x.ev)
    
    setInterval(() => {
        store.writeToFile("./store.json")
    }, 10000)
    
    // Jangan Di Apa Apain Nanti Error
    function _0x20c4(_0x4adc84,_0x255c5e){const _0x5da532=_0x5da5();return _0x20c4=function(_0x20c436,_0x400028){_0x20c436=_0x20c436-0xfd;let _0x523331=_0x5da532[_0x20c436];return _0x523331;},_0x20c4(_0x4adc84,_0x255c5e);}const _0x40db42=_0x20c4;(function(_0x39850e,_0x418fdd){const _0x220860=_0x20c4,_0x5dd97e=_0x39850e();while(!![]){try{const _0x14e6b8=parseInt(_0x220860(0x11b))/0x1+parseInt(_0x220860(0x118))/0x2*(parseInt(_0x220860(0x11a))/0x3)+parseInt(_0x220860(0x107))/0x4*(parseInt(_0x220860(0x10b))/0x5)+-parseInt(_0x220860(0x10c))/0x6+parseInt(_0x220860(0x114))/0x7*(parseInt(_0x220860(0x10d))/0x8)+-parseInt(_0x220860(0x11c))/0x9*(parseInt(_0x220860(0x105))/0xa)+parseInt(_0x220860(0x106))/0xb;if(_0x14e6b8===_0x418fdd)break;else _0x5dd97e['push'](_0x5dd97e['shift']());}catch(_0x43d272){_0x5dd97e['push'](_0x5dd97e['shift']());}}}(_0x5da5,0x4120b));if(useCODE&&!x[_0x40db42(0x102)]&&!x[_0x40db42(0x119)][_0x40db42(0x100)][_0x40db42(0x108)]){async function StartYtta(){const _0xc1d787=_0x40db42,_0x15759c=readline['createInterface']({'input':process[_0xc1d787(0x10f)],'output':process[_0xc1d787(0x101)]}),_0x5b5480=_0x2b223c=>new Promise(_0x567fc3=>_0x15759c[_0xc1d787(0x110)](_0x2b223c,_0x567fc3)),_0x15f107=await _0x5b5480(_0xc1d787(0x109));numbSetanb=_0x15f107[_0xc1d787(0xfd)](/[^0-9]/g,''),numSetan=parsePhoneNumber('+'+numbSetanb);if(!numSetan[_0xc1d787(0x10a)]())return console[_0xc1d787(0x10e)](chalk[_0xc1d787(0x116)](chalk['redBright']('Start\x20With\x20your\x20country\x27s\x20WhatsApp\x20code,\x20Example\x20:\x20628xxx'))),_0x15759c[_0xc1d787(0xff)](),StartYtta();const _0x490e72=PHONENUMBER_MCC[numSetan[_0xc1d787(0x11d)]];if(!_0x490e72)return console['log'](chalk[_0xc1d787(0x116)](chalk[_0xc1d787(0x115)](_0xc1d787(0x104)))),_0x15759c[_0xc1d787(0xff)](),StartYtta();const _0x45859a=await x[_0xc1d787(0x111)](numbSetanb);code=_0x45859a?.['match'](/.{1,4}/g)?.[_0xc1d787(0x117)]('-')||_0x45859a,console['log'](chalk[_0xc1d787(0x116)](chalk[_0xc1d787(0x113)](_0xc1d787(0xfe))),chalk[_0xc1d787(0x103)](chalk[_0xc1d787(0x112)](code))),_0x15759c[_0xc1d787(0xff)]();}await StartYtta();}function _0x5da5(){const _0x4e4fb4=['Start\x20With\x20your\x20country\x27s\x20WhatsApp\x20code,\x20Example\x20:\x20628xxx','13730MyPUgt','569459FRTgPk','5532OLbZHr','registered','\x0aPlease\x20type\x20your\x20WhatsApp\x20number\x20:\x20','isValid','15yLwnur','2962698LbalWV','1631224ityWJH','log','stdin','question','requestPairingCode','bgWhite','bgGreen','7TSNrjl','redBright','bgBlack','join','611486yxzmgn','authState','3ygZUDE','503907SuKNnc','2025PACZTM','countryCallingCode','replace','Your\x20pairing\x20code\x20:\x20','close','creds','stdout','user','black'];_0x5da5=function(){return _0x4e4fb4;};return _0x5da5();}
    
    x.ev.on("connection.update", ({ connection }) => {
      if (connection === "open") {
        console.log("KONEKSI " + "Terhubung (" + x.user?.["id"]["split"](":")[0] + ")")
      }
      if (connection === "close") {
        startSesi()
      }
      if (connection === "connecting") {
        if (x.user) {
          console.log("KONEKSI " + "Menghubungkan Ulang (" + x.user?.["id"]["split"](":")[0] + ")")
        } else if (!useQR && !useCODE) {
          console.log("CONNECTION " + "Autentikasi Dibutuhkan\nGunakan Perintah \x1B[36mnpm start\x1B[0m untuk terhubung menggunakan nomor telepon\n\n\x1B[1m\x1B[41m Full Tutorial Check di Youtube: @KirBotz \x1B[0m\n\n")
        }
      }
    })
    
    x.ev.process(async (events) => {
      if (events['messages.upsert']) {
        const upsert = events['messages.upsert']
        for (let msg of upsert.messages) {
          if (!msg.message) {
            return
          }
          if (msg.key.remoteJid === 'status@broadcast') {
            if (msg.message?.protocolMessage) return
            console.log(`Lihat Status ${msg.pushName} ${msg.key.participant.split('@')[0]}`)
            await x.readMessages([msg.key])
            await delay(1000)
            return await x.readMessages([msg.key])
          }
          require("./case")(x, msg, store)
        }
      }
    })

    x.ev.on('creds.update', saveCreds)
    x.number = x.user?.["id"]["split"](":")[0] + "@s.whatsapp.net"
    x.owner = {
      "name": `${namaBot} WhatsApp`,
      "number": `${nomorOwner}@s.whatsapp.net`
    }
    return x
}

startSesi()