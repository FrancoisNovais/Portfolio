/**
 * Initialise le message de bienvenue dans la console.
 * Affiche les liens LinkedIn et GitHub, et explique comment lancer le jeu avec `play()`.
 */
export default function initConsoleWelcome() {
  console.clear();

  /** Styles pour les logs de la console */
  const styles = {
    title: 'color:#00adb5; font-size:18px; font-weight:bold;',
    info: 'color:#eeeeee; font-size:14px;',
    link: 'color:#ffb703; font-weight:bold; text-decoration:underline;',
    hint: 'color:#95e1d3; font-style:italic;'
  };

  console.log('%c👋 Salut, explorateur !', styles.title);
  console.log(
    "%cSi tu es ici, c'est que mon travail t'intéresse sûrement 😉",
    styles.info
  );
  console.log(
    "%cPour en savoir plus sur moi et mon travail, n'hésite pas à me contacter :",
    styles.info
  );
  console.log(
    '%cLinkedIn : https://www.linkedin.com/in/françois-novais/',
    styles.link
  );
  console.log('%cGitHub   : https://github.com/FrancoisNovais', styles.link);

  console.log(
    "\n💡 Et sinon… si tu aimes l’aventure, n'hésite pas à taper %cplay()%c pour un petit moment de fun dans cette console !",
    styles.link, // style appliqué à "play()"
    styles.hint // style pour le reste du texte après "play()"
  );

  /**
   * Lance le jeu Console Dungeon Crawler depuis la console.
   * Import dynamique du module `console-play.js`.
   * @returns {Promise<void>}
   */
  window.play = () =>
    import('./console-play.js').then((module) => module.default());
}
