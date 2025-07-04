// import { Link } from "react-router";
// import { LANGUAGE_TO_FLAG } from "../constants";

// const FriendCard = ({ friend }) => {
//   return (
//     <div className="card bg-base-200 hover:shadow-lg transition-all duration-300 rounded-xl">
//       <div className="card-body p-5 space-y-4">
//         {/* USER INFO */}
//         <div className="flex items-center gap-3">
//           <div className="avatar">
//             <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//               <img src={friend.profilePic} alt={friend.fullName} />
//             </div>
//           </div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-base truncate">
//               {friend.fullName}
//             </h3>
//             {friend.location && (
//               <p className="text-xs text-base-content opacity-70 truncate">
//                 {friend.location}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* LANGUAGE INFO */}
//         <div className="flex flex-wrap gap-2">
//           <span className="badge badge-secondary text-xs">
//             {getLanguageFlag(friend.nativeLanguage)}
//             Native: {friend.nativeLanguage}
//           </span>
//           <span className="badge badge-outline text-xs">
//             {getLanguageFlag(friend.learningLanguage)}
//             Learning: {friend.learningLanguage}
//           </span>
//         </div>

//         {/* MESSAGE BUTTON */}
//         <Link
//           to={`/chat/${friend._id}`}
//           className="btn btn-primary btn-sm w-full font-semibold tracking-wide"
//         >
//           Message
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default FriendCard;

// export function getLanguageFlag(language) {
//   if (!language) return null;

//   const langLower = language.toLowerCase();
//   const countryCode = LANGUAGE_TO_FLAG[langLower];

//   if (countryCode) {
//     return (
//       <img
//         src={`https://flagcdn.com/24x18/${countryCode}.png`}
//         alt={`${langLower} flag`}
//         className="h-3 w-auto mr-1 inline-block rounded-sm"
//       />
//     );
//   }
//   return null;
// }

// src/components/FriendCard.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { OnlineContext } from "../main"; // or where you define it
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  const { onlineUsers } = useContext(OnlineContext);
  const isOnline = onlineUsers.includes(friend._id);

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow relative">
      {isOnline && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border border-white" />
      )}
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
