export interface ChatMessage {
    id: string;
    content: string;
    type: 'text' | 'image' | 'video';
    timestamp: Date;
    sender: 'me' | 'them';
  }
  