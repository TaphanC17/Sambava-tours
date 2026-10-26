/* ===================================================================
   Sambava Tours - script.js
   Chaque fonctionnalité a sa section. Dans chaque section :
   1) on TROUVE les éléments, 2) on ÉCOUTE un événement, 3) on MODIFIE.
   =================================================================== */

console.log('script.js est bien relié à la page !');


/* ---------- 1. Menu burger (téléphone) ---------- */
const boutonBurger = document.getElementById('bouton-burger');
const menu = document.getElementById('menu')

boutonBurger.addEventListener('click', function () {
   menu.classList.toggle('ouvert');
});



/* ---------- 2. Mode sombre avec mémoire ---------- */

const boutonTheme = document.getElementById('bouton-theme');

// Restaurer le thème enregistré
if (localStorage.getItem('theme') === 'sombre') {
  document.body.classList.add('sombre');
}

// Mettre à jour le texte du bouton
function actualiserBoutonTheme() {
  if (document.body.classList.contains('sombre')) {
    boutonTheme.textContent = 'Mode clair';
  } else {
    boutonTheme.textContent = 'Mode sombre';
  }
}

// Afficher le bon texte au chargement
actualiserBoutonTheme();

// Changer et mémoriser le thème
boutonTheme.addEventListener('click', function () {
  document.body.classList.toggle('sombre');

  if (document.body.classList.contains('sombre')) {
    localStorage.setItem('theme', 'sombre');
  } else {
    localStorage.setItem('theme', 'clair');
  }

  actualiserBoutonTheme();
});

/* ---------- 3. Texte « machine à écrire » ---------- */

const machine = document.getElementById('machine');

const textes = [
  'plantation de vanille',
  'plages paradisiaques',
  'forêts tropicales'
];

let indexTexte = 0;
let indexLettre = 0;

function ecrireTexte() {
  const texteActuel = textes[indexTexte];

  machine.textContent = texteActuel.substring(0, indexLettre);
  indexLettre++;

  if (indexLettre <= texteActuel.length) {
    setTimeout(ecrireTexte, 100);
  } else {
    setTimeout(effacerTexte, 1500);
  }
}

function effacerTexte() {
  const texteActuel = textes[indexTexte];

  machine.textContent = texteActuel.substring(0, indexLettre);
  indexLettre--;

  if (indexLettre >= 0) {
    setTimeout(effacerTexte, 50);
  } else {
    indexTexte = (indexTexte + 1) % textes.length;
    indexLettre = 0;
    setTimeout(ecrireTexte, 300);
  }
}

ecrireTexte();

/* ---------- 4. Apparition au défilement ---------- */
const elements = document.querySelectorAll('.apparition');

const observateur = new IntersectionObserver(function (entrees) {
  entrees.forEach(function (entree) {
    if (entree.isIntersecting) {
      entree.target.classList.add('visible');
      observateur.unobserve(entree.target);
    }
  });
});

elements.forEach(function (element) {
  observateur.observe(element);
});

/* ---------- 5. Compteurs animés ---------- */
const chiffres = document.querySelectorAll('.chiffre');

const observerChiffres = new IntersectionObserver(function (entrees) {
  entrees.forEach(function (entree) {
    if (entree.isIntersecting) {

      const compteur = entree.target;
      const cible = Number(compteur.dataset.cible);
      let valeur = 0;

      const duree = 2000;
      const debut = performance.now();

      function mettreAJour(tempsActuel) {
        const progression = Math.min((tempsActuel - debut) / duree, 1);

        valeur = Math.floor(progression * cible);
        compteur.textContent = valeur;

        if (progression < 1) {
         requestAnimationFrame(mettreAJour);
        } else {
          compteur.textContent = cible; 
        }
      }

       requestAnimationFrame(mettreAJour);
      observerChiffres.unobserve(compteur);
    }
  });
}, {
  threshold: 0.5
});

chiffres.forEach(function (chiffre) {
  observerChiffres.observe(chiffre);
});

/* ---------- 6. Accordéon de la FAQ ---------- */
const questionsFAQ = document.querySelectorAll('.faq-question');

questionsFAQ.forEach(function (question) {
  question.addEventListener('click', function () {
    const reponse = question.nextElementSibling;

    reponse.classList.toggle('ouverte');
  });
});

/* ---------- Bonus : bouton « retour en haut » ---------- */
const boutonHaut = document.getElementById('bouton-haut');

boutonHaut.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});