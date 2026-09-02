/**
 * État du formulaire de connexion.
 *
 * Séparé de actions.ts : un fichier « use server » ne peut exporter que des
 * fonctions asynchrones.
 */
export type LoginState = {
  error: string | null;
};

export const loginInitialState: LoginState = { error: null };
