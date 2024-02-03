import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export const fetchCurrentUser = async () => {
  const url = `/user/me`;

  try {
    const response = await api.get(url);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchChannels = async () => {
  const url = `/channel/joinedChannels`;

  try {
    const response = await api.get(url);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserDms = async () => {
  const url = `/channel/alldms/`;

  try {
    const response = await api.get(url);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchChannelMessages = async (channelId: string) => {
  const url = `/messages/findall/${channelId}`;

  try {
    const response = await api.get(url);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const postNewChannel = async (channel: any) => {
  const url = `/channel/create`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const postLeaveChannel = async (channelId: any) => {
  const url = `/channel/leave`;

  try {
    const response = await api.post(url, { channel: channelId });

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const postJoinChannel = async (channel: any) => {
  const url = `/channel/join`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchPublicChannels = async () => {
  const url = `/channel/allNonJoinedPublic`;

  try {
    const response = await api.get(url);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchProtectedChannels = async () => {
  const url = `/channel/allNonJoinedProtected`;

  try {
    const response = await api.get(url);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const postNewDM = async (channel: any) => {
  const url = `/channel/newDM`;

  try {
    const response = await api.post(url, { user: channel });

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
export const postChmod = async (channel: any) => {
  const url = `/channel/chmod`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
export const postChangeTitle = async (channel: any) => {
  const url = `/channel/changeTitle`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const postNewAdmin = async (channel: any) => {
  const url = `/channel/newAdmin`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
export const postKickUser = async (channel: any) => {
  const url = `/channel/kick`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const postBanUser = async (channel: any) => {
  const url = `/channel/ban`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const postUnbanUser = async (channel: any) => {
  //TODO implement a place for this in the channel header admin controls
  const url = `/channel/unban`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const postMuteUser = async (channel: any) => {
  const url = `/channel/mute`;

  try {
    const response = await api.post(url, channel);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchLeaderBoard = async () => {
  const url = `/leaderboard`;

  try {
    const response = await api.get(url);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};
