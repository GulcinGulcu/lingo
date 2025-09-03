import { useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import CameraIcon from "../../icons/CameraIcon";
import ShuffleIcon from "../../icons/ShuffleIcon";
import { LANGUAGES } from "../constants";
import LocationIcon from "../../icons/LocationIcon";
import { GlobeIcon } from "../../icons/GlobeIcon";
import { useOnboard } from "../hooks/useOnboard";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();

  const [onboardingData, setOnboardingData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { onboardingMutation, isPending } = useOnboard();

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(onboardingData);
  };

  const handleRandomAvatar = () => {
    const randomAvatar = `https://avatar.iran.liara.run/public?${Date.now()}`;
    setOnboardingData({ ...onboardingData, profilePic: randomAvatar });
    toast.success("Random picture is generated!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="card bg-base-200 max-w-3xl w-full shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete your profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="size-28 rounded-full bg-base-300 overflow-hidden">
                {onboardingData.profilePic ? (
                  <img
                    src={onboardingData.profilePic}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <CameraIcon />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={handleRandomAvatar}
                >
                  <ShuffleIcon />
                  Create Random Avatar
                </button>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                value={onboardingData.fullName}
                name="fullname"
                placeholder="You full name"
                onChange={(e) =>
                  setOnboardingData({
                    ...onboardingData,
                    fullName: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <input
                className="textarea textarea-bordered h-24 w-full"
                type="text"
                value={onboardingData.bio}
                name="bio"
                placeholder="Tell others about yourself and your language goals"
                onChange={(e) =>
                  setOnboardingData({
                    ...onboardingData,
                    bio: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  value={onboardingData.nativeLanguage}
                  className="select select-bordered w-full"
                  name="nativeLanguage"
                  onChange={(e) =>
                    setOnboardingData({
                      ...onboardingData,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((language) => (
                    <option
                      key={`lang-${language}`}
                      value={language.toLowerCase()}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  value={onboardingData.learningLanguage}
                  className="select select-bordered w-full"
                  name="learningLanguage"
                  onChange={(e) =>
                    setOnboardingData({
                      ...onboardingData,
                      learningLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((language) => (
                    <option
                      key={`lang-${language}`}
                      value={language.toLowerCase()}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <LocationIcon className="absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input
                  type="text"
                  value={onboardingData.location}
                  className="input input-bordered w-full pl-10"
                  name="location"
                  onChange={(e) =>
                    setOnboardingData({
                      ...onboardingData,
                      location: e.target.value,
                    })
                  }
                  placeholder="City, Country"
                />
              </div>
            </div>
            <button
              className={`btn w-full ${
                isPending ? "btn-neutral" : "btn-secondary"
              }`}
              disabled={isPending}
              type="submit"
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Completing...
                </>
              ) : (
                <>
                  <GlobeIcon />
                  Complete Onboarding
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
