import { create } from "zustand";

export type searchSuggestion = {
  physicianID?: number;
  name?: string;
  gender?: string;
  specialty?: string;
  location?: string;
  spokenLanguage?: string;
  aboutDoctorID?: string;
  type: string;
};

interface searchSuggestionsInterface {
  searchResult: searchSuggestion[] | [];
  loading: boolean;
  query: string;
}

export const searchSuggestionStore = create<searchSuggestionsInterface>(() => ({
  searchResult: [],
  loading: false,
  query: "",
}));
