"use strict";

/* ============================================================
   Quiz U — rapid-fire campus trivia
   Categories: Flags · Capitals · US States · Historical People
   · Birth & Death Years · Quick Maths · Geography · Everything
   Every mode: 4 difficulties (Easy → Impossible).
   Family Voice Mode: questions read aloud, yell your answers.
   ============================================================ */

const $ = (sel) => document.querySelector(sel);

/* ---------------- Data: countries [iso2, name, capital, tier] ---------------- */
const COUNTRIES = [
  // tier 1 — easy
  ["US","United States","Washington, D.C.",1],["CA","Canada","Ottawa",1],["MX","Mexico","Mexico City",1],
  ["BR","Brazil","Brasília",1],["GB","United Kingdom","London",1],["FR","France","Paris",1],
  ["DE","Germany","Berlin",1],["IT","Italy","Rome",1],["ES","Spain","Madrid",1],["JP","Japan","Tokyo",1],
  ["CN","China","Beijing",1],["IN","India","New Delhi",1],["AU","Australia","Canberra",1],
  ["RU","Russia","Moscow",1],["KR","South Korea","Seoul",1],["IE","Ireland","Dublin",1],
  ["GR","Greece","Athens",1],["SE","Sweden","Stockholm",1],["NO","Norway","Oslo",1],["CH","Switzerland","Bern",1],
  // tier 2 — medium
  ["AR","Argentina","Buenos Aires",2],["PT","Portugal","Lisbon",2],["NL","Netherlands","Amsterdam",2],
  ["BE","Belgium","Brussels",2],["DK","Denmark","Copenhagen",2],["FI","Finland","Helsinki",2],
  ["PL","Poland","Warsaw",2],["UA","Ukraine","Kyiv",2],["TR","Turkey","Ankara",2],["EG","Egypt","Cairo",2],
  ["ZA","South Africa","Pretoria",2],["NG","Nigeria","Abuja",2],["KE","Kenya","Nairobi",2],
  ["SA","Saudi Arabia","Riyadh",2],["IL","Israel","Jerusalem",2],["TH","Thailand","Bangkok",2],
  ["VN","Vietnam","Hanoi",2],["PH","Philippines","Manila",2],["ID","Indonesia","Jakarta",2],
  ["NZ","New Zealand","Wellington",2],["CO","Colombia","Bogotá",2],["CL","Chile","Santiago",2],
  ["PE","Peru","Lima",2],["CU","Cuba","Havana",2],["JM","Jamaica","Kingston",2],["AT","Austria","Vienna",2],
  ["CZ","Czechia","Prague",2],["HU","Hungary","Budapest",2],["HR","Croatia","Zagreb",2],["IS","Iceland","Reykjavík",2],
  // tier 3 — hard
  ["MA","Morocco","Rabat",3],["DZ","Algeria","Algiers",3],["TN","Tunisia","Tunis",3],
  ["ET","Ethiopia","Addis Ababa",3],["GH","Ghana","Accra",3],["SN","Senegal","Dakar",3],
  ["CI","Ivory Coast","Yamoussoukro",3],["CM","Cameroon","Yaoundé",3],["AO","Angola","Luanda",3],
  ["MZ","Mozambique","Maputo",3],["KZ","Kazakhstan","Astana",3],["UZ","Uzbekistan","Tashkent",3],
  ["PK","Pakistan","Islamabad",3],["BD","Bangladesh","Dhaka",3],["LK","Sri Lanka","Sri Jayawardenepura Kotte",3],
  ["NP","Nepal","Kathmandu",3],["MM","Myanmar","Naypyidaw",3],["KH","Cambodia","Phnom Penh",3],
  ["LA","Laos","Vientiane",3],["MY","Malaysia","Kuala Lumpur",3],["SG","Singapore","Singapore",3],
  ["QA","Qatar","Doha",3],["AE","United Arab Emirates","Abu Dhabi",3],["KW","Kuwait","Kuwait City",3],
  ["JO","Jordan","Amman",3],["LB","Lebanon","Beirut",3],["IQ","Iraq","Baghdad",3],["IR","Iran","Tehran",3],
  ["VE","Venezuela","Caracas",3],["EC","Ecuador","Quito",3],["BO","Bolivia","Sucre",3],
  ["UY","Uruguay","Montevideo",3],["PY","Paraguay","Asunción",3],["PA","Panama","Panama City",3],
  ["CR","Costa Rica","San José",3],["GT","Guatemala","Guatemala City",3],["HN","Honduras","Tegucigalpa",3],
  ["DO","Dominican Republic","Santo Domingo",3],["RO","Romania","Bucharest",3],["BG","Bulgaria","Sofia",3],
  ["RS","Serbia","Belgrade",3],["SK","Slovakia","Bratislava",3],["SI","Slovenia","Ljubljana",3],
  ["EE","Estonia","Tallinn",3],["LV","Latvia","Riga",3],["LT","Lithuania","Vilnius",3],
  // tier 4 — impossible
  ["BT","Bhutan","Thimphu",4],["BN","Brunei","Bandar Seri Begawan",4],["BF","Burkina Faso","Ouagadougou",4],
  ["BI","Burundi","Gitega",4],["KM","Comoros","Moroni",4],["DJ","Djibouti","Djibouti City",4],
  ["ER","Eritrea","Asmara",4],["GA","Gabon","Libreville",4],["GM","Gambia","Banjul",4],
  ["GW","Guinea-Bissau","Bissau",4],["KG","Kyrgyzstan","Bishkek",4],["TJ","Tajikistan","Dushanbe",4],
  ["TM","Turkmenistan","Ashgabat",4],["LS","Lesotho","Maseru",4],["LI","Liechtenstein","Vaduz",4],
  ["MW","Malawi","Lilongwe",4],["MR","Mauritania","Nouakchott",4],["MD","Moldova","Chișinău",4],
  ["MN","Mongolia","Ulaanbaatar",4],["ME","Montenegro","Podgorica",4],["MK","North Macedonia","Skopje",4],
  ["PW","Palau","Ngerulmud",4],["PG","Papua New Guinea","Port Moresby",4],["SM","San Marino","San Marino",4],
  ["ST","São Tomé and Príncipe","São Tomé",4],["SB","Solomon Islands","Honiara",4],
  ["SR","Suriname","Paramaribo",4],["TL","Timor-Leste","Dili",4],["TG","Togo","Lomé",4],
  ["TO","Tonga","Nukuʻalofa",4],["TV","Tuvalu","Funafuti",4],["VU","Vanuatu","Port Vila",4],
  ["AD","Andorra","Andorra la Vella",4],["BJ","Benin","Porto-Novo",4],
  ["CF","Central African Republic","Bangui",4],["TD","Chad","N'Djamena",4],["FJ","Fiji","Suva",4],
  ["GY","Guyana","Georgetown",4],["KI","Kiribati","Tarawa",4],["MH","Marshall Islands","Majuro",4],
  ["FM","Micronesia","Palikir",4],["NR","Nauru","Yaren",4],["NE","Niger","Niamey",4],
  ["OM","Oman","Muscat",4],["SC","Seychelles","Victoria",4],["SL","Sierra Leone","Freetown",4],
  ["ZM","Zambia","Lusaka",4],["ZW","Zimbabwe","Harare",4]
];

// famous "trap" cities that are NOT the capital — classic gotchas
const COUNTRY_TRAPS = {
  US:"New York City", AU:"Sydney", CA:"Toronto", BR:"Rio de Janeiro", TR:"Istanbul",
  NZ:"Auckland", CH:"Zurich", IN:"Mumbai", CN:"Shanghai", PK:"Karachi", NG:"Lagos",
  MA:"Casablanca", VN:"Ho Chi Minh City", KZ:"Almaty", MM:"Yangon", CI:"Abidjan",
  BO:"La Paz", UZ:"Samarkand", AE:"Dubai", ZA:"Johannesburg", IL:"Tel Aviv"
};

/* ---------------- Data: US states [name, capital, tier] ---------------- */
const STATES = [
  ["Alabama","Montgomery",2],["Alaska","Juneau",2],["Arizona","Phoenix",1],["Arkansas","Little Rock",2],
  ["California","Sacramento",1],["Colorado","Denver",1],["Connecticut","Hartford",2],["Delaware","Dover",3],
  ["Florida","Tallahassee",2],["Georgia","Atlanta",1],["Hawaii","Honolulu",1],["Idaho","Boise",2],
  ["Illinois","Springfield",2],["Indiana","Indianapolis",1],["Iowa","Des Moines",2],["Kansas","Topeka",3],
  ["Kentucky","Frankfort",3],["Louisiana","Baton Rouge",2],["Maine","Augusta",3],["Maryland","Annapolis",2],
  ["Massachusetts","Boston",1],["Michigan","Lansing",2],["Minnesota","St. Paul",2],["Mississippi","Jackson",2],
  ["Missouri","Jefferson City",3],["Montana","Helena",3],["Nebraska","Lincoln",2],["Nevada","Carson City",3],
  ["New Hampshire","Concord",3],["New Jersey","Trenton",2],["New Mexico","Santa Fe",2],["New York","Albany",2],
  ["North Carolina","Raleigh",2],["North Dakota","Bismarck",3],["Ohio","Columbus",1],["Oklahoma","Oklahoma City",1],
  ["Oregon","Salem",3],["Pennsylvania","Harrisburg",3],["Rhode Island","Providence",2],["South Carolina","Columbia",2],
  ["South Dakota","Pierre",3],["Tennessee","Nashville",1],["Texas","Austin",1],["Utah","Salt Lake City",1],
  ["Vermont","Montpelier",3],["Virginia","Richmond",2],["Washington","Olympia",3],["West Virginia","Charleston",3],
  ["Wisconsin","Madison",2],["Wyoming","Cheyenne",3]
];

const STATE_TRAPS = {
  "New York":"New York City", "California":"Los Angeles", "Illinois":"Chicago", "Texas":"Houston",
  "Florida":"Miami", "Washington":"Seattle", "Nevada":"Las Vegas", "Michigan":"Detroit",
  "Missouri":"St. Louis", "Louisiana":"New Orleans", "Pennsylvania":"Philadelphia",
  "Maryland":"Baltimore", "Oregon":"Portland", "Kentucky":"Louisville", "Tennessee":"Memphis",
  "Alabama":"Birmingham", "Alaska":"Anchorage", "Wisconsin":"Milwaukee"
};

/* ------- Data: historical figures [name, born, died, clue, tier] (negative year = BC) ------- */
const FIGURES = [
  // tier 1
  ["George Washington",1732,1799,"First President of the United States",1],
  ["Abraham Lincoln",1809,1865,"Led the U.S. through the Civil War; assassinated at Ford's Theatre",1],
  ["Albert Einstein",1879,1955,"Physicist behind E = mc²",1],
  ["Napoleon Bonaparte",1769,1821,"French emperor finally defeated at Waterloo",1],
  ["William Shakespeare",1564,1616,"English playwright of Hamlet and Romeo and Juliet",1],
  ["Leonardo da Vinci",1452,1519,"Renaissance master who painted the Mona Lisa",1],
  ["Isaac Newton",1643,1727,"Formulated the laws of motion and universal gravitation",1],
  ["Martin Luther King Jr.",1929,1968,"Civil rights leader with a famous dream",1],
  ["Elvis Presley",1935,1977,"The King of Rock and Roll",1],
  ["Walt Disney",1901,1966,"Animation pioneer who created Mickey Mouse",1],
  ["Muhammad Ali",1942,2016,"Boxer who floated like a butterfly and stung like a bee",1],
  ["Queen Elizabeth II",1926,2022,"Longest-reigning British monarch",1],
  ["Steve Jobs",1955,2011,"Apple co-founder who unveiled the iPhone",1],
  ["Princess Diana",1961,1997,"Known as the People's Princess",1],
  ["Michael Jackson",1958,2009,"The King of Pop",1],
  ["Kobe Bryant",1978,2020,"Lakers legend known as the Black Mamba",1],
  ["Wolfgang Amadeus Mozart",1756,1791,"Austrian prodigy who composed The Magic Flute",1],
  ["Christopher Columbus",1451,1506,"Genoese explorer whose 1492 voyage reached the Americas",1],
  ["Anne Frank",1929,1945,"Teenage diarist who hid in an Amsterdam annex",1],
  ["Nelson Mandela",1918,2013,"South Africa's first Black president",1],
  // tier 2
  ["Ludwig van Beethoven",1770,1827,"German composer who kept writing symphonies after going deaf",2],
  ["Charles Darwin",1809,1882,"Naturalist behind On the Origin of Species",2],
  ["Marie Curie",1867,1934,"Two-time Nobel laureate who pioneered radioactivity research",2],
  ["Nikola Tesla",1856,1943,"Inventor behind alternating-current electricity",2],
  ["Thomas Edison",1847,1931,"Prolific inventor of the phonograph",2],
  ["Mahatma Gandhi",1869,1948,"Led India's nonviolent independence movement",2],
  ["Winston Churchill",1874,1965,"British Prime Minister through World War II",2],
  ["Franklin D. Roosevelt",1882,1945,"Four-term U.S. president through the Depression and WWII",2],
  ["John F. Kennedy",1917,1963,"U.S. president assassinated in Dallas",2],
  ["Vincent van Gogh",1853,1890,"Dutch painter of The Starry Night",2],
  ["Pablo Picasso",1881,1973,"Spanish co-founder of Cubism",2],
  ["Julius Caesar",-100,-44,"Roman general stabbed on the Ides of March",2],
  ["Cleopatra",-69,-30,"Last active pharaoh of ancient Egypt",2],
  ["Alexander the Great",-356,-323,"Macedonian king who conquered all the way to India by 30",2],
  ["Genghis Khan",1162,1227,"Founder of the Mongol Empire",2],
  ["Joan of Arc",1412,1431,"Teenage French heroine burned at the stake",2],
  ["Galileo Galilei",1564,1642,"Astronomer put on trial for saying Earth orbits the Sun",2],
  ["Benjamin Franklin",1706,1790,"Founding Father who flew a kite in a lightning storm",2],
  ["Marilyn Monroe",1926,1962,"Hollywood icon of the 1950s",2],
  ["Bruce Lee",1940,1973,"Martial arts film legend of Enter the Dragon",2],
  ["Stephen Hawking",1942,2018,"Physicist who wrote A Brief History of Time",2],
  ["Rosa Parks",1913,2005,"Refused to give up her bus seat in Montgomery",2],
  ["Harriet Tubman",1822,1913,"Conductor on the Underground Railroad",2],
  ["Mark Twain",1835,1910,"Author of The Adventures of Huckleberry Finn",2],
  ["Henry VIII",1491,1547,"English king with six wives",2],
  ["Pelé",1940,2022,"Brazilian soccer king with three World Cup titles",2],
  // tier 3
  ["Aristotle",-384,-322,"Greek philosopher who tutored Alexander the Great",3],
  ["Plato",-428,-348,"Founded the Academy in Athens",3],
  ["Socrates",-470,-399,"Athenian philosopher sentenced to drink hemlock",3],
  ["Confucius",-551,-479,"Chinese philosopher whose sayings fill the Analects",3],
  ["Charlemagne",748,814,"Crowned Emperor of the Romans in the year 800",3],
  ["William the Conqueror",1028,1087,"Won the Battle of Hastings in 1066",3],
  ["Marco Polo",1254,1324,"Venetian traveler to the court of Kublai Khan",3],
  ["Johannes Gutenberg",1400,1468,"Invented the movable-type printing press",3],
  ["Ferdinand Magellan",1480,1521,"His expedition was first to circle the globe",3],
  ["Elizabeth I",1533,1603,"The Virgin Queen of England",3],
  ["Louis XIV",1638,1715,"The Sun King who built Versailles",3],
  ["Peter the Great",1672,1725,"Tsar who founded St. Petersburg",3],
  ["Catherine the Great",1729,1796,"Russia's longest-ruling empress",3],
  ["Marie Antoinette",1755,1793,"French queen guillotined in the Revolution",3],
  ["Simón Bolívar",1783,1830,"The Liberator of South America",3],
  ["Karl Marx",1818,1883,"Co-wrote The Communist Manifesto",3],
  ["Queen Victoria",1819,1901,"British monarch who gave her name to an era",3],
  ["Sigmund Freud",1856,1939,"Father of psychoanalysis",3],
  ["Amelia Earhart",1897,1937,"Aviator who vanished over the Pacific",3],
  ["Frida Kahlo",1907,1954,"Mexican painter famous for striking self-portraits",3],
  ["Jane Austen",1775,1817,"Wrote Pride and Prejudice",3],
  ["Charles Dickens",1812,1870,"Wrote A Christmas Carol",3],
  ["Michelangelo",1475,1564,"Painted the Sistine Chapel ceiling",3],
  ["Attila the Hun",406,453,"Feared invader called the Scourge of God",3],
  ["Ivan the Terrible",1530,1584,"First to be crowned Tsar of all Russia",3],
  ["Saladin",1137,1193,"Sultan who retook Jerusalem in 1187",3],
  ["Che Guevara",1928,1967,"Argentine revolutionary whose face covers a million T-shirts",3],
  ["Emily Dickinson",1830,1886,"Reclusive poet of Amherst",3],
  ["Henry Ford",1863,1947,"Put America on wheels with the Model T",3]
];

/* ------- Data: geography trivia [question, correct, [wrong×3], tier, fact] ------- */
const GEO_TRIVIA = [
  ["What is the largest ocean on Earth?","Pacific Ocean",["Atlantic Ocean","Indian Ocean","Arctic Ocean"],1,"The Pacific covers more area than all land on Earth combined."],
  ["Which river is generally considered the longest in the world?","The Nile",["The Amazon","The Mississippi","The Yangtze"],1,"The Nile runs about 6,650 km — though the Amazon fans will fight you on this."],
  ["What is the tallest mountain above sea level?","Mount Everest",["K2","Kilimanjaro","Denali"],1,"Everest stands at 8,849 m."],
  ["Which country is the largest by area?","Russia",["Canada","China","United States"],1,"Russia spans 11 time zones."],
  ["Which country has the largest population?","India",["China","United States","Indonesia"],1,"India passed China in 2023."],
  ["What is the largest HOT desert in the world?","The Sahara",["The Gobi","The Kalahari","The Mojave"],1,"The Sahara is nearly the size of the United States."],
  ["What is the smallest country in the world?","Vatican City",["Monaco","San Marino","Liechtenstein"],1,"Vatican City is about 0.44 km² — smaller than most college campuses."],
  ["Which continent has the most countries?","Africa",["Asia","Europe","South America"],1,"Africa has 54 recognized countries."],
  ["The Great Barrier Reef is off the coast of which country?","Australia",["Brazil","Indonesia","Mexico"],1,"It is the largest living structure on Earth."],
  ["The Statue of Liberty was a gift from which country?","France",["United Kingdom","Italy","Spain"],1,"Gifted in 1886 to celebrate American independence."],
  ["Which country observes the most time zones (including territories)?","France",["Russia","United States","United Kingdom"],2,"France hits 12 time zones thanks to its overseas territories."],
  ["Which is the only continent that sits in all four hemispheres?","Africa",["Asia","South America","Oceania"],2,"The equator and prime meridian both cross Africa."],
  ["What is the longest mountain range on land?","The Andes",["The Rockies","The Himalayas","The Alps"],2,"The Andes stretch about 7,000 km along South America."],
  ["What is the largest lake in the world?","The Caspian Sea",["Lake Superior","Lake Victoria","Lake Baikal"],2,"Despite the name, the Caspian Sea is classed as a lake."],
  ["Which river flows through Paris?","The Seine",["The Rhine","The Loire","The Danube"],2,"The Eiffel Tower sits on its Left Bank."],
  ["Which country is famously shaped like a boot?","Italy",["Chile","Portugal","Norway"],2,"And Sicily is the football it is kicking."],
  ["Which country is called the Land of the Rising Sun?","Japan",["China","Thailand","South Korea"],2,"Nihon literally means origin of the sun."],
  ["Which country has the most islands in the world?","Sweden",["Indonesia","Philippines","Japan"],2,"Sweden counts roughly 267,000 islands."],
  ["Machu Picchu is located in which country?","Peru",["Mexico","Bolivia","Chile"],2,"The Incan citadel sits at about 2,430 m in the Andes."],
  ["Mount Kilimanjaro is in which country?","Tanzania",["Kenya","Ethiopia","South Africa"],2,"It is the tallest free-standing mountain on Earth."],
  ["Which two countries share the longest international border?","United States & Canada",["Russia & China","Argentina & Chile","India & China"],2,"About 8,891 km including Alaska."],
  ["Which major city sits on two continents?","Istanbul",["Cairo","Moscow","Dubai"],2,"The Bosphorus splits it between Europe and Asia."],
  ["What is actually the largest desert in the world?","Antarctica",["The Sahara","The Arabian","The Gobi"],3,"A desert is defined by low precipitation — Antarctica is a polar desert bigger than the Sahara."],
  ["What is the deepest lake in the world?","Lake Baikal",["Lake Tanganyika","The Caspian Sea","Lake Superior"],3,"Baikal in Siberia holds about 20% of Earth's fresh surface water."],
  ["Which is the driest non-polar desert on Earth?","The Atacama",["The Sahara","The Namib","The Gobi"],3,"Some Atacama weather stations have never recorded rain."],
  ["Which country is completely surrounded by South Africa?","Lesotho",["Eswatini","Botswana","Malawi"],3,"Lesotho is the world's largest enclaved country."],
  ["Which sea has no coastline at all?","The Sargasso Sea",["The Dead Sea","The Coral Sea","The Black Sea"],3,"It is bounded only by ocean currents in the Atlantic."],
  ["Which country has the longest coastline in the world?","Canada",["Russia","Australia","Indonesia"],3,"About 202,000 km — mostly thanks to its Arctic islands."],
  ["Which country has the most active volcanoes?","Indonesia",["Japan","Iceland","Italy"],3,"Around 130 active volcanoes sit on the Ring of Fire there."],
  ["Angel Falls, the world's tallest waterfall, is in which country?","Venezuela",["Brazil","Colombia","Guyana"],3,"It drops 979 m from a tabletop mountain."],
  ["Which is the flattest country on Earth?","Maldives",["Netherlands","Denmark","Qatar"],3,"Its highest natural point is about 2.4 m above sea level."],
  ["Which of these countries is doubly landlocked?","Liechtenstein",["Switzerland","Nepal","Paraguay"],4,"Only Liechtenstein and Uzbekistan are landlocked by landlocked countries."],
  ["Which country has no official capital city?","Nauru",["Tuvalu","Palau","Monaco"],4,"Tiny Nauru's government sits in the Yaren district, but no capital is designated."],
  ["Which country was formerly known as Abyssinia?","Ethiopia",["Eritrea","Sudan","Somalia"],4,"Ethiopia is also the only African country never formally colonized."],
  ["Which country was known as Persia until 1935?","Iran",["Iraq","Turkey","Afghanistan"],4,"The name Iran means land of the Aryans."],
  ["Which country was formerly called Siam?","Thailand",["Vietnam","Cambodia","Myanmar"],4,"It became Thailand — land of the free — in 1939."],
  ["Which country was formerly called Ceylon?","Sri Lanka",["Maldives","Bangladesh","Myanmar"],4,"Ceylon tea still carries the old name."],
  ["Which modern country was once called Zaire?","DR Congo",["Republic of the Congo","Angola","Zambia"],4,"It was Zaire from 1971 to 1997."],
  ["Istanbul was previously known by which name?","Constantinople",["Alexandria","Antioch","Thessaloniki"],4,"Before that, it was Byzantium."],
  ["Which African country has three capital cities?","South Africa",["Nigeria","Egypt","Morocco"],4,"Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial)."]
];

/* ---------------- Difficulty + categories ---------------- */
const DIFFS = [
  {id:1, name:"Easy",       emoji:"🟢", time:20},
  {id:2, name:"Medium",     emoji:"🟡", time:15},
  {id:3, name:"Hard",       emoji:"🔴", time:12},
  {id:4, name:"Impossible", emoji:"💀", time:10}
];

const CATS = [
  {id:"flags",    emoji:"🚩", name:"Flags",               desc:"Name that country"},
  {id:"capitals", emoji:"🏙️", name:"World Capitals",      desc:"Cities of power"},
  {id:"states",   emoji:"🗽", name:"US State Capitals",   desc:"All 50, no mercy"},
  {id:"people",   emoji:"🏛️", name:"Historical People",   desc:"Who am I?"},
  {id:"years",    emoji:"📅", name:"Birth & Death Years", desc:"The classic — when were they born, when did they die"},
  {id:"math",     emoji:"➗", name:"Quick Maths",         desc:"No calculator allowed"},
  {id:"geo",      emoji:"🌍", name:"Geography Trivia",    desc:"Rivers, deserts, gotchas"},
  {id:"mix",      emoji:"🧠", name:"Everything",          desc:"Random category every question"}
];

const QUESTIONS_PER_RUN = 10;

/* ---------------- Helpers ---------------- */
const ri = (n) => Math.floor(Math.random() * n);
const rand = (arr) => arr[ri(arr.length)];
function shuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = ri(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickDistinct(pool, n, excludeFn){
  const out = [];
  const seen = new Set();
  const shuffled = shuffle(pool);
  for (const item of shuffled){
    if (out.length >= n) break;
    if (excludeFn(item)) continue;
    const key = JSON.stringify(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}
const flagEmoji = (code) =>
  String.fromCodePoint(...[...code].map(c => 127397 + c.charCodeAt(0)));
const fmtYear = (y) => y < 0 ? `${-y} BC` : `${y}`;
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

function poolByTier(data, diff, tierIdx){
  // diff 1..4 → matching tier; fall back to nearest non-empty tier
  for (const t of [diff, diff-1, diff+1, diff-2, diff+2]){
    const p = data.filter(x => x[tierIdx] === t);
    if (p.length >= 6) return p;
  }
  return data;
}

/* ---------------- Question builders ----------------
   Each returns: { kind:'mc'|'input', key, big, bigClass, prompt, sub,
                   options[], answer, fact, speak }                    */

function buildFlags(diff){
  const pool = poolByTier(COUNTRIES, diff, 3);
  const c = rand(pool);
  const others = pickDistinct(pool, 3, x => x[0] === c[0]);
  // emoji answer buttons can't be yelled — skip reverse mode when voice is on
  const reverse = !S.voice && diff >= 2 && Math.random() < 0.35;
  const fact = `${flagEmoji(c[0])} ${c[1]} — capital: ${c[2]}`;
  if (reverse){
    const opts = shuffle([c, ...others]);
    return { kind:"mc", key:"flag:"+c[0], big:"🚩", bigClass:"",
      prompt:`Which flag belongs to ${c[1]}?`, sub:"",
      options:opts.map(x => flagEmoji(x[0])), optClass:"opt-flag",
      answer:opts.indexOf(c), fact };
  }
  const opts = shuffle([c, ...others]);
  return { kind:"mc", key:"flag:"+c[0], big:flagEmoji(c[0]), bigClass:"big-flag",
    prompt:"Which country is this?", sub:"",
    options:opts.map(x => x[1]), answer:opts.indexOf(c), fact,
    speak:"Which country's flag is this?" };
}

function buildCapitals(diff){
  const pool = poolByTier(COUNTRIES, diff, 3);
  const c = rand(pool);
  const fact = `${flagEmoji(c[0])} The capital of ${c[1]} is ${c[2]}.`;
  if (Math.random() < 0.35){
    // reverse: capital → country
    const others = pickDistinct(pool, 3, x => x[0] === c[0]);
    const opts = shuffle([c, ...others]);
    return { kind:"mc", key:"cap:"+c[0], big:"🏙️", bigClass:"",
      prompt:`${c[2]} is the capital of which country?`, sub:"",
      options:opts.map(x => x[1]), answer:opts.indexOf(c), fact };
  }
  let wrongs = pickDistinct(pool, 3, x => x[0] === c[0]).map(x => x[2]);
  const trap = COUNTRY_TRAPS[c[0]];
  if (trap) wrongs = [trap, ...wrongs.slice(0, 2)];
  const opts = shuffle([c[2], ...wrongs]);
  return { kind:"mc", key:"cap:"+c[0], big:flagEmoji(c[0]), bigClass:"big-flag",
    prompt:`What is the capital of ${c[1]}?`, sub:"",
    options:opts, answer:opts.indexOf(c[2]), fact };
}

function buildStates(diff){
  const tierWanted = Math.min(diff, 3);
  const pool = poolByTier(STATES, tierWanted, 2);
  const s = rand(pool);
  let wrongs = pickDistinct(STATES, 3, x => x[0] === s[0]).map(x => x[1]);
  const trap = STATE_TRAPS[s[0]];
  if (trap) wrongs = [trap, ...wrongs.slice(0, 2)];
  const opts = shuffle([s[1], ...wrongs]);
  return { kind:"mc", key:"state:"+s[0], big:"🗽", bigClass:"",
    prompt:`What is the capital of ${s[0]}?`, sub:"U.S. state",
    options:opts, answer:opts.indexOf(s[1]),
    fact:`The capital of ${s[0]} is ${s[1]}.` };
}

function buildPeople(diff){
  const pool = poolByTier(FIGURES, Math.min(diff, 3), 4);
  const f = rand(pool);
  const others = pickDistinct(pool, 3, x => x[0] === f[0]);
  const opts = shuffle([f, ...others]);
  return { kind:"mc", key:"person:"+f[0], big:"🏛️", bigClass:"",
    prompt:"Who am I?", sub:`“${f[3]}”`,
    options:opts.map(x => x[0]), answer:opts.indexOf(f),
    fact:`${f[0]} (${fmtYear(f[1])} – ${fmtYear(f[2])}) — ${f[3]}`,
    speak:`Who am I? ${f[3]}.` };
}

function buildYears(diff){
  const pool = poolByTier(FIGURES, Math.min(diff, 3), 4);
  const f = rand(pool);
  const born = Math.random() < 0.5;
  const y = born ? f[1] : f[2];
  const spreads = {1:[8,15,25,40], 2:[5,9,14,20], 3:[2,4,6,9], 4:[1,2,3,4]};
  const offs = shuffle(spreads[diff]).slice(0, 3);
  const options = [y];
  for (const off of offs){
    let cand = Math.random() < 0.5 ? y - off : y + off;
    if (cand > 2026) cand = y - off;
    while (options.includes(cand)) cand -= 1;
    options.push(cand);
  }
  const opts = shuffle(options);
  return { kind:"mc", key:"year:"+f[0]+(born?"b":"d"), big:"📅", bigClass:"",
    prompt: born ? `In what year was ${f[0]} born?` : `In what year did ${f[0]} die?`,
    sub:`“${f[3]}”`,
    options:opts.map(fmtYear), answer:opts.indexOf(y),
    fact:`${f[0]}: born ${fmtYear(f[1])}, died ${fmtYear(f[2])}.` };
}

function buildMath(diff){
  let expr, ans;
  const r = (lo, hi) => lo + ri(hi - lo + 1);
  if (diff === 1){
    const kind = ri(3);
    if (kind === 0){ const a = r(6,49), b = r(6,49); expr = `${a} + ${b}`; ans = a + b; }
    else if (kind === 1){ const a = r(20,60), b = r(3,19); expr = `${a} − ${b}`; ans = a - b; }
    else { const a = r(3,9), b = r(3,9); expr = `${a} × ${b}`; ans = a * b; }
  } else if (diff === 2){
    const kind = ri(3);
    if (kind === 0){ const a = r(25,89), b = r(25,89); expr = `${a} + ${b}`; ans = a + b; }
    else if (kind === 1){ const a = r(50,99), b = r(12,49); expr = `${a} − ${b}`; ans = a - b; }
    else { const a = r(6,12), b = r(6,12); expr = `${a} × ${b}`; ans = a * b; }
  } else if (diff === 3){
    const kind = ri(3);
    if (kind === 0){ const a = r(13,29), b = r(3,9); expr = `${a} × ${b}`; ans = a * b; }
    else if (kind === 1){ const a = r(11,16); expr = `${a}²`; ans = a * a; }
    else {
      const pcts = [10,20,25,50,75]; const p = rand(pcts);
      const base = r(2,12) * (p === 75 || p === 25 ? 8 : 10);
      expr = `${p}% of ${base}`; ans = base * p / 100;
    }
  } else {
    const kind = ri(3);
    if (kind === 0){ const a = r(12,25), b = r(12,25); expr = `${a} × ${b}`; ans = a * b; }
    else if (kind === 1){ const a = r(13,19); expr = `${a}²`; ans = a * a; }
    else { const a = r(4,15), b = r(3,9), c = r(3,9); expr = `${a} + ${b} × ${c}`; ans = a + b * c; }
  }
  const spoken = expr.replace(/−/g, " minus ").replace(/×/g, " times ")
    .replace(/²/g, " squared").replace(/%/g, " percent");
  return { kind:"input", key:"math:"+expr, big:expr, bigClass:"big-math",
    prompt:"Solve it — no calculator 🙅", sub:"",
    answer:ans, fact:`${expr} = ${ans}`, speak:`What is ${spoken}?` };
}

function buildGeo(diff){
  const pool = poolByTier(GEO_TRIVIA, diff, 3);
  const q = rand(pool);
  const opts = shuffle([q[1], ...q[2]]);
  return { kind:"mc", key:"geo:"+q[0], big:"🌍", bigClass:"",
    prompt:q[0], sub:"",
    options:opts, answer:opts.indexOf(q[1]), fact:q[4] };
}

const BUILDERS = { flags:buildFlags, capitals:buildCapitals, states:buildStates,
  people:buildPeople, years:buildYears, math:buildMath, geo:buildGeo };

function buildRun(catId, diff){
  const qs = [];
  const used = new Set();
  let guard = 0;
  while (qs.length < QUESTIONS_PER_RUN && guard < 400){
    guard++;
    const builder = catId === "mix"
      ? BUILDERS[rand(Object.keys(BUILDERS))]
      : BUILDERS[catId];
    const q = builder(diff);
    if (used.has(q.key)) continue;
    used.add(q.key);
    qs.push(q);
  }
  return qs;
}

/* ---------------- Persistence ---------------- */
const bestKey = (cat, diff) => `quizu-best-${cat}-${diff}`;
function getBest(cat, diff){
  try { return JSON.parse(localStorage.getItem(bestKey(cat, diff))) || null; }
  catch { return null; }
}
function saveBest(cat, diff, run){
  const prev = getBest(cat, diff);
  if (!prev || run.score > prev.score){
    try { localStorage.setItem(bestKey(cat, diff), JSON.stringify(run)); } catch {}
    return true;
  }
  return false;
}

/* ---------------- Voice engine (Family Voice Mode) ----------------
   Speech synthesis reads each question aloud; speech recognition
   listens so the family can yell answers at the screen.           */
const SRClass = window.SpeechRecognition || window.webkitSpeechRecognition;
const VOICE = {
  supported: !!SRClass,
  ttsSupported: "speechSynthesis" in window,
  enabled: (() => { try { return localStorage.getItem("quizu-voice") === "1"; } catch { return false; } })(),
  rec: null,
  listening: false,
  micError: false
};

function setVoicePref(on){
  VOICE.enabled = on;
  try { localStorage.setItem("quizu-voice", on ? "1" : "0"); } catch {}
}

function speak(text, done){
  if (!VOICE.ttsSupported || !text){ if (done) done(); return; }
  let finished = false;
  const finish = () => { if (!finished){ finished = true; if (done) done(); } };
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.onend = finish;
    u.onerror = finish;
    window.speechSynthesis.speak(u);
    // safety net in case onend never fires
    setTimeout(finish, Math.max(3500, text.length * 90));
  } catch { finish(); }
}

const normText = (s) => String(s).toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

// yell-friendly synonyms, keyed by normalized answer text
const ALIASES = {
  "united states":["usa","america","the us","united states of america"],
  "united kingdom":["uk","britain","great britain","england"],
  "washington d c":["washington","dc","washington dc"],
  "new york city":["new york"],
  "united arab emirates":["uae","the emirates"],
  "czechia":["czech republic"],
  "timor leste":["east timor"],
  "ivory coast":["cote d ivoire"],
  "dr congo":["democratic republic of the congo","the congo","congo"],
  "myanmar":["burma"],
  "netherlands":["holland","the netherlands"],
  "st paul":["saint paul"],
  "mount everest":["everest"],
  "the nile":["nile","nile river","the nile river"],
  "the amazon":["amazon","amazon river"],
  "pacific ocean":["the pacific","pacific"],
  "atlantic ocean":["the atlantic","atlantic"],
  "vatican city":["the vatican","vatican"],
  "the sahara":["sahara","sahara desert"],
  "united states canada":["us and canada","usa and canada","america and canada","united states and canada"],
  "lake baikal":["baikal"],
  "the atacama":["atacama","atacama desert"],
  "the sargasso sea":["sargasso","sargasso sea"],
  "the seine":["seine","the seine river"],
  "the andes":["andes","andes mountains"],
  "the caspian sea":["caspian","caspian sea"],
  "sri jayawardenepura kotte":["kotte"]
};

function optionMatchers(optRaw){
  const n = normText(optRaw);
  return [n, ...(ALIASES[n] || [])].filter(Boolean);
}

const hasPhrase = (transcript, phrase) =>
  new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(transcript);

/* Voice mode is open-answer — no multiple choice. A yell only counts
   when it matches the CORRECT answer; anything else is ignored and the
   mic keeps listening until the clock runs out. */
const YEAR_TOLERANCE = {1:10, 2:5, 3:2, 4:0};
const STOP_WORDS = new Set(["the","and","of","city","new","saint","lake","mount","sea",
  "ocean","river","great","north","south","east","west","island","islands","republic","desert","falls"]);

function matchOpen(q, rawTranscript){
  const t = normText(rawTranscript);
  if (!t) return false;
  const nums = (rawTranscript.match(/\d+/g) || []).map(Number);

  if (q.kind === "input") return nums.includes(q.answer);

  const correctRaw = String(q.options[q.answer]);
  // year questions: numeric, with a closeness tolerance by difficulty
  if (q.key.startsWith("year:")){
    const target = Math.abs(parseInt(correctRaw, 10));
    const tol = YEAR_TOLERANCE[S.diff] || 0;
    return nums.some(n => Math.abs(n - target) <= tol);
  }
  // full phrase or alias ("america", "dc", "burma"…)
  for (const m of optionMatchers(correctRaw)){
    if (hasPhrase(t, m)) return true;
  }
  // partial credit: any meaningful word of the answer ("napoleon", "bonaparte")
  for (const tok of normText(correctRaw).split(" ")){
    if (tok.length >= 4 && !STOP_WORDS.has(tok) && hasPhrase(t, tok)) return true;
  }
  return false;
}

function startListening(){
  if (!VOICE.supported || VOICE.micError) return;
  stopListening();
  const rec = new SRClass();
  VOICE.rec = rec;
  rec.lang = "en-US";
  rec.continuous = true;
  rec.interimResults = true;

  rec.onresult = (e) => {
    if (S.locked) return;
    let interim = "", finals = "";
    for (let i = 0; i < e.results.length; i++){
      const txt = e.results[i][0].transcript;
      if (e.results[i].isFinal) finals += " " + txt;
      else interim += " " + txt;
    }
    const heard = $("#heard");
    if (heard) heard.textContent = (finals + " " + interim).trim().slice(-60) || "…";
    if (!finals.trim()) return;
    const q = S.qs[S.idx];
    if (!matchOpen(q, finals)) return; // keep listening — only the right answer scores
    stopListening();
    if (!S.locked){
      S.locked = true;
      clearInterval(S.timerId);
      settle(true, q);
    }
  };
  rec.onerror = (e) => {
    if (e.error === "not-allowed" || e.error === "service-not-allowed"){
      VOICE.micError = true;
      // mic died — drop this run to tap mode so the game keeps moving
      if (S.voice){
        S.voice = false;
        if (!S.locked && S.qs.length) showQuestion();
      }
    }
  };
  rec.onend = () => {
    // Chrome stops after silence — restart while the question is live
    if (VOICE.rec === rec && !S.locked && !VOICE.micError){
      try { rec.start(); } catch {}
    }
  };
  try { rec.start(); VOICE.listening = true; } catch {}
}

function stopListening(){
  const rec = VOICE.rec;
  VOICE.rec = null;
  VOICE.listening = false;
  if (rec){
    rec.onend = null; rec.onresult = null; rec.onerror = null;
    try { rec.stop(); } catch {}
  }
}

/* ---------------- Game state ---------------- */
const S = {
  diff: 1,
  cat: null,
  voice: false,
  qs: [],
  idx: 0,
  score: 0,
  correct: 0,
  streak: 0,
  bestStreak: 0,
  locked: false,
  timerId: null,
  timeLeft: 0,
  timeMax: 0
};

/* ---------------- Screens ---------------- */
function bestSummary(catId){
  let top = null;
  for (const d of DIFFS){
    const b = getBest(catId, d.id);
    if (b && (!top || b.score > top.score)) top = { ...b, diff: d };
  }
  return top;
}

function showHome(){
  clearInterval(S.timerId);
  stopListening();
  if (VOICE.ttsSupported){ try { window.speechSynthesis.cancel(); } catch {} }

  const voiceRow = VOICE.supported
    ? `<label class="voicebar ${VOICE.enabled ? "on" : ""}">
        <input type="checkbox" id="voicetoggle" ${VOICE.enabled ? "checked" : ""}>
        <span class="voice-emoji">🎤</span>
        <span><strong>Family Voice Mode</strong><br>
        <small>No multiple choice — questions are read out loud and everybody yells the answer!</small></span>
      </label>`
    : `<div class="voicebar dim">🎤 Family Voice Mode needs Chrome or Edge with a microphone — playing in tap mode here.</div>`;

  const cards = CATS.map(c => {
    const top = bestSummary(c.id);
    const bestHtml = top
      ? `<div class="best">🏆 ${top.score} · ${top.correct}/${QUESTIONS_PER_RUN} ${top.diff.emoji}</div>`
      : `<div class="best dim">no grade yet</div>`;
    return `<button class="card" data-cat="${c.id}">
      <div class="card-emoji">${c.emoji}</div>
      <div class="card-name">${c.name}</div>
      <div class="card-desc">${c.desc}</div>
      ${bestHtml}
      <div class="card-diffs">${DIFFS.map(d => d.emoji).join(" ")}</div>
    </button>`;
  }).join("");

  $("#screen").innerHTML = `
    <section class="home">
      <h1>Pick your poison 📚</h1>
      <p class="lede">10 rapid-fire questions. Every mode has 4 difficulties — Easy to 💀 Impossible.</p>
      ${voiceRow}
      <div class="grid">${cards}</div>
    </section>`;

  const vt = $("#voicetoggle");
  if (vt) vt.addEventListener("change", () => {
    setVoicePref(vt.checked);
    vt.closest(".voicebar").classList.toggle("on", vt.checked);
  });
  document.querySelectorAll(".card").forEach(b =>
    b.addEventListener("click", () => openSheet(b.dataset.cat)));
}

/* Difficulty picker sheet — every game mode gets all 4 difficulties */
function openSheet(catId){
  const cat = CATS.find(c => c.id === catId);
  const rows = DIFFS.map(d => {
    const b = getBest(catId, d.id);
    const bestTxt = b ? `🏆 ${b.score} · ${b.correct}/${QUESTIONS_PER_RUN}` : "—";
    return `<button class="diffrow" data-diff="${d.id}">
      <span class="diffrow-name">${d.emoji} ${d.name}</span>
      <span class="diffrow-meta">${d.time}s/q · <span class="diffrow-best">${bestTxt}</span></span>
    </button>`;
  }).join("");
  const voiceNote = VOICE.enabled && VOICE.supported
    ? `<div class="sheet-voice">🎤 Voice is ON — no multiple choice, questions are read aloud. Yell your answers!</div>` : "";
  const ov = document.createElement("div");
  ov.className = "overlay";
  ov.innerHTML = `
    <div class="sheet">
      <div class="sheet-head">
        <span class="sheet-title">${cat.emoji} ${cat.name}</span>
        <button class="sheet-close" aria-label="Close">✕</button>
      </div>
      <div class="sheet-sub">Choose your difficulty:</div>
      ${rows}
      ${voiceNote}
    </div>`;
  document.body.appendChild(ov);
  const close = () => ov.remove();
  ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
  ov.querySelector(".sheet-close").addEventListener("click", close);
  ov.querySelectorAll(".diffrow").forEach(b =>
    b.addEventListener("click", () => {
      close();
      startRun(catId, parseInt(b.dataset.diff, 10));
    }));
}

function startRun(catId, diff){
  S.cat = catId;
  S.diff = diff;
  S.voice = VOICE.enabled && VOICE.supported && !VOICE.micError;
  S.qs = buildRun(catId, diff);
  S.idx = 0; S.score = 0; S.correct = 0; S.streak = 0; S.bestStreak = 0;
  showQuestion();
}

function showQuestion(){
  const q = S.qs[S.idx];
  S.locked = false;
  const diff = DIFFS.find(d => d.id === S.diff);
  S.timeMax = diff.time + (S.voice ? 8 : 0); // open answers need time to yell + recognize
  S.timeLeft = S.timeMax;

  // Voice mode is open-answer: no choices on screen, just yell it out.
  const optionsHtml = S.voice
    ? `<div class="openanswer">
        <div class="microw" id="micstate">🎤 <span class="mic-dot"></span> listening… <span id="heard" class="heard"></span></div>
        <div class="open-hint">No choices — yell the answer!</div>
      </div>`
    : q.kind === "mc"
    ? `<div class="opts">${q.options.map((o, i) =>
        `<button class="opt ${q.optClass || ""}" data-i="${i}"><span class="opt-key">${i + 1}</span>${esc(o)}</button>`
      ).join("")}</div>`
    : `<form id="mathform" class="mathform" autocomplete="off">
        <input id="mathin" type="text" inputmode="numeric" pattern="-?[0-9]*" placeholder="?" autofocus>
        <button type="submit" class="btn go">Lock it in ✅</button>
      </form>`;

  $("#screen").innerHTML = `
    <section class="quiz">
      <div class="hud">
        <span class="hud-q">Q ${S.idx + 1}/${QUESTIONS_PER_RUN}</span>
        <span class="hud-streak ${S.streak >= 3 ? "hot" : ""}">🔥 ${S.streak}</span>
        <span class="hud-score">⭐ ${S.score}</span>
      </div>
      <div class="timer"><div class="timer-fill" id="tfill"></div></div>
      <div class="qcard">
        <div class="qbig ${q.bigClass || ""}">${esc(q.big)}</div>
        <div class="qprompt">${esc(q.prompt)}</div>
        ${q.sub ? `<div class="qsub">${esc(q.sub)}</div>` : ""}
        ${optionsHtml}
        <div class="feedback" id="feedback"></div>
      </div>
    </section>`;

  if (!S.voice){
    if (q.kind === "mc"){
      document.querySelectorAll(".opt").forEach(b =>
        b.addEventListener("click", () => answerMC(parseInt(b.dataset.i, 10))));
    } else {
      $("#mathform").addEventListener("submit", (e) => {
        e.preventDefault();
        answerInput($("#mathin").value);
      });
      $("#mathin").focus();
    }
  }

  if (S.voice){
    // read the question aloud, then start the clock and the mic
    const say = q.speak || (q.prompt + (q.sub ? ". " + q.sub.replace(/[“”]/g, "") : ""));
    speak(say, () => {
      if (S.qs[S.idx] !== q || S.locked) return;
      startTimer();
      startListening();
    });
  } else {
    startTimer();
  }
}

function startTimer(){
  clearInterval(S.timerId);
  const fill = $("#tfill");
  if (!fill) return;
  fill.style.width = "100%";
  S.timerId = setInterval(() => {
    S.timeLeft -= 0.1;
    const frac = Math.max(0, S.timeLeft / S.timeMax);
    fill.style.width = (frac * 100) + "%";
    fill.classList.toggle("low", frac < 0.3);
    if (S.timeLeft <= 0){
      clearInterval(S.timerId);
      onTimeout();
    }
  }, 100);
}

function points(){
  return 100 + Math.ceil(Math.max(0, S.timeLeft)) * 5 + Math.min(S.streak, 10) * 10;
}

function answerMC(i){
  if (S.locked) return;
  S.locked = true;
  clearInterval(S.timerId);
  stopListening();
  const q = S.qs[S.idx];
  const btns = document.querySelectorAll(".opt");
  const right = i === q.answer;
  btns.forEach((b, bi) => {
    b.disabled = true;
    if (bi === q.answer) b.classList.add("right");
    else if (bi === i) b.classList.add("wrong");
    else b.classList.add("faded");
  });
  settle(right, q);
}

function answerInput(val){
  if (S.locked) return;
  S.locked = true;
  clearInterval(S.timerId);
  stopListening();
  const q = S.qs[S.idx];
  const right = parseInt(String(val).trim(), 10) === q.answer;
  const inp = $("#mathin");
  if (inp){
    if (inp.value === "") inp.value = String(val);
    inp.disabled = true;
    inp.classList.add(right ? "in-right" : "in-wrong");
  }
  settle(right, q);
}

function onTimeout(){
  if (S.locked) return;
  S.locked = true;
  stopListening();
  const q = S.qs[S.idx];
  if (q.kind === "mc"){
    document.querySelectorAll(".opt").forEach((b, bi) => {
      b.disabled = true;
      if (bi === q.answer) b.classList.add("right"); else b.classList.add("faded");
    });
  } else {
    const inp = $("#mathin");
    if (inp){ inp.disabled = true; inp.classList.add("in-wrong"); }
  }
  settle(false, q, true);
}

function answerText(q){
  return q.kind === "mc" ? String(q.options[q.answer]) : String(q.answer);
}

function settle(right, q, timedOut){
  const fb = $("#feedback");
  // in open-answer voice mode, reveal the answer big on screen
  const reveal = S.voice ? `<div class="fb-answer">${esc(answerText(q))}</div>` : "";
  if (right){
    const p = points();
    S.score += p;
    S.correct += 1;
    S.streak += 1;
    S.bestStreak = Math.max(S.bestStreak, S.streak);
    const yells = ["LET'S GO! 🎉","BIG BRAIN 🧠","SHEEEESH 🔥","EASY MONEY 💸","TOO SMART 😤","CERTIFIED ✅"];
    fb.innerHTML = `<div class="fb ok">${rand(yells)} +${p}</div>${reveal}<div class="fb-fact">${esc(q.fact)}</div>`;
    if (S.voice) speak(S.streak >= 3 ? `Correct! ${S.streak} in a row!` : "Correct!");
  } else {
    S.streak = 0;
    const heading = timedOut ? "TIME'S UP ⏰" : "NOT QUITE 😬";
    fb.innerHTML = `<div class="fb no">${heading}</div>${reveal}<div class="fb-fact">${esc(q.fact)}</div>`;
    if (S.voice) speak(`${timedOut ? "Time's up!" : "Nope!"} The answer was ${answerText(q)}.`);
  }
  const delay = S.voice ? (right ? 2000 : 3200) : (right ? 1300 : 2100);
  setTimeout(() => {
    S.idx += 1;
    if (S.idx >= S.qs.length) showResults();
    else showQuestion();
  }, delay);
}

/* ---------------- Results ---------------- */
function verdict(correct){
  if (correct === QUESTIONS_PER_RUN) return {g:"S", e:"💯", t:"PERFECT RUN — Certified Genius", s:"The tutor has nothing left to teach you."};
  if (correct >= 8) return {g:"A", e:"🧠", t:"Dean's List", s:"Big brain energy. One more run for the perfect score?"};
  if (correct >= 6) return {g:"B", e:"📚", t:"Solidly Passing", s:"Respectable. The library is calling though."};
  if (correct >= 4) return {g:"C", e:"😬", t:"Office Hours Needed", s:"We have some reviewing to do."};
  if (correct >= 2) return {g:"D", e:"🫠", t:"Barely Hanging On", s:"Hey, at least you showed up to class."};
  return {g:"F", e:"💀", t:"See Me After Class", s:"Follow the streak and get smarter. Run it back."};
}

function showResults(){
  clearInterval(S.timerId);
  stopListening();
  const cat = CATS.find(c => c.id === S.cat);
  const diff = DIFFS.find(d => d.id === S.diff);
  const v = verdict(S.correct);
  const run = { score:S.score, correct:S.correct, streak:S.bestStreak };
  const isBest = saveBest(S.cat, S.diff, run);
  $("#screen").innerHTML = `
    <section class="results">
      <div class="grade grade-${v.g}">${v.g}</div>
      <div class="verdict">${v.e} ${v.t}</div>
      <div class="verdict-sub">${v.s}</div>
      <div class="statrow">
        <div class="stat"><div class="stat-n">${S.score}</div><div class="stat-l">score</div></div>
        <div class="stat"><div class="stat-n">${S.correct}/${QUESTIONS_PER_RUN}</div><div class="stat-l">correct</div></div>
        <div class="stat"><div class="stat-n">🔥 ${S.bestStreak}</div><div class="stat-l">best streak</div></div>
      </div>
      ${isBest ? `<div class="newbest">🏆 New personal best for ${cat.emoji} ${cat.name} (${diff.name})!</div>` : ""}
      <div class="btnrow">
        <button class="btn go" id="again">Run it back 🔁</button>
        <button class="btn" id="harder" ${S.diff >= 4 ? "disabled" : ""}>Level up ${S.diff < 4 ? DIFFS[S.diff].emoji : "💀"}</button>
        <button class="btn" id="home">Categories 📚</button>
        <button class="btn" id="share">Share score 📋</button>
      </div>
    </section>`;
  $("#again").addEventListener("click", () => startRun(S.cat, S.diff));
  const harder = $("#harder");
  if (harder && S.diff < 4) harder.addEventListener("click", () => startRun(S.cat, S.diff + 1));
  $("#home").addEventListener("click", showHome);
  $("#share").addEventListener("click", () => {
    const txt = `Quiz U ${cat.emoji} ${cat.name} (${diff.emoji} ${diff.name}): grade ${v.g} — ${S.correct}/${QUESTIONS_PER_RUN}, score ${S.score}, streak 🔥${S.bestStreak}. Think you can beat me?`;
    const btn = $("#share");
    const done = () => { btn.textContent = "Copied! ✅"; setTimeout(() => btn.textContent = "Share score 📋", 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(done, () => { window.prompt("Copy your score:", txt); });
    } else {
      window.prompt("Copy your score:", txt);
    }
  });
  if (S.voice) speak(`Final grade: ${v.g}. ${v.t}. You got ${S.correct} out of ${QUESTIONS_PER_RUN}.`);
  if (S.correct === QUESTIONS_PER_RUN) confetti();
}

function confetti(){
  const bits = ["🎉","⭐","🧠","🔥","💯","📚"];
  for (let i = 0; i < 36; i++){
    const s = document.createElement("span");
    s.className = "confetti";
    s.textContent = rand(bits);
    s.style.left = (Math.random() * 100) + "vw";
    s.style.animationDelay = (Math.random() * 0.9) + "s";
    s.style.fontSize = (16 + Math.random() * 22) + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3500);
  }
}

/* ---------------- Keyboard shortcuts: 1–4 answer MC ---------------- */
document.addEventListener("keydown", (e) => {
  if (e.target && e.target.tagName === "INPUT") return;
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= 4){
    const btns = document.querySelectorAll(".opt");
    if (btns.length && !S.locked && btns[n - 1]) btns[n - 1].click();
  }
});

$("#logo").addEventListener("click", showHome);
showHome();
