/**
 * Downloads VTM GO show images from persgroep CDN into public/shows/
 * Run before `next build` so static export can reference local images.
 */
import { createWriteStream, mkdirSync, existsSync } from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "shows");

mkdirSync(OUT_DIR, { recursive: true });

const IMAGES = {
  "the-voice-thumb": "https://images4.persgroep.net/rcs/HUiNzd50PDpbiH73pino_dVQJsg/diocontent/268968071/_fitwidth/426",
  "the-voice-banner": "https://images4.persgroep.net/rcs/HUiNzd50PDpbiH73pino_dVQJsg/diocontent/268968071/_fitwidth/1400",
  "boho-thumb": "https://images3.persgroep.net/rcs/Fdc1LAyocmQryhSqPCAPP_Vt4Yk/diocontent/269872633/_fitwidth/426",
  "boho-banner": "https://images3.persgroep.net/rcs/Fdc1LAyocmQryhSqPCAPP_Vt4Yk/diocontent/269872633/_fitwidth/1400",
  "expeditie-gooris-thumb": "https://images3.persgroep.net/rcs/Vbf1Fb41JWCQl5VkRVRFltb8CwU/diocontent/269090368/_fitwidth/426",
  "expeditie-gooris-banner": "https://images3.persgroep.net/rcs/Vbf1Fb41JWCQl5VkRVRFltb8CwU/diocontent/269090368/_fitwidth/1400",
  "zoo-thumb": "https://images4.persgroep.net/rcs/IOnhFVwnOQhpFxaM0HfycqmpnW0/diocontent/269256948/_fitwidth/426",
  "zoo-banner": "https://images4.persgroep.net/rcs/IOnhFVwnOQhpFxaM0HfycqmpnW0/diocontent/269256948/_fitwidth/1400",
  "moordzaken-thumb": "https://images4.persgroep.net/rcs/Ft7x7ppm4nMRudbZIKj83inL6H8/diocontent/261558844/_fitwidth/426",
  "moordzaken-banner": "https://images4.persgroep.net/rcs/Ft7x7ppm4nMRudbZIKj83inL6H8/diocontent/261558844/_fitwidth/1400",
  "de-box-thumb": "https://images0.persgroep.net/rcs/yta9efEOE_erfJppKvXKzqAI3uw/diocontent/269078029/_fitwidth/426",
  "de-box-banner": "https://images0.persgroep.net/rcs/yta9efEOE_erfJppKvXKzqAI3uw/diocontent/269078029/_fitwidth/1400",
  "datenight-thumb": "https://images2.persgroep.net/rcs/NSd_UySbDxK-eHmhZLo7oGQiuRo/diocontent/270675842/_fitwidth/426",
  "datenight-banner": "https://images2.persgroep.net/rcs/NSd_UySbDxK-eHmhZLo7oGQiuRo/diocontent/270675842/_fitwidth/1400",
  "de-muttis-thumb": "https://images2.persgroep.net/rcs/YzFt5YmRwJpp-2C1MFLvZzzjMmg/diocontent/268103919/_fitwidth/426",
  "de-muttis-banner": "https://images2.persgroep.net/rcs/YzFt5YmRwJpp-2C1MFLvZzzjMmg/diocontent/268103919/_fitwidth/1400",
  "gooische-vrouwen-thumb": "https://images2.persgroep.net/rcs/zpwMtKj57FCFFBMmZ8Za6XIO17s/diocontent/268837097/_fitwidth/426",
  "gooische-vrouwen-banner": "https://images2.persgroep.net/rcs/zpwMtKj57FCFFBMmZ8Za6XIO17s/diocontent/268837097/_fitwidth/1400",
  "familie-thumb": "https://images2.persgroep.net/rcs/_FbT7hoDekSrSXV6nnNwqvD9Sq4/diocontent/268388758/_fitwidth/426",
  "familie-banner": "https://images2.persgroep.net/rcs/_FbT7hoDekSrSXV6nnNwqvD9Sq4/diocontent/268388758/_fitwidth/1400",
  "alter-ego-thumb": "https://images1.persgroep.net/rcs/i-Nz_ic--VO7AckG28NutegRNOo/diocontent/237603247/_fitwidth/426",
  "alter-ego-banner": "https://images1.persgroep.net/rcs/i-Nz_ic--VO7AckG28NutegRNOo/diocontent/237603247/_fitwidth/1400",
  "verliefd-thumb": "https://images0.persgroep.net/rcs/YRZkTXhbp7LqhGdwUBZehodrHpk/diocontent/247674621/_fitwidth/426",
  "verliefd-banner": "https://images0.persgroep.net/rcs/YRZkTXhbp7LqhGdwUBZehodrHpk/diocontent/247674621/_fitwidth/1400",
  "tracker-thumb": "https://images2.persgroep.net/rcs/UDxM5Sy4F-YAR0E6DT0J0filz1c/diocontent/268673979/_fitwidth/426",
  "tracker-banner": "https://images2.persgroep.net/rcs/UDxM5Sy4F-YAR0E6DT0J0filz1c/diocontent/268673979/_fitwidth/1400",
  "couple-next-door-thumb": "https://images4.persgroep.net/rcs/9O_lcbmWMPe-8PS5vdR-msI6rgc/diocontent/269817420/_fitwidth/426",
  "couple-next-door-banner": "https://images4.persgroep.net/rcs/9O_lcbmWMPe-8PS5vdR-msI6rgc/diocontent/269817420/_fitwidth/1400",
  "love-island-thumb": "https://images2.persgroep.net/rcs/MOye-p7c6DTyzEzUDD4RyS1OLkM/diocontent/270120589/_fitwidth/426",
  "love-island-banner": "https://images2.persgroep.net/rcs/MOye-p7c6DTyzEzUDD4RyS1OLkM/diocontent/270120589/_fitwidth/1400",
  "florentina-thumb": "https://images1.persgroep.net/rcs/JWJiZz6St-kO6rMPMTxBfphxb_w/diocontent/266619074/_fitwidth/426",
  "florentina-banner": "https://images1.persgroep.net/rcs/JWJiZz6St-kO6rMPMTxBfphxb_w/diocontent/266619074/_fitwidth/1400",
  "huis-gemaakt-thumb": "https://images0.persgroep.net/rcs/YPN_1rTzxwtNNQt3ZGmI7tYVN24/diocontent/270039178/_fitwidth/426",
  "huis-gemaakt-banner": "https://images0.persgroep.net/rcs/YPN_1rTzxwtNNQt3ZGmI7tYVN24/diocontent/270039178/_fitwidth/1400",
  "hamnet-thumb": "https://images3.persgroep.net/rcs/lJG0FJis9TK_hRUw7TBpkxl6Ed0/diocontent/270374156/_fitwidth/426",
  "hamnet-banner": "https://images3.persgroep.net/rcs/lJG0FJis9TK_hRUw7TBpkxl6Ed0/diocontent/270374156/_fitwidth/1400",
  "spider-man-thumb": "https://images0.persgroep.net/rcs/zlcC7f_XEnTmx_9hkDjXP9C6DI0/diocontent/259358566/_fitwidth/426",
  "spider-man-banner": "https://images0.persgroep.net/rcs/zlcC7f_XEnTmx_9hkDjXP9C6DI0/diocontent/259358566/_fitwidth/1400",
  "spider-man-2-thumb": "https://images4.persgroep.net/rcs/M1YHOBk3VTYhcxzCpOQoalEC3xo/diocontent/252790014/_fitwidth/426",
  "spider-man-2-banner": "https://images4.persgroep.net/rcs/M1YHOBk3VTYhcxzCpOQoalEC3xo/diocontent/252790014/_fitwidth/1400",
  "spider-man-3-thumb": "https://images1.persgroep.net/rcs/wq9ytAd0VrW34qNsKh49dqszHf0/diocontent/247128052/_fitwidth/426",
  "spider-man-3-banner": "https://images1.persgroep.net/rcs/wq9ytAd0VrW34qNsKh49dqszHf0/diocontent/247128052/_fitwidth/1400",
  "king-of-thieves-thumb": "https://images4.persgroep.net/rcs/WPHcqm8vzSnpdApE88bwAyFGXt4/diocontent/253162122/_fitwidth/426",
  "king-of-thieves-banner": "https://images4.persgroep.net/rcs/WPHcqm8vzSnpdApE88bwAyFGXt4/diocontent/253162122/_fitwidth/1400",
  "swordfish-thumb": "https://images4.persgroep.net/rcs/3v-nPo83vBI7y571hllRXVcXdKg/diocontent/247795775/_fitwidth/426",
  "swordfish-banner": "https://images4.persgroep.net/rcs/3v-nPo83vBI7y571hllRXVcXdKg/diocontent/247795775/_fitwidth/1400",
  "lock-out-thumb": "https://images3.persgroep.net/rcs/LnUmP-SJBJjkPBXeuU6xYn--MRQ/diocontent/263688487/_fitwidth/426",
  "lock-out-banner": "https://images3.persgroep.net/rcs/LnUmP-SJBJjkPBXeuU6xYn--MRQ/diocontent/263688487/_fitwidth/1400",
};

async function download(key, url) {
  const dest = path.join(OUT_DIR, `${key}.jpg`);
  if (existsSync(dest)) {
    console.log(`  ✓ ${key} (cached)`);
    return;
  }
  try {
    const res = await fetch(url, {
      headers: {
        Referer: "https://www.vtmgo.be/",
        "User-Agent": "Mozilla/5.0 (compatible; MuniStream/1.0)",
        Accept: "image/*",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(res.body, createWriteStream(dest));
    console.log(`  ✓ ${key}`);
  } catch (e) {
    console.warn(`  ✗ ${key}: ${e.message}`);
  }
}

console.log("Downloading VTM GO show images...");
await Promise.all(Object.entries(IMAGES).map(([k, u]) => download(k, u)));
console.log("Done.");
