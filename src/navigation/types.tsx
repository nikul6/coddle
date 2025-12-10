export type SupportType = 'chat' | 'video';

export type RootStackParamList = {
  Intro: undefined;
  ConcernSupport: undefined;
  Provider: undefined;
  Chat: undefined;
  VideoWaitingRoom: undefined;
  Completion: undefined;
};

export interface Provider {
  name: string;
  credentials: string;
  bio: string;
  avatarUrl: string;
}
