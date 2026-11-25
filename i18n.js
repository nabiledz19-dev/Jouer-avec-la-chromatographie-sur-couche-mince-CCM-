/* ============================================================
   Jouer avec la CCM — interface trilingue (français / anglais / arabe)
   ============================================================ */

const LANG_KEY = 'ccm-lang';
const LANGS = [
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'AR' }
];

let LANG = 'fr';

const UI = {
  fr: {
    'nav.rules': '📖 Règles du jeu',
    'nav.manual': '📚 Fiches du manuel',
    'nav.rulesAria': 'Règles du jeu',
    'nav.manualAria': 'Fiches du manuel CCM',

    'home.badge': 'Mode difficile · Chrono & calculs',
    'home.brandSub': 'INSFP El Hidhab · Jeu éducatif CCM',
    'home.free': 'Jeu gratuit — libre d’accès pour tous les stagiaires',
    'pwa.install': 'Installer l’application',
    'home.title': 'Jouer avec la <span class="grad">chromatographie<br>sur couche mince</span> (CCM)',
    'home.lead': '6 niveaux <strong>difficiles</strong> fondés sur le manuel du formateur CCM : un chrono sur chaque étape, des pénalités à chaque erreur, des gestes de précision sans repère, des calculs de Rf et de Rs, les cinq montages M1 à M5 et les modes de révélation. Un cadeau à chaque niveau, un certificat signé à la fin… si tu es à la hauteur\u00a0!',
    'home.nameLabel': 'Nom et prénom du joueur',
    'home.namePlaceholder': 'Ex : Douadi Nabil',
    'home.start': "Commencer l'aventure 🚀",
    'home.duelTitle': '⚔️ Duel : joueur contre joueur',
    'home.duelText': "Deux stagiaires s'affrontent en direct sur 6 questions. Répondez juste le plus vite possible : le premier gagne 120 points, le second 100.",
    'home.createDuel': 'Créer un duel',
    'home.joinDuel': 'Rejoindre avec un code',
    'home.resumeDuel': 'Reprendre le duel',
    'home.playersTitle': '👋 Joueurs déjà inscrits',
    'home.leaderTitle': '🏆 Classement',
    'home.credit': 'Jeu conçu par',
    'home.creditRole': 'INSFP El Hidhab · Contrôle de qualité et environnement',
    'home.printSheet': '📄 Fiche CCM à imprimer',
    'home.playersEmpty': 'Aucun joueur pour le moment',

    'map.eyebrow': 'Joueur',
    'map.outOf': 'points / 600',
    'map.gifts': '🎁 Mes cadeaux',
    'map.localBoard': '🏆 Classement (cet appareil)',
    'map.compTitle': '🌐 Compétition en ligne',
    'map.compChecking': 'Vérification du serveur de compétition…',
    'map.publish': 'Publier mon score',
    'map.refresh': 'Actualiser',
    'map.reset': 'Réinitialiser (professeur)',
    'map.compNote': 'Les stagiaires qui ouvrent le jeu en ligne partagent ce classement ; le meilleur score de chaque niveau est conservé.',
    'map.certificate': '🏅 Voir mon certificat',
    'map.changePlayer': 'Changer de joueur',
    'map.printSheet': '📄 Fiche CCM à imprimer',

    'phase.kicker': 'Niveau {n}',
    'phase.outOf': '/ 100 pts',
    'phase.continue': 'Continuer →',
    'phase.finish': 'Terminer le niveau 🎁',
    'phase.validatePick': 'Valider ma sélection',
    'phase.step': 'Étape {n} / {total}',
    'phase.go': 'C’est parti ! ▶',
    'phase.chosen': 'Étapes choisies : {n} / {total}',
    'phase.front': 'Front : {n} %',
    'home.hint': 'Merci d’écrire votre nom ET votre prénom (deux mots, ex. : Douadi Nabil).',

    'cert.eyebrow': 'Certificat de réussite · CCM',
    'cert.text': 'a terminé les 6 niveaux du jeu<br><strong>Jouer avec la chromatographie sur couche mince</strong>',
    'cert.totalSmall': '/ 600 points',
    'cert.note': 'Note',
    'cert.signRole': 'Formateur · INSFP El Hidhab',
    'cert.print': '🖨️ Imprimer mon certificat',
    'cert.back': '← Retour aux niveaux',
    'cert.signedOn': 'Signé le {date}',
    'cert.medalGold': '🥇 Médaille d’or — Expert CCM',
    'cert.medalSilver': '🥈 Médaille d’argent — Très bon niveau',
    'cert.medalBronze': '🥉 Médaille de bronze — Continue comme ça',
    'cert.medalProgress': '🌱 En progrès — Rejoue pour gagner des points',

    'mention.insufficient': 'Insuffisant',
    'mention.passable': 'Passable',
    'mention.fair': 'Assez bien',
    'mention.good': 'Bien',
    'mention.veryGood': 'Très bien',
    'mention.excellent': 'Excellent',

    'modal.title': 'Cadeau débloqué !',
    'modal.continue': 'Continuer',

    'rules.title': '📖 Règles du jeu',
    'rules.close': 'J’ai compris, je joue ! 🚀',
    'sound.on': 'Son activé',
    'sound.off': 'Son coupé',
    'access.title': 'Jeu protégé',
    'access.text': 'Ce jeu est réservé aux stagiaires du Professeur Douadi Nabil. Saisissez le code d’accès remis par le formateur.',
    'access.placeholder': 'Code d’accès',
    'access.enter': 'Entrer',
    'access.wrong': 'Code d’accès incorrect.',
    'access.error': 'Connexion impossible. Réessayez.',
    'access.note': 'Contenu protégé — reproduction et partage interdits.',
    'home.legal': '© 2026 Professeur Douadi Nabil — Tous droits réservés · Reproduction et partage interdits',

    'duel.quit': '← Quitter',
    'duel.copy': 'Copier le code',
    'duel.waiting': 'En attente…',
    'duel.offline': 'Le duel entre stagiaires fonctionne sur la version en ligne du jeu (adresse internet).',
    'duel.creating': 'Création du salon de duel…',
    'duel.created': 'Duel créé : donnez le code {code} à votre adversaire.',
    'duel.joining': 'Connexion au duel {code}…',
    'duel.joined': 'Vous êtes dans le duel {code}.',
    'duel.lobbyTitle': 'Salon d’attente',
    'duel.lobbyHost': 'Donnez ce code à votre adversaire, puis lancez le duel.',
    'duel.lobbyGuest': 'En attente du lancement par l’hôte…',
    'duel.start': 'Lancer le duel',
    'duel.question': 'Question {n} / {total}',
    'duel.answered': 'Réponse envoyée. En attente de l’adversaire…',
    'duel.hint': 'Cliquez sur la bonne réponse avant la fin du chrono.',
    'duel.roundWin': '⚡ {name} marque la manche',
    'duel.roundNone': '⏱️ Personne n’a trouvé la réponse',
    'duel.win': '🏆 {name} remporte le duel',
    'duel.tie': '🤝 Match nul',
    'duel.again': 'Nouveau duel',
    'duel.home': 'Retour à l’accueil',
    'duel.copied': 'Code {code} copié.',
    'duel.codeIs': 'Code à communiquer : {code}',
    'duel.resume': 'Reprendre le duel {code}',
    'duel.running': 'Duel en cours avec le code {code}.',
    'duel.gone': 'Ce duel n’existe plus (compétition réinitialisée par le professeur ?).',
    'duel.nameRequired': 'Écrivez votre nom ET votre prénom avant de lancer un duel.',
    'duel.promptCode': 'Code du duel donné par votre adversaire :',
    'duel.promptReset': 'Code professeur pour remettre la compétition à zéro :',

    'comp.offline': 'Mode hors ligne : le classement local fonctionne. Ouvrez le jeu depuis son adresse internet pour la compétition entre stagiaires.',
    'comp.wait': 'Connexion au serveur de compétition…',
    'comp.online': 'En ligne · {count} stagiaire(s) classé(s){rank}',
    'comp.rank': ' · votre rang : {rank}',
    'comp.published': 'Score publié : {total}/600 · rang {rank} sur {count}',
    'comp.resetConfirm': 'Compétition réinitialisée. Les stagiaires peuvent repartir de zéro.',
    'comp.resetDenied': 'Réinitialisation refusée : code incorrect.',
    'comp.resetting': 'Réinitialisation de la compétition…',
    'comp.none': 'Aucun score publié pour le moment.',
    'comp.localOnly': 'Mode hors ligne : score enregistré sur cet appareil uniquement.',
    'comp.publishing': 'Publication du score…',
    'comp.blocked': 'Publication impossible ({msg}).',
    'comp.offlineDuel': 'Aucune compétition à réinitialiser en mode hors ligne.',
    'lb.empty': 'Le classement apparaîtra ici.',
    'lb.levels': '{n} niveau(x) terminé(s)'
  },

  en: {
    'nav.rules': '📖 Game rules',
    'nav.manual': '📚 Manual sheets',
    'nav.rulesAria': 'Game rules',
    'nav.manualAria': 'TLC manual sheets',

    'home.badge': 'Hard mode · Timer & calculations',
    'home.brandSub': 'INSFP El Hidhab · TLC educational game',
    'home.free': 'Free game — open to all trainees',
    'pwa.install': 'Install app',
    'home.title': 'Play with <span class="grad">thin-layer<br>chromatography</span> (TLC)',
    'home.lead': '6 <strong>hard</strong> levels based on the trainer’s TLC manual: a timer on every step, penalties for each mistake, precise gestures without landmarks, Rf and Rs calculations, montages M1 to M5 and the detection methods. A gift at each level, a signed certificate at the end… if you are up to it!',
    'home.nameLabel': 'Player first and last name',
    'home.namePlaceholder': 'e.g. Douadi Nabil',
    'home.start': 'Start the adventure 🚀',
    'home.duelTitle': '⚔️ Duel: player versus player',
    'home.duelText': 'Two trainees play live on 6 questions. Answer correctly as fast as you can: the first scores 120 points, the second 100.',
    'home.createDuel': 'Create a duel',
    'home.joinDuel': 'Join with a code',
    'home.resumeDuel': 'Resume the duel',
    'home.playersTitle': '👋 Registered players',
    'home.leaderTitle': '🏆 Ranking',
    'home.credit': 'Game designed by',
    'home.creditRole': 'INSFP El Hidhab · Quality control and environment',
    'home.printSheet': '📄 Printable TLC sheet',
    'home.playersEmpty': 'No player yet',

    'map.eyebrow': 'Player',
    'map.outOf': 'points / 600',
    'map.gifts': '🎁 My gifts',
    'map.localBoard': '🏆 Ranking (this device)',
    'map.compTitle': '🌐 Online competition',
    'map.compChecking': 'Contacting the competition server…',
    'map.publish': 'Publish my score',
    'map.refresh': 'Refresh',
    'map.reset': 'Reset (teacher)',
    'map.compNote': 'Trainees who open the game online share this ranking; the best score of each level is kept.',
    'map.certificate': '🏅 View my certificate',
    'map.changePlayer': 'Change player',
    'map.printSheet': '📄 Printable TLC sheet',

    'phase.kicker': 'Level {n}',
    'phase.outOf': '/ 100 pts',
    'phase.continue': 'Continue →',
    'phase.finish': 'Finish the level 🎁',
    'phase.validatePick': 'Confirm my selection',
    'phase.step': 'Step {n} / {total}',
    'phase.go': 'Let’s go! ▶',
    'phase.chosen': 'Steps chosen: {n} / {total}',
    'phase.front': 'Front: {n} %',
    'home.hint': 'Please write your first AND last name (two words, e.g. Douadi Nabil).',

    'cert.eyebrow': 'Certificate of achievement · TLC',
    'cert.text': 'has completed the 6 levels of the game<br><strong>Play with thin-layer chromatography</strong>',
    'cert.totalSmall': '/ 600 points',
    'cert.note': 'Grade',
    'cert.signRole': 'Trainer · INSFP El Hidhab',
    'cert.print': '🖨️ Print my certificate',
    'cert.back': '← Back to levels',
    'cert.signedOn': 'Signed on {date}',
    'cert.medalGold': '🥇 Gold medal — TLC expert',
    'cert.medalSilver': '🥈 Silver medal — Very good level',
    'cert.medalBronze': '🥉 Bronze medal — Keep going',
    'cert.medalProgress': '🌱 Improving — Replay to earn points',

    'mention.insufficient': 'Insufficient',
    'mention.passable': 'Passable',
    'mention.fair': 'Fairly good',
    'mention.good': 'Good',
    'mention.veryGood': 'Very good',
    'mention.excellent': 'Excellent',

    'modal.title': 'Gift unlocked!',
    'modal.continue': 'Continue',

    'rules.title': '📖 Game rules',
    'rules.close': 'Got it, let’s play! 🚀',
    'sound.on': 'Sound on',
    'sound.off': 'Sound off',
    'access.title': 'Protected game',
    'access.text': 'This game is reserved for Professor Douadi Nabil’s trainees. Enter the access code given by the trainer.',
    'access.placeholder': 'Access code',
    'access.enter': 'Enter',
    'access.wrong': 'Wrong access code.',
    'access.error': 'Connection failed. Please try again.',
    'access.note': 'Protected content — copying and sharing are forbidden.',
    'home.legal': '© 2026 Professor Douadi Nabil — All rights reserved · Copying and sharing forbidden',

    'duel.quit': '← Leave',
    'duel.copy': 'Copy the code',
    'duel.waiting': 'Waiting…',
    'duel.offline': 'Trainee duels work on the online version of the game (internet address).',
    'duel.creating': 'Creating the duel room…',
    'duel.created': 'Duel created: give the code {code} to your opponent.',
    'duel.joining': 'Connecting to duel {code}…',
    'duel.joined': 'You are in duel {code}.',
    'duel.lobbyTitle': 'Waiting room',
    'duel.lobbyHost': 'Give this code to your opponent, then start the duel.',
    'duel.lobbyGuest': 'Waiting for the host to start…',
    'duel.start': 'Start the duel',
    'duel.question': 'Question {n} / {total}',
    'duel.answered': 'Answer sent. Waiting for your opponent…',
    'duel.hint': 'Click the right answer before the timer ends.',
    'duel.roundWin': '⚡ {name} wins the round',
    'duel.roundNone': '⏱️ Nobody found the answer',
    'duel.win': '🏆 {name} wins the duel',
    'duel.tie': '🤝 Draw',
    'duel.again': 'New duel',
    'duel.home': 'Back to home',
    'duel.copied': 'Code {code} copied.',
    'duel.codeIs': 'Code to share: {code}',
    'duel.resume': 'Resume duel {code}',
    'duel.running': 'Duel in progress with code {code}.',
    'duel.gone': 'This duel no longer exists (competition reset by the teacher?).',
    'duel.nameRequired': 'Write your first and last name before starting a duel.',
    'duel.promptCode': 'Duel code given by your opponent:',
    'duel.promptReset': 'Teacher code to reset the competition:',

    'comp.offline': 'Offline mode: the local ranking still works. Open the game from its internet address for the competition between trainees.',
    'comp.wait': 'Contacting the competition server…',
    'comp.online': 'Online · {count} trainee(s) ranked{rank}',
    'comp.rank': ' · your rank: {rank}',
    'comp.published': 'Score published: {total}/600 · rank {rank} of {count}',
    'comp.resetConfirm': 'Competition reset. Trainees can start from zero.',
    'comp.resetDenied': 'Reset refused: wrong code.',
    'comp.resetting': 'Resetting the competition…',
    'comp.none': 'No score published yet.',
    'comp.localOnly': 'Offline mode: score saved on this device only.',
    'comp.publishing': 'Publishing the score…',
    'comp.blocked': 'Publication failed ({msg}).',
    'comp.offlineDuel': 'No competition to reset in offline mode.',
    'lb.empty': 'The ranking will appear here.',
    'lb.levels': '{n} level(s) completed'
  },

  ar: {
    'nav.rules': '📖 قواعد اللعبة',
    'nav.manual': '📚 بطاقات الدليل',
    'nav.rulesAria': 'قواعد اللعبة',
    'nav.manualAria': 'بطاقات دليل الكروماتوغرافيا',

    'home.badge': 'الوضع الصعب · مؤقت وحسابات',
    'home.brandSub': 'INSFP الهضاب · لعبة تعليمية في الكروماتوغرافيا',
    'home.free': 'لعبة مجانية — متاحة لجميع المتربصين',
    'pwa.install': 'تثبيت التطبيق',
    'home.title': 'العب مع <span class="grad">الكروماتوغرافيا<br>على طبقة رقيقة</span> (CCM)',
    'home.lead': '6 مستويات <strong>صعبة</strong> مبنية على دليل المكوّن في الكروماتوغرافيا: مؤقت في كل خطوة، خصم نقاط عند كل خطأ، حركات دقيقة دون علامات، حسابات Rf و Rs، التركيبات M1 إلى M5 وطرق الكشف. هدية في كل مستوى وشهادة موقّعة في النهاية… إن كنت في المستوى!',
    'home.nameLabel': 'اسم ولقب اللاعب',
    'home.namePlaceholder': 'مثال: دوادي نبيل',
    'home.start': 'ابدأ المغامرة 🚀',
    'home.duelTitle': '⚔️ مبارزة: لاعب ضد لاعب',
    'home.duelText': 'متربّصان يتنافسان مباشرة على 6 أسئلة. أجب بسرعة: الأول يربح 120 نقطة والثاني 100.',
    'home.createDuel': 'إنشاء مبارزة',
    'home.joinDuel': 'الانضمام برمز',
    'home.resumeDuel': 'استئناف المبارزة',
    'home.playersTitle': '👋 اللاعبون المسجّلون',
    'home.leaderTitle': '🏆 الترتيب',
    'home.credit': 'اللعبة من إعداد',
    'home.creditRole': 'INSFP الهضاب · مراقبة الجودة والبيئة',
    'home.printSheet': '📄 بطاقة CCM للطباعة',
    'home.playersEmpty': 'لا يوجد لاعب بعد',

    'map.eyebrow': 'اللاعب',
    'map.outOf': 'نقطة / 600',
    'map.gifts': '🎁 هداياي',
    'map.localBoard': '🏆 الترتيب (هذا الجهاز)',
    'map.compTitle': '🌐 المنافسة عبر الإنترنت',
    'map.compChecking': 'جارٍ الاتصال بخادم المنافسة…',
    'map.publish': 'نشر نتيجتي',
    'map.refresh': 'تحديث',
    'map.reset': 'تصفير (الأستاذ)',
    'map.compNote': 'المتربّصون الذين يفتحون اللعبة عبر الإنترنت يتشاركون هذا الترتيب؛ تُحفظ أفضل نتيجة لكل مستوى.',
    'map.certificate': '🏅 عرض شهادتي',
    'map.changePlayer': 'تغيير اللاعب',
    'map.printSheet': '📄 بطاقة CCM للطباعة',

    'phase.kicker': 'المستوى {n}',
    'phase.outOf': '/ 100 نقطة',
    'phase.continue': 'متابعة →',
    'phase.finish': 'إنهاء المستوى 🎁',
    'phase.validatePick': 'تأكيد اختياري',
    'phase.step': 'الخطوة {n} / {total}',
    'phase.go': 'هيا بنا! ▶',
    'phase.chosen': 'الخطوات المختارة: {n} / {total}',
    'phase.front': 'الجبهة: {n} %',
    'home.hint': 'اكتب اسمك ولقبك (كلمتان، مثال: دوادي نبيل).',

    'cert.eyebrow': 'شهادة نجاح · CCM',
    'cert.text': 'أتمّ المستويات الستة للعبة<br><strong>العب مع الكروماتوغرافيا على طبقة رقيقة</strong>',
    'cert.totalSmall': '/ 600 نقطة',
    'cert.note': 'العلامة',
    'cert.signRole': 'مكوّن · INSFP الهضاب',
    'cert.print': '🖨️ طباعة شهادتي',
    'cert.back': '← العودة إلى المستويات',
    'cert.signedOn': 'موقّعة في {date}',
    'cert.medalGold': '🥇 ميدالية ذهبية — خبير CCM',
    'cert.medalSilver': '🥈 ميدالية فضية — مستوى جيد جداً',
    'cert.medalBronze': '🥉 ميدالية برونزية — واصل',
    'cert.medalProgress': '🌱 في تحسّن — أعد اللعب لتربح نقاطاً',

    'mention.insufficient': 'ضعيف',
    'mention.passable': 'مقبول',
    'mention.fair': 'حسن',
    'mention.good': 'جيد',
    'mention.veryGood': 'جيد جداً',
    'mention.excellent': 'ممتاز',

    'modal.title': 'هدية مفتوحة!',
    'modal.continue': 'متابعة',

    'rules.title': '📖 قواعد اللعبة',
    'rules.close': 'فهمت، هيا نلعب! 🚀',
    'sound.on': 'الصوت مفعّل',
    'sound.off': 'الصوت مكتوم',
    'access.title': 'لعبة محمية',
    'access.text': 'هذه اللعبة مخصّصة لمتربّصي الأستاذ دوادي نبيل. أدخل رمز الدخول الذي يمنحه المكوّن.',
    'access.placeholder': 'رمز الدخول',
    'access.enter': 'دخول',
    'access.wrong': 'رمز الدخول غير صحيح.',
    'access.error': 'تعذّر الاتصال. حاول مرة أخرى.',
    'access.note': 'محتوى محمي — النسخ والمشاركة ممنوعان.',
    'home.legal': '© 2026 الأستاذ دوادي نبيل — جميع الحقوق محفوظة · النسخ والمشاركة ممنوعة',

    'duel.quit': '← خروج',
    'duel.copy': 'نسخ الرمز',
    'duel.waiting': 'في الانتظار…',
    'duel.offline': 'مبارزة المتربّصين تعمل في النسخة المتصلة من اللعبة (عنوان الإنترنت).',
    'duel.creating': 'جارٍ إنشاء غرفة المبارزة…',
    'duel.created': 'تم إنشاء المبارزة: أعطِ الرمز {code} لمنافسك.',
    'duel.joining': 'جارٍ الاتصال بالمبارزة {code}…',
    'duel.joined': 'أنت في المبارزة {code}.',
    'duel.lobbyTitle': 'غرفة الانتظار',
    'duel.lobbyHost': 'أعطِ هذا الرمز لمنافسك ثم ابدأ المبارزة.',
    'duel.lobbyGuest': 'في انتظار أن يبدأ المضيف…',
    'duel.start': 'ابدأ المبارزة',
    'duel.question': 'السؤال {n} / {total}',
    'duel.answered': 'تم إرسال الإجابة. في انتظار المنافس…',
    'duel.hint': 'اختر الإجابة الصحيحة قبل انتهاء الوقت.',
    'duel.roundWin': '⚡ {name} يفوز بالجولة',
    'duel.roundNone': '⏱️ لم يجد أحد الإجابة',
    'duel.win': '🏆 {name} يفوز بالمبارزة',
    'duel.tie': '🤝 تعادل',
    'duel.again': 'مبارزة جديدة',
    'duel.home': 'العودة إلى البداية',
    'duel.copied': 'تم نسخ الرمز {code}.',
    'duel.codeIs': 'الرمز للمشاركة: {code}',
    'duel.resume': 'استئناف المبارزة {code}',
    'duel.running': 'مبارزة جارية بالرمز {code}.',
    'duel.gone': 'هذه المبارزة لم تعد موجودة (ربما صفّر الأستاذ المنافسة).',
    'duel.nameRequired': 'اكتب اسمك ولقبك قبل بدء مبارزة.',
    'duel.promptCode': 'رمز المبارزة الذي أعطاه لك منافسك:',
    'duel.promptReset': 'رمز الأستاذ لتصفير المنافسة:',

    'comp.offline': 'وضع دون اتصال: الترتيب المحلي يعمل. افتح اللعبة من عنوانها على الإنترنت للمنافسة بين المتربّصين.',
    'comp.wait': 'جارٍ الاتصال بخادم المنافسة…',
    'comp.online': 'متصل · {count} متربّص مصنّف{rank}',
    'comp.rank': ' · رتبتك: {rank}',
    'comp.published': 'تم نشر النتيجة: {total}/600 · الرتبة {rank} من {count}',
    'comp.resetConfirm': 'تم تصفير المنافسة. يمكن للمتربّصين البدء من جديد.',
    'comp.resetDenied': 'رفض التصفير: رمز غير صحيح.',
    'comp.resetting': 'جارٍ تصفير المنافسة…',
    'comp.none': 'لا توجد نتائج منشورة بعد.',
    'comp.localOnly': 'وضع دون اتصال: النتيجة محفوظة على هذا الجهاز فقط.',
    'comp.publishing': 'جارٍ نشر النتيجة…',
    'comp.blocked': 'النشر غير ممكن ({msg}).',
    'comp.offlineDuel': 'لا توجد منافسة لتصفيرها في وضع عدم الاتصال.',
    'lb.empty': 'سيظهر الترتيب هنا.',
    'lb.levels': '{n} مستوى مكتمل'
  }
};

/* Règles complètes, réécrites selon la langue (le français reste dans index.html) */
const RULES_HTML = {
  en: `
    <p class="rules-lead">Goal: complete the <strong>6 levels</strong> of thin-layer chromatography, scoring as many points as possible and unlocking 6 gifts.</p>
    <h4>👤 Players</h4>
    <ul>
      <li>Each player registers with a <strong>first and last name</strong> in a single field.</li>
      <li>Scores and gifts are stored on this device: same name, same progress.</li>
      <li>The ranking compares every player registered on the device.</li>
    </ul>
    <h4>🎯 Progress and points</h4>
    <ul>
      <li>6 levels, <strong>100 points maximum per level</strong> (600 in total).</li>
      <li>A level unlocks when the previous one is completed (score above 0).</li>
      <li>Only the <strong>best score</strong> of each level is kept: replaying can only improve it.</li>
      <li>Stars: ★ from 1 point, ★★ from 60, ★★★ from 90.</li>
    </ul>
    <h4>⏱ Timer (hard mode)</h4>
    <ul>
      <li>Quiz 18 s · Equipment choice 35 s · Ordering 40 s · Calculations 30 s · Spotting 22 s.</li>
      <li>Time out = 0 point for the step, and the right answer is shown.</li>
    </ul>
    <h4>⚠️ Penalties</h4>
    <ul>
      <li>Wrong quiz answer: <strong>−5 points</strong>. Each wrong item or ordering mistake: <strong>−5 points</strong>.</li>
      <li>A level score can never go below 0.</li>
    </ul>
    <h4>🧪 Laboratory rules</h4>
    <ul>
      <li>Draw the baseline <strong>in pencil</strong>, never with a pen.</li>
      <li>Spot <strong>just above the baseline</strong>, in the centre; eluent stays <strong>below the spot</strong>.</li>
      <li>Stop elution <strong>on the stop line</strong>; Rf = spot distance ÷ solvent front distance.</li>
    </ul>
    <h4>🎁 Gifts and certificate</h4>
    <ul>
      <li>One gift per completed level. Printable signed certificate after the 6 levels: bronze from 180 points, silver from 360, gold from 540.</li>
      <li><strong>Grade out of 20</strong>: points ÷ 600 × 20, with a mention (Insufficient &lt; 10, Passable 10, Fairly good 12, Good 14, Very good 16, Excellent 18).</li>
    </ul>`,
  ar: `
    <p class="rules-lead">الهدف: إتمام <strong>المستويات الستة</strong> للكروماتوغرافيا على طبقة رقيقة بجمع أكبر عدد من النقاط وفتح 6 هدايا.</p>
    <h4>👤 اللاعبون</h4>
    <ul>
      <li>يسجّل كل لاعب <strong>اسمه ولقبه</strong> في خانة واحدة.</li>
      <li>تُحفظ النقاط والهدايا على هذا الجهاز: نفس الاسم، نفس التقدّم.</li>
      <li>يقارن الترتيب جميع اللاعبين المسجّلين على الجهاز.</li>
    </ul>
    <h4>🎯 التقدّم والنقاط</h4>
    <ul>
      <li>6 مستويات، <strong>100 نقطة كحد أقصى لكل مستوى</strong> (600 في المجموع).</li>
      <li>يُفتح المستوى بإتمام الذي قبله (نتيجة أكبر من 0).</li>
      <li>تُحفظ <strong>أفضل نتيجة</strong> لكل مستوى فقط: إعادة اللعب لا تُنقصها.</li>
      <li>النجوم: ★ من نقطة واحدة، ★★ من 60، ★★★ من 90.</li>
    </ul>
    <h4>⏱ المؤقت (الوضع الصعب)</h4>
    <ul>
      <li>سؤال 18 ث · اختيار الأدوات 35 ث · الترتيب 40 ث · الحسابات 30 ث · التنقيط 22 ث.</li>
      <li>انتهاء الوقت = 0 نقطة في الخطوة، وتُعرض الإجابة الصحيحة.</li>
    </ul>
    <h4>⚠️ الخصم</h4>
    <ul>
      <li>إجابة خاطئة: <strong>−5 نقاط</strong>. كل أداة دخيلة أو خطأ في الترتيب: <strong>−5 نقاط</strong>.</li>
      <li>لا تنزل نتيجة المستوى تحت الصفر.</li>
    </ul>
    <h4>🧪 قواعد المختبر</h4>
    <ul>
      <li>يُرسم خط الأساس <strong>بقلم الرصاص</strong> لا بقلم الحبر.</li>
      <li>توضع العيّنة <strong>فوق خط الأساس مباشرة</strong> وفي الوسط؛ ويبقى المذيب <strong>تحت العيّنة</strong>.</li>
      <li>يُوقف التطوير <strong>على خط التوقف</strong>؛ Rf = مسافة البقعة ÷ مسافة الجبهة.</li>
    </ul>
    <h4>🎁 الهدايا والشهادة</h4>
    <ul>
      <li>هدية لكل مستوى مكتمل. شهادة موقّعة قابلة للطباعة بعد المستويات الستة: برونزية من 180 نقطة، فضية من 360، ذهبية من 540.</li>
      <li><strong>علامة على 20</strong>: النقاط ÷ 600 × 20 مع تقدير (ضعيف أقل من 10، مقبول 10، حسن 12، جيد 14، جيد جداً 16، ممتاز 18).</li>
    </ul>`
};

function t(key, vars) {
  const pack = UI[LANG] || {};
  let value = pack[key];
  if (value === undefined) value = UI.fr[key];
  if (value === undefined) return key;
  if (vars) {
    Object.keys(vars).forEach(name => {
      value = value.split('{' + name + '}').join(vars[name]);
    });
  }
  return value;
}

function applyI18n() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-ar', LANG === 'ar');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = t(el.getAttribute('data-i18n'));
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = value;
    else el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });

  const rulesBody = document.getElementById('rulesBody');
  if (rulesBody) {
    if (LANG === 'fr') rulesBody.innerHTML = rulesBody.dataset.fr || rulesBody.innerHTML;
    else if (RULES_HTML[LANG]) rulesBody.innerHTML = RULES_HTML[LANG];
  }

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === LANG);
    btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === LANG ? 'true' : 'false');
  });
}

function setLang(lang) {
  LANG = UI[lang] ? lang : 'fr';
  try { localStorage.setItem(LANG_KEY, LANG); } catch (e) { /* stockage indisponible */ }
  applyI18n();
  if (typeof refreshContent === 'function') refreshContent();
}

function initLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && UI[saved]) LANG = saved;
  } catch (e) { /* stockage indisponible */ }
  const rulesBody = document.getElementById('rulesBody');
  if (rulesBody) rulesBody.dataset.fr = rulesBody.innerHTML;
  applyI18n();
}
