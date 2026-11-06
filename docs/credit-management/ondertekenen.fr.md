# Signature électronique (OKSign)

Avec OKSign, vous faites signer un document par un client de façon électronique, sans papier. CreditSoft crée le
document, envoie à chaque signataire son propre lien et conserve ensuite le document signé en pièce jointe. Vous
l'utilisez pour deux documents :

- le **document de mission**, sur la fiche d'un [dossier de crédit](credit-files.md#ondertekenen) : les demandeurs signent ;
- la **déclaration de confidentialité**, sur la fiche d'une [personne](../crm/relations.md#tabblad-ondertekenen) : cette personne signe.

## Ce qu'il vous faut au préalable

- **Un contrat avec OKSign.** Sans contrat, l'onglet *Signature* indique : « Votre bureau n'a pas encore de contrat
  OKSign. » Contactez ADM-Concept à ce sujet.
- **Le texte du document.** Votre bureau le rédige lui-même, sur la
  [fiche d'entreprise](../administration/company-profile.md#digitaal-ondertekenen-oksign), en néerlandais et en
  français. CreditSoft y ajoute le titre, le dossier, les noms, la date et les cadres de signature.
- **Le pays de votre bureau** sur la fiche d'entreprise. CreditSoft en a besoin pour lire correctement un numéro de
  GSM.
- **Pour chaque signataire, une adresse e-mail et un numéro de GSM.** Le lien arrive par e-mail. Lors de la
  signature, OKSign envoie un code par SMS : un numéro fixe ne convient donc pas.

## Faire signer un document

1. Ouvrez le dossier de crédit ou la fiche de la personne, et cliquez sur l'onglet **Signature**.
2. Sous *Qui signe* figurent les signataires. S'il manque quelque chose pour l'un d'eux, c'est indiqué à côté de
   son nom.
3. Cliquez sur **Faire signer**. CreditSoft affiche les noms et demande une confirmation.
4. Confirmez avec **Faire signer**. Chaque signataire reçoit un e-mail avec son propre lien.

Le document est rédigé dans la langue du premier signataire : la *langue des documents* de sa fiche. Si elle n'est
pas remplie, c'est la langue de votre bureau qui s'applique. Si le texte n'est pas rempli dans cette langue, vous ne
pouvez pas envoyer.

Seules les personnes autorisées à modifier la fiche voient le bouton **Faire signer**. La déclaration de
confidentialité n'existe que pour une personne, pas pour une entreprise, et seulement une fois la fiche enregistrée.

## L'état d'une demande

Sous le bouton figure chaque demande, avec la date et l'auteur de l'envoi :

- **En attente de signature** : tout le monde n'a pas encore signé. S'il y a plusieurs signataires, vous voyez
  combien ont déjà signé.
- **Signé** : le document signé se trouve dans les [pièces jointes](../journaal/bijlagen.md) du dossier ou de la
  relation. Juste avant, vous pouvez voir *Signé, le document est en cours de récupération*.
- **Refusé par un signataire**.
- **Échec chez OKSign**.

CreditSoft consulte l'état tous les quarts d'heure, et chaque fois que vous ouvrez l'onglet. Pour la déclaration de
confidentialité, la date à laquelle la personne l'a signée figure aussi en haut.

Pour une demande en attente, deux boutons figurent à côté de chaque signataire :

- **Copier le lien** : le lien personnel, pour le transmettre vous-même. Ne le donnez qu'à ce signataire.
- **Renvoyer l'e-mail** : le même e-mail, une nouvelle fois.

Si *(e-mail non parti)* figure à côté d'un nom, cette personne n'a pas reçu d'e-mail. Copiez alors le lien.

## Erreurs fréquentes

!!! warning "Une demande envoyée ne s'annule pas"
    Ce qui est envoyé reste chez les signataires. Si vous envoyez à nouveau, une deuxième demande s'ajoute et la
    première reste valable. La fenêtre de confirmation vous en avertit.

!!! warning "Pas de numéro de GSM"
    Sans numéro de GSM, ou avec un numéro fixe, cette personne ne peut pas signer. Indiquez le numéro sur sa fiche
    et rouvrez l'onglet.

!!! note "Un bureau dont le compte est limité"
    Si le compte de votre bureau est limité, vous ne pouvez rien faire signer de nouveau. Un document déjà envoyé
    qui revient signé est en revanche bien reçu.

## Voir aussi

- [Dossiers de crédit](credit-files.md)
- [Relations](../crm/relations.md)
- [Fiche d'entreprise](../administration/company-profile.md)
- [Pièces jointes](../journaal/bijlagen.md)
