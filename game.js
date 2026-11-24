/* ============================================================
   Jouer avec la chromatographie sur couche mince (CCM)
   Jeu éducatif — 5 niveaux, MODE DIFFICILE
   Chrono par étape · pénalités · calculs · gestes précis
   ============================================================ */

const STORAGE_KEY = 'ccm-nabil-v2';
const TOTAL_MAX = 600;

/* Temps accordé par étape (en secondes) — le chrono descend à 0 */
const DEFAULT_TIME = { pick: 35, quiz: 18, order: 40, rf: 30, deposit: 22, elution: 0 };

const PENALTY = -5;

/* ---------- contenu pédagogique ---------- */

const PHASES = [
  {
    id: 'p1', n: 1, emoji: '🔬', color: '#4f7cff',
    title: 'Le matériel du labo',
    tag: 'Découvrir la CCM',
    gift: { emoji: '🧪', name: 'Badge Apprenti chimiste' },
    steps: [
      {
        type: 'intro', points: 0, title: 'Bienvenue au labo de Nabil !',
        text: 'La <strong>chromatographie sur couche mince</strong> (CCM) permet de <strong>séparer et d’identifier</strong> les composés d’un mélange. <br><span class="tag pink">Mode difficile : chrono sur chaque étape et pénalités en cas d’erreur.</span>',
        bullets: [
          'La <strong>phase stationnaire</strong> : la plaque de silice (polaire), qui reste immobile.',
          'La <strong>phase mobile</strong> : l’éluant, un solvant qui monte par capillarité.',
          'Les composés migrent plus ou moins haut selon leur <strong>polarité</strong>.'
        ]
      },
      {
        type: 'pick', points: 25, title: 'Choisis le bon matériel',
        text: 'Sélectionne exactement les <strong>5 objets indispensables</strong>. Chaque intrus coûte 5 points.',
        items: [
          { emoji: '🟩', label: 'Plaque de silice', ok: true },
          { emoji: '🫙', label: 'Cuve à chromatographie', ok: true },
          { emoji: '🧴', label: 'Éluant', ok: true },
          { emoji: '💉', label: 'Capillaire', ok: true },
          { emoji: '✏️', label: 'Crayon à papier', ok: true },
          { emoji: '🖊️', label: 'Stylo à bille', ok: false },
          { emoji: '🔬', label: 'Microscope', ok: false },
          { emoji: '⚖️', label: 'Balance', ok: false },
          { emoji: '♨️', label: 'Bain-marie', ok: false }
        ],
        explain: 'Il faut la plaque, la cuve, l’éluant, un capillaire et un crayon pour tracer la ligne de base et marquer le front. Un stylo serait entraîné par l’éluant.'
      },
      {
        type: 'quiz', points: 25, title: 'Crayon ou stylo ?',
        text: 'On trace la ligne de dépôt au crayon à papier, pas au stylo.',
        options: [
          'Parce que l’encre du stylo serait entraînée par l’éluant et fausserait le résultat',
          'Parce que le crayon est plus facile à tailler',
          'Parce que l’encre réagit avec la silice et la dissout',
          'Parce que le crayon rend la plaque conductrice'
        ],
        answer: 0,
        explain: 'L’encre du stylo est un mélange de colorants : l’éluant l’entraînerait et créerait des taches parasites.'
      },
      {
        type: 'quiz', points: 25, title: 'Quelle est la phase stationnaire ?',
        text: 'Attention aux pièges de vocabulaire.',
        options: [
          'L’éluant',
          'La plaque de silice',
          'L’air contenu dans la cuve',
          'L’eau du robinet'
        ],
        answer: 1,
        explain: 'La plaque de silice est la phase stationnaire : elle ne bouge pas. L’éluant est la phase mobile.'
      },
      {
        type: 'quiz', points: 25, title: 'À quoi sert la CCM ?',
        text: 'Question de synthèse.',
        options: [
          'À mesurer la masse d’un solide',
          'À séparer et identifier les composés d’un mélange',
          'À chauffer un liquide jusqu’à ébullition',
          'À filtrer une solution trouble'
        ],
        answer: 1,
        explain: 'La CCM sépare les composés grâce à deux phases, puis permet de les identifier par leur rapport frontal Rf.'
      }
    ]
  },

  {
    id: 'p2', n: 2, emoji: '🧴', color: '#12b886',
    title: 'Préparer la cuve',
    tag: 'Éluant et saturation',
    gift: { emoji: '⚗️', name: 'Brevet du parfait éluant' },
    steps: [
      {
        type: 'intro', points: 0, title: 'Une cuve bien préparée',
        text: 'La réussite d’une CCM dépend beaucoup de la préparation : <strong>éluant, saturation, niveau</strong>.',
        bullets: [
          'L’éluant ne doit <strong>jamais toucher le dépôt</strong>.',
          'Une cuve saturée donne un front d’éluant bien droit.',
          'On ferme la cuve avec son couvercle pendant toute la migration.'
        ]
      },
      {
        type: 'order', points: 25, title: 'Remets les 6 étapes dans l’ordre',
        text: 'Clique dans le bon ordre. Chaque erreur coûte 5 points.',
        correct: [
          'Verser l’éluant dans la cuve',
          'Fermer la cuve pour la saturer',
          'Tracer la ligne de base au crayon',
          'Déposer l’échantillon avec le capillaire',
          'Placer la plaque dans la cuve et laisser migrer',
          'Sortir la plaque et marquer le front au crayon'
        ],
        explain: 'On prépare et sature la cuve, on trace la ligne de base, on dépose, on laisse migrer, puis on marque le front dès la sortie de la plaque.'
      },
      {
        type: 'quiz', points: 20, title: 'Pourquoi saturer la cuve ?',
        text: 'Le couvercle reste en place pendant toute l’élution.',
        options: [
          'Pour chauffer l’éluant',
          'Pour empêcher l’éluant de s’évaporer et obtenir un front régulier',
          'Pour colorer les taches',
          'Pour empêcher la plaque de tomber'
        ],
        answer: 1,
        explain: 'Les vapeurs de solvant saturent l’atmosphère : l’éluant monte régulièrement et le front reste droit.'
      },
      {
        type: 'quiz', points: 20, title: 'Où doit se trouver l’éluant ?',
        text: 'Erreur classique au laboratoire.',
        options: [
          'Jusqu’au bord de la plaque',
          'À mi-hauteur de la plaque',
          'Juste sous le dépôt, sans le toucher',
          'Au-dessus du dépôt'
        ],
        answer: 2,
        explain: 'Si l’éluant recouvre le dépôt, l’échantillon se dissout dans la cuve : la séparation est ratée.'
      },
      {
        type: 'rf', points: 15, title: 'Calcul : volume d’éluant',
        text: 'Une cuve a une base de <strong>8 cm × 4 cm</strong> et on veut une hauteur d’éluant de <strong>0,5 cm</strong>. Quel volume total d’éluant faut-il ? (en mL)',
        answer: 16, tolerance: 0.5, unit: 'mL', placeholder: 'Ex : 16',
        explain: 'V = 8 × 4 × 0,5 = 16 cm³ = 16 mL, par exemple hexane 11,2 mL + acétate d’éthyle 4,8 mL pour un mélange 70:30.'
      },
      {
        type: 'quiz', points: 20, title: 'Un éluant trop polaire…',
        text: 'Réfléchis à l’effet sur les Rf.',
        options: [
          'Entraîne tous les composés très haut : ils se séparent mal',
          'Bloque tous les composés au niveau du dépôt',
          'N’a aucun effet sur la migration',
          'Dissout la plaque de silice'
        ],
        answer: 0,
        explain: 'Un éluant très polaire entraîne fortement les composés : les Rf deviennent grands et les taches se rapprochent du front.'
      }
    ]
  },

  {
    id: 'p3', n: 3, emoji: '💧', color: '#ff8a3d',
    title: 'Déposer l’échantillon',
    tag: 'Geste de précision',
    gift: { emoji: '🎯', name: 'Médaille du dépôt précis' },
    steps: [
      {
        type: 'intro', points: 0, title: 'Un dépôt petit et net',
        text: 'Avec un <strong>capillaire</strong>, on dépose une toute petite tache <strong>juste au-dessus de la ligne de base</strong>, au centre de la plaque.',
        bullets: [
          'Une tache trop grosse s’étale et les composés se mélangent.',
          'On peut déposer plusieurs fois au même endroit en séchant entre chaque dépôt.',
          'Aucun repère ne sera affiché : à toi d’être précis, le chrono tourne.'
        ]
      },
      {
        type: 'deposit', points: 40, title: 'À toi de déposer !',
        text: 'Clique sur la plaque pour déposer la tache : <strong>juste au-dessus de la ligne de base</strong>, <strong>au centre</strong>. La précision est notée.',
        explain: 'Un dépôt collé à la ligne de base, centré et loin des bords, laisse toute la hauteur de plaque pour la migration.'
      },
      {
        type: 'quiz', points: 20, title: 'À quoi sert le capillaire ?',
        text: 'On l’appelle aussi « tube capillaire ».',
        options: [
          'À chauffer la plaque',
          'À déposer une très petite quantité d’échantillon',
          'À mesurer le pH',
          'À filtrer l’éluant'
        ],
        answer: 1,
        explain: 'Le capillaire dépose un volume minuscule et régulier : la tache reste petite et nette.'
      },
      {
        type: 'quiz', points: 20, title: 'Pourquoi sécher la tache ?',
        text: 'Entre deux dépôts au même endroit.',
        options: [
          'Pour éviter que la tache ne s’étale et pour concentrer l’échantillon',
          'Pour changer la couleur de l’échantillon',
          'Pour dissoudre la silice',
          'Pour saturer la cuve plus vite'
        ],
        answer: 0,
        explain: 'En séchant entre chaque dépôt, on concentre l’échantillon sans agrandir la tache.'
      },
      {
        type: 'quiz', points: 20, title: 'Pourquoi déposer au centre ?',
        text: 'Pense à la façon dont l’éluant monte dans la plaque.',
        options: [
          'Pour que l’éluant monte droit, sans effet de bord',
          'Pour que la tache soit plus colorée',
          'Pour éviter que le capillaire ne casse',
          'Pour utiliser moins d’éluant'
        ],
        answer: 0,
        explain: 'Près des bords, l’éluant monte plus vite et le front devient courbe : les taches sont déformées.'
      }
    ]
  },

  {
    id: 'p4', n: 4, emoji: '🌈', color: '#7b5cff',
    title: 'L’élution',
    tag: 'La migration des taches',
    gift: { emoji: '🌟', name: 'Étoile du front d’éluant' },
    steps: [
      {
        type: 'intro', points: 0, title: 'Laisse monter l’éluant',
        text: 'L’éluant monte par <strong>capillarité</strong> et entraîne les composés. Les plus <strong>polaires</strong> restent près du dépôt, les moins polaires montent plus haut. <br><span class="tag pink">L’élution est plus rapide qu’avant : sois vif !</span>',
        bullets: [
          'On arrête l’élution avant que le front n’atteigne le haut de la plaque.',
          'On marque ensuite le front au crayon, immédiatement, avant que l’éluant ne s’évapore.',
          'Plus la plaque est longue, meilleure est la séparation.'
        ]
      },
      {
        type: 'elution', points: 40, title: 'Arrête l’éluant au bon moment',
        text: 'Lance la migration puis clique sur <strong>« Arrêter l’éluant »</strong> quand le front touche la <strong>ligne d’arrêt rose</strong>. La marge d’erreur est faible.',
        explain: 'Le front doit s’arrêter juste avant le haut de la plaque : on garde une marge pour le repérer.'
      },
      {
        type: 'quiz', points: 20, title: 'Pourquoi les composés montent-ils ?',
        text: 'Question sur le mécanisme.',
        options: [
          'Ils sont entraînés par l’éluant qui monte par capillarité',
          'Ils sont aspirés par le couvercle de la cuve',
          'Ils fondent sous la lumière',
          'Ils sont poussés par l’air comprimé'
        ],
        answer: 0,
        explain: 'L’éluant monte dans la silice par capillarité et entraîne les composés avec lui.'
      },
      {
        type: 'quiz', points: 20, title: 'Le composé le plus polaire…',
        text: 'La silice est polaire.',
        options: [
          'Monte le plus haut',
          'Reste le plus près du dépôt (Rf faible)',
          'Disparaît pendant l’élution',
          'Quitte la plaque avec l’éluant'
        ],
        answer: 1,
        explain: 'La silice retient les composés polaires, qui migrent donc moins loin (Rf faible).'
      },
      {
        type: 'quiz', points: 20, title: 'Révéler des taches incolores',
        text: 'Tous les composés ne sont pas colorés.',
        options: [
          'En les goûtant',
          'Sous une lampe UV ou dans une cuve à iode',
          'En chauffant la plaque au rouge',
          'En la plongeant dans l’eau'
        ],
        answer: 1,
        explain: 'La lampe UV (silice fluorescente) ou l’iode révèlent les taches invisibles à l’œil nu.'
      }
    ]
  },

  {
    id: 'p5', n: 5, emoji: '🧮', color: '#ff5c8a',
    title: 'Calculer et identifier',
    tag: 'Le rapport frontal Rf',
    gift: { emoji: '🏅', name: 'Diplôme d’expert CCM' },
    steps: [
      {
        type: 'intro', points: 0, title: 'Le rapport frontal Rf',
        text: 'Le <strong>rapport frontal</strong> Rf permet d’identifier un composé : c’est un nombre compris entre 0 et 1, caractéristique dans des conditions données.',
        formula: '<span class="formula">Rf = <span class="frac"><span>distance parcourue par la tache</span><span>distance parcourue par l’éluant</span></span> &nbsp;·&nbsp; Rs = <span class="frac"><span>2 (d₂ − d₁)</span><span>w₁ + w₂</span></span></span>',
        bullets: [
          'On mesure toujours d au <strong>centre de la tache</strong>, à partir de la ligne de dépôt.',
          'Rf optimal entre <strong>0,3 et 0,7</strong> ; ΔRf ≥ 0,1 ; séparation complète si <strong>Rs ≥ 1,5</strong>.',
          'Rf proche de 0 : composé très retenu (polaire). Rf proche de 1 : composé très peu retenu (apolaire).',
          'Les calculs sont notés au centième, sans indulgence.'
        ]
      },
      {
        type: 'rf', points: 20, title: 'Calcul 1 : le Rf',
        text: 'La tache a parcouru <strong>3,2 cm</strong> et le front de l’éluant <strong>8,0 cm</strong>. Quel est le Rf ? (arrondis au centième)',
        answer: 0.4, tolerance: 0.01, unit: '', placeholder: 'Ex : 0,40',
        explain: 'Rf = 3,2 ÷ 8,0 = 0,40.'
      },
      {
        type: 'quiz', points: 20, title: 'Qui est le plus polaire ?',
        text: 'Deux taches ont été mesurées sur la même plaque.',
        options: [
          'La tache de Rf = 0,15',
          'La tache de Rf = 0,72',
          'Les deux ont la même polarité',
          'Impossible à savoir'
        ],
        answer: 0,
        explain: 'Plus un composé est polaire, plus il est retenu par la silice : son Rf est petit (0,15 < 0,72).'
      },
      {
        type: 'rf', points: 15, title: 'Calcul : la résolution Rs',
        text: 'Sur une plaque, D = 8,0 cm. Les centres de deux taches sont à <strong>d₁ = 2,4 cm</strong> et <strong>d₂ = 5,2 cm</strong> ; leurs diamètres sont <strong>w₁ = 0,5 cm</strong> et <strong>w₂ = 0,6 cm</strong>. Calcule Rs = 2(d₂ − d₁) / (w₁ + w₂). (une décimale)',
        answer: 5.1, tolerance: 0.06, unit: '', placeholder: 'Ex : 5,1',
        explain: 'Rs = 2 × (5,2 − 2,4) / (0,5 + 0,6) = 5,6 / 1,1 ≈ 5,1. Très supérieur à 1,5 : les taches sont parfaitement séparées, l’éluant convient.'
      },
      {
        type: 'quiz', points: 30, title: 'Identifie l’échantillon (manuel, exercice 3)',
        text: 'D = 9,0 cm. Témoins : T1 → Rf 0,32 ; T2 → 0,58 ; T3 → 0,74. L’échantillon donne deux taches à <strong>5,2 cm</strong> et <strong>6,7 cm</strong> de la ligne de dépôt.',
        options: [
          'T2 et T3 ; T1 est absent',
          'T1 et T2 ; T3 est absent',
          'Uniquement T1',
          'Uniquement T2'
        ],
        answer: 0,
        explain: 'Rf = 5,2 / 9,0 = 0,58 → T2 et 6,7 / 9,0 = 0,74 → T3 ; rien à 0,32 donc T1 est absent. On confirme par co-chromatographie (E + T2 au même point) et par un second éluant.'
      },
      {
        type: 'rf', points: 15, title: 'Calcul 2 : la distance de la tache',
        text: 'Une tache a un Rf de <strong>0,65</strong>. Le front de l’éluant a parcouru <strong>6,4 cm</strong>. Quelle distance la tache a-t-elle parcourue ? (en cm, au centième)',
        answer: 4.16, tolerance: 0.06, unit: 'cm', placeholder: 'Ex : 4,16',
        explain: 'd(tache) = Rf × d(front) = 0,65 × 6,4 = 4,16 cm.'
      }
    ]
  },

  {
    id: 'p6', n: 6, emoji: '📚', color: '#12a5c8',
    title: 'Montages et révélation',
    tag: 'Le manuel du formateur',
    gift: { emoji: '🏆', name: 'Trophée du laboratoire' },
    steps: [
      {
        type: 'intro', points: 0, title: 'Cinq montages, cinq usages',
        text: 'Le manuel du formateur décrit cinq montages types, du bécher couvert à la chaîne HPTLC. Le bon montage dépend du besoin : initiation, routine, mélange complexe, dosage ou purification.',
        bullets: [
          '<strong>M1</strong> bécher couvert : initiation, essai rapide d’éluant (saturation incomplète).',
          '<strong>M2</strong> cuve saturée : routine, 10 pistes et plus, fronts droits.',
          '<strong>M3</strong> bidimensionnelle : deux éluants à 90°, mélanges très complexes.',
          '<strong>M4</strong> HPTLC : applicateur automatique + densitomètre, dosage.',
          '<strong>M5</strong> préparative : plaque épaisse, bande, grattage, extraction (5 à 100 mg).'
        ]
      },
      {
        type: 'quiz', points: 20, title: 'Quel montage pour la routine ?',
        text: 'Contrôle de qualité quotidien, plusieurs échantillons par plaque, Rf reproductibles.',
        options: [
          'M1 — bécher couvert',
          'M2 — cuve saturée avec papier filtre',
          'M3 — CCM bidimensionnelle',
          'M5 — CCM préparative'
        ],
        answer: 1,
        explain: 'La cuve saturée (M2) donne un front droit et des Rf reproductibles : c’est le montage de la routine, avec 10 pistes et plus par plaque.'
      },
      {
        type: 'quiz', points: 20, title: 'Un mélange très complexe',
        text: 'Un hydrolysat d’acides aminés, un seul dépôt, des taches qui se chevauchent malgré un bon éluant.',
        options: [
          'M1, avec un bécher plus grand',
          'M3 — deux développements à 90° avec deux éluants',
          'M4 — HPTLC',
          'M5 — préparative'
        ],
        answer: 1,
        explain: 'La CCM bidimensionnelle (M3) développe la plaque dans deux directions avec deux éluants de sélectivité différente : chaque composé a deux Rf et le pouvoir de séparation est bien supérieur.'
      },
      {
        type: 'quiz', points: 20, title: 'À quoi sert le densitomètre ?',
        text: 'Dans une chaîne HPTLC (montage M4).',
        options: [
          'À déposer les échantillons en bandes',
          'À mesurer l’aire de chaque pic pour quantifier',
          'À saturer la chambre de développement',
          'À gratter la silice'
        ],
        answer: 1,
        explain: 'Le densitomètre balaie la piste : l’aire de chaque pic est proportionnelle à la quantité déposée. Le dépôt en bandes, lui, revient à l’applicateur automatique.'
      },
      {
        type: 'quiz', points: 20, title: 'Révéler des acides aminés',
        text: 'Composés incolores et non fluorescents.',
        options: [
          'Ninhydrine, puis chauffage vers 105 °C : taches violettes',
          'Lampe UV 254 nm uniquement',
          'Eau distillée',
          'Iode, sans chauffage'
        ],
        answer: 0,
        explain: 'La ninhydrine révèle les acides aminés et les amines en taches violettes après chauffage (105 °C). Cette révélation est irréversible : on la fait en dernier.'
      },
      {
        type: 'quiz', points: 20, title: 'Dépannage : front oblique',
        text: 'Sur la plaque, le front d’éluant est incurvé et les taches d’une même ligne n’ont pas la même hauteur.',
        options: [
          'Chauffer la plaque pendant la migration',
          'Saturer la cuve 15 à 30 min et poser la plaque droite, sans toucher le papier filtre',
          'Déposer beaucoup plus d’échantillon',
          'Utiliser un éluant plus volatil'
        ],
        answer: 1,
        explain: 'Le front incurvé (effet de bord) vient d’une cuve non saturée ou d’une plaque mal posée : saturation 15–30 min, plaque droite, couvercle fermé et cuve immobile pendant la migration.'
      }
    ]
  }
];

/* ---------- état ---------- */

let data = loadData();
const session = { playerKey: null, phaseIdx: 0, stepIdx: 0, phaseScore: 0, stepLocked: false };
let animHandle = null;
let timerInterval = null;

const $ = (sel, root = document) => root.querySelector(sel);

function loadData() {
  try {
    // reprise des joueurs enregistrés avec la version précédente du jeu
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('ccm-nabil-v1');
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object' && parsed.players) return parsed;
  } catch (e) { /* stockage indisponible */ }
  return { players: {} };
}

function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* mode privé */ }
}

function playerKey(fullName) {
  return fullName.replace(/\s+/g, ' ').trim().toLowerCase();
}

function fullName(player) {
  return (player.prenom + ' ' + player.nom).replace(/\s+/g, ' ').trim();
}

function getPlayer() {
  return data.players[session.playerKey] || null;
}

function totalScore(player) {
  return PHASES.reduce((sum, ph) => sum + (player.scores[ph.id] || 0), 0);
}

function noteSur20(total) {
  return Math.round((Math.max(0, Math.min(TOTAL_MAX, total)) / TOTAL_MAX) * 20 * 10) / 10;
}

function noteTexte(total) {
  const note = noteSur20(total);
  return Number.isInteger(note) ? String(note) : note.toFixed(1).replace('.', ',');
}

function mentionDe(total) {
  const note = noteSur20(total);
  if (note >= 18) return t('mention.excellent');
  if (note >= 16) return t('mention.veryGood');
  if (note >= 14) return t('mention.good');
  if (note >= 12) return t('mention.fair');
  if (note >= 10) return t('mention.passable');
  return t('mention.insufficient');
}

function starCount(score) {
  return score >= 90 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0;
}

function starsHTML(score) {
  const n = starCount(score);
  return [0, 1, 2].map(i => `<span class="${i < n ? '' : 'off'}">★</span>`).join('');
}

/* ---------- navigation ---------- */

const SCREENS = ['home', 'map', 'phase', 'duel', 'end'];

function showScreen(name) {
  stopAnim();
  clearTimer();
  SCREENS.forEach(s => $('#screen-' + s).classList.toggle('hidden', s !== name));
  $('#topbar').classList.toggle('hidden', name === 'home');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateTopbar() {
  const p = getPlayer();
  if (!p) return;
  $('#tbPlayer').textContent = fullName(p);
  $('#tbTotal').textContent = totalScore(p);
}

function stopAnim() {
  if (animHandle) { cancelAnimationFrame(animHandle); animHandle = null; }
}

/* ---------- chronomètre ---------- */

function clearTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function startTimer(seconds) {
  clearTimer();
  const wrap = $('#stepTimerWrap');
  if (!wrap || !seconds) return;

  wrap.classList.remove('hidden');
  const fill = $('#timerFill');
  const text = $('#timerText');
  const totalMs = seconds * 1000;
  const started = performance.now();
  let lastTick = null;

  fill.style.width = '100%';
  text.textContent = '⏱ ' + seconds + ' s';

  timerInterval = setInterval(() => {
    const left = Math.max(0, totalMs - (performance.now() - started));
    fill.style.width = (left / totalMs) * 100 + '%';
    const shown = Math.ceil(left / 1000);
    text.textContent = '⏱ ' + shown + ' s';
    fill.classList.toggle('low', left / totalMs < 0.3);
    if (shown !== lastTick && shown <= 5 && shown > 0) { lastTick = shown; sfx.tick(); }

    if (left <= 0) {
      clearTimer();
      if (!session.stepLocked) onStepTimeout();
    }
  }, 100);
}

function onStepTimeout() {
  const ph = PHASES[session.phaseIdx];
  const step = ph.steps[session.stepIdx];

  if (step.type === 'quiz') {
    const options = document.querySelectorAll('#stepCard .option');
    options.forEach(o => { o.disabled = true; });
    if (options[step.answer]) options[step.answer].classList.add('correct');
  }
  if (step.type === 'pick') {
    document.querySelectorAll('#stepCard .pick').forEach(b => { b.disabled = true; });
    const validate = $('#pickValidate');
    if (validate) validate.disabled = true;
  }
  if (step.type === 'rf') {
    const input = $('#rfInput');
    const check = $('#rfCheck');
    if (input) input.disabled = true;
    if (check) check.disabled = true;
  }

  finishStep(0, '⏱ Temps écoulé ! ' + (step.explain || ''), false);
}

/* ---------- accueil ---------- */

function renderHome() {
  const strip = $('#homePlayers');
  strip.innerHTML = '';
  const players = Object.values(data.players);
  if (!players.length) {
    const empty = document.createElement('span');
    empty.className = 'gift-pill empty';
    empty.textContent = t('home.playersEmpty');
    strip.appendChild(empty);
  }
  players
    .sort((a, b) => fullName(a).localeCompare(fullName(b), 'fr'))
    .forEach(p => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'player-chip';
      chip.textContent = '👤 ' + fullName(p);
      chip.addEventListener('click', () => openPlayer(p.key));
      strip.appendChild(chip);
    });

  renderLeaderboard($('#homeLeader'), 4);
  $('#formHint').classList.add('hidden');
}

function renderLeaderboard(container, limit) {
  container.innerHTML = '';
  const players = Object.values(data.players)
    .map(p => ({ p, total: totalScore(p) }))
    .sort((a, b) => b.total - a.total);

  if (!players.length) {
    container.innerHTML = '<div class="lb-row"><span class="lb-name">' + t('lb.empty') + '</span></div>';
    return;
  }
  const medals = ['🥇', '🥈', '🥉'];
  players.slice(0, limit || 99).forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'lb-row' + (entry.p.key === session.playerKey ? ' me' : '');
    row.innerHTML = `<span class="lb-rank">${medals[i] || (i + 1)}</span>`;
    const name = document.createElement('span');
    name.className = 'lb-name';
    name.textContent = fullName(entry.p);
    const score = document.createElement('span');
    score.className = 'lb-score';
    score.textContent = entry.total + ' pts · ' + noteTexte(entry.total) + '/20';
    row.append(name, score);
    container.appendChild(row);
  });
}

function openPlayer(key) {
  const p = data.players[key];
  if (!p) return;
  session.playerKey = key;
  updateTopbar();
  renderMap();
  showScreen('map');
  showRulesIfNeeded(p);
}

function startPlayer(nomComplet) {
  const cleaned = nomComplet.replace(/\s+/g, ' ').trim();
  const parts = cleaned.split(' ');
  const prenom = parts.shift() || '';
  const nom = parts.join(' ');
  const key = playerKey(cleaned);

  if (!data.players[key]) {
    data.players[key] = { key, prenom, nom, scores: {}, gifts: [] };
    saveData();
  }
  session.playerKey = key;
  updateTopbar();
  renderMap();
  showScreen('map');
  showRulesIfNeeded(data.players[key]);
}

/* ---------- compétition en ligne ---------- */

const ONLINE_API = /\.freebuff\.(site|page)$/.test(location.hostname) ? '/api' : null;

async function apiFetch(path, options) {
  const response = await fetch(ONLINE_API + path, Object.assign({ cache: 'no-store' }, options || {}));
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
}

function setCompStatus(kind, message) {
  const el = $('#compStatus');
  if (!el) return;
  el.className = 'comp-status ' + kind;
  el.textContent = message;
}

function renderOnlineList(players) {
  const box = $('#onlineLeaderboard');
  if (!box) return;
  box.innerHTML = '';
  if (!players || !players.length) {
    box.innerHTML = '<div class="lb-row"><span class="lb-name">' + t('comp.none') + '</span></div>';
    return;
  }
  const me = getPlayer();
  const myName = me ? fullName(me).toLowerCase() : null;
  const medals = ['🥇', '🥈', '🥉'];
  players.slice(0, 20).forEach((entry, index) => {
    const row = document.createElement('div');
    row.className = 'lb-row' + (myName && entry.name.toLowerCase() === myName ? ' me' : '');
    row.innerHTML = `<span class="lb-rank">${medals[index] || index + 1}</span>`;
    const name = document.createElement('span');
    name.className = 'lb-name';
    name.textContent = entry.name;
    const levels = document.createElement('span');
    levels.className = 'lb-levels';
    levels.textContent = '\u2605'.repeat(entry.levels || 0) || '\u00b7';
    levels.title = (entry.levels || 0) + ' niveau(x) terminé(s)';
    const score = document.createElement('span');
    score.className = 'lb-score';
    score.textContent = entry.total + ' pts · ' + noteTexte(entry.total) + '/20';
    row.append(name, levels, score);
    box.appendChild(row);
  });
}

async function refreshOnline() {
  if (!ONLINE_API) {
    setCompStatus('offline', t('comp.offline'));
    const box = $('#onlineLeaderboard');
    if (box) box.innerHTML = '';
    return;
  }
  setCompStatus('wait', t('comp.wait'));
  try {
    const data = await apiFetch('/leaderboard');
    const players = data.players || [];
    renderOnlineList(players);
    const me = getPlayer();
    let suffix = '';
    if (me) {
      const rank = players.findIndex(entry => entry.name.toLowerCase() === fullName(me).toLowerCase()) + 1;
      if (rank > 0) suffix = t('comp.rank', { rank });
    }
    setCompStatus('online', t('comp.online', { count: players.length, rank: suffix }));
  } catch (error) {
    setCompStatus('error', 'Serveur injoignable (' + error.message + '). Classement local utilisé.');
  }
}

async function publishScore() {
  const player = getPlayer();
  if (!player) return;
  if (!ONLINE_API) {
    setCompStatus('offline', t('comp.localOnly'));
    return;
  }
  setCompStatus('wait', t('comp.publishing'));
  try {
    const data = await apiFetch('/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fullName(player), scores: player.scores })
    });
    renderOnlineList(data.players || []);
    setCompStatus('online', t('comp.published', { total: data.total, rank: data.rank, count: (data.players || []).length }));
  } catch (error) {
    setCompStatus('error', t('comp.blocked', { msg: error.message }));
  }
}

async function resetCompetition() {
  if (!ONLINE_API) {
    setCompStatus('offline', t('comp.offlineDuel'));
    return;
  }
  const key = window.prompt(t('duel.promptReset'));
  if (!key) return;
  setCompStatus('wait', t('comp.resetting'));
  try {
    const data = await apiFetch('/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: key.trim() })
    });
    renderOnlineList(data.players || []);
    setCompStatus('online', t('comp.resetConfirm'));
  } catch (error) {
    setCompStatus('error', t('comp.resetDenied'));
  }
}

/* ---------- duel entre stagiaires ---------- */

const DUEL_STORAGE = 'ccm-duel-v1';
let duelPlayer = null;
let duelState = null;
let duelPoll = null;
let duelKey = '';

function escHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function loadDuelSession() {
  try {
    const raw = localStorage.getItem(DUEL_STORAGE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function saveDuelSession(value) {
  try {
    if (value) localStorage.setItem(DUEL_STORAGE, JSON.stringify(value));
    else localStorage.removeItem(DUEL_STORAGE);
  } catch (e) { /* stockage indisponible */ }
}

function duelSetStatus(kind, message) {
  duelSetHomeStatus(kind, message);
}

function duelSetHomeStatus(kind, message) {
  const el = $('#duelStatus');
  if (!el) return;
  el.hidden = !message;
  el.className = 'comp-status ' + kind;
  el.textContent = message || '';
}

function duelError(message) {
  const el = $('#duelError');
  if (!el) return;
  el.hidden = !message;
  el.textContent = message || '';
}

function duelName() {
  const input = $('#inputNomComplet');
  const value = (input.value || '').replace(/\s+/g, ' ').trim();
  const mots = value.split(' ').filter(Boolean);
  if (mots.length < 2 || mots.some(m => m.length < 2) || value.length > 48) {
    duelSetHomeStatus('error', t('duel.nameRequired'));
    return null;
  }
  return value;
}

function stopDuelPolling() {
  if (duelPoll) clearInterval(duelPoll);
  duelPoll = null;
}

function startDuelPolling() {
  stopDuelPolling();
  if (!ONLINE_API) return;
  duelPoll = setInterval(() => { pollDuel(); }, 1200);
}

async function pollDuel() {
  if (!duelPlayer) return;
  try {
    const data = await apiFetch('/duel/state?code=' + encodeURIComponent(duelPlayer.code) + '&token=' + encodeURIComponent(duelPlayer.token));
    renderDuel(data);
  } catch (error) {
    if (String(error.message).indexOf('404') !== -1) {
      stopDuelPolling();
      duelPlayer = null;
      duelState = null;
      duelKey = '';
      saveDuelSession(null);
      duelSetHomeStatus('offline', t('duel.gone'));
      showScreen('home');
    }
  }
}

async function createDuel() {
  const name = duelName();
  if (!name) return;
  if (!ONLINE_API) {
    duelSetHomeStatus('offline', t('duel.offline'));
    return;
  }
  duelSetHomeStatus('wait', t('duel.creating'));
  try {
    const data = await apiFetch('/duel/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    duelPlayer = { code: data.code, token: data.token, name };
    saveDuelSession(duelPlayer);
    duelKey = '';
    showScreen('duel');
    renderDuel(data);
    startDuelPolling();
    duelSetHomeStatus('online', t('duel.created', { code: data.code }));
  } catch (error) {
    duelSetHomeStatus('error', t('comp.blocked', { msg: error.message }));
  }
}

async function joinDuel() {
  const name = duelName();
  if (!name) return;
  if (!ONLINE_API) {
    duelSetHomeStatus('offline', t('duel.offline'));
    return;
  }
  const code = (window.prompt(t('duel.promptCode')) || '').trim().toUpperCase();
  if (!code) return;
  duelSetHomeStatus('wait', t('duel.joining', { code }));
  try {
    const data = await apiFetch('/duel/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, code })
    });
    duelPlayer = { code: data.code, token: data.token, name };
    saveDuelSession(duelPlayer);
    duelKey = '';
    showScreen('duel');
    renderDuel(data);
    startDuelPolling();
    duelSetHomeStatus('online', t('duel.joined', { code: data.code }));
  } catch (error) {
    duelSetHomeStatus('error', t('comp.blocked', { msg: error.message }));
  }
}

async function startDuel() {
  if (!duelPlayer) return;
  duelError('');
  try {
    const data = await apiFetch('/duel/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: duelPlayer.code, token: duelPlayer.token })
    });
    sfx.duel();
    renderDuel(data);
  } catch (error) {
    duelError('Lancement impossible (' + error.message + ').');
  }
}

async function answerDuel(choice) {
  if (!duelPlayer || !duelState) return;
  const index = duelState.qIndex;
  document.querySelectorAll('.duel-opt').forEach(btn => { btn.disabled = true; });
  try {
    const data = await apiFetch('/duel/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: duelPlayer.code, token: duelPlayer.token, index, choice })
    });
    renderDuel(data);
    if (data.answer) { if (data.answer.correct) sfx.correct(); else sfx.wrong(); }
  } catch (error) { /* la manche a peut-être déjà changé */ }
}

async function copyDuelCode() {
  if (!duelPlayer) return;
  try {
    await navigator.clipboard.writeText(duelPlayer.code);
    duelError(t('duel.copied', { code: duelPlayer.code }));
  } catch (e) {
    duelError(t('duel.codeIs', { code: duelPlayer.code }));
  }
}

function exitDuel() {
  stopDuelPolling();
  duelPlayer = null;
  duelState = null;
  duelKey = '';
  saveDuelSession(null);
  duelError('');
  showScreen('home');
}

function resumeDuel() {
  if (!duelPlayer) return;
  duelKey = '';
  showScreen('duel');
  pollDuel();
  startDuelPolling();
}

function renderDuel(state) {
  if (!state || !state.ok) return;
  duelState = state;

  $('#duelCode').textContent = state.code;
  $('#duelMeName').textContent = state.you.name;
  $('#duelMeScore').textContent = state.you.score;
  const opp = state.players.find(p => !p.isMe);
  $('#duelOppName').textContent = opp ? opp.name : t('duel.waiting');
  $('#duelOppScore').textContent = opp ? opp.score : '0';

  const fill = $('#duelProgress');
  if (state.phase === 'question') fill.style.width = Math.round((state.remainingMs / 20000) * 100) + '%';
  else if (state.phase === 'reveal') fill.style.width = '100%';
  else fill.style.width = '0%';

  const key = [state.phase, state.qIndex, state.you.answered, state.you.choice, state.roundWinner,
    state.players.map(p => p.name + ':' + p.score).join('|')].join('#');
  if (key === duelKey) return;
  duelKey = key;

  const body = $('#duelBody');

  if (state.phase === 'lobby') {
    body.innerHTML = `
      <h2 class="duel-title">${t('duel.lobbyTitle')}</h2>
      <p class="duel-note">${state.you.isHost ? t('duel.lobbyHost') : t('duel.lobbyGuest')}</p>
      <div class="duel-players">${state.players.map(p => `<span class="duel-chip">${escHtml(p.name)}${p.isHost ? ' 👑' : ''}</span>`).join('')}</div>
      ${state.you.isHost ? `<button id="btnDuelStart" class="btn btn-primary btn-wide" type="button" ${state.players.length < 2 ? 'disabled' : ''}>${t('duel.start')}</button>` : ''}
    `;
    const btn = $('#btnDuelStart');
    if (btn) btn.addEventListener('click', startDuel);
    return;
  }

  if (state.phase === 'question') {
    body.innerHTML = `
      <p class="duel-qidx">${t('duel.question', { n: state.qIndex + 1, total: state.total })}</p>
      <h2 class="duel-title">${escHtml(state.question.text)}</h2>
      <div class="duel-options">
        ${state.question.options.map((opt, i) => `<button class="duel-opt" type="button" data-i="${i}" ${state.you.answered ? 'disabled' : ''}>${escHtml(opt)}</button>`).join('')}
      </div>
      <p class="duel-note">${state.you.answered ? t('duel.answered') : t('duel.hint')}</p>
    `;
    body.querySelectorAll('.duel-opt').forEach(btn => btn.addEventListener('click', () => answerDuel(Number(btn.dataset.i))));
    return;
  }

  if (state.phase === 'reveal') {
    body.innerHTML = `
      <p class="duel-qidx">${t('duel.question', { n: state.qIndex + 1, total: state.total })}</p>
      <h2 class="duel-title">${escHtml(state.question.text)}</h2>
      <div class="duel-options reveal">
        ${state.question.options.map((opt, i) => `<div class="duel-opt ${i === state.correctIndex ? 'good' : (i === state.you.choice ? 'bad' : '')}">${escHtml(opt)}</div>`).join('')}
      </div>
      <p class="duel-verdict">${state.roundWinner ? t('duel.roundWin', { name: escHtml(state.roundWinner) }) : t('duel.roundNone')}</p>
    `;
    return;
  }

  body.innerHTML = `
    <h2 class="duel-title">${state.winner ? t('duel.win', { name: escHtml(state.winner) }) : t('duel.tie')}</h2>
    <div class="duel-players">
      ${state.players.map(p => `<span class="duel-chip ${p.isMe ? 'me' : ''}">${escHtml(p.name)} · ${p.score} pts · ${p.correct} justes</span>`).join('')}
    </div>
    <div class="duel-actions">
      <button id="btnDuelAgain" class="btn btn-primary" type="button">${t('duel.again')}</button>
      <button id="btnDuelHome" class="btn btn-ghost" type="button">${t('duel.home')}</button>
    </div>
  `;
  const again = $('#btnDuelAgain');
  if (again) again.addEventListener('click', () => { exitDuel(); createDuel(); });
  const home = $('#btnDuelHome');
  if (home) home.addEventListener('click', exitDuel);
}

/* ---------- carte des niveaux ---------- */

function renderMap() {
  const p = getPlayer();
  if (!p) { showScreen('home'); return; }

  $('#mapPlayer').textContent = fullName(p);
  const total = totalScore(p);
  $('#mapTotal').textContent = total;
  $('#mapProgress').style.width = Math.min(100, (total / TOTAL_MAX) * 100) + '%';
  updateTopbar();

  const grid = $('#phaseGrid');
  grid.innerHTML = '';

  PHASES.forEach((ph, i) => {
    const score = p.scores[ph.id] || 0;
    const unlocked = i === 0 || (p.scores[PHASES[i - 1].id] || 0) > 0;

    const card = document.createElement('article');
    card.className = 'phase-card' + (unlocked ? '' : ' locked');
    card.style.setProperty('--accent', ph.color);
    card.innerHTML = `
      <div class="pc-top">
        <div class="pc-emoji">${unlocked ? ph.emoji : '🔒'}</div>
        <div>
          <div class="pc-title">${ph.n}. ${ph.title}</div>
          <div class="pc-tag">${ph.tag}</div>
        </div>
      </div>
      <div class="stars">${starsHTML(score)}</div>
      <div class="pc-bottom">
        <div class="pc-score">${score}<small>/100 pts</small></div>
        <div class="pc-gift ${score > 0 ? '' : 'locked'}" title="${score > 0 ? ph.gift.name : 'Cadeau à débloquer'}">${score > 0 ? ph.gift.emoji : '🎁'}</div>
        <button class="btn btn-primary pc-btn" type="button" ${unlocked ? '' : 'disabled'}>${score > 0 ? 'Rejouer' : (unlocked ? 'Jouer' : 'Bloqué')}</button>
      </div>`;

    card.querySelector('button').addEventListener('click', () => startPhase(i));
    grid.appendChild(card);
  });

  const shelf = $('#giftShelf');
  shelf.innerHTML = '';
  PHASES.forEach(ph => {
    const owned = p.gifts.includes(ph.id);
    const pill = document.createElement('span');
    pill.className = 'gift-pill' + (owned ? '' : ' empty');
    pill.textContent = owned ? ph.gift.emoji + ' ' + ph.gift.name : '🔒 Cadeau du niveau ' + ph.n;
    shelf.appendChild(pill);
  });

  renderLeaderboard($('#leaderboard'), 99);
  refreshOnline();

  const allDone = PHASES.every(ph => (p.scores[ph.id] || 0) > 0);
  $('#btnCertificat').classList.toggle('hidden', !allDone);
}

/* ---------- déroulement d'un niveau ---------- */

function startPhase(index) {
  const p = getPlayer();
  if (!p) return;
  const unlocked = index === 0 || (p.scores[PHASES[index - 1].id] || 0) > 0;
  if (!unlocked) return;

  session.phaseIdx = index;
  session.stepIdx = 0;
  session.phaseScore = 0;
  session.stepLocked = false;

  const ph = PHASES[index];
  $('#phaseEmoji').textContent = ph.emoji;
  $('#phaseEmoji').style.borderColor = ph.color;
  $('#phaseKicker').textContent = t('phase.kicker', { n: ph.n }) + ' · ' + ph.tag;
  $('#phaseTitle').textContent = ph.title;

  hideModal();
  showScreen('phase');
  renderStep();
}

function updatePhaseHeader() {
  const ph = PHASES[session.phaseIdx];
  $('#phaseScore').textContent = Math.round(session.phaseScore);
  $('#phaseProgressBar').style.width = (session.stepIdx / ph.steps.length) * 100 + '%';
}

function renderStep() {
  stopAnim();
  clearTimer();
  session.stepLocked = false;

  const ph = PHASES[session.phaseIdx];
  const step = ph.steps[session.stepIdx];
  const card = $('#stepCard');
  const footer = $('#stepFooter');

  updatePhaseHeader();
  footer.innerHTML = '';
  card.className = 'card step-card';
  card.innerHTML = `
    <p class="eyebrow">Étape ${session.stepIdx + 1} / ${ph.steps.length} · ${step.points ? step.points + ' pts' : 'découverte'}</p>
    <h3>${step.title}</h3>
    <div id="stepTimerWrap" class="timer hidden">
      <div class="timer-bar"><div id="timerFill"></div></div>
      <span class="timer-text" id="timerText"></span>
    </div>
    ${step.text ? `<p class="step-text">${step.text}</p>` : ''}
    ${step.bullets ? `<ul class="bullets">${step.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
    ${step.formula ? `<div>${step.formula}</div>` : ''}`;

  switch (step.type) {
    case 'intro': buildIntro(step); break;
    case 'pick': buildPick(step, card); break;
    case 'quiz': buildQuiz(step, card); break;
    case 'order': buildOrder(step, card); break;
    case 'rf': buildRf(step, card); break;
    case 'deposit': buildDeposit(step, card); break;
    case 'elution': buildElution(step, card); break;
  }

  const seconds = step.type === 'intro' ? 0 : (step.time || DEFAULT_TIME[step.type] || 0);
  if (seconds) startTimer(seconds);
}

function nextStep() {
  const ph = PHASES[session.phaseIdx];
  session.stepIdx += 1;
  if (session.stepIdx >= ph.steps.length) finishPhase();
  else renderStep();
}

function finishStep(earned, message, ok) {
  clearTimer();
  if (session.stepLocked) return;

  const ph = PHASES[session.phaseIdx];
  const step = ph.steps[session.stepIdx];
  session.phaseScore = Math.max(0, session.phaseScore + earned);
  session.stepLocked = true;
  if (ok) sfx.correct(); else sfx.wrong();

  updatePhaseHeader();

  const shown = Math.round(earned);
  const label = shown >= 0 ? '+' + shown : '−' + Math.abs(shown);
  const footer = $('#stepFooter');
  const isLast = session.stepIdx === ph.steps.length - 1;
  footer.innerHTML = `
    <div class="feedback ${ok ? 'ok' : 'bad'}">
      ${message}<br><strong>${label} point${Math.abs(shown) > 1 ? 's' : ''}</strong> sur ${step.points}
    </div>`;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-primary';
  btn.textContent = isLast ? t('phase.finish') : t('phase.continue');
  btn.addEventListener('click', nextStep);
  footer.appendChild(btn);
}

function buildIntro(step) {
  const footer = $('#stepFooter');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-primary';
  btn.textContent = t('phase.go');
  btn.addEventListener('click', nextStep);
  footer.appendChild(btn);
}

function buildQuiz(step, card) {
  const wrap = document.createElement('div');
  wrap.className = 'options';

  step.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.innerHTML = `<span class="letter">${'ABCD'[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => {
      if (session.stepLocked) return;
      const good = i === step.answer;
      Array.from(wrap.children).forEach(c => { c.disabled = true; });
      wrap.children[step.answer].classList.add('correct');
      if (!good) btn.classList.add('wrong');
      finishStep(
        good ? step.points : PENALTY,
        (good ? '✅ Bonne réponse ! ' : '❌ Mauvaise réponse (−5 pts). ') + step.explain,
        good
      );
    });
    wrap.appendChild(btn);
  });

  card.appendChild(wrap);
}

function buildPick(step, card) {
  const grid = document.createElement('div');
  grid.className = 'pick-grid';

  const tiles = step.items.map((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pick';
    btn.innerHTML = `<span>${item.emoji}</span>${item.label}`;
    btn.dataset.selected = '0';
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      sfx.click();
      btn.classList.toggle('sel');
      btn.dataset.selected = btn.classList.contains('sel') ? '1' : '0';
    });
    grid.appendChild(btn);
    return { btn, item };
  });

  const validate = document.createElement('button');
  validate.type = 'button';
  validate.id = 'pickValidate';
  validate.className = 'btn btn-primary btn-wide';
  validate.textContent = t('phase.validatePick');
  validate.style.marginTop = '10px';

  const expected = tiles.filter(t => t.item.ok).length;

  validate.addEventListener('click', () => {
    if (session.stepLocked) return;
    let correct = 0;
    let wrong = 0;

    tiles.forEach(({ btn, item }) => {
      const selected = btn.dataset.selected === '1';
      btn.disabled = true;
      btn.classList.remove('sel');
      if (selected) {
        if (item.ok) { btn.classList.add('good'); correct += 1; }
        else { btn.classList.add('bad'); wrong += 1; }
      } else if (item.ok) {
        btn.classList.add('bad');
      }
    });

    const earned = Math.max(0, correct * (step.points / expected) - wrong * 5);
    finishStep(
      Math.round(earned * 10) / 10,
      `${correct} bon${correct > 1 ? 's' : ''} objet${correct > 1 ? 's' : ''} sur ${expected}, ${wrong} intrus. ${step.explain}`,
      correct === expected && wrong === 0
    );
  });

  card.appendChild(grid);
  card.appendChild(validate);
}

function buildOrder(step, card) {
  const list = document.createElement('div');
  list.className = 'order-list';

  const shuffled = step.correct
    .map((text) => ({ text, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort);

  let chosen = 0;
  let errors = 0;

  const hint = document.createElement('p');
  hint.className = 'atelier-note';
      hint.textContent = t('phase.chosen', { n: 0, total: step.correct.length });

  shuffled.forEach(({ text }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'order-item';
    btn.innerHTML = `<span class="num">?</span><span>${text}</span>`;

    btn.addEventListener('click', () => {
      if (btn.disabled || session.stepLocked) return;
      const expected = step.correct[chosen];

      if (text === expected) {
        chosen += 1;
        btn.classList.add('done');
        btn.disabled = true;
        btn.querySelector('.num').textContent = chosen;
        hint.textContent = t('phase.chosen', { n: chosen, total: step.correct.length });

        if (chosen === step.correct.length) {
          const earned = Math.max(0, step.points - errors * 5);
          finishStep(earned, `Ordre correct avec ${errors} erreur${errors > 1 ? 's' : ''}. ${step.explain}`, errors === 0);
        }
      } else {
        errors += 1;
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 420);
      }
    });

    list.appendChild(btn);
  });

  card.appendChild(list);
  card.appendChild(hint);
}

function buildRf(step, card) {
  const row = document.createElement('div');
  row.className = 'readout';
  row.innerHTML = `
    <input id="rfInput" type="text" inputmode="decimal" placeholder="${step.placeholder || 'Ex : 0,40'}"
      style="font-family:inherit;font-size:1rem;font-weight:700;padding:12px 14px;border-radius:14px;border:2px solid #e3e8f5;max-width:180px">
    ${step.unit ? `<span class="tag">en ${step.unit}</span>` : ''}
    <button id="rfCheck" class="btn btn-primary" type="button">Vérifier</button>`;
  card.appendChild(row);

  const input = $('#rfInput', row);
  const check = $('#rfCheck', row);
  const tolerance = step.tolerance || 0.02;

  const verify = () => {
    if (session.stepLocked) return;
    const value = parseFloat(input.value.replace(',', '.').trim());
    if (Number.isNaN(value)) {
      input.focus();
      input.style.borderColor = '#ff5c8a';
      return;
    }
    const good = Math.abs(value - step.answer) <= tolerance;
    input.disabled = true;
    check.disabled = true;
    input.style.borderColor = good ? '#12b886' : '#ff5c8a';
    finishStep(good ? step.points : 0, (good ? '✅ Exact ! ' : '❌ Erreur de calcul. ') + step.explain, good);
  };

  check.addEventListener('click', verify);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') verify(); });
  input.focus();
}

/* ---------- atelier : dépôt ---------- */

const PLATE_W = 260;
const PLATE_H = 340;

function plateBase(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fcfdff';
  ctx.fillRect(8, 8, w - 16, h - 16);

  const baseline = h * 0.8;
  ctx.setLineDash([7, 6]);
  ctx.strokeStyle = '#b9c5e0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(14, baseline);
  ctx.lineTo(w - 14, baseline);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#93a0bd';
  ctx.font = '700 11px "Times New Roman", serif';
  ctx.textAlign = 'left';
  ctx.fillText('ligne de base', 16, baseline + 15);

  ctx.strokeStyle = '#dbe4f7';
  ctx.lineWidth = 3;
  ctx.strokeRect(2, 2, w - 4, h - 4);

  return baseline;
}

function drawSpot(ctx, x, y, color, label) {
  const g = ctx.createRadialGradient(x, y, 1, x, y, 14);
  g.addColorStop(0, color);
  g.addColorStop(1, color + '55');
  ctx.beginPath();
  ctx.arc(x, y, 11, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  if (label) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 10px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y + 0.5);
  }
}

function buildDeposit(step, card) {
  const atelier = document.createElement('div');
  atelier.className = 'atelier';
  atelier.innerHTML = `
    <div class="canvas-frame"><canvas id="depositCanvas" width="${PLATE_W}" height="${PLATE_H}"></canvas></div>
    <div class="canvas-side">
      <p class="atelier-title">Aucun repère</p>
      <p class="atelier-note">Clique sur la plaque pour déposer la tache : juste au-dessus de la ligne de base et au centre. Un dépôt trop haut, trop bas ou trop près du bord est fortement pénalisé.</p>
      <div class="readout" id="depositReadout">
        <span class="tag">Dépôt : en attente</span>
      </div>
    </div>`;
  card.appendChild(atelier);

  const canvas = $('#depositCanvas', atelier);
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const baseline = h * 0.8;
  const targetY = h * 0.78;

  plateBase(ctx, w, h);

  canvas.addEventListener('click', (event) => {
    if (session.stepLocked) return;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (w / rect.width);
    const y = (event.clientY - rect.top) * (h / rect.height);
    const clampedX = Math.min(w - 26, Math.max(26, x));

    let earned = 0;
    let message = '';

    if (y > baseline - 2) {
      earned = 0;
      message = '❌ La tache est sur ou sous la ligne de base : elle serait noyée dans l’éluant.';
    } else {
      const diff = Math.abs(y - targetY);
      if (diff <= 6) { earned = step.points; message = 'Dépôt presque parfait, collé à la ligne de base.'; }
      else if (diff <= 14) { earned = step.points * 0.75; message = 'Très bon dépôt, la tache est bien placée.'; }
      else if (diff <= 24) { earned = step.points * 0.45; message = 'Dépôt acceptable, mais un peu éloigné de la ligne de base.'; }
      else if (diff <= 36) { earned = step.points * 0.2; message = 'La tache est trop haute : la migration sera mal exploitée.'; }
      else { earned = 0; message = 'La tache est hors de la zone utile de la plaque.'; }

      if (Math.abs(clampedX - w / 2) > 55) {
        earned = Math.round(earned * 0.6);
        message += ' Et trop près du bord : le front sera courbe.';
      }
    }

    plateBase(ctx, w, h);
    drawSpot(ctx, clampedX, y, '#a855f7', '');

    const readout = $('#depositReadout', atelier);
    readout.innerHTML = `<span class="tag ${earned >= step.points * 0.7 ? 'green' : 'pink'}">Dépôt : ${Math.round(earned)} / ${step.points} pts</span>`;

    finishStep(earned, message + ' ' + step.explain, earned >= step.points * 0.7);
  });
}

/* ---------- atelier : élution ---------- */

const ELUTION_COMPS = [
  { name: 'Colorant bleu', rf: 0.25, color: '#3b82f6', dx: -26 },
  { name: 'Colorant jaune', rf: 0.50, color: '#e8a300', dx: 0 },
  { name: 'Colorant rouge', rf: 0.78, color: '#ef4444', dx: 26 }
];
const STOP_FRACTION = 0.9;
const ELUTION_MS = 4500;

function buildElution(step, card) {
  const atelier = document.createElement('div');
  atelier.className = 'atelier';
  atelier.innerHTML = `
    <div class="canvas-frame"><canvas id="elutionCanvas" width="${PLATE_W}" height="${PLATE_H}"></canvas></div>
    <div class="canvas-side">
      <p class="atelier-title">Migration en cours</p>
      <p class="atelier-note">Le front d’éluant (ligne bleue) monte vite. Arrête-le quand il touche la ligne d’arrêt rose, avec le moins d’écart possible.</p>
      <div class="readout" id="elutionReadout">Front : 0 %</div>
      <div class="readout" id="elutionLabels"></div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        <button id="btnStopElution" class="btn btn-primary" type="button">✋ Arrêter l’éluant</button>
      </div>
    </div>`;
  card.appendChild(atelier);

  const canvas = $('#elutionCanvas', atelier);
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const baseline = h * 0.8;
  const top = h * 0.12;
  const path = baseline - top;

  let progress = 0;
  let running = true;
  let start = 0;

  const draw = () => {
    plateBase(ctx, w, h);

    const stopY = baseline - STOP_FRACTION * path;
    ctx.setLineDash([6, 5]);
    ctx.strokeStyle = '#ff7fae';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(14, stopY);
    ctx.lineTo(w - 14, stopY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#d6417a';
    ctx.font = '700 11px "Times New Roman", serif';
    ctx.textAlign = 'left';
    ctx.fillText('ligne d’arrêt', 16, stopY - 7);

    if (progress > 0) {
      const frontY = baseline - progress * path;
      const g = ctx.createLinearGradient(0, frontY, 0, baseline);
      g.addColorStop(0, 'rgba(140,205,255,.30)');
      g.addColorStop(1, 'rgba(140,205,255,.10)');
      ctx.fillStyle = g;
      ctx.fillRect(12, frontY, w - 24, baseline - frontY);

      ctx.strokeStyle = '#2fa8ff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(12, frontY);
      ctx.lineTo(w - 12, frontY);
      ctx.stroke();

      ctx.fillStyle = '#1c74c4';
      ctx.font = '700 10px "Times New Roman", serif';
      ctx.fillText('front', w - 46, frontY - 6);
    }

    ELUTION_COMPS.forEach(c => {
      const y = baseline - progress * path * c.rf;
      drawSpot(ctx, w / 2 + c.dx, y, c.color, '');
    });

    if (progress === 0) {
      ctx.fillStyle = '#93a0bd';
      ctx.font = '700 10px "Times New Roman", serif';
      ctx.textAlign = 'center';
      ctx.fillText('mélange déposé', w / 2, baseline - 6);
    }
  };

  const readout = $('#elutionReadout', atelier);
  const labels = $('#elutionLabels', atelier);
  const stopBtn = $('#btnStopElution', atelier);

  const stop = (auto) => {
    if (!running) return;
    running = false;
    stopAnim();
    stopBtn.disabled = true;

    const diff = Math.abs(progress - STOP_FRACTION);
    let earned = 0;
    if (!auto) {
      if (diff <= 0.04) earned = step.points;
      else if (diff <= 0.08) earned = step.points * 0.75;
      else if (diff <= 0.12) earned = step.points * 0.5;
      else if (diff <= 0.18) earned = step.points * 0.25;
    }

    draw();
    labels.innerHTML = ELUTION_COMPS
      .map(c => `<span class="tag" style="background:${c.color}22;color:${c.color}">${c.name} · Rf ${c.rf.toFixed(2).replace('.', ',')}</span>`)
      .join('');

    const message = auto
      ? '⏱️ L’éluant a atteint le haut de la plaque : le front a dépassé la ligne d’arrêt. Il faut arrêter plus tôt.'
      : earned >= step.points * 0.7
        ? `Arrêt à ${Math.round(progress * 100)} % : le front s’est arrêté juste avant la ligne, c’est parfait !`
        : `Arrêt à ${Math.round(progress * 100)} % : le front n’est pas au bon niveau. Vise la ligne rose la prochaine fois.`;

    finishStep(earned, message + ' ' + step.explain, earned >= step.points * 0.7);
  };

  const frame = (ts) => {
    if (!running) return;
    if (!start) start = ts;
    progress = Math.min(1, (ts - start) / ELUTION_MS);
    draw();
    readout.textContent = t('phase.front', { n: Math.round(progress * 100) });
    if (progress >= 1) {
      progress = 0.999;
      stop(true);
      return;
    }
    animHandle = requestAnimationFrame(frame);
  };

  stopBtn.addEventListener('click', () => stop(false));
  draw();
  animHandle = requestAnimationFrame(frame);
}

/* ---------- fin de niveau ---------- */

function finishPhase() {
  const ph = PHASES[session.phaseIdx];
  const p = getPlayer();
  if (!p) return;

  const score = Math.max(0, Math.min(100, Math.round(session.phaseScore)));
  const previous = p.scores[ph.id] || 0;
  const best = Math.max(previous, score);
  p.scores[ph.id] = best;
  if (!p.gifts.includes(ph.id)) p.gifts.push(ph.id);
  saveData();
  publishScore();

  renderMap();
  confetti(score >= 60 ? 140 : 70);
  sfx.gift();

  const isLast = session.phaseIdx === PHASES.length - 1;
  showModal({
    title: score >= 60 ? '🎁 Cadeau débloqué !' : '🎁 Niveau terminé !',
    stars: best,
    html: `Niveau ${ph.n} : <strong>${score} / 100 points</strong><br>
           Ton cadeau : <strong>${ph.gift.emoji} ${ph.gift.name}</strong><br>
           <small>Meilleur score sur ce niveau : ${best}/100</small>`,
    button: isLast ? 'Voir mon certificat 🏅' : 'Niveau suivant →',
    onClick: () => {
      if (isLast) showEnd();
      else startPhase(session.phaseIdx + 1);
    }
  });
}

/* ---------- modale ---------- */

function showModal({ title, html, stars, button, onClick }) {
  const modal = $('#modal');
  $('#modalTitle').textContent = title;
  $('#modalStars').innerHTML = starsHTML(stars || 0);
  $('#modalText').innerHTML = html;
  const btn = $('#modalBtn');
  btn.textContent = button;
  btn.onclick = () => { hideModal(); onClick(); };
  modal.classList.remove('hidden');
}

function hideModal() {
  $('#modal').classList.add('hidden');
}

/* ---------- règles du jeu ---------- */

function openRules() {
  $('#rulesModal').classList.remove('hidden');
}

function closeRules() {
  $('#rulesModal').classList.add('hidden');
}

function openManual() {
  $('#manualModal').classList.remove('hidden');
}

function closeManual() {
  $('#manualModal').classList.add('hidden');
}

function showRulesIfNeeded(player) {
  if (!player || player.rulesSeen) return;
  player.rulesSeen = true;
  saveData();
  openRules();
}

/* ---------- certificat ---------- */

function showEnd() {
  const p = getPlayer();
  if (!p) return;
  const total = totalScore(p);

  $('#endName').textContent = fullName(p);
  $('#endTotal').textContent = total;
  $('#endNote').textContent = noteTexte(total);
  $('#endMention').textContent = mentionDe(total);

  const pct = total / TOTAL_MAX;
  let medal;
  if (pct >= 0.9) medal = t('cert.medalGold');
  else if (pct >= 0.6) medal = t('cert.medalSilver');
  else if (pct >= 0.3) medal = t('cert.medalBronze');
  else medal = t('cert.medalProgress');
  $('#endMedal').textContent = medal;

  const gifts = $('#endGifts');
  gifts.innerHTML = '';
  PHASES.forEach(ph => {
    if (p.gifts.includes(ph.id)) {
      const pill = document.createElement('span');
      pill.className = 'gift-pill';
      pill.textContent = ph.gift.emoji + ' ' + ph.gift.name;
      gifts.appendChild(pill);
    }
  });

  const locale = LANG === 'ar' ? 'ar-DZ' : (LANG === 'en' ? 'en-GB' : 'fr-FR');
  $('#endDate').textContent = t('cert.signedOn', {
    date: new Date().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  });

  publishScore();
  showScreen('end');
  confetti(180);
  sfx.win();
}

/* ---------- confettis ---------- */

const CONFETTI_COLORS = ['#7b5cff', '#3b82f6', '#12b886', '#ffc93c', '#ff5c8a', '#ff8a3d'];

function confetti(count) {
  const layer = $('#confetti');
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
    piece.style.animationDelay = (Math.random() * 0.6) + 's';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (8 + Math.random() * 10) + 'px';
    piece.style.opacity = 0.75 + Math.random() * 0.25;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 4200);
  }
}

/* ---------- initialisation ---------- */

function refreshContent() {
  renderHome();
  if (!$('#screen-map').classList.contains('hidden')) renderMap();
  if (!$('#screen-phase').classList.contains('hidden')) renderStep();
  if (!$('#screen-end').classList.contains('hidden')) showEnd();
  if (!$('#screen-duel').classList.contains('hidden')) {
    duelKey = '';
    if (duelState) renderDuel(duelState);
  }
}

function init() {
  initLang();
  initSound();
  document.querySelectorAll('[data-sound]').forEach(btn => {
    btn.addEventListener('click', toggleSound);
  });
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });
  renderHome();
  showScreen('home');

  $('#playerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const nomComplet = $('#inputNomComplet').value.replace(/\s+/g, ' ').trim();
    const hint = $('#formHint');
    const mots = nomComplet.split(' ').filter(Boolean);

    if (mots.length < 2 || mots.some(m => m.length < 2) || nomComplet.length > 48) {
      hint.textContent = t('home.hint');
      hint.classList.remove('hidden');
      return;
    }
    hint.classList.add('hidden');
    startPlayer(nomComplet);
  });

  $('#btnBackMap').addEventListener('click', () => { renderMap(); showScreen('map'); });
  $('#btnChangePlayer').addEventListener('click', () => {
    session.playerKey = null;
    renderHome();
    showScreen('home');
    $('#inputNomComplet').value = '';
    $('#inputNomComplet').focus();
  });
  const btnPublish = $('#btnPublishScore');
  if (btnPublish) btnPublish.addEventListener('click', publishScore);
  const btnRefresh = $('#btnRefreshOnline');
  if (btnRefresh) btnRefresh.addEventListener('click', refreshOnline);
  const btnReset = $('#btnResetOnline');
  if (btnReset) btnReset.addEventListener('click', resetCompetition);

  const btnCreateDuel = $('#btnCreateDuel');
  if (btnCreateDuel) btnCreateDuel.addEventListener('click', createDuel);
  const btnJoinDuel = $('#btnJoinDuel');
  if (btnJoinDuel) btnJoinDuel.addEventListener('click', joinDuel);
  const btnDuelExit = $('#btnDuelExit');
  if (btnDuelExit) btnDuelExit.addEventListener('click', exitDuel);
  const btnDuelCopy = $('#btnDuelCopy');
  if (btnDuelCopy) btnDuelCopy.addEventListener('click', copyDuelCode);
  const savedDuel = loadDuelSession();
  if (savedDuel && savedDuel.code && savedDuel.token && ONLINE_API) {
    duelPlayer = savedDuel;
    const resume = $('#btnResumeDuel');
    if (resume) {
      resume.textContent = t('duel.resume', { code: savedDuel.code });
      resume.classList.remove('hidden');
      resume.addEventListener('click', resumeDuel);
    }
    duelSetHomeStatus('online', t('duel.running', { code: savedDuel.code }));
    pollDuel();
  }

  if (ONLINE_API) {
    setInterval(() => {
      const map = $('#screen-map');
      if (map && !map.classList.contains('hidden')) refreshOnline();
    }, 60000);
  }

  $('#btnCertificat').addEventListener('click', showEnd);
  $('#btnEndBack').addEventListener('click', () => { renderMap(); showScreen('map'); });
  $('#btnPrint').addEventListener('click', () => window.print());

  $('#modal').addEventListener('click', (event) => {
    if (event.target.id === 'modal') hideModal();
  });

  ['#btnRulesHome', '#btnRulesMap', '#btnRulesTop'].forEach(sel => {
    const btn = $(sel);
    if (btn) btn.addEventListener('click', openRules);
  });
  $('#rulesClose').addEventListener('click', closeRules);
  $('#rulesModal').addEventListener('click', (event) => {
    if (event.target.id === 'rulesModal') closeRules();
  });

  ['#btnManuelHome', '#btnManuelMap', '#btnManuelTop'].forEach(sel => {
    const btn = $(sel);
    if (btn) btn.addEventListener('click', openManual);
  });
  const manualClose = $('#manualClose');
  if (manualClose) manualClose.addEventListener('click', closeManual);
  const manualModal = $('#manualModal');
  if (manualModal) {
    manualModal.addEventListener('click', (event) => {
      if (event.target.id === 'manualModal') closeManual();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { closeRules(); closeManual(); }
  });
}

document.addEventListener('DOMContentLoaded', init);
