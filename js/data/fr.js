// Kursinnehåll: franska (A1 till A2). Allt innehåll är egenskrivet.
//
// Format för att hålla filen kort:
//   w: ord,      "franska=svenska|franska=svenska|..."
//   s: meningar, "franska=svenska|..."
//   d: dialog,   "Namn: replik=översättning|..."
//   g: grammatik { h: rubrik, p: förklaring, t: tabell "vänster=höger|..." }
//   u: uttalstips
// Varje enhet har också skrivuppgifter (write) och frågor att svara på (qa).

window.COURSES = window.COURSES || {};
window.COURSES.fr = {
  id: 'fr',
  name: 'Franska',
  native: 'Français',
  code: 'FR',
  tts: 'fr-FR',
  units: [
    {
      title: 'Hälsa och presentera dig', level: 'A1',
      lessons: [
        {
          t: 'Bonjour !', i: 'Hälsa, säga hej då och fråga hur någon mår.',
          d: "Léa: Bonjour ! Ça va ?=Hej! Hur är det?|Hugo: Ça va bien, merci. Et toi ?=Det är bra, tack. Och du?|Léa: Très bien !=Mycket bra!|Hugo: Au revoir, Léa !=Hej då, Léa!",
          w: "bonjour=hej / god dag|salut=hej (bland vänner)|au revoir=hej då|merci=tack|ça va ?=hur är det?|bien=bra|très=mycket|et toi ?=och du?|bonsoir=god kväll|à bientôt=vi ses snart",
          s: "Bonjour, ça va ?=Hej, hur är det?|Ça va bien, merci.=Det är bra, tack.|Très bien, et toi ?=Mycket bra, och du?|Au revoir et à bientôt !=Hej då och vi ses snart!",
          g: { h: 'Salut eller bonjour?', p: 'Bonjour fungerar alltid. Salut säger du bara till vänner och familj. På kvällen säger man bonsoir.', t: 'bonjour=till alla, dagtid|salut=till vänner|bonsoir=på kvällen' },
          u: 'I bonjour uttalas inte slutets r särskilt hårt, och n:et i bon blir ett nasalt ljud.'
        },
        {
          t: 'Je m\'appelle…', i: 'Säga vad du heter och fråga andra.',
          w: "je=jag|tu=du|je m'appelle=jag heter|tu t'appelles comment ?=vad heter du?|enchanté=trevligt att träffas|moi=jag (betonat)|oui=ja|non=nej",
          s: "Je m'appelle Edvin.=Jag heter Edvin.|Tu t'appelles comment ?=Vad heter du?|Moi, je m'appelle Léa.=Jag heter Léa.|Enchanté, Léa !=Trevligt att träffas, Léa!",
          g: { h: "S'appeler", p: "Fransmän säger bokstavligen 'jag kallar mig'. Je m'appelle betyder alltså jag heter.", t: "je m'appelle=jag heter|tu t'appelles=du heter|il / elle s'appelle=han / hon heter" },
          u: 'Enchanté uttalas ungefär "ang-shang-tej".'
        },
        {
          t: 'Tu ou vous ?', i: 'När säger man du och när säger man ni?',
          w: "vous=ni / du (artigt)|monsieur=herr|madame=fru|s'il vous plaît=tack / snälla (artigt)|s'il te plaît=snälla (till en vän)|pardon=förlåt|excusez-moi=ursäkta mig|de rien=ingen orsak",
          s: "Bonjour, madame.=God dag, frun.|Excusez-moi, monsieur.=Ursäkta mig, herrn.|Merci beaucoup !=Tack så mycket!|De rien.=Ingen orsak.",
          g: { h: 'Tu eller vous', p: 'Tu används till vänner, familj och barn. Vous används till främlingar, äldre och i butiker, och när man pratar med flera personer.', t: 'tu=en vän, ett barn|vous=en främling, artigt|vous=flera personer' },
          u: 'I vous uttalas inte s:et: "vo".'
        }
      ],
      write: [
        { q: 'Presentera dig: hälsa, säg vad du heter och fråga hur det är.', kw: ["bonjour", "m'appelle", "ça va"], ex: "Bonjour ! Je m'appelle Edvin. Ça va ?" }
      ],
      qa: [
        { q: "Tu t'appelles comment ?", sv: 'Vad heter du?', kw: ["m'appelle"], ex: "Je m'appelle Edvin." },
        { q: 'Ça va ?', sv: 'Hur är det?', kw: ['va'], ex: 'Ça va bien, merci.' }
      ]
    },
    {
      title: 'Var kommer du ifrån?', level: 'A1',
      lessons: [
        {
          t: 'Je suis suédois', i: 'Säga varifrån du kommer med verbet être.',
          d: "Hugo: Tu es d'où ?=Var kommer du ifrån?|Edvin: Je suis suédois. Et toi ?=Jag är svensk. Och du?|Hugo: Je suis français, de Lyon.=Jag är fransk, från Lyon.",
          w: "être=att vara|je suis=jag är|tu es=du är|il est=han är|elle est=hon är|suédois=svensk (han)|suédoise=svensk (hon)|français=fransk (han)|française=fransk (hon)|d'où ?=varifrån?",
          s: "Je suis suédois.=Jag är svensk.|Elle est française.=Hon är fransk.|Tu es d'où ?=Var kommer du ifrån?|Il est très gentil.=Han är väldigt snäll.",
          g: { h: 'Verbet être', p: 'Être betyder att vara. Det är oregelbundet, så lär dig formerna utantill.', t: 'je suis=jag är|tu es=du är|il / elle est=han / hon är|nous sommes=vi är|vous êtes=ni är|ils / elles sont=de är' },
          u: 'Est uttalas bara "e". S och t hörs inte.'
        },
        {
          t: 'Les pays', i: 'Länder och var man bor.',
          w: "la Suède=Sverige|la France=Frankrike|l'Espagne=Spanien|l'Angleterre=England|j'habite=jag bor|à Paris=i Paris|en France=i Frankrike|le pays=landet|la ville=staden",
          s: "J'habite en Suède.=Jag bor i Sverige.|J'habite à Stockholm.=Jag bor i Stockholm.|La France est un beau pays.=Frankrike är ett vackert land.|Paris est une grande ville.=Paris är en stor stad.",
          g: { h: 'À eller en', p: 'Före en stad använder du à. Före de flesta länder använder du en.', t: "à Paris=i Paris|à Stockholm=i Stockholm|en France=i Frankrike|en Suède=i Sverige" },
          u: "I j'habite hörs inte h:et."
        },
        {
          t: 'Les langues', i: 'Prata om språk du kan.',
          w: "parler=att prata|je parle=jag pratar|le suédois=svenska (språket)|le français=franska (språket)|l'anglais=engelska|un peu=lite|bien=bra|aussi=också|la langue=språket",
          s: "Je parle suédois.=Jag pratar svenska.|Je parle un peu français.=Jag pratar lite franska.|Tu parles anglais ?=Pratar du engelska?|Je parle aussi anglais.=Jag pratar också engelska.",
          g: { h: 'Språk skrivs med liten bokstav', p: 'På franska skrivs språk och nationaliteter som adjektiv med liten bokstav: le français, suédois. Länder skrivs med stor: la France.', t: 'le français=språket|un Français=en fransman|la France=landet' },
          u: 'Parle uttalas "parl". Slutets e hörs inte.'
        }
      ],
      write: [
        { q: 'Skriv var du kommer ifrån, var du bor och vilka språk du pratar.', kw: ['suis', "j'habite", 'parle'], ex: "Je suis suédois. J'habite à Stockholm. Je parle suédois et un peu français." }
      ],
      qa: [
        { q: "Tu es d'où ?", sv: 'Var kommer du ifrån?', kw: ['suis'], ex: 'Je suis suédois.' },
        { q: 'Tu parles français ?', sv: 'Pratar du franska?', kw: ['parle'], ex: 'Oui, je parle un peu français.' }
      ]
    },
    {
      title: 'Siffror och ålder', level: 'A1',
      lessons: [
        {
          t: 'Un, deux, trois', i: 'Siffrorna 0 till 10.',
          w: "zéro=noll|un=ett|deux=två|trois=tre|quatre=fyra|cinq=fem|six=sex|sept=sju|huit=åtta|neuf=nio|dix=tio",
          s: "J'ai deux chats.=Jag har två katter.|Il y a trois livres.=Det finns tre böcker.|Un, deux, trois, partez !=Ett, två, tre, kör!|J'ai dix euros.=Jag har tio euro.",
          g: { h: 'Il y a', p: 'Il y a betyder det finns. Det ändras aldrig, oavsett hur många saker det gäller.', t: 'il y a un chat=det finns en katt|il y a deux chats=det finns två katter' },
          u: 'Sept uttalas "sett". P:et hörs inte.'
        },
        {
          t: 'Onze à vingt', i: 'Siffrorna 11 till 20.',
          w: "onze=elva|douze=tolv|treize=tretton|quatorze=fjorton|quinze=femton|seize=sexton|dix-sept=sjutton|dix-huit=arton|dix-neuf=nitton|vingt=tjugo",
          s: "J'ai douze ans.=Jag är tolv år.|Il y a vingt élèves.=Det finns tjugo elever.|Elle a seize ans.=Hon är sexton år.|Quinze euros, s'il vous plaît.=Femton euro, tack.",
          g: { h: 'Från 17 räknar man ihop', p: '17, 18 och 19 byggs som tio-sju, tio-åtta och tio-nio med bindestreck.', t: 'dix-sept=17|dix-huit=18|dix-neuf=19' },
          u: 'Vingt uttalas "vang", med nasalt ljud. G och t hörs inte.'
        },
        {
          t: "J'ai … ans", i: 'Säga hur gammal du är med verbet avoir.',
          w: "avoir=att ha|j'ai=jag har|tu as=du har|il a=han har|elle a=hon har|l'âge=åldern|quel âge ?=hur gammal?|ans=år|le frère=brodern|la sœur=systern",
          s: "J'ai vingt ans.=Jag är tjugo år.|Tu as quel âge ?=Hur gammal är du?|Ma sœur a quinze ans.=Min syster är femton år.|Il a un frère.=Han har en bror.",
          g: { h: 'Ålder med avoir', p: 'På franska har man år i stället för att vara år. Säg aldrig je suis vingt ans.', t: "j'ai=jag har|tu as=du har|il / elle a=han / hon har|nous avons=vi har|vous avez=ni har|ils / elles ont=de har" },
          u: 'Ans uttalas "ang", nasalt.'
        }
      ],
      write: [
        { q: 'Skriv hur gammal du är och hur gamla dina syskon eller vänner är.', kw: ["j'ai", 'ans'], ex: "J'ai vingt ans. Ma sœur a seize ans." }
      ],
      qa: [
        { q: 'Tu as quel âge ?', sv: 'Hur gammal är du?', kw: ['ans'], ex: "J'ai vingt ans." },
        { q: 'Tu as un frère ?', sv: 'Har du en bror?', kw: ['frère'], ex: "Oui, j'ai un frère." }
      ]
    },
    {
      title: 'Familjen', level: 'A1',
      lessons: [
        {
          t: 'Ma famille', i: 'Familjemedlemmar.',
          d: "Léa: C'est qui ?=Vem är det?|Hugo: C'est ma mère et mon père.=Det är min mamma och min pappa.|Léa: Et lui ?=Och han?|Hugo: C'est mon petit frère.=Det är min lillebror.",
          w: "la famille=familjen|la mère=mamman|le père=pappan|les parents=föräldrarna|le fils=sonen|la fille=dottern / flickan|le grand-père=farfar / morfar|la grand-mère=farmor / mormor|c'est=det är",
          s: "C'est ma mère.=Det är min mamma.|Mon père s'appelle Paul.=Min pappa heter Paul.|J'aime ma famille.=Jag älskar min familj.|Mes parents habitent à Lyon.=Mina föräldrar bor i Lyon.",
          g: { h: 'Mon, ma, mes', p: 'Min heter mon före maskulina ord, ma före feminina och mes i plural.', t: 'mon père=min pappa|ma mère=min mamma|mes parents=mina föräldrar' },
          u: 'Fille uttalas "fij". Dubbel-l blir ofta ett j-ljud.'
        },
        {
          t: 'Le, la, les', i: 'Bestämd form och genus.',
          w: "le garçon=pojken|la femme=kvinnan / frun|l'homme=mannen|l'enfant=barnet|les enfants=barnen|le bébé=bebisen|le mari=maken|la cousine=kusinen (hon)",
          s: "Le garçon a sept ans.=Pojken är sju år.|La femme est française.=Kvinnan är fransk.|Les enfants sont gentils.=Barnen är snälla.|L'homme parle anglais.=Mannen pratar engelska.",
          g: { h: 'Genus', p: 'Alla franska substantiv är antingen maskulina (le) eller feminina (la). Före vokal blir båda l\'. I plural är det alltid les.', t: "le=maskulint|la=feminint|l'=före vokal|les=plural" },
          u: "I l'homme hörs inte h:et: \"lomm\"."
        },
        {
          t: 'Les animaux', i: 'Husdjur och obestämd form.',
          w: "un chat=en katt|un chien=en hund|un oiseau=en fågel|un poisson=en fisk|un cheval=en häst|une souris=en mus|des=några (plural)|petit=liten|grand=stor",
          s: "J'ai un chat.=Jag har en katt.|Elle a un petit chien.=Hon har en liten hund.|Il y a des poissons.=Det finns några fiskar.|Le cheval est grand.=Hästen är stor.",
          g: { h: 'Un, une, des', p: 'En och ett heter un före maskulina ord och une före feminina. I plural används des.', t: 'un chat=en katt|une souris=en mus|des chats=katter' },
          u: 'Oiseau uttalas ungefär "oaso".'
        }
      ],
      write: [
        { q: 'Beskriv din familj eller ditt husdjur med två eller tre meningar.', kw: ['mon', 'ma', "j'ai"], ex: "Ma mère s'appelle Anna. Mon père a cinquante ans. J'ai un petit chien." }
      ],
      qa: [
        { q: 'Tu as un animal ?', sv: 'Har du ett husdjur?', kw: ['chat', 'chien', 'non', 'oui'], ex: "Oui, j'ai un chat." },
        { q: "Ta mère s'appelle comment ?", sv: 'Vad heter din mamma?', kw: ["s'appelle"], ex: "Ma mère s'appelle Anna." }
      ]
    },
    {
      title: 'Mat och dryck', level: 'A1',
      lessons: [
        {
          t: 'Au café', i: 'Beställa på kafé.',
          d: "Serveuse: Bonjour, vous désirez ?=Hej, vad önskar ni?|Edvin: Un café, s'il vous plaît.=En kaffe, tack.|Serveuse: Et avec ça ?=Något mer?|Edvin: Un croissant aussi.=En croissant också.",
          w: "le café=kaffet / kaféet|le thé=teet|l'eau=vattnet|le jus d'orange=apelsinjuicen|le croissant=croissanten|je voudrais=jag skulle vilja ha|l'addition=notan|avec=med|sans=utan",
          s: "Je voudrais un café.=Jag skulle vilja ha en kaffe.|Un thé sans sucre, s'il vous plaît.=Ett te utan socker, tack.|L'addition, s'il vous plaît.=Notan, tack.|Un croissant avec un jus d'orange.=En croissant med en apelsinjuice.",
          g: { h: 'Je voudrais', p: 'Je voudrais är det artiga sättet att beställa. Det låter mycket trevligare än je veux (jag vill).', t: 'je voudrais=jag skulle vilja|je veux=jag vill (rakt på)' },
          u: 'Voudrais uttalas "vodrä".'
        },
        {
          t: 'Manger et boire', i: 'Vanlig mat och -er-verb.',
          w: "manger=att äta|boire=att dricka|le pain=brödet|le fromage=osten|la pomme=äpplet|le poulet=kycklingen|le lait=mjölken|la viande=köttet|les légumes=grönsakerna",
          s: "Je mange du pain.=Jag äter bröd.|Tu manges une pomme ?=Äter du ett äpple?|Elle boit du lait.=Hon dricker mjölk.|Nous mangeons du poulet.=Vi äter kyckling.",
          g: { h: 'Verb på -er', p: 'De flesta franska verb slutar på -er och böjs likadant. Ta bort -er och lägg till ändelsen.', t: 'je mange=jag äter|tu manges=du äter|il / elle mange=han / hon äter|nous mangeons=vi äter|vous mangez=ni äter|ils mangent=de äter' },
          u: 'Mange, manges och mangent låter exakt likadant: "mangsch".'
        },
        {
          t: "J'aime le chocolat", i: 'Säga vad du gillar och inte gillar.',
          w: "aimer=att tycka om|j'aime=jag tycker om|je n'aime pas=jag tycker inte om|adorer=att älska|détester=att hata|le chocolat=chokladen|le poisson=fisken|le sucre=sockret|bon=god",
          s: "J'aime le chocolat.=Jag tycker om choklad.|Je n'aime pas le poisson.=Jag tycker inte om fisk.|J'adore le fromage !=Jag älskar ost!|C'est très bon.=Det är väldigt gott.",
          g: { h: 'Ne … pas', p: 'För att säga inte lägger man ne före verbet och pas efter. Ne blir n\' före vokal.', t: "j'aime=jag tycker om|je n'aime pas=jag tycker inte om|je mange=jag äter|je ne mange pas=jag äter inte" },
          u: "I j'aime binds j ihop med aime: \"schäm\"."
        }
      ],
      write: [
        { q: 'Beställ något på ett kafé och säg vad du tycker om.', kw: ['voudrais', "j'aime"], ex: "Bonjour, je voudrais un café et un croissant, s'il vous plaît. J'aime le chocolat." }
      ],
      qa: [
        { q: "Qu'est-ce que tu aimes manger ?", sv: 'Vad tycker du om att äta?', kw: ['aime', 'adore'], ex: "J'aime le poulet et le fromage." },
        { q: 'Tu bois du café ?', sv: 'Dricker du kaffe?', kw: ['bois', 'non', 'oui'], ex: 'Oui, je bois du café.' }
      ]
    },
    {
      title: 'Hemma', level: 'A1',
      lessons: [
        {
          t: 'La maison', i: 'Rum i hemmet.',
          w: "la maison=huset|l'appartement=lägenheten|la chambre=sovrummet|la cuisine=köket|le salon=vardagsrummet|la salle de bains=badrummet|le jardin=trädgården|la porte=dörren|la fenêtre=fönstret",
          s: "J'habite dans un appartement.=Jag bor i en lägenhet.|La cuisine est petite.=Köket är litet.|Ma chambre est grande.=Mitt sovrum är stort.|Il y a un jardin.=Det finns en trädgård.",
          g: { h: 'Adjektiv följer ordet', p: 'Adjektiv får -e när ordet är feminint: un petit salon men une petite cuisine.', t: 'petit=liten (mask.)|petite=liten (fem.)|grand=stor (mask.)|grande=stor (fem.)' },
          u: 'I petite hörs t:et. I petit gör det inte.'
        },
        {
          t: 'Les meubles', i: 'Möbler och var saker finns.',
          w: "la table=bordet|la chaise=stolen|le lit=sängen|le canapé=soffan|l'armoire=garderoben|sur=på|sous=under|dans=i|à côté de=bredvid",
          s: "Le chat est sur le lit.=Katten är på sängen.|Le chien est sous la table.=Hunden är under bordet.|Le livre est dans l'armoire.=Boken är i garderoben.|La chaise est à côté de la table.=Stolen är bredvid bordet.",
          g: { h: 'Var är det?', p: 'Prepositionerna sur, sous och dans står före det bestämda ordet: sur la table.', t: 'sur=på|sous=under|dans=i|devant=framför|derrière=bakom' },
          u: 'Sur och sous är lätta att blanda ihop: sur har ett y-ljud, sous ett o-ljud.'
        },
        {
          t: 'Les couleurs', i: 'Färger.',
          w: "rouge=röd|bleu=blå|vert=grön|jaune=gul|noir=svart|blanc=vit|gris=grå|rose=rosa|la couleur=färgen",
          s: "La porte est rouge.=Dörren är röd.|J'ai un canapé bleu.=Jag har en blå soffa.|Le chat est noir.=Katten är svart.|Ma couleur préférée est le vert.=Min favoritfärg är grön.",
          g: { h: 'Färger står efter', p: 'Färger står nästan alltid efter substantivet: une voiture rouge, en röd bil.', t: 'un lit blanc=en vit säng|une table blanche=ett vitt bord|des chaises vertes=gröna stolar' },
          u: 'Jaune uttalas "schon".'
        }
      ],
      write: [
        { q: 'Beskriv ditt rum: vilka möbler finns och vilka färger har de?', kw: ['chambre', 'il y a'], ex: "Ma chambre est petite. Il y a un lit bleu et une table blanche." }
      ],
      qa: [
        { q: "Tu habites dans une maison ou un appartement ?", sv: 'Bor du i ett hus eller en lägenhet?', kw: ['habite'], ex: "J'habite dans un appartement." },
        { q: 'Quelle est ta couleur préférée ?', sv: 'Vilken är din favoritfärg?', kw: ['bleu', 'rouge', 'vert', 'noir', 'jaune', 'rose', 'blanc', 'gris'], ex: 'Ma couleur préférée est le bleu.' }
      ]
    },
    {
      title: 'I staden', level: 'A1',
      lessons: [
        {
          t: 'En ville', i: 'Platser i staden.',
          d: "Touriste: Pardon, où est la gare ?=Ursäkta, var är stationen?|Femme: C'est tout droit, à gauche.=Det är rakt fram, till vänster.|Touriste: Merci beaucoup !=Tack så mycket!",
          w: "la gare=stationen|le magasin=affären|la banque=banken|l'école=skolan|le musée=museet|la rue=gatan|le restaurant=restaurangen|la pharmacie=apoteket|où est… ?=var är…?",
          s: "Où est la gare ?=Var är stationen?|Le musée est dans la rue.=Museet är på gatan.|Il y a une pharmacie ici ?=Finns det ett apotek här?|L'école est grande.=Skolan är stor.",
          g: { h: 'Où est … ?', p: 'Où est betyder var är. Lägg till platsen efter: où est la banque ?', t: 'où est la gare ?=var är stationen?|où sont les toilettes ?=var är toaletten?' },
          u: 'Où uttalas "o". Accenten skiljer det från ou (eller).'
        },
        {
          t: 'Le chemin', i: 'Fråga om och förklara vägen.',
          w: "à gauche=till vänster|à droite=till höger|tout droit=rakt fram|près=nära|loin=långt|ici=här|là-bas=där borta|tourner=att svänga|aller=att gå / åka",
          s: "Tournez à gauche.=Sväng vänster.|C'est tout droit.=Det är rakt fram.|La banque est près d'ici.=Banken ligger nära härifrån.|C'est loin ?=Är det långt?",
          g: { h: 'Verbet aller', p: 'Aller betyder att gå eller åka och är oregelbundet.', t: 'je vais=jag går|tu vas=du går|il / elle va=han / hon går|nous allons=vi går|vous allez=ni går|ils vont=de går' },
          u: 'Droite uttalas "droatt".'
        },
        {
          t: 'Les transports', i: 'Ta sig fram.',
          w: "le bus=bussen|le train=tåget|le métro=tunnelbanan|la voiture=bilen|le vélo=cykeln|à pied=till fots|le billet=biljetten|prendre=att ta",
          s: "Je prends le métro.=Jag tar tunnelbanan.|Elle va à l'école à pied.=Hon går till skolan till fots.|Un billet, s'il vous plaît.=En biljett, tack.|Nous prenons le train.=Vi tar tåget.",
          g: { h: 'En eller à', p: 'Fordon man sitter i tar en: en bus, en voiture. Saker man sitter på tar à: à vélo, à pied.', t: 'en bus=med buss|en train=med tåg|à vélo=med cykel|à pied=till fots' },
          u: 'Train uttalas "trang", nasalt.'
        }
      ],
      write: [
        { q: 'Förklara vägen från stationen till ett kafé.', kw: ['gauche', 'droite', 'tout droit'], ex: "Tournez à gauche, puis à droite. Le café est tout droit." }
      ],
      qa: [
        { q: "Tu vas à l'école comment ?", sv: 'Hur tar du dig till skolan?', kw: ['bus', 'vélo', 'pied', 'métro', 'voiture', 'train'], ex: "Je vais à l'école à vélo." },
        { q: 'Où est la gare ?', sv: 'Var är stationen?', kw: ['gauche', 'droite', 'droit', 'près', 'loin'], ex: "C'est tout droit, près d'ici." }
      ]
    },
    {
      title: 'Tid och väder', level: 'A1',
      lessons: [
        {
          t: 'Les jours', i: 'Veckans dagar.',
          w: "lundi=måndag|mardi=tisdag|mercredi=onsdag|jeudi=torsdag|vendredi=fredag|samedi=lördag|dimanche=söndag|aujourd'hui=idag|demain=imorgon|la semaine=veckan",
          s: "Aujourd'hui, c'est lundi.=Idag är det måndag.|Demain, c'est mardi.=Imorgon är det tisdag.|Le samedi, je joue au foot.=På lördagar spelar jag fotboll.|La semaine a sept jours.=Veckan har sju dagar.",
          g: { h: 'Le före dagen', p: 'Le lundi betyder på måndagar (varje måndag). Lundi utan le betyder nu på måndag.', t: 'lundi=på måndag (en gång)|le lundi=på måndagar (varje)' },
          u: 'Jeudi uttalas ungefär "schödi".'
        },
        {
          t: "Quelle heure est-il ?", i: 'Klockan.',
          w: "l'heure=timmen / klockan|il est … heures=klockan är …|et demie=halv (efter)|et quart=kvart över|moins le quart=kvart i|midi=klockan tolv (dag)|minuit=midnatt|le matin=morgonen|le soir=kvällen",
          s: "Quelle heure est-il ?=Vad är klockan?|Il est trois heures.=Klockan är tre.|Il est huit heures et demie.=Klockan är halv nio.|Il est midi.=Klockan är tolv.",
          g: { h: 'Halv efter', p: 'Franskan räknar halv efter timmen: huit heures et demie är 8.30, alltså halv nio på svenska.', t: 'deux heures=2.00|deux heures et quart=2.15|deux heures et demie=2.30|trois heures moins le quart=2.45' },
          u: 'Heure uttalas "ör". H:et hörs inte.'
        },
        {
          t: 'La météo', i: 'Prata om vädret.',
          w: "il fait beau=det är fint väder|il fait chaud=det är varmt|il fait froid=det är kallt|il pleut=det regnar|il neige=det snöar|le soleil=solen|le vent=vinden|l'été=sommaren|l'hiver=vintern",
          s: "Il fait beau aujourd'hui.=Det är fint väder idag.|En hiver, il fait froid.=På vintern är det kallt.|Il pleut beaucoup.=Det regnar mycket.|En été, il fait chaud.=På sommaren är det varmt.",
          g: { h: 'Il fait', p: 'Om vädret säger man oftast il fait + adjektiv. Bokstavligen: det gör fint.', t: 'il fait beau=fint väder|il fait chaud=varmt|il fait froid=kallt|il fait mauvais=dåligt väder' },
          u: 'Fait uttalas "fä".'
        }
      ],
      write: [
        { q: 'Skriv vilken dag det är, vad klockan är och hur vädret är.', kw: ["c'est", 'il est', 'il fait'], ex: "Aujourd'hui, c'est samedi. Il est dix heures. Il fait beau." }
      ],
      qa: [
        { q: "Quel jour on est aujourd'hui ?", sv: 'Vilken dag är det idag?', kw: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'], ex: "Aujourd'hui, c'est lundi." },
        { q: "Quel temps fait-il ?", sv: 'Hur är vädret?', kw: ['fait', 'pleut', 'neige'], ex: 'Il fait froid et il neige.' }
      ]
    },
    {
      title: 'Vardagen', level: 'A2',
      lessons: [
        {
          t: 'Ma journée', i: 'En vanlig dag och reflexiva verb.',
          w: "se réveiller=att vakna|se lever=att stiga upp|se doucher=att duscha|s'habiller=att klä på sig|se coucher=att gå och lägga sig|le petit-déjeuner=frukosten|le déjeuner=lunchen|le dîner=middagen|tôt=tidigt|tard=sent",
          s: "Je me réveille à sept heures.=Jag vaknar klockan sju.|Je me lève tôt.=Jag stiger upp tidigt.|Elle se couche tard.=Hon går och lägger sig sent.|Je prends le petit-déjeuner.=Jag äter frukost.",
          g: { h: 'Reflexiva verb', p: 'Verb med se gör man med sig själv. Se byts ut beroende på vem som gör det.', t: 'je me lève=jag stiger upp|tu te lèves=du stiger upp|il / elle se lève=han / hon stiger upp|nous nous levons=vi stiger upp|vous vous levez=ni stiger upp' },
          u: 'Me, te och se uttalas med ett kort ö-ljud.'
        },
        {
          t: 'Au travail', i: 'Skola, jobb och yrken.',
          w: "travailler=att arbeta|étudier=att studera|le travail=arbetet|le bureau=kontoret|le professeur=läraren|le médecin=läkaren|l'étudiant=studenten|le cours=lektionen / kursen|commencer=att börja|finir=att sluta",
          s: "Je travaille dans un bureau.=Jag arbetar på ett kontor.|Elle est médecin.=Hon är läkare.|Le cours commence à neuf heures.=Lektionen börjar klockan nio.|Nous étudions le français.=Vi studerar franska.",
          g: { h: 'Yrken utan un', p: 'När du säger vad någon jobbar med används ingen artikel: elle est médecin, inte elle est une médecin.', t: 'je suis étudiant=jag är student|il est professeur=han är lärare' },
          u: 'Travaille uttalas "travaj".'
        },
        {
          t: 'Souvent ou jamais ?', i: 'Hur ofta du gör saker.',
          w: "toujours=alltid|souvent=ofta|parfois=ibland|rarement=sällan|jamais=aldrig|tous les jours=varje dag|le week-end=helgen|d'abord=först|ensuite=sedan|enfin=till slut",
          s: "Je mange souvent des pâtes.=Jag äter ofta pasta.|Il ne boit jamais de café.=Han dricker aldrig kaffe.|D'abord, je me douche.=Först duschar jag.|Le week-end, je me lève tard.=På helgen stiger jag upp sent.",
          g: { h: 'Ne … jamais', p: 'Aldrig fungerar som ne … pas: ne före verbet och jamais efter.', t: 'je ne mange pas=jag äter inte|je ne mange jamais=jag äter aldrig' },
          u: 'Souvent uttalas "sovang".'
        }
      ],
      write: [
        { q: 'Beskriv din morgon med orden d\'abord, ensuite och enfin.', kw: ["d'abord", 'ensuite', 'enfin'], ex: "D'abord, je me réveille à sept heures. Ensuite, je me douche. Enfin, je prends le petit-déjeuner." }
      ],
      qa: [
        { q: 'Tu te lèves à quelle heure ?', sv: 'Vilken tid stiger du upp?', kw: ['lève', 'heure'], ex: 'Je me lève à sept heures.' },
        { q: 'Tu travailles ou tu étudies ?', sv: 'Jobbar du eller studerar du?', kw: ['travaille', 'étudie'], ex: "J'étudie à l'université." }
      ]
    },
    {
      title: 'Fritid', level: 'A2',
      lessons: [
        {
          t: 'Les loisirs', i: 'Hobbyer och intressen.',
          w: "le sport=sporten|la musique=musiken|le film=filmen|le livre=boken|lire=att läsa|écouter=att lyssna|regarder=att titta|jouer=att spela / leka|danser=att dansa|chanter=att sjunga",
          s: "J'aime lire des livres.=Jag tycker om att läsa böcker.|Il écoute de la musique.=Han lyssnar på musik.|Nous regardons un film.=Vi tittar på en film.|Elle aime danser.=Hon tycker om att dansa.",
          g: { h: 'Aimer + verb', p: 'Efter aimer kommer verbet i grundform, precis som på svenska: j\'aime lire, jag gillar att läsa.', t: "j'aime lire=jag gillar att läsa|je n'aime pas danser=jag gillar inte att dansa" },
          u: 'Écouter uttalas "ekote".'
        },
        {
          t: 'Le sport', i: 'Sporter och jouer à / faire de.',
          w: "le football=fotbollen|le tennis=tennisen|la natation=simningen|le ski=skidåkningen|courir=att springa|nager=att simma|faire du sport=att träna|l'équipe=laget|gagner=att vinna|perdre=att förlora",
          s: "Je joue au football.=Jag spelar fotboll.|Elle fait de la natation.=Hon simmar.|Notre équipe gagne !=Vårt lag vinner!|Je fais du ski en hiver.=Jag åker skidor på vintern.",
          g: { h: 'Jouer à och faire de', p: 'Bollsporter: jouer au. Andra sporter: faire du eller faire de la.', t: 'jouer au tennis=spela tennis|faire du ski=åka skidor|faire de la natation=simma' },
          u: 'Équipe uttalas "ekipp".'
        },
        {
          t: 'Inviter un ami', i: 'Bjuda in och tacka ja eller nej.',
          w: "tu veux… ?=vill du…?|on va… ?=ska vi…?|avec plaisir=gärna|d'accord=okej|désolé=förlåt / tyvärr|je ne peux pas=jag kan inte|ce soir=ikväll|le cinéma=bion|la fête=festen",
          s: "Tu veux aller au cinéma ?=Vill du gå på bio?|On va à la fête ce soir ?=Ska vi gå på festen ikväll?|Avec plaisir !=Gärna!|Désolé, je ne peux pas.=Tyvärr, jag kan inte.",
          g: { h: 'On', p: 'On betyder man, men i vardagligt tal betyder det ofta vi. On böjs som il.', t: 'on va=vi går / ska vi gå|on mange=vi äter' },
          u: "D'accord uttalas \"dakor\"."
        }
      ],
      write: [
        { q: 'Skriv ett kort sms och bjud in en vän till något.', kw: ['tu veux', 'ce soir'], ex: "Salut ! Tu veux aller au cinéma ce soir ? On va voir un film français." }
      ],
      qa: [
        { q: "Qu'est-ce que tu aimes faire le week-end ?", sv: 'Vad gillar du att göra på helgen?', kw: ['aime', 'joue', 'fais', 'regarde', 'lis'], ex: "J'aime jouer au football et regarder des films." },
        { q: 'Tu veux aller au cinéma ?', sv: 'Vill du gå på bio?', kw: ['plaisir', "d'accord", 'désolé', 'oui', 'non'], ex: 'Avec plaisir !' }
      ]
    },
    {
      title: 'Handla', level: 'A2',
      lessons: [
        {
          t: 'Les vêtements', i: 'Kläder.',
          w: "le pantalon=byxorna|la chemise=skjortan|la robe=klänningen|la jupe=kjolen|le pull=tröjan|la veste=jackan|les chaussures=skorna|le t-shirt=t-shirten|porter=att ha på sig",
          s: "Je porte un pull bleu.=Jag har på mig en blå tröja.|Elle porte une robe rouge.=Hon har på sig en röd klänning.|Mes chaussures sont noires.=Mina skor är svarta.|J'aime cette veste.=Jag gillar den här jackan.",
          g: { h: 'Ce, cette, ces', p: 'Den här heter ce före maskulina ord, cette före feminina och ces i plural.', t: 'ce pull=den här tröjan|cette robe=den här klänningen|ces chaussures=de här skorna' },
          u: 'Chemise uttalas "schömiz".'
        },
        {
          t: 'Au magasin', i: 'Fråga om pris och storlek.',
          w: "combien ?=hur mycket?|ça coûte…=det kostar…|cher=dyr|pas cher=billig|la taille=storleken|essayer=att prova|acheter=att köpa|payer=att betala|la carte=kortet",
          s: "Combien coûte ce pull ?=Hur mycket kostar den här tröjan?|C'est trop cher.=Det är för dyrt.|Je peux essayer ?=Kan jag prova?|Je paie par carte.=Jag betalar med kort.",
          g: { h: 'Pouvoir', p: 'Pouvoir betyder att kunna. Je peux + verb är bra för artiga frågor.', t: 'je peux=jag kan|tu peux=du kan|il / elle peut=han / hon kan|nous pouvons=vi kan|vous pouvez=ni kan' },
          u: 'Peux uttalas "pö".'
        },
        {
          t: 'Au marché', i: 'Handla mat och mängder.',
          w: "le marché=marknaden|un kilo de=ett kilo|un peu de=lite|beaucoup de=mycket|la tomate=tomaten|la fraise=jordgubben|la carotte=moroten|l'œuf=ägget|c'est tout=det är allt",
          s: "Un kilo de tomates, s'il vous plaît.=Ett kilo tomater, tack.|Je voudrais un peu de fromage.=Jag skulle vilja ha lite ost.|Il y a beaucoup de fraises.=Det finns mycket jordgubbar.|C'est tout, merci.=Det är allt, tack.",
          g: { h: 'Mängd + de', p: 'Efter mängdord blir det alltid bara de, aldrig du eller des.', t: 'un kilo de pommes=ett kilo äpplen|beaucoup de lait=mycket mjölk|un peu de sucre=lite socker' },
          u: 'Œuf uttalas "öff", men i plural (œufs) "ö".'
        }
      ],
      write: [
        { q: 'Du är i en klädaffär. Fråga vad något kostar och om du kan prova det.', kw: ['combien', 'essayer'], ex: "Bonjour ! Combien coûte cette veste ? Je peux essayer ?" }
      ],
      qa: [
        { q: "Qu'est-ce que tu portes aujourd'hui ?", sv: 'Vad har du på dig idag?', kw: ['porte'], ex: 'Je porte un pull noir et un pantalon bleu.' },
        { q: 'Tu paies comment ?', sv: 'Hur betalar du?', kw: ['carte', 'paie'], ex: 'Je paie par carte.' }
      ]
    },
    {
      title: 'Resor', level: 'A2',
      lessons: [
        {
          t: 'Les vacances', i: 'Semester och planer med aller + verb.',
          w: "les vacances=semestern / lovet|voyager=att resa|la plage=stranden|la mer=havet|la montagne=berget / fjällen|l'hôtel=hotellet|la valise=resväskan|le passeport=passet|visiter=att besöka",
          s: "Je vais voyager en France.=Jag ska resa till Frankrike.|Nous allons à la plage.=Vi ska till stranden.|Elle va visiter Paris.=Hon ska besöka Paris.|J'aime la montagne.=Jag gillar fjällen.",
          g: { h: 'Nära framtid', p: 'Aller + verb i grundform betyder ska göra något, precis som på svenska.', t: 'je vais manger=jag ska äta|tu vas voyager=du ska resa|on va partir=vi ska åka' },
          u: 'Vacances uttalas "vakangs".'
        },
        {
          t: "À l'hôtel", i: 'Boka och checka in.',
          w: "une chambre=ett rum|réserver=att boka|la nuit=natten|la clé=nyckeln|le petit-déjeuner compris=frukost ingår|l'ascenseur=hissen|libre=ledig|complet=fullbokat|la réception=receptionen",
          s: "J'ai une réservation.=Jag har en bokning.|Une chambre pour deux nuits.=Ett rum för två nätter.|Le petit-déjeuner est compris ?=Ingår frukost?|Voici votre clé.=Här är er nyckel.",
          g: { h: 'Voici och voilà', p: 'Voici betyder här är och voilà där är. I vardagen används voilà nästan alltid.', t: 'voici la clé=här är nyckeln|voilà !=varsågod / sådär!' },
          u: 'Clé uttalas "kle".'
        },
        {
          t: "Hier, j'ai visité…", i: 'Berätta om något som har hänt (passé composé).',
          w: "hier=igår|le week-end dernier=förra helgen|j'ai visité=jag besökte|j'ai mangé=jag åt|j'ai vu=jag såg|j'ai pris=jag tog|je suis allé=jag åkte / gick|c'était=det var|super=jättebra",
          s: "Hier, j'ai visité un musée.=Igår besökte jag ett museum.|J'ai mangé dans un restaurant.=Jag åt på en restaurang.|Je suis allé à Paris.=Jag åkte till Paris.|C'était super !=Det var jättebra!",
          g: { h: 'Passé composé', p: 'För att berätta vad du gjorde använder du avoir + verbets particip. Verb på -er får -é. Några rörelseverb använder être i stället.', t: "j'ai mangé=jag åt|tu as visité=du besökte|il a pris=han tog|je suis allé=jag åkte" },
          u: 'Mangé och manger låter likadant: "mangsche".'
        }
      ],
      write: [
        { q: 'Berätta vad du gjorde förra helgen med två eller tre meningar.', kw: ["j'ai", 'hier', "c'était"], ex: "Le week-end dernier, j'ai visité un musée. J'ai mangé une pizza. C'était super !" }
      ],
      qa: [
        { q: "Qu'est-ce que tu as fait hier ?", sv: 'Vad gjorde du igår?', kw: ["j'ai", 'suis'], ex: "Hier, j'ai regardé un film." },
        { q: 'Tu vas voyager cet été ?', sv: 'Ska du resa i sommar?', kw: ['vais', 'oui', 'non'], ex: 'Oui, je vais voyager en France.' }
      ]
    }
  ]
};
