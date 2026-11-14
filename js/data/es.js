// Kursinnehåll: spanska (A1 till A2). Allt innehåll är egenskrivet.
// Samma format som fr.js (se kommentaren där).

window.COURSES = window.COURSES || {};
window.COURSES.es = {
  id: 'es',
  name: 'Spanska',
  native: 'Español',
  code: 'ES',
  tts: 'es-ES',
  units: [
    {
      title: 'Hälsa och presentera dig', level: 'A1',
      lessons: [
        {
          t: '¡Hola!', i: 'Hälsa, säga hej då och fråga hur någon mår.',
          d: "Lucía: ¡Hola! ¿Qué tal?=Hej! Hur är det?|Pablo: Bien, gracias. ¿Y tú?=Bra, tack. Och du?|Lucía: Muy bien.=Mycket bra.|Pablo: ¡Adiós, Lucía!=Hej då, Lucía!",
          w: "hola=hej|buenos días=god morgon|buenas tardes=god eftermiddag|buenas noches=god kväll / god natt|adiós=hej då|gracias=tack|¿qué tal?=hur är det?|bien=bra|muy=mycket|hasta luego=vi ses",
          s: "Hola, ¿qué tal?=Hej, hur är det?|Muy bien, gracias.=Mycket bra, tack.|Buenos días, señora.=God morgon, frun.|Adiós, hasta luego.=Hej då, vi ses.",
          g: { h: 'Upp-och-ner-tecken', p: 'På spanska börjar frågor med ¿ och utrop med ¡. Det visar direkt att meningen är en fråga.', t: '¿Qué tal?=Hur är det?|¡Hola!=Hej!' },
          u: 'H hörs aldrig på spanska. Hola uttalas "ola".'
        },
        {
          t: 'Me llamo…', i: 'Säga vad du heter och fråga andra.',
          w: "yo=jag|tú=du|me llamo=jag heter|¿cómo te llamas?=vad heter du?|encantado=trevligt att träffas (man)|encantada=trevligt att träffas (kvinna)|sí=ja|no=nej|y=och",
          s: "Me llamo Edvin.=Jag heter Edvin.|¿Cómo te llamas?=Vad heter du?|Yo me llamo Lucía.=Jag heter Lucía.|Encantado, Lucía.=Trevligt att träffas, Lucía.",
          g: { h: 'Llamarse', p: 'Spanjorer säger bokstavligen jag kallar mig. Me llamo betyder alltså jag heter.', t: 'me llamo=jag heter|te llamas=du heter|se llama=han / hon heter' },
          u: 'Ll uttalas som j: "me jamo".'
        },
        {
          t: '¿Tú o usted?', i: 'Artigt och vardagligt tilltal.',
          w: "usted=ni / du (artigt)|señor=herr|señora=fru|por favor=snälla / tack|perdón=förlåt|disculpe=ursäkta mig|de nada=ingen orsak|muchas gracias=tack så mycket",
          s: "Disculpe, señor.=Ursäkta mig, herrn.|Un café, por favor.=En kaffe, tack.|Muchas gracias.=Tack så mycket.|De nada.=Ingen orsak.",
          g: { h: 'Tú eller usted', p: 'Tú används till vänner och jämnåriga, och är vanligast i Spanien. Usted är artigt och används till äldre och främlingar.', t: 'tú=vardagligt|usted=artigt' },
          u: 'Gracias uttalas "grathias" i Spanien och "grasias" i Latinamerika.'
        }
      ],
      write: [
        { q: 'Presentera dig: hälsa, säg vad du heter och fråga hur det är.', kw: ['hola', 'me llamo', 'qué tal'], ex: 'Hola, me llamo Edvin. ¿Qué tal?' }
      ],
      qa: [
        { q: '¿Cómo te llamas?', sv: 'Vad heter du?', kw: ['llamo'], ex: 'Me llamo Edvin.' },
        { q: '¿Qué tal?', sv: 'Hur är det?', kw: ['bien', 'mal'], ex: 'Muy bien, gracias.' }
      ]
    },
    {
      title: 'Var kommer du ifrån?', level: 'A1',
      lessons: [
        {
          t: 'Soy sueco', i: 'Säga varifrån du kommer med verbet ser.',
          d: "Pablo: ¿De dónde eres?=Var kommer du ifrån?|Edvin: Soy sueco. ¿Y tú?=Jag är svensk. Och du?|Pablo: Soy español, de Madrid.=Jag är spansk, från Madrid.",
          w: "ser=att vara|soy=jag är|eres=du är|es=han / hon är|sueco=svensk (han)|sueca=svensk (hon)|español=spansk (han)|española=spansk (hon)|¿de dónde?=varifrån?",
          s: "Soy sueco.=Jag är svensk.|Ella es española.=Hon är spansk.|¿De dónde eres?=Var kommer du ifrån?|Él es muy simpático.=Han är väldigt trevlig.",
          g: { h: 'Verbet ser', p: 'Ser betyder att vara och används för vem eller vad något är: ursprung, yrke och egenskaper.', t: 'yo soy=jag är|tú eres=du är|él / ella es=han / hon är|nosotros somos=vi är|vosotros sois=ni är|ellos son=de är' },
          u: 'Ñ i español uttalas som nj: "espanjol".'
        },
        {
          t: 'Los países', i: 'Länder och var man bor.',
          w: "Suecia=Sverige|España=Spanien|Francia=Frankrike|México=Mexiko|vivo=jag bor|en=i|el país=landet|la ciudad=staden|grande=stor",
          s: "Vivo en Suecia.=Jag bor i Sverige.|Vivo en Estocolmo.=Jag bor i Stockholm.|España es un país bonito.=Spanien är ett vackert land.|Madrid es una ciudad grande.=Madrid är en stor stad.",
          g: { h: 'Vivir', p: 'Vivir betyder att bo eller leva. Före både länder och städer använder du en.', t: 'vivo=jag bor|vives=du bor|vive=han / hon bor|vivimos=vi bor' },
          u: 'V och b låter nästan likadant på spanska.'
        },
        {
          t: 'Los idiomas', i: 'Prata om språk du kan.',
          w: "hablar=att prata|hablo=jag pratar|el sueco=svenska (språket)|el español=spanska (språket)|el inglés=engelska|un poco=lite|también=också|el idioma=språket|bastante=ganska",
          s: "Hablo sueco.=Jag pratar svenska.|Hablo un poco de español.=Jag pratar lite spanska.|¿Hablas inglés?=Pratar du engelska?|También hablo inglés.=Jag pratar också engelska.",
          g: { h: 'Verb på -ar', p: 'Hablar är ett vanligt verb på -ar. Ta bort -ar och lägg till ändelsen.', t: 'hablo=jag pratar|hablas=du pratar|habla=han / hon pratar|hablamos=vi pratar|habláis=ni pratar|hablan=de pratar' },
          u: 'Hablar uttalas "ablar". H är stumt.'
        }
      ],
      write: [
        { q: 'Skriv var du kommer ifrån, var du bor och vilka språk du pratar.', kw: ['soy', 'vivo', 'hablo'], ex: 'Soy sueco. Vivo en Estocolmo. Hablo sueco y un poco de español.' }
      ],
      qa: [
        { q: '¿De dónde eres?', sv: 'Var kommer du ifrån?', kw: ['soy'], ex: 'Soy sueco.' },
        { q: '¿Hablas español?', sv: 'Pratar du spanska?', kw: ['hablo'], ex: 'Sí, hablo un poco de español.' }
      ]
    },
    {
      title: 'Siffror och ålder', level: 'A1',
      lessons: [
        {
          t: 'Uno, dos, tres', i: 'Siffrorna 0 till 10.',
          w: "cero=noll|uno=ett|dos=två|tres=tre|cuatro=fyra|cinco=fem|seis=sex|siete=sju|ocho=åtta|nueve=nio|diez=tio",
          s: "Tengo dos gatos.=Jag har två katter.|Hay tres libros.=Det finns tre böcker.|Uno, dos, tres, ¡ya!=Ett, två, tre, kör!|Tengo diez euros.=Jag har tio euro.",
          g: { h: 'Hay', p: 'Hay betyder det finns. Det ändras aldrig, oavsett hur många saker det gäller.', t: 'hay un gato=det finns en katt|hay dos gatos=det finns två katter' },
          u: 'Hay uttalas "aj".'
        },
        {
          t: 'Once a veinte', i: 'Siffrorna 11 till 20.',
          w: "once=elva|doce=tolv|trece=tretton|catorce=fjorton|quince=femton|dieciséis=sexton|diecisiete=sjutton|dieciocho=arton|diecinueve=nitton|veinte=tjugo",
          s: "Tengo doce años.=Jag är tolv år.|Hay veinte alumnos.=Det finns tjugo elever.|Ella tiene dieciséis años.=Hon är sexton år.|Quince euros, por favor.=Femton euro, tack.",
          g: { h: 'Från 16 skrivs det ihop', p: '16 till 19 byggs som tio-och-sex osv, ihopskrivet: dieci + seis.', t: 'dieciséis=16|diecisiete=17|dieciocho=18|diecinueve=19' },
          u: 'C före e och i uttalas som engelskt th i Spanien: "thinko".'
        },
        {
          t: 'Tengo … años', i: 'Säga hur gammal du är med verbet tener.',
          w: "tener=att ha|tengo=jag har|tienes=du har|tiene=han / hon har|la edad=åldern|¿cuántos años?=hur många år?|años=år|el hermano=brodern|la hermana=systern",
          s: "Tengo veinte años.=Jag är tjugo år.|¿Cuántos años tienes?=Hur gammal är du?|Mi hermana tiene quince años.=Min syster är femton år.|Él tiene un hermano.=Han har en bror.",
          g: { h: 'Ålder med tener', p: 'På spanska har man år i stället för att vara år. Säg aldrig soy veinte años.', t: 'tengo=jag har|tienes=du har|tiene=han / hon har|tenemos=vi har|tenéis=ni har|tienen=de har' },
          u: 'Años uttalas "anjos".'
        }
      ],
      write: [
        { q: 'Skriv hur gammal du är och hur gamla dina syskon eller vänner är.', kw: ['tengo', 'años'], ex: 'Tengo veinte años. Mi hermana tiene dieciséis años.' }
      ],
      qa: [
        { q: '¿Cuántos años tienes?', sv: 'Hur gammal är du?', kw: ['años'], ex: 'Tengo veinte años.' },
        { q: '¿Tienes hermanos?', sv: 'Har du syskon?', kw: ['hermano', 'hermana', 'no', 'sí'], ex: 'Sí, tengo un hermano.' }
      ]
    },
    {
      title: 'Familjen', level: 'A1',
      lessons: [
        {
          t: 'Mi familia', i: 'Familjemedlemmar.',
          d: "Lucía: ¿Quién es?=Vem är det?|Pablo: Es mi madre y mi padre.=Det är min mamma och min pappa.|Lucía: ¿Y él?=Och han?|Pablo: Es mi hermano pequeño.=Det är min lillebror.",
          w: "la familia=familjen|la madre=mamman|el padre=pappan|los padres=föräldrarna|el hijo=sonen|la hija=dottern|el abuelo=farfar / morfar|la abuela=farmor / mormor|mi=min",
          s: "Es mi madre.=Det är min mamma.|Mi padre se llama Juan.=Min pappa heter Juan.|Quiero mucho a mi familia.=Jag älskar min familj.|Mis padres viven en Sevilla.=Mina föräldrar bor i Sevilla.",
          g: { h: 'Mi och mis', p: 'Min heter mi i singular och mis i plural, oavsett genus.', t: 'mi padre=min pappa|mi madre=min mamma|mis padres=mina föräldrar' },
          u: 'J i hijo uttalas som ett hårt h längst bak i halsen: "icho".'
        },
        {
          t: 'El, la, los, las', i: 'Bestämd form och genus.',
          w: "el chico=pojken|la chica=flickan|el hombre=mannen|la mujer=kvinnan / frun|el niño=barnet (pojke)|los niños=barnen|el bebé=bebisen|el marido=maken|la prima=kusinen (hon)",
          s: "El chico tiene siete años.=Pojken är sju år.|La mujer es española.=Kvinnan är spansk.|Los niños son simpáticos.=Barnen är trevliga.|El hombre habla inglés.=Mannen pratar engelska.",
          g: { h: 'Genus', p: 'Spanska ord är maskulina (el) eller feminina (la). Ord på -o är oftast maskulina och ord på -a oftast feminina.', t: 'el=maskulint|la=feminint|los=maskulint plural|las=feminint plural' },
          u: 'Mujer uttalas "mucher" med hårt ch-ljud.'
        },
        {
          t: 'Los animales', i: 'Husdjur och obestämd form.',
          w: "un gato=en katt|un perro=en hund|un pájaro=en fågel|un pez=en fisk|un caballo=en häst|un ratón=en mus|unos=några|pequeño=liten|grande=stor",
          s: "Tengo un gato.=Jag har en katt.|Ella tiene un perro pequeño.=Hon har en liten hund.|Hay unos peces.=Det finns några fiskar.|El caballo es grande.=Hästen är stor.",
          g: { h: 'Un, una, unos, unas', p: 'En och ett heter un före maskulina ord och una före feminina. I plural används unos och unas.', t: 'un perro=en hund|una casa=ett hus|unos perros=några hundar|unas casas=några hus' },
          u: 'Rr i perro rullas längre än enkelt r.'
        }
      ],
      write: [
        { q: 'Beskriv din familj eller ditt husdjur med två eller tre meningar.', kw: ['mi', 'tengo'], ex: 'Mi madre se llama Anna. Mi padre tiene cincuenta años. Tengo un perro pequeño.' }
      ],
      qa: [
        { q: '¿Tienes un animal?', sv: 'Har du ett husdjur?', kw: ['gato', 'perro', 'no', 'sí'], ex: 'Sí, tengo un gato.' },
        { q: '¿Cómo se llama tu madre?', sv: 'Vad heter din mamma?', kw: ['llama'], ex: 'Mi madre se llama Anna.' }
      ]
    },
    {
      title: 'Mat och dryck', level: 'A1',
      lessons: [
        {
          t: 'En el bar', i: 'Beställa på café.',
          d: "Camarero: Hola, ¿qué quieres?=Hej, vad vill du ha?|Edvin: Un café con leche, por favor.=En kaffe med mjölk, tack.|Camarero: ¿Algo más?=Något mer?|Edvin: Sí, una tostada.=Ja, en rostad smörgås.",
          w: "el café=kaffet|el té=teet|el agua=vattnet|el zumo de naranja=apelsinjuicen|la tostada=den rostade smörgåsen|quiero=jag vill ha|la cuenta=notan|con=med|sin=utan",
          s: "Quiero un café, por favor.=Jag vill ha en kaffe, tack.|Un té sin azúcar.=Ett te utan socker.|La cuenta, por favor.=Notan, tack.|Una tostada con un zumo de naranja.=En rostad smörgås med en apelsinjuice.",
          g: { h: 'Quiero', p: 'Quiero betyder jag vill ha. Med por favor är det helt artigt på spanska. Quisiera är ännu artigare.', t: 'quiero=jag vill ha|quisiera=jag skulle vilja ha' },
          u: 'Qu uttalas som k: "kiero".'
        },
        {
          t: 'Comer y beber', i: 'Vanlig mat och verb på -er.',
          w: "comer=att äta|beber=att dricka|el pan=brödet|el queso=osten|la manzana=äpplet|el pollo=kycklingen|la leche=mjölken|la carne=köttet|las verduras=grönsakerna",
          s: "Como pan.=Jag äter bröd.|¿Comes una manzana?=Äter du ett äpple?|Ella bebe leche.=Hon dricker mjölk.|Comemos pollo.=Vi äter kyckling.",
          g: { h: 'Verb på -er', p: 'Verb på -er böjs nästan som -ar-verb men med e i stället för a.', t: 'como=jag äter|comes=du äter|come=han / hon äter|comemos=vi äter|coméis=ni äter|comen=de äter' },
          u: 'Spanska saknar subjekt ofta: como räcker för jag äter.'
        },
        {
          t: 'Me gusta el chocolate', i: 'Säga vad du gillar och inte gillar.',
          w: "me gusta=jag gillar|no me gusta=jag gillar inte|me encanta=jag älskar|odio=jag hatar|el chocolate=chokladen|el pescado=fisken|el azúcar=sockret|rico=god|la fruta=frukten",
          s: "Me gusta el chocolate.=Jag gillar choklad.|No me gusta el pescado.=Jag gillar inte fisk.|¡Me encanta el queso!=Jag älskar ost!|Está muy rico.=Det är väldigt gott.",
          g: { h: 'Gustar', p: 'Me gusta betyder bokstavligen det behagar mig. Om saken är plural blir det me gustan.', t: 'me gusta el pan=jag gillar bröd|me gustan las manzanas=jag gillar äpplen|no me gusta=jag gillar inte' },
          u: 'G före u och a uttalas som ett mjukt g.'
        }
      ],
      write: [
        { q: 'Beställ något på ett café och säg vad du gillar.', kw: ['quiero', 'me gusta'], ex: 'Hola, quiero un café con leche y una tostada, por favor. Me gusta el chocolate.' }
      ],
      qa: [
        { q: '¿Qué te gusta comer?', sv: 'Vad gillar du att äta?', kw: ['gusta', 'encanta'], ex: 'Me gusta el pollo y el queso.' },
        { q: '¿Bebes café?', sv: 'Dricker du kaffe?', kw: ['bebo', 'no', 'sí'], ex: 'Sí, bebo café.' }
      ]
    },
    {
      title: 'Hemma', level: 'A1',
      lessons: [
        {
          t: 'La casa', i: 'Rum i hemmet.',
          w: "la casa=huset|el piso=lägenheten|el dormitorio=sovrummet|la cocina=köket|el salón=vardagsrummet|el baño=badrummet|el jardín=trädgården|la puerta=dörren|la ventana=fönstret",
          s: "Vivo en un piso.=Jag bor i en lägenhet.|La cocina es pequeña.=Köket är litet.|Mi dormitorio es grande.=Mitt sovrum är stort.|Hay un jardín.=Det finns en trädgård.",
          g: { h: 'Adjektiv följer ordet', p: 'Adjektiv på -o byter till -a när ordet är feminint: un salón pequeño men una cocina pequeña.', t: 'pequeño=liten (mask.)|pequeña=liten (fem.)|bonito=fin (mask.)|bonita=fin (fem.)' },
          u: 'Cocina uttalas "kothina" i Spanien.'
        },
        {
          t: 'Los muebles', i: 'Möbler och var saker finns med estar.',
          w: "la mesa=bordet|la silla=stolen|la cama=sängen|el sofá=soffan|el armario=garderoben|encima de=ovanpå|debajo de=under|en=i / på|al lado de=bredvid|está=är (befinner sig)",
          s: "El gato está encima de la cama.=Katten är på sängen.|El perro está debajo de la mesa.=Hunden är under bordet.|El libro está en el armario.=Boken är i garderoben.|La silla está al lado de la mesa.=Stolen är bredvid bordet.",
          g: { h: 'Ser och estar', p: 'Spanskan har två verb för att vara. Estar används för var något befinner sig och för tillfälliga tillstånd.', t: 'estoy=jag är|estás=du är|está=han / hon / den är|estamos=vi är|están=de är' },
          u: 'Silla uttalas "sija".'
        },
        {
          t: 'Los colores', i: 'Färger.',
          w: "rojo=röd|azul=blå|verde=grön|amarillo=gul|negro=svart|blanco=vit|gris=grå|rosa=rosa|el color=färgen",
          s: "La puerta es roja.=Dörren är röd.|Tengo un sofá azul.=Jag har en blå soffa.|El gato es negro.=Katten är svart.|Mi color favorito es el verde.=Min favoritfärg är grön.",
          g: { h: 'Färger står efter', p: 'Färger står efter substantivet och böjs efter genus och antal.', t: 'un coche rojo=en röd bil|una mesa roja=ett rött bord|unas sillas rojas=röda stolar' },
          u: 'Amarillo uttalas "amarijo".'
        }
      ],
      write: [
        { q: 'Beskriv ditt rum: vilka möbler finns och vilka färger har de?', kw: ['dormitorio', 'hay'], ex: 'Mi dormitorio es pequeño. Hay una cama azul y una mesa blanca.' }
      ],
      qa: [
        { q: '¿Vives en una casa o en un piso?', sv: 'Bor du i ett hus eller en lägenhet?', kw: ['vivo'], ex: 'Vivo en un piso.' },
        { q: '¿Cuál es tu color favorito?', sv: 'Vilken är din favoritfärg?', kw: ['azul', 'rojo', 'verde', 'negro', 'amarillo', 'rosa', 'blanco', 'gris'], ex: 'Mi color favorito es el azul.' }
      ]
    },
    {
      title: 'I staden', level: 'A1',
      lessons: [
        {
          t: 'En la ciudad', i: 'Platser i staden.',
          d: "Turista: Perdón, ¿dónde está la estación?=Ursäkta, var är stationen?|Señora: Todo recto y a la izquierda.=Rakt fram och till vänster.|Turista: ¡Muchas gracias!=Tack så mycket!",
          w: "la estación=stationen|la tienda=affären|el banco=banken|la escuela=skolan|el museo=museet|la calle=gatan|el restaurante=restaurangen|la farmacia=apoteket|¿dónde está…?=var är…?",
          s: "¿Dónde está la estación?=Var är stationen?|El museo está en esta calle.=Museet ligger på den här gatan.|¿Hay una farmacia aquí?=Finns det ett apotek här?|La escuela es grande.=Skolan är stor.",
          g: { h: '¿Dónde está?', p: 'För att fråga var något ligger använder du estar: ¿dónde está…?', t: '¿dónde está el banco?=var är banken?|¿dónde están los baños?=var är toaletten?' },
          u: 'Calle uttalas "kaje".'
        },
        {
          t: 'El camino', i: 'Fråga om och förklara vägen.',
          w: "a la izquierda=till vänster|a la derecha=till höger|todo recto=rakt fram|cerca=nära|lejos=långt|aquí=här|allí=där|girar=att svänga|ir=att gå / åka",
          s: "Gira a la izquierda.=Sväng vänster.|Está todo recto.=Det är rakt fram.|El banco está cerca de aquí.=Banken ligger nära härifrån.|¿Está lejos?=Är det långt?",
          g: { h: 'Verbet ir', p: 'Ir betyder att gå eller åka och är helt oregelbundet.', t: 'voy=jag går|vas=du går|va=han / hon går|vamos=vi går|vais=ni går|van=de går' },
          u: 'Z uttalas som engelskt th i Spanien: izquierda blir "ithkierda".'
        },
        {
          t: 'Los transportes', i: 'Ta sig fram.',
          w: "el autobús=bussen|el tren=tåget|el metro=tunnelbanan|el coche=bilen|la bicicleta=cykeln|a pie=till fots|el billete=biljetten|tomar=att ta",
          s: "Tomo el metro.=Jag tar tunnelbanan.|Ella va a la escuela a pie.=Hon går till skolan till fots.|Un billete, por favor.=En biljett, tack.|Vamos en tren.=Vi åker tåg.",
          g: { h: 'En + fordon', p: 'Med ett fordon säger man en: en tren, en coche. Till fots är a pie.', t: 'en autobús=med buss|en coche=med bil|en bicicleta=med cykel|a pie=till fots' },
          u: 'Coche uttalas "kotsche".'
        }
      ],
      write: [
        { q: 'Förklara vägen från stationen till ett café.', kw: ['izquierda', 'derecha', 'recto'], ex: 'Gira a la izquierda y después a la derecha. El café está todo recto.' }
      ],
      qa: [
        { q: '¿Cómo vas a la escuela?', sv: 'Hur tar du dig till skolan?', kw: ['autobús', 'bicicleta', 'pie', 'metro', 'coche', 'tren'], ex: 'Voy a la escuela en bicicleta.' },
        { q: '¿Dónde está la estación?', sv: 'Var är stationen?', kw: ['izquierda', 'derecha', 'recto', 'cerca', 'lejos'], ex: 'Está todo recto, cerca de aquí.' }
      ]
    },
    {
      title: 'Tid och väder', level: 'A1',
      lessons: [
        {
          t: 'Los días', i: 'Veckans dagar.',
          w: "lunes=måndag|martes=tisdag|miércoles=onsdag|jueves=torsdag|viernes=fredag|sábado=lördag|domingo=söndag|hoy=idag|mañana=imorgon|la semana=veckan",
          s: "Hoy es lunes.=Idag är det måndag.|Mañana es martes.=Imorgon är det tisdag.|Los sábados juego al fútbol.=På lördagar spelar jag fotboll.|La semana tiene siete días.=Veckan har sju dagar.",
          g: { h: 'El och los före dagen', p: 'El lunes betyder på måndag. Los lunes betyder på måndagar (varje vecka).', t: 'el lunes=på måndag|los lunes=på måndagar' },
          u: 'Miércoles har betoning på e: "MJERkoles".'
        },
        {
          t: '¿Qué hora es?', i: 'Klockan.',
          w: "la hora=timmen / klockan|es la una=klockan är ett|son las…=klockan är…|y media=halv (efter)|y cuarto=kvart över|menos cuarto=kvart i|el mediodía=mitt på dagen|la medianoche=midnatt|la mañana=morgonen|la noche=natten / kvällen",
          s: "¿Qué hora es?=Vad är klockan?|Son las tres.=Klockan är tre.|Son las ocho y media.=Klockan är halv nio.|Es la una y cuarto.=Klockan är kvart över ett.",
          g: { h: 'Halv efter', p: 'Spanskan räknar halv efter timmen: las ocho y media är 8.30, alltså halv nio på svenska.', t: 'las dos=2.00|las dos y cuarto=2.15|las dos y media=2.30|las tres menos cuarto=2.45' },
          u: 'Hora uttalas "ora".'
        },
        {
          t: 'El tiempo', i: 'Prata om vädret.',
          w: "hace buen tiempo=det är fint väder|hace calor=det är varmt|hace frío=det är kallt|llueve=det regnar|nieva=det snöar|el sol=solen|el viento=vinden|el verano=sommaren|el invierno=vintern",
          s: "Hoy hace buen tiempo.=Idag är det fint väder.|En invierno hace frío.=På vintern är det kallt.|Llueve mucho.=Det regnar mycket.|En verano hace calor.=På sommaren är det varmt.",
          g: { h: 'Hace', p: 'Om vädret säger man ofta hace + substantiv. Bokstavligen: det gör kyla.', t: 'hace calor=varmt|hace frío=kallt|hace sol=soligt|hace viento=blåsigt' },
          u: 'Llueve uttalas "jueve".'
        }
      ],
      write: [
        { q: 'Skriv vilken dag det är, vad klockan är och hur vädret är.', kw: ['hoy', 'son', 'hace'], ex: 'Hoy es sábado. Son las diez. Hace buen tiempo.' }
      ],
      qa: [
        { q: '¿Qué día es hoy?', sv: 'Vilken dag är det idag?', kw: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'], ex: 'Hoy es lunes.' },
        { q: '¿Qué tiempo hace?', sv: 'Hur är vädret?', kw: ['hace', 'llueve', 'nieva'], ex: 'Hace frío y nieva.' }
      ]
    },
    {
      title: 'Vardagen', level: 'A2',
      lessons: [
        {
          t: 'Mi día', i: 'En vanlig dag och reflexiva verb.',
          w: "despertarse=att vakna|levantarse=att stiga upp|ducharse=att duscha|vestirse=att klä på sig|acostarse=att gå och lägga sig|el desayuno=frukosten|el almuerzo=lunchen|la cena=middagen|temprano=tidigt|tarde=sent",
          s: "Me despierto a las siete.=Jag vaknar klockan sju.|Me levanto temprano.=Jag stiger upp tidigt.|Ella se acuesta tarde.=Hon går och lägger sig sent.|Tomo el desayuno.=Jag äter frukost.",
          g: { h: 'Reflexiva verb', p: 'Verb med -se gör man med sig själv. Se byts ut beroende på vem som gör det och står före verbet.', t: 'me levanto=jag stiger upp|te levantas=du stiger upp|se levanta=han / hon stiger upp|nos levantamos=vi stiger upp' },
          u: 'Tarde uttalas med kort a: "tarde".'
        },
        {
          t: 'En el trabajo', i: 'Skola, jobb och yrken.',
          w: "trabajar=att arbeta|estudiar=att studera|el trabajo=arbetet|la oficina=kontoret|el profesor=läraren|el médico=läkaren|el estudiante=studenten|la clase=lektionen|empezar=att börja|terminar=att sluta",
          s: "Trabajo en una oficina.=Jag arbetar på ett kontor.|Ella es médica.=Hon är läkare.|La clase empieza a las nueve.=Lektionen börjar klockan nio.|Estudiamos español.=Vi studerar spanska.",
          g: { h: 'Yrken utan un', p: 'När du säger vad någon jobbar med används ingen artikel: soy estudiante, inte soy un estudiante.', t: 'soy estudiante=jag är student|es profesor=han är lärare' },
          u: 'Trabajo uttalas med hårt ch: "trabacho".'
        },
        {
          t: '¿A menudo o nunca?', i: 'Hur ofta du gör saker.',
          w: "siempre=alltid|a menudo=ofta|a veces=ibland|pocas veces=sällan|nunca=aldrig|todos los días=varje dag|el fin de semana=helgen|primero=först|luego=sedan|al final=till slut",
          s: "Como pasta a menudo.=Jag äter ofta pasta.|Él nunca bebe café.=Han dricker aldrig kaffe.|Primero me ducho.=Först duschar jag.|El fin de semana me levanto tarde.=På helgen stiger jag upp sent.",
          g: { h: 'No och nunca', p: 'Inte heter no och står före verbet. Nunca kan stå före verbet utan no.', t: 'no como=jag äter inte|nunca como=jag äter aldrig' },
          u: 'Siempre uttalas "sjempre".'
        }
      ],
      write: [
        { q: 'Beskriv din morgon med orden primero, luego och al final.', kw: ['primero', 'luego', 'al final'], ex: 'Primero me despierto a las siete. Luego me ducho. Al final tomo el desayuno.' }
      ],
      qa: [
        { q: '¿A qué hora te levantas?', sv: 'Vilken tid stiger du upp?', kw: ['levanto'], ex: 'Me levanto a las siete.' },
        { q: '¿Trabajas o estudias?', sv: 'Jobbar du eller studerar du?', kw: ['trabajo', 'estudio'], ex: 'Estudio en la universidad.' }
      ]
    },
    {
      title: 'Fritid', level: 'A2',
      lessons: [
        {
          t: 'El tiempo libre', i: 'Hobbyer och intressen.',
          w: "el deporte=sporten|la música=musiken|la película=filmen|el libro=boken|leer=att läsa|escuchar=att lyssna|ver=att titta|jugar=att spela / leka|bailar=att dansa|cantar=att sjunga",
          s: "Me gusta leer libros.=Jag gillar att läsa böcker.|Él escucha música.=Han lyssnar på musik.|Vemos una película.=Vi tittar på en film.|A ella le gusta bailar.=Hon gillar att dansa.",
          g: { h: 'Gustar + verb', p: 'Efter me gusta kommer verbet i grundform: me gusta leer, jag gillar att läsa.', t: 'me gusta leer=jag gillar att läsa|no me gusta bailar=jag gillar inte att dansa' },
          u: 'Película har betoning på i: "peLIkula".'
        },
        {
          t: 'El deporte', i: 'Sporter med jugar och hacer.',
          w: "el fútbol=fotbollen|el tenis=tennisen|la natación=simningen|el esquí=skidåkningen|correr=att springa|nadar=att simma|hacer deporte=att träna|el equipo=laget|ganar=att vinna|perder=att förlora",
          s: "Juego al fútbol.=Jag spelar fotboll.|Ella hace natación.=Hon simmar.|¡Nuestro equipo gana!=Vårt lag vinner!|Hago esquí en invierno.=Jag åker skidor på vintern.",
          g: { h: 'Jugar a', p: 'Med bollsporter säger man jugar al. Andra sporter tar ofta hacer.', t: 'jugar al tenis=spela tennis|hacer esquí=åka skidor|hacer deporte=träna' },
          u: 'J i jugar uttalas som ett hårt h: "chugar".'
        },
        {
          t: 'Invitar a un amigo', i: 'Bjuda in och tacka ja eller nej.',
          w: "¿quieres…?=vill du…?|¿vamos…?=ska vi gå…?|claro=självklart|vale=okej|lo siento=förlåt / tyvärr|no puedo=jag kan inte|esta noche=ikväll|el cine=bion|la fiesta=festen",
          s: "¿Quieres ir al cine?=Vill du gå på bio?|¿Vamos a la fiesta esta noche?=Ska vi gå på festen ikväll?|¡Claro que sí!=Självklart!|Lo siento, no puedo.=Tyvärr, jag kan inte.",
          g: { h: 'Querer + verb', p: 'Querer betyder vilja. ¿Quieres + verb? är det vanligaste sättet att bjuda in någon.', t: 'quiero=jag vill|quieres=du vill|quiere=han / hon vill|queremos=vi vill' },
          u: 'Vale är jättevanligt i Spanien och betyder okej.'
        }
      ],
      write: [
        { q: 'Skriv ett kort sms och bjud in en vän till något.', kw: ['quieres', 'esta noche'], ex: '¡Hola! ¿Quieres ir al cine esta noche? Vamos a ver una película española.' }
      ],
      qa: [
        { q: '¿Qué te gusta hacer el fin de semana?', sv: 'Vad gillar du att göra på helgen?', kw: ['gusta', 'juego', 'hago', 'veo', 'leo'], ex: 'Me gusta jugar al fútbol y ver películas.' },
        { q: '¿Quieres ir al cine?', sv: 'Vill du gå på bio?', kw: ['claro', 'vale', 'siento', 'sí', 'no'], ex: '¡Claro que sí!' }
      ]
    },
    {
      title: 'Handla', level: 'A2',
      lessons: [
        {
          t: 'La ropa', i: 'Kläder.',
          w: "los pantalones=byxorna|la camisa=skjortan|el vestido=klänningen|la falda=kjolen|el jersey=tröjan|la chaqueta=jackan|los zapatos=skorna|la camiseta=t-shirten|llevar=att ha på sig",
          s: "Llevo un jersey azul.=Jag har på mig en blå tröja.|Ella lleva un vestido rojo.=Hon har på sig en röd klänning.|Mis zapatos son negros.=Mina skor är svarta.|Me gusta esta chaqueta.=Jag gillar den här jackan.",
          g: { h: 'Este, esta, estos, estas', p: 'Den här heter este före maskulina ord och esta före feminina. I plural: estos och estas.', t: 'este jersey=den här tröjan|esta falda=den här kjolen|estos zapatos=de här skorna' },
          u: 'Chaqueta uttalas "tschaketa".'
        },
        {
          t: 'En la tienda', i: 'Fråga om pris och storlek.',
          w: "¿cuánto cuesta?=hur mycket kostar det?|cuesta=det kostar|caro=dyr|barato=billig|la talla=storleken|probarse=att prova|comprar=att köpa|pagar=att betala|la tarjeta=kortet",
          s: "¿Cuánto cuesta este jersey?=Hur mycket kostar den här tröjan?|Es demasiado caro.=Det är för dyrt.|¿Puedo probármelo?=Kan jag prova den?|Pago con tarjeta.=Jag betalar med kort.",
          g: { h: 'Poder', p: 'Poder betyder att kunna. ¿Puedo + verb? är ett artigt sätt att fråga om lov.', t: 'puedo=jag kan|puedes=du kan|puede=han / hon kan|podemos=vi kan' },
          u: 'Cuesta uttalas "kuesta".'
        },
        {
          t: 'En el mercado', i: 'Handla mat och mängder.',
          w: "el mercado=marknaden|un kilo de=ett kilo|un poco de=lite|mucho=mycket|el tomate=tomaten|la fresa=jordgubben|la zanahoria=moroten|el huevo=ägget|nada más=inget mer",
          s: "Un kilo de tomates, por favor.=Ett kilo tomater, tack.|Quiero un poco de queso.=Jag vill ha lite ost.|Hay muchas fresas.=Det finns många jordgubbar.|Nada más, gracias.=Inget mer, tack.",
          g: { h: 'Mucho böjs', p: 'Mucho betyder mycket eller många och böjs efter ordet: mucho pan, mucha leche, muchos huevos.', t: 'mucho queso=mycket ost|mucha fruta=mycket frukt|muchos tomates=många tomater' },
          u: 'Huevo uttalas "uevo".'
        }
      ],
      write: [
        { q: 'Du är i en klädaffär. Fråga vad något kostar och om du kan prova det.', kw: ['cuánto', 'puedo'], ex: 'Hola, ¿cuánto cuesta esta chaqueta? ¿Puedo probármela?' }
      ],
      qa: [
        { q: '¿Qué llevas hoy?', sv: 'Vad har du på dig idag?', kw: ['llevo'], ex: 'Llevo un jersey negro y unos pantalones azules.' },
        { q: '¿Cómo pagas?', sv: 'Hur betalar du?', kw: ['tarjeta', 'pago'], ex: 'Pago con tarjeta.' }
      ]
    },
    {
      title: 'Resor', level: 'A2',
      lessons: [
        {
          t: 'Las vacaciones', i: 'Semester och planer med ir a + verb.',
          w: "las vacaciones=semestern|viajar=att resa|la playa=stranden|el mar=havet|la montaña=berget / fjällen|el hotel=hotellet|la maleta=resväskan|el pasaporte=passet|visitar=att besöka",
          s: "Voy a viajar a España.=Jag ska resa till Spanien.|Vamos a la playa.=Vi ska till stranden.|Ella va a visitar Barcelona.=Hon ska besöka Barcelona.|Me gusta la montaña.=Jag gillar fjällen.",
          g: { h: 'Nära framtid', p: 'Ir a + verb i grundform betyder ska göra något.', t: 'voy a comer=jag ska äta|vas a viajar=du ska resa|vamos a salir=vi ska gå ut' },
          u: 'Viajar uttalas "biachar".'
        },
        {
          t: 'En el hotel', i: 'Boka och checka in.',
          w: "una habitación=ett rum|reservar=att boka|la noche=natten|la llave=nyckeln|el desayuno incluido=frukost ingår|el ascensor=hissen|libre=ledig|completo=fullbokat|la recepción=receptionen",
          s: "Tengo una reserva.=Jag har en bokning.|Una habitación para dos noches.=Ett rum för två nätter.|¿El desayuno está incluido?=Ingår frukost?|Aquí tiene su llave.=Här är er nyckel.",
          g: { h: 'Aquí tiene', p: 'Aquí tiene betyder varsågod (här har ni) när man räcker över något artigt.', t: 'aquí tiene=varsågod (artigt)|aquí tienes=varsågod (till en vän)' },
          u: 'Llave uttalas "jave".'
        },
        {
          t: 'Ayer visité…', i: 'Berätta om något som har hänt (pretérito).',
          w: "ayer=igår|el fin de semana pasado=förra helgen|visité=jag besökte|comí=jag åt|vi=jag såg|tomé=jag tog|fui=jag åkte / gick|fue=det var|genial=jättebra",
          s: "Ayer visité un museo.=Igår besökte jag ett museum.|Comí en un restaurante.=Jag åt på en restaurang.|Fui a Madrid.=Jag åkte till Madrid.|¡Fue genial!=Det var jättebra!",
          g: { h: 'Pretérito', p: 'För att berätta vad du gjorde byter du ändelse på verbet. -ar-verb får -é och -er-verb får -í i jag-form.', t: 'visité=jag besökte|visitaste=du besökte|comí=jag åt|comiste=du åt|fui=jag åkte' },
          u: 'Accenten på é i visité visar att betoningen ligger sist.'
        }
      ],
      write: [
        { q: 'Berätta vad du gjorde förra helgen med två eller tre meningar.', kw: ['ayer', 'fue'], ex: 'El fin de semana pasado visité un museo. Comí una pizza. ¡Fue genial!' }
      ],
      qa: [
        { q: '¿Qué hiciste ayer?', sv: 'Vad gjorde du igår?', kw: ['é', 'í', 'fui'], ex: 'Ayer vi una película.' },
        { q: '¿Vas a viajar este verano?', sv: 'Ska du resa i sommar?', kw: ['voy', 'sí', 'no'], ex: 'Sí, voy a viajar a España.' }
      ]
    }
  ]
};
