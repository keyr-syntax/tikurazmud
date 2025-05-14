import { create } from "zustand";

interface Specialty {
  specialty: string;
}

export type searchSuggestion = {
  physicianID?: number;
  name?: string;
  gender?: string;
  specialty?: string;
  specialtyList?: Specialty[];
  location?: string;
  spokenLanguage?: string;
  aboutDoctorID?: string;
  profilePicture?: string;

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
