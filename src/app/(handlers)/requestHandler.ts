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
    console.error("Error fetching user:", error);
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
    console.error("Error fetching channels:", error);
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
    console.error("Error fetching dms:", error);
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
    console.error("Error fetching messages:", error);
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
        console.error("Error posting channel:", error);
      throw error;
    }
  }

  export const postLeaveChannel = async (channelId: any) => {
    const url = `/channel/leave`;
  
    try {
      const response = await api.post(url, {channel: channelId});
  
      if (response.status >= 200 && response.status < 300) {
        const data = await response.data;
        return data;
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
        console.error("Error posting channel:", error);
      throw error;
    }
  };
