import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { capitalize } from "../pages/HomePage";

export const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-xl transition-all duration-300">
      <div className="card-body p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="avatar rounded-full size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate text-lg">{friend.fullName}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-secondary text-sm">
            <span>
              {getLanguageFlag(friend.nativeLanguage)} Native:{" "}
              {capitalize(friend.nativeLanguage)}
            </span>
          </span>
          <span className="badge badge-outline text-sm">
            <span>
              {getLanguageFlag(friend.learningLanguage)} Learning:{" "}
              {capitalize(friend.learningLanguage)}
            </span>
          </span>
        </div>
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLowercase = language.toLowerCase();
  const langCode = LANGUAGE_TO_FLAG[langLowercase];

  if (langCode) {
    return (
      <img
        src={`https://flagcdn.com/16x12/${langCode}.png`}
        alt={`${language} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }

  return null;
}
