/**
 * Initialise le jeu Console Dungeon Crawler dans la console.
 * Permet d'explorer un donjon, combattre des ennemis et collecter des objets.
 * Toutes les commandes sont exécutables via `window`.
 */
export default function initConsoleDungeon() {
  console.clear();

  /**
   * @typedef {Object} Player
   * @property {string} name
   * @property {number} hp
   * @property {number} maxHp
   * @property {number} mana
   * @property {number} maxMana
   * @property {number} atk
   * @property {number} def
   * @property {number} level
   * @property {number} xp
   * @property {Array<string>} inventory
   * @property {number} gold
   * @property {string} position
   */

  /**
   * @typedef {Object} Room
   * @property {string} name
   * @property {string} description
   * @property {boolean} visited
   * @property {Array<string>} enemies
   * @property {Array<string>} items
   * @property {Record<string,string>} exits
   */

  /**
   * @typedef {Object} Enemy
   * @property {string} name
   * @property {number} hp
   * @property {number} maxHp
   * @property {number} atk
   * @property {number} def
   * @property {number} xp
   * @property {number} gold
   * @property {Array<string>} loot
   */

  /**
   * @typedef {Object} Item
   * @property {string} name
   * @property {'heal'|'atk'|'def'} effect
   * @property {number} value
   * @property {string} desc
   */

  /** @type {{player: Player, rooms: Record<string, Room>, enemies: Record<string, Enemy>, items: Record<string, Item>, currentEnemy: Enemy|null, inCombat: boolean}} */
  const game = {
    player: {
      name: 'Héros',
      hp: 100,
      maxHp: 100,
      mana: 50,
      maxMana: 50,
      atk: 15,
      def: 5,
      level: 1,
      xp: 0,
      inventory: [],
      gold: 0,
      position: 'entrance'
    },
    rooms: {
      entrance: {
        name: 'Entrée du Donjon',
        description: 'Une salle sombre éclairée par des torches tremblotantes.',
        visited: false,
        enemies: [],
        items: ['potion'],
        exits: { nord: 'corridor', est: 'armurerie' }
      },
      corridor: {
        name: 'Corridor Hanté',
        description: 'Des murmures étranges résonnent dans ce couloir étroit.',
        visited: false,
        enemies: ['goblin'],
        items: [],
        exits: { sud: 'entrance', nord: 'boss_room', ouest: 'tresor' }
      },
      armurerie: {
        name: 'Ancienne Armurerie',
        description: 'Des armes rouillées jonchent le sol.',
        visited: false,
        enemies: ['squelette'],
        items: ['epee_rouille', 'potion'],
        exits: { ouest: 'entrance' }
      },
      tresor: {
        name: 'Salle du Trésor',
        description:
          'Des coffres brillent dans la pénombre... mais quelque chose veille.',
        visited: false,
        enemies: ['mimic'],
        items: ['super_potion', 'amulette'],
        exits: { est: 'corridor' }
      },
      boss_room: {
        name: 'Chambre du Gardien',
        description:
          "Une immense porte s'ouvre sur une salle circulaire. Le boss t'attend.",
        visited: false,
        enemies: ['dragon'],
        items: [],
        exits: { sud: 'corridor' }
      }
    },
    enemies: {
      goblin: {
        name: 'Goblin Vicieux',
        hp: 30,
        maxHp: 30,
        atk: 8,
        def: 2,
        xp: 15,
        gold: 10,
        loot: ['potion']
      },
      squelette: {
        name: 'Guerrier Squelette',
        hp: 40,
        maxHp: 40,
        atk: 12,
        def: 4,
        xp: 25,
        gold: 15,
        loot: ['epee_rouille']
      },
      mimic: {
        name: 'Coffre Mimic',
        hp: 50,
        maxHp: 50,
        atk: 15,
        def: 3,
        xp: 40,
        gold: 50,
        loot: ['super_potion']
      },
      dragon: {
        name: 'Dragon Ancien',
        hp: 150,
        maxHp: 150,
        atk: 25,
        def: 10,
        xp: 100,
        gold: 200,
        loot: ['epee_legendaire']
      }
    },
    items: {
      potion: {
        name: 'Potion de Soin',
        effect: 'heal',
        value: 30,
        desc: 'Restaure 30 PV'
      },
      super_potion: {
        name: 'Super Potion',
        effect: 'heal',
        value: 60,
        desc: 'Restaure 60 PV'
      },
      epee_rouille: {
        name: 'Épée Rouillée',
        effect: 'atk',
        value: 5,
        desc: '+5 ATK'
      },
      amulette: {
        name: 'Amulette Mystique',
        effect: 'def',
        value: 3,
        desc: '+3 DEF'
      },
      epee_legendaire: {
        name: 'Épée Légendaire',
        effect: 'atk',
        value: 15,
        desc: '+15 ATK'
      }
    },
    currentEnemy: null,
    inCombat: false
  };

  /** Styles de console pour les logs */
  const styles = {
    title: 'color:#ff6b6b; font-size:20px; font-weight:bold;',
    room: 'color:#4ecdc4; font-weight:bold; font-size:16px;',
    command: 'color:#ffe66d; font-weight:bold;',
    success: 'color:#95e1d3; font-weight:bold;',
    damage: 'color:#ff6b6b; font-weight:bold;',
    heal: 'color:#a8e6cf; font-weight:bold;',
    enemy: 'color:#ff8787; font-weight:bold;',
    info: 'color:#b4b4b4;'
  };

  /** Affiche l'introduction du jeu */
  function showIntro() {
    /* ... */
  }

  /** Observer la salle actuelle */
  window.regarde = function () {
    /* ... */
  };

  /** Affiche les statistiques du joueur */
  window.stats = function () {
    /* ... */
  };

  /** Affiche l'inventaire */
  window.inventaire = function () {
    /* ... */
  };

  /**
   * Se déplacer dans une direction
   * @param {string} direction - "nord"|"sud"|"est"|"ouest"
   */
  window.va = function (direction) {
    /* ... */
  };

  /**
   * Ramasser un objet dans la salle
   * @param {string} itemName - nom ou clé de l'objet
   */
  window.prendre = function (itemName) {
    /* ... */
  };

  /**
   * Utiliser un objet de l'inventaire
   * @param {string} itemName - nom ou clé de l'objet
   */
  window.utilise = function (itemName) {
    /* ... */
  };

  /** Commencer un combat avec un ennemi */
  function startCombat(enemyKey) {
    /* ... */
  }

  /** Attaque normale du joueur */
  window.attaque = function () {
    /* ... */
  };

  /** Lance un sort de feu */
  window.sort = function () {
    /* ... */
  };

  /** Tenter de fuir un combat */
  window.fuir = function () {
    /* ... */
  };

  /** Tour de l'ennemi */
  function enemyTurn() {
    /* ... */
  }

  /** Gestion de la victoire d'un combat */
  function victory() {
    /* ... */
  }

  /** Level up du joueur */
  function levelUp() {
    /* ... */
  }

  /** Fin du combat */
  function endCombat() {
    /* ... */
  }

  /** Gestion de la mort du joueur */
  function gameOver() {
    /* ... */
  }

  /** Victoire finale du jeu */
  function finalVictory() {
    /* ... */
  }

  /** Recommencer le jeu */
  window.restart = function () {
    initConsoleDungeon();
  };

  /** Afficher l'aide */
  window.aide = function () {
    /* ... */
  };

  // Lancer le jeu
  showIntro();

  // Exposer le jeu pour debug
  window.__game = game;
}
