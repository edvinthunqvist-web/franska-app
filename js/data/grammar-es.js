// Grammatik för spanska, ordnad efter gymnasiets steg 1–5 (ungefär A1 till B1).
// Allt innehåll är egenskrivet. Samma format som grammar-fr.js.
// unit/after: var momentet ligger på kursvägen (enhet, efter lektion nummer).

window.GRAMMAR = window.GRAMMAR || {};
window.GRAMMAR.es = [
  /* ---------------- Steg 1 ---------------- */
  {
    step: 1, title: 'Ser och estar', unit: 2, after: 1, intro: 'Spanskan har två verb för vara. Ser används för vad något är (egenskaper, yrke, ursprung). Estar används för var något är och hur det mår just nu.',
    s: [
      { h: 'Ser (vara, egenskap)', t: 'yo soy=jag är|tú eres=du är|él / ella / usted es=han / hon / ni är|nosotros somos=vi är|vosotros sois=ni är|ellos / ellas son=de är' },
      { h: 'Estar (vara, tillstånd och plats)', t: 'yo estoy=jag är|tú estás=du är|él / ella está=han / hon är|nosotros estamos=vi är|vosotros estáis=ni är|ellos / ellas están=de är' },
      { h: 'Minnesregel', p: 'Ser: vem, vad, varifrån, yrke, tid. Estar: var och hur. Soy alto (jag är lång) men estoy cansado (jag är trött).' },
    ],
    ex: 'Soy de Suecia.=Jag är från Sverige.|Estamos en Madrid.=Vi är i Madrid.|Mi hermana es profesora.=Min syster är lärare.|¿Cómo estás?=Hur mår du?',
    m: ['Plats använder alltid estar: Madrid está en España.', 'Yrke använder ser och ingen artikel: Soy estudiante.'],
    q: [
      ['Yo ___ sueco.', 'soy', 'Jag är svensk.'],
      ['¿Dónde ___ el baño?', 'está', 'Var är toaletten?'],
      ['Nosotros ___ cansados.', 'estamos', 'Vi är trötta.'],
      ['Ellos ___ de México.', 'son', 'De är från Mexiko.'],
      ['Tú ___ muy simpático.', 'eres', 'Du är väldigt trevlig.'],
      ['Hoy yo ___ enfermo.', 'estoy', 'Idag är jag sjuk.'],
      ['Mi padre ___ médico.', 'es', 'Min pappa är läkare.'],
    ],
  },
  {
    step: 1, title: 'Genus och artiklar', unit: 4, after: 2, intro: 'Alla substantiv är maskulina eller feminina. Ord på -o är oftast maskulina och ord på -a oftast feminina.',
    s: [
      { h: 'Bestämd artikel', t: 'el libro=boken (mask.)|la casa=huset (fem.)|los libros=böckerna|las casas=husen' },
      { h: 'Obestämd artikel', t: 'un libro=en bok|una casa=ett hus|unos libros=några böcker|unas casas=några hus' },
      { h: 'Plural', p: 'Slutar ordet på vokal lägger du till -s. Slutar det på konsonant lägger du till -es.', t: 'el chico → los chicos=pojken → pojkarna|la ciudad → las ciudades=staden → städerna' },
      { h: 'Undantag', p: 'Några vanliga ord bryter regeln: el día (dagen), el problema (problemet), la mano (handen), la foto (fotot).' },
    ],
    ex: 'Tengo un perro y una gata.=Jag har en hund och en katt.|Los niños están en el parque.=Barnen är i parken.',
    m: ['Svenskans en/ett säger inget om spanskt genus.', 'A + el blir al, och de + el blir del: voy al cine.'],
    q: [
      ['___ casa es grande.', 'la', 'Huset är stort.'],
      ['Tengo ___ hermano.', 'un', 'Jag har en bror.'],
      ['___ libros son nuevos.', 'los', 'Böckerna är nya.'],
      ['___ día es bonito.', 'el', 'Dagen är fin.'],
      ['Voy ___ cine.', 'al', 'Jag går på bio.'],
      ['Es la casa ___ profesor.', 'del', 'Det är lärarens hus.'],
    ],
  },
  {
    step: 1, title: 'Presens av regelbundna verb', unit: 2, after: 3, intro: 'Spanska verb slutar på -ar, -er eller -ir. Ta bort ändelsen och lägg till en ny efter vem som gör något.',
    s: [
      { h: 'Hablar (prata)', t: 'hablo=jag pratar|hablas=du pratar|habla=han / hon pratar|hablamos=vi pratar|habláis=ni pratar|hablan=de pratar' },
      { h: 'Comer (äta)', t: 'como=jag äter|comes=du äter|come=han / hon äter|comemos=vi äter|coméis=ni äter|comen=de äter' },
      { h: 'Vivir (bo, leva)', t: 'vivo=jag bor|vives=du bor|vive=han / hon bor|vivimos=vi bor|vivís=ni bor|viven=de bor' },
      { h: 'Pronomen behövs oftast inte', p: 'Ändelsen visar redan vem det gäller, så hablo räcker för jag pratar. Yo hablo används bara för betoning.' },
    ],
    ex: 'Hablo un poco de español.=Jag pratar lite spanska.|¿Dónde vives?=Var bor du?|Comemos a las dos.=Vi äter klockan två.',
    m: ['Usted (ni, artigt) böjs som él: ¿Habla usted inglés?', 'Glöm inte accenten i habláis och coméis.'],
    q: [
      ['Yo ___ español. (hablar)', 'hablo', 'Jag pratar spanska.'],
      ['Tú ___ en Estocolmo. (vivir)', 'vives', 'Du bor i Stockholm.'],
      ['Nosotros ___ pizza. (comer)', 'comemos', 'Vi äter pizza.'],
      ['Ellos ___ mucho. (trabajar)', 'trabajan', 'De arbetar mycket.'],
      ['Ella ___ un libro. (leer)', 'lee', 'Hon läser en bok.'],
      ['Vosotros ___ una carta. (escribir)', 'escribís', 'Ni skriver ett brev.'],
      ['Mi madre ___ música. (escuchar)', 'escucha', 'Min mamma lyssnar på musik.'],
    ],
  },
  {
    step: 1, title: 'Negation och frågor', unit: 1, after: 2, intro: 'Negation är enkelt: sätt no före verbet. Frågor får upp-och-ned-frågetecken i början.',
    s: [
      { h: 'Negation', t: 'No hablo francés.=Jag pratar inte franska.|No tengo tiempo.=Jag har inte tid.|No me gusta.=Jag tycker inte om det.' },
      { h: 'Frågeord', p: 'Frågeord har alltid accent.', t: '¿qué?=vad?|¿quién?=vem?|¿dónde?=var?|¿cuándo?=när?|¿cómo?=hur?|¿por qué?=varför?|¿cuánto?=hur mycket?|¿cuál?=vilken?' },
      { h: 'Ja/nej-frågor', p: 'Ordföljden kan vara samma som i ett påstående. Det är tonen och ¿? som gör det till en fråga: ¿Tienes hambre?' },
    ],
    ex: '¿De dónde eres?=Var kommer du ifrån?|No vivo en Madrid.=Jag bor inte i Madrid.|¿Por qué no comes?=Varför äter du inte?',
    m: ['Svaret på ¿por qué? är porque (eftersom), utan accent och i ett ord.', 'No ska stå direkt före verbet, eller före pronomenet: No lo sé.'],
    q: [
      ['¿___ te llamas?', 'cómo', 'Vad heter du?'],
      ['¿___ vives?', 'dónde', 'Var bor du?'],
      ['___ hablo alemán.', 'no', 'Jag pratar inte tyska.'],
      ['¿___ es tu cumpleaños?', 'cuándo', 'När fyller du år?'],
      ['¿___ cuesta?', 'cuánto', 'Hur mycket kostar det?'],
      ['¿___ es ella?', 'quién', 'Vem är hon?'],
    ],
  },
  {
    step: 1, title: 'Adjektiv', unit: 6, after: 1, intro: 'Adjektiv står oftast efter substantivet och böjs efter genus och antal.',
    s: [
      { h: 'Böjning', t: 'un chico alto=en lång pojke|una chica alta=en lång flicka|unos chicos altos=långa pojkar|unas chicas altas=långa flickor' },
      { h: 'Adjektiv på -e eller konsonant', p: 'De ändras inte efter genus, bara i plural.', t: 'un coche grande / una casa grande=en stor bil / ett stort hus|un libro fácil / libros fáciles=en lätt bok / lätta böcker' },
      { h: 'Före substantivet', p: 'Bueno och malo kortas före maskulint ord i singular: un buen amigo. Grande blir gran och betyder då fantastisk: un gran hombre.' },
    ],
    ex: 'Tengo una camiseta roja.=Jag har en röd t-shirt.|Es una ciudad bonita.=Det är en vacker stad.',
    m: ['Una casa blanco är fel. Adjektivet måste bli feminint: una casa blanca.', 'Nationalitet skrivs med liten bokstav: una chica sueca.'],
    q: [
      ['La casa es ___. (blanco)', 'blanca', 'Huset är vitt.'],
      ['Los perros son ___. (pequeño)', 'pequeños', 'Hundarna är små.'],
      ['Mis amigas son ___. (simpático)', 'simpáticas', 'Mina vänner är trevliga.'],
      ['Es un ___ amigo. (bueno)', 'buen', 'Han är en bra vän.'],
      ['Las preguntas son ___. (fácil)', 'fáciles', 'Frågorna är lätta.'],
    ],
  },

  /* ---------------- Steg 2 ---------------- */
  {
    step: 2, title: 'Oregelbundna verb i presens', unit: 7, after: 2, intro: 'Många vanliga verb ändrar stammen. Ändringen sker i alla former utom nosotros och vosotros, därför kallas de ibland skoverb.',
    s: [
      { h: 'Tener (ha)', t: 'tengo|tienes|tiene|tenemos|tenéis|tienen' },
      { h: 'Ir (gå, åka)', t: 'voy|vas|va|vamos|vais|van' },
      { h: 'Stamändringar', t: 'e → ie: querer=quiero, quieres, queremos|o → ue: poder=puedo, puedes, podemos|e → i: pedir=pido, pides, pedimos|u → ue: jugar=juego, juegas, jugamos' },
      { h: 'Oregelbunden jag-form', t: 'hacer=hago (jag gör)|salir=salgo (jag går ut)|poner=pongo (jag ställer)|saber=sé (jag vet)|conocer=conozco (jag känner)|venir=vengo (jag kommer)' },
    ],
    ex: 'Tengo dos hermanos.=Jag har två syskon.|¿Puedes ayudarme?=Kan du hjälpa mig?|Voy a la playa.=Jag går till stranden.|Juego al fútbol.=Jag spelar fotboll.',
    m: ['Nosotros ändras inte: podemos, inte puedemos.', 'Tener används för ålder: Tengo 16 años.'],
    q: [
      ['Yo ___ 17 años. (tener)', 'tengo', 'Jag är 17 år.'],
      ['¿___ venir mañana? (poder, tú)', 'puedes', 'Kan du komma imorgon?'],
      ['Nosotros ___ al cine. (ir)', 'vamos', 'Vi går på bio.'],
      ['Ella ___ un café. (querer)', 'quiere', 'Hon vill ha en kaffe.'],
      ['Yo ___ los deberes. (hacer)', 'hago', 'Jag gör läxorna.'],
      ['Ellos ___ al tenis. (jugar)', 'juegan', 'De spelar tennis.'],
      ['No ___ la respuesta. (saber, yo)', 'sé', 'Jag vet inte svaret.'],
      ['Nosotros ___ ir. (poder)', 'podemos', 'Vi kan gå.'],
    ],
  },
  {
    step: 2, title: 'Gustar och liknande verb', unit: 5, after: 3, intro: 'Gustar betyder egentligen behaga. Det man gillar är subjekt, och personen som gillar visas med ett pronomen före.',
    s: [
      { h: 'Pronomen', t: 'me gusta=jag gillar|te gusta=du gillar|le gusta=han / hon gillar|nos gusta=vi gillar|os gusta=ni gillar|les gusta=de gillar' },
      { h: 'Gusta eller gustan', p: 'Gusta när det man gillar är en sak eller ett verb. Gustan när det är flera saker.', t: 'Me gusta el chocolate.=Jag gillar choklad.|Me gusta bailar.=Jag gillar att dansa.|Me gustan los gatos.=Jag gillar katter.' },
      { h: 'Fler verb som fungerar likadant', t: 'encantar=älska (något)|interesar=intressera|doler=göra ont|parecer=verka, tycka' },
    ],
    ex: 'No me gusta el café.=Jag gillar inte kaffe.|¿Te gustan las películas de terror?=Gillar du skräckfilmer?|Me duele la cabeza.=Jag har ont i huvudet.',
    m: ['Yo gusto är fel om du menar jag gillar. Det heter me gusta.', 'Artikeln behövs: Me gusta el fútbol, inte me gusta fútbol.'],
    q: [
      ['Me ___ la música. (gustar)', 'gusta', 'Jag gillar musik.'],
      ['Me ___ los perros. (gustar)', 'gustan', 'Jag gillar hundar.'],
      ['¿___ gusta bailar?', 'te', 'Gillar du att dansa?'],
      ['A nosotros ___ gusta viajar.', 'nos', 'Vi gillar att resa.'],
      ['A ella ___ encanta el cine.', 'le', 'Hon älskar bio.'],
      ['Me ___ los pies. (doler)', 'duelen', 'Jag har ont i fötterna.'],
    ],
  },
  {
    step: 2, title: 'Reflexiva verb', unit: 9, after: 1, intro: 'Reflexiva verb har ett pronomen som syftar tillbaka på den som gör något, som i jag tvättar mig.',
    s: [
      { h: 'Llamarse (heta)', t: 'me llamo=jag heter|te llamas=du heter|se llama=han / hon heter|nos llamamos=vi heter|os llamáis=ni heter|se llaman=de heter' },
      { h: 'Vanliga reflexiva verb', t: 'levantarse=stiga upp|ducharse=duscha|vestirse=klä på sig|acostarse=lägga sig|despertarse=vakna|divertirse=ha roligt' },
      { h: 'Med infinitiv', p: 'Pronomenet kan sättas ihop med infinitiven: Voy a ducharme eller Me voy a duchar.' },
    ],
    ex: 'Me levanto a las siete.=Jag går upp klockan sju.|¿A qué hora te acuestas?=När lägger du dig?|Nos divertimos mucho.=Vi har jättekul.',
    m: ['Många svenska verb är inte reflexiva på spanska och tvärtom. Duschar heter me ducho.', 'Stamändringen finns kvar: me acuesto, me despierto.'],
    q: [
      ['Yo ___ llamo Ana.', 'me', 'Jag heter Ana.'],
      ['¿Cómo ___ llamas?', 'te', 'Vad heter du?'],
      ['Ella ___ ducha por la mañana.', 'se', 'Hon duschar på morgonen.'],
      ['Nosotros ___ levantamos tarde.', 'nos', 'Vi går upp sent.'],
      ['Yo me ___ a las once. (acostarse)', 'acuesto', 'Jag lägger mig klockan elva.'],
    ],
  },
  {
    step: 2, title: 'Ir a + infinitiv (nära framtid)', unit: 12, after: 1, intro: 'Det enklaste sättet att prata om framtiden: böj ir, lägg till a och verbet i grundform.',
    s: [
      { h: 'Så bildas det', t: 'voy a comer=jag ska äta|vas a salir=du ska gå ut|va a llover=det ska regna|vamos a ver=vi får se|vais a viajar=ni ska resa|van a jugar=de ska spela' },
      { h: 'Användning', p: 'Används för planer och sådant som snart händer, precis som svenskans ska.' },
    ],
    ex: 'Mañana voy a estudiar.=Imorgon ska jag plugga.|¿Qué vas a hacer este fin de semana?=Vad ska du göra i helgen?',
    m: ['Glöm inte a: voy a comer, inte voy comer.'],
    q: [
      ['Yo ___ a estudiar. (ir)', 'voy', 'Jag ska plugga.'],
      ['Nosotros vamos ___ comer.', 'a', 'Vi ska äta.'],
      ['¿Qué ___ a hacer tú? (ir)', 'vas', 'Vad ska du göra?'],
      ['Ellos ___ a viajar a Perú. (ir)', 'van', 'De ska resa till Peru.'],
      ['Va a ___. (regna)', 'llover', 'Det kommer att regna.'],
    ],
  },
  {
    step: 2, title: 'Possessiva pronomen', unit: 4, after: 1, intro: 'Min, din, hans och så vidare. De korta formerna står före substantivet och böjs i antal.',
    s: [
      { h: 'Former', t: 'mi / mis=min / mina|tu / tus=din / dina|su / sus=hans, hennes, deras, er|nuestro / nuestra=vår (böjs även i genus)|vuestro / vuestra=er (böjs även i genus)' },
      { h: 'Su är tvetydigt', p: 'Su kan betyda hans, hennes, deras eller er (usted). Sammanhanget avgör. Vid behov: el libro de él.' },
    ],
    ex: 'Mi hermana vive en Lima.=Min syster bor i Lima.|Nuestras vacaciones son largas.=Vårt lov är långt.|¿Dónde están tus llaves?=Var är dina nycklar?',
    m: ['Tu (din) har ingen accent. Tú (du) har det.', 'Mis libros, inte mi libros.'],
    q: [
      ['___ padres son simpáticos. (mina)', 'mis', 'Mina föräldrar är trevliga.'],
      ['¿Es ___ móvil? (din)', 'tu', 'Är det din mobil?'],
      ['___ casa es pequeña. (vår)', 'nuestra', 'Vårt hus är litet.'],
      ['Ella vive con ___ abuela. (hennes)', 'su', 'Hon bor med sin mormor.'],
    ],
  },

  /* ---------------- Steg 3 ---------------- */
  {
    step: 3, title: 'Pretérito perfecto', unit: 14, after: 1, intro: 'Perfekt, som svenskans har gjort. Bildas med haber och ett particip. Används om sådant som hänt idag, i veckan eller någonsin.',
    s: [
      { h: 'Haber + particip', t: 'he comido=jag har ätit|has comido=du har ätit|ha comido=han / hon har ätit|hemos comido=vi har ätit|habéis comido=ni har ätit|han comido=de har ätit' },
      { h: 'Particip', p: '-ar blir -ado och -er/-ir blir -ido.', t: 'hablar=hablado|comer=comido|vivir=vivido' },
      { h: 'Oregelbundna particip', t: 'hacer=hecho|decir=dicho|ver=visto|escribir=escrito|poner=puesto|volver=vuelto|abrir=abierto|romper=roto' },
    ],
    ex: 'Hoy he trabajado mucho.=Idag har jag jobbat mycket.|¿Has estado en España?=Har du varit i Spanien?|No hemos visto la película.=Vi har inte sett filmen.',
    m: ['Använd haber, inte tener: he comido.', 'Inget får stå mellan haber och participet: No lo he visto.'],
    q: [
      ['Yo ___ comido. (haber)', 'he', 'Jag har ätit.'],
      ['¿___ visto a Juan? (haber, tú)', 'has', 'Har du sett Juan?'],
      ['Nosotros hemos ___ mucho. (hablar)', 'hablado', 'Vi har pratat mycket.'],
      ['Ella ha ___ una carta. (escribir)', 'escrito', 'Hon har skrivit ett brev.'],
      ['¿Qué has ___? (hacer)', 'hecho', 'Vad har du gjort?'],
      ['Ellos ___ vuelto. (haber)', 'han', 'De har kommit tillbaka.'],
    ],
  },
  {
    step: 3, title: 'Pretérito indefinido, regelbundna', unit: 12, after: 3, intro: 'Den vanligaste dåtiden för avslutade händelser: igår, förra året, en gång.',
    s: [
      { h: '-ar: hablar', t: 'hablé=jag pratade|hablaste=du pratade|habló=han / hon pratade|hablamos=vi pratade|hablasteis=ni pratade|hablaron=de pratade' },
      { h: '-er och -ir: comer, vivir', t: 'comí / viví=jag åt / bodde|comiste / viviste=du åt / bodde|comió / vivió=han åt / bodde|comimos / vivimos=vi åt / bodde|comisteis / vivisteis=ni åt / bodde|comieron / vivieron=de åt / bodde' },
      { h: 'Stavningsändring i jag-form', t: 'llegar=llegué|buscar=busqué|empezar=empecé|jugar=jugué' },
    ],
    ex: 'Ayer hablé con mi madre.=Igår pratade jag med min mamma.|El año pasado viajamos a Chile.=Förra året reste vi till Chile.|¿Comiste algo?=Åt du något?',
    m: ['Accenten är viktig: hablo (jag pratar) men habló (han pratade).', 'Nosotros-formen för -ar och -ir är samma som i presens. Sammanhanget avgör.'],
    q: [
      ['Ayer yo ___ con Ana. (hablar)', 'hablé', 'Igår pratade jag med Ana.'],
      ['Ella ___ en Madrid. (vivir)', 'vivió', 'Hon bodde i Madrid.'],
      ['¿___ la película? (ver, tú)', 'viste', 'Såg du filmen?'],
      ['Ellos ___ paella. (comer)', 'comieron', 'De åt paella.'],
      ['Yo ___ tarde. (llegar)', 'llegué', 'Jag kom sent.'],
      ['Nosotros ___ mucho. (bailar)', 'bailamos', 'Vi dansade mycket.'],
    ],
  },
  {
    step: 3, title: 'Pretérito indefinido, oregelbundna', unit: 13, after: 1, intro: 'De vanligaste verben är oregelbundna i dåtid. De har ingen accent på ändelsen.',
    s: [
      { h: 'Ir och ser (samma former)', t: 'fui=jag gick / var|fuiste=du gick / var|fue=han gick / var|fuimos=vi gick / var|fuisteis=ni gick / var|fueron=de gick / var' },
      { h: 'Vanliga oregelbundna', t: 'tener=tuve, tuvo|estar=estuve, estuvo|hacer=hice, hizo|poder=pude, pudo|poner=puse, puso|querer=quise, quiso|venir=vine, vino|decir=dije, dijo|dar=di, dio' },
    ],
    ex: 'Fui a Barcelona en verano.=Jag åkte till Barcelona i somras.|¿Qué hiciste ayer?=Vad gjorde du igår?|Tuvimos suerte.=Vi hade tur.',
    m: ['Hice, inte hací.', 'Fue kan betyda både han gick och han var. Sammanhanget avgör.', 'Dijeron, inte dijieron.'],
    q: [
      ['Ayer yo ___ al cine. (ir)', 'fui', 'Igår gick jag på bio.'],
      ['¿Qué ___ tú el sábado? (hacer)', 'hiciste', 'Vad gjorde du i lördags?'],
      ['Él ___ que no. (decir)', 'dijo', 'Han sa nej.'],
      ['Nosotros ___ en casa. (estar)', 'estuvimos', 'Vi var hemma.'],
      ['Ella ___ un accidente. (tener)', 'tuvo', 'Hon råkade ut för en olycka.'],
      ['La fiesta ___ genial. (ser)', 'fue', 'Festen var fantastisk.'],
    ],
  },
  {
    step: 3, title: 'Objektspronomen', unit: 15, after: 1, intro: 'Pronomen som ersätter objektet: honom, henne, det, mig. De står före det böjda verbet.',
    s: [
      { h: 'Direkt objekt (vem/vad)', t: 'me=mig|te=dig|lo / la=honom, den, det / henne, den|nos=oss|os=er|los / las=dem' },
      { h: 'Indirekt objekt (till vem)', t: 'me=till mig|te=till dig|le=till honom / henne|nos=till oss|os=till er|les=till dem' },
      { h: 'Två pronomen', p: 'Indirekt kommer före direkt. Le och les blir se före lo/la: Se lo doy (jag ger honom det).' },
    ],
    ex: '¿Conoces a Pedro? Sí, lo conozco.=Känner du Pedro? Ja, jag känner honom.|Te llamo mañana.=Jag ringer dig imorgon.|Le escribo una carta.=Jag skriver ett brev till henne.',
    m: ['Le lo doy är fel. Det blir se lo doy.', 'Med infinitiv kan pronomenet sitta fast i slutet: Quiero verla.'],
    q: [
      ['¿El libro? ___ tengo yo.', 'lo', 'Boken? Jag har den.'],
      ['¿La película? No ___ he visto.', 'la', 'Filmen? Jag har inte sett den.'],
      ['___ doy un regalo a mi madre.', 'le', 'Jag ger min mamma en present.'],
      ['¿Me ayudas? Sí, ___ ayudo.', 'te', 'Hjälper du mig? Ja, jag hjälper dig.'],
      ['¿Las llaves? ___ tengo aquí.', 'las', 'Nycklarna? Jag har dem här.'],
      ['¿El libro a Juan? ___ lo doy.', 'se', 'Boken till Juan? Jag ger honom den.'],
    ],
  },
  {
    step: 3, title: 'Jämförelser', unit: 10, after: 2, intro: 'Mer än, mindre än, lika som, och den mest.',
    s: [
      { h: 'Jämförelse', t: 'más ... que=mer ... än|menos ... que=mindre ... än|tan ... como=lika ... som|tanto como=lika mycket som' },
      { h: 'Superlativ', t: 'el más alto=den längsta|la más bonita=den vackraste|-ísimo: guapísimo=jättesnygg' },
      { h: 'Oregelbundna', t: 'bueno → mejor=bra → bättre|malo → peor=dålig → sämre|grande → mayor=stor → äldre|pequeño → menor=liten → yngre' },
    ],
    ex: 'Madrid es más grande que Sevilla.=Madrid är större än Sevilla.|Mi hermano es mayor que yo.=Min bror är äldre än jag.|Es el mejor día de mi vida.=Det är den bästa dagen i mitt liv.',
    m: ['Más bueno är fel. Det heter mejor.', 'Tan ... como, inte tan ... que.'],
    q: [
      ['Ana es ___ alta que Luis.', 'más', 'Ana är längre än Luis.'],
      ['Este libro es ___ que el otro. (bättre)', 'mejor', 'Den här boken är bättre än den andra.'],
      ['Soy tan alto ___ tú.', 'como', 'Jag är lika lång som du.'],
      ['Es el ___ restaurante de la ciudad. (sämsta)', 'peor', 'Det är stadens sämsta restaurang.'],
      ['Mi hermana es ___ que yo. (yngre)', 'menor', 'Min syster är yngre än jag.'],
    ],
  },

  /* ---------------- Steg 4 ---------------- */
  {
    step: 4, title: 'Imperfecto', unit: 13, after: 2, intro: 'Dåtid för bakgrund, vanor och hur något var: brukade, höll på med.',
    s: [
      { h: '-ar: hablar', t: 'hablaba|hablabas|hablaba|hablábamos|hablabais|hablaban' },
      { h: '-er och -ir: comer, vivir', t: 'comía / vivía|comías / vivías|comía / vivía|comíamos / vivíamos|comíais / vivíais|comían / vivían' },
      { h: 'Bara tre oregelbundna', t: 'ser=era, eras, era, éramos, erais, eran|ir=iba, ibas, iba, íbamos, ibais, iban|ver=veía, veías, veía...' },
    ],
    ex: 'Cuando era pequeño, vivía en Malmö.=När jag var liten bodde jag i Malmö.|Todos los veranos íbamos a la playa.=Varje sommar åkte vi till stranden.|Hacía sol.=Det var soligt.',
    m: ['Jag- och han-formen är likadana: yo hablaba, él hablaba.'],
    q: [
      ['Cuando ___ niño, jugaba mucho. (ser, yo)', 'era', 'När jag var barn lekte jag mycket.'],
      ['Antes nosotros ___ en Lund. (vivir)', 'vivíamos', 'Förut bodde vi i Lund.'],
      ['Ella siempre ___ música. (escuchar)', 'escuchaba', 'Hon lyssnade alltid på musik.'],
      ['Todos los días ___ al colegio a pie. (ir, yo)', 'iba', 'Varje dag gick jag till skolan.'],
      ['Ellos ___ mucha televisión. (ver)', 'veían', 'De tittade mycket på tv.'],
    ],
  },
  {
    step: 4, title: 'Indefinido eller imperfecto', unit: 13, after: 3, intro: 'Indefinido berättar vad som hände. Imperfecto målar upp bakgrunden.',
    s: [
      { h: 'Indefinido', p: 'Avslutade händelser med tydlig början eller slut. Signalord: ayer, el año pasado, de repente, una vez.' },
      { h: 'Imperfecto', p: 'Beskrivningar, väder, ålder, känslor, vanor och något som pågick. Signalord: siempre, cada día, antes, mientras.' },
      { h: 'Tillsammans', p: 'Något pågick (imperfecto) när något hände (indefinido).', t: 'Leía cuando sonó el teléfono.=Jag läste när telefonen ringde.' },
    ],
    ex: 'Hacía frío y llovía. De repente, vi a Marta.=Det var kallt och regnade. Plötsligt såg jag Marta.|Tenía diez años cuando aprendí a nadar.=Jag var tio år när jag lärde mig simma.',
    m: ['Fråga dig: är det en händelse i berättelsen (indefinido) eller en beskrivning av läget (imperfecto)?'],
    q: [
      ['Ayer ___ al cine. (ir, yo)', 'fui', 'Igår gick jag på bio.'],
      ['De niño, siempre ___ al fútbol. (jugar, yo)', 'jugaba', 'Som barn spelade jag alltid fotboll.'],
      ['___ sol cuando salimos. (hacer)', 'hacía', 'Det var soligt när vi gick ut.'],
      ['Dormía cuando ___ el teléfono. (sonar)', 'sonó', 'Jag sov när telefonen ringde.'],
      ['El año pasado ___ a Italia. (viajar, nosotros)', 'viajamos', 'Förra året reste vi till Italien.'],
      ['La casa ___ muy grande. (ser, beskrivning)', 'era', 'Huset var väldigt stort.'],
    ],
  },
  {
    step: 4, title: 'Futuro simple', unit: 14, after: 2, intro: 'Ren framtid. Lägg ändelsen direkt på hela infinitiven. Samma ändelser för alla verb.',
    s: [
      { h: 'Hablar', t: 'hablaré|hablarás|hablará|hablaremos|hablaréis|hablarán' },
      { h: 'Oregelbunden stam', t: 'tener=tendré|hacer=haré|poder=podré|salir=saldré|venir=vendré|decir=diré|saber=sabré|poner=pondré' },
      { h: 'Gissningar', p: 'Futuro används också för att gissa: ¿Dónde estará Pablo? (Var kan Pablo vara?)' },
    ],
    ex: 'Mañana lloverá.=Imorgon kommer det att regna.|En el futuro viviré en España.=I framtiden ska jag bo i Spanien.|¿Vendrás a la fiesta?=Kommer du till festen?',
    m: ['Alla former utom nosotros har accent.', 'Teneré är fel. Det heter tendré.'],
    q: [
      ['Mañana ___ a Ana. (llamar, yo)', 'llamaré', 'Imorgon ringer jag Ana.'],
      ['El año que viene ___ en Madrid. (vivir, nosotros)', 'viviremos', 'Nästa år ska vi bo i Madrid.'],
      ['¿Qué ___ tú? (hacer)', 'harás', 'Vad ska du göra?'],
      ['Ellos ___ tarde. (venir)', 'vendrán', 'De kommer att komma sent.'],
      ['Yo no ___ ir. (poder)', 'podré', 'Jag kommer inte att kunna gå.'],
    ],
  },
  {
    step: 4, title: 'Imperativ', unit: 11, after: 2, intro: 'Uppmaningar. Tú-formen är oftast samma som han-formen i presens.',
    s: [
      { h: 'Tú, jakande', t: '¡Habla!=Prata!|¡Come!=Ät!|¡Escribe!=Skriv!' },
      { h: 'Oregelbundna tú-former', t: 'tener=ten|hacer=haz|poner=pon|salir=sal|venir=ven|decir=di|ir=ve|ser=sé' },
      { h: 'Usted och nekande', p: 'Usted-formen och alla nekande former tar ändelsen från subjuntivo: ¡Hable! (tala, artigt), ¡No hables! (prata inte).' },
      { h: 'Pronomen', p: 'Fäst pronomen efter jakande imperativ: ¡Dímelo! (säg det till mig). Före nekande: ¡No me lo digas!' },
    ],
    ex: '¡Ven aquí!=Kom hit!|Abre la ventana, por favor.=Öppna fönstret, tack.|¡No toques eso!=Rör inte det där!',
    m: ['¡No habla! är fel som förbud. Det heter ¡No hables!'],
    q: [
      ['¡___ la puerta! (cerrar, tú)', 'cierra', 'Stäng dörren!'],
      ['¡___ aquí! (venir, tú)', 'ven', 'Kom hit!'],
      ['¡___ los deberes! (hacer, tú)', 'haz', 'Gör läxorna!'],
      ['¡No ___ tan rápido! (hablar, tú)', 'hables', 'Prata inte så fort!'],
      ['¡___ la verdad! (decir, tú)', 'di', 'Säg sanningen!'],
    ],
  },
  {
    step: 4, title: 'Por och para', unit: 15, after: 3, intro: 'Båda kan bli för på svenska. Para handlar om mål och syfte, por om orsak och väg.',
    s: [
      { h: 'Para', t: 'syfte=Estudio para aprender.|mottagare=Es para ti.|riktning=Salgo para Madrid.|deadline=Para el lunes.' },
      { h: 'Por', t: 'orsak=Gracias por todo.|genom, längs=Paseo por el parque.|tid på dygnet=Por la mañana.|pris, utbyte=Lo compré por diez euros.|medel=Hablar por teléfono.' },
    ],
    ex: 'Este regalo es para mi madre.=Den här presenten är till min mamma.|Gracias por tu ayuda.=Tack för din hjälp.|Trabajo para ganar dinero.=Jag jobbar för att tjäna pengar.',
    m: ['Gracias para är alltid fel. Det heter gracias por.', 'Para + infinitiv betyder för att.'],
    q: [
      ['Gracias ___ la cena.', 'por', 'Tack för middagen.'],
      ['El regalo es ___ ti.', 'para', 'Presenten är till dig.'],
      ['Estudio ___ ser médico.', 'para', 'Jag pluggar för att bli läkare.'],
      ['Caminamos ___ la playa.', 'por', 'Vi går längs stranden.'],
      ['Trabajo ___ la mañana.', 'por', 'Jag jobbar på förmiddagen.'],
    ],
  },

  /* ---------------- Steg 5 ---------------- */
  {
    step: 5, title: 'Condicional', unit: 16, after: 1, intro: 'Skulle. Bildas som futuro (hela infinitiven plus ändelse) men med imperfecto-ändelser.',
    s: [
      { h: 'Hablar', t: 'hablaría|hablarías|hablaría|hablaríamos|hablaríais|hablarían' },
      { h: 'Samma oregelbundna stam som futuro', t: 'tener=tendría|hacer=haría|poder=podría|querer=querría|decir=diría|salir=saldría' },
      { h: 'Användning', p: 'Önskningar, artiga frågor och råd: Me gustaría... (jag skulle vilja), ¿Podrías...? (skulle du kunna), Yo que tú, iría (i ditt ställe skulle jag gå).' },
    ],
    ex: 'Me gustaría viajar a Cuba.=Jag skulle vilja resa till Kuba.|¿Podrías ayudarme?=Skulle du kunna hjälpa mig?|Yo no haría eso.=Jag skulle inte göra så.',
    m: ['Accent på í i alla former: hablaría.'],
    q: [
      ['Me ___ un café. (gustar)', 'gustaría', 'Jag skulle vilja ha en kaffe.'],
      ['¿___ abrir la ventana? (poder, tú)', 'podrías', 'Skulle du kunna öppna fönstret?'],
      ['Yo que tú, no lo ___. (hacer)', 'haría', 'I ditt ställe skulle jag inte göra det.'],
      ['Nosotros ___ en la playa. (vivir)', 'viviríamos', 'Vi skulle bo vid stranden.'],
      ['Ella ___ más tiempo. (tener)', 'tendría', 'Hon skulle ha mer tid.'],
    ],
  },
  {
    step: 5, title: 'Subjuntivo presente', unit: 17, after: 2, intro: 'Ett verbmodus för önskningar, känslor, tvivel och krav. Det kommer efter que när huvudsatsen uttrycker något sådant.',
    s: [
      { h: 'Så bildas det', p: 'Ta jag-formen i presens, ta bort -o och byt vokal: -ar får e-ändelser och -er/-ir får a-ändelser.', t: 'hablar (hablo)=hable, hables, hable, hablemos, habléis, hablen|comer (como)=coma, comas, coma, comamos, comáis, coman|tener (tengo)=tenga, tengas, tenga...|hacer (hago)=haga, hagas, haga...' },
      { h: 'Oregelbundna', t: 'ser=sea|ir=vaya|estar=esté|saber=sepa|haber=haya|dar=dé' },
      { h: 'Utlösare', t: 'Quiero que...=Jag vill att...|Espero que...=Jag hoppas att...|Es importante que...=Det är viktigt att...|No creo que...=Jag tror inte att...|Me alegro de que...=Jag är glad att...|Cuando + framtid=När (i framtiden)...' },
    ],
    ex: 'Quiero que vengas.=Jag vill att du kommer.|Espero que tengas un buen día.=Jag hoppas att du har en bra dag.|Cuando llegue, te llamo.=När jag kommer fram ringer jag dig.',
    m: ['Samma subjekt i båda satser ger infinitiv: Quiero ir (inte quiero que yo vaya).', 'Creo que tar vanlig presens: Creo que viene. No creo que tar subjuntivo: No creo que venga.'],
    q: [
      ['Quiero que tú ___. (venir)', 'vengas', 'Jag vill att du kommer.'],
      ['Espero que ___ buen tiempo. (hacer)', 'haga', 'Jag hoppas att det blir fint väder.'],
      ['Es importante que ___ mucho. (estudiar, tú)', 'estudies', 'Det är viktigt att du pluggar mycket.'],
      ['No creo que ella ___ en casa. (estar)', 'esté', 'Jag tror inte att hon är hemma.'],
      ['Cuando ___ mayor, viajaré. (ser, yo)', 'sea', 'När jag blir äldre ska jag resa.'],
      ['Mis padres quieren que yo ___ a la universidad. (ir)', 'vaya', 'Mina föräldrar vill att jag går på universitetet.'],
    ],
  },
  {
    step: 5, title: 'Si-satser', unit: 16, after: 3, intro: 'Om-meningar. Vilken tid som används beror på hur troligt något är.',
    s: [
      { h: 'Troligt', t: 'Si + presens, presens / futuro=Si llueve, me quedo en casa. (Om det regnar stannar jag hemma.)' },
      { h: 'Tänkt eller osannolikt', p: 'Si + subjuntivo imperfecto, sedan condicional. Imperfecto av subjuntivo bildas från de-formen i indefinido: tuvieron → tuviera.', t: 'tener=tuviera|ser / ir=fuera|poder=pudiera|hablar=hablara|vivir=viviera' },
    ],
    ex: 'Si tengo tiempo, te ayudaré.=Om jag har tid ska jag hjälpa dig.|Si tuviera dinero, viajaría.=Om jag hade pengar skulle jag resa.|Si fuera tú, lo haría.=Om jag vore du skulle jag göra det.',
    m: ['Aldrig condicional direkt efter si: si tendría är fel.', 'Aldrig presens subjuntivo efter si: si tenga är fel.'],
    q: [
      ['Si ___, me quedo en casa. (llover)', 'llueve', 'Om det regnar stannar jag hemma.'],
      ['Si tuviera tiempo, ___ más. (leer, yo)', 'leería', 'Om jag hade tid skulle jag läsa mer.'],
      ['Si ___ rico, compraría una casa. (ser, yo)', 'fuera', 'Om jag var rik skulle jag köpa ett hus.'],
      ['Si ___ dinero, viajaría. (tener, yo)', 'tuviera', 'Om jag hade pengar skulle jag resa.'],
      ['Si estudias, ___ el examen. (aprobar, tú, futuro)', 'aprobarás', 'Om du pluggar klarar du provet.'],
    ],
  },
];
