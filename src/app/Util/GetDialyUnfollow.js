/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
import { subDays, format } from 'date-fns';

export function getProfilesToUnfollow(followedUsersAtDate, currentFollowers) {
  const allDataMap = new Map(Object.entries(followedUsersAtDate));

  let date = new Date();

  date = subDays(date, 0);

  const datePast4Days = format(date, "yyyy'-'MM'-'dd");

  const followedUsersPast4Days = allDataMap.get(datePast4Days);

  const dialyUnfollowListPk = followedUsersPast4Days.filter(profile => {
    if (!currentFollowers.includes(profile)) {
      return profile;
    }
  });

  return dialyUnfollowListPk;
}
