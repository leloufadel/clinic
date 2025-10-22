# 🎨 Guide d'Identité Visuelle - EETFP-TIC

## 📋 Vue d'ensemble

Ce document définit l'identité visuelle complète du site web de l'EETFP-TIC (École d'Enseignement Technique et de Formation Professionnelle dans le domaine des Technologies d'Information et de Communication à Nouakchott).

## 🎯 Objectifs de l'Identité Visuelle

- **Professionnalisme** : Refléter le statut institutionnel de l'école
- **Confiance** : Inspirer confiance aux étudiants et partenaires
- **Modernité** : Démontrer l'expertise en technologies
- **Accessibilité** : Assurer une excellente lisibilité et navigation
- **Cohérence** : Maintenir une identité uniforme sur tous les supports

## 🌈 Palette de Couleurs

### Couleurs Principales (Institutionnelles)

```css
/* Bleu Institutionnel - Couleur principale */
--institutional-blue: #1e40af;     /* RGB: 30, 64, 175 */

/* Bleu Institutionnel Clair - Accents et liens */
--institutional-blue-light: #3b82f6; /* RGB: 59, 130, 246 */

/* Bleu Institutionnel Foncé - Arrière-plans et contrastes */
--institutional-blue-dark: #1e3a8a;  /* RGB: 30, 58, 138 */
```

### Couleurs Neutres

```css
/* Blanc - Arrière-plans principaux */
--background: #ffffff;              /* RGB: 255, 255, 255 */

/* Gris Clair - Sections et arrière-plans secondaires */
--light-gray: #f8fafc;             /* RGB: 248, 250, 252 */

/* Gris Moyen - Bordures et séparateurs */
--medium-gray: #e2e8f0;            /* RGB: 226, 232, 240 */

/* Gris Foncé - Texte principal */
--dark-gray: #475569;              /* RGB: 71, 85, 105 */

/* Noir - Texte d'en-tête et contrastes forts */
--foreground: #171717;             /* RGB: 23, 23, 23 */
```

### Utilisation des Couleurs

| Élément | Couleur | Usage |
|---------|---------|-------|
| **Arrière-plans principaux** | Blanc (#ffffff) | Pages, cartes, formulaires |
| **Arrière-plans secondaires** | Gris Clair (#f8fafc) | Sections alternées |
| **Texte principal** | Gris Foncé (#475569) | Contenu, paragraphes |
| **Titres** | Bleu Institutionnel (#1e40af) | H1, H2, H3 |
| **Liens et boutons** | Bleu Institutionnel (#1e40af) | Navigation, CTA |
| **Accents** | Bleu Clair (#3b82f6) | Hover, focus, icônes |
| **Arrière-plans sombres** | Bleu Foncé (#1e3a8a) | Footer, sections CTA |

## 🔤 Typographie

### Familles de Polices

```css
font-family: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

**Priorité des polices :**
1. **Geist** - Police principale moderne et lisible
2. **Inter** - Police de secours optimisée pour l'écran
3. **Polices système** - Fallback pour la compatibilité

### Hiérarchie Typographique

```css
/* Titre Principal (H1) */
h1 {
  font-size: 2.5rem;        /* 40px */
  font-weight: 800;         /* Extra Bold */
  line-height: 1.2;
  letter-spacing: -0.025em;
}

/* Titre Secondaire (H2) */
h2 {
  font-size: 2rem;          /* 32px */
  font-weight: 700;         /* Bold */
  line-height: 1.2;
  letter-spacing: -0.025em;
}

/* Titre Tertiaire (H3) */
h3 {
  font-size: 1.5rem;        /* 24px */
  font-weight: 600;         /* Semi Bold */
  line-height: 1.2;
  letter-spacing: -0.025em;
}

/* Corps de texte */
body {
  font-size: 1rem;          /* 16px */
  font-weight: 400;         /* Regular */
  line-height: 1.6;
}
```

### Poids de Police

- **800 (Extra Bold)** : Titres H1
- **700 (Bold)** : Titres H2, boutons
- **600 (Semi Bold)** : Titres H3, labels
- **500 (Medium)** : Navigation, éléments importants
- **400 (Regular)** : Corps de texte, paragraphes

## 🎨 Éléments Visuels

### Boutons

#### Bouton Principal
```css
.btn-primary {
  background-color: var(--institutional-blue);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: var(--institutional-blue-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}
```

#### Bouton Secondaire
```css
.btn-secondary {
  background-color: transparent;
  color: var(--institutional-blue);
  border: 2px solid var(--institutional-blue);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}

.btn-secondary:hover {
  background-color: var(--institutional-blue);
  color: white;
  transform: translateY(-1px);
}
```

### Cartes

```css
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Icônes

- **Style** : Ligne simple (stroke-based)
- **Taille** : 16px à 24px selon le contexte
- **Couleur** : Blanc sur fonds colorés, Bleu institutionnel sur fonds clairs
- **Animation** : Transitions douces au hover

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) {   /* sm */ }
@media (min-width: 768px) {   /* md */ }
@media (min-width: 1024px) {  /* lg */ }
@media (min-width: 1280px) {  /* xl */ }
```

### Grilles

- **Mobile** : 1 colonne
- **Tablet** : 2 colonnes
- **Desktop** : 3-4 colonnes selon le contenu

### Espacement

```css
.section-padding {
  padding: 5rem 0;           /* 80px */
}

.container-max {
  max-width: 80rem;          /* 1280px */
  margin: 0 auto;
  padding: 0 1rem;           /* 16px */
}

@media (min-width: 640px) {
  .container-max {
    padding: 0 1.5rem;       /* 24px */
  }
}

@media (min-width: 1024px) {
  .container-max {
    padding: 0 2rem;         /* 32px */
  }
}
```

## 🎭 États et Interactions

### Hover Effects

- **Boutons** : Translation vers le haut (-1px à -4px)
- **Cartes** : Élévation avec ombre plus prononcée
- **Liens** : Changement de couleur vers le bleu institutionnel
- **Icônes** : Changement d'opacité ou de couleur

### Focus States

```css
.focus\:ring-institutional-blue:focus {
  --tw-ring-color: var(--institutional-blue);
}

.focus\:border-institutional-blue:focus {
  border-color: var(--institutional-blue);
}
```

### Transitions

```css
/* Transitions standard */
transition: all 0.2s ease-in-out;    /* Boutons, liens */
transition: all 0.3s ease-in-out;    /* Cartes, sections */
```

## 🏗️ Architecture des Composants

### Structure des Pages

1. **Hero Section** : Gradient bleu institutionnel avec titre principal
2. **Navigation** : Barre fixe avec logo et menu
3. **Contenu** : Sections alternées (blanc/gris clair)
4. **Footer** : Fond bleu foncé avec informations de contact

### Composants Réutilisables

- **Navbar** : Navigation principale avec logo
- **Footer** : Pied de page avec liens et contact
- **Cards** : Cartes de contenu avec ombres et hover
- **Buttons** : Boutons primaires et secondaires
- **Sections** : Conteneurs avec espacement standardisé

## 📐 Grille et Mise en Page

### Système de Grille

```css
/* Grilles responsives */
.grid-cols-1                    /* 1 colonne (mobile) */
.md:grid-cols-2                 /* 2 colonnes (tablet) */
.lg:grid-cols-3                 /* 3 colonnes (desktop) */
.xl:grid-cols-4                 /* 4 colonnes (large desktop) */
```

### Espacement Vertical

- **Entre sections** : 5rem (80px)
- **Entre éléments** : 1.5rem à 2rem (24px à 32px)
- **À l'intérieur des cartes** : 1.5rem à 2rem (24px à 32px)

## 🎨 Exemples d'Utilisation

### Page d'Accueil

```css
/* Hero Section */
.bg-gradient-to-br from-institutional-blue via-institutional-blue-light to-institutional-blue-dark

/* Section Features */
.bg-light-gray

/* CTA Section */
.bg-institutional-blue-dark
```

### Page Formations

```css
/* En-têtes de formation */
.bg-institutional-blue          /* Informatique */
.bg-green-600                  /* Logistique, Énergie */
.bg-purple-600                 /* Commerce, Multimédia */
```

### Page Contact

```css
/* Icônes de contact */
.bg-institutional-blue rounded-xl

/* Formulaire */
.border-medium-gray focus:ring-institutional-blue
```

## 🔧 Implémentation Technique

### Variables CSS

```css
:root {
  --institutional-blue: #1e40af;
  --institutional-blue-light: #3b82f6;
  --institutional-blue-dark: #1e3a8a;
  --light-gray: #f8fafc;
  --medium-gray: #e2e8f0;
  --dark-gray: #475569;
}
```

### Classes Utilitaires

```css
.bg-institutional-blue
.text-institutional-blue
.border-institutional-blue
.hover\:bg-institutional-blue-dark:hover
.focus\:ring-institutional-blue:focus
```

## 📋 Checklist de Conformité

### ✅ Couleurs
- [ ] Utilisation exclusive de la palette institutionnelle
- [ ] Contraste suffisant pour l'accessibilité
- [ ] Cohérence des couleurs d'accent

### ✅ Typographie
- [ ] Hiérarchie claire des titres
- [ ] Lisibilité optimale sur tous les écrans
- [ ] Espacement approprié entre les éléments

### ✅ Composants
- [ ] Boutons avec états hover et focus
- [ ] Cartes avec ombres et animations
- [ ] Navigation responsive et accessible

### ✅ Responsive
- [ ] Adaptation mobile-first
- [ ] Grilles flexibles
- [ ] Espacement proportionnel

## 🚀 Évolutions Futures

### Améliorations Possibles

1. **Mode sombre** : Version alternative avec palette inversée
2. **Animations avancées** : Micro-interactions et transitions
3. **Illustrations** : Graphiques et icônes personnalisées
4. **Thèmes saisonniers** : Variations pour événements spéciaux

### Maintenance

- **Révision trimestrielle** de la cohérence visuelle
- **Tests d'accessibilité** réguliers
- **Mise à jour** des composants selon les besoins
- **Documentation** des nouvelles fonctionnalités

---

*Ce guide doit être consulté par tous les développeurs et designers travaillant sur le site EETFP-TIC pour assurer la cohérence de l'identité visuelle.* 