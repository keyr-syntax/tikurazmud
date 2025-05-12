import { baseURL } from "@/lib/utils";
import { searchSuggestionStore } from "@/store/searchStore";

import { useEffect } from "react";

function SearchSuggestion() {
  const { query, searchResult } = searchSuggestionStore();
  const handleSearchSuggestion = async () => {
    try {
      const data = await fetch(
        `${baseURL}/find-physician/search?query=${encodeURIComponent(query)}`
      );
      const response = await data.json();
      if (response.success) {
        console.log("search", response.suggestion);
        searchSuggestionStore.setState({
          searchResult: response.suggestion,
          loading: false,
        });
      } else {
        searchSuggestionStore.setState({
          searchResult: response.suggestion,
          loading: false,
        });
      }
    } catch (error) {
      searchSuggestionStore.setState({
        searchResult: [],
        loading: false,
      });
    }
  };
  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      if (query.trim().length > 1) {
        handleSearchSuggestion();
      } else {
        searchSuggestionStore.setState({
          searchResult: [],
          loading: false,
        });
      }
    }, 300);
    return () => clearTimeout(debounceDelay);
  }, [query]);

  const groupSearchSuggestions = {
    doctor: searchResult.filter((group) => group.type === "doctor"),
    specialty: searchResult.filter((group) => group.type === "specialty"),
    language: searchResult.filter((group) => group.type === "language"),
    location: searchResult.filter((group) => group.type === "location"),
  };
  const highlightMatch = (text: string) => {
    const regex = new RegExp(`(${query})`, "i");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <strong className="text-yellow-300" key={index}>
          {part}
        </strong>
      ) : (
        part
      )
    );
  };
  return (
    <>
      {searchResult && searchResult.length > 0 && (
        <div className=" flex flex-col w-[90%] md:w-[50%] mx-auto mt-2">
          {groupSearchSuggestions &&
            groupSearchSuggestions.doctor &&
            groupSearchSuggestions.doctor.length > 0 && (
              <>
                <div className="px-1  text-sm text-gray-500">
                  <ul>
                    {groupSearchSuggestions.doctor.map((doc) => (
                      <li
                        key={doc.physicianID}
                        className="px-2 py-2 hover:bg-[#151563] cursor-pointer border border-[rgb(255,255,255,0.2)] rounded my-1"
                      >
                        {highlightMatch(doc.name)}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

          {groupSearchSuggestions &&
            groupSearchSuggestions.specialty &&
            groupSearchSuggestions.specialty.length > 0 && (
              <>
                <div className="px-1  text-sm text-gray-500">
                  <ul>
                    {groupSearchSuggestions.specialty.map((spec) => (
                      <li
                        key={spec.aboutDoctorID}
                        className="px-2 py-2 hover:bg-[#151563] cursor-pointer border border-[rgb(255,255,255,0.2)] rounded my-1"
                      >
                        {highlightMatch(spec.specialty)}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

          {groupSearchSuggestions &&
            groupSearchSuggestions.language &&
            groupSearchSuggestions.language.length > 0 && (
              <>
                <div className="px-1  text-sm text-gray-500">
                  <ul>
                    {groupSearchSuggestions.language.map((lang) => (
                      <li
                        key={lang.aboutDoctorID}
                        className="px-2 py-2 hover:bg-[#151563] cursor-pointer border border-[rgb(255,255,255,0.2)] rounded my-1"
                      >
                        {highlightMatch(lang.spokenLanguage)}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

          {groupSearchSuggestions &&
            groupSearchSuggestions.location &&
            groupSearchSuggestions.location.length > 0 && (
              <>
                <div className="px-1  text-sm text-gray-500">
                  <ul>
                    {groupSearchSuggestions.location.map((loc) => (
                      <li
                        key={loc.aboutDoctorID}
                        className="px-2 py-2 hover:bg-[#151563] cursor-pointer border border-[rgb(255,255,255,0.2)] rounded my-1"
                      >
                        {highlightMatch(loc.location)}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
        </div>
      )}
    </>
  );
}

export default SearchSuggestion;
