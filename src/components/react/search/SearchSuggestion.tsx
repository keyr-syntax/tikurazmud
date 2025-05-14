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
        console.log("response", response);
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
                <div className="px-1 text-sm text-gray-500">
                  <ul>
                    {groupSearchSuggestions.doctor.map((doc) => (
                      <li
                        key={doc.physicianID}
                        className="flex items-center gap-4 p-4 hover:bg-[#151563] cursor-pointer border border-white/20 rounded-lg my-2"
                      >
                        <img
                          src={doc.profilePicture}
                          alt={doc.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <p className="font-medium text-white">
                            Dr. {highlightMatch(doc.name)}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {doc.specialtyList &&
                              doc.specialtyList.length > 0 &&
                              doc.specialtyList.map((specialty, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                                >
                                  {specialty.specialty}
                                </span>
                              ))}
                          </div>
                        </div>
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
                        className="flex items-center gap-4 p-4 hover:bg-[#151563] cursor-pointer border border-white/20 rounded-lg my-2"
                      >
                        <img
                          src={spec.profilePicture}
                          alt={spec.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-4">
                          <p className="font-medium text-white">
                            Dr. {spec.name}
                          </p>
                          <p className="bg-blue-100 text-black px-2 py-0.5 rounded-full text-xs">
                            {highlightMatch(spec.specialty)}
                          </p>
                        </div>
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
                <div className="px-1 text-sm text-gray-500">
                  <ul>
                    {groupSearchSuggestions.language.map((lang) => (
                      <li
                        key={lang.aboutDoctorID}
                        className="flex items-center gap-4 p-4 hover:bg-[#151563] cursor-pointer border border-white/20 rounded-lg my-2"
                      >
                        <img
                          src={lang.profilePicture}
                          alt={lang.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-2">
                          {" "}
                          <p className="font-medium text-white">
                            Dr. {lang.name}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {lang.specialtyList &&
                              lang.specialtyList.length > 0 &&
                              lang.specialtyList.map((specialty, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                                >
                                  {specialty.specialty}
                                </span>
                              ))}
                          </div>
                          <p className="font-medium text-white">
                            {" "}
                            {highlightMatch(lang.spokenLanguage)}
                          </p>
                        </div>
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
                <div className="px-1 text-sm text-gray-500">
                  <ul>
                    {groupSearchSuggestions.location.map((loc) => (
                      <li
                        key={loc.aboutDoctorID}
                        className="flex items-center gap-4 p-4 hover:bg-[#151563] cursor-pointer border border-white/20 rounded-lg my-2"
                      >
                        <img
                          src={loc.profilePicture}
                          alt={loc.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-2">
                          {" "}
                          <p className="font-medium text-white">
                            Dr. {loc.name}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {loc.specialtyList &&
                              loc.specialtyList.length > 0 &&
                              loc.specialtyList.map((specialty, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                                >
                                  {specialty.specialty}
                                </span>
                              ))}
                          </div>
                          <p className="font-medium text-white">
                            {" "}
                            {highlightMatch(loc.location)}
                          </p>
                        </div>
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
