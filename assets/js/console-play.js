/**
 * Initialise et lance le jeu "Console Dungeon Crawler".
 * Expose les commandes du jeu dans `window` pour interagir depuis la console.
 * @returns {void}
 */
export default function initConsoleDungeon() {
  console.clear();

  /**
   * Représente l'état global du jeu.
   * @type {Object}
   * @property {Object} player - Informations sur le joueur
   * @property {Object<string, Object>} rooms - Les différentes salles du donjon
   * @property {Object<string, Object>} enemies - Les ennemis du jeu
   * @property {Object<string, Object>} items - Les objets du jeu
   * @property {Object|null} currentEnemy - Ennemi actuellement en combat
   * @property {boolean} inCombat - Indique si le joueur est en combat
   */
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

  /** Styles de console */
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

  /** Affiche l'intro du jeu */
  function showIntro() {
    console.log(
      '%c╔═══════════════════════════════════════════╗',
      styles.title
    );
    console.log('%c      🗡️  CONSOLE DUNGEON CRAWLER  ⚔️', styles.title);
    console.log(
      '%c╚═══════════════════════════════════════════╝',
      styles.title
    );
    console.log(
      "\n%cBienvenue, aventurier ! Tu te réveilles à l'entrée d'un donjon mystérieux...",
      styles.info
    );
    console.log('\n📜 %cCommandes disponibles :', styles.command);
    console.log(
      '  • %cregarde()%c - Observer les alentours',
      styles.command,
      ''
    );
    console.log('  • %cstats()%c - Voir tes statistiques', styles.command, '');
    console.log(
      '  • %cinventaire()%c - Vérifier ton inventaire',
      styles.command,
      ''
    );
    console.log(
      "  • %cva('direction')%c - Se déplacer (nord, sud, est, ouest)",
      styles.command,
      ''
    );
    console.log(
      "  • %cprendre('objet')%c - Ramasser un objet",
      styles.command,
      ''
    );
    console.log(
      "  • %cutilise('objet')%c - Utiliser un objet",
      styles.command,
      ''
    );
    console.log('  • %cattaque()%c - Attaquer en combat', styles.command, '');
    console.log(
      '  • %csort()%c - Lancer un sort de feu (coûte 20 mana)',
      styles.command,
      ''
    );
    console.log(
      '  • %cfuir()%c - Tenter de fuir un combat',
      styles.command,
      ''
    );
    console.log('  • %caide()%c - Revoir les commandes', styles.command, '');
    console.log('\n💡 Tape %cregarde()%c pour commencer !', styles.command, '');
  }

  /** Observe la salle actuelle et déclenche combat si nécessaire */
  window.regarde = function () {
    const room = game.rooms[game.player.position];
    if (!room.visited) {
      room.visited = true;
      console.log('\n🆕 %cNouvelle zone découverte !', styles.success);
    }
    console.log('\n📍 %c' + room.name, styles.room);
    console.log('%c' + room.description, styles.info);

    if (room.enemies.length > 0 && !game.inCombat) {
      console.log('\n⚠️  %cDanger ! Tu aperçois :', styles.enemy);
      room.enemies.forEach((e) =>
        console.log('  • %c' + game.enemies[e].name, styles.enemy)
      );
      console.log('\n💥 %cUn combat commence !', styles.damage);
      startCombat(room.enemies[0]);
    }

    if (room.items.length > 0) {
      console.log('\n✨ %cObjets visibles :', styles.success);
      room.items.forEach((i) =>
        console.log('  • ' + game.items[i].name + ' - ' + game.items[i].desc)
      );
    }

    console.log('\n🚪 %cSorties disponibles :', styles.command);
    Object.keys(room.exits).forEach((dir) =>
      console.log('  • ' + dir + ' → ' + game.rooms[room.exits[dir]].name)
    );
  };

  /** Affiche les stats du joueur */
  window.stats = function () {
    const p = game.player;
    console.log('\n═══════════════════════════════════');
    console.log('👤 %c' + p.name + ' (Niveau ' + p.level + ')', styles.success);
    console.log('═══════════════════════════════════');
    console.log('❤️  PV     : ' + p.hp + ' / ' + p.maxHp);
    console.log('💙 Mana   : ' + p.mana + ' / ' + p.maxMana);
    console.log('⚔️  ATK    : ' + p.atk);
    console.log('🛡️  DEF    : ' + p.def);
    console.log('⭐ XP     : ' + p.xp + ' / ' + p.level * 50);
    console.log('💰 Gold   : ' + p.gold + 'g');
    console.log('═══════════════════════════════════');
  };

  /** Affiche l'inventaire du joueur */
  window.inventaire = function () {
    console.log('\n🎒 %cInventaire :', styles.command);
    if (game.player.inventory.length === 0) console.log('  (vide)');
    else
      game.player.inventory.forEach((item) =>
        console.log(
          '  • ' + game.items[item].name + ' - ' + game.items[item].desc
        )
      );
  };

  /** Déplacement du joueur */
  window.va = function (direction) {
    if (game.inCombat) {
      console.log(
        '⚠️  Tu ne peux pas fuir comme ça ! Utilise %cfuir()%c en combat.',
        styles.command,
        ''
      );
      return;
    }
    const room = game.rooms[game.player.position];
    const newPos = room.exits[direction.toLowerCase()];
    if (newPos) {
      game.player.position = newPos;
      console.log(
        '\n🚶 %cTu te déplaces vers le ' + direction + '...',
        styles.info
      );
      regarde();
    } else console.log('❌ Tu ne peux pas aller dans cette direction.');
  };

  /** Ramasse un objet */
  window.prendre = function (itemName) {
    const room = game.rooms[game.player.position];
    let itemKey = room.items.find((k) =>
      k.toLowerCase().includes(itemName.toLowerCase())
    );
    if (!itemKey)
      itemKey = room.items.find((k) =>
        game.items[k].name.toLowerCase().includes(itemName.toLowerCase())
      );

    if (itemKey) {
      game.player.inventory.push(itemKey);
      room.items = room.items.filter((i) => i !== itemKey);
      console.log(
        '✅ %cTu as ramassé : ' + game.items[itemKey].name,
        styles.success
      );
    } else console.log("❌ Cet objet n'est pas ici.");
  };

  /** Utilisation d'un objet */
  window.utilise = function (itemName) {
    const itemKey = game.player.inventory.find((k) =>
      game.items[k].name.toLowerCase().includes(itemName.toLowerCase())
    );

    if (!itemKey) {
      console.log("❌ Tu n'as pas cet objet.");
      return;
    }

    const item = game.items[itemKey];
    if (item.effect === 'heal') {
      game.player.hp = Math.min(game.player.hp + item.value, game.player.maxHp);
      console.log(
        '💚 %c+' +
          item.value +
          ' PV ! PV actuels : ' +
          game.player.hp +
          '/' +
          game.player.maxHp,
        styles.heal
      );
    } else if (item.effect === 'atk') {
      game.player.atk += item.value;
      console.log(
        '⚔️  %cATK +' + item.value + ' ! ATK totale : ' + game.player.atk,
        styles.success
      );
    } else if (item.effect === 'def') {
      game.player.def += item.value;
      console.log(
        '🛡️  %cDEF +' + item.value + ' ! DEF totale : ' + game.player.def,
        styles.success
      );
    }
    game.player.inventory = game.player.inventory.filter((i) => i !== itemKey);
  };

  /** Début du combat */
  function startCombat(enemyKey) {
    game.inCombat = true;
    game.currentEnemy = JSON.parse(JSON.stringify(game.enemies[enemyKey]));
    console.log(
      '\n⚔️  %c' + game.currentEnemy.name + ' apparaît !',
      styles.enemy
    );
    console.log(
      '❤️  PV : ' + game.currentEnemy.hp + '/' + game.currentEnemy.maxHp
    );
    console.log(
      '\n💡 %cattaque()%c ou %csort()%c ou %cfuir()',
      styles.command,
      '',
      styles.command,
      '',
      styles.command
    );
  }

  /** Attaque */
  window.attaque = function () {
    if (!game.inCombat) {
      console.log("❌ Il n'y a rien à attaquer ici.");
      return;
    }
    const damage = Math.max(1, game.player.atk - game.currentEnemy.def);
    game.currentEnemy.hp -= damage;
    console.log('\n⚔️  %cTu attaques ! -' + damage + ' PV', styles.damage);
    console.log(
      '   Ennemi : ' +
        game.currentEnemy.hp +
        '/' +
        game.currentEnemy.maxHp +
        ' PV'
    );
    if (game.currentEnemy.hp <= 0) {
      victory();
      return;
    }
    enemyTurn();
  };

  /** Sort de feu */
  window.sort = function () {
    if (!game.inCombat) {
      console.log("❌ Il n'y a rien à attaquer ici.");
      return;
    }
    if (game.player.mana < 20) {
      console.log('❌ Pas assez de mana ! (20 requis)');
      return;
    }
    game.player.mana -= 20;
    const damage = Math.floor(game.player.atk * 1.5);
    game.currentEnemy.hp -= damage;
    console.log(
      '\n🔥 %cBoule de feu ! -' + damage + ' PV critiques !',
      styles.damage
    );
    console.log(
      '   Ennemi : ' +
        game.currentEnemy.hp +
        '/' +
        game.currentEnemy.maxHp +
        ' PV'
    );
    console.log(
      '   Mana restante : ' + game.player.mana + '/' + game.player.maxMana
    );
    if (game.currentEnemy.hp <= 0) {
      victory();
      return;
    }
    enemyTurn();
  };

  /** Fuir un combat */
  window.fuir = function () {
    if (!game.inCombat) {
      console.log("❌ Tu n'es pas en combat.");
      return;
    }
    const chance = Math.random();
    if (chance > 0.5) {
      console.log('\n🏃 %cTu réussis à fuir !', styles.success);
      endCombat();
      const room = game.rooms[game.player.position];
      const exits = Object.keys(room.exits);
      const randomExit = exits[Math.floor(Math.random() * exits.length)];
      game.player.position = room.exits[randomExit];
      regarde();
    } else {
      console.log('\n❌ %cÉchec de la fuite !', styles.damage);
      enemyTurn();
    }
  };

  /** Tour ennemi */
  function enemyTurn() {
    const damage = Math.max(1, game.currentEnemy.atk - game.player.def);
    game.player.hp -= damage;
    console.log(
      '\n👹 %c' + game.currentEnemy.name + " t'attaque ! -" + damage + ' PV',
      styles.enemy
    );
    console.log('   Tes PV : ' + game.player.hp + '/' + game.player.maxHp);
    if (game.player.hp <= 0) gameOver();
  }

  /** Victoire sur un ennemi */
  function victory() {
    const enemyName = game.currentEnemy.name;
    const enemyXp = game.currentEnemy.xp;
    const enemyGold = game.currentEnemy.gold;
    const enemyLoot = game.currentEnemy.loot;

    console.log('\n🎉 %cVictoire !', styles.success);
    console.log('+' + enemyXp + ' XP | +' + enemyGold + ' gold');

    game.player.xp += enemyXp;
    game.player.gold += enemyGold;

    if (enemyLoot.length > 0 && Math.random() > 0.5) {
      const loot = enemyLoot[0];
      console.log('💎 %cLoot : ' + game.items[loot].name, styles.success);
      game.player.inventory.push(loot);
    }

    if (game.player.xp >= game.player.level * 50) levelUp();

    const room = game.rooms[game.player.position];
    room.enemies = [];
    const isBoss = enemyName === 'Dragon Ancien';

    endCombat();
    if (isBoss) finalVictory();
  }

  /** Level up */
  function levelUp() {
    game.player.level++;
    game.player.xp = 0;
    game.player.maxHp += 20;
    game.player.hp = game.player.maxHp;
    game.player.maxMana += 10;
    game.player.mana = game.player.maxMana;
    game.player.atk += 5;
    game.player.def += 2;

    console.log(
      '\n✨ %cNIVEAU SUPÉRIEUR ! Niveau ' + game.player.level,
      styles.success
    );
    console.log('   +20 PV max | +10 Mana max | +5 ATK | +2 DEF');
  }

  /** Fin de combat */
  function endCombat() {
    game.inCombat = false;
    game.currentEnemy = null;
  }

  /** Mort du joueur */
  function gameOver() {
    console.log('\n💀 %cTu es mort...', styles.damage);
    console.log('%cGAME OVER', styles.title);
    console.log('\nTape %crestart()%c pour recommencer.', styles.command, '');
  }

  /** Victoire finale */
  function finalVictory() {
    console.log(
      '\n%c╔═══════════════════════════════════════════╗',
      styles.success
    );
    console.log(
      '%c║         🏆 VICTOIRE FINALE ! 🏆          ║',
      styles.success
    );
    console.log(
      '%c╚═══════════════════════════════════════════╝',
      styles.success
    );
    console.log('\n%cTu as vaincu le Dragon Ancien !', styles.success);
    console.log('Le donjon est libéré. Tu es désormais une légende !');
    console.log('\n📊 Score final :');
    console.log('  • Niveau : ' + game.player.level);
    console.log('  • Gold : ' + game.player.gold + 'g');
    console.log(
      '  • Salles explorées : ' +
        Object.values(game.rooms).filter((r) => r.visited).length +
        '/5'
    );
  }

  /** Redémarre le jeu */
  window.restart = function () {
    console.clear();
    initConsoleDungeon();
  };

  /** Affiche l'aide */
  window.aide = function () {
    console.log('\n📜 %cCommandes disponibles :', styles.command);
    console.log(
      '  • %cregarde()%c - Observer les alentours',
      styles.command,
      ''
    );
    console.log('  • %cstats()%c - Voir tes statistiques', styles.command, '');
    console.log(
      '  • %cinventaire()%c - Vérifier ton inventaire',
      styles.command,
      ''
    );
    console.log("  • %cva('direction')%c - Se déplacer", styles.command, '');
    console.log(
      "  • %cprendre('objet')%c - Ramasser un objet",
      styles.command,
      ''
    );
    console.log(
      "  • %cutilise('objet')%c - Utiliser un objet",
      styles.command,
      ''
    );
    console.log('  • %cattaque()%c - Attaquer en combat', styles.command, '');
    console.log('  • %csort()%c - Sort de feu (20 mana)', styles.command, '');
    console.log('  • %cfuir()%c - Fuir un combat', styles.command, '');
  };

  // Lancer le jeu
  showIntro();

  // Exposer le jeu pour debug (optionnel)
  window.__game = game;
}
