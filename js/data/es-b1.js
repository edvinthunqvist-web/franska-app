// Kursinnehåll: spanska, enhet 13–17 (på väg mot B1). Samma format som es.js.
// Enheterna hör ihop med grammatiken i steg 3–5 (se grammar-es.js).

window.COURSES.es.units.push(
  {
    title: 'Minnen och berättelser', level: 'B1',
    lessons: [
      {
        t: 'El fin de semana pasado', i: 'Berätta vad du gjorde och vart du åkte.',
        d: "Lucía: ¿Qué hiciste el sábado?=Vad gjorde du i lördags?|Pablo: Fui a la playa con mis primos.=Jag åkte till stranden med mina kusiner.|Lucía: ¿Y qué tal?=Och hur var det?|Pablo: Fue genial. Tuvimos mucha suerte con el tiempo.=Det var jättebra. Vi hade tur med vädret.",
        w: "fui=jag åkte / var|hice=jag gjorde|tuve=jag hade|estuve=jag var (någonstans)|vine=jag kom|dije=jag sa|el primo / la prima=kusinen|la suerte=turen",
        s: "Estuve en casa todo el día.=Jag var hemma hela dagen.|Hicimos una fiesta.=Vi hade en fest.|Mi hermana vino tarde.=Min syster kom sent.|Le dije la verdad.=Jag sa sanningen till honom.",
        u: 'Oregelbundna dåtidsformer har ingen accent: hice, tuve, fue.'
      },
      {
        t: 'Cuando era pequeño', i: 'Berätta hur det var förr och vad du brukade göra.',
        d: "Pablo: ¿Dónde vivías cuando eras pequeña?=Var bodde du när du var liten?|Lucía: Vivía en un pueblo cerca de Sevilla.=Jag bodde i en by nära Sevilla.|Pablo: ¿Qué hacías los veranos?=Vad gjorde du på somrarna?|Lucía: Iba a la piscina todos los días.=Jag gick till badet varje dag.",
        w: "el pueblo=byn|pequeño / pequeña=liten|la piscina=simbassängen|antes=förut|siempre=alltid|a menudo=ofta|el abuelo / la abuela=morfar / mormor|acordarse de=att minnas",
        s: "Cuando era pequeño, vivía en Lund.=När jag var liten bodde jag i Lund.|Mi abuela cocinaba muy bien.=Min mormor lagade mat väldigt bra.|Siempre jugábamos en la calle.=Vi lekte alltid på gatan.|Me acuerdo de mi primer perro.=Jag minns min första hund.",
        u: 'Ändelsen -aba betonas på första a:et: jugaba = "hu-GA-ba".'
      },
      {
        t: 'Una historia', i: 'Berätta en händelse med bakgrund och handling.',
        d: "Lucía: ¿Qué pasó?=Vad hände?|Pablo: Llovía mucho y yo caminaba a casa.=Det regnade mycket och jag gick hem.|Pablo: De repente, vi a una amiga del colegio.=Plötsligt såg jag en vän från skolan.|Lucía: ¡Qué coincidencia!=Vilket sammanträffande!",
        w: "de repente=plötsligt|mientras=medan|pasar=att hända|contar=att berätta|primero=först|después=sedan|al final=till slut|una coincidencia=ett sammanträffande",
        s: "Hacía sol cuando salí.=Det var soligt när jag gick ut.|Leía cuando sonó el teléfono.=Jag läste när telefonen ringde.|Primero cenamos y después fuimos al cine.=Först åt vi middag och sedan gick vi på bio.|Al final, todo salió bien.=Till slut gick allt bra.",
        u: 'De repente uttalas med rullande r: "de rre-PEN-te".'
      }
    ],
    write: [{ q: 'Berätta om ett minne från när du var liten. Beskriv hur det var och vad som hände.', kw: ['era', 'cuando', 'de repente'], ex: 'Cuando era pequeño, vivía en un pueblo. Un día llovía mucho. De repente, mi perro salió corriendo.' }],
    qa: [
      { q: '¿Qué hiciste el fin de semana pasado?', sv: 'Vad gjorde du förra helgen?', kw: ['fui', 'hice', 'estuve'], ex: 'Fui al cine con mis amigos.' },
      { q: '¿Dónde vivías cuando eras pequeño?', sv: 'Var bodde du när du var liten?', kw: ['vivía'], ex: 'Vivía en Malmö.' }
    ]
  },
  {
    title: 'Erfarenheter och framtid', level: 'B1',
    lessons: [
      {
        t: '¿Has estado en…?', i: 'Prata om saker du har gjort (perfekt).',
        d: "Lucía: ¿Has estado alguna vez en México?=Har du någonsin varit i Mexiko?|Pablo: No, nunca he estado allí.=Nej, jag har aldrig varit där.|Lucía: Yo he viajado mucho este año.=Jag har rest mycket i år.|Pablo: ¡Qué envidia!=Vad avundsjuk jag är!",
        w: "alguna vez=någon gång|nunca=aldrig|ya=redan|todavía no=inte än|este año=i år|hoy=idag|la envidia=avundsjukan|probar=att prova / smaka",
        s: "Ya he comido.=Jag har redan ätit.|Todavía no he visto la película.=Jag har inte sett filmen än.|¿Has probado la paella?=Har du smakat paella?|Hoy hemos trabajado mucho.=Idag har vi jobbat mycket.",
        u: 'H är alltid stum: he = "e", has = "as".'
      },
      {
        t: 'Dentro de diez años', i: 'Berätta hur ditt liv kommer att se ut (futuro).',
        d: "Pablo: ¿Dónde vivirás dentro de diez años?=Var kommer du att bo om tio år?|Lucía: Viviré en Barcelona, creo.=Jag kommer att bo i Barcelona, tror jag.|Pablo: ¿Y qué harás?=Och vad kommer du att göra?|Lucía: Seré arquitecta y tendré un perro.=Jag blir arkitekt och kommer att ha en hund.",
        w: "dentro de diez años=om tio år|el futuro=framtiden|seré=jag kommer att vara|tendré=jag kommer att ha|haré=jag kommer att göra|algún día=någon dag|esperar=att hoppas|llegar a ser=att bli",
        s: "Algún día tendré una casa grande.=Någon dag kommer jag att ha ett stort hus.|Mañana hará calor.=Imorgon blir det varmt.|Ya veremos.=Vi får se.|Mi hermano será médico.=Min bror kommer att bli läkare.",
        u: 'Futuro har betoning på sista stavelsen: viviré = "vivi-RE".'
      },
      {
        t: 'El tiempo de mañana', i: 'Väderprognos och planer som beror på vädret.',
        d: "Lucía: ¿Has visto el pronóstico?=Har du sett prognosen?|Pablo: Sí, mañana lloverá por la mañana.=Ja, imorgon kommer det att regna på förmiddagen.|Lucía: Entonces iremos al museo.=Då går vi till museet.|Pablo: Vale. Por la tarde saldrá el sol.=Okej. På eftermiddagen kommer solen fram.",
        w: "el pronóstico=prognosen|lloverá=det kommer att regna|nevará=det kommer att snöa|el sol=solen|una nube=ett moln|la temperatura=temperaturen|grados=grader|entonces=då",
        s: "Nevará en el norte.=Det kommer att snöa i norr.|La temperatura será de veinte grados.=Temperaturen blir tjugo grader.|Si hace sol, iremos a la playa.=Om det är soligt åker vi till stranden.|Habrá nubes.=Det blir moln.",
        u: 'Ll i lloverá uttalas som "j": "jove-RA".'
      }
    ],
    write: [{ q: 'Beskriv hur ditt liv ser ut om tio år.', kw: ['dentro de', 'seré', 'tendré'], ex: 'Dentro de diez años viviré en Madrid. Seré profesor y tendré dos gatos.' }],
    qa: [
      { q: '¿Has estado alguna vez en España?', sv: 'Har du någonsin varit i Spanien?', kw: ['he', 'nunca', 'estado'], ex: 'Sí, he estado en Málaga.' },
      { q: '¿Qué harás el verano que viene?', sv: 'Vad ska du göra nästa sommar?', kw: ['haré', 'iré', 'voy'], ex: 'Trabajaré y iré a la playa.' }
    ]
  },
  {
    title: 'Relationer och åsikter', level: 'B1',
    lessons: [
      {
        t: 'Mis amigos', i: 'Prata om vänner och vad ni gör tillsammans.',
        d: "Lucía: ¿Conoces a Marta?=Känner du Marta?|Pablo: Sí, la conozco muy bien. La veo todos los días.=Ja, jag känner henne väldigt väl. Jag träffar henne varje dag.|Lucía: ¿Y a su hermano?=Och hennes bror?|Pablo: No, no lo conozco.=Nej, jag känner inte honom.",
        w: "el amigo / la amiga=vännen|conocer=att känna (någon)|llevarse bien=att komma bra överens|discutir=att bråka|la confianza=förtroendet|simpático / simpática=trevlig|gracioso / graciosa=rolig|quedar=att träffas",
        s: "Me llevo bien con mi hermana.=Jag kommer bra överens med min syster.|La conocí en el colegio.=Jag träffade henne i skolan.|Siempre discuten.=De bråkar alltid.|¿Quedamos el viernes?=Ses vi på fredag?",
        u: 'Conozco uttalas med "th"-ljud i Spanien: "ko-NOTH-ko".'
      },
      {
        t: 'Un regalo', i: 'Ge, låna och skicka saker (objektspronomen).',
        d: "Pablo: ¿Qué le regalas a tu madre?=Vad ger du din mamma?|Lucía: Le regalo un libro.=Jag ger henne en bok.|Pablo: ¿Ya se lo has dado?=Har du redan gett henne den?|Lucía: No, se lo doy mañana, en su cumpleaños.=Nej, jag ger henne den imorgon, på hennes födelsedag.",
        w: "regalar=att ge (en present)|el regalo=presenten|prestar=att låna ut|enviar=att skicka|llamar=att ringa|contestar=att svara|un mensaje=ett meddelande|el cumpleaños=födelsedagen",
        s: "Le envío un mensaje.=Jag skickar ett meddelande till honom.|¿Les llamas esta noche?=Ringer du dem ikväll?|Te lo presto.=Jag lånar ut den till dig.|Me lo dijo ayer.=Han sa det till mig igår.",
        u: 'Se lo uttalas som ett ord: "selo".'
      },
      {
        t: 'Creo que…', i: 'Säg vad du tycker och förklara varför.',
        d: "Lucía: ¿Te gustó la película?=Gillade du filmen?|Pablo: Sí, creo que es muy buena.=Ja, jag tycker att den är jättebra.|Lucía: Para mí, la historia es demasiado larga.=För mig är historien för lång.|Pablo: Vale, pero los actores son geniales.=Okej, men skådespelarna är fantastiska.",
        w: "creo que=jag tror / tycker att|en mi opinión=enligt mig|para mí=för mig|estar de acuerdo=att hålla med|porque=eftersom|sin embargo=däremot|demasiado=för (mycket)|el actor / la actriz=skådespelaren",
        s: "En mi opinión, es una buena idea.=Enligt mig är det en bra idé.|No estoy de acuerdo.=Jag håller inte med.|Gracias por tu ayuda.=Tack för din hjälp.|Estudio para aprender, no para aprobar.=Jag pluggar för att lära mig, inte för att klara provet.",
        u: 'Opinión betonas på sista stavelsen.'
      }
    ],
    write: [{ q: 'Beskriv din bästa vän och säg vad du tycker om hen.', kw: ['creo que', 'porque', 'es'], ex: 'Mi mejor amiga se llama Sara. Creo que es muy graciosa porque siempre me hace reír.' }],
    qa: [
      { q: '¿Llamas a menudo a tus padres?', sv: 'Ringer du ofta dina föräldrar?', kw: ['les', 'llamo'], ex: 'Sí, les llamo todos los días.' },
      { q: '¿Qué opinas de las redes sociales?', sv: 'Vad tycker du om sociala medier?', kw: ['creo', 'opinión', 'para mí'], ex: 'Creo que son prácticas, pero también peligrosas.' }
    ]
  },
  {
    title: 'Drömmar och önskningar', level: 'B1',
    lessons: [
      {
        t: 'Me gustaría…', i: 'Säg vad du skulle vilja och fråga artigt.',
        d: "Pablo: ¿Qué te gustaría hacer este verano?=Vad skulle du vilja göra i sommar?|Lucía: Me gustaría aprender a surfear.=Jag skulle vilja lära mig surfa.|Pablo: ¡Podrías venir a Cádiz con nosotros!=Du kunde följa med till Cádiz!|Lucía: ¡Sería genial!=Det skulle vara fantastiskt!",
        w: "me gustaría=jag skulle vilja|querría=jag skulle vilja|podrías=du skulle kunna|sería=det skulle vara|un sueño=en dröm|soñar con=att drömma om|aprender=att lära sig|genial=fantastiskt",
        s: "Sueño con ver Tokio.=Jag drömmer om att se Tokyo.|¿Podría ayudarme?=Skulle ni kunna hjälpa mig?|Sería más fácil.=Det skulle vara enklare.|Nos gustaría salir pronto.=Vi skulle vilja åka tidigt.",
        u: 'Gustaría betonas på í: "gusta-RI-a".'
      },
      {
        t: 'El trabajo de mis sueños', i: 'Berätta om drömjobbet och varför.',
        d: "Lucía: ¿Cuál es el trabajo de tus sueños?=Vilket är ditt drömjobb?|Pablo: Me gustaría ser piloto.=Jag skulle vilja bli pilot.|Lucía: ¿Por qué?=Varför?|Pablo: Porque podría viajar por todo el mundo.=För att jag skulle kunna resa över hela världen.",
        w: "el trabajo=jobbet|el sueldo=lönen|el piloto / la piloto=piloten|el veterinario / la veterinaria=veterinären|el mundo=världen|ayudar a la gente=att hjälpa människor|interesante=intressant|la profesión=yrket",
        s: "Me gustaría ayudar a la gente.=Jag skulle vilja hjälpa människor.|El sueldo sería bueno.=Lönen skulle vara bra.|Ella querría ser veterinaria.=Hon skulle vilja bli veterinär.|Es una profesión muy interesante.=Det är ett väldigt intressant yrke.",
        u: 'Sueldo uttalas "SUEL-do" i två stavelser.'
      },
      {
        t: 'Si fuera rico…', i: 'Fantisera om vad du skulle göra om...',
        d: "Lucía: ¿Qué harías si ganaras la lotería?=Vad skulle du göra om du vann på lotteriet?|Pablo: Si fuera rico, compraría una casa en la playa.=Om jag var rik skulle jag köpa ett hus vid stranden.|Lucía: Yo daría la vuelta al mundo.=Jag skulle resa jorden runt.|Pablo: ¡Si te vas, voy contigo!=Om du åker följer jag med!",
        w: "si=om|ganar=att vinna|rico / rica=rik|comprar=att köpa|la lotería=lotteriet|dar la vuelta al mundo=att resa jorden runt|regalar dinero=att ge bort pengar|contigo=med dig",
        s: "Si tuviera tiempo, leería más.=Om jag hade tid skulle jag läsa mer.|Si vienes, iremos al cine.=Om du kommer går vi på bio.|Daría dinero a mi familia.=Jag skulle ge pengar till min familj.|Si hace sol, saldremos.=Om det är soligt går vi ut.",
        u: 'Fuera uttalas "FUE-ra" i två stavelser.'
      }
    ],
    write: [{ q: 'Vad skulle du göra om du vann en miljon kronor? Skriv tre meningar.', kw: ['si', 'compraría', 'haría'], ex: 'Si ganara un millón, compraría un coche. Haría un viaje largo. También daría dinero a mi familia.' }],
    qa: [
      { q: '¿Cuál es el trabajo de tus sueños?', sv: 'Vilket är ditt drömjobb?', kw: ['gustaría', 'ser'], ex: 'Me gustaría ser periodista.' },
      { q: '¿Dónde vivirías si pudieras elegir?', sv: 'Var skulle du bo om du kunde välja?', kw: ['viviría'], ex: 'Viviría en Valencia.' }
    ]
  },
  {
    title: 'Samhälle och miljö', level: 'B1',
    lessons: [
      {
        t: 'El medio ambiente', i: 'Prata om miljön och vad man kan göra.',
        d: "Pablo: ¿Qué haces por el medio ambiente?=Vad gör du för miljön?|Lucía: Voy en bici y reciclo.=Jag cyklar och källsorterar.|Pablo: Yo como menos carne.=Jag äter mindre kött.|Lucía: Es una buena idea.=Det är en bra idé.",
        w: "el medio ambiente=miljön|reciclar=att källsortera|la contaminación=föroreningarna|el clima=klimatet|la basura=soporna|ahorrar energía=att spara energi|el planeta=planeten|proteger=att skydda",
        s: "Hay que proteger el planeta.=Man måste skydda planeten.|La contaminación es un gran problema.=Föroreningarna är ett stort problem.|Separo la basura.=Jag sorterar soporna.|El clima cambia rápido.=Klimatet förändras snabbt.",
        u: 'Medio ambiente uttalas "MEdjo am-BJEN-te".'
      },
      {
        t: 'Es importante que…', i: 'Säg vad som måste göras och vad du önskar (subjuntivo).',
        d: "Lucía: Es importante que cambiemos nuestros hábitos.=Det är viktigt att vi ändrar våra vanor.|Pablo: Sí, es necesario que viajemos menos en avión.=Ja, det är nödvändigt att vi flyger mindre.|Lucía: Quiero que el instituto ponga paneles solares.=Jag vill att skolan sätter upp solpaneler.|Pablo: ¡Ojalá lo hagan!=Hoppas att de gör det!",
        w: "es importante que=det är viktigt att|es necesario que=det är nödvändigt att|quiero que=jag vill att|ojalá=förhoppningsvis|el hábito=vanan|el avión=flyget|el panel solar=solpanelen|el instituto=gymnasiet",
        s: "Quiero que vengas.=Jag vill att du kommer.|Espero que estés bien.=Jag hoppas att du mår bra.|Es importante que hablemos.=Det är viktigt att vi pratar.|Ojalá haga sol mañana.=Förhoppningsvis blir det sol imorgon.",
        u: 'Ojalá betonas på sista a:et: "oha-LA".'
      },
      {
        t: 'Los medios', i: 'Nyheter, sociala medier och vad du tror på.',
        d: "Pablo: Lo que no me gusta son las noticias falsas.=Det jag inte gillar är falska nyheter.|Lucía: Sí, hay que comprobar lo que lees.=Ja, man måste kontrollera det man läser.|Pablo: El periódico que te recomendé es serio.=Tidningen som jag rekommenderade är seriös.|Lucía: Lo voy a leer.=Jag ska läsa den.",
        w: "los medios=medierna|las noticias=nyheterna|el periódico=tidningen|las redes sociales=sociala medier|comprobar=att kontrollera|falso / falsa=falsk|la fuente=källan|creer=att tro",
        s: "Lo que me interesa es la política.=Det som intresserar mig är politik.|No creo todo lo que leo.=Jag tror inte på allt jag läser.|No creo que sea verdad.=Jag tror inte att det är sant.|Hay que comprobar la fuente.=Man måste kontrollera källan.",
        u: 'Periódico betonas på ó: "pe-RJO-diko".'
      }
    ],
    write: [{ q: 'Skriv vad du tycker att vi måste göra för miljön.', kw: ['es importante que', 'creo', 'medio ambiente'], ex: 'Creo que es importante que reciclemos. También es necesario que viajemos menos en avión.' }],
    qa: [
      { q: '¿Qué haces por el medio ambiente?', sv: 'Vad gör du för miljön?', kw: ['reciclo', 'bici', 'voy'], ex: 'Reciclo y voy en bici.' },
      { q: '¿Qué esperas del futuro?', sv: 'Vad hoppas du på inför framtiden?', kw: ['espero que', 'ojalá'], ex: 'Espero que el mundo sea más justo.' }
    ]
  }
);
