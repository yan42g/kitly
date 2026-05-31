# PRD — Kitly

## 1. Vision
Bibliothèque desktop **local-first** de templates de composants UI, avec génération
de **prompts copiables** destinés à être collés dans Claude Code pour générer ces
composants dans d'autres projets (sites clients, apps perso).

## 2. Problème résolu
Recréer à chaque projet les mêmes structures de composants (cards, forms, hero,
pricing, modals...) fait perdre du temps. Kitly centralise des templates éprouvés
et leurs prompts portables, prêts à réutiliser.

## 3. Utilisateur cible
Usage 100 % personnel (Yannick, dev full-stack). Extension possible plus tard à des
projets clients, voire une plateforme web publique (kitly.fr).

## 4. Périmètre v1 (MVP)
- Catalogue de catégories de composants.
- Pour chaque catégorie : plusieurs propositions structurelles × variantes de surface.
- Preview live des variantes.
- Génération + copie de prompts portables (React + Tailwind v4).
- Persistance locale : favoris, historique de copies, recherche.
- Export / import JSON de la bibliothèque.

## 5. Hors périmètre (v1)
- Pas de SaaS, pas d'authentification, pas de paiement.
- Pas de backend serveur.
- Pas de collaboration multi-utilisateur.
- Pas de génération IA intégrée (Kitly produit le prompt, Claude Code génère).

## 6. Contraintes
- Local-first : aucune dépendance réseau bloquante.
- Bootstrap rapide : app fonctionnelle (1 catégorie + 1 template) en < 2h.
- Extensible : ajouter une catégorie = 1 fichier + 1 ligne de registry.
- Persistance isolée derrière une interface (portage web futur indolore).

## 7. Catégories prévues (évolutif)
Cards, Forms, Hero sections, Pricing, Modals, Navigation, Dashboards, Boutons.

## 8. Critères de succès
- Je copie un prompt et Claude Code génère un composant cohérent du premier coup.
- Ajouter une catégorie me prend quelques minutes.
- L'app démarre vite et fonctionne 100 % hors-ligne.

## 9. Évolutions futures (non engagées)
- Portage web (IndexedDB) sur kitly.fr.
- Templates custom créés depuis l'app.
- Recherche globale (Cmd+K), raccourcis clavier.