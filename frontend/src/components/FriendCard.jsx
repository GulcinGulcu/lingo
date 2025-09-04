import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

export const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar rounded-full size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>
        <div className="flex flex-wrap">
          <span className="bagde badge-secondary text-sm">
            {getLanguageFlag(friend.nativeLanguage)}
            {friend.nativeLanguage}
          </span>
          <span className="bagde badge-outline text-sm">
            {getLanguageFlag(friend.learningLanguage)}
            {friend.learningLanguage}
          </span>
        </div>
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline w-full"
        >Message</Link>
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
