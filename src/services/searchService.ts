// import { baseURL } from "@/lib/utils";
// import { searchSuggestionStore } from "@/store/searchStore";

// export const handleSearchSuggestion = async () => {
//   const { query } = searchSuggestionStore();

//   try {
//     const data = await fetch(
//       `${baseURL}/find-physician/search?query=${encodeURIComponent(query)}`
//     );
//     const response = await data.json();
//     if (response.success) {
//       console.log("search", response.suggestion);
//       searchSuggestionStore.setState({
//         searchResult: response.suggestion,
//         loading: false,
//       });
//     } else {
//       searchSuggestionStore.setState({
//         searchResult: response.suggestion,
//         loading: false,
//       });
//     }
//   } catch (error) {
//     searchSuggestionStore.setState({
//       searchResult: null,
//       loading: false,
//     });
//   }
// };
