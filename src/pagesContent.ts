/* Words for the four in-depth pages, in English, Traditional Chinese (Macao) and European Portuguese.
   Anything only the society can confirm is in [brackets]. History dates are to be checked against primary sources. */
export type Tri = [string, string, string];

/* ---------- About us ---------- */
export const ABOUT = {
  title: ['About us', '關於我們', 'Sobre nós'] as Tri,
  lede: ['Who we are, why we started, and how we work.', '我們是誰、為何成立，以及我們如何工作。', 'Quem somos, porque começámos e como trabalhamos.'] as Tri,
  whoH: ['Who we are', '我們是誰', 'Quem somos'] as Tri,
  who: [
    ['HCSD Macao is a new non-profit research society started by young people who grew up in Macao. We know its streets, temples, markets and kitchens from the inside, and we have watched them change.',
      '澳門歷史城市與可持續發展研究會是一個新成立的非牟利研究團體，由一群在澳門長大的年輕人創立。我們熟悉這裡的街道、廟宇、街市和廚房，也親眼看着它們改變。',
      'A HCSD Macao é uma nova associação de investigação sem fins lucrativos, criada por jovens que cresceram em Macau. Conhecemos por dentro as suas ruas, templos, mercados e cozinhas, e temo-los visto mudar.'],
    ['We are not here to put the city behind glass. We want to understand what makes a place worth keeping, record it carefully, and give it back to the people who live there.',
      '我們不是要把城市放進玻璃櫃。我們想了解一個地方值得保留的原因，用心記錄下來，再把它交還給住在這裡的人。',
      'Não queremos pôr a cidade atrás de um vidro. Queremos perceber o que faz um lugar valer a pena, registá-lo com cuidado e devolvê-lo a quem lá vive.']
  ] as Tri[],
  whoCap: ['Taipa village, among old trees', '氹仔舊城區的老樹下', 'Na vila da Taipa, entre árvores antigas'] as Tri,
  nameH: ['Our name', '我們的名字', 'O nosso nome'] as Tri,
  name: [
    [['Historic cities', '歷史城市', 'Cidades históricas'],
      ['Macao has been a meeting point of China and the wider world for more than four centuries. Its historic centre is a UNESCO World Heritage site, but its history also lives in ordinary streets, shops, homes and kitchens.',
        '四百多年來，澳門一直是中國與世界相遇的地方。澳門歷史城區是聯合國教科文組織世界遺產，但它的歷史也活在尋常的街道、店舖、家庭和廚房裡。',
        'Há mais de quatro séculos que Macau é um ponto de encontro entre a China e o mundo. O seu centro histórico é Património Mundial da UNESCO, mas a sua história vive também em ruas, lojas, casas e cozinhas comuns.']],
    [['Sustainable development', '可持續發展', 'Desenvolvimento sustentável'],
      ['A city has to keep growing. We look for ways to grow that keep its people, crafts, languages and memories, instead of replacing them.',
        '城市需要不斷發展。我們尋找一種發展方式，讓城市的人、手藝、語言和回憶得以延續，而不是被取代。',
        'Uma cidade tem de continuar a crescer. Procuramos formas de crescer que mantenham as suas pessoas, ofícios, línguas e memórias, em vez de as substituir.']]
  ] as [Tri, Tri][],
  howH: ['How we work', '我們如何工作', 'Como trabalhamos'] as Tri,
  how: [
    { t: ['Record', '記錄', 'Registar'] as Tri,
      p: ['We document buildings, streets and public spaces, before and while they change.', '在建築、街道和公共空間改變之前及改變之時，我們把它們記錄下來。', 'Documentamos edifícios, ruas e espaços públicos, antes e enquanto mudam.'] as Tri,
      li: [['Photographs and measurements, dated and located', '照片與量度，註明日期和地點', 'Fotografias e medições, datadas e localizadas'],
        ['Old maps, photographs and records compared with today', '把舊地圖、舊照片和檔案與今天比較', 'Mapas, fotografias e registos antigos comparados com o presente'],
        ['A public record anyone can consult', '任何人都可以查閱的公開紀錄', 'Um registo público que qualquer pessoa pode consultar']] as Tri[] },
    { t: ['Listen', '聆聽', 'Ouvir'] as Tri,
      p: ['Walls tell only half the story. We sit down with the people who keep a place alive.', '牆壁只說出一半的故事。我們與讓一個地方保持生命力的人坐下來談。', 'As paredes só contam metade da história. Sentamo-nos com quem mantém um lugar vivo.'] as Tri,
      li: [['Recorded interviews in Cantonese, Portuguese, Patuá and English', '以粵語、葡語、土生葡語和英語進行錄音訪問', 'Entrevistas gravadas em cantonês, português, patuá e inglês'],
        ['Recipes, rituals and everyday knowledge', '食譜、儀式和日常知識', 'Receitas, rituais e saberes do dia a dia'],
        ['Every speaker agrees to how their words are used', '每位受訪者都同意其說話的使用方式', 'Cada pessoa decide como as suas palavras são usadas']] as Tri[] },
    { t: ['Share', '分享', 'Partilhar'] as Tri,
      p: ['What we collect goes back to the city and the people in it.', '我們收集到的一切，都會回到這座城市和城中的人。', 'O que recolhemos volta para a cidade e para as suas pessoas.'] as Tri,
      li: [['Listening sessions where the stories were told', '在故事發生的地方舉行聆聽會', 'Sessões de escuta onde as histórias foram contadas'],
        ['Cooking together with the families who keep the recipes', '與守護食譜的家庭一起下廚', 'Cozinhar com as famílias que guardam as receitas'],
        ['An open archive, free and in three languages', '免費、三語的開放檔案', 'Um arquivo aberto, gratuito e em três línguas']] as Tri[] }
  ],
  beliefH: ['What we believe', '我們的信念', 'Aquilo em que acreditamos'] as Tri,
  beliefs: [
    [['People first', '以人為本', 'Primeiro as pessoas'],
      ['A building matters because of the lives inside it. We start with the people.', '建築之所以重要，是因為裡面的生活。我們從人開始。', 'Um edifício importa pelas vidas que tem dentro. Começamos pelas pessoas.']],
    [['Consent and credit', '同意與署名', 'Consentimento e crédito'],
      ['Nothing is recorded or shared without the agreement of the person who shared it, and every contribution is credited.', '未經分享者同意，我們不會記錄或公開任何內容；每一份貢獻都會署名。', 'Nada é gravado ou partilhado sem o acordo de quem o partilhou, e cada contributo é creditado.']],
    [['Open to all', '向所有人開放', 'Aberto a todos'],
      ['What we collect is free to read, hear and use, in Chinese, English and Portuguese.', '我們收集的內容可免費閱讀、聆聽和使用，並以中、英、葡三語提供。', 'O que recolhemos é gratuito para ler, ouvir e usar, em chinês, inglês e português.']],
    [['Learning from those before us', '向前人學習', 'Aprender com quem veio antes'],
      ['We are a new generation who grew up here, learning from the generations who built the city we know.', '我們是在這裡長大的新一代，向建造了這座城市的前人學習。', 'Somos uma nova geração que cresceu aqui, a aprender com as gerações que construíram a cidade que conhecemos.']]
  ] as [Tri, Tri][],
  teamH: ['The people behind it', '背後的人', 'As pessoas por trás'] as Tri,
  teamLede: ['Young researchers who grew up in Macao, each with a corner of the city they know best.', '一群在澳門長大的年輕研究者，各自熟悉城市的一角。', 'Jovens investigadores que cresceram em Macau, cada um com o seu canto da cidade.'] as Tri,
  bio: ['[One or two sentences: what this person studies, and the corner of Macao they know best.]', '[一兩句介紹：此人研究甚麼，以及最熟悉澳門哪一角。]', '[Uma ou duas frases: o que esta pessoa estuda e o canto de Macau que melhor conhece.]'] as Tri,
  joinTeam: ['Want to join the team?', '想加入我們？', 'Quer fazer parte da equipa?'] as Tri
};

/* ---------- Projects ---------- */
type Project = { id: string; field: string; img: string; alt: Tri; cap: Tri; title: Tri; intro: Tri; whyH: Tri; why: Tri; stepsH: Tri; steps: [Tri, Tri][]; outH: Tri; out: Tri[]; partH: Tri; part: Tri; cta: Tri };
const WHY: Tri = ['Why it matters', '為何重要', 'Porque importa'];
const HOW: Tri = ['How it will work', '如何進行', 'Como vai funcionar'];
const OUT: Tri = ['What it will produce', '成果', 'O que vai produzir'];
const PART: Tri = ['How to take part', '如何參與', 'Como participar'];
export const PROJECTS = {
  title: ['Projects', '項目', 'Projetos'] as Tri,
  lede: ['Two projects start with people: the stories they tell and the food they make. A third, the open archive, brings everything together. All three are planned to begin in [season and year].',
    '兩個項目從人開始：他們說的故事，和他們做的食物。第三個項目「開放檔案」把一切匯集起來。三個項目計劃於[季節及年份]展開。',
    'Dois projetos começam pelas pessoas: as histórias que contam e a comida que fazem. Um terceiro, o arquivo aberto, reúne tudo. Os três estão previstos para começar em [estação e ano].'] as Tri,
  planned: ['Planned', '計劃中', 'Previsto'] as Tri,
  list: [
    { id: 'oral', field: 'field-dark', img: 'img/p-patane.jpg',
      alt: ['Rua Sul do Patane, an ordinary street of shops and flats', '沙梨頭南街，一條有店舖和住宅的尋常街道', 'Rua Sul do Patane, uma rua comum de lojas e prédios'],
      cap: ['Rua Sul do Patane', '沙梨頭南街', 'Rua Sul do Patane'],
      title: ['Oral histories', '口述歷史', 'Histórias orais'],
      intro: ['Long conversations with people who have lived and worked in Macao’s neighbourhoods for decades: about their streets, their work, their families, and how the city has changed around them.',
        '與在澳門街區生活和工作了幾十年的人長談：談他們的街道、工作、家庭，以及身邊城市的變化。',
        'Conversas longas com pessoas que vivem e trabalham há décadas nos bairros de Macau: sobre as suas ruas, o trabalho, a família e a forma como a cidade mudou à sua volta.'],
      whyH: WHY,
      why: ['Many of the people who remember Macao before its rapid growth are now in their seventies and eighties. Their memories are rarely written down, and each year fewer of them can be heard first-hand.',
        '許多記得澳門急速發展之前模樣的人，如今已七八十歲。他們的回憶很少被寫下，能親耳聽到的也一年比一年少。',
        'Muitas das pessoas que se lembram de Macau antes do seu rápido crescimento têm hoje setenta e oitenta anos. As suas memórias raramente são escritas, e cada ano há menos para ouvir na primeira pessoa.'],
      stepsH: HOW,
      steps: [
        [['Find', '尋找', 'Encontrar'], ['We meet residents through neighbours, families, temples, churches and local associations.', '透過鄰里、家庭、廟宇、教堂和社團認識居民。', 'Conhecemos moradores através de vizinhos, famílias, templos, igrejas e associações locais.']],
        [['Record', '記錄', 'Gravar'], ['An unhurried interview in the speaker’s own language, at home or somewhere that matters to them.', '以受訪者自己的語言，在家中或對他們有意義的地方，從容地進行訪問。', 'Uma entrevista sem pressa, na língua de quem fala, em casa ou num lugar que lhe seja importante.']],
        [['Transcribe and translate', '轉錄與翻譯', 'Transcrever e traduzir'], ['Into Chinese, English and Portuguese, checked with the speaker.', '譯成中、英、葡文，並與受訪者核對。', 'Para chinês, inglês e português, revisto com quem falou.']],
        [['Keep and share', '保存與分享', 'Guardar e partilhar'], ['Kept in the open archive, and played back at listening sessions where the stories were told.', '存入開放檔案，並在故事發生的地方舉行聆聽會。', 'Guardadas no arquivo aberto e ouvidas em sessões onde as histórias foram contadas.']]
      ],
      outH: OUT,
      out: [['Audio recordings with transcripts and translations', '錄音，連同轉錄稿和譯文', 'Gravações com transcrições e traduções'],
        ['Portraits of the speakers and their places, with their agreement', '經受訪者同意的人物及地方照片', 'Retratos das pessoas e dos seus lugares, com o seu acordo'],
        ['Listening sessions in the neighbourhoods themselves', '在街區裡舉行的聆聽會', 'Sessões de escuta nos próprios bairros']],
      partH: PART,
      part: ['Tell us about someone who should be heard, help interview or transcribe, or translate between Cantonese, Portuguese, Patuá and English.',
        '告訴我們誰的故事值得被聽見，協助訪問或轉錄，或在粵語、葡語、土生葡語和英語之間翻譯。',
        'Indique-nos alguém que deva ser ouvido, ajude a entrevistar ou transcrever, ou traduza entre cantonês, português, patuá e inglês.'],
      cta: ['Help record an interview', '協助錄製訪問', 'Ajude a gravar uma entrevista'] },
    { id: 'food', field: 'field-red', img: 'img/p-almond-cookies.jpg',
      alt: ['Almond cookies being pressed by hand in a Macao bakery', '澳門餅家以人手壓製杏仁餅', 'Bolinhos de amêndoa a serem prensados à mão numa pastelaria de Macau'],
      cap: ['Almond cookies, pressed by hand', '人手壓製的杏仁餅', 'Bolinhos de amêndoa, prensados à mão'],
      title: ['Food & recipes', '飲食與食譜', 'Comida e receitas'],
      intro: ['Macanese and Cantonese family recipes, written down with the families who cook them, together with the words, places and occasions that go with each dish.',
        '與烹調它們的家庭一起，記下土生葡人和廣東家傳食譜，以及每道菜背後的用語、地方和場合。',
        'Receitas de família macaenses e cantonenses, escritas com as famílias que as cozinham, junto com as palavras, os lugares e as ocasiões de cada prato.'],
      whyH: WHY,
      why: ['Macao’s food is one of the clearest records of its history: Chinese, Portuguese, African, Indian and Southeast Asian ingredients in the same kitchen. In 2017 UNESCO named Macao a Creative City of Gastronomy, yet many family recipes live only in memory and are cooked less often each year.',
        '澳門的飲食是它歷史最清晰的紀錄之一：中國、葡萄牙、非洲、印度和東南亞的食材同在一個廚房。2017年，澳門獲聯合國教科文組織評為「創意城市美食之都」，但許多家傳食譜只存在於記憶中，而且越來越少人煮。',
        'A comida de Macau é um dos registos mais claros da sua história: ingredientes chineses, portugueses, africanos, indianos e do Sudeste Asiático na mesma cozinha. Em 2017 a UNESCO nomeou Macau Cidade Criativa da Gastronomia, mas muitas receitas de família vivem só na memória e cozinham-se cada vez menos.'],
      stepsH: HOW,
      steps: [
        [['Cook alongside', '一起下廚', 'Cozinhar ao lado'], ['We cook with a family and write the recipe down as it is really made, measurements and all.', '與家庭一起烹調，按實際做法連分量一起記下。', 'Cozinhamos com uma família e escrevemos a receita como é realmente feita, com todas as medidas.']],
        [['Record the story', '記下故事', 'Registar a história'], ['Who taught it, when it is cooked, and what it is called in Cantonese, Portuguese or Patuá.', '是誰傳授、甚麼時候煮，以及它在粵語、葡語或土生葡語中的名稱。', 'Quem a ensinou, quando se cozinha e como se chama em cantonês, português ou patuá.']],
        [['Cook together', '公開下廚', 'Cozinhar juntos'], ['Public cooking sessions with the families who keep the recipe.', '與守護食譜的家庭一起舉辦公開烹飪活動。', 'Sessões de cozinha abertas ao público com as famílias que guardam a receita.']],
        [['Publish', '發布', 'Publicar'], ['Every recipe goes into the open archive, credited to its family.', '每一個食譜都存入開放檔案，並註明出自哪個家庭。', 'Cada receita entra no arquivo aberto, creditada à sua família.']]
      ],
      outH: OUT,
      out: [['Written recipes with photographs', '附照片的文字食譜', 'Receitas escritas com fotografias'],
        ['The stories, words and occasions behind each dish', '每道菜背後的故事、用語和場合', 'As histórias, palavras e ocasiões de cada prato'],
        ['Public cooking sessions', '公開烹飪活動', 'Sessões de cozinha abertas ao público']],
      partH: PART,
      part: ['Share a family recipe, host or help at a cooking session, or photograph and write.', '分享家傳食譜、主持或協助烹飪活動，或負責攝影和寫作。', 'Partilhe uma receita de família, receba ou ajude numa sessão de cozinha, ou fotografe e escreva.'],
      cta: ['Share a family recipe', '分享家傳食譜', 'Partilhe uma receita de família'] },
    { id: 'archive', field: 'field-night', img: 'img/m-sao-domingos-door.jpg',
      alt: ['The carved green door of St Dominic’s Church', '玫瑰堂雕花綠色大門', 'A porta verde esculpida da Igreja de São Domingos'],
      cap: ['The door of St Dominic’s Church', '玫瑰堂的大門', 'A porta da Igreja de São Domingos'],
      title: ['The open archive', '開放檔案', 'O arquivo aberto'],
      intro: ['Everything the projects collect, kept in one place: free to read, listen to and use, in English, Chinese and Portuguese.',
        '把各項目收集到的一切集中保存：免費閱讀、聆聽和使用，並提供中、英、葡三語。',
        'Tudo o que os projetos recolhem, num só lugar: gratuito para ler, ouvir e usar, em inglês, chinês e português.'],
      whyH: WHY,
      why: ['Heritage only stays alive if people can reach it. An open archive lets families, students, teachers and researchers use these stories, not just store them.',
        '遺產要有人能接觸到，才能活下去。開放檔案讓家庭、學生、老師和研究者都能使用這些故事，而不只是把它們收藏起來。',
        'O património só se mantém vivo se as pessoas lhe puderem chegar. Um arquivo aberto permite que famílias, estudantes, professores e investigadores usem estas histórias, e não apenas as guardem.'],
      stepsH: ['What it will hold', '收藏內容', 'O que vai guardar'],
      steps: [
        [['Interviews', '訪問', 'Entrevistas'], ['Recordings with transcripts and translations.', '錄音，連同轉錄稿和譯文。', 'Gravações com transcrições e traduções.']],
        [['Recipes', '食譜', 'Receitas'], ['Each with its family, its story and its names.', '每個食譜都附上其家庭、故事和名稱。', 'Cada uma com a sua família, a sua história e os seus nomes.']],
        [['Places', '地方', 'Lugares'], ['Photographs and records of buildings and streets, then and now.', '建築和街道的今昔照片及紀錄。', 'Fotografias e registos de edifícios e ruas, antes e agora.']]
      ],
      outH: ['When', '何時', 'Quando'],
      out: [['Opening after the first interviews and recipes, here on hcsdmacao.org.', '在首批訪問和食譜完成後，於本網站開放。', 'Abre depois das primeiras entrevistas e receitas, aqui em hcsdmacao.org.']],
      partH: PART,
      part: ['Help with translation, writing, design or the website.', '協助翻譯、寫作、設計或網站工作。', 'Ajude com tradução, escrita, design ou o site.'],
      cta: ['Volunteer with us', '成為義工', 'Seja voluntário'] }
  ] as Project[]
};

/* ---------- History ---------- */
type Chapter = { years: string; title: Tri; text: Tri[]; img?: string; alt?: Tri; cap?: Tri };
export const HISTORY = {
  title: ['A short history of Macao', '澳門簡史', 'Uma breve história de Macau'] as Tri,
  lede: ['From a fishing village to a meeting point of China and the world, in six chapters.', '從漁村到中國與世界的交匯點，分六章細說。', 'De aldeia piscatória a ponto de encontro entre a China e o mundo, em seis capítulos.'] as Tri,
  bandAlt: ['Painting of Macao’s harbour and the Praya Grande, around 1850', '約1850年澳門港口及南灣的油畫', 'Pintura do porto de Macau e da Praia Grande, cerca de 1850'] as Tri,
  bandCap: ['The harbour and the Praya Grande, around 1850, possibly by Sunqua', '約1850年的港口與南灣，可能出自新呱之手', 'O porto e a Praia Grande, cerca de 1850, possivelmente por Sunqua'] as Tri,
  chapters: [
    { years: '– 1557', title: ['A fishing village', '漁村', 'Uma aldeia piscatória'],
      text: [['Long before the Portuguese arrived, the peninsula was home to fishing families from Fujian and Guangdong, part of Xiangshan County. The A-Ma Temple, dedicated to the goddess who protects seafarers, is the oldest temple in Macao; tradition dates it to 1488. One account of the city’s name, A-Ma-Gao, the bay of A-Ma, comes from it.',
        '早在葡萄牙人到來之前，這個半島已有來自福建和廣東的漁民聚居，屬香山縣管轄。供奉海上守護神的媽閣廟是澳門最古老的廟宇，相傳建於1488年。一種說法認為，澳門的葡文名稱正是源自「媽閣」的讀音。',
        'Muito antes da chegada dos portugueses, a península era habitada por famílias de pescadores de Fujian e Guangdong, no distrito de Xiangshan. O Templo de A-Má, dedicado à deusa protetora dos navegantes, é o mais antigo de Macau; a tradição data-o de 1488. Segundo uma versão, o nome da cidade, A-Ma-Gao, a baía de A-Má, vem dele.']],
      img: 'img/h-xiangshan-1673.jpg', alt: ['A woodblock map of Xiangshan County from 1673', '1673年香山縣木刻地圖', 'Mapa xilográfico do distrito de Xiangshan, de 1673'],
      cap: ['Map of Xiangshan County, 1673, which then included Macao', '1673年香山縣地圖，當時澳門屬香山縣', 'Mapa do distrito de Xiangshan, 1673, que então incluía Macau'] },
    { years: '1557 – 1640', title: ['A port between oceans', '大洋之間的港口', 'Um porto entre oceanos'],
      text: [['From around 1557 Portuguese traders were allowed to settle in Macao. The city became a hub of a route linking Goa, Malacca, Macao and Nagasaki: Chinese silk went to Japan, and Japanese silver came back to China.',
        '約自1557年起，葡萄牙商人獲准在澳門居住。澳門成為連接果亞、馬六甲、澳門和長崎的航線樞紐：中國絲綢運往日本，日本白銀運回中國。',
        'A partir de cerca de 1557, os comerciantes portugueses foram autorizados a fixar-se em Macau. A cidade tornou-se um centro de uma rota que ligava Goa, Malaca, Macau e Nagasáqui: a seda chinesa ia para o Japão e a prata japonesa voltava para a China.'],
        ['The Jesuit College of St Paul, founded in 1594, trained missionaries for China and Japan. Its church, built in the early 1600s, survives as the stone façade that is now the city’s best-known landmark.',
        '1594年創辦的耶穌會聖保祿學院，為中國和日本培訓傳教士。學院的教堂建於十七世紀初，今天只剩下石砌前壁，即澳門最著名的地標大三巴牌坊。',
        'O Colégio de São Paulo, dos jesuítas, fundado em 1594, formava missionários para a China e o Japão. A sua igreja, construída no início do século XVII, sobrevive como a fachada de pedra que é hoje o símbolo mais conhecido da cidade.']],
      img: 'img/h-st-pauls-thomson.jpg', alt: ['The ruined façade of St Paul’s above its steps, photographed in 1870', '1870年拍攝的大三巴牌坊及其石階', 'A fachada em ruínas de São Paulo sobre a escadaria, fotografada em 1870'],
      cap: ['The façade of St Paul’s, photographed by John Thomson in 1870', '約翰·湯姆遜於1870年拍攝的大三巴牌坊', 'A fachada de São Paulo, fotografada por John Thomson em 1870'] },
    { years: '1640 – 1840', title: ['Adapting', '應變', 'Adaptar-se'],
      text: [['In 1622 the city held off an attack by the Dutch. In 1639 Japan closed its ports to the Portuguese, and Macao lost its richest trade.',
        '1622年，澳門擊退了荷蘭人的進攻。1639年，日本對葡萄牙人關閉港口，澳門失去了最富裕的貿易。',
        'Em 1622 a cidade resistiu a um ataque holandês. Em 1639 o Japão fechou os portos aos portugueses e Macau perdeu o seu comércio mais rico.'],
        ['The city adapted. Foreign merchants trading with Canton lived here for part of each year, and people from across Asia, Africa and Europe made it home. Macanese families, their cuisine and their language, Patuá, took shape in these centuries.',
        '澳門隨之應變。與廣州通商的外國商人每年有一段時間住在這裡，來自亞洲、非洲和歐洲各地的人也在此安家。土生葡人家庭、他們的飲食和語言（土生葡語）在這幾個世紀裡逐漸成形。',
        'A cidade adaptou-se. Os mercadores estrangeiros que negociavam com Cantão viviam aqui parte do ano, e pessoas de toda a Ásia, África e Europa fizeram dela a sua casa. As famílias macaenses, a sua cozinha e a sua língua, o patuá, formaram-se nestes séculos.']],
      img: 'img/h-praya-chinnery.jpg', alt: ['Watercolour of the east end of the Praya Grande bay, with boats and figures on the shore', '南灣東端的水彩畫，岸邊有船隻和人物', 'Aguarela do extremo leste da baía da Praia Grande, com barcos e figuras na margem'],
      cap: ['East End of the Praya Grande, Macao, by George Chinnery (1774–1852)', '《南灣東端》，錢納利（1774–1852）', 'Extremo leste da Praia Grande, Macau, por George Chinnery (1774–1852)'] },
    { years: '1840 – 1900', title: ['A changing coast', '變化中的海岸', 'Uma costa em mudança'],
      text: [['In 1835 a fire destroyed St Paul’s, leaving only its façade. After the First Opium War, Hong Kong became the region’s main port and Macao’s trade declined.',
        '1835年，一場大火燒毀了聖保祿教堂，只餘前壁。鴉片戰爭後，香港成為區內主要港口，澳門的貿易隨之衰落。',
        'Em 1835 um incêndio destruiu São Paulo, restando apenas a fachada. Depois da Primeira Guerra do Ópio, Hong Kong tornou-se o principal porto da região e o comércio de Macau declinou.'],
        ['In 1844 Jules Itier photographed the A-Ma Temple, one of the earliest photographs taken in China. In 1887 the Treaty of Peking recognised Portuguese rule over Macao.',
        '1844年，于勒·埃及爾拍攝了媽閣廟，是在中國拍攝的最早照片之一。1887年，《中葡和好通商條約》承認葡萄牙對澳門的管治。',
        'Em 1844 Jules Itier fotografou o Templo de A-Má, uma das primeiras fotografias tiradas na China. Em 1887 o Tratado de Pequim reconheceu a administração portuguesa de Macau.']],
      img: 'img/h-view-afong.jpg', alt: ['Photograph of Macao’s bay and hills seen from above the old houses', '從舊房子上方俯瞰澳門海灣和山丘的照片', 'Fotografia da baía e das colinas de Macau vistas de cima das casas antigas'],
      cap: ['View of Macao, photographed by Lai Afong, 1870s–1890s', '黎芳拍攝的澳門風景，1870至1890年代', 'Vista de Macau, fotografada por Lai Afong, anos 1870–1890'] },
    { years: '1900 – 1999', title: ['Refuge and growth', '避難與發展', 'Refúgio e crescimento'],
      text: [['Macao stayed neutral during the Second World War and sheltered large numbers of refugees. After the war the city grew quickly: land was reclaimed from the sea, industry and later tourism expanded, and the population more than doubled.',
        '第二次世界大戰期間，澳門保持中立，收容了大批難民。戰後城市迅速發展：填海造地，工業以至後來的旅遊業擴展，人口增加了一倍以上。',
        'Macau manteve-se neutral durante a Segunda Guerra Mundial e acolheu um grande número de refugiados. Depois da guerra a cidade cresceu depressa: ganhou-se terra ao mar, a indústria e depois o turismo expandiram-se, e a população mais do que duplicou.'],
        ['On 20 December 1999 Macao returned to China as a Special Administrative Region.',
        '1999年12月20日，澳門回歸中國，成為特別行政區。',
        'A 20 de dezembro de 1999 Macau regressou à China como Região Administrativa Especial.']] },
    { years: '1999 –', title: ['Keeping it alive', '讓它活下去', 'Mantê-lo vivo'],
      text: [['In 2005 the Historic Centre of Macao was inscribed on the UNESCO World Heritage List, and in 2017 UNESCO named Macao a Creative City of Gastronomy.',
        '2005年，澳門歷史城區列入聯合國教科文組織《世界遺產名錄》；2017年，澳門獲評為「創意城市美食之都」。',
        'Em 2005 o Centro Histórico de Macau foi inscrito na Lista do Património Mundial da UNESCO e, em 2017, a UNESCO nomeou Macau Cidade Criativa da Gastronomia.'],
        ['Today the city is changing faster than ever. Its listed buildings are protected; much of what makes it Macao, its neighbourhoods, recipes, languages and memories, is not. That is the work we have set ourselves.',
        '今天，城市的變化比以往任何時候都快。被列入名錄的建築受到保護；但構成澳門的許多東西，例如街區、食譜、語言和回憶，卻沒有。這正是我們給自己的工作。',
        'Hoje a cidade muda mais depressa do que nunca. Os edifícios classificados estão protegidos; muito do que faz Macau ser Macau, os bairros, as receitas, as línguas e as memórias, não está. É esse o trabalho a que nos propomos.']] }
  ] as Chapter[],
  note: ['This is a short introduction written by the society. Dates and details are being checked against primary sources.', '本頁是研究會撰寫的簡介，日期和細節正與原始資料核對。', 'Esta é uma breve introdução escrita pela associação. As datas e os pormenores estão a ser verificados com fontes primárias.'] as Tri
};

/* ---------- Join & contact ---------- */
export const JOIN = {
  title: ['Join & contact', '參與與聯絡', 'Participar e contactos'] as Tri,
  lede: ['Everyone who cares about Macao’s heritage can take part. Here is how.', '任何關心澳門遺產的人都可以參與。方法如下。', 'Qualquer pessoa que se importe com o património de Macau pode participar. Veja como.'] as Tri,
  volH: ['Volunteer', '做義工', 'Voluntariado'] as Tri,
  vol: ['Choose what suits you. [How much time it takes, and whether training is given.]', '選擇適合你的工作。[所需時間，以及是否提供培訓。]', 'Escolha o que lhe convém. [Quanto tempo exige e se há formação.]'] as Tri,
  roles: [
    [['Interviewing', '訪問', 'Entrevistar'], ['Sit down with residents and record their stories.', '與居民坐下來，記錄他們的故事。', 'Sentar-se com moradores e gravar as suas histórias.']],
    [['Transcribing and translating', '轉錄與翻譯', 'Transcrever e traduzir'], ['Cantonese, Portuguese, Patuá and English: every language helps.', '粵語、葡語、土生葡語、英語：每一種語言都有用。', 'Cantonês, português, patuá e inglês: todas as línguas ajudam.']],
    [['Photography and surveys', '攝影與測量', 'Fotografia e levantamentos'], ['Photograph and measure buildings and streets.', '拍攝和量度建築與街道。', 'Fotografar e medir edifícios e ruas.']],
    [['Cooking sessions', '烹飪活動', 'Sessões de cozinha'], ['Help families cook, and welcome the public.', '協助家庭烹調，並接待公眾。', 'Ajudar as famílias a cozinhar e receber o público.']],
    [['Writing, design and the website', '寫作、設計與網站', 'Escrita, design e site'], ['Help the archive reach people.', '讓檔案接觸更多人。', 'Ajudar o arquivo a chegar às pessoas.']]
  ] as [Tri, Tri][],
  volCta: ['Volunteer with us', '成為義工', 'Seja voluntário'] as Tri,
  memH: ['Membership', '會員', 'Membros'] as Tri,
  mem: ['Join the society for [fee] a year.', '每年[會費]即可加入研究會。', 'Junte-se à associação por [quota] por ano.'] as Tri,
  memGet: ['[What members get, for example a vote at the general assembly or early places at events.]', '[會員權益，例如在會員大會投票或優先參加活動。]', '[O que os membros recebem, por exemplo voto na assembleia geral ou lugares prioritários em eventos.]'] as Tri,
  memPay: ['Pay by [payment method].', '付款方式：[付款方式]。', 'Pagamento por [método de pagamento].'] as Tri,
  memCta: ['Become a member', '成為會員', 'Torne-se membro'] as Tri,
  donH: ['Donate', '捐助', 'Donativos'] as Tri,
  don: ['Gifts pay for recording equipment, ingredients for cooking sessions, and keeping the archive online and free.', '捐款將用於錄音器材、烹飪活動的食材，以及讓檔案免費在網上公開。', 'Os donativos pagam equipamento de gravação, ingredientes para as sessões de cozinha e a manutenção do arquivo online e gratuito.'] as Tri,
  donHow: ['[Bank transfer details or payment link.]', '[銀行轉帳資料或付款連結。]', '[Dados para transferência bancária ou link de pagamento.]'] as Tri,
  donCta: ['Ask about donating', '查詢捐助', 'Pergunte como doar'] as Tri,
  faqH: ['Questions', '常見問題', 'Perguntas'] as Tri,
  faq: [
    [['Do I need to be a researcher?', '我需要是研究者嗎？', 'Preciso de ser investigador?'], ['No. Anyone who cares about Macao’s heritage is welcome.', '不需要。任何關心澳門遺產的人都歡迎參與。', 'Não. Qualquer pessoa que se importe com o património de Macau é bem-vinda.']],
    [['Do I need to speak Cantonese?', '我需要會說粵語嗎？', 'Preciso de falar cantonês?'], ['No. We work in Cantonese, Portuguese, Patuá and English, and need people for each.', '不需要。我們以粵語、葡語、土生葡語和英語工作，每種語言都需要人手。', 'Não. Trabalhamos em cantonês, português, patuá e inglês, e precisamos de pessoas para cada uma.']],
    [['Can I help from outside Macao?', '我可以在澳門以外協助嗎？', 'Posso ajudar fora de Macau?'], ['Yes. Transcribing, translating, writing and design can be done from anywhere.', '可以。轉錄、翻譯、寫作和設計都可以在任何地方進行。', 'Sim. Transcrever, traduzir, escrever e fazer design pode ser feito de qualquer lugar.']],
    [['Can I suggest a person, place or recipe?', '我可以推薦人物、地方或食譜嗎？', 'Posso sugerir uma pessoa, um lugar ou uma receita?'], ['Please do. Write to us at info@hcsdmacao.org.', '歡迎！請電郵至 info@hcsdmacao.org。', 'Por favor. Escreva-nos para info@hcsdmacao.org.']]
  ] as [Tri, Tri][],
  contactH: ['Get in touch', '與我們聯絡', 'Fale connosco'] as Tri,
  newsH: ['Newsletter', '電子通訊', 'Newsletter'] as Tri
};
