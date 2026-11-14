// Kursinnehåll: franska, enhet 13–18 (på väg mot B1). Samma format som fr.js.
// Enheterna hör ihop med grammatiken i steg 3–5 (se grammar-fr.js).

window.COURSES.fr.units.push(
  {
    title: 'Minnen och berättelser', level: 'B1',
    lessons: [
      {
        t: 'Le week-end dernier', i: 'Berätta vart du åkte och när du kom hem.',
        d: "Léa: Tu es sorti samedi ?=Gick du ut i lördags?|Hugo: Oui, je suis allé au cinéma avec Emma.=Ja, jag gick på bio med Emma.|Léa: Vous êtes rentrés tard ?=Kom ni hem sent?|Hugo: Non, nous sommes rentrés à onze heures.=Nej, vi kom hem klockan elva.",
        w: "sortir=att gå ut|rentrer=att komma hem|partir=att åka iväg|arriver=att komma fram|rester=att stanna|tomber=att ramla|né / née=född|tard=sent",
        s: "Je suis parti à huit heures.=Jag åkte klockan åtta.|Elle est arrivée en retard.=Hon kom för sent.|Nous sommes restés à la maison.=Vi stannade hemma.|Il est tombé dans la rue.=Han ramlade på gatan.",
        u: 'I passé composé med être hörs ändelsen oftast inte: allé och allée låter likadant.'
      },
      {
        t: "Quand j'étais petit", i: 'Berätta hur det var förr och vad du brukade göra.',
        d: "Emma: Où est-ce que tu habitais quand tu étais petit ?=Var bodde du när du var liten?|Hugo: J'habitais à la campagne.=Jag bodde på landet.|Emma: Qu'est-ce que tu faisais le week-end ?=Vad brukade du göra på helgerna?|Hugo: Je jouais dans la forêt avec mon chien.=Jag lekte i skogen med min hund.",
        w: "la campagne=landet|la forêt=skogen|petit / petite=liten|autrefois=förr i tiden|toujours=alltid|souvent=ofta|le grand-père=morfar / farfar|se souvenir=att minnas",
        s: "Quand j'étais petit, j'habitais à Lyon.=När jag var liten bodde jag i Lyon.|Nous allions souvent à la plage.=Vi åkte ofta till stranden.|Mon grand-père racontait des histoires.=Min morfar berättade historier.|Je me souviens de notre maison.=Jag minns vårt hus.",
        u: "Ändelserna -ais, -ait och -aient låter alla likadant: \"ä\"."
      },
      {
        t: 'Une histoire', i: 'Berätta en händelse med bakgrund och handling.',
        d: "Léa: Qu'est-ce qui s'est passé ?=Vad hände?|Hugo: Il pleuvait et je marchais vite.=Det regnade och jag gick fort.|Hugo: Tout à coup, j'ai vu un vieil ami.=Plötsligt såg jag en gammal vän.|Léa: C'est drôle ! Tu étais content ?=Vad roligt! Blev du glad?",
        w: "tout à coup=plötsligt|pendant que=medan|il pleuvait=det regnade|se passer=att hända|raconter=att berätta|une histoire=en historia|d'abord=först|ensuite=sedan",
        s: "Il faisait beau quand je suis sorti.=Det var fint väder när jag gick ut.|Je lisais quand le téléphone a sonné.=Jag läste när telefonen ringde.|D'abord, j'ai pris le bus.=Först tog jag bussen.|Ensuite, nous avons mangé.=Sedan åt vi.",
        u: "Tout à coup uttalas \"tu-ta-ku\" med bindning."
      }
    ],
    write: [{ q: 'Berätta om ett minne från när du var liten. Beskriv hur det var och vad som hände.', kw: ["j'étais", 'quand', 'tout à coup'], ex: "Quand j'étais petit, j'habitais à la campagne. Un jour, il pleuvait. Tout à coup, mon chien est parti dans la forêt !" }],
    qa: [
      { q: 'Où est-ce que tu habitais quand tu étais petit ?', sv: 'Var bodde du när du var liten?', kw: ["j'habitais"], ex: "J'habitais à Malmö." },
      { q: 'Tu es sorti le week-end dernier ?', sv: 'Gick du ut förra helgen?', kw: ['suis', 'allé', 'resté'], ex: 'Oui, je suis allé au cinéma.' }
    ]
  },
  {
    title: 'Framtid och planer', level: 'B1',
    lessons: [
      {
        t: "L'année prochaine", i: 'Prata om planer för nästa år.',
        d: "Emma: Qu'est-ce que tu vas faire après le lycée ?=Vad ska du göra efter gymnasiet?|Hugo: Je vais prendre une année sabbatique.=Jag ska ta ett sabbatsår.|Emma: Tu vas voyager ?=Ska du resa?|Hugo: Oui, je vais travailler et puis partir en Australie.=Ja, jag ska jobba och sedan åka till Australien.",
        w: "le lycée=gymnasiet|l'année prochaine=nästa år|un projet=en plan|une année sabbatique=ett sabbatsår|économiser=att spara pengar|décider=att bestämma|bientôt=snart|plus tard=senare",
        s: "L'année prochaine, je vais habiter à Paris.=Nästa år ska jag bo i Paris.|Elle va économiser pour un voyage.=Hon ska spara till en resa.|Nous allons décider bientôt.=Vi ska bestämma snart.|Quels sont tes projets ?=Vilka planer har du?",
        u: 'Lycée uttalas "lise".'
      },
      {
        t: 'Dans dix ans', i: 'Berätta hur ditt liv kommer att se ut (futur simple).',
        d: "Léa: Où est-ce que tu habiteras dans dix ans ?=Var kommer du att bo om tio år?|Hugo: J'habiterai à Montréal.=Jag kommer att bo i Montréal.|Léa: Et tu feras quoi comme travail ?=Och vad kommer du att jobba med?|Hugo: Je serai ingénieur, j'espère !=Jag blir ingenjör, hoppas jag!",
        w: "dans dix ans=om tio år|l'avenir=framtiden|je serai=jag kommer att vara|j'aurai=jag kommer att ha|je ferai=jag kommer att göra|un jour=en dag|espérer=att hoppas|devenir=att bli",
        s: "Un jour, j'aurai une grande maison.=En dag kommer jag att ha ett stort hus.|Il fera beau demain.=Det blir fint väder imorgon.|Nous verrons.=Vi får se.|Elle deviendra médecin.=Hon kommer att bli läkare.",
        u: "Futur slutar ofta på \"-ré\": j'habiterai låter \"schabitre\"."
      },
      {
        t: 'La météo de demain', i: 'Väderprognos och planer som beror på vädret.',
        d: "Emma: Tu as vu la météo ?=Har du sett väderprognosen?|Hugo: Oui, il pleuvra demain matin.=Ja, det kommer att regna imorgon bitti.|Emma: Alors on ira au musée.=Då går vi till museet.|Hugo: Bonne idée. Le soleil reviendra l'après-midi.=Bra idé. Solen kommer tillbaka på eftermiddagen.",
        w: "la météo=väderprognosen|il pleuvra=det kommer att regna|il neigera=det kommer att snöa|le soleil=solen|un nuage=ett moln|la température=temperaturen|degrés=grader|demain matin=imorgon bitti",
        s: "Il neigera dans le nord.=Det kommer att snöa i norr.|La température sera de vingt degrés.=Temperaturen blir tjugo grader.|On ira à la plage s'il fait beau.=Vi går till stranden om det är fint väder.|Il y aura des nuages.=Det blir moln.",
        u: 'Degrés uttalas "dögre".'
      }
    ],
    write: [{ q: 'Beskriv hur ditt liv ser ut om tio år.', kw: ['dans dix ans', 'serai', 'aurai'], ex: "Dans dix ans, j'habiterai à Paris. Je serai professeur et j'aurai un chat." }],
    qa: [
      { q: "Qu'est-ce que tu feras l'été prochain ?", sv: 'Vad ska du göra nästa sommar?', kw: ['ferai', 'irai', 'vais'], ex: "Je travaillerai et j'irai à la plage." },
      { q: 'Quel temps fera-t-il demain ?', sv: 'Hur blir vädret imorgon?', kw: ['fera', 'pleuvra', 'il'], ex: 'Il fera beau.' }
    ]
  },
  {
    title: 'Relationer och åsikter', level: 'B1',
    lessons: [
      {
        t: 'Mes amis', i: 'Prata om vänner och vad ni gör tillsammans.',
        d: "Léa: Tu connais Julie ?=Känner du Julie?|Hugo: Oui, je la connais bien. Je la vois tous les jours.=Ja, jag känner henne väl. Jag träffar henne varje dag.|Léa: Et son frère ?=Och hennes bror?|Hugo: Je ne le connais pas.=Jag känner inte honom.",
        w: "un ami / une amie=en vän|connaître=att känna (någon)|rencontrer=att träffa|s'entendre bien=att komma bra överens|se disputer=att bråka|la confiance=förtroendet|gentil / gentille=snäll|drôle=rolig",
        s: "Je m'entends bien avec ma sœur.=Jag kommer bra överens med min syster.|Je l'ai rencontré à l'école.=Jag träffade honom i skolan.|Ils se disputent souvent.=De bråkar ofta.|Elle est très drôle.=Hon är väldigt rolig.",
        u: 'Connais uttalas "konä".'
      },
      {
        t: 'Un cadeau', i: 'Ge, låna och skicka saker (lui, leur, y, en).',
        d: "Emma: Qu'est-ce que tu offres à ta mère ?=Vad ger du din mamma?|Hugo: Je lui offre un livre.=Jag ger henne en bok.|Emma: Et tu vas au magasin aujourd'hui ?=Och går du till affären idag?|Hugo: Oui, j'y vais maintenant.=Ja, jag går dit nu.",
        w: "offrir=att ge (en present)|un cadeau=en present|prêter=att låna ut|envoyer=att skicka|téléphoner à=att ringa till|répondre à=att svara|un message=ett meddelande|l'anniversaire=födelsedagen",
        s: "Je lui envoie un message.=Jag skickar ett meddelande till honom.|Tu leur téléphones ce soir ?=Ringer du dem ikväll?|Des cadeaux ? J'en ai trois.=Presenter? Jag har tre.|Paris ? J'y suis allé l'année dernière.=Paris? Jag var där förra året.",
        u: 'Lui uttalas "lyi" i en stavelse.'
      },
      {
        t: 'Je pense que…', i: 'Säg vad du tycker och förklara varför.',
        d: "Léa: Tu aimes le film que nous avons vu ?=Gillar du filmen som vi såg?|Hugo: Oui, je pense que c'est un très bon film.=Ja, jag tycker att det är en mycket bra film.|Léa: Moi, je trouve que l'histoire est trop longue.=Jag tycker att historien är för lång.|Hugo: D'accord, mais les acteurs sont super.=Okej, men skådespelarna är jättebra.",
        w: "je pense que=jag tycker att|je trouve que=jag tycker att|à mon avis=enligt mig|d'accord=överens / okej|parce que=eftersom|pourtant=ändå|l'avis=åsikten|un acteur / une actrice=en skådespelare",
        s: "À mon avis, c'est une bonne idée.=Enligt mig är det en bra idé.|Je ne suis pas d'accord.=Jag håller inte med.|C'est le livre qui a gagné le prix.=Det är boken som vann priset.|La ville où j'habite est petite.=Staden där jag bor är liten.",
        u: "Avis uttalas \"avi\", s:et hörs inte."
      }
    ],
    write: [{ q: 'Beskriv din bästa vän och säg vad du tycker om hen.', kw: ['je pense que', 'qui', 'parce que'], ex: "Ma meilleure amie s'appelle Sara. C'est une fille qui est très drôle. Je pense qu'elle est géniale parce qu'elle m'aide toujours." }],
    qa: [
      { q: 'Tu téléphones souvent à tes parents ?', sv: 'Ringer du ofta dina föräldrar?', kw: ['leur', 'téléphone'], ex: 'Oui, je leur téléphone tous les jours.' },
      { q: "Qu'est-ce que tu penses des réseaux sociaux ?", sv: 'Vad tycker du om sociala medier?', kw: ['je pense', 'je trouve', 'avis'], ex: "Je pense que c'est pratique, mais dangereux aussi." }
    ]
  },
  {
    title: 'Drömmar och önskningar', level: 'B1',
    lessons: [
      {
        t: "J'aimerais…", i: 'Säg vad du skulle vilja och fråga artigt.',
        d: "Emma: Qu'est-ce que tu aimerais faire cet été ?=Vad skulle du vilja göra i sommar?|Hugo: J'aimerais apprendre à surfer.=Jag skulle vilja lära mig surfa.|Emma: Tu pourrais venir en Bretagne avec nous !=Du kunde följa med till Bretagne!|Hugo: Ce serait génial !=Det skulle vara fantastiskt!",
        w: "j'aimerais=jag skulle vilja|je voudrais=jag skulle vilja ha|tu pourrais=du skulle kunna|ce serait=det skulle vara|un rêve=en dröm|rêver de=att drömma om|apprendre=att lära sig|génial=fantastiskt",
        s: "Je rêve de voir Tokyo.=Jag drömmer om att se Tokyo.|Pourriez-vous m'aider ?=Skulle ni kunna hjälpa mig?|Ce serait plus simple.=Det skulle vara enklare.|Nous aimerions partir tôt.=Vi skulle vilja åka tidigt.",
        u: "J'aimerais uttalas \"schämre\"."
      },
      {
        t: 'Mon métier de rêve', i: 'Berätta om drömjobbet och varför.',
        d: "Léa: Quel est ton métier de rêve ?=Vilket är ditt drömyrke?|Hugo: Je voudrais être pilote.=Jag skulle vilja bli pilot.|Léa: Pourquoi ?=Varför?|Hugo: Parce que je pourrais voyager partout dans le monde.=För att jag skulle kunna resa överallt i världen.",
        w: "un métier=ett yrke|un salaire=en lön|un pilote=en pilot|un vétérinaire=en veterinär|partout=överallt|le monde=världen|aider les gens=att hjälpa människor|intéressant=intressant",
        s: "Je voudrais aider les gens.=Jag skulle vilja hjälpa människor.|Le salaire serait bon.=Lönen skulle vara bra.|Elle aimerait être vétérinaire.=Hon skulle vilja bli veterinär.|Ce métier est très intéressant.=Det yrket är väldigt intressant.",
        u: 'Métier uttalas "metje".'
      },
      {
        t: 'Si j\'étais riche…', i: 'Fantisera om vad du skulle göra om...',
        d: "Emma: Qu'est-ce que tu ferais si tu gagnais au loto ?=Vad skulle du göra om du vann på lotto?|Hugo: Si j'étais riche, j'achèterais une maison au bord de la mer.=Om jag var rik skulle jag köpa ett hus vid havet.|Emma: Moi, je ferais le tour du monde.=Jag skulle resa jorden runt.|Hugo: Si tu pars, je viens avec toi !=Om du åker följer jag med!",
        w: "si=om|gagner=att vinna|riche=rik|acheter=att köpa|au bord de la mer=vid havet|faire le tour du monde=att resa jorden runt|le loto=lotto|donner=att ge",
        s: "Si j'avais le temps, je lirais plus.=Om jag hade tid skulle jag läsa mer.|Si tu viens, on ira au cinéma.=Om du kommer går vi på bio.|Je donnerais de l'argent à mes amis.=Jag skulle ge pengar till mina vänner.|S'il fait beau, nous sortirons.=Om det är fint väder går vi ut.",
        u: 'Si + il blir s\'il: "sil".'
      }
    ],
    write: [{ q: 'Vad skulle du göra om du vann en miljon kronor? Skriv tre meningar.', kw: ['si', 'ferais', 'achèterais'], ex: "Si je gagnais un million, j'achèterais une voiture. Je ferais le tour du monde. Je donnerais aussi de l'argent à ma famille." }],
    qa: [
      { q: 'Quel est ton métier de rêve ?', sv: 'Vilket är ditt drömyrke?', kw: ['voudrais', 'aimerais', 'être'], ex: "J'aimerais être journaliste." },
      { q: "Où est-ce que tu habiterais si tu pouvais choisir ?", sv: 'Var skulle du bo om du kunde välja?', kw: ['habiterais'], ex: "J'habiterais à Nice." }
    ]
  },
  {
    title: 'Samhälle och miljö', level: 'B1',
    lessons: [
      {
        t: "L'environnement", i: 'Prata om miljön och vad man kan göra.',
        d: "Léa: Qu'est-ce que tu fais pour l'environnement ?=Vad gör du för miljön?|Hugo: Je prends le vélo et je recycle.=Jag cyklar och källsorterar.|Léa: Moi, je mange moins de viande.=Jag äter mindre kött.|Hugo: C'est une bonne idée.=Det är en bra idé.",
        w: "l'environnement=miljön|recycler=att källsortera|la pollution=föroreningarna|le climat=klimatet|les déchets=soporna|économiser l'énergie=att spara energi|la planète=planeten|protéger=att skydda",
        s: "Il faut protéger la planète.=Man måste skydda planeten.|La pollution est un grand problème.=Föroreningarna är ett stort problem.|Je trie mes déchets.=Jag sorterar mina sopor.|Le climat change vite.=Klimatet förändras snabbt.",
        u: 'Environnement uttalas "angvironnömang".'
      },
      {
        t: 'Il faut que…', i: 'Säg vad som måste göras (subjonctif).',
        d: "Emma: Il faut que nous changions nos habitudes.=Vi måste ändra våra vanor.|Hugo: Oui, il faut qu'on prenne moins l'avion.=Ja, vi måste flyga mindre.|Emma: Je veux que l'école installe des panneaux solaires.=Jag vill att skolan sätter upp solpaneler.|Hugo: Bonne idée !=Bra idé!",
        w: "il faut que=man måste / det krävs att|une habitude=en vana|l'avion=flyget|un panneau solaire=en solpanel|il est important que=det är viktigt att|je veux que=jag vill att|changer=att ändra|installer=att installera",
        s: "Il faut que tu viennes.=Du måste komma.|Je veux que tu sois heureux.=Jag vill att du ska vara lycklig.|Il est important que nous parlions.=Det är viktigt att vi pratar.|Il faut qu'il fasse ses devoirs.=Han måste göra sina läxor.",
        u: "Il faut uttalas \"il fo\"."
      },
      {
        t: 'Les médias', i: 'Nyheter, sociala medier och vad du tror på.',
        d: "Léa: Ce que je n'aime pas, ce sont les fausses informations.=Det jag inte gillar är falska nyheter.|Hugo: Oui, il faut vérifier ce qu'on lit.=Ja, man måste kontrollera det man läser.|Léa: Le journal dont je t'ai parlé est sérieux.=Tidningen som jag berättade om är seriös.|Hugo: Je vais le lire.=Jag ska läsa den.",
        w: "les médias=medierna|les informations=nyheterna|un journal=en tidning|les réseaux sociaux=sociala medier|vérifier=att kontrollera|faux / fausse=falsk|une source=en källa|croire=att tro",
        s: "Ce qui m'intéresse, c'est la politique.=Det som intresserar mig är politik.|Je ne crois pas tout ce que je lis.=Jag tror inte på allt jag läser.|C'est le livre dont j'ai besoin.=Det är boken som jag behöver.|Il faut vérifier la source.=Man måste kontrollera källan.",
        u: 'Réseaux uttalas "reso".'
      }
    ],
    write: [{ q: 'Skriv vad du tycker att vi måste göra för miljön.', kw: ['il faut que', 'environnement', 'je pense'], ex: "Je pense qu'il faut que nous prenions moins l'avion. Il est important que tout le monde recycle." }],
    qa: [
      { q: "Qu'est-ce que tu fais pour l'environnement ?", sv: 'Vad gör du för miljön?', kw: ['je', 'recycle', 'vélo'], ex: 'Je recycle et je prends le vélo.' },
      { q: "Ce qui t'intéresse dans les informations, c'est quoi ?", sv: 'Vad intresserar dig i nyheterna?', kw: ['ce qui', "m'intéresse", 'sport'], ex: "Ce qui m'intéresse, c'est le sport." }
    ]
  },
  {
    title: 'Studier och jobb', level: 'B1',
    lessons: [
      {
        t: 'Mon premier job', i: 'Berätta om erfarenheter och vad som hade hänt innan.',
        d: "Emma: C'était comment, ton premier job ?=Hur var ditt första jobb?|Hugo: Difficile ! Je n'avais jamais travaillé dans un café.=Svårt! Jag hade aldrig jobbat på ett café.|Emma: Et ton chef ?=Och din chef?|Hugo: Il m'avait tout expliqué, alors ça allait.=Han hade förklarat allt, så det gick bra.",
        w: "un job d'été=ett sommarjobb|le chef=chefen|un collègue=en kollega|expliquer=att förklara|l'expérience=erfarenheten|difficile=svårt|gagner de l'argent=att tjäna pengar|un CV=ett CV",
        s: "J'avais déjà fini quand il est arrivé.=Jag hade redan slutat när han kom.|Elle n'avait jamais vu la mer.=Hon hade aldrig sett havet.|Mes collègues étaient sympas.=Mina kollegor var trevliga.|J'ai gagné un peu d'argent.=Jag tjänade lite pengar.",
        u: 'CV uttalas "se-ve".'
      },
      {
        t: "L'entretien", i: 'Klara en anställningsintervju.',
        d: "Chef: Pourquoi voulez-vous ce poste ?=Varför vill ni ha den här tjänsten?|Hugo: Parce que j'aime travailler avec les gens.=För att jag gillar att jobba med människor.|Chef: Quelles sont vos qualités ?=Vilka är era styrkor?|Hugo: Je suis organisé et j'apprends vite.=Jag är organiserad och lär mig snabbt.",
        w: "un entretien=en intervju|un poste=en tjänst|une qualité=en styrka|un défaut=en svaghet|organisé / organisée=organiserad|motivé / motivée=motiverad|l'entreprise=företaget|disponible=tillgänglig",
        s: "Je suis disponible tout l'été.=Jag kan jobba hela sommaren.|Je suis très motivée.=Jag är väldigt motiverad.|Mon défaut ? Je suis trop perfectionniste.=Min svaghet? Jag är för perfektionistisk.|L'entreprise est à Lyon.=Företaget ligger i Lyon.",
        u: 'Entretien uttalas "angtrötjäng".'
      },
      {
        t: 'Étudier à l\'étranger', i: 'Studier, utbyte och hur man lär sig bäst.',
        d: "Léa: Tu veux étudier à l'étranger ?=Vill du plugga utomlands?|Hugo: Oui ! On apprend une langue en parlant tous les jours.=Ja! Man lär sig ett språk genom att prata varje dag.|Léa: C'est vrai. J'ai appris l'anglais en regardant des séries.=Det stämmer. Jag lärde mig engelska genom att titta på serier.|Hugo: Moi, j'écoute des podcasts en marchant.=Jag lyssnar på poddar medan jag går.",
        w: "à l'étranger=utomlands|un échange=ett utbyte|l'université=universitetet|une bourse=ett stipendium|en parlant=genom att prata|en marchant=medan man går|une langue=ett språk|réussir=att lyckas",
        s: "On réussit en travaillant.=Man lyckas genom att jobba.|Il chante en cuisinant.=Han sjunger medan han lagar mat.|Je voudrais faire un échange.=Jag skulle vilja göra ett utbyte.|Elle a eu une bourse.=Hon fick ett stipendium.",
        u: 'Ändelsen -ant uttalas "ang".'
      }
    ],
    write: [{ q: 'Skriv ett kort personligt brev där du söker ett sommarjobb.', kw: ['je voudrais', 'je suis', 'disponible'], ex: "Bonjour, je m'appelle Edvin. Je voudrais travailler dans votre café cet été. Je suis motivé et je suis disponible en juillet." }],
    qa: [
      { q: 'Quelles sont tes qualités ?', sv: 'Vilka är dina styrkor?', kw: ['je suis'], ex: 'Je suis organisé et drôle.' },
      { q: 'Comment est-ce que tu apprends le mieux ?', sv: 'Hur lär du dig bäst?', kw: ['en', 'ant'], ex: "J'apprends en écoutant de la musique." }
    ]
  }
);
